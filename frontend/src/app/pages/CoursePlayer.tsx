import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Check, CheckCircle2, Circle, Loader2, PlayCircle, ClipboardCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { coursesApi } from "@/app/services/api/endpoints";
import { unwrapError } from "@/app/services/api/client";
import { PageMotion } from "../components/PageMotion";
import { LineSkeleton } from "../components/Skeletons";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";

export function CoursePlayerPage() {
  const { id: courseId } = useParams();
  const qc = useQueryClient();

  const courseQuery = useQuery({ queryKey: ["course", courseId], queryFn: () => coursesApi.get(courseId!), enabled: !!courseId });
  const lessonsQuery = useQuery({ queryKey: ["lessons", courseId], queryFn: () => coursesApi.lessons(courseId!), enabled: !!courseId });
  const enrollQuery = useQuery({ queryKey: ["my-courses"], queryFn: coursesApi.myCourses });
  const quizQuery = useQuery({ queryKey: ["quiz", courseId], queryFn: () => coursesApi.getQuiz(courseId!), enabled: !!courseId, retry: false });

  const lessons = useMemo(() => lessonsQuery.data ?? [], [lessonsQuery.data]);
  const enrollment = enrollQuery.data?.find((e) => e.course.id === courseId);
  const quizExists = !!quizQuery.data;

  const [completed, setCompleted] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  // Resume: seed completed set from the enrollment and jump to the first incomplete lesson.
  useEffect(() => {
    if (hydrated || !enrollment || lessons.length === 0) return;
    setCompleted(enrollment.completedLessons);
    const firstIncomplete = lessons.findIndex((l) => !enrollment.completedLessons.includes(l.id));
    setCurrent(firstIncomplete === -1 ? lessons.length - 1 : firstIncomplete);
    setHydrated(true);
  }, [enrollment, lessons, hydrated]);

  const mutation = useMutation({
    mutationFn: (payload: { progress: number; completedLessons: string[] }) =>
      coursesApi.updateProgress(enrollment!.id, payload),
    onSuccess: (updated) => {
      void qc.invalidateQueries({ queryKey: ["my-courses"] });
      if (updated.progress >= 100) toast.success("Course completed! 🎉 Certificate generated.");
    },
    onError: (e) => toast.error(unwrapError(e).message),
  });

  if (courseQuery.isLoading || lessonsQuery.isLoading || enrollQuery.isLoading) {
    return <PageMotion className="space-y-6"><LineSkeleton lines={8} /></PageMotion>;
  }
  if (courseQuery.isError || !courseQuery.data) {
    return <PageMotion className="space-y-6"><ErrorState onRetry={() => courseQuery.refetch()} /></PageMotion>;
  }
  const course = courseQuery.data;

  if (!enrollment) {
    return (
      <PageMotion className="space-y-6">
        <EmptyState
          icon={PlayCircle}
          title="Enroll to start learning"
          description="You need to enroll in this course before you can access the lessons."
          action={<Button asChild className="rounded-full gradient-primary text-primary-foreground"><Link to={`/app/learn/${courseId}`}>Go to course</Link></Button>}
        />
      </PageMotion>
    );
  }

  if (lessons.length === 0) {
    return (
      <PageMotion className="space-y-6">
        <BackLink courseId={courseId!} />
        <EmptyState title="No lessons yet" description="The creator hasn't added lessons to this course." />
      </PageMotion>
    );
  }

  const lesson = lessons[current];
  const isDone = (lessonId: string) => completed.includes(lessonId);
  const progress = Math.round((completed.length / lessons.length) * 100);
  const allDone = completed.length >= lessons.length;

  const markComplete = () => {
    const set = new Set([...completed, lesson.id]);
    const nextCompleted = lessons.filter((l) => set.has(l.id)).map((l) => l.id);
    let nextProgress = Math.round((nextCompleted.length / lessons.length) * 100);
    // A quiz gates final completion: leave progress just short of 100 until it's passed.
    if (nextProgress === 100 && quizExists) nextProgress = 99;
    setCompleted(nextCompleted);
    mutation.mutate({ progress: nextProgress, completedLessons: nextCompleted });
    if (current < lessons.length - 1) setCurrent(current + 1);
  };

  return (
    <PageMotion className="space-y-6">
      <BackLink courseId={courseId!} />
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{course.title}</h1>
        <div className="mt-3 max-w-md">
          <Progress value={progress} className="h-2" />
          <div className="mt-1 text-xs text-muted-foreground">{progress}% complete · {completed.length}/{lessons.length} lessons</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Lesson list */}
        <Card className="rounded-3xl border-border bg-card p-3 h-fit">
          <div className="space-y-1">
            {lessons.map((l, i) => (
              <button
                key={l.id}
                onClick={() => setCurrent(i)}
                className={`w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${i === current ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
              >
                {isDone(l.id) ? <CheckCircle2 className="h-4 w-4 text-accent shrink-0" /> : <Circle className="h-4 w-4 text-muted-foreground shrink-0" />}
                <span className="line-clamp-1">{i + 1}. {l.title}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Lesson content */}
        <div className="space-y-4">
          <Card className="rounded-3xl border-border bg-card overflow-hidden">
            {lesson.videoUrl ? (
              <video src={lesson.videoUrl} controls className="w-full aspect-video bg-black" />
            ) : (
              <div className="aspect-video gradient-primary grid place-items-center">
                <PlayCircle className="h-14 w-14 text-primary-foreground/80" />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-bold">{lesson.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {lesson.content || "No content for this lesson."}
              </p>
            </div>
          </Card>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" disabled={current === 0} onClick={() => setCurrent(current - 1)} className="rounded-full">Previous</Button>
            {!isDone(lesson.id) ? (
              <Button onClick={markComplete} disabled={mutation.isPending} className="rounded-full gradient-primary text-primary-foreground">
                {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Check className="h-4 w-4 mr-1" /> Mark complete</>}
              </Button>
            ) : current < lessons.length - 1 ? (
              <Button onClick={() => setCurrent(current + 1)} className="rounded-full gradient-primary text-primary-foreground">Next lesson</Button>
            ) : null}

            {allDone && quizExists && (
              <Button asChild className="rounded-full gradient-primary text-primary-foreground">
                <Link to={`/app/learn/${courseId}/quiz`}><ClipboardCheck className="h-4 w-4 mr-1" /> Take the quiz</Link>
              </Button>
            )}
          </div>

          {allDone && (
            <Card className="rounded-2xl border-border bg-accent/10 text-accent p-4 text-sm flex items-center gap-2">
              <Check className="h-4 w-4" />
              {quizExists
                ? "All lessons done — pass the quiz to earn your certificate."
                : "All lessons complete! Your certificate is ready in My Certificates."}
            </Card>
          )}
        </div>
      </div>
    </PageMotion>
  );
}

function BackLink({ courseId }: { courseId: string }) {
  return (
    <Link to={`/app/learn/${courseId}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
      <ArrowLeft className="h-4 w-4" /> Back to course
    </Link>
  );
}
