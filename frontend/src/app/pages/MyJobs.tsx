import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Briefcase, Bookmark, CalendarClock, MapPin, Video, Loader2, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { jobsApi } from "@/app/services/api/endpoints";
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

export function MyJobsPage() {
  const qc = useQueryClient();
  const applications = useQuery({ queryKey: ["my-applications"], queryFn: jobsApi.myApplications });
  const saved = useQuery({ queryKey: ["saved-jobs"], queryFn: jobsApi.saved });
  const interviews = useQuery({ queryKey: ["my-interviews"], queryFn: jobsApi.myInterviews });

  const withdraw = useMutation({
    mutationFn: (id: string) => jobsApi.withdraw(id),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ["my-applications"] }); toast.success("Application withdrawn"); },
    onError: (e) => toast.error(unwrapError(e).message),
  });
  const unsave = useMutation({
    mutationFn: (id: string) => jobsApi.unsave(id),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ["saved-jobs"] }); toast.success("Removed from saved"); },
    onError: (e) => toast.error(unwrapError(e).message),
  });

  return (
    <PageMotion className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">My Jobs</h1>
        <p className="mt-1 text-muted-foreground">Track your applications, saved jobs and interviews.</p>
      </div>

      <Tabs defaultValue="applications">
        <TabsList className="rounded-full">
          <TabsTrigger value="applications" className="rounded-full">Applications</TabsTrigger>
          <TabsTrigger value="saved" className="rounded-full">Saved</TabsTrigger>
          <TabsTrigger value="interviews" className="rounded-full">Interviews</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="mt-6">
          {applications.isLoading ? (
            <ListSkeleton count={4} />
          ) : !applications.data || applications.data.length === 0 ? (
            <EmptyState icon={Briefcase} title="No applications yet" description="Apply to jobs to track them here."
              action={<Button asChild className="rounded-full gradient-primary text-primary-foreground"><Link to="/app/earn">Browse jobs</Link></Button>} />
          ) : (
            <div className="space-y-3">
              {applications.data.map((a) => (
                <Card key={a.id} className="rounded-3xl border-border bg-card p-5 flex items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <Link to={`/app/earn/${a.job.id}`} className="font-semibold hover:text-primary line-clamp-1">{a.job.title}</Link>
                    <div className="text-xs text-muted-foreground">{a.job.company.name} · applied {new Date(a.appliedAt).toLocaleDateString()}</div>
                  </div>
                  <Badge className={`rounded-full text-xs ${STATUS_TINT[a.status] ?? "bg-muted text-muted-foreground"}`}>{a.status}</Badge>
                  {a.status !== "HIRED" && (
                    <Button size="sm" variant="ghost" onClick={() => withdraw.mutate(a.id)} disabled={withdraw.isPending} className="rounded-full text-destructive hover:text-destructive">
                      <X className="h-3.5 w-3.5 mr-1" /> Withdraw
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          {saved.isLoading ? (
            <ListSkeleton count={4} />
          ) : !saved.data || saved.data.length === 0 ? (
            <EmptyState icon={Bookmark} title="No saved jobs" description="Bookmark jobs to revisit them later." />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {saved.data.map((j) => (
                <Card key={j.id} className="rounded-3xl border-border bg-card p-5">
                  <Link to={`/app/earn/${j.id}`} className="font-semibold hover:text-primary line-clamp-1">{j.title}</Link>
                  <div className="text-xs text-muted-foreground">{j.company.name} · {j.location}</div>
                  <div className="mt-3 flex gap-2">
                    <Button asChild size="sm" className="rounded-full gradient-primary text-primary-foreground"><Link to={`/app/earn/${j.id}`}>View</Link></Button>
                    <Button size="sm" variant="outline" onClick={() => unsave.mutate(j.id)} className="rounded-full">Remove</Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="interviews" className="mt-6">
          {interviews.isLoading ? (
            <ListSkeleton count={3} />
          ) : !interviews.data || interviews.data.length === 0 ? (
            <EmptyState icon={CalendarClock} title="No interviews scheduled" description="Shortlisted applications will show interview details here." />
          ) : (
            <div className="space-y-3">
              {interviews.data.map((iv) => (
                <Card key={iv.id} className="rounded-3xl border-border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{iv.job.title}</div>
                    <Badge className="rounded-full text-xs bg-primary/15 text-primary">{iv.status}</Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><CalendarClock className="h-4 w-4" /> {new Date(iv.scheduledAt).toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Video className="h-4 w-4" /> {iv.mode}</span>
                    {iv.location && <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {iv.location}</span>}
                  </div>
                  {iv.notes && <p className="mt-2 text-sm">{iv.notes}</p>}
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </PageMotion>
  );
}
