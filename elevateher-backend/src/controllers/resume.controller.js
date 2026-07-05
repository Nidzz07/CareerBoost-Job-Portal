const prisma = require("../config/prisma");

/**
 * PUT /api/resume
 * Requires auth. Creates or updates the logged-in user's resume (upsert).
 * Body: {
 *   bio, resumeFileUrl (optional, from /api/upload),
 *   skills: ["Stitching","Embroidery"],
 *   experience: [{ title, company, startDate, endDate, description }],
 *   education: [{ institution, degree, year }],
 *   portfolioLinks: ["https://..."]
 * }
 */
async function upsertResume(req, res) {
  try {
    const userId = req.user.id;
    const { bio, skills, experience, education, portfolioLinks, resumeFileUrl } = req.body;

    const data = {
      ...(bio !== undefined && { bio }),
      ...(skills !== undefined && { skillsJson: JSON.stringify(skills) }),
      ...(experience !== undefined && { experienceJson: JSON.stringify(experience) }),
      ...(education !== undefined && { educationJson: JSON.stringify(education) }),
      ...(portfolioLinks !== undefined && { portfolioLinksJson: JSON.stringify(portfolioLinks) }),
      ...(resumeFileUrl !== undefined && { resumeFileUrl }),
    };

    const resume = await prisma.resume.upsert({
      where: { userId },
      update: data,
      create: { userId, ...data },
    });

    return res.status(200).json({
      success: true,
      message: "Resume saved",
      data: { resume: deserializeResume(resume) },
    });
  } catch (err) {
    console.error("Upsert resume error:", err);
    return res.status(500).json({ success: false, message: "Could not save resume" });
  }
}

/**
 * GET /api/resume/me
 * Requires auth. Returns the logged-in user's own resume.
 */
async function getMyResume(req, res) {
  try {
    const resume = await prisma.resume.findUnique({ where: { userId: req.user.id } });

    if (!resume) {
      return res.status(404).json({ success: false, message: "You haven't created a resume yet" });
    }

    return res.status(200).json({ success: true, data: { resume: deserializeResume(resume) } });
  } catch (err) {
    console.error("Get my resume error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch resume" });
  }
}

/**
 * GET /api/resume/:userId
 * Requires auth. Lets an employer (or admin) view an applicant's resume.
 * Any logged-in user can view any resume by design — resumes are meant to
 * be shown to prospective employers, similar to a public profile.
 */
async function getUserResume(req, res) {
  try {
    const { userId } = req.params;

    const resume = await prisma.resume.findUnique({
      where: { userId },
      include: { user: { select: { id: true, name: true, location: true } } },
    });

    if (!resume) {
      return res.status(404).json({ success: false, message: "This user has not created a resume yet" });
    }

    return res.status(200).json({ success: true, data: { resume: deserializeResume(resume) } });
  } catch (err) {
    console.error("Get user resume error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch resume" });
  }
}

/** Parses the JSON string fields back into arrays/objects before sending to the client. */
function deserializeResume(resume) {
  return {
    ...resume,
    skills: resume.skillsJson ? JSON.parse(resume.skillsJson) : [],
    experience: resume.experienceJson ? JSON.parse(resume.experienceJson) : [],
    education: resume.educationJson ? JSON.parse(resume.educationJson) : [],
    portfolioLinks: resume.portfolioLinksJson ? JSON.parse(resume.portfolioLinksJson) : [],
    skillsJson: undefined,
    experienceJson: undefined,
    educationJson: undefined,
    portfolioLinksJson: undefined,
  };
}

module.exports = { upsertResume, getMyResume, getUserResume };
