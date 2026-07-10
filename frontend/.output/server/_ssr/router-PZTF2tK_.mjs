import { o as __toESM } from "../_runtime.mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as HeadContent, d as createRootRouteWithContext, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Trigger2, i as Root2, m as Slot, n as Header, r as Item, t as Content2, y as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, n as useQuery, r as QueryClientProvider, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as Outlet, c as useLocation, d as useSearchParams, i as Navigate, l as useNavigate, n as Link, o as Route, r as NavLink, s as Routes, t as HashRouter, u as useParams } from "../_libs/react-router.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { n as AvatarFallback$1, r as AvatarImage$1, t as Avatar$1 } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as Label2, c as Root2$1, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2$1, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { n as Portal, r as Provider, t as Content2$2 } from "../_libs/radix-ui__react-tooltip.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as useTranslation } from "../_libs/react-i18next.mjs";
import { t as axios } from "../_libs/axios+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { $ as FileText, A as Pencil, B as Lock, C as Settings2, Ct as BookOpen, D as Plus, Dt as ArrowRight, E as Quote, Et as ArrowUpRight, F as MessageSquare, G as Languages, H as Link$1, I as Menu, J as House, K as IndianRupee, L as MapPin, M as Moon, N as Monitor, O as Play, Ot as ArrowLeft, P as Minus, Q as Flame, R as Mail, S as Settings, St as BookmarkCheck, T as Save, Tt as Award, U as Library, V as LoaderCircle, W as LayoutDashboard, X as GripVertical, Y as Heart, Z as GraduationCap, _ as ShoppingCart, _t as CalendarClock, a as User, at as ClipboardList, b as ShieldCheck, bt as Boxes, c as Trophy, ct as CircleX, d as Trash2, dt as ChevronUp, et as Eye, f as Target, ft as ChevronRight, g as Sparkles, gt as CalendarPlus, h as Star, ht as CheckCheck, i as Users, it as Clock, j as Package, k as Phone, kt as Accessibility, l as Truck, lt as CirclePlay, m as Store, mt as Check, n as X, nt as Download, o as UserCheck, ot as ClipboardCheck, p as Sun, pt as ChevronDown, q as Inbox, r as Video, rt as CreditCard, s as Upload, st as Circle, t as Zap, tt as Earth, u as TriangleAlert, ut as CircleCheck, v as ShoppingBag, vt as Building2, w as Search, wt as Bell, x as ShieldAlert, xt as Bookmark, y as Shield, yt as Briefcase, z as LogOut } from "../_libs/lucide-react.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { n as jt, t as Lt } from "../_libs/input-otp.mjs";
import { n as RadioGroupIndicator, r as RadioGroupItem$1, t as RadioGroup$1 } from "../_libs/radix-ui__react-radio-group.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as AreaChart, o as RadialBar, r as YAxis, s as PolarAngleAxis, t as RadialBarChart } from "../_libs/recharts+[...].mjs";
import { n as Root$1, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { i as Trigger$1, n as List, r as Root2$2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-PZTF2tK_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DAHn7_qk.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var TooltipProvider = Provider;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$2, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)", className),
	...props
}) }));
TooltipContent.displayName = Content2$2.displayName;
var ThemeContext = (0, import_react.createContext)(null);
var STORAGE_KEY = "sakhi.theme";
function resolveTheme(t) {
	if (t === "system") {
		if (typeof window === "undefined") return "light";
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}
	return t;
}
function ThemeProvider({ children }) {
	const [theme, setThemeState] = (0, import_react.useState)("system");
	const [resolved, setResolved] = (0, import_react.useState)("light");
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem(STORAGE_KEY) ?? "system";
		setThemeState(stored);
		setMounted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!mounted) return;
		const r = resolveTheme(theme);
		setResolved(r);
		document.documentElement.classList.toggle("dark", r === "dark");
		localStorage.setItem(STORAGE_KEY, theme);
	}, [theme, mounted]);
	(0, import_react.useEffect)(() => {
		if (theme !== "system") return;
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = () => setResolved(mq.matches ? "dark" : "light");
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, [theme]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, {
		value: {
			theme,
			resolved,
			setTheme: setThemeState
		},
		children
	});
}
function useTheme() {
	const ctx = (0, import_react.useContext)(ThemeContext);
	if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
	return ctx;
}
var API_BASE_URL = "http://localhost:5000/api";
var TOKEN_KEY = "sakhi.token";
var REFRESH_KEY = "sakhi.refresh";
var tokenStore = {
	get: () => typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY),
	getRefresh: () => typeof window === "undefined" ? null : localStorage.getItem(REFRESH_KEY),
	set: (token, refresh) => {
		localStorage.setItem(TOKEN_KEY, token);
		if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
	},
	clear: () => {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(REFRESH_KEY);
	}
};
var api = axios.create({
	baseURL: API_BASE_URL,
	timeout: 2e4,
	headers: { "Content-Type": "application/json" }
});
api.interceptors.request.use((config) => {
	const token = tokenStore.get();
	if (token) config.headers.set("Authorization", `Bearer ${token}`);
	return config;
});
var isRefreshing = false;
var pendingQueue = [];
var flushQueue = (token) => {
	pendingQueue.forEach((cb) => cb(token));
	pendingQueue = [];
};
api.interceptors.response.use((response) => {
	const body = response.data;
	if (body && typeof body === "object" && !Array.isArray(body) && "success" in body && "data" in body) response.data = body.data;
	return response;
}, async (error) => {
	const original = error.config;
	const status = error.response?.status;
	if (status === 401 && original && !original._retry) {
		const refresh = tokenStore.getRefresh();
		if (!refresh) {
			tokenStore.clear();
			if (typeof window !== "undefined") window.location.hash = "/login";
			return Promise.reject(error);
		}
		original._retry = true;
		if (isRefreshing) return new Promise((resolve, reject) => {
			pendingQueue.push((newToken) => {
				if (!newToken) return reject(error);
				original.headers.set("Authorization", `Bearer ${newToken}`);
				resolve(api(original));
			});
		});
		isRefreshing = true;
		try {
			const { data: body } = await axios.post(`${API_BASE_URL}/auth/refresh`, { refresh_token: refresh });
			const payload = body && typeof body === "object" && "data" in body ? body.data : body;
			tokenStore.set(payload.token, payload.refresh_token);
			flushQueue(payload.token);
			original.headers.set("Authorization", `Bearer ${payload.token}`);
			return api(original);
		} catch (e) {
			flushQueue(null);
			tokenStore.clear();
			if (typeof window !== "undefined") window.location.hash = "/login";
			return Promise.reject(e);
		} finally {
			isRefreshing = false;
		}
	}
	if (status && status >= 500) toast.error("Server error. Please try again in a moment.");
	return Promise.reject(error);
});
var unwrapError = (err) => {
	if (axios.isAxiosError(err)) {
		const data = err.response?.data;
		return {
			message: data?.message ?? err.message ?? "Unexpected error",
			code: data?.code,
			status: err.response?.status
		};
	}
	return { message: err instanceof Error ? err.message : "Unexpected error" };
};
var ROLE_MAP = {
	LEARNER: "learner",
	EMPLOYER: "earner",
	SELLER: "seller",
	ADMIN: "all"
};
/** Central mapping from the backend user model into the frontend User type. */
function mapUser(bu) {
	return {
		id: bu.id,
		name: bu.name,
		email: bu.email ?? "",
		phone: bu.phone ?? void 0,
		language: bu.language ?? void 0,
		location: bu.location ?? void 0,
		avatar_url: bu.avatarUrl ?? void 0,
		role: bu.role ? ROLE_MAP[bu.role] ?? "all" : void 0,
		onboarded: bu.onboarded ?? void 0
	};
}
var BACKEND_ROLE = {
	learner: "LEARNER",
	earner: "EMPLOYER",
	seller: "SELLER",
	all: "ADMIN"
};
var authApi = {
	login: (payload) => api.post("/auth/login", payload).then((r) => ({
		token: r.data.token,
		refresh_token: r.data.refresh_token,
		user: mapUser(r.data.user)
	})),
	signup: (payload) => api.post("/auth/signup", payload).then((r) => ({
		token: r.data.token,
		refresh_token: r.data.refresh_token,
		user: mapUser(r.data.user)
	})),
	forgotPassword: (phone) => api.post("/auth/forgot-password", { phone }).then((r) => r.data),
	resetPassword: (payload) => api.post("/auth/reset-password", payload).then((r) => r.data),
	sendOtp: (phone) => api.post("/auth/send-otp", { phone }).then((r) => r.data),
	verifyOtp: (phone, code) => api.post("/auth/verify-otp", {
		phone,
		code
	}).then((r) => r.data),
	logout: () => api.post("/auth/logout", { refresh_token: tokenStore.getRefresh() }).then((r) => r.data)
};
var userApi = {
	profile: () => api.get("/auth/me").then((r) => mapUser(r.data.user)),
	updateProfile: (payload) => api.patch("/user", payload).then((r) => mapUser(r.data.user)),
	getSettings: () => api.get("/user/settings").then((r) => r.data.settings),
	updateSettings: (settings) => api.put("/user/settings", { settings }).then((r) => r.data.settings),
	completeOnboarding: (payload) => api.patch("/auth/onboarding", {
		language: payload.language,
		...payload.location !== void 0 && { location: payload.location },
		...payload.role && { role: BACKEND_ROLE[payload.role] ?? payload.role }
	}).then((r) => mapUser(r.data.user))
};
var JOB_TYPE_MAP = {
	FULL_TIME: "full-time",
	PART_TIME: "part-time",
	CONTRACT: "contract",
	GIG: "gig"
};
function mapCourse(c) {
	return {
		id: c.id,
		title: c.title,
		description: c.description ?? "",
		category: c.category,
		level: (c.level ?? "BEGINNER").toLowerCase(),
		duration_hours: c.duration ?? 0,
		lessons_count: 0,
		rating: 0,
		reviews_count: 0,
		price: c.price ?? 0,
		language: c.language ?? void 0,
		mentor: { name: "Mentor" }
	};
}
function mapJob(j) {
	return {
		id: j.id,
		title: j.title,
		category: j.category,
		company: {
			name: j.employer?.name ?? "Employer",
			verified: j.employer?.employerVerified ?? false
		},
		location: j.location ?? "",
		remote: false,
		type: JOB_TYPE_MAP[j.jobType ?? "FULL_TIME"] ?? "full-time",
		salary_min: j.salaryMin ?? void 0,
		salary_max: j.salaryMax ?? void 0,
		currency: "INR",
		posted_at: j.createdAt ?? (/* @__PURE__ */ new Date()).toISOString(),
		skills: [],
		description: j.description ?? ""
	};
}
function mapProduct(p) {
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
			location: p.seller?.location ?? void 0
		},
		stock: p.stock ?? void 0
	};
}
/** Wrap a plain array into the Paginated shape the list pages expect. */
function toPage(items) {
	return {
		items,
		total: items.length,
		page: 1,
		per_page: items.length
	};
}
function parseJsonArray(value) {
	if (!value) return [];
	try {
		const parsed = JSON.parse(value);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function mapEnrollment(e) {
	return {
		id: e.id,
		progress: e.progress ?? 0,
		completedLessons: parseJsonArray(e.completedLessonsJson),
		certificateUrl: e.certificateUrl ?? void 0,
		completedAt: e.completedAt ?? void 0,
		enrolledAt: e.enrolledAt ?? void 0,
		lastActivityAt: e.lastActivityAt ?? void 0,
		paymentStatus: e.paymentStatus ?? void 0,
		course: mapCourse(e.course)
	};
}
function mapCreatedCourse(c) {
	return {
		...mapCourse(c),
		reviewStatus: c.reviewStatus ?? void 0,
		isPublished: c.isPublished ?? void 0
	};
}
var coursesApi = {
	list: (params) => api.get("/learn/courses", { params }).then((r) => toPage((r.data.courses ?? []).map(mapCourse))),
	get: (id) => api.get(`/learn/courses/${id}`).then((r) => mapCourse(r.data.course)),
	enroll: (id) => api.post(`/learn/courses/${id}/enroll`).then((r) => r.data),
	myCourses: () => api.get("/learn/my-courses").then((r) => (r.data.enrollments ?? []).map(mapEnrollment)),
	recommended: () => api.get("/learn/recommendations").then((r) => (r.data.courses ?? []).map(mapCourse)),
	lessons: (courseId) => api.get(`/learn/courses/${courseId}/lessons`).then((r) => r.data.lessons ?? []),
	createLesson: (courseId, payload) => api.post(`/learn/courses/${courseId}/lessons`, payload).then((r) => r.data.lesson),
	updateLesson: (id, payload) => api.patch(`/learn/lessons/${id}`, payload).then((r) => r.data.lesson),
	deleteLesson: (id) => api.delete(`/learn/lessons/${id}`).then((r) => r.data),
	updateProgress: (enrollmentId, payload) => api.patch(`/learn/enrollments/${enrollmentId}/progress`, payload).then((r) => mapEnrollment(r.data.enrollment)),
	getQuiz: (courseId) => api.get(`/learn/courses/${courseId}/quiz`).then((r) => r.data.quiz),
	submitQuiz: (quizId, answers) => api.post(`/learn/quizzes/${quizId}/attempt`, { answers }).then((r) => r.data.attempt),
	createQuiz: (courseId, payload) => api.post(`/learn/courses/${courseId}/quiz`, payload).then((r) => r.data),
	certificate: (enrollmentId) => api.get(`/learn/enrollments/${enrollmentId}/certificate`).then((r) => r.data.certificateUrl),
	reviews: (courseId) => api.get(`/learn/courses/${courseId}/reviews`).then((r) => r.data),
	addReview: (courseId, payload) => api.post(`/learn/courses/${courseId}/review`, payload).then((r) => r.data),
	create: (payload) => api.post("/learn/courses", payload).then((r) => mapCreatedCourse(r.data.course)),
	update: (id, payload) => api.patch(`/learn/courses/${id}`, payload).then((r) => mapCreatedCourse(r.data.course)),
	remove: (id) => api.delete(`/learn/courses/${id}`).then((r) => r.data),
	myCreated: () => api.get("/learn/my-created-courses").then((r) => (r.data.courses ?? []).map(mapCreatedCourse)),
	pending: () => api.get("/learn/courses/pending").then((r) => (r.data.courses ?? []).map(mapCreatedCourse)),
	review: (id, payload) => api.patch(`/learn/courses/${id}/review`, payload).then((r) => r.data),
	createPayment: (enrollmentId) => api.post(`/learn/enrollments/${enrollmentId}/create-payment`).then((r) => r.data),
	verifyPayment: (enrollmentId, payload) => api.post(`/learn/enrollments/${enrollmentId}/verify-payment`, payload).then((r) => r.data),
	atRisk: (courseId) => api.get(`/learn/courses/${courseId}/at-risk`).then((r) => r.data)
};
var jobsApi = {
	list: (params) => api.get("/jobs", { params }).then((r) => toPage((r.data.jobs ?? []).map(mapJob))),
	get: (id) => api.get(`/jobs/${id}`).then((r) => mapJob(r.data.job)),
	apply: (id, payload) => api.post(`/jobs/${id}/apply`, { coverNote: payload.note }).then((r) => r.data),
	match: (id) => api.get(`/jobs/${id}/match`).then((r) => r.data),
	save: (id) => api.post(`/jobs/${id}/save`).then((r) => r.data),
	unsave: (id) => api.delete(`/jobs/${id}/save`).then((r) => r.data),
	saved: () => api.get("/jobs/my/saved").then((r) => (r.data.jobs ?? []).map(mapJob)),
	recommended: () => api.get("/jobs/recommendations").then((r) => (r.data.jobs ?? []).map(mapJob)),
	myApplications: () => api.get("/jobs/my/applications").then((r) => (r.data.applications ?? []).map((a) => ({
		id: a.id,
		status: a.status,
		coverNote: a.coverNote ?? void 0,
		appliedAt: a.appliedAt,
		job: mapJob(a.job)
	}))),
	withdraw: (applicationId) => api.delete(`/jobs/applications/${applicationId}`).then((r) => r.data),
	myInterviews: () => api.get("/jobs/my/interviews").then((r) => (r.data.interviews ?? []).map((iv) => ({
		id: iv.id,
		scheduledAt: iv.scheduledAt,
		mode: iv.mode,
		location: iv.location ?? void 0,
		status: iv.status,
		notes: iv.notes ?? void 0,
		job: mapJob(iv.application.job)
	}))),
	create: (payload) => api.post("/jobs", payload).then((r) => mapJob(r.data.job)),
	update: (id, payload) => api.patch(`/jobs/${id}`, payload).then((r) => mapJob(r.data.job)),
	remove: (id) => api.delete(`/jobs/${id}`).then((r) => r.data),
	myPostings: () => api.get("/jobs/my/postings").then((r) => (r.data.jobs ?? []).map((j) => ({
		...mapJob(j),
		applicationCount: j.applications?.length ?? 0
	}))),
	applicants: (jobId) => api.get(`/jobs/${jobId}/applications`).then((r) => r.data.applications ?? []),
	setApplicationStatus: (applicationId, status) => api.patch(`/jobs/applications/${applicationId}/status`, { status }).then((r) => r.data),
	scheduleInterview: (applicationId, payload) => api.post(`/jobs/applications/${applicationId}/interview`, payload).then((r) => r.data),
	updateInterview: (id, payload) => api.patch(`/jobs/interviews/${id}`, payload).then((r) => r.data),
	addReview: (jobId, payload) => api.post(`/jobs/${jobId}/review`, payload).then((r) => r.data),
	userReviews: (userId) => api.get(`/jobs/users/${userId}/reviews`).then((r) => r.data)
};
/** Normalises the backend (deserialised) resume into the frontend Resume model. */
function mapResume(raw) {
	const arr = (v) => Array.isArray(v) ? v : [];
	return {
		id: raw?.id,
		userId: raw?.userId,
		bio: raw?.bio ?? void 0,
		skills: arr(raw?.skills),
		experience: arr(raw?.experience),
		education: arr(raw?.education),
		portfolioLinks: arr(raw?.portfolioLinks),
		resumeFileUrl: raw?.resumeFileUrl ?? void 0,
		user: raw?.user ? {
			id: raw.user.id,
			name: raw.user.name,
			location: raw.user.location ?? void 0
		} : void 0
	};
}
var resumeApi = {
	me: () => api.get("/resume/me").then((r) => mapResume(r.data.resume)),
	byUser: (userId) => api.get(`/resume/${userId}`).then((r) => mapResume(r.data.resume)),
	save: (payload) => api.put("/resume", payload).then((r) => mapResume(r.data.resume))
};
function mapOrder(o) {
	return {
		id: o.id,
		totalAmount: o.totalAmount,
		status: o.status,
		paymentStatus: o.paymentStatus ?? "PENDING",
		shippingAddress: o.shippingAddress ?? void 0,
		createdAt: o.createdAt,
		items: (o.items ?? []).map((it) => ({
			id: it.id,
			quantity: it.quantity,
			priceAtPurchase: it.priceAtPurchase,
			product: mapProduct(it.product)
		})),
		buyer: o.buyer ? {
			id: o.buyer.id,
			name: o.buyer.name,
			phone: o.buyer.phone ?? void 0
		} : void 0
	};
}
var productsApi = {
	list: (params) => api.get("/marketplace/products", { params }).then((r) => toPage((r.data.products ?? []).map(mapProduct))),
	get: (id) => api.get(`/marketplace/products/${id}`).then((r) => mapProduct(r.data.product)),
	create: (payload) => api.post("/marketplace/products", payload).then((r) => mapProduct(r.data.product)),
	update: (id, payload) => api.patch(`/marketplace/products/${id}`, payload).then((r) => mapProduct(r.data.product)),
	remove: (id) => api.delete(`/marketplace/products/${id}`).then((r) => r.data),
	myProducts: () => api.get("/marketplace/my-products").then((r) => (r.data.products ?? []).map(mapProduct)),
	recommended: () => api.get("/marketplace/recommendations").then((r) => (r.data.products ?? []).map(mapProduct)),
	featured: () => api.get("/marketplace/products").then((r) => (r.data.products ?? []).map(mapProduct)),
	reviews: (id) => api.get(`/marketplace/products/${id}/reviews`).then((r) => r.data),
	addReview: (id, payload) => api.post(`/marketplace/products/${id}/review`, payload).then((r) => r.data)
};
var ordersApi = {
	list: () => api.get("/marketplace/my-orders").then((r) => (r.data.orders ?? []).map(mapOrder)),
	get: (id) => api.get(`/marketplace/orders/${id}`).then((r) => mapOrder(r.data.order)),
	create: (payload) => api.post("/marketplace/orders", {
		items: payload.items.map((i) => ({
			productId: i.product_id,
			quantity: i.qty
		})),
		shippingAddress: payload.shippingAddress
	}).then((r) => mapOrder(r.data.order)),
	createPayment: (orderId) => api.post(`/marketplace/orders/${orderId}/create-payment`).then((r) => r.data),
	verifyPayment: (orderId, payload) => api.post(`/marketplace/orders/${orderId}/verify-payment`, payload).then((r) => r.data),
	sellerOrders: () => api.get("/marketplace/seller-orders").then((r) => (r.data.orders ?? []).map(mapOrder)),
	updateStatus: (orderId, status) => api.patch(`/marketplace/orders/${orderId}/status`, { status }).then((r) => r.data),
	analytics: () => api.get("/marketplace/seller-analytics").then((r) => r.data)
};
var notificationsApi = {
	list: () => api.get("/notifications").then((r) => r.data),
	markRead: (id) => api.post(`/notifications/${id}/read`).then((r) => r.data),
	markAllRead: () => api.post("/notifications/read-all").then((r) => r.data)
};
var uploadApi = { upload: (file) => {
	const form = new FormData();
	form.append("file", file);
	return api.post("/upload", form, { headers: { "Content-Type": "multipart/form-data" } }).then((r) => r.data);
} };
var mlApi = {
	generateDescription: (payload) => api.post("/ml/generate/description", {
		keywords: payload.keywords ?? payload.product_name.split(/\s+/).filter(Boolean),
		category: payload.category ?? "",
		language: payload.language ?? "en"
	}).then((r) => r.data),
	predictPrice: (payload) => api.post("/ml/pricing/suggest", payload).then((r) => r.data),
	extractSkills: (bioText) => api.post("/ml/extract/skills-from-bio", { bioText }).then((r) => r.data.extractedSkills ?? []),
	moderateText: (text, context = "product_listing") => api.post("/ml/moderate/text", {
		text,
		context
	}).then((r) => r.data),
	moderateImage: (imageUrl) => api.post("/ml/moderate/image", { imageUrl }).then((r) => r.data),
	recommend: (payload) => api.post("/ml/recommend", payload).then((r) => r.data)
};
var useAuthStore = create((set) => ({
	user: null,
	status: "idle",
	restore: async () => {
		if (!tokenStore.get()) {
			set({ status: "unauthenticated" });
			return;
		}
		set({ status: "loading" });
		try {
			set({
				user: await userApi.profile(),
				status: "authenticated"
			});
		} catch {
			tokenStore.clear();
			set({
				user: null,
				status: "unauthenticated"
			});
		}
	},
	login: async (phone, password) => {
		const res = await authApi.login({
			phone,
			password
		});
		tokenStore.set(res.token, res.refresh_token);
		set({
			user: res.user,
			status: "authenticated"
		});
		return res.user;
	},
	signup: async (name, email, password, phone) => {
		const res = await authApi.signup({
			name,
			email,
			password,
			phone
		});
		tokenStore.set(res.token, res.refresh_token);
		set({
			user: res.user,
			status: "authenticated"
		});
		return res.user;
	},
	setUser: (user) => set({ user }),
	logout: async () => {
		try {
			await authApi.logout();
		} catch {}
		tokenStore.clear();
		set({
			user: null,
			status: "unauthenticated"
		});
	}
}));
var DEFAULT_PREFS = {
	notifications: {
		emailDigest: true,
		push: true,
		marketing: false
	},
	privacy: {
		publicProfile: true,
		showLocation: false
	},
	accessibility: {
		reduceMotion: false,
		largerText: false
	}
};
var PreferencesContext = (0, import_react.createContext)(null);
/** Reflects accessibility prefs onto <html> so global CSS can react to them. */
function applyAccessibility(a) {
	if (typeof document === "undefined") return;
	const el = document.documentElement;
	el.classList.toggle("text-larger", a.largerText);
	el.classList.toggle("reduce-motion", a.reduceMotion);
}
function PreferencesProvider({ children }) {
	const status = useAuthStore((s) => s.status);
	const [prefs, setPrefs] = (0, import_react.useState)(DEFAULT_PREFS);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (status !== "authenticated") return;
		let active = true;
		userApi.getSettings().then((loadedSettings) => {
			if (!active) return;
			const s = loadedSettings ?? {};
			const merged = {
				notifications: {
					...DEFAULT_PREFS.notifications,
					...s.notifications ?? {}
				},
				privacy: {
					...DEFAULT_PREFS.privacy,
					...s.privacy ?? {}
				},
				accessibility: {
					...DEFAULT_PREFS.accessibility,
					...s.accessibility ?? {}
				}
			};
			setPrefs(merged);
			applyAccessibility(merged.accessibility);
			setLoaded(true);
		}).catch(() => {
			if (active) setLoaded(true);
		});
		return () => {
			active = false;
		};
	}, [status]);
	(0, import_react.useEffect)(() => {
		if (status === "unauthenticated") {
			setPrefs(DEFAULT_PREFS);
			applyAccessibility(DEFAULT_PREFS.accessibility);
			setLoaded(false);
		}
	}, [status]);
	const setPref = (0, import_react.useCallback)((section, key, value) => {
		setPrefs((prev) => {
			const next = {
				...prev,
				[section]: {
					...prev[section],
					[key]: value
				}
			};
			applyAccessibility(next.accessibility);
			userApi.updateSettings(next).catch((e) => toast.error(unwrapError(e).message));
			return next;
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreferencesContext.Provider, {
		value: {
			prefs,
			loaded,
			setPref
		},
		children
	});
}
function usePreferences() {
	const ctx = (0, import_react.useContext)(PreferencesContext);
	if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
	return ctx;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var ErrorBoundary = class extends import_react.Component {
	state = { error: null };
	static getDerivedStateFromError(error) {
		return { error };
	}
	componentDidCatch(error, info) {
		console.error("Uncaught UI error:", error, info.componentStack);
	}
	componentDidUpdate(prev) {
		if (this.state.error && prev.resetKey !== this.props.resetKey) this.setState({ error: null });
	}
	reset = () => this.setState({ error: null });
	render() {
		if (!this.state.error) return this.props.children;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: this.props.compact ? "py-10" : "min-h-dvh grid place-items-center p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-md flex-col items-center rounded-3xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl bg-destructive/10 p-4 mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-6 w-6 text-destructive" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-semibold",
						children: "Something went wrong"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "An unexpected error occurred while rendering this view. You can try again or reload the app."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: this.reset,
							className: "rounded-full",
							children: "Try again"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => window.location.reload(),
							className: "rounded-full gradient-primary text-primary-foreground",
							children: "Reload app"
						})]
					})
				]
			})
		});
	}
};
function BrandMark({ className, showText = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-2.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			whileHover: {
				rotate: 12,
				scale: 1.05
			},
			transition: {
				type: "spring",
				stiffness: 300
			},
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 gradient-primary rounded-xl blur-md opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative gradient-primary rounded-xl p-1.5 shadow-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary-foreground" })
			})]
		}), showText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-xl font-bold tracking-tight text-gradient",
			children: "Sakhi"
		})]
	});
}
function ThemeToggle() {
	const { resolved, setTheme } = useTheme();
	const isDark = resolved === "dark";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "icon",
		"aria-label": "Toggle theme",
		onClick: () => setTheme(isDark ? "light" : "dark"),
		className: "rounded-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			mode: "wait",
			initial: false,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				initial: {
					opacity: 0,
					rotate: -60,
					scale: .7
				},
				animate: {
					opacity: 1,
					rotate: 0,
					scale: 1
				},
				exit: {
					opacity: 0,
					rotate: 60,
					scale: .7
				},
				transition: { duration: .25 },
				className: "inline-flex",
				children: isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" })
			}, isDark ? "moon" : "sun")
		})
	});
}
var DropdownMenu = Root2$1;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2$1.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var langs = [
	{
		code: "en",
		label: "English"
	},
	{
		code: "hi",
		label: "हिन्दी"
	},
	{
		code: "mr",
		label: "मराठी"
	}
];
function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const current = langs.find((l) => l.code === i18n.language) ?? langs[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			size: "sm",
			className: "rounded-full gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden sm:inline",
				children: current.label
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
		align: "end",
		className: "rounded-2xl",
		children: langs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
			onClick: () => void i18n.changeLanguage(l.code),
			className: "rounded-lg cursor-pointer",
			children: [l.label, i18n.language === l.code && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-auto text-primary",
				children: "✓"
			})]
		}, l.code))
	})] });
}
function PublicLayout() {
	const { t } = useTranslation();
	const nav = [
		{
			to: "/",
			label: t("nav.home"),
			end: true
		},
		{
			to: "/about",
			label: t("nav.about")
		},
		{
			to: "/help",
			label: t("nav.help")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.header, {
				initial: {
					y: -20,
					opacity: 0
				},
				animate: {
					y: 0,
					opacity: 1
				},
				transition: {
					duration: .4,
					ease: "easeOut"
				},
				className: "sticky top-0 z-40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-4 max-w-6xl px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass flex items-center justify-between gap-3 rounded-full px-4 py-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								"aria-label": "Sakhi home",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "hidden md:flex items-center gap-1",
								children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
									to: n.to,
									end: n.end,
									className: ({ isActive }) => `px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`,
									children: n.label
								}, n.to))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "ghost",
										size: "sm",
										className: "rounded-full hidden sm:inline-flex",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/login",
											children: t("nav.login")
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "sm",
										className: "rounded-full gradient-primary text-primary-foreground shadow-md hover:shadow-glow transition-shadow",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/signup",
											children: t("nav.signup")
										})
									})
								]
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border/60 bg-card/40 mt-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-6 py-10 grid gap-8 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground max-w-xs",
							children: t("brand.tagline")
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold mb-3",
							children: "Product"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/about",
									className: "hover:text-foreground",
									children: "About"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/help",
									className: "hover:text-foreground",
									children: "Help center"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "hover:text-foreground",
									children: "Sign in"
								}) })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold mb-3",
							children: "Modules"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/signup",
									className: "hover:text-foreground",
									children: "Learn"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/signup",
									className: "hover:text-foreground",
									children: "Earn"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/signup",
									className: "hover:text-foreground",
									children: "Flourish"
								}) })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold mb-3",
								children: "Get in touch"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "hello@sakhi.app"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground mt-6",
								children: [
									"© ",
									(/* @__PURE__ */ new Date()).getFullYear(),
									" Sakhi. ",
									t("landing.footer_rights")
								]
							})
						] })
					]
				})
			})
		]
	});
}
function AuthLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 gradient-hero" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full gradient-primary opacity-30 blur-3xl animate-float" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/40 blur-3xl animate-float",
				style: { animationDelay: "2s" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto max-w-md px-6 py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .4,
							ease: "easeOut"
						},
						className: "mt-10 glass rounded-3xl p-8 shadow-elegant",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-8 text-center text-xs text-muted-foreground",
						children: [
							"By continuing you agree to Sakhi's ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "underline hover:text-foreground",
								children: "Terms"
							}),
							" & ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "underline hover:text-foreground",
								children: "Privacy"
							}),
							"."
						]
					})
				]
			})
		]
	});
}
var useCartStore = create()(persist((set, get) => ({
	items: [],
	add: (product, qty = 1) => set((state) => {
		if (state.items.find((i) => i.product.id === product.id)) return { items: state.items.map((i) => i.product.id === product.id ? {
			...i,
			qty: i.qty + qty
		} : i) };
		return { items: [...state.items, {
			product,
			qty
		}] };
	}),
	remove: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
	setQty: (id, qty) => set((s) => ({ items: s.items.map((i) => i.product.id === id ? {
		...i,
		qty: Math.max(1, qty)
	} : i) })),
	clear: () => set({ items: [] }),
	total: () => get().items.reduce((s, i) => s + i.product.price * i.qty, 0),
	count: () => get().items.reduce((s, i) => s + i.qty, 0)
}), { name: "sakhi.cart" }));
/** True when the user has any of the allowed roles. */
function hasRole(user, allowed) {
	return !!user?.role && allowed.includes(user.role);
}
/** Filter a nav list down to the items the given user is allowed to see. */
function filterNavByRole(items, user) {
	return items.filter((item) => !item.roles || hasRole(user, item.roles));
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Avatar = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
	ref,
	className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
	...props
}));
Avatar.displayName = Avatar$1.displayName;
var AvatarImage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
	ref,
	className: cn("aspect-square h-full w-full", className),
	...props
}));
AvatarImage.displayName = AvatarImage$1.displayName;
var AvatarFallback = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
	ref,
	className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
	...props
}));
AvatarFallback.displayName = AvatarFallback$1.displayName;
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function AppLayout() {
	const { t } = useTranslation();
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const user = useAuthStore((s) => s.user);
	const logout = useAuthStore((s) => s.logout);
	const cartCount = useCartStore((s) => s.count());
	const navigate = useNavigate();
	const location = useLocation();
	const submitSearch = (e) => {
		e.preventDefault();
		const q = searchQuery.trim();
		navigate(q ? `/app/search?q=${encodeURIComponent(q)}` : "/app/search");
	};
	const visibleNav = filterNavByRole([
		{
			to: "/app/dashboard",
			icon: House,
			label: t("nav.dashboard")
		},
		{
			to: "/app/search",
			icon: Search,
			label: t("nav.search")
		},
		{
			to: "/app/learn",
			icon: GraduationCap,
			label: t("nav.learn")
		},
		{
			to: "/app/learn/mine",
			icon: Library,
			label: "My Learning"
		},
		{
			to: "/app/earn",
			icon: Briefcase,
			label: t("nav.earn")
		},
		{
			to: "/app/earn/mine",
			icon: ClipboardList,
			label: "My Jobs"
		},
		{
			to: "/app/earn/manage",
			icon: Building2,
			label: "Hiring",
			roles: ["earner", "all"]
		},
		{
			to: "/app/flourish",
			icon: Store,
			label: t("nav.flourish")
		},
		{
			to: "/app/flourish/mine",
			icon: Package,
			label: "My Shop",
			roles: ["seller", "all"]
		},
		{
			to: "/app/orders",
			icon: ShoppingBag,
			label: "Orders"
		},
		{
			to: "/app/resume",
			icon: FileText,
			label: "Resume"
		},
		{
			to: "/app/admin/courses",
			icon: ShieldCheck,
			label: "Review Queue",
			roles: ["all"]
		}
	], user);
	const initials = (user?.name ?? "S").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
	const SidebarNav = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-1",
		children: visibleNav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
			to: n.to,
			onClick: () => setMobileOpen(false),
			className: ({ isActive }) => cn("group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all", isActive ? "bg-primary/10 text-primary shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"),
			children: ({ isActive }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: cn("h-4.5 w-4.5 transition-transform group-hover:scale-110", isActive && "text-primary") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.label }),
				isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					layoutId: "active-nav-dot",
					className: "ml-auto h-1.5 w-1.5 rounded-full bg-primary"
				})
			] })
		}, n.to))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "lg:hidden sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-label": "Menu",
						onClick: () => setMobileOpen(true),
						className: "rounded-full p-2 hover:bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/app/search",
							"aria-label": t("nav.search"),
							className: "rounded-full p-2 hover:bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/app/cart",
							"aria-label": "Cart",
							className: "relative rounded-full p-2 hover:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5" }), cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -top-0.5 -right-0.5 h-4 w-4 text-[10px] rounded-full gradient-primary text-primary-foreground grid place-items-center",
								children: cartCount
							})]
						})]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1400px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "hidden lg:flex sticky top-0 h-dvh w-64 shrink-0 flex-col gap-6 border-r border-border/60 px-5 py-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/app/dashboard",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNav, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto rounded-2xl gradient-aurora p-4 text-white",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-medium opacity-90",
									children: "Weekly streak"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-2xl font-bold",
									children: [user?.streak ?? 7, " 🔥"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs opacity-90",
									children: "Keep going! You're doing amazing."
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					className: "fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm lg:hidden",
					onClick: () => setMobileOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
					initial: { x: -280 },
					animate: { x: 0 },
					exit: { x: -280 },
					transition: {
						type: "spring",
						damping: 24
					},
					className: "fixed inset-y-0 left-0 z-50 w-72 bg-card p-6 lg:hidden overflow-y-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "Close",
							onClick: () => setMobileOpen(false),
							className: "rounded-full p-2 hover:bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarNav, {})
					})]
				})] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "hidden lg:flex sticky top-0 z-30 items-center gap-4 border-b border-border/60 bg-background/70 px-8 py-4 backdrop-blur-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submitSearch,
							className: "relative flex-1 max-w-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								placeholder: t("search.placeholder"),
								"aria-label": t("search.placeholder"),
								className: "pl-10 rounded-full bg-muted/50 border-transparent focus-visible:bg-card"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageSwitcher, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "ghost",
									size: "icon",
									className: "rounded-full relative",
									"aria-label": "Notifications",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/app/notifications",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4.5 w-4.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute top-2 right-2 h-2 w-2 rounded-full bg-secondary" })]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "ghost",
									size: "icon",
									className: "rounded-full relative",
									"aria-label": "Cart",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/app/cart",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4.5 w-4.5" }), cartCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "absolute -top-0.5 -right-0.5 h-4.5 w-4.5 p-0 grid place-items-center rounded-full gradient-primary text-[10px] text-primary-foreground border-2 border-background",
											children: cartCount
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "ml-2 rounded-full ring-2 ring-transparent hover:ring-primary/40 transition",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
											className: "h-9 w-9",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
												src: user?.avatar_url,
												alt: user?.name ?? ""
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
												className: "gradient-primary text-primary-foreground font-semibold text-xs",
												children: initials
											})]
										})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
									align: "end",
									className: "rounded-2xl w-56",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-semibold",
											children: user?.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground font-normal",
											children: user?.email
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											asChild: true,
											className: "rounded-lg cursor-pointer",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/app/profile",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 mr-2" }), t("nav.profile")]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											asChild: true,
											className: "rounded-lg cursor-pointer",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/app/settings",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4 mr-2" }), t("nav.settings")]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
											onClick: async () => {
												await logout();
												navigate("/login");
											},
											className: "rounded-lg cursor-pointer text-destructive focus:text-destructive",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4 mr-2" }), t("nav.logout")]
										})
									]
								})] })
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "px-4 py-6 sm:px-6 lg:px-10 lg:py-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, {
							compact: true,
							resetKey: location.pathname,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
						})
					})]
				})
			]
		})]
	});
}
function LoadingScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .9
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 gradient-primary rounded-2xl blur-2xl opacity-60 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative gradient-primary rounded-2xl p-4 shadow-glow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-8 w-8 text-primary-foreground" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Preparing your journey…"
			})]
		})
	});
}
function ProtectedRoute({ children }) {
	const status = useAuthStore((s) => s.status);
	const location = useLocation();
	if (status === "idle" || status === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {});
	if (status === "unauthenticated") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/login",
		replace: true,
		state: { from: location.pathname }
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/**
* Reusable role guard (Phase 0 foundation). Mirrors ProtectedRoute but additionally
* checks the authenticated user's role against `allow`. Unauthenticated users go to
* login; authenticated-but-unauthorised users are redirected to `redirectTo`.
*
* Not wired into any routes yet — provided for later role-scoped areas (admin /
* employer / seller consoles).
*/
function RoleRoute({ allow, children, redirectTo = "/app/dashboard" }) {
	const status = useAuthStore((s) => s.status);
	const user = useAuthStore((s) => s.user);
	const location = useLocation();
	if (status === "idle" || status === "loading") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {});
	if (status === "unauthenticated") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/login",
		replace: true,
		state: { from: location.pathname }
	});
	if (!hasRole(user, allow)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: redirectTo,
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
	})
}));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("pb-4 pt-0", className),
		children
	})
}));
AccordionContent.displayName = Content2.displayName;
var pageVariants = {
	initial: {
		opacity: 0,
		y: 12
	},
	animate: {
		opacity: 1,
		y: 0
	},
	exit: {
		opacity: 0,
		y: -8
	}
};
var pageTransition = {
	duration: .35,
	ease: [
		.16,
		1,
		.3,
		1
	]
};
var PageMotion = (0, import_react.forwardRef)(function PageMotion({ children, className, ...rest }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		ref,
		variants: pageVariants,
		initial: "initial",
		animate: "animate",
		exit: "exit",
		transition: pageTransition,
		className,
		...rest,
		children
	});
});
var stats = [
	{
		key: "stat_women",
		value: "128K+"
	},
	{
		key: "stat_courses",
		value: "1,200"
	},
	{
		key: "stat_jobs",
		value: "8,500"
	},
	{
		key: "stat_earnings",
		value: "₹42Cr"
	}
];
var partners = [
	"Google.org",
	"UN Women",
	"NASSCOM",
	"TATA",
	"Microsoft",
	"Unilever"
];
var testimonials = [
	{
		name: "Priya Sharma",
		role: "Learner → Designer, Bengaluru",
		quote: "In three months on Sakhi I went from a curious learner to a freelance designer earning steady income. The lessons were in my language, at my pace."
	},
	{
		name: "Anjali Deshmukh",
		role: "Marketplace seller, Pune",
		quote: "Sakhi's AI wrote beautiful descriptions for my sarees. My sales tripled in the first month. It felt like having a whole team behind me."
	},
	{
		name: "Rukmini Iyer",
		role: "Data analyst, Chennai",
		quote: "The verified jobs meant no scams, no fake recruiters. Just real opportunities matched to my skills."
	}
];
var faqs$1 = [
	{
		q: "Is Sakhi really free to use?",
		a: "Yes — Learn is 100% free forever. Earn and Flourish take a small transparent fee only when you succeed."
	},
	{
		q: "Which languages does Sakhi support?",
		a: "English, Hindi, Marathi today — with Tamil, Bengali, Kannada and Telugu coming next."
	},
	{
		q: "How does AI personalise my journey?",
		a: "Every recommendation is based on your goals, pace and past activity — never on invasive tracking."
	},
	{
		q: "Can I use Sakhi on a low-end phone?",
		a: "Absolutely. Sakhi is designed mobile-first and works beautifully on 2G/3G networks."
	}
];
function LandingPage() {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 gradient-hero pointer-events-none" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-24 -left-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl animate-float" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-40 -right-24 h-96 w-96 rounded-full bg-secondary/25 blur-3xl animate-float",
					style: { animationDelay: "1.5s" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-6xl px-6 pt-16 pb-24 sm:pt-24 sm:pb-32",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .5 },
						className: "mx-auto max-w-3xl text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-primary" }), t("landing.eyebrow")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient",
									children: t("landing.title")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed",
								children: t("landing.subtitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap items-center justify-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									className: "rounded-full gradient-primary text-primary-foreground shadow-glow hover:scale-[1.02] transition-transform",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/signup",
										children: [t("landing.cta_primary"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									size: "lg",
									className: "rounded-full glass border-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "#features",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "mr-1 h-4 w-4" }), t("landing.cta_secondary")]
									})
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 40,
							scale: .95
						},
						animate: {
							opacity: 1,
							y: 0,
							scale: 1
						},
						transition: {
							delay: .3,
							duration: .6
						},
						className: "mx-auto mt-16 max-w-4xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "glass rounded-3xl p-3 shadow-elegant",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl bg-card p-6 sm:p-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-6 sm:grid-cols-3",
									children: [
										{
											icon: GraduationCap,
											label: "Lessons this week",
											value: "12",
											color: "text-primary"
										},
										{
											icon: Briefcase,
											label: "Job matches",
											value: "8",
											color: "text-secondary"
										},
										{
											icon: Store,
											label: "Orders shipped",
											value: "24",
											color: "text-accent"
										}
									].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										initial: {
											opacity: 0,
											y: 12
										},
										animate: {
											opacity: 1,
											y: 0
										},
										transition: { delay: .5 + i * .1 },
										className: "rounded-2xl border border-border bg-background/60 p-5 hover-lift",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: `h-6 w-6 ${s.color}` }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-4 text-3xl font-bold",
												children: s.value
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground mt-1",
												children: s.label
											})
										]
									}, s.label))
								})
							})
						})
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-6 py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8",
				children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { delay: i * .05 },
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-4xl sm:text-5xl font-bold text-gradient",
						children: s.value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-sm text-muted-foreground",
						children: t(`landing.${s.key}`)
					})]
				}, s.key))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "features",
			className: "mx-auto max-w-6xl px-6 py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center max-w-2xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl sm:text-5xl font-bold tracking-tight",
					children: t("landing.features_title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground",
					children: t("landing.features_subtitle")
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid gap-6 md:grid-cols-3",
				children: [
					{
						icon: GraduationCap,
						key: "learn",
						tint: "from-primary/20 to-primary/5"
					},
					{
						icon: Briefcase,
						key: "earn",
						tint: "from-secondary/20 to-secondary/5"
					},
					{
						icon: Store,
						key: "flourish",
						tint: "from-accent/20 to-accent/5"
					}
				].map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { delay: i * .1 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: `relative overflow-hidden rounded-3xl border-border bg-gradient-to-br ${f.tint} p-8 hover-lift h-full`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "gradient-primary inline-flex rounded-2xl p-3 shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-6 w-6 text-primary-foreground" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 text-2xl font-bold",
								children: t(`landing.${f.key}_title`)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground leading-relaxed",
								children: t(`landing.${f.key}_desc`)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/signup",
								className: "mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary story-link",
								children: ["Explore ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						]
					})
				}, f.key))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-6 py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					{
						icon: ShieldCheck,
						title: "Verified & safe",
						desc: "Every course and job is human-reviewed."
					},
					{
						icon: Zap,
						title: "AI-personalised",
						desc: "Recommendations that actually fit you."
					},
					{
						icon: Earth,
						title: "Your language",
						desc: "English, Hindi, Marathi and growing."
					},
					{
						icon: Heart,
						title: "Community-led",
						desc: "Learning circles and mentors near you."
					}
				].map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: { opacity: 0 },
					whileInView: { opacity: 1 },
					viewport: { once: true },
					transition: { delay: i * .05 },
					className: "rounded-2xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "h-5 w-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 font-semibold",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm text-muted-foreground",
							children: p.desc
						})
					]
				}, p.title))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-6 py-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-xs uppercase tracking-widest text-muted-foreground",
				children: "Trusted by partners"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4",
				children: partners.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-lg font-display font-semibold text-muted-foreground/70 hover:text-foreground transition-colors",
					children: p
				}, p))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-6 py-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl sm:text-5xl font-bold tracking-tight",
					children: t("landing.stories_title")
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid gap-6 md:grid-cols-3",
				children: testimonials.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 16
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: { delay: i * .1 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rounded-3xl border-border bg-card p-8 h-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "h-6 w-6 text-primary/60" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm leading-relaxed",
								children: s.quote
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex items-center gap-1",
								children: Array.from({ length: 5 }).map((_, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-warning text-warning" }, k))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-sm",
									children: s.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: s.role
								})]
							})
						]
					})
				}, s.name))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-3xl px-6 py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-3xl sm:text-4xl font-bold tracking-tight text-center",
				children: t("landing.faq_title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
				type: "single",
				collapsible: true,
				className: "mt-10",
				children: faqs$1.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
					value: `item-${i}`,
					className: "border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
						className: "text-left font-medium hover:no-underline",
						children: f.q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
						className: "text-muted-foreground leading-relaxed",
						children: f.a
					})]
				}, i))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-6 py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-4xl gradient-primary p-10 sm:p-16 text-center shadow-glow",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_80%,white,transparent_40%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl sm:text-5xl font-bold text-primary-foreground",
							children: "Your journey starts today."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-primary-foreground/80 max-w-xl mx-auto",
							children: "Join 128,000+ women learning, earning and flourishing on Sakhi."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							className: "mt-8 rounded-full bg-card text-foreground hover:bg-card/90 shadow-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/signup",
								children: [
									t("landing.cta_primary"),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })
								]
							})
						})
					]
				})]
			})
		})
	] });
}
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "mx-auto max-w-4xl px-6 py-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-widest text-primary font-medium",
					children: "About Sakhi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-3 text-4xl sm:text-6xl font-bold tracking-tight",
					children: [
						"Built with love, ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient",
							children: "powered by AI"
						}),
						", for every woman."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 max-w-2xl mx-auto text-muted-foreground leading-relaxed",
					children: "Sakhi began with a simple belief — that every woman deserves the tools, mentors and marketplace to shape her own future. We combined AI with community to make that possible."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-16 grid gap-6 sm:grid-cols-3",
			children: [
				{
					icon: Heart,
					title: "Our mission",
					body: "Unlock economic independence for 10M women by 2030."
				},
				{
					icon: Target,
					title: "How we do it",
					body: "AI-personalised learning, verified jobs and a fair marketplace."
				},
				{
					icon: Users,
					title: "Our community",
					body: "128,000+ women, 4,200+ mentors and growing every day."
				}
			].map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 12
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				viewport: { once: true },
				transition: { delay: i * .1 },
				className: "rounded-3xl border border-border bg-card p-6 hover-lift",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "h-6 w-6 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 font-semibold",
						children: p.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: p.body
					})
				]
			}, p.title))
		})]
	});
}
var faqs = [
	{
		q: "How do I reset my password?",
		a: "Go to the sign-in page and tap 'Forgot password?'. We'll email you a secure reset link."
	},
	{
		q: "How do I switch language?",
		a: "Tap the globe icon in the top bar and pick English, Hindi or Marathi."
	},
	{
		q: "How do certificates work?",
		a: "Complete every lesson in a course to earn a shareable certificate."
	},
	{
		q: "How is my data protected?",
		a: "Sakhi never sells your data. Everything is encrypted in transit and at rest."
	},
	{
		q: "How do I sell on Flourish?",
		a: "Head to Flourish → Upload a product. Our AI can even help write a great description."
	},
	{
		q: "Do I pay any fees?",
		a: "Learn is free. Earn and Flourish take a small, transparent fee only when you're paid."
	}
];
function HelpPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const filtered = faqs.filter((f) => f.q.toLowerCase().includes(q.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "mx-auto max-w-3xl px-6 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl sm:text-5xl font-bold tracking-tight text-center",
				children: "How can we help?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search help articles…",
					className: "pl-11 h-12 rounded-full text-base"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
				type: "single",
				collapsible: true,
				className: "mt-8",
				children: filtered.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
					value: `item-${i}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
						className: "text-left hover:no-underline",
						children: f.q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
						className: "text-muted-foreground",
						children: f.a
					})]
				}, i))
			})
		]
	});
}
function NotFoundPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh flex items-center justify-center px-6 bg-background overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 gradient-hero pointer-events-none" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 20
			},
			animate: {
				opacity: 1,
				y: 0
			},
			className: "relative text-center max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-8xl sm:text-9xl font-bold text-gradient animate-gradient bg-clip-text",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-2xl sm:text-3xl font-bold",
					children: "This page took a coffee break."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: "Let's get you back to somewhere useful."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						className: "rounded-full gradient-primary text-primary-foreground shadow-glow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "h-4 w-4 mr-1" }), " Go home"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "lg",
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/app/dashboard",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 mr-1" }), " Dashboard"]
						})
					})]
				})
			]
		})]
	});
}
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var InputOTP = import_react.forwardRef(({ className, containerClassName, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lt, {
	ref,
	containerClassName: cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName),
	className: cn("disabled:cursor-not-allowed", className),
	...props
}));
InputOTP.displayName = "InputOTP";
var InputOTPGroup = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center", className),
	...props
}));
InputOTPGroup.displayName = "InputOTPGroup";
var InputOTPSlot = import_react.forwardRef(({ index, className, ...props }, ref) => {
	const { char, hasFakeCaret, isActive } = import_react.useContext(jt).slots[index];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: cn("relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md", isActive && "z-10 ring-1 ring-ring", className),
		...props,
		children: [char, hasFakeCaret && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" })
		})]
	});
});
InputOTPSlot.displayName = "InputOTPSlot";
var InputOTPSeparator = import_react.forwardRef(({ ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	role: "separator",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
}));
InputOTPSeparator.displayName = "InputOTPSeparator";
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup$1, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroup$1.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem$1, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupIndicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
var loginSchema = objectType({
	phone: stringType().min(10, "Enter a valid phone number"),
	password: stringType().min(6, "At least 6 characters")
});
var signupSchema = objectType({
	name: stringType().min(2, "Enter your full name"),
	email: stringType().email("Enter a valid email"),
	password: stringType().min(8, "Use 8+ characters for security"),
	phone: stringType().min(10, "Enter a valid phone number")
});
function LoginPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const login = useAuthStore((s) => s.login);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const form = useForm({
		resolver: u(loginSchema),
		defaultValues: {
			phone: "",
			password: ""
		}
	});
	const onSubmit = form.handleSubmit(async (values) => {
		setLoading(true);
		try {
			await login(values.phone, values.password);
			toast.success("Welcome back to Sakhi 🌸");
			navigate("/app/dashboard");
		} catch (e) {
			toast.error(unwrapError(e).message);
		} finally {
			setLoading(false);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl sm:text-3xl font-bold",
			children: t("auth.welcome_back")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 text-sm text-muted-foreground",
			children: t("auth.welcome_sub")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "mt-8 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("auth.phone"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }),
					error: form.formState.errors.phone?.message,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "tel",
						autoComplete: "tel",
						...form.register("phone"),
						className: "pl-10 h-11 rounded-xl"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("auth.password"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }),
					error: form.formState.errors.password?.message,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						autoComplete: "current-password",
						...form.register("password"),
						className: "pl-10 h-11 rounded-xl"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, { id: "remember" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: t("auth.remember")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/forgot-password",
						className: "text-primary hover:underline",
						children: t("auth.forgot")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: loading,
					className: "w-full h-11 rounded-xl gradient-primary text-primary-foreground shadow-md hover:shadow-glow",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						t("auth.sign_in"),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })
					] })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrDivider, { label: t("auth.or_continue") }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialButtons, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-8 text-center text-sm text-muted-foreground",
			children: [
				t("auth.no_account"),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/signup",
					className: "text-primary font-medium hover:underline",
					children: t("auth.sign_up")
				})
			]
		})
	] });
}
function SignupPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const signup = useAuthStore((s) => s.signup);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const form = useForm({
		resolver: u(signupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			phone: ""
		}
	});
	const onSubmit = form.handleSubmit(async (values) => {
		setLoading(true);
		try {
			await signup(values.name, values.email, values.password, values.phone);
			toast.success("Account created! Let's set things up.");
			navigate("/onboarding");
		} catch (e) {
			toast.error(unwrapError(e).message);
		} finally {
			setLoading(false);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl sm:text-3xl font-bold",
			children: t("auth.create_account")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 text-sm text-muted-foreground",
			children: t("auth.create_sub")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "mt-8 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("auth.full_name"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }),
					error: form.formState.errors.name?.message,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						...form.register("name"),
						className: "pl-10 h-11 rounded-xl"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("auth.email"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }),
					error: form.formState.errors.email?.message,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "email",
						...form.register("email"),
						className: "pl-10 h-11 rounded-xl"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("auth.phone"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }),
					error: form.formState.errors.phone?.message,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "tel",
						...form.register("phone"),
						className: "pl-10 h-11 rounded-xl"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: t("auth.password"),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }),
					error: form.formState.errors.password?.message,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						...form.register("password"),
						className: "pl-10 h-11 rounded-xl"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: loading,
					className: "w-full h-11 rounded-xl gradient-primary text-primary-foreground shadow-md hover:shadow-glow",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						t("auth.sign_up"),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })
					] })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrDivider, { label: t("auth.or_continue") }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialButtons, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-8 text-center text-sm text-muted-foreground",
			children: [
				t("auth.have_account"),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "text-primary font-medium hover:underline",
					children: t("auth.sign_in")
				})
			]
		})
	] });
}
function ForgotPasswordPage() {
	const { t } = useTranslation();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)("request");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const request = async (e) => {
		e.preventDefault();
		if (phone.trim().length < 10) {
			toast.error("Enter a valid phone number");
			return;
		}
		setLoading(true);
		try {
			const res = await authApi.forgotPassword(phone.trim());
			toast.success(res.message ?? "If an account exists, a reset code has been sent.");
			setStep("reset");
		} catch (e) {
			toast.error(unwrapError(e).message);
		} finally {
			setLoading(false);
		}
	};
	const reset = async (e) => {
		e.preventDefault();
		if (code.length !== 6) {
			toast.error("Enter the 6-digit code");
			return;
		}
		if (newPassword.length < 6) {
			toast.error("Password must be at least 6 characters");
			return;
		}
		setLoading(true);
		try {
			await authApi.resetPassword({
				phone: phone.trim(),
				code,
				newPassword
			});
			setStep("done");
		} catch (e) {
			toast.error(unwrapError(e).message);
		} finally {
			setLoading(false);
		}
	};
	if (step === "done") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "text-center py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent/20 text-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 text-xl font-bold",
				children: "Password updated"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "You can now sign in with your new password."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				className: "mt-6 rounded-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					children: "Back to sign in"
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl sm:text-3xl font-bold",
			children: t("auth.reset_title")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 text-sm text-muted-foreground",
			children: t("auth.reset_sub")
		}),
		step === "request" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: request,
			className: "mt-8 space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: t("auth.phone"),
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "tel",
					autoComplete: "tel",
					value: phone,
					onChange: (e) => setPhone(e.target.value),
					className: "pl-10 h-11 rounded-xl"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: loading,
				className: "w-full h-11 rounded-xl gradient-primary text-primary-foreground",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : t("auth.send_link")
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: reset,
			className: "mt-8 space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Reset code",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						inputMode: "numeric",
						maxLength: 6,
						value: code,
						onChange: (e) => setCode(e.target.value.replace(/\D/g, "")),
						className: "pl-10 h-11 rounded-xl tracking-[0.4em]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "New password",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "password",
						autoComplete: "new-password",
						value: newPassword,
						onChange: (e) => setNewPassword(e.target.value),
						className: "pl-10 h-11 rounded-xl"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: loading,
					className: "w-full h-11 rounded-xl gradient-primary text-primary-foreground",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Reset password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setStep("request"),
					className: "w-full text-sm text-muted-foreground hover:text-foreground",
					children: "Use a different number"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/login",
			className: "mt-6 block text-center text-sm text-muted-foreground hover:text-foreground",
			children: t("common.back")
		})
	] });
}
function OtpPage() {
	const { t } = useTranslation();
	const [otp, setOtp] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [resending, setResending] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const phone = useAuthStore((s) => s.user)?.phone ?? "";
	const onSubmit = async () => {
		if (otp.length !== 6) return;
		if (!phone) {
			toast.error("Sign in first to verify your phone.");
			return;
		}
		setLoading(true);
		try {
			await authApi.verifyOtp(phone, otp);
			toast.success("Phone verified!");
			navigate("/app/dashboard");
		} catch (e) {
			toast.error(unwrapError(e).message);
		} finally {
			setLoading(false);
		}
	};
	const resend = async () => {
		if (!phone) {
			toast.error("Sign in first to verify your phone.");
			return;
		}
		setResending(true);
		try {
			await authApi.sendOtp(phone);
			toast.success("A new code has been sent.");
		} catch (e) {
			toast.error(unwrapError(e).message);
		} finally {
			setResending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl sm:text-3xl font-bold",
				children: t("auth.otp_title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-sm text-muted-foreground",
				children: phone ? `${t("auth.otp_sub")} (${phone})` : t("auth.otp_sub")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTP, {
					maxLength: 6,
					value: otp,
					onChange: setOtp,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPGroup, { children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputOTPSlot, {
						index: i,
						className: "h-12 w-12 text-lg rounded-xl"
					}, i)) })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: onSubmit,
				disabled: otp.length !== 6 || loading,
				className: "mt-8 w-full h-11 rounded-xl gradient-primary text-primary-foreground",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : t("auth.verify")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: resend,
				disabled: resending,
				className: "mt-4 text-sm text-primary hover:underline disabled:opacity-50",
				children: resending ? "Sending…" : t("auth.resend")
			})
		]
	});
}
function OnboardingPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const setUser = useAuthStore((s) => s.setUser);
	const user = useAuthStore((s) => s.user);
	const [step, setStep] = (0, import_react.useState)(0);
	const [lang, setLang] = (0, import_react.useState)("en");
	const [role, setRole] = (0, import_react.useState)("learner");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const complete = async () => {
		setLoading(true);
		try {
			const updated = await userApi.completeOnboarding({
				language: lang,
				role
			});
			setUser(updated);
			toast.success("You're all set!");
			navigate("/app/dashboard");
		} catch {
			if (user) setUser({
				...user,
				language: lang,
				role,
				onboarded: true
			});
			navigate("/app/dashboard");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-2 mb-8",
			children: [0, 1].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1.5 flex-1 rounded-full transition-colors ${step >= s ? "gradient-primary" : "bg-muted"}` }, s))
		}),
		step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				x: 10
			},
			animate: {
				opacity: 1,
				x: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: t("auth.select_language")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: t("auth.onboarding_sub")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
					value: lang,
					onValueChange: setLang,
					className: "mt-6 grid gap-3",
					children: [
						{
							v: "en",
							label: "English"
						},
						{
							v: "hi",
							label: "हिन्दी (Hindi)"
						},
						{
							v: "mr",
							label: "मराठी (Marathi)"
						}
					].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						htmlFor: o.v,
						className: `flex items-center gap-3 rounded-2xl border p-4 cursor-pointer transition-all ${lang === o.v ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
							value: o.v,
							id: o.v
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: o.label
						})]
					}, o.v))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setStep(1),
					className: "mt-8 w-full h-11 rounded-xl gradient-primary text-primary-foreground",
					children: [
						t("auth.continue"),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 h-4 w-4" })
					]
				})
			]
		}),
		step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				x: 10
			},
			animate: {
				opacity: 1,
				x: 0
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: t("auth.select_role")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: t("auth.onboarding_sub")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
					value: role,
					onValueChange: setRole,
					className: "mt-6 grid gap-3",
					children: [
						{
							v: "learner",
							label: t("auth.role_learner")
						},
						{
							v: "earner",
							label: t("auth.role_earner")
						},
						{
							v: "seller",
							label: t("auth.role_seller")
						}
					].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						htmlFor: `r-${o.v}`,
						className: `flex items-center gap-3 rounded-2xl border p-4 cursor-pointer transition-all ${role === o.v ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
							value: o.v,
							id: `r-${o.v}`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: o.label
						})]
					}, o.v))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: complete,
					disabled: loading,
					className: "mt-8 w-full h-11 rounded-xl gradient-primary text-primary-foreground",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : t("auth.continue")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => navigate("/app/dashboard"),
					className: "mt-3 w-full text-sm text-muted-foreground hover:text-foreground",
					children: t("auth.skip")
				})
			]
		})
	] });
}
function Field({ label, icon, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-xs font-medium text-muted-foreground",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-1.5",
			children: [icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
				children: icon
			}), children]
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 text-xs text-destructive",
			children: error
		})
	] });
}
function OrDivider({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "my-6 flex items-center gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs uppercase tracking-wider text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
		]
	});
}
function SocialButtons() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-2 gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			className: "rounded-xl h-11",
			children: "Google"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			className: "rounded-xl h-11",
			children: "Apple"
		})]
	});
}
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root$1.displayName;
var XP = {
	lesson: 10,
	courseCompleted: 100,
	certificate: 50,
	application: 20,
	interview: 30,
	paidOrder: 25
};
var DAY_MS = 1440 * 60 * 1e3;
var WEEKDAY = [
	"S",
	"M",
	"T",
	"W",
	"T",
	"F",
	"S"
];
function dayKey(d) {
	return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
function startOfDay(d) {
	return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function isCompleted(e) {
	return e.progress >= 100 || !!e.completedAt;
}
/** Consecutive days (ending today or yesterday) that have at least one activity. */
function computeStreak(dates) {
	if (dates.length === 0) return 0;
	const days = new Set(dates.map(dayKey));
	const today = startOfDay(/* @__PURE__ */ new Date());
	let cursor = today;
	if (!days.has(dayKey(today))) {
		const yesterday = /* @__PURE__ */ new Date(today.getTime() - DAY_MS);
		if (days.has(dayKey(yesterday))) cursor = yesterday;
		else return 0;
	}
	let streak = 0;
	while (days.has(dayKey(cursor))) {
		streak += 1;
		cursor = /* @__PURE__ */ new Date(cursor.getTime() - DAY_MS);
	}
	return streak;
}
/** A 7-bucket series (oldest→today) counting past activity per day. */
function computeWeekly(dates) {
	const today = startOfDay(/* @__PURE__ */ new Date());
	const buckets = [];
	for (let i = 6; i >= 0; i -= 1) {
		const day = /* @__PURE__ */ new Date(today.getTime() - i * DAY_MS);
		const count = dates.filter((dt) => dayKey(startOfDay(dt)) === dayKey(day)).length;
		buckets.push({
			d: WEEKDAY[day.getDay()],
			v: count
		});
	}
	return buckets;
}
/**
* Aggregates the signed-in user's real activity into dashboard/profile insights.
* Safe for any role — the underlying endpoints simply return empty lists when a role
* has no data (e.g. an employer with no applications).
*/
function useUserInsights() {
	const authed = useAuthStore((s) => s.status === "authenticated");
	const enrollmentsQ = useQuery({
		queryKey: ["my-courses"],
		queryFn: coursesApi.myCourses,
		enabled: authed
	});
	const applicationsQ = useQuery({
		queryKey: ["my-applications"],
		queryFn: jobsApi.myApplications,
		enabled: authed
	});
	const interviewsQ = useQuery({
		queryKey: ["my-interviews"],
		queryFn: jobsApi.myInterviews,
		enabled: authed
	});
	const ordersQ = useQuery({
		queryKey: ["my-orders"],
		queryFn: ordersApi.list,
		enabled: authed
	});
	return (0, import_react.useMemo)(() => {
		const enrollments = enrollmentsQ.data ?? [];
		const applications = applicationsQ.data ?? [];
		const interviews = interviewsQ.data ?? [];
		const orders = ordersQ.data ?? [];
		const completed = enrollments.filter(isCompleted);
		const inProgress = enrollments.filter((e) => !isCompleted(e) && e.progress > 0);
		const certificates = enrollments.filter((e) => e.certificateUrl);
		const completedLessons = enrollments.reduce((sum, e) => sum + e.completedLessons.length, 0);
		const paidOrders = orders.filter((o) => o.paymentStatus === "PAID");
		const totalSpent = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);
		const continueLearning = [...inProgress].sort((a, b) => {
			const ta = new Date(a.lastActivityAt ?? a.enrolledAt ?? 0).getTime();
			return new Date(b.lastActivityAt ?? b.enrolledAt ?? 0).getTime() - ta;
		})[0] ?? null;
		const xp = completedLessons * XP.lesson + completed.length * XP.courseCompleted + certificates.length * XP.certificate + applications.length * XP.application + interviews.length * XP.interview + paidOrders.length * XP.paidOrder;
		const activity = [];
		for (const e of enrollments) {
			if (e.enrolledAt) activity.push({
				id: `enr-${e.id}`,
				kind: "course",
				title: `Enrolled in “${e.course.title}”`,
				date: e.enrolledAt
			});
			if (e.completedAt) activity.push({
				id: `cmp-${e.id}`,
				kind: "course",
				title: `Completed “${e.course.title}”`,
				date: e.completedAt
			});
			if (e.certificateUrl && e.completedAt) activity.push({
				id: `crt-${e.id}`,
				kind: "certificate",
				title: `Earned a certificate for “${e.course.title}”`,
				date: e.completedAt
			});
		}
		for (const a of applications) activity.push({
			id: `app-${a.id}`,
			kind: "job",
			title: `Applied to “${a.job.title}”`,
			date: a.appliedAt
		});
		for (const iv of interviews) activity.push({
			id: `int-${iv.id}`,
			kind: "interview",
			title: `Interview for “${iv.job.title}”`,
			date: iv.scheduledAt
		});
		for (const o of orders) activity.push({
			id: `ord-${o.id}`,
			kind: "order",
			title: `Placed an order · ₹${o.totalAmount.toLocaleString()}`,
			date: o.createdAt
		});
		activity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
		const now = Date.now();
		const pastDates = activity.map((a) => new Date(a.date)).filter((d) => d.getTime() <= now);
		return {
			isLoading: enrollmentsQ.isLoading || applicationsQ.isLoading || interviewsQ.isLoading || ordersQ.isLoading,
			coursesCount: enrollments.length,
			completedCourses: completed.length,
			coursesInProgress: inProgress.length,
			certificates: certificates.length,
			completedLessons,
			continueLearning,
			applicationsCount: applications.length,
			interviewsCount: interviews.length,
			ordersCount: orders.length,
			totalSpent,
			xp,
			streak: computeStreak(pastDates),
			activity: activity.slice(0, 12),
			weekly: computeWeekly(pastDates)
		};
	}, [
		enrollmentsQ.data,
		applicationsQ.data,
		interviewsQ.data,
		ordersQ.data,
		enrollmentsQ.isLoading,
		applicationsQ.isLoading,
		interviewsQ.isLoading,
		ordersQ.isLoading
	]);
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
}
function CardSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card p-5 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 w-full rounded-2xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-3/4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-1/2" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-16" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-24 rounded-full" })]
			})
		]
	});
}
function ListSkeleton({ count = 6 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
		children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardSkeleton, {}, i))
	});
}
function LineSkeleton({ lines = 4 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, {
			className: "h-4 w-full",
			style: { width: `${100 - i * 10}%` }
		}, i))
	});
}
function EmptyState({ icon: Icon = Inbox, title, description, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 10
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/40 px-6 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "gradient-primary rounded-2xl p-4 shadow-glow mb-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-7 w-7 text-primary-foreground" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold text-foreground",
				children: title
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-sm text-sm text-muted-foreground",
				children: description
			}),
			action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: action
			})
		]
	});
}
var KIND_META = {
	course: {
		icon: BookOpen,
		tint: "bg-primary/10 text-primary"
	},
	certificate: {
		icon: Trophy,
		tint: "bg-warning/20 text-warning"
	},
	job: {
		icon: Briefcase,
		tint: "bg-secondary/10 text-secondary"
	},
	interview: {
		icon: CalendarClock,
		tint: "bg-primary/10 text-primary"
	},
	order: {
		icon: Store,
		tint: "bg-accent/10 text-accent"
	}
};
function timeAgo(iso) {
	const diff = Date.now() - new Date(iso).getTime();
	if (diff < 0) return new Date(iso).toLocaleDateString();
	const mins = Math.floor(diff / 6e4);
	if (mins < 60) return mins <= 1 ? "just now" : `${mins}m ago`;
	const hrs = Math.floor(mins / 60);
	if (hrs < 24) return `${hrs}h ago`;
	const days = Math.floor(hrs / 24);
	if (days === 1) return "yesterday";
	if (days < 7) return `${days} days ago`;
	return new Date(iso).toLocaleDateString();
}
function DashboardPage() {
	const { t } = useTranslation();
	const user = useAuthStore((s) => s.user);
	const insights = useUserInsights();
	const isSeller = user?.role === "seller" || user?.role === "all";
	const greeting = (0, import_react.useMemo)(() => {
		const h = (/* @__PURE__ */ new Date()).getHours();
		if (h < 12) return t("dashboard.greeting_morning");
		if (h < 18) return t("dashboard.greeting_afternoon");
		return t("dashboard.greeting_evening");
	}, [t]);
	const courses = useQuery({
		queryKey: ["recommended-courses"],
		queryFn: coursesApi.recommended
	});
	const jobs = useQuery({
		queryKey: ["recommended-jobs"],
		queryFn: jobsApi.recommended
	});
	const featured = useQuery({
		queryKey: ["featured-products"],
		queryFn: productsApi.featured
	});
	const notifs = useQuery({
		queryKey: ["notifications"],
		queryFn: notificationsApi.list
	});
	const analytics = useQuery({
		queryKey: ["seller-analytics"],
		queryFn: ordersApi.analytics,
		enabled: isSeller
	});
	const earnings = isSeller ? analytics.data?.totalRevenue ?? 0 : insights.totalSpent;
	const stats = [
		{
			label: t("dashboard.streak"),
			value: insights.streak,
			icon: Flame,
			color: "text-destructive",
			suffix: " 🔥"
		},
		{
			label: t("dashboard.xp"),
			value: insights.xp,
			icon: Sparkles,
			color: "text-primary"
		},
		{
			label: t("dashboard.certificates"),
			value: insights.certificates,
			icon: Trophy,
			color: "text-warning"
		},
		{
			label: isSeller ? t("dashboard.earnings") : "Spent",
			value: `₹${earnings.toLocaleString()}`,
			icon: ShoppingBag,
			color: "text-accent"
		}
	];
	const cont = insights.continueLearning;
	const contProgress = cont?.progress ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [greeting, ","]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-1 text-3xl sm:text-4xl font-bold tracking-tight truncate",
							children: [
								user?.name?.split(" ")[0] ?? "friend",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient",
									children: "✨"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: t("dashboard.subtitle")
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "rounded-full shrink-0 hidden sm:inline-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app/notifications",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4 mr-1" }), " Inbox"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
				children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: i * .05 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rounded-3xl border-border bg-card p-5 hover-lift",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: `h-5 w-5 ${s.color}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 text-3xl font-bold",
								children: [s.value, s.suffix]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-xs text-muted-foreground",
								children: s.label
							})
						]
					})
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "lg:col-span-2 rounded-3xl border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: t("dashboard.progress_title")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: "Your activity over the last 7 days"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "rounded-full",
							children: "Weekly"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: insights.weekly,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
										id: "grad-primary",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "0%",
											stopColor: "var(--color-primary)",
											stopOpacity: .4
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
											offset: "100%",
											stopColor: "var(--color-primary)",
											stopOpacity: 0
										})]
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "d",
										stroke: "var(--color-muted-foreground)",
										fontSize: 12,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										hide: true,
										allowDecimals: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "var(--color-card)",
										border: "1px solid var(--color-border)",
										borderRadius: 12
									} }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "v",
										name: "activities",
										stroke: "var(--color-primary)",
										strokeWidth: 3,
										fill: "url(#grad-primary)"
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "rounded-3xl border-border bg-card p-6 flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: t("dashboard.continue_learning")
					}), cont ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 mx-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: 160,
								height: 160,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadialBarChart, {
									innerRadius: "70%",
									outerRadius: "100%",
									data: [{ v: contProgress }],
									startAngle: 90,
									endAngle: -270,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
										type: "number",
										domain: [0, 100],
										tick: false
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialBar, {
										dataKey: "v",
										cornerRadius: 20,
										fill: "var(--color-primary)",
										background: { fill: "var(--color-muted)" }
									})]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center -mt-24",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-3xl font-bold",
								children: [contProgress, "%"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Course complete"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto pt-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium line-clamp-1",
									children: cont.course.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
									value: contProgress,
									className: "mt-2 h-2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "sm",
									className: "mt-4 w-full rounded-full gradient-primary text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: `/app/learn/${cont.course.id}/learn`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3.5 w-3.5 mr-1" }),
											" ",
											t("learn.continue")
										]
									})
								})
							]
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex flex-col items-center justify-center text-center py-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-8 w-8 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: "No course in progress."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "mt-4 rounded-full gradient-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/app/learn",
									children: "Browse courses"
								})
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section$1, {
				title: t("dashboard.recommended_courses"),
				href: "/app/learn",
				children: courses.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 3 }) : (courses.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: BookOpen,
					title: "No course recommendations yet",
					description: "Enrol in a course or build your resume to get personalised picks."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: (courses.data ?? []).slice(0, 3).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniCourseCard, {
						title: c.title,
						category: c.category,
						progress: c.progress ?? 0,
						id: c.id
					}, c.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section$1, {
					title: t("dashboard.recommended_jobs"),
					href: "/app/earn",
					children: jobs.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 rounded-2xl bg-muted animate-pulse" }, i))
					}) : (jobs.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: Briefcase,
						title: "No job recommendations yet",
						description: "Add skills to your resume to see matched roles."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: (jobs.data ?? []).slice(0, 3).map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniJobRow, {
							title: j.title,
							company: j.company.name,
							location: j.location,
							id: j.id,
							remote: j.remote
						}, j.id))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section$1, {
					title: t("dashboard.activity"),
					children: insights.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-14 rounded-2xl bg-muted animate-pulse" }, i))
					}) : insights.activity.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: Sparkles,
						title: "No activity yet",
						description: "Your learning, jobs and orders will show up here."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: insights.activity.slice(0, 6).map((a) => {
							const meta = KIND_META[a.kind];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `grid h-9 w-9 shrink-0 place-items-center rounded-xl ${meta.tint}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(meta.icon, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-medium truncate",
										children: a.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: timeAgo(a.date)
									})]
								})]
							}, a.id);
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section$1, {
				title: t("dashboard.marketplace_highlights"),
				href: "/app/flourish",
				children: (featured.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: Store,
					title: "No products to show yet"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: (featured.data ?? []).slice(0, 4).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "overflow-hidden rounded-3xl border-border bg-card hover-lift",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: `/app/flourish/${p.id}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-square gradient-aurora overflow-hidden",
								children: p.images?.[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.images[0],
									alt: p.name,
									className: "h-full w-full object-cover"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-semibold truncate",
										children: p.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground truncate",
										children: p.seller.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 font-bold",
										children: ["₹", p.price]
									})
								]
							})]
						})
					}, p.id))
				})
			}),
			notifs.data && notifs.data.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"You have ",
					notifs.data.filter((n) => !n.read).length,
					" unread notifications."
				]
			})
		]
	});
}
function Section$1({ title, href, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between mb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-lg font-semibold",
			children: title
		}), href && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: href,
			className: "text-xs text-primary story-link",
			children: "View all"
		})]
	}), children] });
}
function MiniCourseCard({ id, title, category, progress }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "overflow-hidden rounded-3xl border-border bg-card hover-lift",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: `/app/learn/${id}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-video gradient-primary relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "rounded-full text-xs",
						children: category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 font-semibold line-clamp-2",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: progress,
						className: "mt-3 h-1.5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [progress, "% complete"]
					})
				]
			})]
		})
	});
}
function MiniJobRow({ id, title, company, location, remote }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: `/app/earn/${id}`,
		className: "block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 hover:border-primary/50 transition-colors",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
					className: "h-10 w-10 shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
						className: "gradient-primary text-primary-foreground text-xs font-bold",
						children: company.slice(0, 2).toUpperCase()
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold truncate",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground truncate",
						children: [
							company,
							" · ",
							location,
							" ",
							remote && "· Remote"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground shrink-0" })
			]
		})
	});
}
var Tabs = Root2$2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger$1, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger$1.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";
var loader = null;
function loadCheckout() {
	if (typeof window === "undefined") return Promise.resolve(false);
	if (window.Razorpay) return Promise.resolve(true);
	if (loader) return loader;
	loader = new Promise((resolve) => {
		const script = document.createElement("script");
		script.src = CHECKOUT_SRC;
		script.onload = () => resolve(true);
		script.onerror = () => resolve(false);
		document.body.appendChild(script);
	});
	return loader;
}
async function openRazorpayCheckout(opts) {
	if (!await loadCheckout() || !window.Razorpay) throw new Error("Could not load the payment gateway. Please check your connection and try again.");
	new window.Razorpay({
		key: opts.order.keyId,
		amount: opts.order.amount,
		currency: opts.order.currency,
		order_id: opts.order.razorpayOrderId,
		name: opts.name ?? "ElevateHer",
		description: opts.description,
		prefill: opts.prefill,
		theme: { color: "#7C3AED" },
		handler: (response) => opts.onSuccess(response),
		modal: { ondismiss: () => opts.onDismiss?.() }
	}).open();
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
/**
* Course reviews (Phase 2): lists reviews with the ML sentiment/trust summary and,
* for enrolled learners, a submission form. Reusable across the Learn module.
*/
function CourseReviews({ courseId, canReview }) {
	const qc = useQueryClient();
	const query = useQuery({
		queryKey: ["course-reviews", courseId],
		queryFn: () => coursesApi.reviews(courseId)
	});
	const [rating, setRating] = (0, import_react.useState)(5);
	const [comment, setComment] = (0, import_react.useState)("");
	const mutation = useMutation({
		mutationFn: () => coursesApi.addReview(courseId, {
			rating,
			comment: comment.trim() || void 0
		}),
		onSuccess: () => {
			setComment("");
			qc.invalidateQueries({ queryKey: ["course-reviews", courseId] });
			toast.success("Review submitted");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	const data = query.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			data?.sentiment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					className: `rounded-full gap-1 ${data.sentiment.overallScore >= 0 ? "bg-accent/15 text-accent" : "bg-destructive/15 text-destructive"}`,
					children: [data.sentiment.overallScore >= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-3.5 w-3.5" }), data.sentiment.trustLabel]
				}), data.avgRating != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-warning text-warning" }),
						" ",
						data.avgRating.toFixed(1),
						" (",
						data.totalReviews,
						")"
					]
				})]
			}),
			canReview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card p-5 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-medium",
						children: "Leave a review"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1",
						children: [
							1,
							2,
							3,
							4,
							5
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `${n} stars`,
							onClick: () => setRating(n),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-5 w-5 ${n <= rating ? "fill-warning text-warning" : "text-muted-foreground"}` })
						}, n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: comment,
						onChange: (e) => setComment(e.target.value),
						rows: 3,
						placeholder: "Share what you thought…",
						className: "rounded-2xl"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => mutation.mutate(),
						disabled: mutation.isPending,
						className: "rounded-full gradient-primary text-primary-foreground",
						children: mutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Submit review"
					})
				]
			}),
			query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineSkeleton, { lines: 4 }) : !data || data.reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No reviews yet",
				description: "Be the first to review this course."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: data.reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1",
								children: Array.from({ length: 5 }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-3.5 w-3.5 ${j < r.rating ? "fill-warning text-warning" : "text-muted-foreground"}` }, j))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: new Date(r.createdAt).toLocaleDateString()
							})]
						}),
						r.comment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: r.comment
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 text-xs text-muted-foreground",
							children: ["— ", r.user?.name ?? "Learner"]
						})
					]
				}, r.id))
			})
		]
	});
}
function ErrorState({ title, description, onRetry }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		className: "flex flex-col items-center justify-center rounded-3xl border border-destructive/30 bg-destructive/5 px-6 py-14 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl bg-destructive/10 p-4 mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-6 w-6 text-destructive" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold",
				children: title ?? t("common.error_title")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-sm text-sm text-muted-foreground",
				children: description ?? t("common.error_sub")
			}),
			onRetry && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: onRetry,
				className: "mt-6",
				children: t("common.retry")
			})
		]
	});
}
var categories = [
	"all",
	"Design",
	"Marketing",
	"Finance",
	"Coding",
	"Wellness",
	"Craft"
];
function LearnPage() {
	const { t } = useTranslation();
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("all");
	const query = useQuery({
		queryKey: [
			"courses",
			q,
			cat
		],
		queryFn: () => coursesApi.list({
			q,
			category: cat === "all" ? void 0 : cat
		})
	});
	const courses = query.data?.items ?? [];
	const filtered = courses.filter((c) => cat === "all" || c.category === cat);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl font-bold tracking-tight",
				children: t("learn.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: t("learn.subtitle")
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: t("learn.search"),
						className: "pl-11 h-12 rounded-full bg-card"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setCat(c),
					className: `px-4 py-1.5 rounded-full text-sm font-medium transition-all ${cat === c ? "gradient-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:text-foreground"}`,
					children: c === "all" ? t("learn.all") : c
				}, c))
			}),
			query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 6 }) : query.isError && !courses.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => query.refetch() }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: BookOpen,
				title: t("learn.empty"),
				description: "Try a different search or category."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: i % 6 * .05 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, { course: c })
				}, c.id))
			})
		]
	});
}
function CourseCard({ course }) {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: `/app/learn/${course.id}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "overflow-hidden rounded-3xl border-border bg-card hover-lift h-full",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-video gradient-primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-label": "Bookmark",
						className: "absolute top-3 right-3 rounded-full p-2 bg-card/40 backdrop-blur text-white hover:bg-card/60",
						onClick: (e) => {
							e.preventDefault();
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "absolute bottom-3 left-3 rounded-full bg-card/80 text-foreground backdrop-blur",
						children: course.level
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "rounded-full text-xs",
							children: course.category
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-warning text-warning" }),
								" ",
								course.rating.toFixed(1)
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-3 font-semibold line-clamp-2",
						children: course.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center gap-3 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
								" ",
								course.duration_hours,
								"h"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3 w-3" }),
								" ",
								course.lessons_count,
								" ",
								t("learn.lessons")
							]
						})]
					}),
					course.progress ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: course.progress,
						className: "mt-4 h-1.5"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex justify-between text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [course.progress, "%"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary font-medium",
							children: t("learn.continue")
						})]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						className: "mt-4 w-full rounded-full gradient-primary text-primary-foreground",
						children: t("learn.enroll")
					})
				]
			})]
		})
	});
}
function CourseDetailPage() {
	const { id } = useParams();
	const { t } = useTranslation();
	const qc = useQueryClient();
	const authed = useAuthStore((s) => s.status === "authenticated");
	const user = useAuthStore((s) => s.user);
	const query = useQuery({
		queryKey: ["course", id],
		queryFn: () => coursesApi.get(id),
		enabled: !!id
	});
	const myCoursesQuery = useQuery({
		queryKey: ["my-courses"],
		queryFn: coursesApi.myCourses,
		enabled: authed
	});
	const lessonsQuery = useQuery({
		queryKey: ["lessons", id],
		queryFn: () => coursesApi.lessons(id),
		enabled: !!id && authed
	});
	const startPayment = async (enrollmentId, courseTitle) => {
		try {
			await openRazorpayCheckout({
				order: await coursesApi.createPayment(enrollmentId),
				description: courseTitle,
				prefill: {
					name: user?.name,
					contact: user?.phone,
					email: user?.email
				},
				onSuccess: async (r) => {
					try {
						await coursesApi.verifyPayment(enrollmentId, {
							razorpayOrderId: r.razorpay_order_id,
							razorpayPaymentId: r.razorpay_payment_id,
							razorpaySignature: r.razorpay_signature
						});
						qc.invalidateQueries({ queryKey: ["my-courses"] });
						toast.success("Payment successful — course unlocked 🎉");
					} catch (e) {
						toast.error(unwrapError(e).message);
					}
				}
			});
		} catch (e) {
			toast.error(unwrapError(e).message);
		}
	};
	const enrollMutation = useMutation({
		mutationFn: () => coursesApi.enroll(id),
		onSuccess: async (res) => {
			qc.invalidateQueries({ queryKey: ["my-courses"] });
			if (res.requiresPayment && res.enrollment?.id) await startPayment(res.enrollment.id, query.data?.title ?? "Course");
			else toast.success("Enrolled successfully 🎉");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	if (query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageMotion, {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineSkeleton, { lines: 8 })
	});
	if (query.isError || !query.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageMotion, {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => query.refetch() })
	});
	const course = query.data;
	const enrollment = myCoursesQuery.data?.find((e) => e.course.id === course.id);
	const enrolled = !!enrollment;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/app/learn",
			className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }),
				" ",
				t("common.back")
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-[1fr_360px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "overflow-hidden rounded-3xl border-border bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-video gradient-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "absolute inset-0 grid place-items-center group",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-20 w-20 place-items-center rounded-full bg-card/90 shadow-glow group-hover:scale-110 transition-transform",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-8 w-8 fill-primary text-primary translate-x-0.5" })
								})
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "rounded-full",
							children: course.category
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-3xl sm:text-4xl font-bold tracking-tight",
							children: course.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-warning text-warning" }),
										" ",
										course.rating.toFixed(1),
										" (",
										course.reviews_count,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }),
										" ",
										course.reviews_count,
										" learners"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }),
										" ",
										course.duration_hours,
										"h"
									]
								})
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						defaultValue: "about",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "rounded-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "about",
										className: "rounded-full",
										children: t("learn.about_course")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "syllabus",
										className: "rounded-full",
										children: t("learn.syllabus")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "discussion",
										className: "rounded-full",
										children: t("learn.discussion")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "reviews",
										className: "rounded-full",
										children: t("learn.reviews")
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "about",
								className: "mt-6 space-y-4",
								children: query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineSkeleton, { lines: 5 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "leading-relaxed text-muted-foreground",
									children: [course.description, " You'll learn practical, project-based skills to help you land your first real opportunity. Every lesson is short, in your language, and reviewed by industry mentors."]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "syllabus",
								className: "mt-6 space-y-3",
								children: lessonsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineSkeleton, { lines: 4 }) : !lessonsQuery.data || lessonsQuery.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
									title: "No lessons yet",
									description: authed ? "The creator hasn't added lessons to this course." : "Sign in to view the lessons."
								}) : lessonsQuery.data.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 rounded-2xl border border-border bg-card p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-sm font-semibold",
											children: i + 1
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-medium",
												children: l.title
											}), l.content && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground line-clamp-1",
												children: l.content
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 text-muted-foreground" })
									]
								}, l.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "discussion",
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
									title: "Be the first to start a thread.",
									description: "Ask a question or share what you're building."
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "reviews",
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseReviews, {
									courseId: course.id,
									canReview: enrolled
								})
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "rounded-3xl border-border bg-card p-6 sticky top-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-3xl font-bold",
							children: course.price ? `₹${course.price}` : "Free"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Includes certificate on completion"
						}),
						enrolled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-accent/10 text-accent p-3 text-sm flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }),
										" ",
										enrollment.progress >= 100 ? "Completed" : "Enrolled"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
									value: enrollment.progress,
									className: "h-2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground",
									children: [enrollment.progress, "% complete"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "mt-2 w-full rounded-full gradient-primary text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: `/app/learn/${course.id}/learn`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3.5 w-3.5 mr-1" }),
											" ",
											enrollment.progress > 0 ? "Continue learning" : "Start learning"
										]
									})
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => enrollMutation.mutate(),
							disabled: enrollMutation.isPending || !authed,
							className: "mt-6 w-full rounded-full gradient-primary text-primary-foreground shadow-md hover:shadow-glow",
							children: enrollMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : t("learn.enroll")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "mt-2 w-full rounded-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "h-4 w-4 mr-1" }), " Save for later"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 border-t border-border pt-6 space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-muted-foreground" }),
										" ",
										course.duration_hours,
										"h of content"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4 w-4 text-muted-foreground" }),
										" ",
										course.lessons_count,
										" lessons"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4 text-muted-foreground" }), " Certificate on completion"]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "rounded-3xl border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-sm font-semibold mb-3",
						children: t("learn.mentor")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							className: "h-12 w-12",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
								className: "gradient-primary text-primary-foreground text-xs font-bold",
								children: course.mentor.name.slice(0, 2).toUpperCase()
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: course.mentor.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: course.mentor.title
						})] })]
					})]
				})]
			})]
		})]
	});
}
var STATUS_TINT$2 = {
	APPROVED: "bg-accent/15 text-accent",
	PENDING: "bg-warning/15 text-warning",
	REJECTED: "bg-destructive/15 text-destructive"
};
function MyCoursesPage() {
	const enrolled = useQuery({
		queryKey: ["my-courses"],
		queryFn: coursesApi.myCourses
	});
	const created = useQuery({
		queryKey: ["my-created-courses"],
		queryFn: coursesApi.myCreated
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl font-bold tracking-tight",
				children: "My Learning"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: "Continue where you left off, or share what you know."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "rounded-full shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app/certificates",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4 mr-1" }), " Certificates"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "rounded-full gradient-primary text-primary-foreground shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app/learn/create",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1" }), " Create course"]
					})
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "enrolled",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "rounded-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "enrolled",
						className: "rounded-full",
						children: "Enrolled"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "created",
						className: "rounded-full",
						children: "Created"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "enrolled",
					className: "mt-6",
					children: enrolled.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 4 }) : !enrolled.data || enrolled.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: BookOpen,
						title: "You haven't enrolled yet",
						description: "Explore courses and start learning.",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "rounded-full gradient-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app/learn",
								children: "Browse courses"
							})
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: enrolled.data.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "rounded-3xl border-border bg-card p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									className: "rounded-full text-xs",
									children: e.course.category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 font-semibold line-clamp-2",
									children: e.course.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
									value: e.progress,
									className: "mt-3 h-1.5"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [e.progress, "% complete"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "sm",
										className: "rounded-full gradient-primary text-primary-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: `/app/learn/${e.course.id}/learn`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-3.5 w-3.5 mr-1" }),
												" ",
												e.progress > 0 ? "Continue" : "Start"
											]
										})
									}), e.certificateUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "sm",
										variant: "outline",
										className: "rounded-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/app/certificates",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3.5 w-3.5 mr-1" }), " Certificate"]
										})
									})]
								})
							]
						}, e.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "created",
					className: "mt-6",
					children: created.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 4 }) : !created.data || created.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: Plus,
						title: "You haven't created a course",
						description: "Share your skills — submit a course for review.",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "rounded-full gradient-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app/learn/create",
								children: "Create course"
							})
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: created.data.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "rounded-3xl border-border bg-card p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										className: "rounded-full text-xs",
										children: c.category
									}), c.reviewStatus && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: `rounded-full text-xs ${STATUS_TINT$2[c.reviewStatus] ?? "bg-muted text-muted-foreground"}`,
										children: c.reviewStatus
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 font-semibold line-clamp-2",
									children: c.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "sm",
										variant: "outline",
										className: "rounded-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: `/app/learn/${c.id}/edit`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-3.5 w-3.5 mr-1" }), " Manage"]
										})
									})
								})
							]
						}, c.id))
					})
				})
			]
		})]
	});
}
function CoursePlayerPage() {
	const { id: courseId } = useParams();
	const qc = useQueryClient();
	const courseQuery = useQuery({
		queryKey: ["course", courseId],
		queryFn: () => coursesApi.get(courseId),
		enabled: !!courseId
	});
	const lessonsQuery = useQuery({
		queryKey: ["lessons", courseId],
		queryFn: () => coursesApi.lessons(courseId),
		enabled: !!courseId
	});
	const enrollQuery = useQuery({
		queryKey: ["my-courses"],
		queryFn: coursesApi.myCourses
	});
	const quizQuery = useQuery({
		queryKey: ["quiz", courseId],
		queryFn: () => coursesApi.getQuiz(courseId),
		enabled: !!courseId,
		retry: false
	});
	const lessons = (0, import_react.useMemo)(() => lessonsQuery.data ?? [], [lessonsQuery.data]);
	const enrollment = enrollQuery.data?.find((e) => e.course.id === courseId);
	const quizExists = !!quizQuery.data;
	const [completed, setCompleted] = (0, import_react.useState)([]);
	const [current, setCurrent] = (0, import_react.useState)(0);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (hydrated || !enrollment || lessons.length === 0) return;
		setCompleted(enrollment.completedLessons);
		const firstIncomplete = lessons.findIndex((l) => !enrollment.completedLessons.includes(l.id));
		setCurrent(firstIncomplete === -1 ? lessons.length - 1 : firstIncomplete);
		setHydrated(true);
	}, [
		enrollment,
		lessons,
		hydrated
	]);
	const mutation = useMutation({
		mutationFn: (payload) => coursesApi.updateProgress(enrollment.id, payload),
		onSuccess: (updated) => {
			qc.invalidateQueries({ queryKey: ["my-courses"] });
			if (updated.progress >= 100) toast.success("Course completed! 🎉 Certificate generated.");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	if (courseQuery.isLoading || lessonsQuery.isLoading || enrollQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageMotion, {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineSkeleton, { lines: 8 })
	});
	if (courseQuery.isError || !courseQuery.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageMotion, {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => courseQuery.refetch() })
	});
	const course = courseQuery.data;
	if (!enrollment) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageMotion, {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: CirclePlay,
			title: "Enroll to start learning",
			description: "You need to enroll in this course before you can access the lessons.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "rounded-full gradient-primary text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: `/app/learn/${courseId}`,
					children: "Go to course"
				})
			})
		})
	});
	if (lessons.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, { courseId }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No lessons yet",
			description: "The creator hasn't added lessons to this course."
		})]
	});
	const lesson = lessons[current];
	const isDone = (lessonId) => completed.includes(lessonId);
	const progress = Math.round(completed.length / lessons.length * 100);
	const allDone = completed.length >= lessons.length;
	const markComplete = () => {
		const set = /* @__PURE__ */ new Set([...completed, lesson.id]);
		const nextCompleted = lessons.filter((l) => set.has(l.id)).map((l) => l.id);
		let nextProgress = Math.round(nextCompleted.length / lessons.length * 100);
		if (nextProgress === 100 && quizExists) nextProgress = 99;
		setCompleted(nextCompleted);
		mutation.mutate({
			progress: nextProgress,
			completedLessons: nextCompleted
		});
		if (current < lessons.length - 1) setCurrent(current + 1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, { courseId }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl sm:text-3xl font-bold tracking-tight",
				children: course.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: progress,
					className: "h-2"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 text-xs text-muted-foreground",
					children: [
						progress,
						"% complete · ",
						completed.length,
						"/",
						lessons.length,
						" lessons"
					]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[280px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "rounded-3xl border-border bg-card p-3 h-fit",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-1",
						children: lessons.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setCurrent(i),
							className: `w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${i === current ? "bg-primary/10 text-primary" : "hover:bg-muted"}`,
							children: [isDone(l.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-accent shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-4 w-4 text-muted-foreground shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "line-clamp-1",
								children: [
									i + 1,
									". ",
									l.title
								]
							})]
						}, l.id))
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "rounded-3xl border-border bg-card overflow-hidden",
							children: [lesson.videoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								src: lesson.videoUrl,
								controls: true,
								className: "w-full aspect-video bg-black"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-video gradient-primary grid place-items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "h-14 w-14 text-primary-foreground/80" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-bold",
									children: lesson.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-line",
									children: lesson.content || "No content for this lesson."
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									disabled: current === 0,
									onClick: () => setCurrent(current - 1),
									className: "rounded-full",
									children: "Previous"
								}),
								!isDone(lesson.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: markComplete,
									disabled: mutation.isPending,
									className: "rounded-full gradient-primary text-primary-foreground",
									children: mutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 mr-1" }), " Mark complete"] })
								}) : current < lessons.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => setCurrent(current + 1),
									className: "rounded-full gradient-primary text-primary-foreground",
									children: "Next lesson"
								}) : null,
								allDone && quizExists && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "rounded-full gradient-primary text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: `/app/learn/${courseId}/quiz`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { className: "h-4 w-4 mr-1" }), " Take the quiz"]
									})
								})
							]
						}),
						allDone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "rounded-2xl border-border bg-accent/10 text-accent p-4 text-sm flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), quizExists ? "All lessons done — pass the quiz to earn your certificate." : "All lessons complete! Your certificate is ready in My Certificates."]
						})
					]
				})]
			})
		]
	});
}
function BackLink({ courseId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: `/app/learn/${courseId}`,
		className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to course"]
	});
}
function QuizPage() {
	const { id: courseId } = useParams();
	const qc = useQueryClient();
	const quizQuery = useQuery({
		queryKey: ["quiz", courseId],
		queryFn: () => coursesApi.getQuiz(courseId),
		enabled: !!courseId,
		retry: false
	});
	const enrollQuery = useQuery({
		queryKey: ["my-courses"],
		queryFn: coursesApi.myCourses
	});
	const [answers, setAnswers] = (0, import_react.useState)([]);
	const [result, setResult] = (0, import_react.useState)(null);
	const enrollment = enrollQuery.data?.find((e) => e.course.id === courseId);
	const submit = useMutation({
		mutationFn: async () => {
			const quiz = quizQuery.data;
			const res = await coursesApi.submitQuiz(quiz.id, answers);
			if (res.passed && enrollment) {
				await coursesApi.updateProgress(enrollment.id, { progress: 100 });
				qc.invalidateQueries({ queryKey: ["my-courses"] });
			}
			return res;
		},
		onSuccess: (res) => {
			setResult(res);
			toast[res.passed ? "success" : "error"](res.passed ? "Quiz passed! 🎉" : "Not quite — try again.");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	if (quizQuery.isLoading || enrollQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageMotion, {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineSkeleton, { lines: 8 })
	});
	const back = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: `/app/learn/${courseId}`,
		className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to course"]
	});
	if (quizQuery.isError || !quizQuery.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-6",
		children: [back, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No quiz for this course",
			description: "This course doesn't have a quiz yet."
		})]
	});
	const quiz = quizQuery.data;
	if (result) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "max-w-lg mx-auto text-center py-12 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mx-auto grid h-16 w-16 place-items-center rounded-3xl ${result.passed ? "bg-accent/15 text-accent" : "bg-destructive/15 text-destructive"}`,
				children: result.passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-8 w-8" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold",
				children: result.passed ? "You passed!" : "Not passed"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted-foreground",
				children: [
					"You scored ",
					result.score,
					"% (",
					result.correctCount,
					"/",
					result.totalQuestions,
					" correct). Passing score is ",
					quiz.passingScore,
					"%."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-center gap-3 pt-2",
				children: [result.passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "rounded-full gradient-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app/certificates",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4 mr-1" }), " View certificate"]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						setResult(null);
						setAnswers([]);
					},
					className: "rounded-full gradient-primary text-primary-foreground",
					children: "Try again"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/app/learn/${courseId}`,
						children: "Back to course"
					})
				})]
			})
		]
	});
	const allAnswered = quiz.questions.every((_, i) => answers[i] !== void 0 && answers[i] >= 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-6 max-w-3xl",
		children: [
			back,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl sm:text-3xl font-bold tracking-tight",
				children: quiz.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					"Pass with ",
					quiz.passingScore,
					"% or higher to complete the course."
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: quiz.questions.map((q, qi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "rounded-3xl border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-medium",
						children: [
							qi + 1,
							". ",
							q.questionText
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-2",
						children: q.options.map((opt, oi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: `flex items-center gap-3 rounded-2xl border p-3 cursor-pointer transition-all ${answers[qi] === oi ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: `q-${qi}`,
								checked: answers[qi] === oi,
								onChange: () => setAnswers((prev) => {
									const next = [...prev];
									next[qi] = oi;
									return next;
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: opt
							})]
						}, oi))
					})]
				}, q.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => submit.mutate(),
				disabled: !allAnswered || submit.isPending,
				className: "rounded-full gradient-primary text-primary-foreground",
				children: submit.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Submit quiz"
			})
		]
	});
}
var FILE_BASE$2 = API_BASE_URL.replace(/\/api\/?$/, "");
function CertificatesPage() {
	const query = useQuery({
		queryKey: ["my-courses"],
		queryFn: coursesApi.myCourses
	});
	const certificates = (query.data ?? []).filter((e) => e.certificateUrl);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl sm:text-4xl font-bold tracking-tight",
			children: "My Certificates"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Certificates you've earned by completing courses."
		})] }), query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 3 }) : certificates.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Award,
			title: "No certificates yet",
			description: "Complete a course to earn your first certificate."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: certificates.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-3xl border-border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-24 gradient-primary rounded-2xl grid place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-10 w-10 text-primary-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 text-sm font-semibold line-clamp-2",
						children: e.course.title
					}),
					e.completedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: ["Completed ", new Date(e.completedAt).toLocaleDateString()]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						className: "mt-4 w-full rounded-full gradient-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `${FILE_BASE$2}${e.certificateUrl}`,
							target: "_blank",
							rel: "noreferrer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5 mr-1" }), " View / Download"]
						})
					})
				]
			}, e.id))
		})]
	});
}
/**
* Reusable file/image uploader (Phase 0 foundation). Uploads through the shared
* uploadApi and returns the stored URL via `onUploaded`. Feature pages (Learn media,
* Marketplace product images, Profile avatar) will consume this in later phases — it
* is intentionally not wired anywhere yet.
*/
function ImageUploader({ onUploaded, accept = "image/*", label = "Upload image", disabled = false, className }) {
	const inputRef = (0, import_react.useRef)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const handleChange = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setUploading(true);
		try {
			onUploaded((await uploadApi.upload(file)).url);
			toast.success("Uploaded");
		} catch (err) {
			toast.error(unwrapError(err).message);
		} finally {
			setUploading(false);
			if (inputRef.current) inputRef.current.value = "";
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: inputRef,
			type: "file",
			accept,
			className: "hidden",
			onChange: handleChange
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "outline",
			disabled: disabled || uploading,
			onClick: () => inputRef.current?.click(),
			className: "rounded-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4 mr-1" }),
				" ",
				uploading ? "Uploading…" : label
			]
		})]
	});
}
var LEVELS = [
	"BEGINNER",
	"INTERMEDIATE",
	"ADVANCED"
];
var LANGS = [
	{
		v: "en",
		l: "English"
	},
	{
		v: "hi",
		l: "हिन्दी"
	},
	{
		v: "mr",
		l: "मराठी"
	}
];
var CATEGORIES$1 = [
	"Design",
	"Marketing",
	"Finance",
	"Coding",
	"Wellness",
	"Craft",
	"Tailoring",
	"Cooking"
];
function CourseEditorPage() {
	const { id } = useParams();
	const isEdit = !!id;
	const navigate = useNavigate();
	const qc = useQueryClient();
	const courseQuery = useQuery({
		queryKey: ["course", id],
		queryFn: () => coursesApi.get(id),
		enabled: isEdit
	});
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		category: "Design",
		description: "",
		level: "BEGINNER",
		language: "en",
		price: "",
		mediaUrl: ""
	});
	(0, import_react.useEffect)(() => {
		if (courseQuery.data) setForm((f) => ({
			...f,
			title: courseQuery.data.title,
			category: courseQuery.data.category,
			description: courseQuery.data.description ?? "",
			level: (courseQuery.data.level ?? "beginner").toUpperCase(),
			language: courseQuery.data.language ?? "en",
			price: courseQuery.data.price ? String(courseQuery.data.price) : ""
		}));
	}, [courseQuery.data]);
	const save = useMutation({
		mutationFn: () => {
			const payload = {
				title: form.title,
				category: form.category,
				description: form.description || void 0,
				level: form.level,
				language: form.language,
				price: Number(form.price) || 0,
				...form.mediaUrl && { mediaUrl: form.mediaUrl }
			};
			return isEdit ? coursesApi.update(id, payload) : coursesApi.create(payload);
		},
		onSuccess: (course) => {
			qc.invalidateQueries({ queryKey: ["my-created-courses"] });
			if (!isEdit) {
				toast.success("Course submitted for review. Add lessons next.");
				navigate(`/app/learn/${course.id}/edit`);
			} else toast.success("Course saved");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8 max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/learn/mine",
				className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " My Learning"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl font-bold tracking-tight",
				children: isEdit ? "Manage course" : "Create a course"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: isEdit ? "Update details, add lessons and a quiz." : "Submit a course — an admin will review it before it goes live."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-3xl border-border bg-card p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.title,
						onChange: (e) => setForm({
							...form,
							title: e.target.value
						}),
						className: "mt-1.5 rounded-xl h-11"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 flex flex-wrap gap-2",
						children: CATEGORIES$1.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setForm({
								...form,
								category: c
							}),
							className: `px-3.5 py-1.5 rounded-full text-xs font-medium ${form.category === c ? "gradient-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground"}`,
							children: c
						}, c))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Level" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 flex flex-wrap gap-2",
							children: LEVELS.map((lv) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setForm({
									...form,
									level: lv
								}),
								className: `px-3 py-1.5 rounded-full text-xs font-medium ${form.level === lv ? "gradient-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground"}`,
								children: lv.toLowerCase()
							}, lv))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Language" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 flex flex-wrap gap-2",
							children: LANGS.map((lg) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setForm({
									...form,
									language: lg.v
								}),
								className: `px-3 py-1.5 rounded-full text-xs font-medium ${form.language === lg.v ? "gradient-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground"}`,
								children: lg.l
							}, lg.v))
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: form.description,
						onChange: (e) => setForm({
							...form,
							description: e.target.value
						}),
						rows: 4,
						className: "mt-1.5 rounded-2xl"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Price (₹, 0 = free)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: "0",
							value: form.price,
							onChange: (e) => setForm({
								...form,
								price: e.target.value
							}),
							className: "mt-1.5 rounded-xl h-11"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cover / media" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1.5 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
								onUploaded: (url) => setForm({
									...form,
									mediaUrl: url
								}),
								label: "Upload media"
							}), form.mediaUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-accent",
								children: "uploaded ✓"
							})]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => save.mutate(),
						disabled: save.isPending || !form.title,
						className: "rounded-full gradient-primary text-primary-foreground",
						children: save.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : isEdit ? "Save changes" : "Submit for review"
					})
				]
			}),
			isEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonManager, { courseId: id }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizBuilder, { courseId: id }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtRiskPanel, { courseId: id })
			] })
		]
	});
}
function LessonManager({ courseId }) {
	const qc = useQueryClient();
	const lessonsQuery = useQuery({
		queryKey: ["lessons", courseId],
		queryFn: () => coursesApi.lessons(courseId)
	});
	const [draft, setDraft] = (0, import_react.useState)({
		title: "",
		content: "",
		videoUrl: ""
	});
	const add = useMutation({
		mutationFn: () => coursesApi.createLesson(courseId, {
			title: draft.title,
			content: draft.content || void 0,
			videoUrl: draft.videoUrl || void 0
		}),
		onSuccess: () => {
			setDraft({
				title: "",
				content: "",
				videoUrl: ""
			});
			qc.invalidateQueries({ queryKey: ["lessons", courseId] });
			toast.success("Lesson added");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	const remove = useMutation({
		mutationFn: (lessonId) => coursesApi.deleteLesson(lessonId),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["lessons", courseId] });
			toast.success("Lesson removed");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "rounded-3xl border-border bg-card p-6 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold",
				children: "Lessons"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [(lessonsQuery.data ?? []).map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-2xl border border-border p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm flex-1 line-clamp-1",
							children: [
								i + 1,
								". ",
								l.title
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => remove.mutate(l.id),
							className: "rounded-full text-destructive hover:text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
						})
					]
				}, l.id)), (lessonsQuery.data ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No lessons yet."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-dashed border-border p-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: draft.title,
						onChange: (e) => setDraft({
							...draft,
							title: e.target.value
						}),
						placeholder: "Lesson title",
						className: "rounded-xl h-10"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: draft.content,
						onChange: (e) => setDraft({
							...draft,
							content: e.target.value
						}),
						rows: 3,
						placeholder: "Lesson content…",
						className: "rounded-2xl"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
							onUploaded: (url) => setDraft({
								...draft,
								videoUrl: url
							}),
							accept: "video/*,image/*",
							label: "Upload video"
						}), draft.videoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-accent",
							children: "media ✓"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => add.mutate(),
						disabled: !draft.title || add.isPending,
						size: "sm",
						className: "rounded-full gradient-primary text-primary-foreground",
						children: add.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1" }), " Add lesson"] })
					})
				]
			})
		]
	});
}
function QuizBuilder({ courseId }) {
	const [title, setTitle] = (0, import_react.useState)("Course quiz");
	const [passingScore, setPassingScore] = (0, import_react.useState)("70");
	const [questions, setQuestions] = (0, import_react.useState)([]);
	const [q, setQ] = (0, import_react.useState)({
		questionText: "",
		options: [
			"",
			"",
			"",
			""
		],
		correct: 0
	});
	const create = useMutation({
		mutationFn: () => coursesApi.createQuiz(courseId, {
			title,
			passingScore: Number(passingScore) || 70,
			questions
		}),
		onSuccess: () => {
			setQuestions([]);
			toast.success("Quiz created");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	const addQuestion = () => {
		if (!q.questionText.trim() || q.options.some((o) => !o.trim())) {
			toast.error("Fill the question and all 4 options");
			return;
		}
		setQuestions((prev) => [...prev, {
			questionText: q.questionText,
			options: q.options,
			correctOptionIndex: q.correct
		}]);
		setQ({
			questionText: "",
			options: [
				"",
				"",
				"",
				""
			],
			correct: 0
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "rounded-3xl border-border bg-card p-6 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold",
				children: "Quiz"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: title,
					onChange: (e) => setTitle(e.target.value),
					placeholder: "Quiz title",
					className: "rounded-xl h-10"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					value: passingScore,
					onChange: (e) => setPassingScore(e.target.value),
					placeholder: "Passing %",
					className: "rounded-xl h-10"
				})]
			}),
			questions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1 text-sm",
				children: questions.map((qq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-muted-foreground",
					children: [
						i + 1,
						". ",
						qq.questionText
					]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-dashed border-border p-4 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q.questionText,
						onChange: (e) => setQ({
							...q,
							questionText: e.target.value
						}),
						placeholder: "Question",
						className: "rounded-xl h-10"
					}),
					q.options.map((opt, oi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name: "correct",
							checked: q.correct === oi,
							onChange: () => setQ({
								...q,
								correct: oi
							}),
							title: "Mark correct"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: opt,
							onChange: (e) => setQ({
								...q,
								options: q.options.map((o, k) => k === oi ? e.target.value : o)
							}),
							placeholder: `Option ${oi + 1}`,
							className: "rounded-xl h-9"
						})]
					}, oi)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: addQuestion,
						size: "sm",
						variant: "outline",
						className: "rounded-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1" }), " Add question"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => create.mutate(),
				disabled: questions.length === 0 || create.isPending,
				className: "rounded-full gradient-primary text-primary-foreground",
				children: create.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : `Create quiz (${questions.length})`
			})
		]
	});
}
function AtRiskPanel({ courseId }) {
	const query = useQuery({
		queryKey: ["at-risk", courseId],
		queryFn: () => coursesApi.atRisk(courseId)
	});
	if (query.isLoading || !query.data) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "rounded-3xl border-border bg-card p-6 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold",
					children: "Learners at risk of dropping out"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					query.data.totalEnrolled,
					" enrolled · ",
					query.data.atRisk.length,
					" flagged by the dropout model."
				]
			}),
			query.data.atRisk.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No learners are currently at risk. 🎉"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: query.data.atRisk.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-2xl border border-border p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-medium",
						children: a.learner.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground",
							children: [a.progress, "% done"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							className: "rounded-full bg-destructive/15 text-destructive text-xs",
							children: [Math.round(a.riskScore * 100), "% risk"]
						})]
					})]
				}, a.enrollmentId))
			})
		]
	});
}
function AdminCourseReviewPage() {
	const qc = useQueryClient();
	const query = useQuery({
		queryKey: ["pending-courses"],
		queryFn: coursesApi.pending
	});
	const [reasons, setReasons] = (0, import_react.useState)({});
	const review = useMutation({
		mutationFn: (vars) => coursesApi.review(vars.id, {
			approve: vars.approve,
			rejectionReason: vars.rejectionReason
		}),
		onSuccess: (_data, vars) => {
			qc.invalidateQueries({ queryKey: ["pending-courses"] });
			toast.success(vars.approve ? "Course approved" : "Course rejected");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-6 w-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl font-bold tracking-tight",
				children: "Course Review Queue"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: "Approve or reject submitted courses."
			})] })]
		}), query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 4 }) : !query.data || query.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Check,
			title: "All caught up",
			description: "No courses are waiting for review."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: query.data.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-3xl border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "rounded-full text-xs",
								children: c.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-semibold",
								children: c.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground line-clamp-2",
								children: c.description || "No description."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [
									c.level,
									" · ",
									c.language,
									" · ",
									c.price ? `₹${c.price}` : "Free"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: "rounded-full bg-warning/15 text-warning text-xs",
						children: "PENDING"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col sm:flex-row gap-2 sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: reasons[c.id] ?? "",
						onChange: (e) => setReasons((prev) => ({
							...prev,
							[c.id]: e.target.value
						})),
						placeholder: "Rejection reason (optional)",
						className: "rounded-full h-10 flex-1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => review.mutate({
								id: c.id,
								approve: true
							}),
							disabled: review.isPending,
							className: "rounded-full gradient-primary text-primary-foreground",
							children: review.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 mr-1" }), " Approve"] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => review.mutate({
								id: c.id,
								approve: false,
								rejectionReason: reasons[c.id]
							}),
							disabled: review.isPending,
							className: "rounded-full text-destructive hover:text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4 mr-1" }), " Reject"]
						})]
					})]
				})]
			}, c.id))
		})]
	});
}
function EarnPage() {
	const { t } = useTranslation();
	const authed = useAuthStore((s) => s.status === "authenticated");
	const [q, setQ] = (0, import_react.useState)("");
	const [remoteOnly, setRemoteOnly] = (0, import_react.useState)(false);
	const [type, setType] = (0, import_react.useState)(null);
	const query = useQuery({
		queryKey: [
			"jobs",
			q,
			remoteOnly,
			type
		],
		queryFn: () => jobsApi.list({
			q,
			remote: remoteOnly || void 0,
			type: type ?? void 0
		})
	});
	const savedQuery = useQuery({
		queryKey: ["saved-jobs"],
		queryFn: jobsApi.saved,
		enabled: authed
	});
	const savedIds = new Set((savedQuery.data ?? []).map((j) => j.id));
	const jobs = query.data?.items ?? [];
	const filtered = jobs.filter((j) => {
		if (remoteOnly && !j.remote) return false;
		if (type && j.type !== type) return false;
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl sm:text-4xl font-bold tracking-tight",
					children: t("earn.title")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted-foreground",
					children: t("earn.subtitle")
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "rounded-full shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/app/earn/mine",
						children: "My Jobs"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-3xl border-border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: t("earn.search"),
						className: "pl-11 h-12 rounded-full bg-background"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							checked: remoteOnly,
							onCheckedChange: (v) => setRemoteOnly(!!v)
						}), t("earn.remote")]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							"full-time",
							"part-time",
							"contract",
							"gig",
							"internship"
						].map((tp) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setType(type === tp ? null : tp),
							className: `px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${type === tp ? "gradient-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground hover:text-foreground"}`,
							children: tp
						}, tp))
					})]
				})]
			}),
			query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 6 }) : query.isError && !jobs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => query.refetch() }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Briefcase,
				title: t("earn.empty")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: filtered.map((j, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: i % 6 * .04 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobCard, {
						job: j,
						isSaved: savedIds.has(j.id)
					})
				}, j.id))
			})
		]
	});
}
function JobCard({ job, isSaved = false }) {
	const { t } = useTranslation();
	const qc = useQueryClient();
	const [saved, setSaved] = (0, import_react.useState)(isSaved);
	(0, import_react.useEffect)(() => setSaved(isSaved), [isSaved]);
	const toggleSave = useMutation({
		mutationFn: () => saved ? jobsApi.unsave(job.id) : jobsApi.save(job.id),
		onMutate: () => setSaved((s) => !s),
		onSuccess: () => void qc.invalidateQueries({ queryKey: ["saved-jobs"] }),
		onError: (e) => {
			setSaved((s) => !s);
			toast.error(unwrapError(e).message);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "group rounded-3xl border-border bg-card p-5 hover-lift h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
				className: "h-12 w-12 shrink-0 rounded-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
					className: "rounded-2xl gradient-primary text-primary-foreground text-xs font-bold",
					children: job.company.name.slice(0, 2).toUpperCase()
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/app/earn/${job.id}`,
								className: "font-semibold hover:text-primary transition-colors line-clamp-1",
								children: job.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground truncate",
								children: job.company.name
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "Save",
							onClick: () => toggleSave.mutate(),
							className: "rounded-full p-2 hover:bg-muted transition-colors",
							children: saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "h-4 w-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "h-4 w-4 text-muted-foreground" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "rounded-full gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
									" ",
									job.location
								]
							}),
							job.remote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "rounded-full bg-accent/15 text-accent",
								children: "Remote"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "rounded-full",
								children: job.type
							})
						]
					}),
					job.salary_min && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 text-sm font-semibold",
						children: [
							"₹",
							job.salary_min.toLocaleString(),
							" — ₹",
							job.salary_max?.toLocaleString(),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-normal text-muted-foreground",
								children: "/mo"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted-foreground flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }), " Posted today"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							className: "rounded-full gradient-primary text-primary-foreground shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: `/app/earn/${job.id}`,
								children: t("earn.apply")
							})
						})]
					})
				]
			})]
		})
	});
}
function JobDetailPage() {
	const { id } = useParams();
	const { t } = useTranslation();
	const qc = useQueryClient();
	const authed = useAuthStore((s) => s.status === "authenticated");
	const [applied, setApplied] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const query = useQuery({
		queryKey: ["job", id],
		queryFn: () => jobsApi.get(id),
		enabled: !!id
	});
	const matchQuery = useQuery({
		queryKey: ["job-match", id],
		queryFn: () => jobsApi.match(id),
		enabled: !!id && authed
	});
	const savedQuery = useQuery({
		queryKey: ["saved-jobs"],
		queryFn: jobsApi.saved,
		enabled: authed
	});
	(0, import_react.useEffect)(() => {
		if (savedQuery.data && id) setSaved(savedQuery.data.some((j) => j.id === id));
	}, [savedQuery.data, id]);
	const mutation = useMutation({
		mutationFn: (note) => jobsApi.apply(id, { note }),
		onSuccess: () => {
			setApplied(true);
			toast.success("Application submitted 🎉");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	const saveMutation = useMutation({
		mutationFn: () => saved ? jobsApi.unsave(id) : jobsApi.save(id),
		onMutate: () => setSaved((s) => !s),
		onSuccess: () => void qc.invalidateQueries({ queryKey: ["saved-jobs"] }),
		onError: (e) => {
			setSaved((s) => !s);
			toast.error(unwrapError(e).message);
		}
	});
	if (query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageMotion, {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 4 })
	});
	if (query.isError || !query.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageMotion, {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => query.refetch() })
	});
	const job = query.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/app/earn",
			className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }),
				" ",
				t("common.back")
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-[1fr_360px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							className: "h-16 w-16 rounded-3xl mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
								className: "rounded-3xl gradient-primary text-primary-foreground font-bold",
								children: job.company.name.slice(0, 2).toUpperCase()
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl sm:text-4xl font-bold tracking-tight",
							children: job.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" }),
										" ",
										job.company.name
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
										" ",
										job.location
									]
								}),
								job.remote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "rounded-full bg-accent/15 text-accent",
									children: "Remote"
								})
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rounded-3xl border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: t("earn.about_role")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-line",
							children: job.description || "No description provided for this role."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rounded-3xl border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: t("earn.responsibilities")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2 text-sm text-muted-foreground",
							children: [
								"Design flows and wireframes for new product areas",
								"Collaborate with mentors weekly",
								"Contribute to our design system",
								"Present ideas to a supportive team"
							].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-accent shrink-0 mt-0.5" }),
									" ",
									r
								]
							}, r))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rounded-3xl border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: t("earn.requirements")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2 text-sm text-muted-foreground",
							children: [
								"0–2 years of experience",
								"Familiar with Figma or similar",
								"Curious, kind and collaborative"
							].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-accent shrink-0 mt-0.5" }),
									" ",
									r
								]
							}, r))
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-3xl border-border bg-card p-6 sticky top-24",
				children: [
					job.salary_min && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: t("earn.salary")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-2xl font-bold",
						children: [
							"₹",
							job.salary_min.toLocaleString(),
							" — ₹",
							job.salary_max?.toLocaleString()
						]
					})] }),
					matchQuery.data && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-2xl border border-border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" }), " Your match"]
						}), matchQuery.data.hasSkills ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-2xl font-bold text-primary",
							children: [matchQuery.data.matchPercent, "%"]
						}), matchQuery.data.matchedSkills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: matchQuery.data.matchedSkills.slice(0, 6).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "rounded-full text-xs",
								children: s
							}, s))
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Add skills to your resume to see your match score."
						})]
					}),
					applied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-2xl bg-accent/10 text-accent p-4 text-sm flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), " Applied — we'll notify the employer."]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							const note = e.currentTarget.elements.namedItem("note")?.value ?? "";
							mutation.mutate(note);
						},
						className: "mt-6 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "note",
								className: "text-xs",
								children: "Short note (optional)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "note",
								name: "note",
								rows: 3,
								placeholder: "Tell them why you'd be great…",
								className: "rounded-2xl"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								disabled: mutation.isPending,
								className: "w-full rounded-full gradient-primary text-primary-foreground shadow hover:shadow-glow",
								children: [
									mutation.isPending ? "Applying…" : t("earn.apply"),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 ml-1" })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => saveMutation.mutate(),
						disabled: !authed,
						className: "mt-2 w-full rounded-full",
						children: [saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "h-4 w-4 mr-1 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "h-4 w-4 mr-1" }), saved ? "Saved" : t("earn.save")]
					})
				]
			}) })]
		})]
	});
}
var STATUS_TINT$1 = {
	PENDING: "bg-warning/15 text-warning",
	SHORTLISTED: "bg-primary/15 text-primary",
	HIRED: "bg-accent/15 text-accent",
	REJECTED: "bg-destructive/15 text-destructive"
};
function MyJobsPage() {
	const qc = useQueryClient();
	const applications = useQuery({
		queryKey: ["my-applications"],
		queryFn: jobsApi.myApplications
	});
	const saved = useQuery({
		queryKey: ["saved-jobs"],
		queryFn: jobsApi.saved
	});
	const interviews = useQuery({
		queryKey: ["my-interviews"],
		queryFn: jobsApi.myInterviews
	});
	const withdraw = useMutation({
		mutationFn: (id) => jobsApi.withdraw(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["my-applications"] });
			toast.success("Application withdrawn");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	const unsave = useMutation({
		mutationFn: (id) => jobsApi.unsave(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["saved-jobs"] });
			toast.success("Removed from saved");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl sm:text-4xl font-bold tracking-tight",
			children: "My Jobs"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Track your applications, saved jobs and interviews."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "applications",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "rounded-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "applications",
							className: "rounded-full",
							children: "Applications"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "saved",
							className: "rounded-full",
							children: "Saved"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "interviews",
							className: "rounded-full",
							children: "Interviews"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "applications",
					className: "mt-6",
					children: applications.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 4 }) : !applications.data || applications.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: Briefcase,
						title: "No applications yet",
						description: "Apply to jobs to track them here.",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "rounded-full gradient-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app/earn",
								children: "Browse jobs"
							})
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: applications.data.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "rounded-3xl border-border bg-card p-5 flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: `/app/earn/${a.job.id}`,
										className: "font-semibold hover:text-primary line-clamp-1",
										children: a.job.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [
											a.job.company.name,
											" · applied ",
											new Date(a.appliedAt).toLocaleDateString()
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: `rounded-full text-xs ${STATUS_TINT$1[a.status] ?? "bg-muted text-muted-foreground"}`,
									children: a.status
								}),
								a.status !== "HIRED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => withdraw.mutate(a.id),
									disabled: withdraw.isPending,
									className: "rounded-full text-destructive hover:text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5 mr-1" }), " Withdraw"]
								})
							]
						}, a.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "saved",
					className: "mt-6",
					children: saved.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 4 }) : !saved.data || saved.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: Bookmark,
						title: "No saved jobs",
						description: "Bookmark jobs to revisit them later."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: saved.data.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "rounded-3xl border-border bg-card p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: `/app/earn/${j.id}`,
									className: "font-semibold hover:text-primary line-clamp-1",
									children: j.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground",
									children: [
										j.company.name,
										" · ",
										j.location
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "sm",
										className: "rounded-full gradient-primary text-primary-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: `/app/earn/${j.id}`,
											children: "View"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => unsave.mutate(j.id),
										className: "rounded-full",
										children: "Remove"
									})]
								})
							]
						}, j.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "interviews",
					className: "mt-6",
					children: interviews.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 3 }) : !interviews.data || interviews.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						icon: CalendarClock,
						title: "No interviews scheduled",
						description: "Shortlisted applications will show interview details here."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: interviews.data.map((iv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "rounded-3xl border-border bg-card p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold",
										children: iv.job.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "rounded-full text-xs bg-primary/15 text-primary",
										children: iv.status
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "h-4 w-4" }),
												" ",
												new Date(iv.scheduledAt).toLocaleString()
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-4 w-4" }),
												" ",
												iv.mode
											]
										}),
										iv.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
												" ",
												iv.location
											]
										})
									]
								}),
								iv.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm",
									children: iv.notes
								})
							]
						}, iv.id))
					})
				})
			]
		})]
	});
}
function EmployerJobsPage() {
	const qc = useQueryClient();
	const query = useQuery({
		queryKey: ["my-postings"],
		queryFn: jobsApi.myPostings
	});
	const remove = useMutation({
		mutationFn: (id) => jobsApi.remove(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["my-postings"] });
			toast.success("Job deleted");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl font-bold tracking-tight",
				children: "My Postings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: "Manage your jobs and review applicants."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "rounded-full gradient-primary text-primary-foreground shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app/earn/post",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1" }), " Post a job"]
				})
			})]
		}), query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 4 }) : !query.data || query.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Briefcase,
			title: "No jobs posted",
			description: "Post your first job to start hiring.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "rounded-full gradient-primary text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/earn/post",
					children: "Post a job"
				})
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: query.data.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-3xl border-border bg-card p-5 flex flex-wrap items-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold line-clamp-1",
							children: j.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								j.category,
								" · ",
								j.location || "—",
								" · ",
								j.type
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "secondary",
						className: "rounded-full gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }),
							" ",
							j.applicationCount,
							" applicants"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "rounded-full gradient-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: `/app/earn/${j.id}/applicants`,
									children: "Applicants"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "outline",
								className: "rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: `/app/earn/${j.id}/edit`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => remove.mutate(j.id),
								disabled: remove.isPending,
								className: "rounded-full text-destructive hover:text-destructive",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							})
						]
					})
				]
			}, j.id))
		})]
	});
}
var JOB_TYPES = [
	{
		v: "FULL_TIME",
		l: "Full-time"
	},
	{
		v: "PART_TIME",
		l: "Part-time"
	},
	{
		v: "CONTRACT",
		l: "Contract"
	},
	{
		v: "GIG",
		l: "Gig"
	}
];
var TYPE_FROM_UI = {
	"full-time": "FULL_TIME",
	"part-time": "PART_TIME",
	contract: "CONTRACT",
	gig: "GIG"
};
var CATEGORIES = [
	"Design",
	"Marketing",
	"Finance",
	"Support",
	"Sales",
	"Tailoring",
	"Cooking",
	"Teaching"
];
function JobEditorPage() {
	const { id } = useParams();
	const isEdit = !!id;
	const navigate = useNavigate();
	const qc = useQueryClient();
	const jobQuery = useQuery({
		queryKey: ["job", id],
		queryFn: () => jobsApi.get(id),
		enabled: isEdit
	});
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		description: "",
		category: "Design",
		location: "",
		jobType: "FULL_TIME",
		salaryMin: "",
		salaryMax: ""
	});
	(0, import_react.useEffect)(() => {
		if (jobQuery.data) {
			const j = jobQuery.data;
			setForm({
				title: j.title,
				description: j.description ?? "",
				category: j.category ?? "Design",
				location: j.location ?? "",
				jobType: TYPE_FROM_UI[j.type] ?? "FULL_TIME",
				salaryMin: j.salary_min ? String(j.salary_min) : "",
				salaryMax: j.salary_max ? String(j.salary_max) : ""
			});
		}
	}, [jobQuery.data]);
	const save = useMutation({
		mutationFn: () => {
			const payload = {
				title: form.title,
				description: form.description,
				category: form.category,
				location: form.location || void 0,
				jobType: form.jobType,
				...form.salaryMin && { salaryMin: Number(form.salaryMin) },
				...form.salaryMax && { salaryMax: Number(form.salaryMax) }
			};
			return isEdit ? jobsApi.update(id, payload) : jobsApi.create(payload);
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["my-postings"] });
			toast.success(isEdit ? "Job updated" : "Job posted");
			navigate("/app/earn/manage");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8 max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/earn/manage",
				className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " My postings"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl font-bold tracking-tight",
				children: isEdit ? "Edit job" : "Post a job"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: "Only verified employers can post jobs."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-3xl border-border bg-card p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.title,
						onChange: (e) => setForm({
							...form,
							title: e.target.value
						}),
						className: "mt-1.5 rounded-xl h-11"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 flex flex-wrap gap-2",
						children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setForm({
								...form,
								category: c
							}),
							className: `px-3.5 py-1.5 rounded-full text-xs font-medium ${form.category === c ? "gradient-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground"}`,
							children: c
						}, c))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 flex flex-wrap gap-2",
							children: JOB_TYPES.map((jt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setForm({
									...form,
									jobType: jt.v
								}),
								className: `px-3 py-1.5 rounded-full text-xs font-medium ${form.jobType === jt.v ? "gradient-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground"}`,
								children: jt.l
							}, jt.v))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Location" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.location,
							onChange: (e) => setForm({
								...form,
								location: e.target.value
							}),
							placeholder: "City or Remote",
							className: "mt-1.5 rounded-xl h-11"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: form.description,
						onChange: (e) => setForm({
							...form,
							description: e.target.value
						}),
						rows: 5,
						className: "mt-1.5 rounded-2xl"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Salary min (₹/mo)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: form.salaryMin,
							onChange: (e) => setForm({
								...form,
								salaryMin: e.target.value
							}),
							className: "mt-1.5 rounded-xl h-11"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Salary max (₹/mo)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: form.salaryMax,
							onChange: (e) => setForm({
								...form,
								salaryMax: e.target.value
							}),
							className: "mt-1.5 rounded-xl h-11"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => save.mutate(),
						disabled: save.isPending || !form.title || !form.description,
						className: "rounded-full gradient-primary text-primary-foreground",
						children: save.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : isEdit ? "Save changes" : "Post job"
					})
				]
			})
		]
	});
}
var STATUS_TINT = {
	PENDING: "bg-warning/15 text-warning",
	SHORTLISTED: "bg-primary/15 text-primary",
	HIRED: "bg-accent/15 text-accent",
	REJECTED: "bg-destructive/15 text-destructive"
};
function JobApplicantsPage() {
	const { id: jobId } = useParams();
	const query = useQuery({
		queryKey: ["applicants", jobId],
		queryFn: () => jobsApi.applicants(jobId),
		enabled: !!jobId
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/earn/manage",
				className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " My postings"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl font-bold tracking-tight",
				children: "Applicants"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: "Review candidates, schedule interviews and make decisions."
			})] }),
			query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 4 }) : !query.data || query.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: UserCheck,
				title: "No applicants yet",
				description: "Applications will appear here as candidates apply."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: query.data.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplicantRow, {
					jobId,
					applicant: a
				}, a.id))
			})
		]
	});
}
function ApplicantRow({ jobId, applicant }) {
	const qc = useQueryClient();
	const [showInterview, setShowInterview] = (0, import_react.useState)(false);
	const [showResume, setShowResume] = (0, import_react.useState)(false);
	const [showReview, setShowReview] = (0, import_react.useState)(false);
	const [interview, setInterview] = (0, import_react.useState)({
		scheduledAt: "",
		mode: "ONLINE",
		location: ""
	});
	const [review, setReview] = (0, import_react.useState)({
		rating: 5,
		comment: ""
	});
	const invalidate = () => qc.invalidateQueries({ queryKey: ["applicants", jobId] });
	const status = useMutation({
		mutationFn: (s) => jobsApi.setApplicationStatus(applicant.id, s),
		onSuccess: () => {
			invalidate();
			toast.success("Status updated");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	const schedule = useMutation({
		mutationFn: () => jobsApi.scheduleInterview(applicant.id, {
			scheduledAt: new Date(interview.scheduledAt).toISOString(),
			mode: interview.mode,
			location: interview.location || void 0
		}),
		onSuccess: () => {
			invalidate();
			setShowInterview(false);
			toast.success("Interview scheduled");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	const submitReview = useMutation({
		mutationFn: () => jobsApi.addReview(jobId, {
			revieweeId: applicant.user.id,
			rating: review.rating,
			comment: review.comment || void 0
		}),
		onSuccess: () => {
			setShowReview(false);
			toast.success("Review submitted");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	const resumeQuery = useQuery({
		queryKey: ["resume", applicant.user.id],
		queryFn: () => resumeApi.byUser(applicant.user.id),
		enabled: showResume
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "rounded-3xl border-border bg-card p-5 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold",
						children: applicant.user.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [
							applicant.user.location || "—",
							" · applied ",
							new Date(applicant.appliedAt).toLocaleDateString()
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					className: `rounded-full text-xs ${STATUS_TINT[applicant.status] ?? "bg-muted text-muted-foreground"}`,
					children: applicant.status
				})]
			}),
			applicant.coverNote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					"“",
					applicant.coverNote,
					"”"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => status.mutate("SHORTLISTED"),
						disabled: status.isPending,
						className: "rounded-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 mr-1" }), " Shortlist"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => status.mutate("HIRED"),
						disabled: status.isPending,
						className: "rounded-full gradient-primary text-primary-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-3.5 w-3.5 mr-1" }), " Hire"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => status.mutate("REJECTED"),
						disabled: status.isPending,
						className: "rounded-full text-destructive hover:text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5 mr-1" }), " Reject"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => setShowInterview((s) => !s),
						className: "rounded-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPlus, { className: "h-3.5 w-3.5 mr-1" }), " Interview"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => setShowResume((s) => !s),
						className: "rounded-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-3.5 w-3.5 mr-1" }), " Resume"]
					}),
					applicant.status === "HIRED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => setShowReview((s) => !s),
						className: "rounded-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 mr-1" }), " Review"]
					})
				]
			}),
			showInterview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border p-4 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "datetime-local",
						value: interview.scheduledAt,
						onChange: (e) => setInterview({
							...interview,
							scheduledAt: e.target.value
						}),
						className: "rounded-xl h-10"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: interview.mode,
						onChange: (e) => setInterview({
							...interview,
							mode: e.target.value
						}),
						className: "rounded-xl h-10 border border-border bg-background px-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ONLINE",
								children: "Online"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "IN_PERSON",
								children: "In person"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "PHONE",
								children: "Phone"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: interview.location,
						onChange: (e) => setInterview({
							...interview,
							location: e.target.value
						}),
						placeholder: "Link / address",
						className: "rounded-xl h-10"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => schedule.mutate(),
						disabled: !interview.scheduledAt || schedule.isPending,
						className: "rounded-full gradient-primary text-primary-foreground",
						children: schedule.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Schedule"
					})
				]
			}),
			showResume && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border border-border p-4 text-sm",
				children: resumeQuery.isLoading ? "Loading resume…" : !resumeQuery.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: "This candidate hasn't created a resume yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [resumeQuery.data.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: resumeQuery.data.bio
					}), resumeQuery.data.skills && resumeQuery.data.skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5",
						children: resumeQuery.data.skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "rounded-full text-xs",
							children: s
						}, s))
					})]
				})
			}),
			showReview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border p-4 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1",
						children: [
							1,
							2,
							3,
							4,
							5
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setReview({
								...review,
								rating: n
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-5 w-5 ${n <= review.rating ? "fill-warning text-warning" : "text-muted-foreground"}` })
						}, n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: review.comment,
						onChange: (e) => setReview({
							...review,
							comment: e.target.value
						}),
						rows: 2,
						placeholder: "How was working with this candidate?",
						className: "rounded-2xl"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => submitReview.mutate(),
						disabled: submitReview.isPending,
						className: "rounded-full gradient-primary text-primary-foreground",
						children: submitReview.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Submit review"
					})
				]
			})
		]
	});
}
async function payForOrder(orderId, opts) {
	await openRazorpayCheckout({
		order: await ordersApi.createPayment(orderId),
		description: opts.description ?? "Marketplace order",
		prefill: opts.prefill,
		onSuccess: async (r) => {
			await ordersApi.verifyPayment(orderId, {
				razorpayOrderId: r.razorpay_order_id,
				razorpayPaymentId: r.razorpay_payment_id,
				razorpaySignature: r.razorpay_signature
			});
			opts.onSuccess?.();
		},
		onDismiss: opts.onDismiss
	});
}
/**
* Marketplace product reviews (Phase 4). Lists verified-purchase reviews with the
* average rating and, for buyers who have purchased the product, a submission form.
* Mirrors the Learn CourseReviews component so the two modules stay consistent.
*/
function ProductReviews({ productId }) {
	const qc = useQueryClient();
	const query = useQuery({
		queryKey: ["product-reviews", productId],
		queryFn: () => productsApi.reviews(productId)
	});
	const [rating, setRating] = (0, import_react.useState)(5);
	const [comment, setComment] = (0, import_react.useState)("");
	const mutation = useMutation({
		mutationFn: () => productsApi.addReview(productId, {
			rating,
			comment: comment.trim() || void 0
		}),
		onSuccess: () => {
			setComment("");
			qc.invalidateQueries({ queryKey: ["product-reviews", productId] });
			toast.success("Review submitted");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	const data = query.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-semibold",
					children: "Reviews"
				}), data?.avgRating != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-warning text-warning" }),
						" ",
						data.avgRating.toFixed(1),
						" (",
						data.totalReviews,
						")"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card p-5 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-medium",
						children: "Leave a review"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Only buyers who have purchased this product can review it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1",
						children: [
							1,
							2,
							3,
							4,
							5
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `${n} stars`,
							onClick: () => setRating(n),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-5 w-5 ${n <= rating ? "fill-warning text-warning" : "text-muted-foreground"}` })
						}, n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: comment,
						onChange: (e) => setComment(e.target.value),
						rows: 3,
						placeholder: "Share what you thought…",
						className: "rounded-2xl"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => mutation.mutate(),
						disabled: mutation.isPending,
						className: "rounded-full gradient-primary text-primary-foreground",
						children: mutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Submit review"
					})
				]
			}),
			query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineSkeleton, { lines: 4 }) : !data || data.reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No reviews yet",
				description: "Be the first to review this product."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: data.reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-1",
								children: Array.from({ length: 5 }).map((_, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-3.5 w-3.5 ${j < r.rating ? "fill-warning text-warning" : "text-muted-foreground"}` }, j))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: new Date(r.createdAt).toLocaleDateString()
							})]
						}),
						r.comment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: r.comment
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 text-xs text-muted-foreground",
							children: ["— ", r.user?.name ?? "Buyer"]
						})
					]
				}, r.id))
			})
		]
	});
}
var cats = [
	"all",
	"Textiles",
	"Jewellery",
	"Home",
	"Beauty",
	"Food",
	"Art"
];
function MarketplacePage() {
	const { t } = useTranslation();
	const user = useAuthStore((s) => s.user);
	const authed = useAuthStore((s) => s.status === "authenticated");
	const isSeller = user?.role === "seller" || user?.role === "all";
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("all");
	const query = useQuery({
		queryKey: [
			"products",
			q,
			cat
		],
		queryFn: () => productsApi.list({
			q,
			category: cat === "all" ? void 0 : cat
		})
	});
	const recQuery = useQuery({
		queryKey: ["product-recommendations"],
		queryFn: productsApi.recommended,
		enabled: authed
	});
	const showRecommendations = authed && !q && cat === "all" && (recQuery.data?.length ?? 0) > 0;
	const filtered = (query.data?.items ?? []).filter((p) => cat !== "all" && p.category !== cat ? false : true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl sm:text-4xl font-bold tracking-tight",
						children: t("flourish.title")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted-foreground",
						children: t("flourish.subtitle")
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex shrink-0 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/app/orders",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4 mr-1" }), " My Orders"]
						})
					}), isSeller && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "rounded-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/app/flourish/mine",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-4 w-4 mr-1" }), " My Shop"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "rounded-full gradient-primary text-primary-foreground shadow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/app/flourish/upload",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4 mr-1" }),
								" ",
								t("flourish.upload")
							]
						})
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: t("flourish.search"),
					className: "pl-11 h-12 rounded-full bg-card"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setCat(c),
					className: `px-4 py-1.5 rounded-full text-sm font-medium transition-all ${cat === c ? "gradient-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:text-foreground"}`,
					children: c === "all" ? "All" : c
				}, c))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "relative overflow-hidden rounded-3xl border-border bg-card p-8 sm:p-12 gradient-aurora text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_80%_50%,white,transparent_50%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-widest opacity-90",
							children: t("flourish.featured")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-2xl sm:text-4xl font-bold",
							children: "Support women artisans this season."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm opacity-90",
							children: "Free shipping on orders above ₹999."
						})
					]
				})]
			}),
			showRecommendations && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Recommended for you"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: (recQuery.data ?? []).slice(0, 4).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
				})]
			}),
			query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 8 }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: ShoppingBag,
				title: "No products found"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
				children: filtered.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: i % 8 * .04 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p })
				}, p.id))
			})
		]
	});
}
function ProductCard({ product }) {
	const add = useCartStore((s) => s.add);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "group overflow-hidden rounded-3xl border-border bg-card hover-lift h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: `/app/flourish/${product.id}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-square gradient-aurora overflow-hidden",
				children: [product.images?.[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.images[0],
					alt: product.name,
					className: "absolute inset-0 h-full w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": "Wishlist",
					onClick: (e) => {
						e.preventDefault();
						toast.success("Saved to wishlist ♥");
					},
					className: "absolute top-3 right-3 rounded-full p-2 bg-card/60 backdrop-blur hover:bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4" })
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: `/app/flourish/${product.id}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold line-clamp-1",
						children: product.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground line-clamp-1",
						children: product.seller.name
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-bold",
						children: ["₹", product.price]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-warning text-warning" }),
							" ",
							product.rating?.toFixed(1)
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: () => {
						add(product);
						toast.success("Added to cart");
					},
					className: "mt-3 w-full rounded-full gradient-primary text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-3.5 w-3.5 mr-1" }), " Add"]
				})
			]
		})]
	});
}
function ProductDetailPage() {
	const { id } = useParams();
	const { t } = useTranslation();
	const add = useCartStore((s) => s.add);
	const navigate = useNavigate();
	const query = useQuery({
		queryKey: ["product", id],
		queryFn: () => productsApi.get(id),
		enabled: !!id
	});
	if (query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageMotion, {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 6 })
	});
	if (query.isError || !query.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageMotion, {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => query.refetch() })
	});
	const product = query.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/flourish",
				className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }),
					" ",
					t("common.back")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-square rounded-3xl overflow-hidden gradient-aurora",
						children: product.images?.[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: product.images[0],
							alt: product.name,
							className: "h-full w-full object-cover"
						})
					}), product.images && product.images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 gap-3",
						children: product.images.slice(0, 4).map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-square rounded-2xl overflow-hidden gradient-aurora",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src,
								alt: `${product.name} ${i + 1}`,
								className: "h-full w-full object-cover"
							})
						}, i))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "rounded-full",
						children: product.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-3xl sm:text-4xl font-bold tracking-tight",
						children: product.name
					}),
					product.rating != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-warning text-warning" }),
								" ",
								product.rating.toFixed(1)
							]
						}), product.reviews_count != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								"(",
								product.reviews_count,
								" reviews)"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 text-4xl font-bold",
						children: ["₹", product.price]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground leading-relaxed",
						children: product.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "lg",
							onClick: () => {
								add(product);
								toast.success("Added to cart");
							},
							className: "rounded-full gradient-primary text-primary-foreground shadow-md hover:shadow-glow",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4 mr-1" }),
								" ",
								t("flourish.add_to_cart")
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							variant: "outline",
							onClick: () => {
								add(product);
								navigate("/app/checkout");
							},
							className: "rounded-full",
							children: t("flourish.buy_now")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex items-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4" }), " Ships in 2–3 days · Free above ₹999"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "mt-8 rounded-3xl border-border bg-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-widest text-muted-foreground",
							children: t("flourish.seller")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
									className: "h-12 w-12",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
										className: "gradient-primary text-primary-foreground text-xs font-bold",
										children: product.seller.name.slice(0, 2).toUpperCase()
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold",
									children: product.seller.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
										" ",
										product.seller.location
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									className: "ml-auto rounded-full",
									children: "Visit shop"
								})
							]
						})]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductReviews, { productId: product.id })
			})
		]
	});
}
function CartPage() {
	const { t } = useTranslation();
	const items = useCartStore((s) => s.items);
	const setQty = useCartStore((s) => s.setQty);
	const remove = useCartStore((s) => s.remove);
	const total = useCartStore((s) => s.total());
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageMotion, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: ShoppingBag,
		title: t("flourish.cart_empty"),
		description: t("flourish.cart_empty_sub"),
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "rounded-full gradient-primary text-primary-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/app/flourish",
				children: "Explore marketplace"
			})
		})
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl sm:text-4xl font-bold tracking-tight",
			children: t("flourish.cart_title")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-[1fr_360px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "rounded-3xl border-border bg-card p-4 flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-20 w-20 shrink-0 rounded-2xl gradient-aurora" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold truncate",
									children: it.product.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: it.product.seller.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											"aria-label": "Decrease",
											onClick: () => setQty(it.product.id, it.qty - 1),
											className: "grid h-7 w-7 place-items-center rounded-full border border-border hover:bg-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-8 text-center text-sm font-medium",
											children: it.qty
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											"aria-label": "Increase",
											onClick: () => setQty(it.product.id, it.qty + 1),
											className: "grid h-7 w-7 place-items-center rounded-full border border-border hover:bg-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-bold",
								children: ["₹", it.product.price * it.qty]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								"aria-label": "Remove",
								onClick: () => remove(it.product.id),
								className: "mt-2 text-xs text-muted-foreground hover:text-destructive inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" }), " Remove"]
							})]
						})
					]
				}, it.product.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-3xl border-border bg-card p-6 h-fit sticky top-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Order summary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: t("flourish.subtotal"),
								value: `₹${total}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: t("flourish.shipping"),
								value: total > 999 ? "Free" : "₹49"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 h-px bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: t("flourish.total"),
								value: `₹${total > 999 ? total : total + 49}`,
								bold: true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-6 w-full rounded-full gradient-primary text-primary-foreground shadow hover:shadow-glow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/app/checkout",
							children: [
								t("flourish.checkout"),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 ml-1" })
							]
						})
					})
				]
			})]
		})]
	});
}
function Row({ label, value, bold }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: bold ? "font-semibold" : "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: bold ? "text-lg font-bold" : "",
			children: value
		})]
	});
}
function CheckoutPage() {
	const items = useCartStore((s) => s.items);
	const total = useCartStore((s) => s.total());
	const clear = useCartStore((s) => s.clear);
	const user = useAuthStore((s) => s.user);
	const [placing, setPlacing] = (0, import_react.useState)(false);
	const [done, setDone] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const placeOrder = async (e) => {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const shippingAddress = [
			fd.get("address"),
			fd.get("city"),
			fd.get("state"),
			fd.get("pin")
		].map((v) => v ? String(v).trim() : "").filter(Boolean).join(", ");
		const buyerName = String(fd.get("fullName") ?? "").trim() || user?.name;
		const buyerPhone = String(fd.get("phone") ?? "").trim() || user?.phone;
		const buyerEmail = String(fd.get("email") ?? "").trim() || user?.email;
		setPlacing(true);
		try {
			const order = await ordersApi.create({
				items: items.map((i) => ({
					product_id: i.product.id,
					qty: i.qty
				})),
				shippingAddress
			});
			clear();
			await payForOrder(order.id, {
				description: "Marketplace order",
				prefill: {
					name: buyerName,
					contact: buyerPhone,
					email: buyerEmail
				},
				onSuccess: () => {
					setDone(true);
					toast.success("Payment successful 🎉");
				},
				onDismiss: () => {
					toast.message("Order placed — payment pending. Complete it from Orders.");
					navigate("/app/orders");
				}
			});
		} catch (err) {
			toast.error(unwrapError(err).message);
		} finally {
			setPlacing(false);
		}
	};
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "max-w-lg mx-auto text-center py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-accent/15 text-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-8 w-8" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 text-3xl font-bold",
				children: "Order placed 🎉"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "You'll receive updates on your notifications tab."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => navigate("/app/orders"),
					className: "rounded-full gradient-primary text-primary-foreground",
					children: "View orders"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => navigate("/app/flourish"),
					className: "rounded-full",
					children: "Keep shopping"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl sm:text-4xl font-bold tracking-tight",
			children: "Checkout"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: placeOrder,
			className: "grid gap-8 lg:grid-cols-[1fr_360px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-3xl border-border bg-card p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Full name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						name: "fullName",
						defaultValue: user?.name,
						required: true,
						className: "mt-1.5 rounded-xl h-11"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "phone",
							defaultValue: user?.phone,
							required: true,
							className: "mt-1.5 rounded-xl h-11"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "email",
							defaultValue: user?.email,
							required: true,
							type: "email",
							className: "mt-1.5 rounded-xl h-11"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						name: "address",
						required: true,
						rows: 3,
						className: "mt-1.5 rounded-2xl"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "City" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "city",
								required: true,
								className: "mt-1.5 rounded-xl h-11"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "State" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "state",
								required: true,
								className: "mt-1.5 rounded-xl h-11"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "PIN" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "pin",
								required: true,
								className: "mt-1.5 rounded-xl h-11"
							})] })
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-3xl border-border bg-card p-6 h-fit sticky top-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Summary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-2 text-sm",
						children: [
							items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "truncate mr-2",
									children: [
										it.product.name,
										" × ",
										it.qty
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", it.product.price * it.qty] })]
							}, it.product.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 h-px bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "Total",
								value: `₹${total > 999 ? total : total + 49}`,
								bold: true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: placing,
						type: "submit",
						className: "mt-6 w-full rounded-full gradient-primary text-primary-foreground shadow hover:shadow-glow",
						children: placing ? "Placing…" : "Place order"
					})
				]
			})]
		})]
	});
}
function UploadProductPage() {
	const { id } = useParams();
	const isEdit = !!id;
	const { i18n } = useTranslation();
	const [name, setName] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("Textiles");
	const [description, setDescription] = (0, import_react.useState)("");
	const [price, setPrice] = (0, import_react.useState)("");
	const [stock, setStock] = (0, import_react.useState)("");
	const [imageUrl, setImageUrl] = (0, import_react.useState)("");
	const [materialCost, setMaterialCost] = (0, import_react.useState)("");
	const [hours, setHours] = (0, import_react.useState)("");
	const [genLoading, setGenLoading] = (0, import_react.useState)(false);
	const [pricingLoading, setPricingLoading] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const existing = useQuery({
		queryKey: ["product", id],
		queryFn: () => productsApi.get(id),
		enabled: isEdit
	});
	(0, import_react.useEffect)(() => {
		const p = existing.data;
		if (!p) return;
		setName(p.name);
		setCategory(p.category);
		setDescription(p.description);
		setPrice(String(p.price));
		setStock(p.stock != null ? String(p.stock) : "");
		setImageUrl(p.images?.[0] ?? "");
	}, [existing.data]);
	const generate = async () => {
		if (!name) {
			toast.error("Give your product a name first");
			return;
		}
		setGenLoading(true);
		try {
			const res = await mlApi.generateDescription({
				product_name: name,
				category,
				language: i18n.language
			});
			if (res.description) {
				setDescription(res.description);
				toast.success("AI description ready ✨");
			} else toast.error("Couldn't generate a description. Is the ML service running?");
		} catch (err) {
			toast.error(unwrapError(err).message);
		} finally {
			setGenLoading(false);
		}
	};
	const suggestPrice = async () => {
		setPricingLoading(true);
		try {
			const res = await mlApi.predictPrice({
				category,
				materialCost: Number(materialCost) || 0,
				hoursOfWork: Number(hours) || 0
			});
			setPrice(String(res.suggestedPrice));
			toast.success(`Suggested ₹${res.suggestedPrice} (₹${res.suggestedPriceMin}–₹${res.suggestedPriceMax})`);
		} catch (err) {
			toast.error(unwrapError(err).message);
		} finally {
			setPricingLoading(false);
		}
	};
	const submit = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			const moderation = await mlApi.moderateText(`${name} ${description}`.trim());
			if (moderation.flagged) {
				toast.error(`Listing needs changes: ${moderation.reason}`);
				return;
			}
			if (imageUrl) {
				const imgMod = await mlApi.moderateImage(imageUrl);
				if (imgMod.flagged) {
					toast.error(`Image needs changes: ${imgMod.reason}`);
					return;
				}
			}
			const payload = {
				name,
				category,
				description,
				price: Number(price),
				...stock !== "" && { stock: Number(stock) },
				...imageUrl && { imageUrl }
			};
			if (isEdit) {
				await productsApi.update(id, payload);
				toast.success("Product updated 🎉");
			} else {
				await productsApi.create(payload);
				toast.success("Product listed 🎉");
			}
			navigate("/app/flourish/mine");
		} catch (err) {
			toast.error(unwrapError(err).message);
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8 max-w-3xl mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl sm:text-4xl font-bold tracking-tight",
			children: isEdit ? "Edit product" : "List a new product"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Our AI will help you write a beautiful description and suggest a fair price."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "space-y-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-3xl border-border bg-card p-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Product image" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1.5 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-20 w-20 shrink-0 rounded-2xl overflow-hidden gradient-aurora",
							children: imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: imageUrl,
								alt: "Product",
								className: "h-full w-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
							label: imageUrl ? "Replace image" : "Upload image",
							onUploaded: setImageUrl
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Product name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						required: true,
						value: name,
						onChange: (e) => setName(e.target.value),
						className: "mt-1.5 rounded-xl h-11"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 flex flex-wrap gap-2",
						children: cats.slice(1).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCategory(c),
							className: `px-3.5 py-1.5 rounded-full text-xs font-medium ${category === c ? "gradient-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground"}`,
							children: c
						}, c))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							onClick: generate,
							disabled: genLoading,
							className: "rounded-full text-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 mr-1" }),
								" ",
								genLoading ? "Writing…" : "AI write"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: description,
						onChange: (e) => setDescription(e.target.value),
						rows: 4,
						className: "rounded-2xl"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Material cost (₹)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: "0",
							value: materialCost,
							onChange: (e) => setMaterialCost(e.target.value),
							placeholder: "e.g. 200",
							className: "mt-1.5 rounded-xl h-11"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Hours of work" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: "0",
							value: hours,
							onChange: (e) => setHours(e.target.value),
							placeholder: "e.g. 4",
							className: "mt-1.5 rounded-xl h-11"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Price (₹)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							onClick: suggestPrice,
							disabled: pricingLoading,
							className: "rounded-full text-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 mr-1" }),
								" ",
								pricingLoading ? "Analysing…" : "AI suggest"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						required: true,
						type: "number",
						value: price,
						onChange: (e) => setPrice(e.target.value),
						className: "rounded-xl h-11"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Stock available" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: "0",
						value: stock,
						onChange: (e) => setStock(e.target.value),
						placeholder: "e.g. 10",
						className: "mt-1.5 rounded-xl h-11"
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				size: "lg",
				disabled: submitting,
				className: "w-full rounded-full gradient-primary text-primary-foreground shadow hover:shadow-glow",
				children: submitting ? isEdit ? "Saving…" : "Listing…" : isEdit ? "Save changes" : "List product"
			})]
		})]
	});
}
/**
* Seller product management + inventory (Phase 4). Lists the seller's own listings,
* supports inline stock updates, edit, and delete. Reuses productsApi and RBAC
* (route is guarded to seller/admin in AppClient).
*/
function MyProductsPage() {
	const qc = useQueryClient();
	const query = useQuery({
		queryKey: ["my-products"],
		queryFn: productsApi.myProducts
	});
	const remove = useMutation({
		mutationFn: (id) => productsApi.remove(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["my-products"] });
			toast.success("Product removed");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl font-bold tracking-tight",
				children: "My Shop"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: "Manage your listings and inventory."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app/flourish/seller",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-4 w-4 mr-1" }), " Dashboard"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "rounded-full gradient-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app/flourish/upload",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1" }), " New product"]
					})
				})]
			})]
		}), query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 4 }) : !query.data || query.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Store,
			title: "No products yet",
			description: "List your first product to start selling.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "rounded-full gradient-primary text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/flourish/upload",
					children: "List a product"
				})
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: query.data.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductRow, {
				product: p,
				onDelete: () => remove.mutate(p.id),
				deleting: remove.isPending
			}, p.id))
		})]
	});
}
function ProductRow({ product, onDelete, deleting }) {
	const qc = useQueryClient();
	const [stock, setStock] = (0, import_react.useState)(String(product.stock ?? 0));
	const updateStock = useMutation({
		mutationFn: () => productsApi.update(product.id, { stock: Number(stock) }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["my-products"] });
			toast.success("Stock updated");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	const dirty = stock !== String(product.stock ?? 0);
	const outOfStock = (product.stock ?? 0) <= 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "rounded-3xl border-border bg-card p-5 flex flex-wrap items-center gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-16 w-16 shrink-0 rounded-2xl overflow-hidden gradient-aurora",
				children: product.images?.[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.images[0],
					alt: product.name,
					className: "h-full w-full object-cover"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/app/flourish/${product.id}`,
						className: "font-semibold line-clamp-1 hover:text-primary",
						children: product.name
					}), outOfStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "rounded-full bg-destructive/15 text-destructive",
						children: "Out of stock"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					children: [
						product.category,
						" · ₹",
						product.price
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-[10px] uppercase tracking-wide text-muted-foreground",
						children: "Stock"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: "0",
						value: stock,
						onChange: (e) => setStock(e.target.value),
						className: "h-9 w-20 rounded-xl"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => updateStock.mutate(),
					disabled: !dirty || updateStock.isPending,
					className: "rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					variant: "outline",
					className: "rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: `/app/flourish/${product.id}/edit`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					onClick: onDelete,
					disabled: deleting,
					className: "rounded-full text-destructive hover:text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
				})]
			})
		]
	});
}
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var ORDER_STATUSES = [
	"PLACED",
	"CONFIRMED",
	"SHIPPED",
	"DELIVERED",
	"CANCELLED"
];
/**
* Seller dashboard (Phase 4): revenue analytics, inventory shortcut, and the orders
* received for the seller's products with status management. Reuses the existing
* marketplace analytics + seller-orders endpoints and RBAC (route guarded in AppClient).
*/
function SellerDashboardPage() {
	const analytics = useQuery({
		queryKey: ["seller-analytics"],
		queryFn: ordersApi.analytics
	});
	const orders = useQuery({
		queryKey: ["seller-orders"],
		queryFn: ordersApi.sellerOrders
	});
	const a = analytics.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl sm:text-4xl font-bold tracking-tight",
					children: "Seller Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-muted-foreground",
					children: "Your revenue, inventory and incoming orders."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "rounded-full shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/app/flourish/mine",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-4 w-4 mr-1" }), " My Shop"]
					})
				})]
			}),
			analytics.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 1 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: IndianRupee,
						label: "Revenue",
						value: `₹${(a?.totalRevenue ?? 0).toLocaleString()}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: ShoppingCart,
						label: "Paid orders",
						value: a?.totalOrders ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: Boxes,
						label: "Units sold",
						value: a?.totalUnitsSold ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: Package,
						label: "Listings",
						value: a?.totalProductsListed ?? 0
					})
				]
			}),
			a && a.topProducts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "rounded-3xl border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold",
					children: "Top products"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-2",
					children: a.topProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate mr-2",
							children: p.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								p.unitsSold,
								" sold · ₹",
								p.revenue.toLocaleString()
							]
						})]
					}, p.productId))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Orders received"
				}), orders.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 3 }) : !orders.data || orders.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: ShoppingCart,
					title: "No orders yet",
					description: "Orders for your products will appear here."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: orders.data.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SellerOrderRow, { order: o }, o.id))
				})]
			})
		]
	});
}
function Stat({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "rounded-3xl border-border bg-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs uppercase tracking-wide",
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 text-2xl font-bold",
			children: value
		})]
	});
}
function SellerOrderRow({ order }) {
	const qc = useQueryClient();
	const update = useMutation({
		mutationFn: (status) => ordersApi.updateStatus(order.id, status),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["seller-orders"] });
			toast.success("Order status updated");
		},
		onError: (e) => toast.error(unwrapError(e).message)
	});
	const paid = order.paymentStatus === "PAID";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "rounded-3xl border-border bg-card p-5 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-semibold",
							children: ["Order #", order.id.slice(0, 8)]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground",
							children: [
								order.buyer?.name ?? "Buyer",
								order.buyer?.phone ? ` · ${order.buyer.phone}` : "",
								" · ",
								new Date(order.createdAt).toLocaleDateString()
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: `rounded-full ${paid ? "bg-accent/15 text-accent" : "bg-warning/15 text-warning"}`,
						children: order.paymentStatus
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-bold",
						children: ["₹", order.totalAmount.toLocaleString()]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						defaultValue: order.status,
						onValueChange: (v) => update.mutate(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "h-9 w-36 rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ORDER_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: s,
							children: s
						}, s)) })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm text-muted-foreground",
				children: order.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "truncate mr-2",
						children: [
							it.product.name,
							" × ",
							it.quantity
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", (it.priceAtPurchase * it.quantity).toLocaleString()] })]
				}, it.id))
			}),
			order.shippingAddress && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-xs text-muted-foreground",
				children: ["Ship to: ", order.shippingAddress]
			})
		]
	});
}
var STATUS_STYLES = {
	PAID: "bg-accent/15 text-accent",
	CONFIRMED: "bg-accent/15 text-accent",
	SHIPPED: "bg-primary/15 text-primary",
	DELIVERED: "bg-accent/15 text-accent",
	CANCELLED: "bg-destructive/15 text-destructive",
	FAILED: "bg-destructive/15 text-destructive",
	PENDING: "bg-warning/15 text-warning"
};
/**
* Buyer order history (Phase 4). Lists the user's marketplace orders with status and
* a "complete payment" action for any order left PENDING (reuses payForOrder).
*/
function OrdersPage() {
	const query = useQuery({
		queryKey: ["my-orders"],
		queryFn: ordersApi.list
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl sm:text-4xl font-bold tracking-tight",
			children: "My Orders"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-muted-foreground",
			children: "Track your marketplace purchases."
		})] }), query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 3 }) : !query.data || query.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: ShoppingBag,
			title: "No orders yet",
			description: "Your purchases will appear here.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "rounded-full gradient-primary text-primary-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/flourish",
					children: "Explore marketplace"
				})
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: query.data.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderRow, { order: o }, o.id))
		})]
	});
}
function OrderRow({ order }) {
	const qc = useQueryClient();
	const user = useAuthStore((s) => s.user);
	const pending = order.paymentStatus !== "PAID";
	const pay = useMutation({
		mutationFn: () => payForOrder(order.id, {
			description: `Order #${order.id.slice(0, 8)}`,
			prefill: {
				name: user?.name,
				contact: user?.phone,
				email: user?.email
			},
			onSuccess: () => {
				qc.invalidateQueries({ queryKey: ["my-orders"] });
				toast.success("Payment successful 🎉");
			}
		}),
		onError: (e) => toast.error(unwrapError(e).message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "rounded-3xl border-border bg-card p-5 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-semibold",
							children: ["Order #", order.id.slice(0, 8)]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: new Date(order.createdAt).toLocaleString()
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: `rounded-full ${STATUS_STYLES[order.status] ?? ""}`,
						children: order.status
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: `rounded-full ${STATUS_STYLES[order.paymentStatus] ?? ""}`,
						children: order.paymentStatus
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-bold",
						children: ["₹", order.totalAmount.toLocaleString()]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm text-muted-foreground",
				children: order.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "truncate mr-2",
						children: [
							it.product.name,
							" × ",
							it.quantity
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", (it.priceAtPurchase * it.quantity).toLocaleString()] })]
				}, it.id))
			}),
			order.shippingAddress && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-xs text-muted-foreground",
				children: ["Ship to: ", order.shippingAddress]
			}),
			pending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => pay.mutate(),
				disabled: pay.isPending,
				className: "rounded-full gradient-primary text-primary-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4 mr-1" }),
					" ",
					pay.isPending ? "Processing…" : "Complete payment"
				]
			})
		]
	});
}
var FILE_BASE$1 = API_BASE_URL.replace(/\/api\/?$/, "");
function ProfilePage() {
	const user = useAuthStore((s) => s.user);
	const setUser = useAuthStore((s) => s.setUser);
	const { t } = useTranslation();
	const insights = useUserInsights();
	const resumeQuery = useQuery({
		queryKey: ["resume-me"],
		queryFn: resumeApi.me,
		retry: false
	});
	const certificates = (useQuery({
		queryKey: ["my-courses"],
		queryFn: coursesApi.myCourses
	}).data ?? []).filter((e) => e.certificateUrl);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [extracting, setExtracting] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: user?.name ?? "",
		bio: "",
		location: user?.location ?? ""
	});
	const [skills, setSkills] = (0, import_react.useState)([]);
	const [newSkill, setNewSkill] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const r = resumeQuery.data;
		setForm((f) => ({
			...f,
			bio: r?.bio ?? f.bio,
			name: user?.name ?? f.name,
			location: user?.location ?? f.location
		}));
		if (r) setSkills(r.skills);
	}, [
		resumeQuery.data,
		user?.name,
		user?.location
	]);
	const suggestSkills = async () => {
		if (!form.bio.trim()) {
			toast.error("Add a bit about yourself in your bio first");
			return;
		}
		setExtracting(true);
		try {
			const found = await mlApi.extractSkills(form.bio);
			if (found.length === 0) {
				toast("No skills detected — try describing what you do in more detail");
				return;
			}
			setSkills((prev) => Array.from(/* @__PURE__ */ new Set([...prev, ...found])));
			toast.success(`Added ${found.length} suggested skill${found.length > 1 ? "s" : ""}`);
		} catch (e) {
			toast.error(unwrapError(e).message);
		} finally {
			setExtracting(false);
		}
	};
	const initials = (user?.name ?? "S").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
	const save = async () => {
		setSaving(true);
		try {
			const updated = await userApi.updateProfile({
				name: form.name,
				location: form.location
			});
			await resumeApi.save({
				bio: form.bio.trim() || void 0,
				skills
			});
			setUser({
				...updated,
				bio: form.bio,
				skills
			});
			resumeQuery.refetch();
			toast.success("Profile updated");
		} catch (e) {
			toast.error(unwrapError(e).message);
		} finally {
			setSaving(false);
		}
	};
	const uploadAvatar = async (url) => {
		try {
			const updated = await userApi.updateProfile({ avatarUrl: url });
			setUser({
				...updated,
				bio: form.bio,
				skills
			});
			toast.success("Photo updated");
		} catch (e) {
			toast.error(unwrapError(e).message);
		}
	};
	const experience = resumeQuery.data?.experience ?? [];
	const education = resumeQuery.data?.education ?? [];
	const badges = deriveBadges(insights);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "relative overflow-hidden rounded-3xl border-border bg-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 sm:h-40 gradient-aurora" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
								className: "h-24 w-24 border-4 border-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: user?.avatar_url }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
									className: "gradient-primary text-primary-foreground text-xl font-bold",
									children: initials
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-bold",
								children: user?.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: user?.email
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								className: "rounded-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/app/resume",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 mr-1" }), " Resume"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
								onUploaded: uploadAvatar,
								accept: "image/*",
								label: "Change photo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: save,
								disabled: saving,
								className: "rounded-full gradient-primary text-primary-foreground shadow",
								children: saving ? "Saving…" : t("common.save")
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-4 gap-3 max-w-lg",
					children: [
						{
							icon: Sparkles,
							label: "XP",
							value: insights.xp
						},
						{
							icon: Flame,
							label: "Streak",
							value: insights.streak
						},
						{
							icon: Award,
							label: "Certificates",
							value: insights.certificates
						},
						{
							icon: GraduationCap,
							label: "Courses",
							value: insights.coursesCount
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-muted/50 p-3 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4 mx-auto text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-lg font-bold",
								children: s.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground",
								children: s.label
							})
						]
					}, s.label))
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "about",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "rounded-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "about",
							className: "rounded-full",
							children: "About"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "experience",
							className: "rounded-full",
							children: "Experience"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "certificates",
							className: "rounded-full",
							children: "Certificates"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "badges",
							className: "rounded-full",
							children: "Badges"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "about",
					className: "mt-6 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rounded-3xl border-border bg-card p-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Full name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.name,
								onChange: (e) => setForm({
									...form,
									name: e.target.value
								}),
								className: "mt-1.5 rounded-xl h-11"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Bio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 3,
								value: form.bio,
								onChange: (e) => setForm({
									...form,
									bio: e.target.value
								}),
								placeholder: "Tell others about yourself…",
								className: "mt-1.5 rounded-2xl"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Location" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mt-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: form.location,
									onChange: (e) => setForm({
										...form,
										location: e.target.value
									}),
									className: "pl-10 rounded-xl h-11"
								})]
							})] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rounded-3xl border-border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Skills" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									size: "sm",
									variant: "ghost",
									onClick: suggestSkills,
									disabled: extracting,
									className: "rounded-full text-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 mr-1" }),
										" ",
										extracting ? "Reading bio…" : "Suggest from bio"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "rounded-full pl-3 pr-1 py-1 gap-1",
									children: [s, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										"aria-label": `Remove ${s}`,
										onClick: () => setSkills(skills.filter((x) => x !== s)),
										className: "grid h-4 w-4 place-items-center rounded-full hover:bg-background",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
									})]
								}, s)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: (e) => {
										e.preventDefault();
										const v = newSkill.trim();
										if (v && !skills.includes(v)) setSkills([...skills, v]);
										setNewSkill("");
									},
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: newSkill,
										onChange: (e) => setNewSkill(e.target.value),
										placeholder: "Add skill",
										className: "h-8 w-32 rounded-full text-xs"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										size: "sm",
										variant: "ghost",
										className: "rounded-full h-8 w-8 p-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-muted-foreground",
								children: "Skills are saved to your resume and used to match you with jobs."
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "experience",
					className: "mt-6 space-y-4",
					children: [experience.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rounded-3xl border-border bg-card p-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-8 w-8 mx-auto text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: "No experience added yet."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "mt-4 rounded-full gradient-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/app/resume",
									children: "Add experience"
								})
							})
						]
					}) : experience.map((exp, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rounded-3xl border-border bg-card p-6 flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								children: exp.title || "Untitled role"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-muted-foreground",
								children: [exp.company, [exp.startDate, exp.endDate].filter(Boolean).join(" — ")].filter(Boolean).join(" · ")
							}),
							exp.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: exp.description
							})
						] })]
					}, i)), education.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rounded-3xl border-border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-4 w-4 text-primary" }), " Education"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-2",
							children: education.map((ed, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: ed.institution || "Institution"
									}),
									ed.degree ? ` · ${ed.degree}` : "",
									ed.year ? ` · ${ed.year}` : ""
								]
							}, i))
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "certificates",
					className: "mt-6",
					children: certificates.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "rounded-3xl border-border bg-card p-8 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-8 w-8 mx-auto text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: "No certificates yet. Complete a course to earn one."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: certificates.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { delay: i * .05 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "rounded-3xl border-border bg-card p-5 hover-lift",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-24 gradient-primary rounded-2xl grid place-items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-10 w-10 text-primary-foreground" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 text-sm font-semibold line-clamp-2",
										children: e.course.title
									}),
									e.completedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: ["Issued ", new Date(e.completedAt).toLocaleDateString()]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "sm",
										className: "mt-4 w-full rounded-full gradient-primary text-primary-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `${FILE_BASE$1}${e.certificateUrl}`,
											target: "_blank",
											rel: "noreferrer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5 mr-1" }), " View"]
										})
									})
								]
							})
						}, e.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "badges",
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-4 sm:grid-cols-6",
						children: badges.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `mx-auto grid h-16 w-16 place-items-center rounded-2xl ${b.earned ? "gradient-aurora shadow-glow" : "bg-muted"}`,
								children: b.earned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "h-7 w-7 text-white" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-6 w-6 text-muted-foreground" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `mt-2 text-xs font-medium ${b.earned ? "" : "text-muted-foreground"}`,
								children: b.label
							})]
						}, b.label))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: "Badges unlock automatically as you learn, apply and sell."
					})]
				})
			]
		})]
	});
}
function deriveBadges(i) {
	return [
		{
			label: "First steps",
			icon: Sparkles,
			earned: i.coursesCount >= 1
		},
		{
			label: "Graduate",
			icon: GraduationCap,
			earned: i.completedCourses >= 1
		},
		{
			label: "Certified",
			icon: Award,
			earned: i.certificates >= 1
		},
		{
			label: "Job seeker",
			icon: Briefcase,
			earned: i.applicationsCount >= 1
		},
		{
			label: "Shopper",
			icon: Award,
			earned: i.ordersCount >= 1
		},
		{
			label: "On a streak",
			icon: Flame,
			earned: i.streak >= 3
		}
	];
}
var FILE_BASE = API_BASE_URL.replace(/\/api\/?$/, "");
/**
* Resume Builder (Phase 5). CRUD over the existing Resume backend (PUT /resume,
* GET /resume/me). The resume is the single source of truth for skills/bio, which
* also feed the ML recommendation and job-match endpoints. Skills can be extracted
* from the bio via the existing ML skill-extraction endpoint.
*/
function ResumePage() {
	const { t } = useTranslation();
	const user = useAuthStore((s) => s.user);
	const setUser = useAuthStore((s) => s.setUser);
	const query = useQuery({
		queryKey: ["resume-me"],
		queryFn: resumeApi.me,
		retry: false
	});
	const [bio, setBio] = (0, import_react.useState)("");
	const [skills, setSkills] = (0, import_react.useState)([]);
	const [experience, setExperience] = (0, import_react.useState)([]);
	const [education, setEducation] = (0, import_react.useState)([]);
	const [links, setLinks] = (0, import_react.useState)([]);
	const [resumeFileUrl, setResumeFileUrl] = (0, import_react.useState)();
	const [newSkill, setNewSkill] = (0, import_react.useState)("");
	const [newLink, setNewLink] = (0, import_react.useState)("");
	const [extracting, setExtracting] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [preview, setPreview] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const r = query.data;
		if (!r) return;
		setBio(r.bio ?? "");
		setSkills(r.skills);
		setExperience(r.experience);
		setEducation(r.education);
		setLinks(r.portfolioLinks);
		setResumeFileUrl(r.resumeFileUrl);
	}, [query.data]);
	const suggestSkills = async () => {
		if (!bio.trim()) {
			toast.error("Add a bit about yourself in your bio first");
			return;
		}
		setExtracting(true);
		try {
			const found = await mlApi.extractSkills(bio);
			if (found.length === 0) {
				toast("No skills detected — describe what you do in more detail");
				return;
			}
			setSkills((prev) => Array.from(/* @__PURE__ */ new Set([...prev, ...found])));
			toast.success(`Added ${found.length} suggested skill${found.length > 1 ? "s" : ""}`);
		} catch (e) {
			toast.error(unwrapError(e).message);
		} finally {
			setExtracting(false);
		}
	};
	const save = async () => {
		setSaving(true);
		try {
			await resumeApi.save({
				bio: bio.trim() || void 0,
				skills,
				experience,
				education,
				portfolioLinks: links,
				resumeFileUrl
			});
			if (user) setUser({
				...user,
				bio: bio.trim(),
				skills
			});
			toast.success("Resume saved");
		} catch (e) {
			toast.error(unwrapError(e).message);
		} finally {
			setSaving(false);
		}
	};
	if (query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageMotion, {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 4 })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8 max-w-3xl mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl font-bold tracking-tight",
				children: "Resume Builder"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: "Your resume powers job matching and recommendations."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => setPreview((p) => !p),
					className: "rounded-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4 mr-1" }),
						" ",
						preview ? "Edit" : "Preview"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: save,
					disabled: saving,
					className: "rounded-full gradient-primary text-primary-foreground shadow",
					children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4 mr-1" }),
						" ",
						t("common.save")
					] })
				})]
			})]
		}), preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumePreview, {
			name: user?.name ?? "You",
			location: user?.location,
			bio,
			skills,
			experience,
			education,
			links,
			resumeFileUrl
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "rounded-3xl border-border bg-card p-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Professional bio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						rows: 4,
						value: bio,
						onChange: (e) => setBio(e.target.value),
						placeholder: "Tell employers about yourself, your strengths and what you're looking for…",
						className: "mt-1.5 rounded-2xl"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Skills" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "sm",
							variant: "ghost",
							onClick: suggestSkills,
							disabled: extracting,
							className: "rounded-full text-primary",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 mr-1" }),
								" ",
								extracting ? "Reading bio…" : "Suggest from bio"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							className: "rounded-full pl-3 pr-1 py-1 gap-1",
							children: [s, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": `Remove ${s}`,
								onClick: () => setSkills(skills.filter((x) => x !== s)),
								className: "grid h-4 w-4 place-items-center rounded-full hover:bg-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
							})]
						}, s)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								const v = newSkill.trim();
								if (v && !skills.includes(v)) setSkills([...skills, v]);
								setNewSkill("");
							},
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: newSkill,
								onChange: (e) => setNewSkill(e.target.value),
								placeholder: "Add skill",
								className: "h-8 w-32 rounded-full text-xs"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								size: "sm",
								variant: "ghost",
								className: "rounded-full h-8 w-8 p-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
							})]
						})]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "rounded-3xl border-border bg-card p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "h-4 w-4 text-primary" }), " Experience"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: "outline",
								onClick: () => setExperience([...experience, {
									title: "",
									company: "",
									startDate: "",
									endDate: "",
									description: ""
								}]),
								className: "rounded-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5 mr-1" }), " Add"]
							})]
						}),
						experience.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No experience added yet."
						}),
						experience.map((exp, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border p-4 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: exp.title,
											onChange: (e) => updateAt(setExperience, experience, i, { title: e.target.value }),
											placeholder: "Role / title",
											className: "rounded-xl h-10"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: exp.company ?? "",
											onChange: (e) => updateAt(setExperience, experience, i, { company: e.target.value }),
											placeholder: "Company",
											className: "rounded-xl h-10"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: exp.startDate ?? "",
											onChange: (e) => updateAt(setExperience, experience, i, { startDate: e.target.value }),
											placeholder: "Start (e.g. 2023)",
											className: "rounded-xl h-10"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: exp.endDate ?? "",
											onChange: (e) => updateAt(setExperience, experience, i, { endDate: e.target.value }),
											placeholder: "End (e.g. Present)",
											className: "rounded-xl h-10"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: exp.description ?? "",
									onChange: (e) => updateAt(setExperience, experience, i, { description: e.target.value }),
									rows: 2,
									placeholder: "What did you do?",
									className: "rounded-2xl"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									size: "sm",
									variant: "ghost",
									onClick: () => setExperience(experience.filter((_, j) => j !== i)),
									className: "rounded-full text-destructive hover:text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5 mr-1" }), " Remove"]
								})
							]
						}, i))
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "rounded-3xl border-border bg-card p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-4 w-4 text-primary" }), " Education"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: "outline",
								onClick: () => setEducation([...education, {
									institution: "",
									degree: "",
									year: ""
								}]),
								className: "rounded-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5 mr-1" }), " Add"]
							})]
						}),
						education.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No education added yet."
						}),
						education.map((ed, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border p-4 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-2 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: ed.institution,
										onChange: (e) => updateAt(setEducation, education, i, { institution: e.target.value }),
										placeholder: "Institution",
										className: "rounded-xl h-10 sm:col-span-1"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: ed.degree ?? "",
										onChange: (e) => updateAt(setEducation, education, i, { degree: e.target.value }),
										placeholder: "Degree / programme",
										className: "rounded-xl h-10"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: ed.year ?? "",
										onChange: (e) => updateAt(setEducation, education, i, { year: e.target.value }),
										placeholder: "Year",
										className: "rounded-xl h-10"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: "ghost",
								onClick: () => setEducation(education.filter((_, j) => j !== i)),
								className: "rounded-full text-destructive hover:text-destructive",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5 mr-1" }), " Remove"]
							})]
						}, i))
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "rounded-3xl border-border bg-card p-6 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link$1, { className: "h-4 w-4 text-primary" }), " Portfolio links"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "rounded-full pl-3 pr-1 py-1 gap-1 max-w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate max-w-[220px]",
									children: l
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": `Remove ${l}`,
									onClick: () => setLinks(links.filter((x) => x !== l)),
									className: "grid h-4 w-4 place-items-center rounded-full hover:bg-background",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
								})]
							}, l))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								const v = newLink.trim();
								if (v && !links.includes(v)) setLinks([...links, v]);
								setNewLink("");
							},
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: newLink,
								onChange: (e) => setNewLink(e.target.value),
								placeholder: "https://…",
								className: "rounded-xl h-10"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								size: "sm",
								variant: "outline",
								className: "rounded-full shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5 mr-1" }), " Add"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 text-primary" }), " Resume file (PDF)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploader, {
									accept: "application/pdf,image/*",
									label: resumeFileUrl ? "Replace file" : "Upload file",
									onUploaded: setResumeFileUrl
								}), resumeFileUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `${FILE_BASE}${resumeFileUrl}`,
									target: "_blank",
									rel: "noreferrer",
									className: "text-sm text-primary story-link",
									children: "View uploaded file"
								})]
							})]
						})
					]
				})
			]
		})]
	});
}
function updateAt(setter, list, index, patch) {
	setter(list.map((item, i) => i === index ? {
		...item,
		...patch
	} : item));
}
function ResumePreview({ name, location, bio, skills, experience, education, links, resumeFileUrl }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "rounded-3xl border-border bg-card p-8 space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-bold",
				children: name
			}), location && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: location
			})] }),
			bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted-foreground",
				children: bio
			}),
			skills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground",
				children: "Skills"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex flex-wrap gap-1.5",
				children: skills.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					className: "rounded-full text-xs",
					children: s
				}, s))
			})] }),
			experience.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground",
				children: "Experience"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 space-y-3",
				children: experience.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-medium",
						children: [e.title || "Untitled role", e.company ? ` · ${e.company}` : ""]
					}),
					(e.startDate || e.endDate) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: [e.startDate, e.endDate].filter(Boolean).join(" — ")
					}),
					e.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: e.description
					})
				] }, i))
			})] }),
			education.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground",
				children: "Education"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 space-y-2",
				children: education.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: e.institution || "Institution"
						}),
						e.degree ? ` · ${e.degree}` : "",
						e.year ? ` · ${e.year}` : ""
					]
				}, i))
			})] }),
			links.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground",
				children: "Links"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-1",
				children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: l,
					target: "_blank",
					rel: "noreferrer",
					className: "text-sm text-primary story-link break-all",
					children: l
				}) }, l))
			})] }),
			resumeFileUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: `${FILE_BASE}${resumeFileUrl}`,
				target: "_blank",
				rel: "noreferrer",
				className: "inline-flex items-center gap-1 text-sm text-primary story-link",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }), " Download attached resume"]
			})
		]
	});
}
/**
* Returns a debounced copy of `value` that only updates after `delay` ms of no changes.
* Used to throttle global search input so we don't fire a request on every keystroke.
*/
function useDebouncedValue(value, delay = 350) {
	const [debounced, setDebounced] = (0, import_react.useState)(value);
	(0, import_react.useEffect)(() => {
		const id = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(id);
	}, [value, delay]);
	return debounced;
}
var MIN_CHARS = 2;
/**
* Global search results (Phase 6). A single page that searches Courses, Jobs and
* Products at once, reusing the existing module list endpoints — each of which already
* ranks results server-side via the ML search service. No new backend or ML code.
*/
function SearchResultsPage() {
	const { t } = useTranslation();
	const [params, setParams] = useSearchParams();
	const [input, setInput] = (0, import_react.useState)(params.get("q") ?? "");
	const [scope, setScope] = (0, import_react.useState)("all");
	const term = useDebouncedValue(input, 350).trim();
	const active = term.length >= MIN_CHARS;
	const lastWritten = (0, import_react.useRef)(params.get("q") ?? "");
	(0, import_react.useEffect)(() => {
		const current = params.get("q") ?? "";
		if (term !== current) {
			lastWritten.current = term;
			setParams(term ? { q: term } : {}, { replace: true });
		}
	}, [term]);
	(0, import_react.useEffect)(() => {
		const urlQ = params.get("q") ?? "";
		if (urlQ !== lastWritten.current) {
			lastWritten.current = urlQ;
			setInput(urlQ);
		}
	}, [params]);
	const wants = (s) => scope === "all" || scope === s;
	const coursesQ = useQuery({
		queryKey: ["search-courses", term],
		queryFn: () => coursesApi.list({ q: term }),
		enabled: active && wants("courses")
	});
	const jobsQ = useQuery({
		queryKey: ["search-jobs", term],
		queryFn: () => jobsApi.list({ q: term }),
		enabled: active && wants("jobs")
	});
	const productsQ = useQuery({
		queryKey: ["search-products", term],
		queryFn: () => productsApi.list({ q: term }),
		enabled: active && wants("products")
	});
	const counts = {
		courses: coursesQ.data?.items.length ?? 0,
		jobs: jobsQ.data?.items.length ?? 0,
		products: productsQ.data?.items.length ?? 0
	};
	const totalResults = counts.courses + counts.jobs + counts.products;
	const scopes = [
		{
			key: "all",
			label: t("search.all")
		},
		{
			key: "courses",
			label: t("search.courses")
		},
		{
			key: "jobs",
			label: t("search.jobs")
		},
		{
			key: "products",
			label: t("search.products")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl font-bold tracking-tight",
				children: t("search.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: t("search.subtitle")
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					autoFocus: true,
					value: input,
					onChange: (e) => setInput(e.target.value),
					placeholder: t("search.placeholder"),
					className: "pl-11 h-12 rounded-full bg-card",
					"aria-label": t("search.placeholder")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: scopes.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setScope(s.key),
					className: `px-4 py-1.5 rounded-full text-sm font-medium transition-all ${scope === s.key ? "gradient-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:text-foreground"}`,
					children: s.label
				}, s.key))
			}),
			!active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Search,
				title: t("search.prompt")
			}) : active && !coursesQ.isLoading && !jobsQ.isLoading && !productsQ.isLoading && totalResults === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Search,
				title: t("search.empty"),
				description: t("search.empty_sub")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-10",
				children: [
					wants("courses") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchGroup, {
						icon: GraduationCap,
						title: t("search.courses"),
						count: counts.courses,
						query: coursesQ,
						emptyLabel: t("search.no_courses"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: (coursesQ.data?.items ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseResult, { course: c }, c.id))
						})
					}),
					wants("jobs") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchGroup, {
						icon: Briefcase,
						title: t("search.jobs"),
						count: counts.jobs,
						query: jobsQ,
						emptyLabel: t("search.no_jobs"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 md:grid-cols-2",
							children: (jobsQ.data?.items ?? []).map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobResult, { job: j }, j.id))
						})
					}),
					wants("products") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchGroup, {
						icon: Store,
						title: t("search.products"),
						count: counts.products,
						query: productsQ,
						emptyLabel: t("search.no_products"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
							children: (productsQ.data?.items ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductResult, { product: p }, p.id))
						})
					})
				]
			})
		]
	});
}
function SearchGroup({ icon: Icon, title, count, query, emptyLabel, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-primary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: title
				}),
				!query.isLoading && !query.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					className: "rounded-full",
					children: count
				})
			]
		}), query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 3 }) : query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { onRetry: () => query.refetch() }) : (query.data?.items ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: emptyLabel }) : children]
	});
}
function CourseResult({ course }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "overflow-hidden rounded-3xl border-border bg-card hover-lift",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: `/app/learn/${course.id}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-video gradient-primary relative",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "rounded-full text-xs",
						children: course.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 font-semibold line-clamp-2",
						children: course.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-xs text-muted-foreground capitalize",
						children: [course.level, course.price ? ` · ₹${course.price}` : " · Free"]
					})
				]
			})]
		})
	});
}
function JobResult({ job }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: `/app/earn/${job.id}`,
		className: "block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "rounded-3xl border-border bg-card p-4 flex items-center gap-3 hover:border-primary/50 transition-colors",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
					className: "h-11 w-11 shrink-0 rounded-2xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
						className: "rounded-2xl gradient-primary text-primary-foreground text-xs font-bold",
						children: job.company.name.slice(0, 2).toUpperCase()
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold truncate",
						children: job.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground truncate flex items-center gap-1",
						children: [
							job.company.name,
							" · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
							" ",
							job.location || "—",
							" ",
							job.remote && "· Remote"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					className: "rounded-full text-xs shrink-0",
					children: job.type
				})
			]
		})
	});
}
function ProductResult({ product }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "overflow-hidden rounded-3xl border-border bg-card hover-lift",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: `/app/flourish/${product.id}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-square gradient-aurora overflow-hidden",
				children: product.images?.[0] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: product.images[0],
					alt: product.name,
					className: "h-full w-full object-cover"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold truncate",
						children: product.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground truncate",
						children: product.seller.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 font-bold",
						children: ["₹", product.price]
					})
				]
			})]
		})
	});
}
var iconMap = {
	course: BookOpen,
	job: Briefcase,
	order: ShoppingBag,
	message: MessageSquare,
	system: Bell
};
var placeholderNotifs = [
	{
		id: "1",
		title: "New lesson available",
		body: "'Advanced typography' is now live in your UX course.",
		type: "course",
		created_at: (/* @__PURE__ */ new Date()).toISOString(),
		read: false
	},
	{
		id: "2",
		title: "Application viewed",
		body: "TATA Digital reviewed your application.",
		type: "job",
		created_at: (/* @__PURE__ */ new Date(Date.now() - 36e5)).toISOString(),
		read: false
	},
	{
		id: "3",
		title: "Order shipped",
		body: "Your terracotta earrings are on the way.",
		type: "order",
		created_at: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString(),
		read: true
	},
	{
		id: "4",
		title: "New message from mentor",
		body: "Sneha replied to your discussion.",
		type: "message",
		created_at: (/* @__PURE__ */ new Date(Date.now() - 2 * 864e5)).toISOString(),
		read: true
	}
];
var filters = [
	"all",
	"unread",
	"course",
	"job",
	"order",
	"message"
];
function NotificationsPage() {
	const { t } = useTranslation();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const qc = useQueryClient();
	const query = useQuery({
		queryKey: ["notifications"],
		queryFn: notificationsApi.list
	});
	const notifs = query.data ?? placeholderNotifs;
	const markAll = useMutation({
		mutationFn: notificationsApi.markAllRead,
		onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] })
	});
	const filtered = notifs.filter((n) => {
		if (filter === "all") return true;
		if (filter === "unread") return !n.read;
		return n.type === filter;
	});
	const unread = notifs.filter((n) => !n.read).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3",
						children: ["Notifications", unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "gradient-primary text-primary-foreground border-0 rounded-full",
							children: unread
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-muted-foreground",
						children: "Stay in the loop with everything Sakhi."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: () => markAll.mutate(),
					className: "rounded-full shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-4 w-4 mr-1" }), " Mark all read"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: filters.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setFilter(f),
					className: `px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${filter === f ? "gradient-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground hover:text-foreground"}`,
					children: f
				}, f))
			}),
			query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListSkeleton, { count: 4 }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Bell,
				title: "You're all caught up ✨"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: filtered.map((n, i) => {
					const Icon = iconMap[n.type];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 6
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { delay: i * .03 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: `rounded-2xl border-border p-4 flex items-start gap-3 ${!n.read && "bg-primary/5 border-primary/20"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium text-sm",
											children: n.title
										}), !n.read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground mt-0.5",
										children: n.body
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-xs text-muted-foreground",
										children: new Date(n.created_at).toLocaleString()
									})
								]
							})]
						})
					}, n.id);
				})
			})
		]
	});
}
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
function SettingsPage() {
	const { t, i18n } = useTranslation();
	const { theme, setTheme } = useTheme();
	const { prefs, setPref: update } = usePreferences();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageMotion, {
		className: "space-y-8 max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl sm:text-4xl font-bold tracking-tight",
				children: t("settings.title")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-muted-foreground",
				children: "Manage your preferences and account."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: t("settings.appearance"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "mb-3 block text-sm font-medium",
					children: t("settings.theme")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
					value: theme,
					onValueChange: (v) => setTheme(v),
					className: "grid grid-cols-3 gap-3",
					children: [
						{
							v: "light",
							label: t("settings.light"),
							icon: Sun
						},
						{
							v: "dark",
							label: t("settings.dark"),
							icon: Moon
						},
						{
							v: "system",
							label: t("settings.system"),
							icon: Monitor
						}
					].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						htmlFor: `th-${o.v}`,
						className: `flex flex-col items-center gap-2 rounded-2xl border p-4 cursor-pointer transition-all ${theme === o.v ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
								value: o.v,
								id: `th-${o.v}`,
								className: "sr-only"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(o.icon, { className: "h-5 w-5" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium",
								children: o.label
							})
						]
					}, o.v))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: t("settings.language"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 sm:grid-cols-3",
					children: [
						{
							v: "en",
							label: "English"
						},
						{
							v: "hi",
							label: "हिन्दी"
						},
						{
							v: "mr",
							label: "मराठी"
						}
					].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => void i18n.changeLanguage(l.v),
						className: `rounded-2xl border p-4 text-left transition-all ${i18n.language === l.v ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium",
							children: l.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground mt-1",
							children: l.v.toUpperCase()
						})]
					}, l.v))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: t("settings.notifications"),
				icon: Bell,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Email digest",
						description: "Weekly summary of your progress",
						checked: prefs.notifications.emailDigest,
						onChange: (v) => update("notifications", "emailDigest", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Push notifications",
						description: "Real-time updates on your device",
						checked: prefs.notifications.push,
						onChange: (v) => update("notifications", "push", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
						label: "Marketing",
						description: "Occasional emails about new features",
						checked: prefs.notifications.marketing,
						onChange: (v) => update("notifications", "marketing", v)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: t("settings.privacy"),
				icon: Shield,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					label: "Public profile",
					description: "Let mentors and employers find you",
					checked: prefs.privacy.publicProfile,
					onChange: (v) => update("privacy", "publicProfile", v)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					label: "Show my location",
					description: "Helps us surface nearby opportunities",
					checked: prefs.privacy.showLocation,
					onChange: (v) => update("privacy", "showLocation", v)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				title: t("settings.accessibility"),
				icon: Accessibility,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					label: "Reduce motion",
					description: "Minimise animations across the app",
					checked: prefs.accessibility.reduceMotion,
					onChange: (v) => update("accessibility", "reduceMotion", v)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
					label: "Larger text",
					description: "Increase base font size",
					checked: prefs.accessibility.largerText,
					onChange: (v) => update("accessibility", "largerText", v)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: t("settings.account"),
				icon: Lock,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							className: "rounded-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/forgot-password",
								children: "Change password"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "rounded-full",
							onClick: () => toast("Data export isn't available yet."),
							children: "Download my data"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "rounded-full text-destructive hover:text-destructive",
							onClick: () => toast("Account deletion isn't available yet."),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 mr-1" }), " Delete account"]
						})
					]
				})
			})
		]
	});
}
function Section({ title, icon: Icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "rounded-3xl border-border bg-card p-6 space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold",
				children: title
			})]
		}), children]
	});
}
function ToggleRow({ label, description, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4 rounded-2xl border border-border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-medium",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs text-muted-foreground",
				children: description
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			checked,
			onCheckedChange: onChange
		})]
	});
}
var queryClient = new QueryClient({ defaultOptions: { queries: {
	staleTime: 3e4,
	refetchOnWindowFocus: false,
	retry: 1
} } });
function AppShell() {
	const restore = useAuthStore((s) => s.restore);
	(0, import_react.useEffect)(() => {
		restore();
	}, [restore]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HashRouter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
		mode: "wait",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Routes, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Route, {
				element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicLayout, {}),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/about",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/help",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpPage, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Route, {
				element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthLayout, {}),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/login",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/signup",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignupPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/forgot-password",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgotPasswordPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/verify",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtpPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/onboarding",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OnboardingPage, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Route, {
				element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedRoute, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLayout, {}) }),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
							to: "/app/dashboard",
							replace: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/dashboard",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/learn",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LearnPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/learn/mine",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MyCoursesPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/learn/create",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseEditorPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/learn/:id",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseDetailPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/learn/:id/edit",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseEditorPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/learn/:id/learn",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoursePlayerPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/learn/:id/quiz",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/certificates",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CertificatesPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/admin/courses",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleRoute, {
							allow: ["all"],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCourseReviewPage, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/earn",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarnPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/earn/mine",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MyJobsPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/earn/manage",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleRoute, {
							allow: ["earner", "all"],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmployerJobsPage, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/earn/post",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleRoute, {
							allow: ["earner", "all"],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobEditorPage, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/earn/:id",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobDetailPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/earn/:id/edit",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleRoute, {
							allow: ["earner", "all"],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobEditorPage, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/earn/:id/applicants",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleRoute, {
							allow: ["earner", "all"],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobApplicantsPage, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/flourish",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplacePage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/flourish/mine",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleRoute, {
							allow: ["seller", "all"],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MyProductsPage, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/flourish/seller",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleRoute, {
							allow: ["seller", "all"],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SellerDashboardPage, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/flourish/upload",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleRoute, {
							allow: ["seller", "all"],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadProductPage, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/flourish/:id/edit",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleRoute, {
							allow: ["seller", "all"],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadProductPage, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/flourish/:id",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDetailPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/cart",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/checkout",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/orders",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/search",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchResultsPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/profile",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilePage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/resume",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumePage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/notifications",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsPage, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
						path: "/app/settings",
						element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPage, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, {
				path: "*",
				element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFoundPage, {})
			})
		] })
	}) });
}
function AppClient() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreferencesProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipProvider, {
			delayDuration: 200,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				position: "top-right",
				richColors: true,
				closeButton: true
			})]
		}) }) })
	});
}
function Shell() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh",
		style: { background: "var(--color-background)" },
		"aria-hidden": "true"
	});
}
function ClientOnly({ children }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function App() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientOnly, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppClient, {}) });
}
var Route$1 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#7C3AED"
			},
			{ title: "Sakhi — AI-powered livelihood platform for women" },
			{
				name: "description",
				content: "Learn new skills, earn a livelihood, and flourish. Sakhi is an AI-powered platform helping women unlock courses, jobs, and marketplace opportunities."
			},
			{
				property: "og:title",
				content: "Sakhi — Learn. Earn. Flourish."
			},
			{
				property: "og:description",
				content: "An elegant AI-powered platform helping women learn skills, find jobs and grow their businesses."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: ""
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Inter:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: App
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
var routeTree = Route$1._addFileChildren({})._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
