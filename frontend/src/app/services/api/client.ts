import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

// Single source of truth for the backend origin. The Express backend mounts every
// route under `/api`, so the base URL already includes that prefix — endpoint
// definitions must therefore use bare resource paths (e.g. "/auth/login"), never
// re-prepend "/api". Override via VITE_API_BASE_URL (see frontend/.env.example).
export const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
  "http://localhost:5000/api";

const TOKEN_KEY = "sakhi.token";
const REFRESH_KEY = "sakhi.refresh";

export const tokenStore = {
  get: () => (typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY)),
  getRefresh: () => (typeof window === "undefined" ? null : localStorage.getItem(REFRESH_KEY)),
  set: (token: string, refresh?: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStore.get();
  if (token) config.headers.set("Authorization", `Bearer ${token}`);
  return config;
});

let isRefreshing = false;
let pendingQueue: Array<(token: string | null) => void> = [];

const flushQueue = (token: string | null) => {
  pendingQueue.forEach((cb) => cb(token));
  pendingQueue = [];
};

// The Express backend wraps successful payloads in a `{ success, data }` envelope.
// Unwrap it centrally so callers/components receive `data` directly instead of
// repeating `res.data.data` everywhere. Responses without the envelope (e.g. raw
// ML passthroughs) are left untouched.
api.interceptors.response.use(
  (response) => {
    const body = response.data;
    if (
      body &&
      typeof body === "object" &&
      !Array.isArray(body) &&
      "success" in body &&
      "data" in body
    ) {
      response.data = (body as { data: unknown }).data;
    }
    return response;
  },
  async (error: AxiosError) => {
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;
    const status = error.response?.status;

    if (status === 401 && original && !original._retry) {
      const refresh = tokenStore.getRefresh();
      if (!refresh) {
        tokenStore.clear();
        if (typeof window !== "undefined") window.location.hash = "/login";
        return Promise.reject(error);
      }
      original._retry = true;
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push((newToken) => {
            if (!newToken) return reject(error);
            original.headers.set("Authorization", `Bearer ${newToken}`);
            resolve(api(original));
          });
        });
      }
      isRefreshing = true;
      try {
        // Raw axios (not `api`) to avoid re-entering this interceptor. The backend
        // wraps the payload in `{ success, data }`, so unwrap it here.
        const { data: body } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refresh_token: refresh,
        });
        const payload = (body && typeof body === "object" && "data" in body ? body.data : body) as {
          token: string;
          refresh_token?: string;
        };
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

    if (status && status >= 500) {
      toast.error("Server error. Please try again in a moment.");
     }
    //   else if (!error.response) {
    //   toast.error("You appear to be offline. Check your connection.");
    // }
    return Promise.reject(error);
  },
);

export type ApiError = { message: string; code?: string; status?: number };

export const unwrapError = (err: unknown): ApiError => {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { message?: string; code?: string } | undefined;
    return {
      message: data?.message ?? err.message ?? "Unexpected error",
      code: data?.code,
      status: err.response?.status,
    };
  }
  return { message: err instanceof Error ? err.message : "Unexpected error" };
};
