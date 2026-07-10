const express = require("express");
const {
  listCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getMyCreatedCourses,
  getPendingCourses,
  reviewCourse,
  enrollInCourse,
  createEnrollmentPayment,
  verifyEnrollmentPayment,
  updateProgress,
  getMyEnrollments,
  getCertificate,
  createQuiz,
  getQuiz,
  submitQuizAttempt,
  getMyQuizAttempts,
  addCourseReview,
  getCourseReviews,
  listLessons,
  createLesson,
  updateLesson,
  deleteLesson,
  getRecommendedCourses,
  getCourseAtRisk,
} = require("../controllers/learn.controller");
const { requireAuth, requireRole } = require("../middleware/auth.middleware");

const router = express.Router();

// Authenticated - Personalized ML recommendations (declared before /courses/:id)
router.get("/recommendations", requireAuth, getRecommendedCourses);

// Public - Courses
router.get("/courses", listCourses);
router.get("/courses/pending", requireAuth, requireRole("ADMIN"), getPendingCourses);
router.get("/courses/:id", getCourse);
router.get("/courses/:id/reviews", getCourseReviews);

// Authenticated - Lessons (course content + player)
router.get("/courses/:id/lessons", requireAuth, listLessons);
router.post("/courses/:courseId/lessons", requireAuth, createLesson);
router.patch("/lessons/:id", requireAuth, updateLesson);
router.delete("/lessons/:id", requireAuth, deleteLesson);

// Authenticated - Creator dropout insight (course owner/admin)
router.get("/courses/:id/at-risk", requireAuth, getCourseAtRisk);

// Authenticated - Any logged-in user can submit a course (creator marketplace)
router.post("/courses", requireAuth, createCourse);
router.get("/my-created-courses", requireAuth, getMyCreatedCourses);
router.patch("/courses/:id", requireAuth, updateCourse);
router.delete("/courses/:id", requireAuth, deleteCourse);
router.post("/courses/:courseId/quiz", requireAuth, createQuiz);

// Authenticated - Enrollment, Payment & Progress
router.get("/my-courses", requireAuth, getMyEnrollments);
router.post("/courses/:id/enroll", requireAuth, enrollInCourse);
router.post("/enrollments/:id/create-payment", requireAuth, createEnrollmentPayment);
router.post("/enrollments/:id/verify-payment", requireAuth, verifyEnrollmentPayment);
router.patch("/enrollments/:id/progress", requireAuth, updateProgress);
router.get("/enrollments/:id/certificate", requireAuth, getCertificate);

// Authenticated - Quizzes
router.get("/courses/:courseId/quiz", requireAuth, getQuiz);
router.post("/quizzes/:id/attempt", requireAuth, submitQuizAttempt);
router.get("/quizzes/:id/attempts", requireAuth, getMyQuizAttempts);

// Authenticated - Reviews
router.post("/courses/:id/review", requireAuth, addCourseReview);

// Admin only - Review queue
router.patch("/courses/:id/review", requireAuth, requireRole("ADMIN"), reviewCourse);

module.exports = router;
