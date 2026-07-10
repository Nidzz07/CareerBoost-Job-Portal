import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Star, ShieldCheck, ShieldAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { coursesApi } from "@/app/services/api/endpoints";
import { unwrapError } from "@/app/services/api/client";
import { LineSkeleton } from "./Skeletons";
import { EmptyState } from "./EmptyState";

/**
 * Course reviews (Phase 2): lists reviews with the ML sentiment/trust summary and,
 * for enrolled learners, a submission form. Reusable across the Learn module.
 */
export function CourseReviews({ courseId, canReview }: { courseId: string; canReview: boolean }) {
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["course-reviews", courseId], queryFn: () => coursesApi.reviews(courseId) });
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const mutation = useMutation({
    mutationFn: () => coursesApi.addReview(courseId, { rating, comment: comment.trim() || undefined }),
    onSuccess: () => {
      setComment("");
      void qc.invalidateQueries({ queryKey: ["course-reviews", courseId] });
      toast.success("Review submitted");
    },
    onError: (e) => toast.error(unwrapError(e).message),
  });

  const data = query.data;

  return (
    <div className="space-y-6">
      {data?.sentiment && (
        <div className="flex items-center gap-2">
          <Badge
            className={`rounded-full gap-1 ${data.sentiment.overallScore >= 0 ? "bg-accent/15 text-accent" : "bg-destructive/15 text-destructive"}`}
          >
            {data.sentiment.overallScore >= 0 ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
            {data.sentiment.trustLabel}
          </Badge>
          {data.avgRating != null && (
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {data.avgRating.toFixed(1)} ({data.totalReviews})
            </span>
          )}
        </div>
      )}

      {canReview && (
        <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
          <div className="text-sm font-medium">Leave a review</div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" aria-label={`${n} stars`} onClick={() => setRating(n)}>
                <Star className={`h-5 w-5 ${n <= rating ? "fill-warning text-warning" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>
          <Textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} placeholder="Share what you thought…" className="rounded-2xl" />
          <Button onClick={() => mutation.mutate()} disabled={mutation.isPending} className="rounded-full gradient-primary text-primary-foreground">
            {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit review"}
          </Button>
        </div>
      )}

      {query.isLoading ? (
        <LineSkeleton lines={4} />
      ) : !data || data.reviews.length === 0 ? (
        <EmptyState title="No reviews yet" description="Be the first to review this course." />
      ) : (
        <div className="space-y-3">
          {data.reviews.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`h-3.5 w-3.5 ${j < r.rating ? "fill-warning text-warning" : "text-muted-foreground"}`} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()}</span>
              </div>
              {r.comment && <p className="mt-2 text-sm">{r.comment}</p>}
              <div className="mt-2 text-xs text-muted-foreground">— {r.user?.name ?? "Learner"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
