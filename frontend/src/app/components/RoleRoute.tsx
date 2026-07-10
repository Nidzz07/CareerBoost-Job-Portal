import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthStore } from "@/app/store/auth";
import { hasRole, type Role } from "@/app/lib/roles";
import { LoadingScreen } from "./LoadingScreen";

/**
 * Reusable role guard (Phase 0 foundation). Mirrors ProtectedRoute but additionally
 * checks the authenticated user's role against `allow`. Unauthenticated users go to
 * login; authenticated-but-unauthorised users are redirected to `redirectTo`.
 *
 * Not wired into any routes yet — provided for later role-scoped areas (admin /
 * employer / seller consoles).
 */
export function RoleRoute({
  allow,
  children,
  redirectTo = "/app/dashboard",
}: {
  allow: readonly Role[];
  children: ReactNode;
  redirectTo?: string;
}) {
  const status = useAuthStore((s) => s.status);
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (status === "idle" || status === "loading") return <LoadingScreen />;
  if (status === "unauthenticated") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (!hasRole(user, allow)) {
    return <Navigate to={redirectTo} replace />;
  }
  return <>{children}</>;
}
