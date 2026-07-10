const prisma = require("../config/prisma");
const {
  buildJobCandidate,
  buildUserProfileText,
  matchJobScore,
  orderByMlIds,
  recommendJobs,
  search,
} = require("../services/ml.service");

/** Parse a resume's JSON skills column into a string array. */
function resumeSkills(resume) {
  if (!resume || !resume.skillsJson) return [];
  try {
    const parsed = JSON.parse(resume.skillsJson);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * GET /api/jobs
 * Public. List active jobs, optionally filtered by category/location/jobType.
 * Query params: ?category=stitching&location=Pune&jobType=PART_TIME
 */
async function listJobs(req, res) {
  try {
    const { q, category, location, jobType } = req.query;

    let jobs = await prisma.job.findMany({
      where: {
        isActive: true,
        ...(category && { category }),
        ...(location && { location }),
        ...(jobType && { jobType }),
      },
      include: {
        employer: {
          select: { id: true, name: true, employerVerified: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const profileParts = [category, location, jobType].filter(Boolean);
    const profileText = profileParts.join(" ");
    if (profileText && jobs.length > 0) {
      const mlResult = await recommendJobs({
        userId: "anonymous",
        userProfileText: profileText,
        candidates: jobs.map(buildJobCandidate),
        limit: jobs.length,
      });
      jobs = orderByMlIds(
        jobs,
        Array.isArray(mlResult.recommendations)
          ? mlResult.recommendations.map((item) => item.id)
          : []
      );

      if (category) {
        const scoredJobs = await Promise.all(
          jobs.map(async (job, index) => {
            const result = await matchJobScore({
              userSkills: [category],
              jobTitle: job.title,
              jobDescription: job.description,
            });
            const score = Number.isFinite(result.matchScore) ? result.matchScore : 0;
            return { job, index, score };
          })
        );
        jobs = scoredJobs
          .sort((a, b) => b.score - a.score || a.index - b.index)
          .map(({ job }) => job);
      }
    }

    // Free-text search: rank the (already filtered) jobs by relevance to the query
    // using the existing ML search service.
    if (q && jobs.length > 0) {
      const mlSearch = await search({
        query: q,
        candidates: jobs.map(buildJobCandidate),
        limit: jobs.length,
      });
      jobs = orderByMlIds(
        jobs,
        Array.isArray(mlSearch.results) ? mlSearch.results.map((item) => item.id) : []
      );
    }

    return res.status(200).json({ success: true, data: { jobs } });
  } catch (err) {
    console.error("List jobs error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch jobs" });
  }
}

/**
 * GET /api/jobs/:id
 * Public. Job details.
 */
async function getJob(req, res) {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        employer: {
          select: { id: true, name: true, employerVerified: true },
        },
      },
    });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({ success: true, data: { job } });
  } catch (err) {
    console.error("Get job error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch job" });
  }
}

/**
 * POST /api/jobs
 * Requires auth (EMPLOYER/ADMIN). Creates a new job posting.
 * Employer must be verified before they can post — keeps the board spam-free.
 */
async function createJob(req, res) {
  try {
    const { title, description, category, location, jobType, salaryMin, salaryMax } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "title, description, and category are required",
      });
    }

    if (req.user.role === "EMPLOYER") {
      const employer = await prisma.user.findUnique({ where: { id: req.user.id } });
      if (!employer.employerVerified) {
        return res.status(403).json({
          success: false,
          message: "Your employer account is not verified yet. Please wait for admin approval.",
        });
      }
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        category,
        location,
        jobType: jobType || "FULL_TIME",
        salaryMin,
        salaryMax,
        employerId: req.user.id,
      },
    });

    return res.status(201).json({ success: true, message: "Job posted", data: { job } });
  } catch (err) {
    console.error("Create job error:", err);
    return res.status(500).json({ success: false, message: "Could not create job" });
  }
}

/**
 * PATCH /api/jobs/:id
 * Requires auth. Only the employer who owns the job (or admin) can update it.
 */
