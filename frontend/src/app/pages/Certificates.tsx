import { useQuery } from "@tanstack/react-query";
import { Award, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { coursesApi } from "@/app/services/api/endpoints";
import { API_BASE_URL } from "@/app/services/api/client";
import { PageMotion } from "../components/PageMotion";
import { ListSkeleton } from "../components/Skeletons";
import { EmptyState } from "../components/EmptyState";

// Certificates (and uploads) are served from the backend origin, not under /api.
const FILE_BASE = API_BASE_URL.replace(/\/api\/?$/, "");

export function CertificatesPage() {
  const query = useQuery({ queryKey: ["my-courses"], queryFn: coursesApi.myCourses });
  const certificates = (query.data ?? []).filter((e) => e.certificateUrl);

  return (
    <PageMotion className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">My Certificates</h1>
        <p className="mt-1 text-muted-foreground">Certificates you've earned by completing courses.</p>
      </div>

      {query.isLoading ? (
        <ListSkeleton count={3} />
      ) : certificates.length === 0 ? (
        <EmptyState icon={Award} title="No certificates yet" description="Complete a course to earn your first certificate." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((e) => (
            <Card key={e.id} className="rounded-3xl border-border bg-card p-5">
              <div className="h-24 gradient-primary rounded-2xl grid place-items-center">
                <Award className="h-10 w-10 text-primary-foreground" />
              </div>
              <div className="mt-4 text-sm font-semibold line-clamp-2">{e.course.title}</div>
              {e.completedAt && (
                <div className="text-xs text-muted-foreground">Completed {new Date(e.completedAt).toLocaleDateString()}</div>
              )}
              <Button asChild size="sm" className="mt-4 w-full rounded-full gradient-primary text-primary-foreground">
                <a href={`${FILE_BASE}${e.certificateUrl}`} target="_blank" rel="noreferrer">
                  <Download className="h-3.5 w-3.5 mr-1" /> View / Download
                </a>
              </Button>
            </Card>
          ))}
        </div>
      )}
    </PageMotion>
  );
}
