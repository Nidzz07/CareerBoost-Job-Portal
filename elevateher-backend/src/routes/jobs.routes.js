const express = require("express");
const {
  listJobs,
  getJob,
  createJob,
  updateJob,
  getMyPostings,
  applyToJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
  verifyEmployer,
  addReview,
  getUserReviews,
  scheduleInterview,
  updateInterview,
  getMyInterviews,
  getEmployerInterviews,
} = require("../controllers/jobs.controller");
const { requireAuth, requireRole } = require("../middleware/auth.middleware");

const router = express.Router();

// Public
router.get("/", listJobs);
router.get("/:id", getJob);
router.get("/users/:userId/reviews", getUserReviews);

// Authenticated - Learner side
router.get("/my/applications", requireAuth, getMyApplications);
router.get("/my/interviews", requireAuth, getMyInterviews);
router.post("/:id/apply", requireAuth, applyToJob);
router.post("/:id/review", requireAuth, addReview);

// Authenticated - Employer side
router.get("/my/postings", requireAuth, requireRole("EMPLOYER", "ADMIN"), getMyPostings);
router.get("/my/employer-interviews", requireAuth, requireRole("EMPLOYER", "ADMIN"), getEmployerInterviews);
router.post("/", requireAuth, requireRole("EMPLOYER", "ADMIN"), createJob);
router.patch("/:id", requireAuth, requireRole("EMPLOYER", "ADMIN"), updateJob);
router.get("/:id/applications", requireAuth, requireRole("EMPLOYER", "ADMIN"), getJobApplications);
router.patch("/applications/:id/status", requireAuth, requireRole("EMPLOYER", "ADMIN"), updateApplicationStatus);
router.post(
  "/applications/:applicationId/interview",
  requireAuth,
  requireRole("EMPLOYER", "ADMIN"),
  scheduleInterview
);
router.patch("/interviews/:id", requireAuth, requireRole("EMPLOYER", "ADMIN"), updateInterview);

// Admin only
router.patch("/employers/:userId/verify", requireAuth, requireRole("ADMIN"), verifyEmployer);

module.exports = router;
