const prisma = require("../config/prisma");
const { generateCertificate } = require("../services/certificate");

// ---------- COURSES ----------

/**
 * GET /api/learn/courses
 * Public. List published courses, optionally filtered by category/language.
 * Query params: ?category=weaving&language=hi
 */
async function listCourses(req, res) {
  try {
    const { category, language } = req.query;

    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
        ...(category && { category }),
        ...(language && { language }),
      },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, data: { courses } });
  } catch (err) {
    console.error("List courses error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch courses" });
  }
}

/**
 * GET /api/learn/courses/:id
 * Public. Course details.
 */
async function getCourse(req, res) {
  try {
    const { id } = req.params;
    const course = await prisma.course.findUnique({ where: { id } });

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    return res.status(200).json({ success: true, data: { course } });
  } catch (err) {
    console.error("Get course error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch course" });
  }
}

/**
 * POST /api/learn/courses
 * Requires auth (mentor/admin). Creates a new course.
 */
async function createCourse(req, res) {
  try {
    const { title, description, category, language, level, mediaUrl, duration } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "title and category are required",
      });
    }

    const course = await prisma.course.create({
      data: {
        title,
        description,
        category,
        language: language || "hi",
        level: level || "BEGINNER",
        mediaUrl,
        duration: duration || 0,
        mentorId: req.user.id,
      },
    });

    return res.status(201).json({ success: true, message: "Course created", data: { course } });
  } catch (err) {
    console.error("Create course error:", err);
    return res.status(500).json({ success: false, message: "Could not create course" });
  }
}

/**
 * PATCH /api/learn/courses/:id
 * Requires auth. Only the mentor who owns the course (or admin) can update it.
 * Also used to publish/unpublish a course via isPublished.
 */
async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const { title, description, category, language, level, mediaUrl, duration, isPublished } = req.body;

    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    if (course.mentorId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "You do not own this course" });
    }

    const updated = await prisma.course.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(category !== undefined && { category }),
        ...(language !== undefined && { language }),
        ...(level !== undefined && { level }),
        ...(mediaUrl !== undefined && { mediaUrl }),
        ...(duration !== undefined && { duration }),
        ...(isPublished !== undefined && { isPublished }),
      },
    });

    return res.status(200).json({ success: true, message: "Course updated", data: { course: updated } });
  } catch (err) {
    console.error("Update course error:", err);
    return res.status(500).json({ success: false, message: "Could not update course" });
  }
}

/**
 * DELETE /api/learn/courses/:id
 * Requires auth. Only the mentor who owns the course (or admin) can delete it.
 * Blocked if learners are already enrolled — unpublish instead in that case,
 * so their progress and certificates aren't silently destroyed.
 */
async function deleteCourse(req, res) {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: { _count: { select: { enrollments: true } } },
    });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    if (course.mentorId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "You do not own this course" });
    }
    if (course._count.enrollments > 0) {
      return res.status(409).json({
        success: false,
        message: "Cannot delete a course with existing enrollments. Unpublish it instead.",
      });
    }

    await prisma.course.delete({ where: { id } });

    return res.status(200).json({ success: true, message: "Course deleted" });
  } catch (err) {
    console.error("Delete course error:", err);
    return res.status(500).json({ success: false, message: "Could not delete course" });
  }
}

// ---------- ENROLLMENT & PROGRESS ----------

/**
 * POST /api/learn/courses/:id/enroll
 * Requires auth. Enrolls the logged-in user into a course.
 */
async function enrollInCourse(req, res) {
  try {
    const { id: courseId } = req.params;
    const userId = req.user.id;

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const existing = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (existing) {
      return res.status(409).json({ success: false, message: "Already enrolled in this course" });
    }

    const enrollment = await prisma.enrollment.create({
      data: { userId, courseId },
    });

    return res.status(201).json({ success: true, message: "Enrolled successfully", data: { enrollment } });
  } catch (err) {
    console.error("Enroll error:", err);
    return res.status(500).json({ success: false, message: "Could not enroll in course" });
  }
}

/**
 * PATCH /api/learn/enrollments/:id/progress
 * Requires auth. Updates progress percentage (0-100) for the caller's own enrollment.
 * When progress reaches 100: marks completedAt AND generates a PDF certificate,
 * saving its URL onto the enrollment (certificateUrl).
 */
