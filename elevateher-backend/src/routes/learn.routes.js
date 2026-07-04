const express = require("express");
const {
  listCourses,
  getCourse,
  createCourse,
  enrollInCourse,
  updateProgress,
  getMyEnrollments,
} = require("../controllers/learn.controller");
const { requireAuth, requireRole } = require("../middleware/auth.middleware");

const router = express.Router();

// Public
router.get("/courses", listCourses);
router.get("/courses/:id", getCourse);

// Authenticated
router.get("/my-courses", requireAuth, getMyEnrollments);
router.post("/courses/:id/enroll", requireAuth, enrollInCourse);
router.patch("/enrollments/:id/progress", requireAuth, updateProgress);

// Mentor/Admin only
router.post("/courses", requireAuth, requireRole("ADMIN"), createCourse);

module.exports = router;
