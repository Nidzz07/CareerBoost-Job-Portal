import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Search, GraduationCap, Briefcase, Store, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { coursesApi, jobsApi, productsApi } from "@/app/services/api/endpoints";
import { useDebouncedValue } from "@/app/lib/useDebouncedValue";
import { PageMotion } from "../components/PageMotion";
import { ListSkeleton } from "../components/Skeletons";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import type { Course, Job, Product } from "@/app/types";

type Scope = "all" | "courses" | "jobs" | "products";
const MIN_CHARS = 2;

/**
 * Global search results (Phase 6). A single page that searches Courses, Jobs and
 * Products at once, reusing the existing module list endpoints — each of which already
 * ranks results server-side via the ML search service. No new backend or ML code.
 */
export function SearchResultsPage() {
  const { t } = useTranslation();
  const [params, setParams] = useSearchParams();
  const [input, setInput] = useState(params.get("q") ?? "");
  const [scope, setScope] = useState<Scope>("all");

  const debounced = useDebouncedValue(input, 350);
  const term = debounced.trim();
  const active = term.length >= MIN_CHARS;

  // Tracks the last term WE wrote to the URL, so we can tell our own writes apart from
  // external navigation (e.g. submitting the global header search while already here).
  const lastWritten = useRef(params.get("q") ?? "");

  // Keep the URL in sync with the debounced term so results are shareable/bookmarkable.
  useEffect(() => {
    const current = params.get("q") ?? "";
    if (term !== current) {
      lastWritten.current = term;
      setParams(term ? { q: term } : {}, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  // Adopt external URL changes (header search on this same route) without clobbering typing.
  useEffect(() => {
    const urlQ = params.get("q") ?? "";
    if (urlQ !== lastWritten.current) {
      lastWritten.current = urlQ;
      setInput(urlQ);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const wants = (s: Scope) => scope === "all" || scope === s;

  const coursesQ = useQuery({
    queryKey: ["search-courses", term],
    queryFn: () => coursesApi.list({ q: term }),
    enabled: active && wants("courses"),
  });
  const jobsQ = useQuery({
    queryKey: ["search-jobs", term],
    queryFn: () => jobsApi.list({ q: term }),
    enabled: active && wants("jobs"),
  });
  const productsQ = useQuery({
    queryKey: ["search-products", term],
    queryFn: () => productsApi.list({ q: term }),
    enabled: active && wants("products"),
  });

  const counts = {
    courses: coursesQ.data?.items.length ?? 0,
    jobs: jobsQ.data?.items.length ?? 0,
    products: productsQ.data?.items.length ?? 0,
  };
  const totalResults = counts.courses + counts.jobs + counts.products;

  const scopes: Array<{ key: Scope; label: string }> = [
    { key: "all", label: t("search.all") },
    { key: "courses", label: t("search.courses") },
    { key: "jobs", label: t("search.jobs") },
    { key: "products", label: t("search.products") },
  ];

  return (
    <PageMotion className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("search.title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("search.subtitle")}</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("search.placeholder")}
          className="pl-11 h-12 rounded-full bg-card"
          aria-label={t("search.placeholder")}
        />
      </div>

      {/* Unified scope filter */}
      <div className="flex flex-wrap gap-2">
        {scopes.map((s) => (
          <button
            key={s.key}
            onClick={() => setScope(s.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              scope === s.key ? "gradient-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {!active ? (
        <EmptyState icon={Search} title={t("search.prompt")} />
      ) : active && !coursesQ.isLoading && !jobsQ.isLoading && !productsQ.isLoading && totalResults === 0 ? (
        <EmptyState icon={Search} title={t("search.empty")} description={t("search.empty_sub")} />
      ) : (
        <div className="space-y-10">
          {wants("courses") && (
            <SearchGroup icon={GraduationCap} title={t("search.courses")} count={counts.courses} query={coursesQ} emptyLabel={t("search.no_courses")}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(coursesQ.data?.items ?? []).map((c) => <CourseResult key={c.id} course={c} />)}
              </div>
            </SearchGroup>
          )}
          {wants("jobs") && (
            <SearchGroup icon={Briefcase} title={t("search.jobs")} count={counts.jobs} query={jobsQ} emptyLabel={t("search.no_jobs")}>
              <div className="grid gap-3 md:grid-cols-2">
                {(jobsQ.data?.items ?? []).map((j) => <JobResult key={j.id} job={j} />)}
              </div>
            </SearchGroup>
          )}
          {wants("products") && (
            <SearchGroup icon={Store} title={t("search.products")} count={counts.products} query={productsQ} emptyLabel={t("search.no_products")}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {(productsQ.data?.items ?? []).map((p) => <ProductResult key={p.id} product={p} />)}
              </div>
            </SearchGroup>
          )}
        </div>
      )}
    </PageMotion>
  );
}

interface GroupQuery {
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  data?: { items: unknown[] };
}

function SearchGroup({
  icon: Icon, title, count, query, emptyLabel, children,
}: {
  icon: typeof GraduationCap; title: string; count: number; query: GroupQuery; emptyLabel: string; children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">{title}</h2>
        {!query.isLoading && !query.isError && <Badge variant="secondary" className="rounded-full">{count}</Badge>}
      </div>
      {query.isLoading ? (
        <ListSkeleton count={3} />
      ) : query.isError ? (
        <ErrorState onRetry={() => query.refetch()} />
      ) : (query.data?.items ?? []).length === 0 ? (
        <EmptyState title={emptyLabel} />
      ) : (
        children
      )}
    </section>
  );
}

function CourseResult({ course }: { course: Course }) {
  return (
    <Card className="overflow-hidden rounded-3xl border-border bg-card hover-lift">
      <Link to={`/app/learn/${course.id}`}>
        <div className="aspect-video gradient-primary relative">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,white,transparent_50%)]" />
        </div>
        <div className="p-4">
          <Badge variant="secondary" className="rounded-full text-xs">{course.category}</Badge>
          <div className="mt-2 font-semibold line-clamp-2">{course.title}</div>
          <div className="mt-1 text-xs text-muted-foreground capitalize">{course.level}{course.price ? ` · ₹${course.price}` : " · Free"}</div>
        </div>
      </Link>
    </Card>
  );
}

function JobResult({ job }: { job: Job }) {
  return (
    <Link to={`/app/earn/${job.id}`} className="block">
      <Card className="rounded-3xl border-border bg-card p-4 flex items-center gap-3 hover:border-primary/50 transition-colors">
        <Avatar className="h-11 w-11 shrink-0 rounded-2xl">
          <AvatarFallback className="rounded-2xl gradient-primary text-primary-foreground text-xs font-bold">
            {job.company.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="font-semibold truncate">{job.title}</div>
          <div className="text-xs text-muted-foreground truncate flex items-center gap-1">
            {job.company.name} · <MapPin className="h-3 w-3" /> {job.location || "—"} {job.remote && "· Remote"}
          </div>
        </div>
        <Badge variant="secondary" className="rounded-full text-xs shrink-0">{job.type}</Badge>
      </Card>
    </Link>
  );
}

function ProductResult({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden rounded-3xl border-border bg-card hover-lift">
      <Link to={`/app/flourish/${product.id}`}>
        <div className="aspect-square gradient-aurora overflow-hidden">
          {product.images?.[0] && <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />}
        </div>
        <div className="p-4">
          <div className="text-sm font-semibold truncate">{product.name}</div>
          <div className="text-xs text-muted-foreground truncate">{product.seller.name}</div>
          <div className="mt-2 font-bold">₹{product.price}</div>
        </div>
      </Link>
    </Card>
  );
}
