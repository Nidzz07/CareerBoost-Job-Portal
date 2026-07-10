import { create } from "zustand";
import type { User } from "@/app/types";
import { tokenStore } from "@/app/services/api/client";
import { authApi, userApi } from "@/app/services/api/endpoints";

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  restore: () => Promise<void>;
  login: (phone: string, password: string) => Promise<User>;
  signup: (name: string, email: string, password: string, phone: string) => Promise<User>;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "idle",
  restore: async () => {
    const token = tokenStore.get();
    if (!token) {
      set({ status: "unauthenticated" });
      return;
    }
    set({ status: "loading" });
    try {
      const user = await userApi.profile();
      set({ user, status: "authenticated" });
    } catch {
      tokenStore.clear();
      set({ user: null, status: "unauthenticated" });
    }
  },
  login: async (phone, password) => {
    const res = await authApi.login({ phone, password });
    tokenStore.set(res.token, res.refresh_token);
    set({ user: res.user, status: "authenticated" });
    return res.user;
  },
  signup: async (name, email, password, phone) => {
    const res = await authApi.signup({ name, email, password, phone });
    tokenStore.set(res.token, res.refresh_token);
    set({ user: res.user, status: "authenticated" });
    return res.user;
  },
  setUser: (user) => set({ user }),
  logout: async () => {
    try { await authApi.logout(); } catch { /* noop */ }
    tokenStore.clear();
    set({ user: null, status: "unauthenticated" });
  },
}));
