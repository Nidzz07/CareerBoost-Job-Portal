const crypto = require("crypto");
const prisma = require("../config/prisma");
const razorpay = require("../config/razorpay");
const { generateCertificate } = require("../services/certificate");
const {
  buildCourseCandidate,
  orderByMlIds,
  recommendCourses,
} = require("../services/ml.service");

// ---------- COURSES ----------

/**
 * GET /api/learn/courses
 * Public. Lists live courses only — published AND admin-approved.
 * Query params: ?category=weaving&language=hi
 */
async function listCourses(req, res) {
  try {
    const { category, language } = req.query;

    let courses = await prisma.course.findMany({
      where: {
        isPublished: true,
        reviewStatus: "APPROVED",
        ...(category && { category }),
        ...(language && { language }),
      },
      orderBy: { createdAt: "desc" },
    });

    const profileText = [category, language].filter(Boolean).join(" ");
    if (profileText && courses.length > 0) {
      const mlResult = await recommendCourses({
        userId: "anonymous",
        userProfileText: profileText,
        candidates: courses.map(buildCourseCandidate),
        limit: courses.length,
      });
      courses = orderByMlIds(
        courses,
        Array.isArray(mlResult.recommendations)
          ? mlResult.recommendations.map((item) => item.id)
          : []
      );
    }

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
 * Requires auth. ANY logged-in user can submit a course (creator marketplace).
 * - Admin-submitted courses go live immediately (reviewStatus: APPROVED, isPublished: true).
 * - Everyone else's submissions start as reviewStatus: PENDING, isPublished: false —
 *   invisible to the public until an admin approves them via reviewCourse().
 * Body: { title, description, category, language, level, mediaUrl, duration, price }
 */
async function createCourse(req, res) {
  try {
    const { title, description, category, language, level, mediaUrl, duration, price } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "title and category are required",
      });
    }
    if (price !== undefined && price < 0) {
      return res.status(400).json({ success: false, message: "price must not be negative" });
    }

    const isAdmin = req.user.role === "ADMIN";

    const course = await prisma.course.create({
      data: {
        title,
        description,
        category,
        language: language || "hi",
        level: level || "BEGINNER",
        mediaUrl,
        duration: duration || 0,
        price: price ?? 0,
        mentorId: req.user.id,
        reviewStatus: isAdmin ? "APPROVED" : "PENDING",
        isPublished: isAdmin, // non-admin submissions are never auto-published
      },
    });

    return res.status(201).json({
      success: true,
      message: isAdmin
        ? "Course created and published"
        : "Course submitted for review. It will go live once an admin approves it.",
      data: { course },
    });
  } catch (err) {
    console.error("Create course error:", err);
    return res.status(500).json({ success: false, message: "Could not create course" });
  }
}

/**
 * PATCH /api/learn/courses/:id
 * Requires auth. Only the creator who owns the course (or admin) can update it.
 * Non-admin creators editing an already-approved course does NOT reset review status —
 * keep it simple for now; admins can always unpublish via isPublished if something's wrong.
 */
async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const { title, description, category, language, level, mediaUrl, duration, isPublished, price } = req.body;

    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    if (course.mentorId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "You do not own this course" });
    }
    // Only admin can toggle isPublished directly — creators go through the review flow instead.
    if (isPublished !== undefined && req.user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "Only an admin can publish/unpublish a course" });
    }
    if (price !== undefined && price < 0) {
      return res.status(400).json({ success: false, message: "price must not be negative" });
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
        ...(price !== undefined && { price }),
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
 * Requires auth. Only the creator who owns the course (or admin) can delete it.
 * Blocked if learners are already enrolled — unpublish instead in that case.
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

/**
 * GET /api/learn/my-created-courses
 * Requires auth. Lists courses the logged-in user has submitted/created,
 * regardless of review status — so creators can track pending/rejected ones too.
 */
async function getMyCreatedCourses(req, res) {
  try {
    const courses = await prisma.course.findMany({
      where: { mentorId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, data: { courses } });
  } catch (err) {
    console.error("Get my created courses error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch your courses" });
  }
}

// ---------- COURSE REVIEW QUEUE (ADMIN) ----------

/**
 * GET /api/learn/courses/pending
 * Requires auth (ADMIN). Lists courses awaiting review.
 */
async function getPendingCourses(req, res) {
  try {
    const courses = await prisma.course.findMany({
      where: { reviewStatus: "PENDING" },
      include: { mentor: { select: { id: true, name: true, phone: true } } },
      orderBy: { createdAt: "asc" },
    });

    return res.status(200).json({ success: true, data: { courses } });
  } catch (err) {
    console.error("Get pending courses error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch pending courses" });
  }
}

/**
 * PATCH /api/learn/courses/:id/review
 * Requires auth (ADMIN). Approves or rejects a submitted course.
 * Body: { approve: true|false, rejectionReason (optional, if approve is false) }
 * Approving publishes the course immediately (isPublished: true).
 */
