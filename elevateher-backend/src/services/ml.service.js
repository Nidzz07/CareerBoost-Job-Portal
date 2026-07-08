const DEFAULT_ML_SERVICE_URL = "http://localhost:8000";
const DEFAULT_ML_TIMEOUT_MS = 1500;

const ML_SERVICE_URL = (process.env.ML_SERVICE_URL || DEFAULT_ML_SERVICE_URL).replace(/\/+$/, "");
const ML_TIMEOUT_MS = Number.parseInt(process.env.ML_TIMEOUT_MS || `${DEFAULT_ML_TIMEOUT_MS}`, 10);
const REQUEST_TIMEOUT_MS = Number.isFinite(ML_TIMEOUT_MS) && ML_TIMEOUT_MS > 0 ? ML_TIMEOUT_MS : DEFAULT_ML_TIMEOUT_MS;

function compactParts(parts) {
  return parts
    .flat()
    .filter((part) => part !== undefined && part !== null && `${part}`.trim() !== "")
    .map((part) => `${part}`.trim())
    .join(" ");
}

function parseJsonArray(value) {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function buildCourseCandidate(course) {
  return {
    id: course.id,
    text: compactParts([course.category, course.title, course.level, course.language, course.description]),
  };
}

function buildJobCandidate(job) {
  return {
    id: job.id,
    text: compactParts([job.category, job.title, job.jobType, job.location, job.description]),
  };
}

function buildProductCandidate(product) {
  return {
    id: product.id,
    text: compactParts([
      product.category,
      product.name,
      product.description,
      product.seller && product.seller.location,
    ]),
  };
}

function buildUserProfileText({ user, resume, enrollments = [] } = {}) {
  const resumeSkills = resume ? parseJsonArray(resume.skillsJson || resume.skills) : [];
  const experience = resume ? parseJsonArray(resume.experienceJson || resume.experience) : [];
  const education = resume ? parseJsonArray(resume.educationJson || resume.education) : [];

  const completedCourseText = enrollments
    .filter((enrollment) => enrollment.progress >= 100 || enrollment.completedAt)
    .map((enrollment) => enrollment.course)
    .filter(Boolean)
    .map((course) => compactParts([course.category, course.title, course.level, course.language]));

  return compactParts([
    user && user.location,
    user && user.language,
    resume && resume.bio,
    resumeSkills,
    experience.map((item) => compactParts([item.title, item.company, item.description])),
    education.map((item) => compactParts([item.institution, item.degree, item.year])),
    completedCourseText,
  ]);
}

function orderByMlIds(items, rankedIds) {
  if (!Array.isArray(rankedIds) || rankedIds.length === 0) return items;

  const byId = new Map(items.map((item) => [item.id, item]));
  const seen = new Set();
  const rankedItems = [];

  for (const id of rankedIds) {
    const item = byId.get(id);
    if (item) {
      rankedItems.push(item);
      seen.add(id);
    }
  }

  return rankedItems.concat(items.filter((item) => !seen.has(item.id)));
}

function logMlError({ endpoint, durationMs, error, status }) {
  console.error("ML service request failed", {
    endpoint,
    mlServiceUrl: ML_SERVICE_URL,
    timeoutMs: REQUEST_TIMEOUT_MS,
    durationMs,
    status,
    error: error && error.message ? error.message : String(error),
  });
}

async function requestMl(endpoint, payload, fallbackValue) {
  const startedAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${ML_SERVICE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`ML service responded with HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    logMlError({
      endpoint,
      durationMs: Date.now() - startedAt,
      error,
      status: error.name === "AbortError" ? "timeout" : "request_failed",
    });
    return fallbackValue;
  } finally {
    clearTimeout(timeout);
  }
}

async function recommendCourses(payload) {
  return requestMl("/recommend/courses", payload, { recommendations: [] });
}

async function recommendJobs(payload) {
  return requestMl("/recommend/jobs", payload, { recommendations: [] });
}

async function search(payload) {
  return requestMl("/search", payload, { results: [] });
}

async function matchJobScore(payload) {
  return requestMl("/match/job-score", payload, { matchScore: 0.0 });
}

async function healthCheck() {
  const startedAt = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${ML_SERVICE_URL}/`, { signal: controller.signal });
    if (!response.ok) return { available: false, status: response.status };
    return { available: true, data: await response.json() };
  } catch (error) {
    logMlError({
      endpoint: "/",
      durationMs: Date.now() - startedAt,
      error,
      status: error.name === "AbortError" ? "timeout" : "request_failed",
    });
    return { available: false, error: error.message };
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = {
  buildCourseCandidate,
  buildJobCandidate,
  buildProductCandidate,
  buildUserProfileText,
  healthCheck,
  matchJobScore,
  orderByMlIds,
  recommendCourses,
  recommendJobs,
  search,
};
