import { api, tokenStore } from "./client";
import type {
  User, Course, Job, Product, Notification,
  LoginPayload, SignupPayload, AuthResponse, Paginated,
} from "@/app/types";

/**
 * Backend (Prisma) user shape returned by the auth endpoints. Only the fields the
 * frontend consumes are declared; everything is normalised into the frontend
 * `User` model via mapUser() so components never see backend field names.
 */
interface BackendUser {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  language?: string | null;
  location?: string | null;
  avatarUrl?: string | null;
  role?: string | null;
  onboarded?: boolean | null;
}

// Backend roles (uppercase) → frontend Role union. Centralised so every auth/user
// response maps consistently.
const ROLE_MAP: Record<string, User["role"]> = {
  LEARNER: "learner",
  EMPLOYER: "earner",
  SELLER: "seller",
  ADMIN: "all",
};

/** Central mapping from the backend user model into the frontend User type. */
export function mapUser(bu: BackendUser): User {
  return {
    id: bu.id,
    name: bu.name,
    email: bu.email ?? "",
    phone: bu.phone ?? undefined,
    language: bu.language ?? undefined,
    location: bu.location ?? undefined,
    avatar_url: bu.avatarUrl ?? undefined,
    role: bu.role ? ROLE_MAP[bu.role] ?? "all" : undefined,
    onboarded: bu.onboarded ?? undefined,
  };
}

// Reverse map: frontend Role → backend role string (for onboarding).
const BACKEND_ROLE: Record<string, string> = {
  learner: "LEARNER",
  earner: "EMPLOYER",
  seller: "SELLER",
  all: "ADMIN",
};

type BackendAuthData = { token: string; refresh_token?: string; user: BackendUser };

export const authApi = {
  // Real backend login (phone + password). The Phase 1 response adapter unwraps the
  // `{ success, data }` envelope, so `r.data` is the inner `{ token, user }`.
  login: (payload: LoginPayload) =>
    api.post<BackendAuthData>("/auth/login", payload).then(
      (r): AuthResponse => ({
        token: r.data.token,
        refresh_token: r.data.refresh_token,
        user: mapUser(r.data.user),
      }),
    ),
  // Real backend signup (name + phone + password required, email optional).
  signup: (payload: SignupPayload) =>
    api.post<BackendAuthData>("/auth/signup", payload).then(
      (r): AuthResponse => ({
        token: r.data.token,
        refresh_token: r.data.refresh_token,
        user: mapUser(r.data.user),
      }),
    ),
  // Password reset (phone-based, to match auth). Request a code, then reset with it.
  forgotPassword: (phone: string) =>
    api.post<{ message: string }>("/auth/forgot-password", { phone }).then((r) => r.data),
  resetPassword: (payload: { phone: string; code: string; newPassword: string }) =>
    api.post<{ message: string }>("/auth/reset-password", payload).then((r) => r.data),
  // Phone verification (OTP).
  sendOtp: (phone: string) => api.post<{ message: string }>("/auth/send-otp", { phone }).then((r) => r.data),
  verifyOtp: (phone: string, code: string) =>
    api.post<{ message: string }>("/auth/verify-otp", { phone, code }).then((r) => r.data),
  // Revoke the stored refresh token server-side, then the store clears local tokens.
  // Best-effort — failures are ignored so logout always proceeds.
  logout: () => api.post("/auth/logout", { refresh_token: tokenStore.getRefresh() }).then((r) => r.data),
};

export const userApi = {
  // Current authenticated user via GET /auth/me. Backend returns `{ user }` under
  // the envelope; mapped centrally into the frontend User model.
  profile: () => api.get<{ user: BackendUser }>("/auth/me").then((r) => mapUser(r.data.user)),
  // Update the caller's profile. Only name/location/avatarUrl are persisted on User;
  // bio/skills live on the Resume model (handled in a later phase).
  updateProfile: (payload: { name?: string; location?: string; avatarUrl?: string }) =>
    api.patch<{ user: BackendUser }>("/user", payload).then((r) => mapUser(r.data.user)),
  // Account settings persistence.
  getSettings: () => api.get<{ settings: Record<string, unknown> }>("/user/settings").then((r) => r.data.settings),
  updateSettings: (settings: Record<string, unknown>) =>
    api.put<{ settings: Record<string, unknown> }>("/user/settings", { settings }).then((r) => r.data.settings),
  // Onboarding persists language + role (+ location). Role is mapped to the backend
  // vocabulary before sending.
  completeOnboarding: (payload: { language: string; role?: string; location?: string }) =>
    api
      .patch<{ user: BackendUser }>("/auth/onboarding", {
        language: payload.language,
        ...(payload.location !== undefined && { location: payload.location }),
        ...(payload.role && { role: BACKEND_ROLE[payload.role] ?? payload.role }),
      })
      .then((r) => mapUser(r.data.user)),
};

