const express = require("express");
const {
  listCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  updateProgress,
  getMyEnrollments,
  getCertificate,
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
router.get("/enrollments/:id/certificate", requireAuth, getCertificate);

// Mentor/Admin only
router.post("/courses", requireAuth, requireRole("ADMIN"), createCourse);
router.patch("/courses/:id", requireAuth, requireRole("ADMIN"), updateCourse);
router.delete("/courses/:id", requireAuth, requireRole("ADMIN"), deleteCourse);

module.exports = router;
