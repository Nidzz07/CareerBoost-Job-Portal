const express = require("express");
const {
  listJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getMyPostings,
  applyToJob,
  withdrawApplication,
  saveJob,
  unsaveJob,
  getSavedJobs,
  getJobMatch,
  getRecommendedJobs,
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

// Authenticated - Personalized recommendations (declared before "/:id")
router.get("/recommendations", requireAuth, getRecommendedJobs);

// Public
router.get("/", listJobs);
router.get("/users/:userId/reviews", getUserReviews);

// Authenticated - Learner side (specific paths before "/:id")
router.get("/my/applications", requireAuth, getMyApplications);
router.get("/my/interviews", requireAuth, getMyInterviews);
router.get("/my/saved", requireAuth, getSavedJobs);
router.delete("/applications/:id", requireAuth, withdrawApplication);

router.get("/:id", getJob);
router.get("/:id/match", requireAuth, getJobMatch);
router.post("/:id/apply", requireAuth, applyToJob);
router.post("/:id/review", requireAuth, addReview);
router.post("/:id/save", requireAuth, saveJob);
router.delete("/:id/save", requireAuth, unsaveJob);

// Authenticated - Employer side
router.delete("/:id", requireAuth, requireRole("EMPLOYER", "ADMIN"), deleteJob);
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