async function updateProgress(req, res) {
  try {
    const { id: enrollmentId } = req.params;
    const { progress } = req.body;

    if (progress === undefined || progress < 0 || progress > 100) {
      return res.status(400).json({
        success: false,
        message: "progress must be a number between 0 and 100",
      });
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: { course: true, user: true },
    });
    if (!enrollment) {
      return res.status(404).json({ success: false, message: "Enrollment not found" });
    }
    if (enrollment.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: "This is not your enrollment" });
    }

    const isNewlyCompleted = progress === 100 && enrollment.progress !== 100;
    const completedAt = progress === 100 ? enrollment.completedAt || new Date() : null;

    let certificateUrl = enrollment.certificateUrl;

    if (isNewlyCompleted) {
      try {
        certificateUrl = await generateCertificate({
          enrollmentId: enrollment.id,
          userName: enrollment.user.name,
          courseTitle: enrollment.course.title,
          completionDate: completedAt,
        });
      } catch (certErr) {
        // Don't fail the whole request if PDF generation has an issue —
        // progress should still save. Log it so it can be regenerated/debugged.
        console.error("Certificate generation error:", certErr);
      }
    }

    const updated = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        progress,
        completedAt,
        ...(certificateUrl && { certificateUrl }),
      },
    });

    return res.status(200).json({
      success: true,
      message: isNewlyCompleted ? "Course completed! Certificate generated." : "Progress updated",
      data: { enrollment: updated },
    });
  } catch (err) {
    console.error("Update progress error:", err);
    return res.status(500).json({ success: false, message: "Could not update progress" });
  }
}

/**
 * GET /api/learn/my-courses
 * Requires auth. Lists the logged-in user's enrollments with course details.
 */
async function getMyEnrollments(req, res) {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.user.id },
      include: { course: true },
      orderBy: { enrolledAt: "desc" },
    });

    return res.status(200).json({ success: true, data: { enrollments } });
  } catch (err) {
    console.error("Get my enrollments error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch your courses" });
  }
}

/**
 * GET /api/learn/enrollments/:id/certificate
 * Requires auth. Returns the certificate URL for the caller's own completed enrollment.
 * Handy single endpoint for the frontend instead of digging through my-courses.
 */
async function getCertificate(req, res) {
  try {
    const { id: enrollmentId } = req.params;

    const enrollment = await prisma.enrollment.findUnique({ where: { id: enrollmentId } });
    if (!enrollment) {
      return res.status(404).json({ success: false, message: "Enrollment not found" });
    }
    if (enrollment.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: "This is not your enrollment" });
    }
    if (!enrollment.certificateUrl) {
      return res.status(404).json({ success: false, message: "Certificate not available yet — complete the course first" });
    }

    return res.status(200).json({ success: true, data: { certificateUrl: enrollment.certificateUrl } });
  } catch (err) {
    console.error("Get certificate error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch certificate" });
  }
}

// ---------- QUIZZES / ASSESSMENTS ----------

/**
 * POST /api/learn/courses/:courseId/quiz
 * Requires auth (mentor who owns the course, or admin).
 * Creates a quiz with questions for a course.
 * Body: {
 *   title, passingScore (optional, default 70),
 *   questions: [{ questionText, options: ["A","B","C","D"], correctOptionIndex }]
 * }
 */
async function createQuiz(req, res) {
  try {
    const { courseId } = req.params;
    const { title, passingScore, questions } = req.body;

    if (!title || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "title and a non-empty questions array are required",
      });
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    if (course.mentorId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "You do not own this course" });
    }

    for (const q of questions) {
      if (
        !q.questionText ||
        !Array.isArray(q.options) ||
        q.options.length < 2 ||
        q.correctOptionIndex === undefined ||
        q.correctOptionIndex < 0 ||
        q.correctOptionIndex >= q.options.length
      ) {
        return res.status(400).json({
          success: false,
          message: "Each question needs questionText, at least 2 options, and a valid correctOptionIndex",
        });
      }
    }

    const quiz = await prisma.quiz.create({
      data: {
        courseId,
        title,
        passingScore: passingScore ?? 70,
        questions: {
          create: questions.map((q) => ({
            questionText: q.questionText,
            optionsJson: JSON.stringify(q.options),
            correctOptionIndex: q.correctOptionIndex,
          })),
        },
      },
      include: { questions: true },
    });

    return res.status(201).json({ success: true, message: "Quiz created", data: { quiz } });
  } catch (err) {
    console.error("Create quiz error:", err);
    return res.status(500).json({ success: false, message: "Could not create quiz" });
  }
}