// ---- Learn / Earn / Flourish response mappers -------------------------------
// The Express controllers return Prisma rows under a `{ <resource> }` key (already
// unwrapped from the `{ success, data }` envelope by the Phase 1 interceptor).
// These helpers normalise those shapes into the frontend models in ONE place so
// components never see backend field names. Fields the backend does not track yet
// (course rating/lessons, job remote flag/skills, product rating) get neutral
// defaults — see the Phase 3 report for the full list.

interface BackendCourse {
  id: string; title: string; description?: string | null; category: string;
  language?: string | null; level?: string | null; duration?: number | null;
  price?: number | null; mediaUrl?: string | null;
  reviewStatus?: string | null; isPublished?: boolean | null;
}
interface BackendEnrollment {
  id: string; progress: number; completedAt?: string | null;
  paymentStatus?: string; certificateUrl?: string | null;
  completedLessonsJson?: string | null; course: BackendCourse;
}
interface BackendJob {
  id: string; title: string; description?: string | null; category: string;
  location?: string | null; jobType?: string | null;
  salaryMin?: number | null; salaryMax?: number | null; createdAt?: string;
  employer?: { id: string; name: string; employerVerified?: boolean } | null;
}
interface BackendProduct {
  id: string; name: string; description?: string | null; category: string;
  price: number; stock?: number | null; imageUrl?: string | null; createdAt?: string;
  seller?: { id: string; name: string; location?: string | null } | null;
}

const JOB_TYPE_MAP: Record<string, Job["type"]> = {
  FULL_TIME: "full-time",
  PART_TIME: "part-time",
  CONTRACT: "contract",
  GIG: "gig",
};

export function mapCourse(c: BackendCourse): Course {
  return {
    id: c.id,
    title: c.title,
    description: c.description ?? "",
    category: c.category,
    level: (c.level ?? "BEGINNER").toLowerCase() as Course["level"],
    duration_hours: c.duration ?? 0,
    lessons_count: 0, // backend has no lessons model yet
    rating: 0, // backend Course has no aggregated rating
    reviews_count: 0,
    price: c.price ?? 0,
    language: c.language ?? undefined,
    mentor: { name: "Mentor" }, // getCourse does not include mentor details
  };
}

export function mapJob(j: BackendJob): Job {
  return {
    id: j.id,
    title: j.title,
    category: j.category,
    company: { name: j.employer?.name ?? "Employer", verified: j.employer?.employerVerified ?? false },
    location: j.location ?? "",
    remote: false, // backend Job has no remote flag
    type: JOB_TYPE_MAP[j.jobType ?? "FULL_TIME"] ?? "full-time",
    salary_min: j.salaryMin ?? undefined,
    salary_max: j.salaryMax ?? undefined,
    currency: "INR",
    posted_at: j.createdAt ?? new Date().toISOString(),
    skills: [], // backend Job has no skills array
    description: j.description ?? "",
  };
}

export function mapProduct(p: BackendProduct): Product {
  return {
    id: p.id,
    name: p.name,
    description: p.description ?? "",
    price: p.price,
    currency: "INR",
    category: p.category,
    images: p.imageUrl ? [p.imageUrl] : [],
    seller: {
      id: p.seller?.id ?? "",
      name: p.seller?.name ?? "Seller",
      location: p.seller?.location ?? undefined,
    },
    stock: p.stock ?? undefined,
  };
}

