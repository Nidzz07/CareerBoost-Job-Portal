import type { User } from "@/app/types";

// Reusable RBAC foundation (Phase 0). The role vocabulary mirrors the frontend User
// model (see types/index.ts). Backend roles are mapped to these in the API layer
// (mapUser): LEARNER→learner, EMPLOYER→earner, SELLER→seller, ADMIN→all.
//
// NOTE: the ADMIN→"all" mapping is inherited from the existing auth layer; aligning
// an explicit "admin" role is deferred to the auth/RBAC phase. These helpers stay
// role-vocabulary-agnostic so that change won't require touching consumers.

export type Role = NonNullable<User["role"]>;

export const ROLES = {
  LEARNER: "learner",
  EARNER: "earner",
  SELLER: "seller",
  ADMIN: "all",
} as const satisfies Record<string, Role>;

/** True when the user has any of the allowed roles. */
export function hasRole(user: User | null | undefined, allowed: readonly Role[]): boolean {
  return !!user?.role && allowed.includes(user.role);
}

/** A navigation item that may be restricted to certain roles. */
export interface RoleNavItem {
  to: string;
  label: string;
  roles?: readonly Role[];
}

/** Filter a nav list down to the items the given user is allowed to see. */
export function filterNavByRole<T extends RoleNavItem>(items: readonly T[], user: User | null | undefined): T[] {
  return items.filter((item) => !item.roles || hasRole(user, item.roles));
}