async function reviewCourse(req, res) {
  try {
    const { id } = req.params;
    const { approve, rejectionReason } = req.body;

    if (approve === undefined) {
      return res.status(400).json({ success: false, message: "approve (true/false) is required" });
    }

    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const updated = await prisma.course.update({
      where: { id },
      data: {
        reviewStatus: approve ? "APPROVED" : "REJECTED",
        isPublished: !!approve,
        ...(approve === false && rejectionReason !== undefined && { description: course.description }),
      },
    });

    return res.status(200).json({
      success: true,
      message: approve ? "Course approved and published" : "Course rejected",
      data: { course: updated },
    });
  } catch (err) {
    console.error("Review course error:", err);
    return res.status(500).json({ success: false, message: "Could not review course" });
  }
}

// ---------- ENROLLMENT & PROGRESS ----------

/**
 * POST /api/learn/courses/:id/enroll
 * Requires auth. Enrolls the logged-in user into a course.
 * - Free courses (price 0): enrollment is created with paymentStatus FREE, usable immediately.
 * - Paid courses: enrollment is created with paymentStatus PENDING. The learner must then
 *   call create-payment + verify-payment before progress tracking is allowed.
 */
async function enrollInCourse(req, res) {
  try {
    const { id: courseId } = req.params;
    const userId = req.user.id;

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    if (!course.isPublished || course.reviewStatus !== "APPROVED") {
      return res.status(403).json({ success: false, message: "This course is not currently available" });
    }

    const existing = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
    if (existing) {
      return res.status(409).json({ success: false, message: "Already enrolled in this course" });
    }

    const isPaid = course.price > 0;

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        paymentStatus: isPaid ? "PENDING" : "FREE",
      },
    });

    return res.status(201).json({
      success: true,
      message: isPaid
        ? "Enrollment created — complete payment to start the course"
        : "Enrolled successfully",
      data: { enrollment, requiresPayment: isPaid, price: course.price },
    });
  } catch (err) {
    console.error("Enroll error:", err);
    return res.status(500).json({ success: false, message: "Could not enroll in course" });
  }
}

/**
 * POST /api/learn/enrollments/:id/create-payment
 * Requires auth (must own the enrollment). Creates a Razorpay order for a paid course.
 */
async function createEnrollmentPayment(req, res) {
  try {
    const { id: enrollmentId } = req.params;

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: { course: true },
    });
    if (!enrollment) {
      return res.status(404).json({ success: false, message: "Enrollment not found" });
    }
    if (enrollment.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: "This is not your enrollment" });
    }
    if (enrollment.paymentStatus === "PAID") {
      return res.status(409).json({ success: false, message: "This course is already paid for" });
    }

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(enrollment.course.price * 100),
      currency: "INR",
      receipt: enrollment.id,
    });

    await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    return res.status(200).json({
      success: true,
      message: "Razorpay order created",
      data: {
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (err) {
    console.error("Create enrollment payment error:", err);
    return res.status(500).json({ success: false, message: "Could not initiate payment" });
  }
}

/**
 * POST /api/learn/enrollments/:id/verify-payment
 * Requires auth (must own the enrollment).
 * Body: { razorpayOrderId, razorpayPaymentId, razorpaySignature }
 * Verifies the HMAC signature server-side — same pattern as marketplace payments.
 */
async function verifyEnrollmentPayment(req, res) {
  try {
    const { id: enrollmentId } = req.params;
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: "razorpayOrderId, razorpayPaymentId, and razorpaySignature are required",
      });
    }

    const enrollment = await prisma.enrollment.findUnique({ where: { id: enrollmentId } });
    if (!enrollment) {
      return res.status(404).json({ success: false, message: "Enrollment not found" });
    }
    if (enrollment.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: "This is not your enrollment" });
    }
    if (enrollment.razorpayOrderId !== razorpayOrderId) {
      return res.status(400).json({ success: false, message: "Razorpay order ID does not match this enrollment" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      await prisma.enrollment.update({ where: { id: enrollmentId }, data: { paymentStatus: "FAILED" } });
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    const updated = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: { paymentStatus: "PAID", razorpayPaymentId, razorpaySignature },
    });

    return res.status(200).json({ success: true, message: "Payment verified — course unlocked", data: { enrollment: updated } });
  } catch (err) {
    console.error("Verify enrollment payment error:", err);
    return res.status(500).json({ success: false, message: "Could not verify payment" });
  }
}

/**
 * PATCH /api/learn/enrollments/:id/progress
 * Requires auth. Updates progress percentage (0-100) for the caller's own enrollment.
 * Blocked if the course is paid and payment hasn't gone through yet.
 * When progress reaches 100: marks completedAt AND generates a PDF certificate.
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
    if (enrollment.paymentStatus === "PENDING" || enrollment.paymentStatus === "FAILED") {
      return res.status(402).json({
        success: false,
        message: "Complete payment for this course before tracking progress",
      });
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
 * Requires auth (creator who owns the course, or admin).
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
 * Requires auth. Returns the quiz for a course WITHOUT correct answers.
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
};
