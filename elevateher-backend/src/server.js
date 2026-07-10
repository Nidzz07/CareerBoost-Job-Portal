require("dotenv").config();

// Validate configuration before wiring up anything else so we fail fast on a bad
// environment instead of booting into a broken state.
const { validateEnv } = require("./config/env");
validateEnv();

const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`ElevateHer backend running on http://localhost:${PORT}`);
});

// Surface async failures instead of crashing silently; keep the process alive for
// transient errors and shut down cleanly on termination signals.
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
});
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    console.log(`${signal} received — shutting down gracefully`);
    server.close(() => process.exit(0));
  });
}