/** Wrap a plain array into the Paginated shape the list pages expect. */
function toPage<T>(items: T[]): Paginated<T> {
  return { items, total: items.length, page: 1, per_page: items.length };
}

// ---- Learn domain types (Phase 2) -------------------------------------------
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content?: string;
  videoUrl?: string;
  order: number;
}
export interface EnrolledCourse {
  id: string;
  progress: number;
  completedLessons: string[];
  certificateUrl?: string;
  completedAt?: string;
  enrolledAt?: string;
  lastActivityAt?: string;
  paymentStatus?: string;
  course: Course;
}
export interface CreatedCourse extends Course {
  reviewStatus?: string;
  isPublished?: boolean;
}
export interface CourseReviewItem {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user?: { id: string; name: string };
}
export interface CourseReviews {
  reviews: CourseReviewItem[];
  avgRating: number | null;
  totalReviews: number;
  sentiment: { overallScore: number; trustLabel: string } | null;
}
export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
}
export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  passingScore: number;
  questions: QuizQuestion[];
}
export interface QuizResult {
  score: number;
  passed: boolean;
  correctCount: number;
  totalQuestions: number;
}
export interface PaymentOrder {
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
}
export interface AtRiskLearner {
  enrollmentId: string;
  riskScore: number;
  progress: number;
  learner: { id: string; name: string; phone?: string };
}

interface BackendEnrollmentFull extends BackendEnrollment {
  lastActivityAt?: string | null;
  enrolledAt?: string | null;
}

