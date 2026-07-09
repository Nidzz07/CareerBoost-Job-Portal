import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

export const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
  "https://api.sakhi.example.com";

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

api.interceptors.response.use(
  (r) => r,
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
        const { data } = await axios.post<{ token: string; refresh_token?: string }>(
          `${API_BASE_URL}/auth/refresh`,
          { refresh_token: refresh },
        );
        tokenStore.set(data.token, data.refresh_token);
        flushQueue(data.token);
        original.headers.set("Authorization", `Bearer ${data.token}`);
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
