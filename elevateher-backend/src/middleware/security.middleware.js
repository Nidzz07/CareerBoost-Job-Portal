/**
 * Security middleware (Phase 7 hardening): rate limiters and a configurable CORS
 * options builder. These are additive guards — they do not change any business logic.
 */
const { rateLimit } = require("express-rate-limit");

const isTest = process.env.NODE_ENV === "test";
const toInt = (value, fallback) => {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

// General API limiter — generous, protects against runaway/abusive clients without
// getting in the way of a normal SPA that fires several requests per page.
const apiLimiter = rateLimit({
  windowMs: toInt(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000), // 15 min
  limit: toInt(process.env.RATE_LIMIT_MAX, 1000),
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isTest, // don't rate-limit inside the test runner
  message: { success: false, message: "Too many requests — please slow down and try again shortly." },
});

// Stricter limiter for sensitive auth actions (login/signup/OTP/password reset) to
// blunt credential-stuffing and OTP-spam. Applied per-route in auth.routes.js.
const authLimiter = rateLimit({
  windowMs: toInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  limit: toInt(process.env.AUTH_RATE_LIMIT_MAX, 30),
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => isTest,
  message: { success: false, message: "Too many attempts — please wait a few minutes and try again." },
});

/**
 * Builds the cors() options from CORS_ORIGIN (comma-separated allowlist).
 * When unset (typical in local dev) we preserve the previous permissive behaviour so
 * nothing breaks; production deployments set CORS_ORIGIN to lock this down.
 */
function buildCorsOptions() {
  const raw = (process.env.CORS_ORIGIN || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (raw.length === 0) return {}; // reflect request origin (open) — unchanged default
  return {
    origin: raw,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  };
}

module.exports = { apiLimiter, authLimiter, buildCorsOptions };