async function updateJob(req, res) {
  try {
    const { id } = req.params;
    const { title, description, category, location, jobType, salaryMin, salaryMax, isActive } = req.body;

    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    if (job.employerId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "You do not own this job posting" });
    }

    const updated = await prisma.job.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(category !== undefined && { category }),
        ...(location !== undefined && { location }),
        ...(jobType !== undefined && { jobType }),
        ...(salaryMin !== undefined && { salaryMin }),
        ...(salaryMax !== undefined && { salaryMax }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return res.status(200).json({ success: true, message: "Job updated", data: { job: updated } });
  } catch (err) {
    console.error("Update job error:", err);
    return res.status(500).json({ success: false, message: "Could not update job" });
  }
}

/**
 * GET /api/jobs/my-postings
 * Requires auth (EMPLOYER). Lists jobs posted by the logged-in employer.
 */
async function getMyPostings(req, res) {
  try {
    const jobs = await prisma.job.findMany({
      where: { employerId: req.user.id },
      include: { applications: true },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, data: { jobs } });
  } catch (err) {
    console.error("Get my postings error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch your job postings" });
  }
}

/**
 * POST /api/jobs/:id/apply
 * Requires auth (LEARNER). Applies to a job.
 */
async function applyToJob(req, res) {
  try {
    const { id: jobId } = req.params;
    const { coverNote } = req.body;
    const userId = req.user.id;

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job || !job.isActive) {
      return res.status(404).json({ success: false, message: "Job not found or no longer active" });
    }

    const existing = await prisma.application.findUnique({
      where: { jobId_userId: { jobId, userId } },
    });
    if (existing) {
      return res.status(409).json({ success: false, message: "You have already applied to this job" });
    }

    const application = await prisma.application.create({
      data: { jobId, userId, coverNote },
    });

    return res.status(201).json({ success: true, message: "Application submitted", data: { application } });
  } catch (err) {
    console.error("Apply to job error:", err);
    return res.status(500).json({ success: false, message: "Could not submit application" });
  }
}

/**
 * GET /api/jobs/my-applications
 * Requires auth (LEARNER). Lists the logged-in user's applications with job details.
 */
async function getMyApplications(req, res) {
  try {
    const applications = await prisma.application.findMany({
      where: { userId: req.user.id },
      include: { job: true },
      orderBy: { appliedAt: "desc" },
    });

    return res.status(200).json({ success: true, data: { applications } });
  } catch (err) {
    console.error("Get my applications error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch your applications" });
  }
}

/**
 * GET /api/jobs/:id/applications
 * Requires auth. Only the employer who owns the job (or admin) can view applicants.
 */
async function getJobApplications(req, res) {
  try {
    const { id: jobId } = req.params;

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    if (job.employerId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "You do not own this job posting" });
    }

    const applications = await prisma.application.findMany({
      where: { jobId },
      include: {
        user: { select: { id: true, name: true, phone: true, location: true } },
      },
      orderBy: { appliedAt: "desc" },
    });

    return res.status(200).json({ success: true, data: { applications } });
  } catch (err) {
    console.error("Get job applications error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch applications" });
  }
}

/**
 * PATCH /api/jobs/applications/:id/status
 * Requires auth. Only the employer who owns the job (or admin) can change status.
 * Body: { status: "SHORTLISTED" | "REJECTED" | "HIRED" }
 */
