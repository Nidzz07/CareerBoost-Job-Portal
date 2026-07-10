import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Search, MapPin, Briefcase, Clock, Bookmark, BookmarkCheck,
  Building2, ArrowLeft, ArrowUpRight, Check, Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { jobsApi } from "@/app/services/api/endpoints";
import { unwrapError } from "@/app/services/api/client";
import { useAuthStore } from "@/app/store/auth";
import { PageMotion } from "../components/PageMotion";
import { ListSkeleton } from "../components/Skeletons";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import type { Job } from "@/app/types";

export function EarnPage() {
  const { t } = useTranslation();
  const authed = useAuthStore((s) => s.status === "authenticated");
  const [q, setQ] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [type, setType] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ["jobs", q, remoteOnly, type],
    queryFn: () => jobsApi.list({ q, remote: remoteOnly || undefined, type: type ?? undefined }),
  });
  const savedQuery = useQuery({ queryKey: ["saved-jobs"], queryFn: jobsApi.saved, enabled: authed });
  const savedIds = new Set((savedQuery.data ?? []).map((j) => j.id));

  // Text relevance is ranked server-side by the ML search service (query `q` is sent
  // to the backend); the client only applies the exact-match facets.
  const jobs = query.data?.items ?? [];
  const filtered = jobs.filter((j) => {
    if (remoteOnly && !j.remote) return false;
    if (type && j.type !== type) return false;
    return true;
  });

  return (
    <PageMotion className="space-y-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("earn.title")}</h1>
          <p className="mt-1 text-muted-foreground">{t("earn.subtitle")}</p>
        </div>
        <Button asChild variant="outline" className="rounded-full shrink-0">
          <Link to="/app/earn/mine">My Jobs</Link>
        </Button>
      </div>

      <Card className="rounded-3xl border-border bg-card p-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("earn.search")} className="pl-11 h-12 rounded-full bg-background" />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox checked={remoteOnly} onCheckedChange={(v) => setRemoteOnly(!!v)} />
            {t("earn.remote")}
          </label>
          <div className="flex flex-wrap gap-2">
            {(["full-time", "part-time", "contract", "gig", "internship"] as const).map((tp) => (
              <button
                key={tp}
                onClick={() => setType(type === tp ? null : tp)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  type === tp ? "gradient-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {tp}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {query.isLoading ? <ListSkeleton count={6} /> :
       query.isError && !jobs.length ? <ErrorState onRetry={() => query.refetch()} /> :
       filtered.length === 0 ? <EmptyState icon={Briefcase} title={t("earn.empty")} /> : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((j, i) => (
            <motion.div key={j.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i % 6) * 0.04 }}>
              <JobCard job={j} isSaved={savedIds.has(j.id)} />
            </motion.div>
          ))}
        </div>
      )}
    </PageMotion>
  );
}

