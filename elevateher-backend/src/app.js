const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const { apiLimiter, buildCorsOptions } = require("./middleware/security.middleware");
const authRoutes = require("./routes/auth.routes");
const learnRoutes = require("./routes/learn.routes");
const jobsRoutes = require("./routes/jobs.routes");
const marketplaceRoutes = require("./routes/marketplace.routes");
const uploadRoutes = require("./routes/upload.routes");
const resumeRoutes = require("./routes/resume.routes");
const mlRoutes = require("./routes/ml.routes");
const notificationRoutes = require("./routes/notification.routes");
const userRoutes = require("./routes/user.routes");
const app = express();

// When deployed behind a reverse proxy/load balancer, set TRUST_PROXY (e.g. "1") so
// req.ip and rate limiting see the real client IP. Defaults to off (direct exposure).
if (process.env.TRUST_PROXY) {
  const tp = process.env.TRUST_PROXY;
  app.set("trust proxy", /^\d+$/.test(tp) ? Number(tp) : tp);
}

// Security headers. CSP is disabled (this is a JSON API, not an HTML host) and the
// cross-origin resource policy is relaxed so the frontend can load /uploads and
// /certificates assets served from this origin.
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Core middleware. CORS is configurable via CORS_ORIGIN (open by default in dev).
// JSON body size is capped to blunt oversized-payload abuse.
app.use(cors(buildCorsOptions()));
app.use(express.json({ limit: process.env.JSON_BODY_LIMIT || "1mb" }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// Health check (kept outside /api and un-rate-limited for load balancers / probes).
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "ElevateHer API is running", uptime: process.uptime() });
});

// Rate limiting applies to the API surface only (not static assets or health).
app.use("/api", apiLimiter);

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Serve generated certificate PDFs
app.use("/certificates", express.static(path.join(__dirname, "..", "public", "certificates")));

// Feature routes
app.use("/api/auth", authRoutes);
app.use("/api/learn", learnRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ml", mlRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/user", userRoutes);
// 404 handler - must stay LAST, after all real routes above
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler. Normalises common client-side errors to the right status
// code instead of a blanket 500, and never leaks stack traces to the client.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // Malformed JSON body (body-parser throws a SyntaxError with a `body` property).
  if (err.type === "entity.parse.failed" || (err instanceof SyntaxError && "body" in err)) {
    return res.status(400).json({ success: false, message: "Invalid JSON in request body" });
  }
  // Payload exceeded the configured body limit.
  if (err.type === "entity.too.large") {
    return res.status(413).json({ success: false, message: "Request body is too large" });
  }
  console.error("Unhandled error:", err);
  return res.status(500).json({ success: false, message: "Internal server error" });
});

module.exports = app;
