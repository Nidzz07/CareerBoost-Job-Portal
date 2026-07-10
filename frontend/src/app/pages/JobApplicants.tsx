import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Check, X, UserCheck, CalendarPlus, FileText, Star, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { jobsApi, resumeApi, type Applicant } from "@/app/services/api/endpoints";
import { unwrapError } from "@/app/services/api/client";
import { PageMotion } from "../components/PageMotion";
import { ListSkeleton } from "../components/Skeletons";
import { EmptyState } from "../components/EmptyState";

const STATUS_TINT: Record<string, string> = {
  PENDING: "bg-warning/15 text-warning",
  SHORTLISTED: "bg-primary/15 text-primary",
  HIRED: "bg-accent/15 text-accent",
  REJECTED: "bg-destructive/15 text-destructive",
};

export function JobApplicantsPage() {
  const { id: jobId } = useParams();
  const query = useQuery({ queryKey: ["applicants", jobId], queryFn: () => jobsApi.applicants(jobId!), enabled: !!jobId });

  return (
    <PageMotion className="space-y-8">
      <Link to="/app/earn/manage" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> My postings
      </Link>
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Applicants</h1>
        <p className="mt-1 text-muted-foreground">Review candidates, schedule interviews and make decisions.</p>
      </div>

      {query.isLoading ? (
        <ListSkeleton count={4} />
      ) : !query.data || query.data.length === 0 ? (
        <EmptyState icon={UserCheck} title="No applicants yet" description="Applications will appear here as candidates apply." />
      ) : (
        <div className="space-y-3">
          {query.data.map((a) => <ApplicantRow key={a.id} jobId={jobId!} applicant={a} />)}
        </div>
      )}
    </PageMotion>
  );
}

function ApplicantRow({ jobId, applicant }: { jobId: string; applicant: Applicant }) {
  const qc = useQueryClient();
  const [showInterview, setShowInterview] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [interview, setInterview] = useState({ scheduledAt: "", mode: "ONLINE", location: "" });
  const [review, setReview] = useState({ rating: 5, comment: "" });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["applicants", jobId] });

  const status = useMutation({
    mutationFn: (s: string) => jobsApi.setApplicationStatus(applicant.id, s),
    onSuccess: () => { void invalidate(); toast.success("Status updated"); },
    onError: (e) => toast.error(unwrapError(e).message),
  });
  const schedule = useMutation({
    mutationFn: () => jobsApi.scheduleInterview(applicant.id, {
      scheduledAt: new Date(interview.scheduledAt).toISOString(),
      mode: interview.mode,
      location: interview.location || undefined,
    }),
    onSuccess: () => { void invalidate(); setShowInterview(false); toast.success("Interview scheduled"); },
    onError: (e) => toast.error(unwrapError(e).message),
  });
  const submitReview = useMutation({
    mutationFn: () => jobsApi.addReview(jobId, { revieweeId: applicant.user.id, rating: review.rating, comment: review.comment || undefined }),
    onSuccess: () => { setShowReview(false); toast.success("Review submitted"); },
    onError: (e) => toast.error(unwrapError(e).message),
  });
  const resumeQuery = useQuery({ queryKey: ["resume", applicant.user.id], queryFn: () => resumeApi.byUser(applicant.user.id), enabled: showResume });

  return (
    <Card className="rounded-3xl border-border bg-card p-5 space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="font-semibold">{applicant.user.name}</div>
          <div className="text-xs text-muted-foreground">{applicant.user.location || "—"} · applied {new Date(applicant.appliedAt).toLocaleDateString()}</div>
        </div>
        <Badge className={`rounded-full text-xs ${STATUS_TINT[applicant.status] ?? "bg-muted text-muted-foreground"}`}>{applicant.status}</Badge>
      </div>

      {applicant.coverNote && <p className="text-sm text-muted-foreground">“{applicant.coverNote}”</p>}

      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => status.mutate("SHORTLISTED")} disabled={status.isPending} className="rounded-full">
          <Check className="h-3.5 w-3.5 mr-1" /> Shortlist
        </Button>
        <Button size="sm" onClick={() => status.mutate("HIRED")} disabled={status.isPending} className="rounded-full gradient-primary text-primary-foreground">
          <UserCheck className="h-3.5 w-3.5 mr-1" /> Hire
        </Button>
        <Button size="sm" variant="outline" onClick={() => status.mutate("REJECTED")} disabled={status.isPending} className="rounded-full text-destructive hover:text-destructive">
          <X className="h-3.5 w-3.5 mr-1" /> Reject
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setShowInterview((s) => !s)} className="rounded-full"><CalendarPlus className="h-3.5 w-3.5 mr-1" /> Interview</Button>
        <Button size="sm" variant="ghost" onClick={() => setShowResume((s) => !s)} className="rounded-full"><FileText className="h-3.5 w-3.5 mr-1" /> Resume</Button>
        {applicant.status === "HIRED" && (
          <Button size="sm" variant="ghost" onClick={() => setShowReview((s) => !s)} className="rounded-full"><Star className="h-3.5 w-3.5 mr-1" /> Review</Button>
        )}
      </div>

      {showInterview && (
        <div className="rounded-2xl border border-border p-4 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto]">
          <Input type="datetime-local" value={interview.scheduledAt} onChange={(e) => setInterview({ ...interview, scheduledAt: e.target.value })} className="rounded-xl h-10" />
          <select value={interview.mode} onChange={(e) => setInterview({ ...interview, mode: e.target.value })} className="rounded-xl h-10 border border-border bg-background px-3 text-sm">
            <option value="ONLINE">Online</option>
            <option value="IN_PERSON">In person</option>
            <option value="PHONE">Phone</option>
          </select>
          <Input value={interview.location} onChange={(e) => setInterview({ ...interview, location: e.target.value })} placeholder="Link / address" className="rounded-xl h-10" />
          <Button size="sm" onClick={() => schedule.mutate()} disabled={!interview.scheduledAt || schedule.isPending} className="rounded-full gradient-primary text-primary-foreground">
            {schedule.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Schedule"}
          </Button>
        </div>
      )}

      {showResume && (
        <div className="rounded-2xl border border-border p-4 text-sm">
          {resumeQuery.isLoading ? (
            "Loading resume…"
          ) : !resumeQuery.data ? (
            <span className="text-muted-foreground">This candidate hasn't created a resume yet.</span>
          ) : (
            <div className="space-y-2">
              {resumeQuery.data.bio && <p className="text-muted-foreground">{resumeQuery.data.bio}</p>}
              {resumeQuery.data.skills && resumeQuery.data.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {resumeQuery.data.skills.map((s) => <Badge key={s} variant="secondary" className="rounded-full text-xs">{s}</Badge>)}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {showReview && (
        <div className="rounded-2xl border border-border p-4 space-y-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setReview({ ...review, rating: n })}>
                <Star className={`h-5 w-5 ${n <= review.rating ? "fill-warning text-warning" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
          <Textarea value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} rows={2} placeholder="How was working with this candidate?" className="rounded-2xl" />
          <Button size="sm" onClick={() => submitReview.mutate()} disabled={submitReview.isPending} className="rounded-full gradient-primary text-primary-foreground">
            {submitReview.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit review"}
          </Button>
        </div>
      )}
    </Card>
  );
}