function JobCard({ job, isSaved = false }: { job: Job; isSaved?: boolean }) {
  const { t } = useTranslation();
  const qc = useQueryClient();
  const [saved, setSaved] = useState(isSaved);
  useEffect(() => setSaved(isSaved), [isSaved]);

  const toggleSave = useMutation({
    mutationFn: () => (saved ? jobsApi.unsave(job.id) : jobsApi.save(job.id)),
    onMutate: () => setSaved((s) => !s),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["saved-jobs"] }),
    onError: (e) => { setSaved((s) => !s); toast.error(unwrapError(e).message); },
  });

  return (
    <Card className="group rounded-3xl border-border bg-card p-5 hover-lift h-full">
      <div className="flex items-start gap-3">
        <Avatar className="h-12 w-12 shrink-0 rounded-2xl">
          <AvatarFallback className="rounded-2xl gradient-primary text-primary-foreground text-xs font-bold">
            {job.company.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link to={`/app/earn/${job.id}`} className="font-semibold hover:text-primary transition-colors line-clamp-1">{job.title}</Link>
              <div className="text-sm text-muted-foreground truncate">{job.company.name}</div>
            </div>
            <button
              aria-label="Save"
              onClick={() => toggleSave.mutate()}
              className="rounded-full p-2 hover:bg-muted transition-colors"
            >
              {saved ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4 text-muted-foreground" />}
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Badge variant="secondary" className="rounded-full gap-1"><MapPin className="h-3 w-3" /> {job.location}</Badge>
            {job.remote && <Badge variant="secondary" className="rounded-full bg-accent/15 text-accent">Remote</Badge>}
            <Badge variant="secondary" className="rounded-full">{job.type}</Badge>
          </div>
          {job.salary_min && (
            <div className="mt-3 text-sm font-semibold">₹{job.salary_min.toLocaleString()} — ₹{job.salary_max?.toLocaleString()}<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
          )}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> Posted today</span>
            <Button asChild size="sm" className="rounded-full gradient-primary text-primary-foreground shadow-sm">
              <Link to={`/app/earn/${job.id}`}>{t("earn.apply")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function JobDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const qc = useQueryClient();
  const authed = useAuthStore((s) => s.status === "authenticated");
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  const query = useQuery({ queryKey: ["job", id], queryFn: () => jobsApi.get(id!), enabled: !!id });
  const matchQuery = useQuery({ queryKey: ["job-match", id], queryFn: () => jobsApi.match(id!), enabled: !!id && authed });
  const savedQuery = useQuery({ queryKey: ["saved-jobs"], queryFn: jobsApi.saved, enabled: authed });

  useEffect(() => {
    if (savedQuery.data && id) setSaved(savedQuery.data.some((j) => j.id === id));
  }, [savedQuery.data, id]);

  const mutation = useMutation({
    mutationFn: (note: string) => jobsApi.apply(id!, { note }),
    onSuccess: () => { setApplied(true); toast.success("Application submitted 🎉"); },
    onError: (e) => toast.error(unwrapError(e).message),
  });
  const saveMutation = useMutation({
    mutationFn: () => (saved ? jobsApi.unsave(id!) : jobsApi.save(id!)),
    onMutate: () => setSaved((s) => !s),
    onSuccess: () => void qc.invalidateQueries({ queryKey: ["saved-jobs"] }),
    onError: (e) => { setSaved((s) => !s); toast.error(unwrapError(e).message); },
  });

  if (query.isLoading) {
    return (
      <PageMotion className="space-y-6">
        <ListSkeleton count={4} />
      </PageMotion>
    );
  }
  if (query.isError || !query.data) {
    return (
      <PageMotion className="space-y-6">
        <ErrorState onRetry={() => query.refetch()} />
      </PageMotion>
    );
  }
  const job = query.data;

  return (
    <PageMotion className="space-y-8">
      <Link to="/app/earn" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> {t("common.back")}
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div>
            <Avatar className="h-16 w-16 rounded-3xl mb-4">
              <AvatarFallback className="rounded-3xl gradient-primary text-primary-foreground font-bold">
                {job.company.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{job.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Building2 className="h-4 w-4" /> {job.company.name}</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {job.location}</span>
              {job.remote && <Badge className="rounded-full bg-accent/15 text-accent">Remote</Badge>}
            </div>
          </div>

          <Card className="rounded-3xl border-border bg-card p-6">
            <h3 className="font-semibold">{t("earn.about_role")}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {job.description || "No description provided for this role."}
            </p>
          </Card>

          <Card className="rounded-3xl border-border bg-card p-6">
            <h3 className="font-semibold">{t("earn.responsibilities")}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {["Design flows and wireframes for new product areas", "Collaborate with mentors weekly", "Contribute to our design system", "Present ideas to a supportive team"].map((r) => (
                <li key={r} className="flex gap-2"><Check className="h-4 w-4 text-accent shrink-0 mt-0.5" /> {r}</li>
              ))}
            </ul>
          </Card>

          <Card className="rounded-3xl border-border bg-card p-6">
            <h3 className="font-semibold">{t("earn.requirements")}</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {["0–2 years of experience", "Familiar with Figma or similar", "Curious, kind and collaborative"].map((r) => (
                <li key={r} className="flex gap-2"><Check className="h-4 w-4 text-accent shrink-0 mt-0.5" /> {r}</li>
              ))}
            </ul>
          </Card>
        </div>

        <aside>
          <Card className="rounded-3xl border-border bg-card p-6 sticky top-24">
            {job.salary_min && (
              <>
                <div className="text-xs text-muted-foreground">{t("earn.salary")}</div>
                <div className="text-2xl font-bold">₹{job.salary_min.toLocaleString()} — ₹{job.salary_max?.toLocaleString()}</div>
              </>
            )}
            {matchQuery.data && (
              <div className="mt-4 rounded-2xl border border-border p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4 text-primary" /> Your match
                </div>
                {matchQuery.data.hasSkills ? (
                  <>
                    <div className="mt-1 text-2xl font-bold text-primary">{matchQuery.data.matchPercent}%</div>
                    {matchQuery.data.matchedSkills.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {matchQuery.data.matchedSkills.slice(0, 6).map((s) => (
                          <Badge key={s} variant="secondary" className="rounded-full text-xs">{s}</Badge>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-xs text-muted-foreground">Add skills to your resume to see your match score.</p>
                )}
              </div>
            )}
            {applied ? (
              <div className="mt-6 rounded-2xl bg-accent/10 text-accent p-4 text-sm flex items-center gap-2">
                <Check className="h-4 w-4" /> Applied — we'll notify the employer.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const note = (e.currentTarget.elements.namedItem("note") as HTMLTextAreaElement | null)?.value ?? "";
                  mutation.mutate(note);
                }}
                className="mt-6 space-y-3"
              >
                <Label htmlFor="note" className="text-xs">Short note (optional)</Label>
                <Textarea id="note" name="note" rows={3} placeholder="Tell them why you'd be great…" className="rounded-2xl" />
                <Button type="submit" disabled={mutation.isPending} className="w-full rounded-full gradient-primary text-primary-foreground shadow hover:shadow-glow">
                  {mutation.isPending ? "Applying…" : t("earn.apply")} <ArrowUpRight className="h-4 w-4 ml-1" />
                </Button>
              </form>
            )}
            <Button variant="outline" onClick={() => saveMutation.mutate()} disabled={!authed} className="mt-2 w-full rounded-full">
              {saved ? <BookmarkCheck className="h-4 w-4 mr-1 text-primary" /> : <Bookmark className="h-4 w-4 mr-1" />}
              {saved ? "Saved" : t("earn.save")}
            </Button>
          </Card>
        </aside>
      </div>
    </PageMotion>
  );
}
