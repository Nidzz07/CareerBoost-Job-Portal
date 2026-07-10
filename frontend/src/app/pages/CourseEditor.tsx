import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Loader2, AlertTriangle, GripVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { coursesApi } from "@/app/services/api/endpoints";
import { unwrapError } from "@/app/services/api/client";
import { PageMotion } from "../components/PageMotion";
import { ImageUploader } from "../components/ImageUploader";

const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
const LANGS = [{ v: "en", l: "English" }, { v: "hi", l: "हिन्दी" }, { v: "mr", l: "मराठी" }];
const CATEGORIES = ["Design", "Marketing", "Finance", "Coding", "Wellness", "Craft", "Tailoring", "Cooking"];

export function CourseEditorPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const qc = useQueryClient();

  const courseQuery = useQuery({ queryKey: ["course", id], queryFn: () => coursesApi.get(id!), enabled: isEdit });

  const [form, setForm] = useState({
    title: "", category: "Design", description: "", level: "BEGINNER", language: "en", price: "", mediaUrl: "",
  });

  useEffect(() => {
    if (courseQuery.data) {
      setForm((f) => ({
        ...f,
        title: courseQuery.data.title,
        category: courseQuery.data.category,
        description: courseQuery.data.description ?? "",
        level: (courseQuery.data.level ?? "beginner").toUpperCase(),
        language: courseQuery.data.language ?? "en",
        price: courseQuery.data.price ? String(courseQuery.data.price) : "",
      }));
    }
  }, [courseQuery.data]);

  const save = useMutation({
    mutationFn: () => {
      const payload = {
        title: form.title,
        category: form.category,
        description: form.description || undefined,
        level: form.level,
        language: form.language,
        price: Number(form.price) || 0,
        ...(form.mediaUrl && { mediaUrl: form.mediaUrl }),
      };
      return isEdit ? coursesApi.update(id!, payload) : coursesApi.create(payload);
    },
    onSuccess: (course) => {
      void qc.invalidateQueries({ queryKey: ["my-created-courses"] });
      if (!isEdit) {
        toast.success("Course submitted for review. Add lessons next.");
        navigate(`/app/learn/${course.id}/edit`);
      } else {
        toast.success("Course saved");
      }
    },
    onError: (e) => toast.error(unwrapError(e).message),
  });

  return (
    <PageMotion className="space-y-8 max-w-3xl">
      <Link to="/app/learn/mine" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> My Learning
      </Link>
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{isEdit ? "Manage course" : "Create a course"}</h1>
        <p className="mt-1 text-muted-foreground">
          {isEdit ? "Update details, add lessons and a quiz." : "Submit a course — an admin will review it before it goes live."}
        </p>
      </div>

      {/* Details */}
      <Card className="rounded-3xl border-border bg-card p-6 space-y-4">
        <div>
          <Label>Title</Label>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1.5 rounded-xl h-11" />
        </div>
        <div>
          <Label>Category</Label>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button key={c} type="button" onClick={() => setForm({ ...form, category: c })}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium ${form.category === c ? "gradient-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground"}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Level</Label>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {LEVELS.map((lv) => (
                <button key={lv} type="button" onClick={() => setForm({ ...form, level: lv })}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${form.level === lv ? "gradient-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground"}`}>{lv.toLowerCase()}</button>
              ))}
            </div>
          </div>
          <div>
            <Label>Language</Label>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {LANGS.map((lg) => (
                <button key={lg.v} type="button" onClick={() => setForm({ ...form, language: lg.v })}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${form.language === lg.v ? "gradient-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground"}`}>{lg.l}</button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <Label>Description</Label>
          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="mt-1.5 rounded-2xl" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Price (₹, 0 = free)</Label>
            <Input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="mt-1.5 rounded-xl h-11" />
          </div>
          <div>
            <Label>Cover / media</Label>
            <div className="mt-1.5 flex items-center gap-2">
              <ImageUploader onUploaded={(url) => setForm({ ...form, mediaUrl: url })} label="Upload media" />
              {form.mediaUrl && <span className="text-xs text-accent">uploaded ✓</span>}
            </div>
          </div>
        </div>
        <Button onClick={() => save.mutate()} disabled={save.isPending || !form.title} className="rounded-full gradient-primary text-primary-foreground">
          {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : isEdit ? "Save changes" : "Submit for review"}
        </Button>
      </Card>

      {isEdit && (
        <>
          <LessonManager courseId={id!} />
          <QuizBuilder courseId={id!} />
          <AtRiskPanel courseId={id!} />
        </>
      )}
    </PageMotion>
  );
}

function LessonManager({ courseId }: { courseId: string }) {
  const qc = useQueryClient();
  const lessonsQuery = useQuery({ queryKey: ["lessons", courseId], queryFn: () => coursesApi.lessons(courseId) });
  const [draft, setDraft] = useState({ title: "", content: "", videoUrl: "" });

  const add = useMutation({
    mutationFn: () => coursesApi.createLesson(courseId, { title: draft.title, content: draft.content || undefined, videoUrl: draft.videoUrl || undefined }),
    onSuccess: () => { setDraft({ title: "", content: "", videoUrl: "" }); void qc.invalidateQueries({ queryKey: ["lessons", courseId] }); toast.success("Lesson added"); },
    onError: (e) => toast.error(unwrapError(e).message),
  });
  const remove = useMutation({
    mutationFn: (lessonId: string) => coursesApi.deleteLesson(lessonId),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ["lessons", courseId] }); toast.success("Lesson removed"); },
    onError: (e) => toast.error(unwrapError(e).message),
  });

  return (
    <Card className="rounded-3xl border-border bg-card p-6 space-y-4">
      <h2 className="font-semibold">Lessons</h2>
      <div className="space-y-2">
        {(lessonsQuery.data ?? []).map((l, i) => (
          <div key={l.id} className="flex items-center gap-2 rounded-2xl border border-border p-3">
            <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm flex-1 line-clamp-1">{i + 1}. {l.title}</span>
            <Button size="sm" variant="ghost" onClick={() => remove.mutate(l.id)} className="rounded-full text-destructive hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
        {(lessonsQuery.data ?? []).length === 0 && <p className="text-sm text-muted-foreground">No lessons yet.</p>}
      </div>

      <div className="rounded-2xl border border-dashed border-border p-4 space-y-3">
        <Input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="Lesson title" className="rounded-xl h-10" />
        <Textarea value={draft.content} onChange={(e) => setDraft({ ...draft, content: e.target.value })} rows={3} placeholder="Lesson content…" className="rounded-2xl" />
        <div className="flex items-center gap-2">
          <ImageUploader onUploaded={(url) => setDraft({ ...draft, videoUrl: url })} accept="video/*,image/*" label="Upload video" />
          {draft.videoUrl && <span className="text-xs text-accent">media ✓</span>}
        </div>
        <Button onClick={() => add.mutate()} disabled={!draft.title || add.isPending} size="sm" className="rounded-full gradient-primary text-primary-foreground">
          {add.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Plus className="h-4 w-4 mr-1" /> Add lesson</>}
        </Button>
      </div>
    </Card>
  );
}

function QuizBuilder({ courseId }: { courseId: string }) {
  const [title, setTitle] = useState("Course quiz");
  const [passingScore, setPassingScore] = useState("70");
  const [questions, setQuestions] = useState<Array<{ questionText: string; options: string[]; correctOptionIndex: number }>>([]);
  const [q, setQ] = useState({ questionText: "", options: ["", "", "", ""], correct: 0 });

  const create = useMutation({
    mutationFn: () => coursesApi.createQuiz(courseId, { title, passingScore: Number(passingScore) || 70, questions }),
    onSuccess: () => { setQuestions([]); toast.success("Quiz created"); },
    onError: (e) => toast.error(unwrapError(e).message),
  });

  const addQuestion = () => {
    if (!q.questionText.trim() || q.options.some((o) => !o.trim())) { toast.error("Fill the question and all 4 options"); return; }
    setQuestions((prev) => [...prev, { questionText: q.questionText, options: q.options, correctOptionIndex: q.correct }]);
    setQ({ questionText: "", options: ["", "", "", ""], correct: 0 });
  };

  return (
    <Card className="rounded-3xl border-border bg-card p-6 space-y-4">
      <h2 className="font-semibold">Quiz</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Quiz title" className="rounded-xl h-10" />
        <Input type="number" value={passingScore} onChange={(e) => setPassingScore(e.target.value)} placeholder="Passing %" className="rounded-xl h-10" />
      </div>

      {questions.length > 0 && (
        <div className="space-y-1 text-sm">
          {questions.map((qq, i) => <div key={i} className="text-muted-foreground">{i + 1}. {qq.questionText}</div>)}
        </div>
      )}

      <div className="rounded-2xl border border-dashed border-border p-4 space-y-2">
        <Input value={q.questionText} onChange={(e) => setQ({ ...q, questionText: e.target.value })} placeholder="Question" className="rounded-xl h-10" />
        {q.options.map((opt, oi) => (
          <div key={oi} className="flex items-center gap-2">
            <input type="radio" name="correct" checked={q.correct === oi} onChange={() => setQ({ ...q, correct: oi })} title="Mark correct" />
            <Input value={opt} onChange={(e) => setQ({ ...q, options: q.options.map((o, k) => (k === oi ? e.target.value : o)) })} placeholder={`Option ${oi + 1}`} className="rounded-xl h-9" />
          </div>
        ))}
        <Button onClick={addQuestion} size="sm" variant="outline" className="rounded-full"><Plus className="h-4 w-4 mr-1" /> Add question</Button>
      </div>

      <Button onClick={() => create.mutate()} disabled={questions.length === 0 || create.isPending} className="rounded-full gradient-primary text-primary-foreground">
        {create.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : `Create quiz (${questions.length})`}
      </Button>
    </Card>
  );
}

function AtRiskPanel({ courseId }: { courseId: string }) {
  const query = useQuery({ queryKey: ["at-risk", courseId], queryFn: () => coursesApi.atRisk(courseId) });
  if (query.isLoading || !query.data) return null;

  return (
    <Card className="rounded-3xl border-border bg-card p-6 space-y-3">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <h2 className="font-semibold">Learners at risk of dropping out</h2>
      </div>
      <p className="text-xs text-muted-foreground">{query.data.totalEnrolled} enrolled · {query.data.atRisk.length} flagged by the dropout model.</p>
      {query.data.atRisk.length === 0 ? (
        <p className="text-sm text-muted-foreground">No learners are currently at risk. 🎉</p>
      ) : (
        <div className="space-y-2">
          {query.data.atRisk.map((a) => (
            <div key={a.enrollmentId} className="flex items-center justify-between rounded-2xl border border-border p-3">
              <div className="text-sm font-medium">{a.learner.name}</div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{a.progress}% done</span>
                <Badge className="rounded-full bg-destructive/15 text-destructive text-xs">{Math.round(a.riskScore * 100)}% risk</Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
