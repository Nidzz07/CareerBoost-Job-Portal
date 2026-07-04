const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const learnRoutes = require("./routes/learn.routes");
const jobsRoutes = require("./routes/jobs.routes");
const marketplaceRoutes = require("./routes/marketplace.routes");   // ← add

const app = express();

// Core middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "ElevateHer API is running" });
});

// Feature routes
app.use("/api/auth", authRoutes);
app.use("/api/learn", learnRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/marketplace", marketplaceRoutes);   // ← add

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

module.exports = app;