const prisma = require("../config/prisma");

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
 * Automatically marks completedAt when progress reaches 100.
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

    const enrollment = await prisma.enrollment.findUnique({ where: { id: enrollmentId } });
    if (!enrollment) {
      return res.status(404).json({ success: false, message: "Enrollment not found" });
    }
    if (enrollment.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: "This is not your enrollment" });
    }

    const updated = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        progress,
        completedAt: progress === 100 ? new Date() : null,
      },
    });

    return res.status(200).json({ success: true, message: "Progress updated", data: { enrollment: updated } });
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

module.exports = {
  listCourses,
  getCourse,
  createCourse,
  enrollInCourse,
  updateProgress,
  getMyEnrollments,
};
