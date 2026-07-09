import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Search, Clock, Users, Star, Play, BookOpen, Award, Bookmark, ArrowLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { coursesApi } from "@/app/services/api/endpoints";
import { PageMotion } from "../components/PageMotion";
import { ListSkeleton, LineSkeleton } from "../components/Skeletons";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import type { Course } from "@/app/types";

const categories = ["all", "Design", "Marketing", "Finance", "Coding", "Wellness", "Craft"];

const placeholderCourses: Course[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `${i + 1}`,
  title: ["UX Fundamentals for Beginners", "Digital Marketing 101", "Financial Literacy Basics", "Introduction to Python", "Storytelling for Sellers", "Confidence & Public Speaking", "Photography with your Phone", "Baking as a Business", "Basics of Bookkeeping"][i],
  description: "An AI-curated course to help you build practical skills in your own language, at your own pace.",
  category: ["Design", "Marketing", "Finance", "Coding", "Craft", "Wellness", "Craft", "Craft", "Finance"][i],
  level: ["beginner", "beginner", "beginner", "intermediate", "beginner", "beginner", "beginner", "beginner", "beginner"][i] as Course["level"],
  duration_hours: 3 + (i % 5),
  lessons_count: 12 + i,
  rating: 4.6 + (i % 4) / 10,
  reviews_count: 200 + i * 40,
  progress: i === 0 ? 68 : i === 1 ? 24 : 0,
  mentor: { name: ["Sneha", "Priya", "Anjali", "Neha", "Meera", "Kavya", "Riya", "Ritu", "Isha"][i] + " M.", title: "AI Mentor" },
}));

export function LearnPage() {
  const { t } = useTranslation();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const query = useQuery({
    queryKey: ["courses", q, cat],
    queryFn: () => coursesApi.list({ q, category: cat === "all" ? undefined : cat }),
  });

  const courses = query.data?.items ?? placeholderCourses;
  const filtered = courses.filter((c) => {
    const matchesQ = !q || c.title.toLowerCase().includes(q.toLowerCase());
    const matchesC = cat === "all" || c.category === cat;
    return matchesQ && matchesC;
  });

  return (
    <PageMotion className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("learn.title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("learn.subtitle")}</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("learn.search")}
            className="pl-11 h-12 rounded-full bg-card"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              cat === c ? "gradient-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {c === "all" ? t("learn.all") : c}
          </button>
        ))}
      </div>

      {query.isLoading ? (
        <ListSkeleton count={6} />
      ) : query.isError && !courses.length ? (
        <ErrorState onRetry={() => query.refetch()} />
      ) : filtered.length === 0 ? (
        <EmptyState icon={BookOpen} title={t("learn.empty")} description="Try a different search or category." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 6) * 0.05 }}
            >
              <CourseCard course={c} />
            </motion.div>
          ))}
        </div>
      )}
    </PageMotion>
  );
}

function CourseCard({ course }: { course: Course }) {
  const { t } = useTranslation();
  return (
    <Link to={`/app/learn/${course.id}`}>
      <Card className="overflow-hidden rounded-3xl border-border bg-card hover-lift h-full">
        <div className="relative aspect-video gradient-primary">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" />
          <button
            aria-label="Bookmark"
            className="absolute top-3 right-3 rounded-full p-2 bg-card/40 backdrop-blur text-white hover:bg-card/60"
            onClick={(e) => { e.preventDefault(); }}
          >
            <Bookmark className="h-4 w-4" />
          </button>
          <Badge className="absolute bottom-3 left-3 rounded-full bg-card/80 text-foreground backdrop-blur">
            {course.level}
          </Badge>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-full text-xs">{course.category}</Badge>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-warning text-warning" /> {course.rating.toFixed(1)}
            </span>
          </div>
          <h3 className="mt-3 font-semibold line-clamp-2">{course.title}</h3>
          <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration_hours}h</span>
            <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {course.lessons_count} {t("learn.lessons")}</span>
          </div>
          {course.progress ? (
            <>
              <Progress value={course.progress} className="mt-4 h-1.5" />
              <div className="mt-2 flex justify-between text-xs">
                <span className="text-muted-foreground">{course.progress}%</span>
                <span className="text-primary font-medium">{t("learn.continue")}</span>
              </div>
            </>
          ) : (
            <Button size="sm" className="mt-4 w-full rounded-full gradient-primary text-primary-foreground">
              {t("learn.enroll")}
            </Button>
          )}
        </div>
      </Card>
    </Link>
  );
}

