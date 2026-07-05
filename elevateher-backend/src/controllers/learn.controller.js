const prisma = require("../config/prisma");
const { generateCertificate } = require("../services/certificate");
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
};