function parseJsonArray(value?: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function mapEnrollment(e: BackendEnrollmentFull): EnrolledCourse {
  return {
    id: e.id,
    progress: e.progress ?? 0,
    completedLessons: parseJsonArray(e.completedLessonsJson),
    certificateUrl: e.certificateUrl ?? undefined,
    completedAt: e.completedAt ?? undefined,
    enrolledAt: e.enrolledAt ?? undefined,
    lastActivityAt: e.lastActivityAt ?? undefined,
    paymentStatus: e.paymentStatus ?? undefined,
    course: mapCourse(e.course),
  };
}

function mapCreatedCourse(c: BackendCourse): CreatedCourse {
  return { ...mapCourse(c), reviewStatus: c.reviewStatus ?? undefined, isPublished: c.isPublished ?? undefined };
}

export const coursesApi = {
  list: (params?: { q?: string; category?: string; language?: string; page?: number }) =>
    api
      .get<{ courses: BackendCourse[] }>("/learn/courses", { params })
      .then((r) => toPage((r.data.courses ?? []).map(mapCourse))),
  get: (id: string) =>
    api.get<{ course: BackendCourse }>(`/learn/courses/${id}`).then((r) => mapCourse(r.data.course)),
  enroll: (id: string) =>
    api
      .post<{ enrollment: BackendEnrollment; requiresPayment?: boolean; price?: number }>(
        `/learn/courses/${id}/enroll`,
      )
      .then((r) => r.data),
  // The logged-in learner's enrollments (course + progress + completed lessons).
  myCourses: () =>
    api
      .get<{ enrollments: BackendEnrollmentFull[] }>("/learn/my-courses")
      .then((r) => (r.data.enrollments ?? []).map(mapEnrollment)),
  // Personalized recommendations (ML recommend endpoint via the backend).
  recommended: () =>
    api.get<{ courses: BackendCourse[] }>("/learn/recommendations").then((r) => (r.data.courses ?? []).map(mapCourse)),

  // Lessons (course content / player)
  lessons: (courseId: string) =>
    api.get<{ lessons: Lesson[] }>(`/learn/courses/${courseId}/lessons`).then((r) => r.data.lessons ?? []),
  createLesson: (courseId: string, payload: { title: string; content?: string; videoUrl?: string; order?: number }) =>
    api.post<{ lesson: Lesson }>(`/learn/courses/${courseId}/lessons`, payload).then((r) => r.data.lesson),
  updateLesson: (id: string, payload: Partial<{ title: string; content: string; videoUrl: string; order: number }>) =>
    api.patch<{ lesson: Lesson }>(`/learn/lessons/${id}`, payload).then((r) => r.data.lesson),
  deleteLesson: (id: string) => api.delete(`/learn/lessons/${id}`).then((r) => r.data),

  // Progress
  updateProgress: (enrollmentId: string, payload: { progress: number; completedLessons?: string[] }) =>
    api
      .patch<{ enrollment: BackendEnrollmentFull }>(`/learn/enrollments/${enrollmentId}/progress`, payload)
      .then((r) => mapEnrollment(r.data.enrollment)),

  // Quizzes
  getQuiz: (courseId: string) =>
    api.get<{ quiz: Quiz }>(`/learn/courses/${courseId}/quiz`).then((r) => r.data.quiz),
  submitQuiz: (quizId: string, answers: number[]) =>
    api.post<{ attempt: QuizResult }>(`/learn/quizzes/${quizId}/attempt`, { answers }).then((r) => r.data.attempt),
  createQuiz: (
    courseId: string,
    payload: { title: string; passingScore?: number; questions: Array<{ questionText: string; options: string[]; correctOptionIndex: number }> },
  ) => api.post(`/learn/courses/${courseId}/quiz`, payload).then((r) => r.data),

  // Certificates
  certificate: (enrollmentId: string) =>
    api.get<{ certificateUrl: string }>(`/learn/enrollments/${enrollmentId}/certificate`).then((r) => r.data.certificateUrl),

  // Reviews (+ ML sentiment summary)
  reviews: (courseId: string) =>
    api.get<CourseReviews>(`/learn/courses/${courseId}/reviews`).then((r) => r.data),
  addReview: (courseId: string, payload: { rating: number; comment?: string }) =>
    api.post(`/learn/courses/${courseId}/review`, payload).then((r) => r.data),

  // Creator workflow
  create: (payload: { title: string; description?: string; category: string; language?: string; level?: string; mediaUrl?: string; duration?: number; price?: number }) =>
    api.post<{ course: BackendCourse }>("/learn/courses", payload).then((r) => mapCreatedCourse(r.data.course)),
  update: (id: string, payload: Partial<{ title: string; description: string; category: string; language: string; level: string; mediaUrl: string; duration: number; price: number }>) =>
    api.patch<{ course: BackendCourse }>(`/learn/courses/${id}`, payload).then((r) => mapCreatedCourse(r.data.course)),
  remove: (id: string) => api.delete(`/learn/courses/${id}`).then((r) => r.data),
  myCreated: () =>
    api.get<{ courses: BackendCourse[] }>("/learn/my-created-courses").then((r) => (r.data.courses ?? []).map(mapCreatedCourse)),

  // Admin review queue
  pending: () =>
    api.get<{ courses: BackendCourse[] }>("/learn/courses/pending").then((r) => (r.data.courses ?? []).map(mapCreatedCourse)),
  review: (id: string, payload: { approve: boolean; rejectionReason?: string }) =>
    api.patch(`/learn/courses/${id}/review`, payload).then((r) => r.data),

  // Paid-course payment (Razorpay)
  createPayment: (enrollmentId: string) =>
    api.post<PaymentOrder>(`/learn/enrollments/${enrollmentId}/create-payment`).then((r) => r.data),
  verifyPayment: (enrollmentId: string, payload: { razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature: string }) =>
    api.post(`/learn/enrollments/${enrollmentId}/verify-payment`, payload).then((r) => r.data),

  // Creator dropout insight (ML)
  atRisk: (courseId: string) =>
    api.get<{ atRisk: AtRiskLearner[]; totalEnrolled: number }>(`/learn/courses/${courseId}/at-risk`).then((r) => r.data),
};

// ---- Earn domain types (Phase 3) --------------------------------------------
export interface JobApplication {
  id: string;
  status: string;
  coverNote?: string;
  appliedAt: string;
  job: Job;
}
export interface JobInterview {
  id: string;
  scheduledAt: string;
  mode: string;
  location?: string;
  status: string;
  notes?: string;
  job: Job;
  applicant?: { id: string; name: string; phone?: string };
}
export interface Applicant {
  id: string;
  status: string;
  coverNote?: string;
  appliedAt: string;
  user: { id: string; name: string; phone?: string; location?: string };
}
export interface JobMatch {
  matchScore: number;
  matchPercent: number;
  matchedSkills: string[];
  hasSkills: boolean;
}
export interface UserReview {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  reviewer?: { id: string; name: string };
  job?: { id: string; title: string };
}
export interface UserReviews {
  reviews: UserReview[];
  avgRating: number | null;
  totalReviews: number;
}
export interface EmployerPosting extends Job {
  applicationCount: number;
}

interface BackendApplication {
  id: string; status: string; coverNote?: string | null; appliedAt: string; job: BackendJob;
}
interface BackendInterview {
  id: string; scheduledAt: string; mode: string; location?: string | null; status: string; notes?: string | null;
  application: { id: string; job: BackendJob; user?: { id: string; name: string; phone?: string } };
}

export const jobsApi = {
  list: (params?: { q?: string; location?: string; remote?: boolean; type?: string; page?: number }) =>
    api.get<{ jobs: BackendJob[] }>("/jobs", { params }).then((r) => toPage((r.data.jobs ?? []).map(mapJob))),
  get: (id: string) => api.get<{ job: BackendJob }>(`/jobs/${id}`).then((r) => mapJob(r.data.job)),
  apply: (id: string, payload: { note?: string }) =>
    api.post(`/jobs/${id}/apply`, { coverNote: payload.note }).then((r) => r.data),
  // Per-job ML match score for the signed-in user (skills-to-job matching).
  match: (id: string) => api.get<JobMatch>(`/jobs/${id}/match`).then((r) => r.data),

  // Saved jobs
  save: (id: string) => api.post(`/jobs/${id}/save`).then((r) => r.data),
  unsave: (id: string) => api.delete(`/jobs/${id}/save`).then((r) => r.data),
  saved: () => api.get<{ jobs: BackendJob[] }>("/jobs/my/saved").then((r) => (r.data.jobs ?? []).map(mapJob)),

  // Personalized recommendations (ML recommend endpoint via the backend).
  recommended: () =>
    api.get<{ jobs: BackendJob[] }>("/jobs/recommendations").then((r) => (r.data.jobs ?? []).map(mapJob)),

  // Applications (learner)
  myApplications: () =>
    api
      .get<{ applications: BackendApplication[] }>("/jobs/my/applications")
      .then((r) => (r.data.applications ?? []).map((a): JobApplication => ({
        id: a.id, status: a.status, coverNote: a.coverNote ?? undefined, appliedAt: a.appliedAt, job: mapJob(a.job),
      }))),
  withdraw: (applicationId: string) => api.delete(`/jobs/applications/${applicationId}`).then((r) => r.data),
  myInterviews: () =>
    api.get<{ interviews: BackendInterview[] }>("/jobs/my/interviews").then((r) =>
      (r.data.interviews ?? []).map((iv): JobInterview => ({
        id: iv.id, scheduledAt: iv.scheduledAt, mode: iv.mode, location: iv.location ?? undefined,
        status: iv.status, notes: iv.notes ?? undefined, job: mapJob(iv.application.job),
      }))),

  // Employer job management
  create: (payload: { title: string; description: string; category: string; location?: string; jobType?: string; salaryMin?: number; salaryMax?: number }) =>
    api.post<{ job: BackendJob }>("/jobs", payload).then((r) => mapJob(r.data.job)),
  update: (id: string, payload: Partial<{ title: string; description: string; category: string; location: string; jobType: string; salaryMin: number; salaryMax: number; isActive: boolean }>) =>
    api.patch<{ job: BackendJob }>(`/jobs/${id}`, payload).then((r) => mapJob(r.data.job)),
  remove: (id: string) => api.delete(`/jobs/${id}`).then((r) => r.data),
  myPostings: () =>
    api
      .get<{ jobs: Array<BackendJob & { applications?: unknown[] }> }>("/jobs/my/postings")
      .then((r) => (r.data.jobs ?? []).map((j): EmployerPosting => ({ ...mapJob(j), applicationCount: j.applications?.length ?? 0 }))),
  applicants: (jobId: string) =>
    api.get<{ applications: Applicant[] }>(`/jobs/${jobId}/applications`).then((r) => r.data.applications ?? []),
  setApplicationStatus: (applicationId: string, status: string) =>
    api.patch(`/jobs/applications/${applicationId}/status`, { status }).then((r) => r.data),
  scheduleInterview: (applicationId: string, payload: { scheduledAt: string; mode?: string; location?: string; notes?: string }) =>
    api.post(`/jobs/applications/${applicationId}/interview`, payload).then((r) => r.data),
  updateInterview: (id: string, payload: Partial<{ scheduledAt: string; mode: string; location: string; notes: string; status: string }>) =>
    api.patch(`/jobs/interviews/${id}`, payload).then((r) => r.data),

  // Job-specific reviews (user-to-user, tied to a job)
  addReview: (jobId: string, payload: { revieweeId: string; rating: number; comment?: string }) =>
    api.post(`/jobs/${jobId}/review`, payload).then((r) => r.data),
  userReviews: (userId: string) =>
    api.get<UserReviews>(`/jobs/users/${userId}/reviews`).then((r) => r.data),
};

// ---- Resume domain types (Phase 5) ------------------------------------------
export interface ResumeExperience {
  title: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}
export interface ResumeEducation {
  institution: string;
  degree?: string;
  year?: string;
}
export interface Resume {
  id?: string;
  userId?: string;
  bio?: string;
  skills: string[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
  portfolioLinks: string[];
  resumeFileUrl?: string;
  user?: { id: string; name: string; location?: string };
}
export interface ResumeInput {
  bio?: string;
  skills?: string[];
  experience?: ResumeExperience[];
  education?: ResumeEducation[];
  portfolioLinks?: string[];
  resumeFileUrl?: string;
}

interface BackendResume {
  id?: string; userId?: string; bio?: string | null; resumeFileUrl?: string | null;
  skills?: unknown; experience?: unknown; education?: unknown; portfolioLinks?: unknown;
  user?: { id: string; name: string; location?: string | null } | null;
}

/** Normalises the backend (deserialised) resume into the frontend Resume model. */
function mapResume(raw: BackendResume | null | undefined): Resume {
  const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
  return {
    id: raw?.id,
    userId: raw?.userId,
    bio: raw?.bio ?? undefined,
    skills: arr<string>(raw?.skills),
    experience: arr<ResumeExperience>(raw?.experience),
    education: arr<ResumeEducation>(raw?.education),
    portfolioLinks: arr<string>(raw?.portfolioLinks),
    resumeFileUrl: raw?.resumeFileUrl ?? undefined,
    user: raw?.user ? { id: raw.user.id, name: raw.user.name, location: raw.user.location ?? undefined } : undefined,
  };
}

export const resumeApi = {
  // The logged-in user's own resume (GET /resume/me). 404 when not yet created.
  me: () => api.get<{ resume: BackendResume }>("/resume/me").then((r) => mapResume(r.data.resume)),
  // Applicant profile integration (Phase 3): read a user's resume (skills/bio/etc.).
  byUser: (userId: string) =>
    api.get<{ resume: BackendResume }>(`/resume/${userId}`).then((r) => mapResume(r.data.resume)),
  // Create/update the caller's resume (PUT /resume upsert).
  save: (payload: ResumeInput) =>
    api.put<{ resume: BackendResume }>("/resume", payload).then((r) => mapResume(r.data.resume)),
};

// ---- Marketplace domain types (Phase 4) -------------------------------------
export interface ProductReviewItem {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user?: { id: string; name: string };
}
export interface ProductReviews {
  reviews: ProductReviewItem[];
  avgRating: number | null;
  totalReviews: number;
}
export interface MarketplaceOrderItem {
  id: string;
  quantity: number;
  priceAtPurchase: number;
  product: Product;
}
export interface MarketplaceOrder {
  id: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  shippingAddress?: string;
  createdAt: string;
  items: MarketplaceOrderItem[];
  buyer?: { id: string; name: string; phone?: string };
}
export interface SellerAnalytics {
  totalRevenue: number;
  totalUnitsSold: number;
  totalOrders: number;
  totalProductsListed: number;
  pendingOrdersCount: number;
  topProducts: Array<{ productId: string; name: string; unitsSold: number; revenue: number }>;
}

interface BackendOrderItem {
  id: string; quantity: number; priceAtPurchase: number; product: BackendProduct;
}
interface BackendOrder {
  id: string; totalAmount: number; status: string; paymentStatus?: string | null;
  shippingAddress?: string | null; createdAt: string; items: BackendOrderItem[];
  buyer?: { id: string; name: string; phone?: string | null } | null;
}

function mapOrder(o: BackendOrder): MarketplaceOrder {
  return {
    id: o.id,
    totalAmount: o.totalAmount,
    status: o.status,
    paymentStatus: o.paymentStatus ?? "PENDING",
    shippingAddress: o.shippingAddress ?? undefined,
    createdAt: o.createdAt,
    items: (o.items ?? []).map((it) => ({
      id: it.id,
      quantity: it.quantity,
      priceAtPurchase: it.priceAtPurchase,
      product: mapProduct(it.product),
    })),
    buyer: o.buyer ? { id: o.buyer.id, name: o.buyer.name, phone: o.buyer.phone ?? undefined } : undefined,
  };
}

export const productsApi = {
  list: (params?: { q?: string; category?: string; page?: number }) =>
    api
      .get<{ products: BackendProduct[] }>("/marketplace/products", { params })
      .then((r) => toPage((r.data.products ?? []).map(mapProduct))),
  get: (id: string) =>
    api.get<{ product: BackendProduct }>(`/marketplace/products/${id}`).then((r) => mapProduct(r.data.product)),
  create: (payload: { name: string; category: string; description?: string; price: number; stock?: number; imageUrl?: string }) =>
    api.post<{ product: BackendProduct }>("/marketplace/products", payload).then((r) => mapProduct(r.data.product)),
  update: (id: string, payload: Partial<{ name: string; category: string; description: string; price: number; stock: number; imageUrl: string; isActive: boolean }>) =>
    api.patch<{ product: BackendProduct }>(`/marketplace/products/${id}`, payload).then((r) => mapProduct(r.data.product)),
  remove: (id: string) => api.delete(`/marketplace/products/${id}`).then((r) => r.data),
  // Seller's own listings (includes inactive/archived) — used by the seller dashboard.
  myProducts: () =>
    api.get<{ products: BackendProduct[] }>("/marketplace/my-products").then((r) => (r.data.products ?? []).map(mapProduct)),
  // Personalized recommendations (ML search-ranked via the backend).
  recommended: () =>
    api.get<{ products: BackendProduct[] }>("/marketplace/recommendations").then((r) => (r.data.products ?? []).map(mapProduct)),
  // Featured products — reuses the ML-ranked product-list endpoint (no dedicated route).
  featured: () =>
    api.get<{ products: BackendProduct[] }>("/marketplace/products").then((r) => (r.data.products ?? []).map(mapProduct)),
  // Product reviews (+ average). Verified-purchase reviews are enforced server-side.
  reviews: (id: string) =>
    api.get<ProductReviews>(`/marketplace/products/${id}/reviews`).then((r) => r.data),
  addReview: (id: string, payload: { rating: number; comment?: string }) =>
    api.post(`/marketplace/products/${id}/review`, payload).then((r) => r.data),
};

export const ordersApi = {
  // The logged-in buyer's own orders (order history).
  list: () => api.get<{ orders: BackendOrder[] }>("/marketplace/my-orders").then((r) => (r.data.orders ?? []).map(mapOrder)),
  get: (id: string) => api.get<{ order: BackendOrder }>(`/marketplace/orders/${id}`).then((r) => mapOrder(r.data.order)),
  // Maps the cart shape into the backend order contract
  // (`items:[{productId,quantity}]`, `shippingAddress`).
  create: (payload: { items: Array<{ product_id: string; qty: number }>; shippingAddress?: string }) =>
    api
      .post<{ order: BackendOrder }>("/marketplace/orders", {
        items: payload.items.map((i) => ({ productId: i.product_id, quantity: i.qty })),
        shippingAddress: payload.shippingAddress,
      })
      .then((r) => mapOrder(r.data.order)),
  // Razorpay payment (reuses the existing marketplace payment infrastructure).
  createPayment: (orderId: string) =>
    api.post<PaymentOrder>(`/marketplace/orders/${orderId}/create-payment`).then((r) => r.data),
  verifyPayment: (orderId: string, payload: { razorpayOrderId: string; razorpayPaymentId: string; razorpaySignature: string }) =>
    api.post(`/marketplace/orders/${orderId}/verify-payment`, payload).then((r) => r.data),
  // Seller side: orders containing the seller's products, and status updates.
  sellerOrders: () =>
    api.get<{ orders: BackendOrder[] }>("/marketplace/seller-orders").then((r) => (r.data.orders ?? []).map(mapOrder)),
  updateStatus: (orderId: string, status: string) =>
    api.patch(`/marketplace/orders/${orderId}/status`, { status }).then((r) => r.data),
  analytics: () => api.get<SellerAnalytics>("/marketplace/seller-analytics").then((r) => r.data),
};

export const notificationsApi = {
  list: () => api.get<Notification[]>("/notifications").then((r) => r.data),
  markRead: (id: string) => api.post(`/notifications/${id}/read`).then((r) => r.data),
  markAllRead: () => api.post("/notifications/read-all").then((r) => r.data),
};

// Shared upload service (Phase 0 foundation). Posts a single file to the backend's
// generic `/api/upload` endpoint and returns the stored file URL. Reused by the
// ImageUploader component; not yet wired into feature pages.
export interface UploadResult {
  url: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
}

export const uploadApi = {
  upload: (file: File) => {
    const form = new FormData();
    form.append("file", file);
    return api
      .post<UploadResult>("/upload", form, { headers: { "Content-Type": "multipart/form-data" } })
      .then((r) => r.data);
  },
};

export const mlApi = {
  // Description generation. The ML service expects `{ keywords, category, language }`
  // and returns `{ title, description }`; keywords are derived from the product name
  // when the caller doesn't supply them. ML schema is unchanged.
  generateDescription: (payload: { product_name: string; category?: string; keywords?: string[]; language?: string }) =>
    api
      .post<{ title: string; description: string }>("/ml/generate/description", {
        keywords: payload.keywords ?? payload.product_name.split(/\s+/).filter(Boolean),
        category: payload.category ?? "",
        language: payload.language ?? "en",
      })
      .then((r) => r.data),
  // Pricing suggestion. Matches the ML contract `{ category, materialCost,
  // hoursOfWork, location }` → `{ suggestedPrice, suggestedPriceMin, suggestedPriceMax }`.
  predictPrice: (payload: { category: string; materialCost: number; hoursOfWork: number; location?: string }) =>
    api
      .post<{ suggestedPrice: number; suggestedPriceMin: number; suggestedPriceMax: number }>(
        "/ml/pricing/suggest",
        payload,
      )
      .then((r) => r.data),
  // Skill extraction from free text (bio). Backend `/ml/extract/skills-from-bio`
  // → ML `/extract/skills-from-bio`. Returns canonical skill names.
  extractSkills: (bioText: string) =>
    api
      .post<{ extractedSkills: string[] }>("/ml/extract/skills-from-bio", { bioText })
      .then((r) => r.data.extractedSkills ?? []),
  // Text moderation for user-generated content (product listings, etc.).
  // Backend `/ml/moderate/text` → ML `/moderate/text`.
  moderateText: (text: string, context = "product_listing") =>
    api
      .post<{ flagged: boolean; reason: string; confidence: number }>("/ml/moderate/text", { text, context })
      .then((r) => r.data),
  // Image moderation integration point. Backend `/ml/moderate/image` exists but the
  // ML side is currently a pass-by-default stub and no image-upload workflow is wired
  // in the UI yet — see the Phase 4 report. Kept here so an upload flow can call it.
  moderateImage: (imageUrl: string) =>
    api
      .post<{ flagged: boolean; reason: string; confidence: number }>("/ml/moderate/image", { imageUrl })
      .then((r) => r.data),
  // NOTE: `/ml/recommend` has no backend passthrough (recommendation is internal
  // only) — see Phase 2.
  recommend: (payload: { context: string }) =>
    api.post<{ items: Array<{ id: string; title: string; type: string }> }>("/ml/recommend", payload).then((r) => r.data),
};
