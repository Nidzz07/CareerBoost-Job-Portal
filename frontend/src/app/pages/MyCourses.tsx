import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Plus, Award, Play, Settings2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { coursesApi } from "@/app/services/api/endpoints";
import { PageMotion } from "../components/PageMotion";
import { ListSkeleton } from "../components/Skeletons";
import { EmptyState } from "../components/EmptyState";

const STATUS_TINT: Record<string, string> = {
  APPROVED: "bg-accent/15 text-accent",
  PENDING: "bg-warning/15 text-warning",
  REJECTED: "bg-destructive/15 text-destructive",
};

export function MyCoursesPage() {
  const enrolled = useQuery({ queryKey: ["my-courses"], queryFn: coursesApi.myCourses });
  const created = useQuery({ queryKey: ["my-created-courses"], queryFn: coursesApi.myCreated });

  return (
    <PageMotion className="space-y-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">My Learning</h1>
          <p className="mt-1 text-muted-foreground">Continue where you left off, or share what you know.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="rounded-full shrink-0">
            <Link to="/app/certificates"><Award className="h-4 w-4 mr-1" /> Certificates</Link>
          </Button>
          <Button asChild className="rounded-full gradient-primary text-primary-foreground shrink-0">
            <Link to="/app/learn/create"><Plus className="h-4 w-4 mr-1" /> Create course</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="enrolled">
        <TabsList className="rounded-full">
          <TabsTrigger value="enrolled" className="rounded-full">Enrolled</TabsTrigger>
          <TabsTrigger value="created" className="rounded-full">Created</TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled" className="mt-6">
          {enrolled.isLoading ? (
            <ListSkeleton count={4} />
          ) : !enrolled.data || enrolled.data.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="You haven't enrolled yet"
              description="Explore courses and start learning."
              action={<Button asChild className="rounded-full gradient-primary text-primary-foreground"><Link to="/app/learn">Browse courses</Link></Button>}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {enrolled.data.map((e) => (
                <Card key={e.id} className="rounded-3xl border-border bg-card p-5">
                  <Badge variant="secondary" className="rounded-full text-xs">{e.course.category}</Badge>
                  <div className="mt-2 font-semibold line-clamp-2">{e.course.title}</div>
                  <Progress value={e.progress} className="mt-3 h-1.5" />
                  <div className="mt-1 text-xs text-muted-foreground">{e.progress}% complete</div>
                  <div className="mt-4 flex gap-2">
                    <Button asChild size="sm" className="rounded-full gradient-primary text-primary-foreground">
                      <Link to={`/app/learn/${e.course.id}/learn`}>
                        <Play className="h-3.5 w-3.5 mr-1" /> {e.progress > 0 ? "Continue" : "Start"}
                      </Link>
                    </Button>
                    {e.certificateUrl && (
                      <Button asChild size="sm" variant="outline" className="rounded-full">
                        <Link to="/app/certificates"><Award className="h-3.5 w-3.5 mr-1" /> Certificate</Link>
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="created" className="mt-6">
          {created.isLoading ? (
            <ListSkeleton count={4} />
          ) : !created.data || created.data.length === 0 ? (
            <EmptyState
              icon={Plus}
              title="You haven't created a course"
              description="Share your skills — submit a course for review."
              action={<Button asChild className="rounded-full gradient-primary text-primary-foreground"><Link to="/app/learn/create">Create course</Link></Button>}
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {created.data.map((c) => (
                <Card key={c.id} className="rounded-3xl border-border bg-card p-5">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="rounded-full text-xs">{c.category}</Badge>
                    {c.reviewStatus && (
                      <Badge className={`rounded-full text-xs ${STATUS_TINT[c.reviewStatus] ?? "bg-muted text-muted-foreground"}`}>
                        {c.reviewStatus}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2 font-semibold line-clamp-2">{c.title}</div>
                  <div className="mt-4">
                    <Button asChild size="sm" variant="outline" className="rounded-full">
                      <Link to={`/app/learn/${c.id}/edit`}><Settings2 className="h-3.5 w-3.5 mr-1" /> Manage</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </PageMotion>
  );
}
