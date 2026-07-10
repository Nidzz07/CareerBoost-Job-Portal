import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Award, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { coursesApi, type QuizResult } from "@/app/services/api/endpoints";
import { unwrapError } from "@/app/services/api/client";
import { PageMotion } from "../components/PageMotion";
import { LineSkeleton } from "../components/Skeletons";
import { EmptyState } from "../components/EmptyState";

export function QuizPage() {
  const { id: courseId } = useParams();
  const qc = useQueryClient();
  const quizQuery = useQuery({ queryKey: ["quiz", courseId], queryFn: () => coursesApi.getQuiz(courseId!), enabled: !!courseId, retry: false });
  const enrollQuery = useQuery({ queryKey: ["my-courses"], queryFn: coursesApi.myCourses });

  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);

  const enrollment = enrollQuery.data?.find((e) => e.course.id === courseId);

  const submit = useMutation({
    mutationFn: async () => {
      const quiz = quizQuery.data!;
      const res = await coursesApi.submitQuiz(quiz.id, answers);
      // Passing the quiz completes the course (generates the certificate).
      if (res.passed && enrollment) {
        await coursesApi.updateProgress(enrollment.id, { progress: 100 });
        void qc.invalidateQueries({ queryKey: ["my-courses"] });
      }
      return res;
    },
    onSuccess: (res) => {
      setResult(res);
      toast[res.passed ? "success" : "error"](res.passed ? "Quiz passed! 🎉" : "Not quite — try again.");
    },
    onError: (e) => toast.error(unwrapError(e).message),
  });

  if (quizQuery.isLoading || enrollQuery.isLoading) {
    return <PageMotion className="space-y-6"><LineSkeleton lines={8} /></PageMotion>;
  }

  const back = (
    <Link to={`/app/learn/${courseId}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
      <ArrowLeft className="h-4 w-4" /> Back to course
    </Link>
  );

  if (quizQuery.isError || !quizQuery.data) {
    return (
      <PageMotion className="space-y-6">
        {back}
        <EmptyState title="No quiz for this course" description="This course doesn't have a quiz yet." />
      </PageMotion>
    );
  }
  const quiz = quizQuery.data;

  if (result) {
    return (
      <PageMotion className="max-w-lg mx-auto text-center py-12 space-y-4">
        <div className={`mx-auto grid h-16 w-16 place-items-center rounded-3xl ${result.passed ? "bg-accent/15 text-accent" : "bg-destructive/15 text-destructive"}`}>
          {result.passed ? <CheckCircle2 className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
        </div>
        <h1 className="text-3xl font-bold">{result.passed ? "You passed!" : "Not passed"}</h1>
        <p className="text-muted-foreground">You scored {result.score}% ({result.correctCount}/{result.totalQuestions} correct). Passing score is {quiz.passingScore}%.</p>
        <div className="flex justify-center gap-3 pt-2">
          {result.passed ? (
            <Button asChild className="rounded-full gradient-primary text-primary-foreground"><Link to="/app/certificates"><Award className="h-4 w-4 mr-1" /> View certificate</Link></Button>
          ) : (
            <Button onClick={() => { setResult(null); setAnswers([]); }} className="rounded-full gradient-primary text-primary-foreground">Try again</Button>
          )}
          <Button asChild variant="outline" className="rounded-full"><Link to={`/app/learn/${courseId}`}>Back to course</Link></Button>
        </div>
      </PageMotion>
    );
  }

  const allAnswered = quiz.questions.every((_, i) => answers[i] !== undefined && answers[i] >= 0);

  return (
    <PageMotion className="space-y-6 max-w-3xl">
      {back}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{quiz.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Pass with {quiz.passingScore}% or higher to complete the course.</p>
      </div>

      <div className="space-y-4">
        {quiz.questions.map((q, qi) => (
          <Card key={q.id} className="rounded-3xl border-border bg-card p-6">
            <div className="font-medium">{qi + 1}. {q.questionText}</div>
            <div className="mt-3 grid gap-2">
              {q.options.map((opt, oi) => (
                <label
                  key={oi}
                  className={`flex items-center gap-3 rounded-2xl border p-3 cursor-pointer transition-all ${answers[qi] === oi ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}
                >
                  <input
                    type="radio"
                    name={`q-${qi}`}
                    checked={answers[qi] === oi}
                    onChange={() => setAnswers((prev) => { const next = [...prev]; next[qi] = oi; return next; })}
                  />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Button onClick={() => submit.mutate()} disabled={!allAnswered || submit.isPending} className="rounded-full gradient-primary text-primary-foreground">
        {submit.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit quiz"}
      </Button>
    </PageMotion>
  );
}