/**
 * GET /api/learn/courses/:courseId/quiz
 * Requires auth. Returns the quiz for a course WITHOUT correct answers
 * (so learners can't peek before attempting).
 */
async function getQuiz(req, res) {
  try {
    const { courseId } = req.params;

    const quiz = await prisma.quiz.findFirst({
      where: { courseId },
      include: { questions: true },
    });

    if (!quiz) {
      return res.status(404).json({ success: false, message: "No quiz found for this course" });
    }

    const safeQuiz = {
      id: quiz.id,
      courseId: quiz.courseId,
      title: quiz.title,
      passingScore: quiz.passingScore,
      questions: quiz.questions.map((q) => ({
        id: q.id,
        questionText: q.questionText,
        options: JSON.parse(q.optionsJson),
      })),
    };

    return res.status(200).json({ success: true, data: { quiz: safeQuiz } });
  } catch (err) {
    console.error("Get quiz error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch quiz" });
  }
}

/**
 * POST /api/learn/quizzes/:id/attempt
 * Requires auth. Submits answers, auto-grades, and stores the attempt.
 * Body: { answers: [optionIndex, optionIndex, ...] } — same order as questions were created.
 */
async function submitQuizAttempt(req, res) {
  try {
    const { id: quizId } = req.params;
    const { answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ success: false, message: "answers must be a non-empty array" });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }
    if (answers.length !== quiz.questions.length) {
      return res.status(400).json({
        success: false,
        message: `Expected ${quiz.questions.length} answers, got ${answers.length}`,
      });
    }

    let correctCount = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctOptionIndex) correctCount += 1;
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    const attempt = await prisma.quizAttempt.create({
      data: {
        quizId,
        userId: req.user.id,
        score,
        passed,
        answersJson: JSON.stringify(answers),
      },
    });

    return res.status(201).json({
      success: true,
      message: passed ? "Quiz passed!" : "Quiz attempted — did not meet passing score",
      data: { attempt: { ...attempt, correctCount, totalQuestions: quiz.questions.length } },
    });
  } catch (err) {
    console.error("Submit quiz attempt error:", err);
    return res.status(500).json({ success: false, message: "Could not submit quiz attempt" });
  }
}

/**
 * GET /api/learn/quizzes/:id/attempts
 * Requires auth. Lists the logged-in user's own attempts for a quiz.
 */
async function getMyQuizAttempts(req, res) {
  try {
    const { id: quizId } = req.params;

    const attempts = await prisma.quizAttempt.findMany({
      where: { quizId, userId: req.user.id },
      orderBy: { attemptedAt: "desc" },
    });

    return res.status(200).json({ success: true, data: { attempts } });
  } catch (err) {
    console.error("Get my quiz attempts error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch quiz attempts" });
  }
}

// ---------- COURSE RATINGS & REVIEWS ----------

/**
 * POST /api/learn/courses/:id/review
 * Requires auth. Only learners enrolled in the course can review it.
 * Body: { rating (1-5), comment }
 */
async function addCourseReview(req, res) {
  try {
    const { id: courseId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: "rating must be between 1 and 5" });
    }

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (!enrollment) {
      return res.status(403).json({
        success: false,
        message: "You must be enrolled in this course to review it",
      });
    }

    const existing = await prisma.courseReview.findUnique({
      where: { courseId_userId: { courseId, userId } },
    });
    if (existing) {
      return res.status(409).json({ success: false, message: "You have already reviewed this course" });
    }

    const review = await prisma.courseReview.create({
      data: { courseId, userId, rating, comment },
    });

    return res.status(201).json({ success: true, message: "Review submitted", data: { review } });
  } catch (err) {
    console.error("Add course review error:", err);
    return res.status(500).json({ success: false, message: "Could not submit review" });
  }
}

/**
 * GET /api/learn/courses/:id/reviews
 * Public. Lists reviews for a course, plus average rating.
 */
async function getCourseReviews(req, res) {
  try {
    const { id: courseId } = req.params;

    const reviews = await prisma.courseReview.findMany({
      where: { courseId },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });

    const avgRating =
      reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : null;

    return res.status(200).json({
      success: true,
      data: { reviews, avgRating, totalReviews: reviews.length },
    });
  } catch (err) {
    console.error("Get course reviews error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch reviews" });
  }
}

module.exports = {
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
};
