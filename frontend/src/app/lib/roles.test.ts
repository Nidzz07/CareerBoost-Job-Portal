import { describe, it, expect } from "vitest";
import { hasRole, filterNavByRole, ROLES, type RoleNavItem } from "./roles";
import type { User } from "@/app/types";

// Critical RBAC helpers — these gate which navigation entries and role-scoped areas a
// user can reach, so they are worth locking down with tests.

const learner = { id: "1", name: "A", email: "a@x.com", role: ROLES.LEARNER } as User;
const admin = { id: "2", name: "B", email: "b@x.com", role: ROLES.ADMIN } as User;

describe("hasRole", () => {
  it("returns true when the user has one of the allowed roles", () => {
    expect(hasRole(admin, [ROLES.ADMIN])).toBe(true);
    expect(hasRole(learner, [ROLES.LEARNER, ROLES.SELLER])).toBe(true);
  });

  it("returns false when the role is not allowed", () => {
    expect(hasRole(learner, [ROLES.ADMIN])).toBe(false);
  });

  it("returns false for null/undefined users or roleless users", () => {
    expect(hasRole(null, [ROLES.ADMIN])).toBe(false);
    expect(hasRole(undefined, [ROLES.ADMIN])).toBe(false);
    expect(hasRole({ id: "3", name: "C", email: "c@x.com" } as User, [ROLES.ADMIN])).toBe(false);
  });
});

describe("filterNavByRole", () => {
  const nav: RoleNavItem[] = [
    { to: "/app/dashboard", label: "Dashboard" }, // unrestricted
    { to: "/app/admin", label: "Admin", roles: [ROLES.ADMIN] },
    { to: "/app/shop", label: "My Shop", roles: [ROLES.SELLER, ROLES.ADMIN] },
  ];

  it("keeps unrestricted items and drops items the user can't access", () => {
    const visible = filterNavByRole(nav, learner).map((n) => n.to);
    expect(visible).toEqual(["/app/dashboard"]);
  });

  it("shows admin-only and shared items to an admin", () => {
    const visible = filterNavByRole(nav, admin).map((n) => n.to);
    expect(visible).toEqual(["/app/dashboard", "/app/admin", "/app/shop"]);
  });
});
