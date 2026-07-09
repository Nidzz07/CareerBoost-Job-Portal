import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  BookOpen, Briefcase, Store, Flame, Trophy, Sparkles, ArrowUpRight, Bell,
  Play, ShoppingBag,
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
import { coursesApi, jobsApi, productsApi, notificationsApi } from "@/app/services/api/endpoints";
import { PageMotion } from "../components/PageMotion";
import { ListSkeleton } from "../components/Skeletons";

const weekly = [
  { d: "M", v: 20 }, { d: "T", v: 45 }, { d: "W", v: 30 },
  { d: "T", v: 60 }, { d: "F", v: 50 }, { d: "S", v: 80 }, { d: "S", v: 65 },
];

const activity = [
  { icon: BookOpen, title: "Completed lesson 'Intro to UX'", time: "2h ago", tint: "bg-primary/10 text-primary" },
  { icon: Briefcase, title: "Applied to 'Junior Designer at TATA'", time: "yesterday", tint: "bg-secondary/10 text-secondary" },
  { icon: Store, title: "Sold 2 handmade earrings", time: "2 days ago", tint: "bg-accent/10 text-accent" },
  { icon: Trophy, title: "Earned certificate: Digital Literacy", time: "3 days ago", tint: "bg-warning/20 text-warning" },
];

export function DashboardPage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);

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

  const stats = [
    { label: t("dashboard.streak"), value: user?.streak ?? 7, icon: Flame, color: "text-destructive", suffix: " 🔥" },
    { label: t("dashboard.xp"), value: user?.xp ?? 1280, icon: Sparkles, color: "text-primary" },
    { label: t("dashboard.certificates"), value: 4, icon: Trophy, color: "text-warning" },
    { label: t("dashboard.earnings"), value: "₹8,420", icon: ShoppingBag, color: "text-accent" },
  ];

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
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
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
              <p className="text-xs text-muted-foreground mt-0.5">You're up 24% from last week</p>
            </div>
            <Badge variant="secondary" className="rounded-full">Weekly</Badge>
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekly}>
                <defs>
                  <linearGradient id="grad-primary" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <RTooltip
                  contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }}
                />
                <Area type="monotone" dataKey="v" stroke="var(--color-primary)" strokeWidth={3} fill="url(#grad-primary)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="rounded-3xl border-border bg-card p-6 flex flex-col">
          <h3 className="font-semibold">{t("dashboard.continue_learning")}</h3>
          <div className="mt-4 mx-auto">
            <ResponsiveContainer width={160} height={160}>
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ v: 68 }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="v" cornerRadius={20} fill="var(--color-primary)" background={{ fill: "var(--color-muted)" }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center -mt-24">
            <div className="text-3xl font-bold">68%</div>
            <div className="text-xs text-muted-foreground">Course complete</div>
          </div>
          <div className="mt-auto pt-8">
            <div className="text-sm font-medium">UX Fundamentals</div>
            <Progress value={68} className="mt-2 h-2" />
            <Button asChild size="sm" className="mt-4 w-full rounded-full gradient-primary text-primary-foreground">
              <Link to="/app/learn/1"><Play className="h-3.5 w-3.5 mr-1" /> {t("learn.continue")}</Link>
            </Button>
          </div>
        </Card>
      </div>

      {/* Recommendations */}
      <Section title={t("dashboard.recommended_courses")} href="/app/learn">
        {courses.isLoading ? (
          <ListSkeleton count={3} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(courses.data ?? placeholderCourses).slice(0, 3).map((c) => (
              <MiniCourseCard key={c.id} title={c.title} category={c.category} progress={c.progress ?? 0} id={c.id} />
            ))}
          </div>
        )}
      </Section>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title={t("dashboard.recommended_jobs")} href="/app/earn">
          {jobs.isLoading ? (
            <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 rounded-2xl bg-muted animate-pulse" />)}</div>
          ) : (
            <div className="space-y-3">
              {(jobs.data ?? placeholderJobs).slice(0, 3).map((j) => (
                <MiniJobRow key={j.id} title={j.title} company={j.company.name} location={j.location} id={j.id} remote={j.remote} />
              ))}
            </div>
          )}
        </Section>

        <Section title={t("dashboard.activity")}>
          <div className="space-y-3">
            {activity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5">
                <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${a.tint}`}>
                  <a.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section title={t("dashboard.marketplace_highlights")} href="/app/flourish">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(featured.data ?? placeholderProducts).slice(0, 4).map((p) => (
            <Card key={p.id} className="overflow-hidden rounded-3xl border-border bg-card hover-lift">
              <Link to={`/app/flourish/${p.id}`}>
                <div className="aspect-square gradient-aurora" />
                <div className="p-4">
                  <div className="text-sm font-semibold truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{p.seller.name}</div>
                  <div className="mt-2 font-bold">₹{p.price}</div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {notifs.data && notifs.data.length > 0 && (
        <p className="text-xs text-muted-foreground">You have {notifs.data.filter(n => !n.read).length} unread notifications.</p>
      )}
    </PageMotion>
  );
}

function Section({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {href && (
          <Link to={href} className="text-xs text-primary story-link">View all</Link>
        )}
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

// Fallback data used when API isn't available (still no mock backend — just harmless UI placeholders)
const placeholderCourses = [
  { id: "1", title: "UX Fundamentals for Beginners", category: "Design", progress: 68 },
  { id: "2", title: "Digital Marketing 101", category: "Marketing", progress: 24 },
  { id: "3", title: "Financial Literacy Basics", category: "Finance", progress: 0 },
] as Array<{ id: string; title: string; category: string; progress: number }>;

const placeholderJobs = [
  { id: "1", title: "Junior UX Designer", company: { name: "TATA Digital" }, location: "Mumbai", remote: true },
  { id: "2", title: "Content Writer", company: { name: "Zomato" }, location: "Bengaluru", remote: true },
  { id: "3", title: "Customer Support", company: { name: "Meesho" }, location: "Remote", remote: true },
] as Array<{ id: string; title: string; company: { name: string }; location: string; remote: boolean }>;

const placeholderProducts = [
  { id: "1", name: "Hand-block sarees", seller: { name: "Meena Crafts" }, price: 1499 },
  { id: "2", name: "Terracotta earrings", seller: { name: "Rohini Handmade" }, price: 349 },
  { id: "3", name: "Organic soap set", seller: { name: "Green Farm Co" }, price: 599 },
  { id: "4", name: "Kalamkari cushions", seller: { name: "Anita Textiles" }, price: 899 },
] as Array<{ id: string; name: string; seller: { name: string }; price: number }>;
