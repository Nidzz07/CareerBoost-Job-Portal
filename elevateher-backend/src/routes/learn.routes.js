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
  createQuiz,
  getQuiz,
  submitQuizAttempt,
  getMyQuizAttempts,
  addCourseReview,
  getCourseReviews,
} = require("../controllers/learn.controller");
const { requireAuth, requireRole } = require("../middleware/auth.middleware");

const router = express.Router();

// Public - Courses
router.get("/courses", listCourses);
router.get("/courses/:id", getCourse);
router.get("/courses/:id/reviews", getCourseReviews);

// Authenticated - Enrollment & Progress
router.get("/my-courses", requireAuth, getMyEnrollments);
router.post("/courses/:id/enroll", requireAuth, enrollInCourse);
router.patch("/enrollments/:id/progress", requireAuth, updateProgress);
router.get("/enrollments/:id/certificate", requireAuth, getCertificate);

// Authenticated - Quizzes
router.get("/courses/:courseId/quiz", requireAuth, getQuiz);
router.post("/quizzes/:id/attempt", requireAuth, submitQuizAttempt);
router.get("/quizzes/:id/attempts", requireAuth, getMyQuizAttempts);

// Authenticated - Reviews
router.post("/courses/:id/review", requireAuth, addCourseReview);

// Mentor/Admin only
router.post("/courses", requireAuth, requireRole("ADMIN"), createCourse);
router.patch("/courses/:id", requireAuth, requireRole("ADMIN"), updateCourse);
router.delete("/courses/:id", requireAuth, requireRole("ADMIN"), deleteCourse);
router.post("/courses/:courseId/quiz", requireAuth, requireRole("ADMIN"), createQuiz);

module.exports = router;
