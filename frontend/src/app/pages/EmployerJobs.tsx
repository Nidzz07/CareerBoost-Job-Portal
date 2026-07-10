import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Users, Pencil, Trash2, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { jobsApi } from "@/app/services/api/endpoints";
import { unwrapError } from "@/app/services/api/client";
import { PageMotion } from "../components/PageMotion";
import { ListSkeleton } from "../components/Skeletons";
import { EmptyState } from "../components/EmptyState";

export function EmployerJobsPage() {
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["my-postings"], queryFn: jobsApi.myPostings });

  const remove = useMutation({
    mutationFn: (id: string) => jobsApi.remove(id),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ["my-postings"] }); toast.success("Job deleted"); },
    onError: (e) => toast.error(unwrapError(e).message),
  });

  return (
    <PageMotion className="space-y-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">My Postings</h1>
          <p className="mt-1 text-muted-foreground">Manage your jobs and review applicants.</p>
        </div>
        <Button asChild className="rounded-full gradient-primary text-primary-foreground shrink-0">
          <Link to="/app/earn/post"><Plus className="h-4 w-4 mr-1" /> Post a job</Link>
        </Button>
      </div>

      {query.isLoading ? (
        <ListSkeleton count={4} />
      ) : !query.data || query.data.length === 0 ? (
        <EmptyState icon={Briefcase} title="No jobs posted" description="Post your first job to start hiring."
          action={<Button asChild className="rounded-full gradient-primary text-primary-foreground"><Link to="/app/earn/post">Post a job</Link></Button>} />
      ) : (
        <div className="space-y-3">
          {query.data.map((j) => (
            <Card key={j.id} className="rounded-3xl border-border bg-card p-5 flex flex-wrap items-center gap-4">
              <div className="min-w-0 flex-1">
                <div className="font-semibold line-clamp-1">{j.title}</div>
                <div className="text-xs text-muted-foreground">{j.category} · {j.location || "—"} · {j.type}</div>
              </div>
              <Badge variant="secondary" className="rounded-full gap-1"><Users className="h-3 w-3" /> {j.applicationCount} applicants</Badge>
              <div className="flex gap-2">
                <Button asChild size="sm" className="rounded-full gradient-primary text-primary-foreground">
                  <Link to={`/app/earn/${j.id}/applicants`}>Applicants</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <Link to={`/app/earn/${j.id}/edit`}><Pencil className="h-3.5 w-3.5" /></Link>
                </Button>
                <Button size="sm" variant="outline" onClick={() => remove.mutate(j.id)} disabled={remove.isPending} className="rounded-full text-destructive hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </PageMotion>
  );
}