export function CourseDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const query = useQuery({
    queryKey: ["course", id],
    queryFn: () => coursesApi.get(id!),
    enabled: !!id,
  });

  const course = query.data ?? placeholderCourses.find((c) => c.id === id) ?? placeholderCourses[0];

  return (
    <PageMotion className="space-y-8">
      <Link to="/app/learn" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> {t("common.back")}
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {/* Video/hero */}
          <Card className="overflow-hidden rounded-3xl border-border bg-card">
            <div className="relative aspect-video gradient-primary">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" />
              <button className="absolute inset-0 grid place-items-center group">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-card/90 shadow-glow group-hover:scale-110 transition-transform">
                  <Play className="h-8 w-8 fill-primary text-primary translate-x-0.5" />
                </div>
              </button>
            </div>
          </Card>

          <div>
            <Badge variant="secondary" className="rounded-full">{course.category}</Badge>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">{course.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-warning text-warning" /> {course.rating.toFixed(1)} ({course.reviews_count})</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {course.reviews_count} learners</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.duration_hours}h</span>
            </div>
          </div>

          <Tabs defaultValue="about">
            <TabsList className="rounded-full">
              <TabsTrigger value="about" className="rounded-full">{t("learn.about_course")}</TabsTrigger>
              <TabsTrigger value="syllabus" className="rounded-full">{t("learn.syllabus")}</TabsTrigger>
              <TabsTrigger value="discussion" className="rounded-full">{t("learn.discussion")}</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-full">{t("learn.reviews")}</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="mt-6 space-y-4">
              {query.isLoading ? <LineSkeleton lines={5} /> : (
                <p className="leading-relaxed text-muted-foreground">
                  {course.description} You'll learn practical, project-based skills to help you land your first real opportunity. Every lesson is short, in your language, and reviewed by industry mentors.
                </p>
              )}
            </TabsContent>
            <TabsContent value="syllabus" className="mt-6 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary text-sm font-semibold">{i + 1}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Lesson {i + 1}: Foundations</div>
                    <div className="text-xs text-muted-foreground">12 min · Video + Reading</div>
                  </div>
                  <Play className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </TabsContent>
            <TabsContent value="discussion" className="mt-6">
              <EmptyState title="Be the first to start a thread." description="Ask a question or share what you're building." />
            </TabsContent>
            <TabsContent value="reviews" className="mt-6 space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-warning text-warning" />)}
                  </div>
                  <p className="mt-2 text-sm">Absolutely loved this. It felt like a mentor was walking me through everything.</p>
                  <div className="mt-3 text-xs text-muted-foreground">— Learner {i + 1}</div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <Card className="rounded-3xl border-border bg-card p-6 sticky top-24">
            <div className="text-3xl font-bold">Free</div>
            <p className="text-xs text-muted-foreground">Includes certificate on completion</p>
            <Button className="mt-6 w-full rounded-full gradient-primary text-primary-foreground shadow-md hover:shadow-glow">
              {course.progress ? t("learn.continue") : t("learn.enroll")}
            </Button>
            <Button variant="outline" className="mt-2 w-full rounded-full">
              <Bookmark className="h-4 w-4 mr-1" /> Save for later
            </Button>
            <div className="mt-6 border-t border-border pt-6 space-y-3 text-sm">
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /> {course.duration_hours}h of content</div>
              <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-muted-foreground" /> {course.lessons_count} lessons</div>
              <div className="flex items-center gap-2"><Award className="h-4 w-4 text-muted-foreground" /> Certificate on completion</div>
            </div>
          </Card>

          <Card className="rounded-3xl border-border bg-card p-6">
            <h4 className="text-sm font-semibold mb-3">{t("learn.mentor")}</h4>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-bold">
                  {course.mentor.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-semibold">{course.mentor.name}</div>
                <div className="text-xs text-muted-foreground">{course.mentor.title}</div>
              </div>
            </div>
          </Card>
        </aside>
      </div>
    </PageMotion>
  );
}
