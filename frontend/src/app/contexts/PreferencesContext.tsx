import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { userApi } from "@/app/services/api/endpoints";
import { unwrapError } from "@/app/services/api/client";
import { useAuthStore } from "@/app/store/auth";

/**
 * Account preferences (Phase 6). Centralises the settings that the Settings page reads
 * and writes, so the accessibility preferences actually take effect application-wide
 * (they were persisted before but never applied). Reuses the existing settings
 * persistence endpoints (userApi.getSettings / updateSettings) — no new backend.
 */
export type Prefs = {
  notifications: { emailDigest: boolean; push: boolean; marketing: boolean };
  privacy: { publicProfile: boolean; showLocation: boolean };
  accessibility: { reduceMotion: boolean; largerText: boolean };
};

export const DEFAULT_PREFS: Prefs = {
  notifications: { emailDigest: true, push: true, marketing: false },
  privacy: { publicProfile: true, showLocation: false },
  accessibility: { reduceMotion: false, largerText: false },
};

interface Ctx {
  prefs: Prefs;
  loaded: boolean;
  setPref: <S extends keyof Prefs, K extends keyof Prefs[S]>(section: S, key: K, value: Prefs[S][K]) => void;
}

const PreferencesContext = createContext<Ctx | null>(null);

/** Reflects accessibility prefs onto <html> so global CSS can react to them. */
function applyAccessibility(a: Prefs["accessibility"]) {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.classList.toggle("text-larger", a.largerText);
  el.classList.toggle("reduce-motion", a.reduceMotion);
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const status = useAuthStore((s) => s.status);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [loaded, setLoaded] = useState(false);

  // Load persisted settings once authenticated and apply accessibility immediately.
  useEffect(() => {
    if (status !== "authenticated") return;
    let active = true;
    userApi
      .getSettings()
      .then((loadedSettings) => {
        if (!active) return;
        const s = (loadedSettings ?? {}) as Partial<Prefs>;
        const merged: Prefs = {
          notifications: { ...DEFAULT_PREFS.notifications, ...(s.notifications ?? {}) },
          privacy: { ...DEFAULT_PREFS.privacy, ...(s.privacy ?? {}) },
          accessibility: { ...DEFAULT_PREFS.accessibility, ...(s.accessibility ?? {}) },
        };
        setPrefs(merged);
        applyAccessibility(merged.accessibility);
        setLoaded(true);
      })
      .catch(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, [status]);

  // Reset to defaults (and clear applied classes) on logout.
  useEffect(() => {
    if (status === "unauthenticated") {
      setPrefs(DEFAULT_PREFS);
      applyAccessibility(DEFAULT_PREFS.accessibility);
      setLoaded(false);
    }
  }, [status]);

  const setPref = useCallback<Ctx["setPref"]>((section, key, value) => {
    setPrefs((prev) => {
      const next: Prefs = { ...prev, [section]: { ...prev[section], [key]: value } };
      applyAccessibility(next.accessibility);
      void userApi.updateSettings(next as unknown as Record<string, unknown>).catch((e) => toast.error(unwrapError(e).message));
      return next;
    });
  }, []);

  return <PreferencesContext.Provider value={{ prefs, loaded, setPref }}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
