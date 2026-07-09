const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const learnRoutes = require("./routes/learn.routes");
const jobsRoutes = require("./routes/jobs.routes");
const marketplaceRoutes = require("./routes/marketplace.routes");
const uploadRoutes = require("./routes/upload.routes");
const resumeRoutes = require("./routes/resume.routes");
const mlRoutes = require("./routes/ml.routes");
const app = express();

// Core middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "ElevateHer API is running" });
});

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
// 404 handler - must stay LAST, after all real routes above
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

module.exports = app;
