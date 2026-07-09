import { api } from "./client";
import type {
  User, Course, Job, Product, Notification, Order,
  LoginPayload, SignupPayload, AuthResponse, Paginated,
} from "@/app/types";

export const authApi = {

  // i am changing this line() 10)that login can work on dummy data
//  login: (payload: LoginPayload) => api.post<AuthResponse>("/auth/login", payload).then((r) => r.data),
login: async (payload: LoginPayload): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    token: "fake-jwt-token",
    refresh_token: "fake-refresh-token",
    user: {
      id: "1",
      full_name: "Aashka",
      email: payload.email,
    },
  } as AuthResponse;
},
  // i am changing this line so that login can work on dummy data
  // signup: (payload: SignupPayload) => api.post<AuthResponse>("/auth/signup", payload).then((r) => r.data),
  signup: async (payload: SignupPayload): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    token: "fake-jwt-token",
    refresh_token: "fake-refresh-token",
    user: {
      id: "1",
      full_name: payload.full_name,
      email: payload.email,
      phone: payload.phone,
    },
  } as AuthResponse;
},
  forgotPassword: (email: string) => api.post("/auth/forgot-password", { email }).then((r) => r.data),
  verifyOtp: (phone: string, otp: string) =>
    api.post<AuthResponse>("/auth/verify-otp", { phone, otp }).then((r) => r.data),
  logout: () => api.post("/auth/logout").then((r) => r.data),
};

export const userApi = {
  profile: () => api.get<User>("/user/profile").then((r) => r.data),
  updateProfile: (payload: Partial<User>) => api.put<User>("/user/profile", payload).then((r) => r.data),
  completeOnboarding: (payload: { language: string; role: string }) =>
    api.post<User>("/user/onboarding", payload).then((r) => r.data),
};

export const coursesApi = {
  list: (params?: { q?: string; category?: string; page?: number }) =>
    api.get<Paginated<Course>>("/courses", { params }).then((r) => r.data),
  get: (id: string) => api.get<Course>(`/courses/${id}`).then((r) => r.data),
  enroll: (id: string) => api.post(`/courses/${id}/enroll`).then((r) => r.data),
  recommended: () => api.get<Course[]>("/recommendations/courses").then((r) => r.data),
};

export const jobsApi = {
  list: (params?: { q?: string; location?: string; remote?: boolean; type?: string; page?: number }) =>
    api.get<Paginated<Job>>("/jobs", { params }).then((r) => r.data),
  get: (id: string) => api.get<Job>(`/jobs/${id}`).then((r) => r.data),
  apply: (id: string, payload: { resume_url?: string; note?: string }) =>
    api.post(`/jobs/${id}/apply`, payload).then((r) => r.data),
  save: (id: string) => api.post(`/jobs/${id}/save`).then((r) => r.data),
  recommended: () => api.get<Job[]>("/recommendations/jobs").then((r) => r.data),
};

export const productsApi = {
  list: (params?: { q?: string; category?: string; page?: number }) =>
    api.get<Paginated<Product>>("/products", { params }).then((r) => r.data),
  get: (id: string) => api.get<Product>(`/products/${id}`).then((r) => r.data),
  create: (payload: Partial<Product>) => api.post<Product>("/products", payload).then((r) => r.data),
  featured: () => api.get<Product[]>("/products/featured").then((r) => r.data),
};

export const ordersApi = {
  list: () => api.get<Order[]>("/orders").then((r) => r.data),
  create: (payload: { items: Array<{ product_id: string; qty: number }>; address: unknown }) =>
    api.post<Order>("/orders", payload).then((r) => r.data),
};

export const notificationsApi = {
  list: () => api.get<Notification[]>("/notifications").then((r) => r.data),
  markRead: (id: string) => api.post(`/notifications/${id}/read`).then((r) => r.data),
  markAllRead: () => api.post("/notifications/read-all").then((r) => r.data),
};

export const mlApi = {
  generateDescription: (payload: { product_name: string; category?: string; keywords?: string[] }) =>
    api.post<{ description: string }>("/ml/generate-description", payload).then((r) => r.data),
  predictPrice: (payload: { product_name: string; category: string; material?: string }) =>
    api.post<{ suggested_price: number; range: [number, number] }>("/ml/predict-price", payload).then((r) => r.data),
  recommend: (payload: { context: string }) =>
    api.post<{ items: Array<{ id: string; title: string; type: string }> }>("/ml/recommend", payload).then((r) => r.data),
};
