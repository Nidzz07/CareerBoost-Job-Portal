import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  BookOpen, Briefcase, Store, Flame, Trophy, Sparkles, ArrowUpRight, Bell,
  Play, ShoppingBag, CalendarClock,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip as RTooltip,
  RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useAuthStore } from "@/app/store/auth";
import { coursesApi, jobsApi, productsApi, notificationsApi, ordersApi } from "@/app/services/api/endpoints";
import { useUserInsights, type ActivityKind } from "@/app/lib/insights";
import { PageMotion } from "../components/PageMotion";
import { ListSkeleton } from "../components/Skeletons";
import { EmptyState } from "../components/EmptyState";

const KIND_META: Record<ActivityKind, { icon: typeof BookOpen; tint: string }> = {
  course: { icon: BookOpen, tint: "bg-primary/10 text-primary" },
  certificate: { icon: Trophy, tint: "bg-warning/20 text-warning" },
  job: { icon: Briefcase, tint: "bg-secondary/10 text-secondary" },
  interview: { icon: CalendarClock, tint: "bg-primary/10 text-primary" },
  order: { icon: Store, tint: "bg-accent/10 text-accent" },
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  if (diff < 0) return new Date(iso).toLocaleDateString();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return mins <= 1 ? "just now" : `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(iso).toLocaleDateString();
}

export function DashboardPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const insights = useUserInsights();
  const isSeller = user?.role === "seller" || user?.role === "all";

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    if (h < 12) return t("dashboard.greeting_morning");
    if (h < 18) return t("dashboard.greeting_afternoon");
    return t("dashboard.greeting_evening");
  }, [t]);

  const courses = useQuery({ queryKey: ["recommended-courses"], queryFn: coursesApi.recommended });
  const jobs = useQuery({ queryKey: ["recommended-jobs"], queryFn: jobsApi.recommended });
  const featured = useQuery({ queryKey: ["featured-products"], queryFn: productsApi.featured });
  const notifs = useQuery({ queryKey: ["notifications"], queryFn: notificationsApi.list });
  const analytics = useQuery({ queryKey: ["seller-analytics"], queryFn: ordersApi.analytics, enabled: isSeller });

  const earnings = isSeller ? analytics.data?.totalRevenue ?? 0 : insights.totalSpent;

  const stats = [
    { label: t("dashboard.streak"), value: insights.streak, icon: Flame, color: "text-destructive", suffix: " 🔥" },
    { label: t("dashboard.xp"), value: insights.xp, icon: Sparkles, color: "text-primary" },
    { label: t("dashboard.certificates"), value: insights.certificates, icon: Trophy, color: "text-warning" },
    { label: isSeller ? t("dashboard.earnings") : "Spent", value: `₹${earnings.toLocaleString()}`, icon: ShoppingBag, color: "text-accent" },
  ];

  const cont = insights.continueLearning;
  const contProgress = cont?.progress ?? 0;

  return (
    <PageMotion className="space-y-8">
      {/* Header */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{greeting},</p>
          <h1 className="mt-1 text-3xl sm:text-4xl font-bold tracking-tight truncate">
            {user?.name?.split(" ")[0] ?? "friend"} <span className="text-gradient">✨</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("dashboard.subtitle")}</p>
        </div>
        <Button asChild variant="outline" className="rounded-full shrink-0 hidden sm:inline-flex">
          <Link to="/app/notifications"><Bell className="h-4 w-4 mr-1" /> Inbox</Link>
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="rounded-3xl border-border bg-card p-5 hover-lift">
              <div className="flex items-center justify-between">
                <s.icon className={`h-5 w-5 ${s.color}`} />
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-4 text-3xl font-bold">
                {s.value}{s.suffix}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Progress + Continue learning */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 rounded-3xl border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{t("dashboard.progress_title")}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Your activity over the last 7 days</p>
            </div>
            <Badge variant="secondary" className="rounded-full">Weekly</Badge>
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={insights.weekly}>
                <defs>
                  <linearGradient id="grad-primary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide allowDecimals={false} />
                <RTooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="v" name="activities" stroke="var(--color-primary)" strokeWidth={3} fill="url(#grad-primary)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-3xl border-border bg-card p-6 flex flex-col">
          <h3 className="font-semibold">{t("dashboard.continue_learning")}</h3>
          {cont ? (
            <>
              <div className="mt-4 mx-auto">
                <ResponsiveContainer width={160} height={160}>
                  <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ v: contProgress }]} startAngle={90} endAngle={-270}>
                    <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                    <RadialBar dataKey="v" cornerRadius={20} fill="var(--color-primary)" background={{ fill: "var(--color-muted)" }} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center -mt-24">
                <div className="text-3xl font-bold">{contProgress}%</div>
                <div className="text-xs text-muted-foreground">Course complete</div>
              </div>
              <div className="mt-auto pt-8">
                <div className="text-sm font-medium line-clamp-1">{cont.course.title}</div>
                <Progress value={contProgress} className="mt-2 h-2" />
                <Button asChild size="sm" className="mt-4 w-full rounded-full gradient-primary text-primary-foreground">
                  <Link to={`/app/learn/${cont.course.id}/learn`}><Play className="h-3.5 w-3.5 mr-1" /> {t("learn.continue")}</Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">No course in progress.</p>
              <Button asChild size="sm" className="mt-4 rounded-full gradient-primary text-primary-foreground">
                <Link to="/app/learn">Browse courses</Link>
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Recommendations */}
      <Section title={t("dashboard.recommended_courses")} href="/app/learn">
        {courses.isLoading ? (
          <ListSkeleton count={3} />
        ) : (courses.data ?? []).length === 0 ? (
          <EmptyState icon={BookOpen} title="No course recommendations yet" description="Enrol in a course or build your resume to get personalised picks." />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(courses.data ?? []).slice(0, 3).map((c) => (
              <MiniCourseCard key={c.id} title={c.title} category={c.category} progress={c.progress ?? 0} id={c.id} />
            ))}
          </div>
        )}
      </Section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title={t("dashboard.recommended_jobs")} href="/app/earn">
          {jobs.isLoading ? (
            <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 rounded-2xl bg-muted animate-pulse" />)}</div>
          ) : (jobs.data ?? []).length === 0 ? (
            <EmptyState icon={Briefcase} title="No job recommendations yet" description="Add skills to your resume to see matched roles." />
          ) : (
            <div className="space-y-3">
              {(jobs.data ?? []).slice(0, 3).map((j) => (
                <MiniJobRow key={j.id} title={j.title} company={j.company.name} location={j.location} id={j.id} remote={j.remote} />
              ))}
            </div>
          )}
        </Section>

        <Section title={t("dashboard.activity")}>
          {insights.isLoading ? (
            <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-14 rounded-2xl bg-muted animate-pulse" />)}</div>
          ) : insights.activity.length === 0 ? (
            <EmptyState icon={Sparkles} title="No activity yet" description="Your learning, jobs and orders will show up here." />
          ) : (
            <div className="space-y-3">
              {insights.activity.slice(0, 6).map((a) => {
                const meta = KIND_META[a.kind];
                return (
                  <div key={a.id} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5">
                    <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${meta.tint}`}>
                      <meta.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{a.title}</div>
                      <div className="text-xs text-muted-foreground">{timeAgo(a.date)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Section>
      </div>

      <Section title={t("dashboard.marketplace_highlights")} href="/app/flourish">
        {(featured.data ?? []).length === 0 ? (
          <EmptyState icon={Store} title="No products to show yet" />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(featured.data ?? []).slice(0, 4).map((p) => (
              <Card key={p.id} className="overflow-hidden rounded-3xl border-border bg-card hover-lift">
                <Link to={`/app/flourish/${p.id}`}>
                  <div className="aspect-square gradient-aurora overflow-hidden">
                    {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />}
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-semibold truncate">{p.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{p.seller.name}</div>
                    <div className="mt-2 font-bold">₹{p.price}</div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </Section>

      {notifs.data && notifs.data.length > 0 && (
        <p className="text-xs text-muted-foreground">You have {notifs.data.filter((n) => !n.read).length} unread notifications.</p>
      )}
    </PageMotion>
  );
}

function Section({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {href && <Link to={href} className="text-xs text-primary story-link">View all</Link>}
      </div>
      {children}
    </section>
  );
}

function MiniCourseCard({ id, title, category, progress }: { id: string; title: string; category: string; progress: number }) {
  return (
    <Card className="overflow-hidden rounded-3xl border-border bg-card hover-lift">
      <Link to={`/app/learn/${id}`}>
        <div className="aspect-video gradient-primary relative">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" />
        </div>
        <div className="p-4">
          <Badge variant="secondary" className="rounded-full text-xs">{category}</Badge>
          <div className="mt-2 font-semibold line-clamp-2">{title}</div>
          <Progress value={progress} className="mt-3 h-1.5" />
          <div className="mt-1 text-xs text-muted-foreground">{progress}% complete</div>
        </div>
      </Link>
    </Card>
  );
}

function MiniJobRow({ id, title, company, location, remote }: { id: string; title: string; company: string; location: string; remote: boolean }) {
  return (
    <Link to={`/app/earn/${id}`} className="block">
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 hover:border-primary/50 transition-colors">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-bold">
            {company.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold truncate">{title}</div>
          <div className="text-xs text-muted-foreground truncate">{company} · {location} {remote && "· Remote"}</div>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground shrink-0" />
      </div>
    </Link>
  );
}
