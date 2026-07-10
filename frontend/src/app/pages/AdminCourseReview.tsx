import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, X, Loader2, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { coursesApi } from "@/app/services/api/endpoints";
import { unwrapError } from "@/app/services/api/client";
import { PageMotion } from "../components/PageMotion";
import { ListSkeleton } from "../components/Skeletons";
import { EmptyState } from "../components/EmptyState";

export function AdminCourseReviewPage() {
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["pending-courses"], queryFn: coursesApi.pending });
  const [reasons, setReasons] = useState<Record<string, string>>({});

  const review = useMutation({
    mutationFn: (vars: { id: string; approve: boolean; rejectionReason?: string }) =>
      coursesApi.review(vars.id, { approve: vars.approve, rejectionReason: vars.rejectionReason }),
    onSuccess: (_data, vars) => {
      void qc.invalidateQueries({ queryKey: ["pending-courses"] });
      toast.success(vars.approve ? "Course approved" : "Course rejected");
    },
    onError: (e) => toast.error(unwrapError(e).message),
  });

  return (
    <PageMotion className="space-y-8">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Course Review Queue</h1>
          <p className="mt-1 text-muted-foreground">Approve or reject submitted courses.</p>
        </div>
      </div>

      {query.isLoading ? (
        <ListSkeleton count={4} />
      ) : !query.data || query.data.length === 0 ? (
        <EmptyState icon={Check} title="All caught up" description="No courses are waiting for review." />
      ) : (
        <div className="space-y-4">
          {query.data.map((c) => (
            <Card key={c.id} className="rounded-3xl border-border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <Badge variant="secondary" className="rounded-full text-xs">{c.category}</Badge>
                  <h3 className="mt-2 font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{c.description || "No description."}</p>
                  <div className="mt-1 text-xs text-muted-foreground">{c.level} · {c.language} · {c.price ? `₹${c.price}` : "Free"}</div>
                </div>
                <Badge className="rounded-full bg-warning/15 text-warning text-xs">PENDING</Badge>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:items-center">
                <Input
                  value={reasons[c.id] ?? ""}
                  onChange={(e) => setReasons((prev) => ({ ...prev, [c.id]: e.target.value }))}
                  placeholder="Rejection reason (optional)"
                  className="rounded-full h-10 flex-1"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => review.mutate({ id: c.id, approve: true })}
                    disabled={review.isPending}
                    className="rounded-full gradient-primary text-primary-foreground"
                  >
                    {review.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Check className="h-4 w-4 mr-1" /> Approve</>}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => review.mutate({ id: c.id, approve: false, rejectionReason: reasons[c.id] })}
                    disabled={review.isPending}
                    className="rounded-full text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4 mr-1" /> Reject
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </PageMotion>
  );
}