async function updateApplicationStatus(req, res) {
  try {
    const { id: applicationId } = req.params;
    const { status } = req.body;

    const validStatuses = ["PENDING", "SHORTLISTED", "REJECTED", "HIRED"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `status must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { job: true },
    });
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }
    if (application.job.employerId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "You do not own this job posting" });
    }

    const updated = await prisma.application.update({
      where: { id: applicationId },
      data: { status },
    });

    return res.status(200).json({ success: true, message: "Application status updated", data: { application: updated } });
  } catch (err) {
    console.error("Update application status error:", err);
    return res.status(500).json({ success: false, message: "Could not update application status" });
  }
}

/**
 * PATCH /api/jobs/employers/:userId/verify
 * Requires auth (ADMIN). Marks an employer account as verified.
 */
async function verifyEmployer(req, res) {
  try {
    const { userId } = req.params;

    const employer = await prisma.user.findUnique({ where: { id: userId } });
    if (!employer || employer.role !== "EMPLOYER") {
      return res.status(404).json({ success: false, message: "Employer account not found" });
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { employerVerified: true },
    });

    return res.status(200).json({
      success: true,
      message: "Employer verified",
      data: { user: { id: updated.id, name: updated.name, employerVerified: updated.employerVerified } },
    });
  } catch (err) {
    console.error("Verify employer error:", err);
    return res.status(500).json({ success: false, message: "Could not verify employer" });
  }
}

/**
 * POST /api/jobs/:id/review
 * Requires auth. Leave a rating/review for the other party on a job
 * (learner reviews employer, or employer reviews the hired learner).
 * Body: { revieweeId, rating (1-5), comment }
 */
async function addReview(req, res) {
  try {
    const { id: jobId } = req.params;
    const { revieweeId, rating, comment } = req.body;
    const reviewerId = req.user.id;

    if (!revieweeId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "revieweeId and rating (1-5) are required",
      });
    }

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const existing = await prisma.review.findUnique({
      where: { jobId_reviewerId_revieweeId: { jobId, reviewerId, revieweeId } },
    });
    if (existing) {
      return res.status(409).json({ success: false, message: "You have already reviewed this person for this job" });
    }

    const review = await prisma.review.create({
      data: { jobId, reviewerId, revieweeId, rating, comment },
    });

    return res.status(201).json({ success: true, message: "Review submitted", data: { review } });
  } catch (err) {
    console.error("Add review error:", err);
    return res.status(500).json({ success: false, message: "Could not submit review" });
  }
}

/**
 * GET /api/jobs/users/:userId/reviews
 * Public. Lists reviews received by a user (e.g. an employer's rating history).
 */
async function getUserReviews(req, res) {
  try {
    const { userId } = req.params;

    const reviews = await prisma.review.findMany({
      where: { revieweeId: userId },
      include: {
        reviewer: { select: { id: true, name: true } },
        job: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const avgRating =
      reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : null;

    return res.status(200).json({
      success: true,
      data: { reviews, avgRating, totalReviews: reviews.length },
    });
  } catch (err) {
    console.error("Get user reviews error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch reviews" });
  }
}

// ---------- INTERVIEW SCHEDULING ----------

/**
 * POST /api/jobs/applications/:applicationId/interview
 * Requires auth. Only the employer who owns the job (or admin) can schedule.
 * Body: { scheduledAt (ISO date string), mode ("ONLINE"|"IN_PERSON"|"PHONE"), location, notes }
 */
async function scheduleInterview(req, res) {
  try {
    const { applicationId } = req.params;
    const { scheduledAt, mode, location, notes } = req.body;

    if (!scheduledAt) {
      return res.status(400).json({ success: false, message: "scheduledAt is required" });
    }
    const parsedDate = new Date(scheduledAt);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ success: false, message: "scheduledAt must be a valid date" });
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { job: true, interview: true },
    });
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }
    if (application.job.employerId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "You do not own this job posting" });
    }
    if (application.interview) {
      return res.status(409).json({
        success: false,
        message: "An interview is already scheduled for this application. Use the update endpoint to reschedule.",
      });
    }

    const interview = await prisma.interview.create({
      data: {
        applicationId,
        scheduledAt: parsedDate,
        mode: mode || "ONLINE",
        location,
        notes,
      },
    });

    // Reflect the interview in the application status so it shows up clearly in listings.
    await prisma.application.update({
      where: { id: applicationId },
      data: { status: "SHORTLISTED" },
    });

    return res.status(201).json({ success: true, message: "Interview scheduled", data: { interview } });
  } catch (err) {
    console.error("Schedule interview error:", err);
    return res.status(500).json({ success: false, message: "Could not schedule interview" });
  }
}

/**
 * PATCH /api/jobs/interviews/:id
 * Requires auth. Only the employer who owns the job (or admin) can update.
 * Body: any of { scheduledAt, mode, location, notes, status }
 * status: SCHEDULED | COMPLETED | CANCELLED | RESCHEDULED
 */
async function updateInterview(req, res) {
  try {
    const { id } = req.params;
    const { scheduledAt, mode, location, notes, status } = req.body;

    const interview = await prisma.interview.findUnique({
      where: { id },
      include: { application: { include: { job: true } } },
    });
    if (!interview) {
      return res.status(404).json({ success: false, message: "Interview not found" });
    }
    if (interview.application.job.employerId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "You do not own this job posting" });
    }

    const validStatuses = ["SCHEDULED", "COMPLETED", "CANCELLED", "RESCHEDULED"];
    if (status !== undefined && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `status must be one of: ${validStatuses.join(", ")}`,
      });
    }

    let parsedDate;
    if (scheduledAt !== undefined) {
      parsedDate = new Date(scheduledAt);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ success: false, message: "scheduledAt must be a valid date" });
      }
    }

    const updated = await prisma.interview.update({
      where: { id },
      data: {
        ...(parsedDate && { scheduledAt: parsedDate }),
        ...(mode !== undefined && { mode }),
        ...(location !== undefined && { location }),
        ...(notes !== undefined && { notes }),
        ...(status !== undefined && { status }),
      },
    });

    return res.status(200).json({ success: true, message: "Interview updated", data: { interview: updated } });
  } catch (err) {
    console.error("Update interview error:", err);
    return res.status(500).json({ success: false, message: "Could not update interview" });
  }
}

/**
 * GET /api/jobs/my-interviews
 * Requires auth (LEARNER). Lists interviews scheduled for the logged-in
 * user's own applications.
 */
async function getMyInterviews(req, res) {
  try {
    const interviews = await prisma.interview.findMany({
      where: { application: { userId: req.user.id } },
      include: { application: { include: { job: true } } },
      orderBy: { scheduledAt: "asc" },
    });

    return res.status(200).json({ success: true, data: { interviews } });
  } catch (err) {
    console.error("Get my interviews error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch your interviews" });
  }
}

/**
 * GET /api/jobs/employer-interviews
 * Requires auth (EMPLOYER/ADMIN). Lists interviews across all of the
 * logged-in employer's job postings.
 */
async function getEmployerInterviews(req, res) {
  try {
    const interviews = await prisma.interview.findMany({
      where: { application: { job: { employerId: req.user.id } } },
      include: {
        application: {
          include: { job: true, user: { select: { id: true, name: true, phone: true } } },
        },
      },
      orderBy: { scheduledAt: "asc" },
    });

    return res.status(200).json({ success: true, data: { interviews } });
  } catch (err) {
    console.error("Get employer interviews error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch interviews" });
  }
}

/**
 * DELETE /api/jobs/:id
 * Requires auth (owner employer/admin). Blocked if the job already has applicants —
 * deactivate it instead (PATCH isActive:false).
 */
async function deleteJob(req, res) {
  try {
    const { id } = req.params;
    const job = await prisma.job.findUnique({
      where: { id },
      include: { _count: { select: { applications: true } } },
    });
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    if (job.employerId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "You do not own this job posting" });
    }
    if (job._count.applications > 0) {
      return res.status(409).json({
        success: false,
        message: "Cannot delete a job with applicants. Deactivate it instead.",
      });
    }

    await prisma.savedJob.deleteMany({ where: { jobId: id } });
    await prisma.review.deleteMany({ where: { jobId: id } });
    await prisma.job.delete({ where: { id } });

    return res.status(200).json({ success: true, message: "Job deleted" });
  } catch (err) {
    console.error("Delete job error:", err);
    return res.status(500).json({ success: false, message: "Could not delete job" });
  }
}

// ---------- SAVED JOBS ----------

/** POST /api/jobs/:id/save — bookmark a job. */
async function saveJob(req, res) {
  try {
    const { id: jobId } = req.params;
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    await prisma.savedJob.upsert({
      where: { userId_jobId: { userId: req.user.id, jobId } },
      update: {},
      create: { userId: req.user.id, jobId },
    });
    return res.status(200).json({ success: true, message: "Job saved" });
  } catch (err) {
    console.error("Save job error:", err);
    return res.status(500).json({ success: false, message: "Could not save job" });
  }
}

/** DELETE /api/jobs/:id/save — remove a bookmark. */
async function unsaveJob(req, res) {
  try {
    const { id: jobId } = req.params;
    await prisma.savedJob.deleteMany({ where: { userId: req.user.id, jobId } });
    return res.status(200).json({ success: true, message: "Job removed from saved" });
  } catch (err) {
    console.error("Unsave job error:", err);
    return res.status(500).json({ success: false, message: "Could not update saved jobs" });
  }
}

/** GET /api/jobs/my/saved — the caller's saved jobs. */
async function getSavedJobs(req, res) {
  try {
    const saved = await prisma.savedJob.findMany({
      where: { userId: req.user.id },
      include: { job: { include: { employer: { select: { id: true, name: true, employerVerified: true } } } } },
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({ success: true, data: { jobs: saved.map((s) => s.job) } });
  } catch (err) {
    console.error("Get saved jobs error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch saved jobs" });
  }
}

/**
 * DELETE /api/jobs/applications/:id
 * Requires auth (application owner). Withdraws an application (and any interview).
 * Blocked once the candidate has been hired.
 */
async function withdrawApplication(req, res) {
  try {
    const { id } = req.params;
    const application = await prisma.application.findUnique({ where: { id }, include: { interview: true } });
    if (!application) return res.status(404).json({ success: false, message: "Application not found" });
    if (application.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: "This is not your application" });
    }
    if (application.status === "HIRED") {
      return res.status(409).json({ success: false, message: "You can't withdraw after being hired" });
    }

    if (application.interview) {
      await prisma.interview.delete({ where: { id: application.interview.id } });
    }
    await prisma.application.delete({ where: { id } });

    return res.status(200).json({ success: true, message: "Application withdrawn" });
  } catch (err) {
    console.error("Withdraw application error:", err);
    return res.status(500).json({ success: false, message: "Could not withdraw application" });
  }
}

// ---------- ML: MATCH SCORE & RECOMMENDATIONS ----------

/**
 * GET /api/jobs/:id/match
 * Requires auth. Match score (%) between the caller's resume skills and this job,
 * via the existing ML skill-to-job matching, plus which of their skills the job mentions.
 */
async function getJobMatch(req, res) {
  try {
    const { id } = req.params;
    const job = await prisma.job.findUnique({ where: { id } });
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    const resume = await prisma.resume.findUnique({ where: { userId: req.user.id } });
    const skills = resumeSkills(resume);

    if (skills.length === 0) {
      return res.status(200).json({
        success: true,
        data: { matchScore: 0, matchPercent: 0, matchedSkills: [], hasSkills: false },
      });
    }

    const result = await matchJobScore({
      userSkills: skills,
      jobTitle: job.title,
      jobDescription: job.description,
    });
    const matchScore = Number.isFinite(result.matchScore) ? result.matchScore : 0;

    const jobText = `${job.title} ${job.description}`.toLowerCase();
    const matchedSkills = skills.filter((s) => jobText.includes(String(s).toLowerCase()));

    return res.status(200).json({
      success: true,
      data: { matchScore, matchPercent: Math.round(matchScore * 100), matchedSkills, hasSkills: true },
    });
  } catch (err) {
    console.error("Get job match error:", err);
    return res.status(500).json({ success: false, message: "Could not compute match score" });
  }
}

/**
 * GET /api/jobs/recommendations
 * Requires auth. Personalized job recommendations from the caller's profile/resume/
 * completed courses, ranked by the existing ML recommend endpoint. Excludes jobs the
 * user has already applied to.
 */
async function getRecommendedJobs(req, res) {
  try {
    const [user, resume, enrollments, applications, jobs] = await Promise.all([
      prisma.user.findUnique({ where: { id: req.user.id } }),
      prisma.resume.findUnique({ where: { userId: req.user.id } }),
      prisma.enrollment.findMany({ where: { userId: req.user.id }, include: { course: true } }),
      prisma.application.findMany({ where: { userId: req.user.id }, select: { jobId: true } }),
      prisma.job.findMany({
        where: { isActive: true },
        include: { employer: { select: { id: true, name: true, employerVerified: true } } },
      }),
    ]);

    const appliedIds = new Set(applications.map((a) => a.jobId));
    const candidates = jobs.filter((j) => !appliedIds.has(j.id));

    let recommended = candidates;
    const profileText = buildUserProfileText({ user, resume, enrollments });

    if (profileText && candidates.length > 0) {
      const mlResult = await recommendJobs({
        userId: req.user.id,
        userProfileText: profileText,
        candidates: candidates.map(buildJobCandidate),
        limit: candidates.length,
      });
      recommended = orderByMlIds(
        candidates,
        Array.isArray(mlResult.recommendations) ? mlResult.recommendations.map((item) => item.id) : []
      );
    }

    return res.status(200).json({ success: true, data: { jobs: recommended.slice(0, 10) } });
  } catch (err) {
    console.error("Get recommended jobs error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch recommendations" });
  }
}

module.exports = {
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
};
