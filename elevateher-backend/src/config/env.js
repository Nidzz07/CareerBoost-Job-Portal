/**
 * Environment variable validation (Phase 7 hardening).
 *
 * Runs once at startup (see server.js). Fails fast when a truly required variable is
 * missing so the process doesn't boot into a broken state, and surfaces actionable
 * warnings for weak or missing optional configuration. This does NOT change any
 * runtime behaviour of the app itself — it only guards startup.
 */

// Variables the app genuinely cannot function without.
const REQUIRED = ["DATABASE_URL", "JWT_SECRET"];

// Optional variables — the app boots without them, but we warn so misconfiguration
// is visible in logs rather than surfacing as confusing runtime failures.
const OPTIONAL = ["ML_SERVICE_URL", "RAZORPAY_KEY_ID", "RAZORPAY_KEY_SECRET", "CORS_ORIGIN"];

function validateEnv({ exitOnError = true } = {}) {
  const isProd = process.env.NODE_ENV === "production";
  const missing = REQUIRED.filter((key) => !process.env[key] || String(process.env[key]).trim() === "");
  const warnings = [];

  for (const key of OPTIONAL) {
    if (!process.env[key]) warnings.push(`${key} is not set`);
  }

  // In production a short/placeholder JWT secret is a real risk; warn loudly.
  if (process.env.JWT_SECRET) {
    if (process.env.JWT_SECRET.length < 16) {
      warnings.push("JWT_SECRET is shorter than 16 characters — use a long random string in production");
    }
    if (isProd && /change_me|changeme|secret|password/i.test(process.env.JWT_SECRET)) {
      warnings.push("JWT_SECRET looks like a placeholder — set a strong secret in production");
    }
  }

  if (isProd && (!process.env.CORS_ORIGIN || process.env.CORS_ORIGIN.trim() === "")) {
    warnings.push("CORS_ORIGIN is not set in production — CORS is currently open to all origins");
  }

  for (const w of warnings) console.warn(`[env] warning: ${w}`);

  if (missing.length > 0) {
    console.error(`[env] Missing required environment variable(s): ${missing.join(", ")}`);
    console.error("[env] Copy .env.example to .env and fill in the values before starting.");
    if (exitOnError) process.exit(1);
    return { ok: false, missing, warnings };
  }

  return { ok: true, missing: [], warnings };
}

module.exports = { validateEnv, REQUIRED, OPTIONAL };
