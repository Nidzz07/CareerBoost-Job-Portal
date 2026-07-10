// User insights aggregation (Phase 5).
//
// This is the SINGLE source of truth for dashboard/profile "intelligence". It reuses
// the existing per-domain endpoints (Learn my-courses, Earn applications/interviews,
// Marketplace orders) and derives real, deterministic metrics from them — XP, streak,
// certificates, a merged activity timeline and a weekly-activity series.
//
// No new backend endpoints and no duplicated storage: every number here is computed
// from data the backend already owns. XP/streak have no backend column by design
// ("avoid storing duplicate information"), so they are derived here from real events.

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { coursesApi, jobsApi, ordersApi } from "@/app/services/api/endpoints";
import type { EnrolledCourse } from "@/app/services/api/endpoints";
import { useAuthStore } from "@/app/store/auth";

export type ActivityKind = "course" | "certificate" | "job" | "interview" | "order";

export interface ActivityItem {
  id: string;
  kind: ActivityKind;
  title: string;
  date: string; // ISO timestamp
}

export interface UserInsights {
  isLoading: boolean;
  // Learning
  coursesCount: number;
  completedCourses: number;
  coursesInProgress: number;
  certificates: number;
  completedLessons: number;
  continueLearning: EnrolledCourse | null;
  // Earn
  applicationsCount: number;
  interviewsCount: number;
  // Marketplace
  ordersCount: number;
  totalSpent: number;
  // Gamification (derived)
  xp: number;
  streak: number;
  // Timeline
  activity: ActivityItem[];
  weekly: Array<{ d: string; v: number }>;
}

// XP weighting — documented, deterministic. Tunable in one place.
const XP = {
  lesson: 10,
  courseCompleted: 100,
  certificate: 50,
  application: 20,
  interview: 30,
  paidOrder: 25,
};

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEKDAY = ["S", "M", "T", "W", "T", "F", "S"];

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isCompleted(e: EnrolledCourse): boolean {
  return e.progress >= 100 || !!e.completedAt;
}

/** Consecutive days (ending today or yesterday) that have at least one activity. */
function computeStreak(dates: Date[]): number {
  if (dates.length === 0) return 0;
  const days = new Set(dates.map(dayKey));
  const today = startOfDay(new Date());
  let cursor = today;
  if (!days.has(dayKey(today))) {
    const yesterday = new Date(today.getTime() - DAY_MS);
    if (days.has(dayKey(yesterday))) cursor = yesterday;
    else return 0;
  }
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor = new Date(cursor.getTime() - DAY_MS);
  }
  return streak;
}

/** A 7-bucket series (oldest→today) counting past activity per day. */
function computeWeekly(dates: Date[]): Array<{ d: string; v: number }> {
  const today = startOfDay(new Date());
  const buckets: Array<{ d: string; v: number }> = [];
  for (let i = 6; i >= 0; i -= 1) {
    const day = new Date(today.getTime() - i * DAY_MS);
    const count = dates.filter((dt) => dayKey(startOfDay(dt)) === dayKey(day)).length;
    buckets.push({ d: WEEKDAY[day.getDay()], v: count });
  }
  return buckets;
}

/**
 * Aggregates the signed-in user's real activity into dashboard/profile insights.
 * Safe for any role — the underlying endpoints simply return empty lists when a role
 * has no data (e.g. an employer with no applications).
 */
export function useUserInsights(): UserInsights {
  const authed = useAuthStore((s) => s.status === "authenticated");

  const enrollmentsQ = useQuery({ queryKey: ["my-courses"], queryFn: coursesApi.myCourses, enabled: authed });
  const applicationsQ = useQuery({ queryKey: ["my-applications"], queryFn: jobsApi.myApplications, enabled: authed });
  const interviewsQ = useQuery({ queryKey: ["my-interviews"], queryFn: jobsApi.myInterviews, enabled: authed });
  const ordersQ = useQuery({ queryKey: ["my-orders"], queryFn: ordersApi.list, enabled: authed });

  return useMemo<UserInsights>(() => {
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

    // "Continue learning" = the in-progress course with the most recent activity.
    const continueLearning =
      [...inProgress].sort((a, b) => {
        const ta = new Date(a.lastActivityAt ?? a.enrolledAt ?? 0).getTime();
        const tb = new Date(b.lastActivityAt ?? b.enrolledAt ?? 0).getTime();
        return tb - ta;
      })[0] ?? null;

    const xp =
      completedLessons * XP.lesson +
      completed.length * XP.courseCompleted +
      certificates.length * XP.certificate +
      applications.length * XP.application +
      interviews.length * XP.interview +
      paidOrders.length * XP.paidOrder;

    // ---- Activity timeline (merged, real events) ----
    const activity: ActivityItem[] = [];
    for (const e of enrollments) {
      if (e.enrolledAt) activity.push({ id: `enr-${e.id}`, kind: "course", title: `Enrolled in “${e.course.title}”`, date: e.enrolledAt });
      if (e.completedAt) activity.push({ id: `cmp-${e.id}`, kind: "course", title: `Completed “${e.course.title}”`, date: e.completedAt });
      if (e.certificateUrl && e.completedAt) activity.push({ id: `crt-${e.id}`, kind: "certificate", title: `Earned a certificate for “${e.course.title}”`, date: e.completedAt });
    }
    for (const a of applications) {
      activity.push({ id: `app-${a.id}`, kind: "job", title: `Applied to “${a.job.title}”`, date: a.appliedAt });
    }
    for (const iv of interviews) {
      activity.push({ id: `int-${iv.id}`, kind: "interview", title: `Interview for “${iv.job.title}”`, date: iv.scheduledAt });
    }
    for (const o of orders) {
      activity.push({ id: `ord-${o.id}`, kind: "order", title: `Placed an order · ₹${o.totalAmount.toLocaleString()}`, date: o.createdAt });
    }
    activity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Streak/weekly consider only PAST events (exclude future-dated interviews).
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
      weekly: computeWeekly(pastDates),
    };
  }, [
    enrollmentsQ.data, applicationsQ.data, interviewsQ.data, ordersQ.data,
    enrollmentsQ.isLoading, applicationsQ.isLoading, interviewsQ.isLoading, ordersQ.isLoading,
  ]);
}
