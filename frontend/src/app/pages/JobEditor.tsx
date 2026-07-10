import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { jobsApi } from "@/app/services/api/endpoints";
import { unwrapError } from "@/app/services/api/client";
import { PageMotion } from "../components/PageMotion";

const JOB_TYPES = [
  { v: "FULL_TIME", l: "Full-time" },
  { v: "PART_TIME", l: "Part-time" },
  { v: "CONTRACT", l: "Contract" },
  { v: "GIG", l: "Gig" },
];
const TYPE_FROM_UI: Record<string, string> = { "full-time": "FULL_TIME", "part-time": "PART_TIME", contract: "CONTRACT", gig: "GIG" };
const CATEGORIES = ["Design", "Marketing", "Finance", "Support", "Sales", "Tailoring", "Cooking", "Teaching"];

export function JobEditorPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const qc = useQueryClient();

  const jobQuery = useQuery({ queryKey: ["job", id], queryFn: () => jobsApi.get(id!), enabled: isEdit });

  const [form, setForm] = useState({
    title: "", description: "", category: "Design", location: "", jobType: "FULL_TIME", salaryMin: "", salaryMax: "",
  });

  useEffect(() => {
    if (jobQuery.data) {
      const j = jobQuery.data;
      setForm({
        title: j.title,
        description: j.description ?? "",
        category: j.category ?? "Design",
        location: j.location ?? "",
        jobType: TYPE_FROM_UI[j.type] ?? "FULL_TIME",
        salaryMin: j.salary_min ? String(j.salary_min) : "",
        salaryMax: j.salary_max ? String(j.salary_max) : "",
      });
    }
  }, [jobQuery.data]);

  const save = useMutation({
    mutationFn: () => {
      const payload = {
        title: form.title,
        description: form.description,
        category: form.category,
        location: form.location || undefined,
        jobType: form.jobType,
        ...(form.salaryMin && { salaryMin: Number(form.salaryMin) }),
        ...(form.salaryMax && { salaryMax: Number(form.salaryMax) }),
      };
      return isEdit ? jobsApi.update(id!, payload) : jobsApi.create(payload);
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["my-postings"] });
      toast.success(isEdit ? "Job updated" : "Job posted");
      navigate("/app/earn/manage");
    },
    onError: (e) => toast.error(unwrapError(e).message),
  });

  return (
    <PageMotion className="space-y-8 max-w-3xl">
      <Link to="/app/earn/manage" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> My postings
      </Link>
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{isEdit ? "Edit job" : "Post a job"}</h1>
        <p className="mt-1 text-muted-foreground">Only verified employers can post jobs.</p>
      </div>

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
            <Label>Type</Label>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {JOB_TYPES.map((jt) => (
                <button key={jt.v} type="button" onClick={() => setForm({ ...form, jobType: jt.v })}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${form.jobType === jt.v ? "gradient-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground"}`}>{jt.l}</button>
              ))}
            </div>
          </div>
          <div>
            <Label>Location</Label>
            <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="City or Remote" className="mt-1.5 rounded-xl h-11" />
          </div>
        </div>
        <div>
          <Label>Description</Label>
          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={5} className="mt-1.5 rounded-2xl" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Salary min (₹/mo)</Label>
            <Input type="number" value={form.salaryMin} onChange={(e) => setForm({ ...form, salaryMin: e.target.value })} className="mt-1.5 rounded-xl h-11" />
          </div>
          <div>
            <Label>Salary max (₹/mo)</Label>
            <Input type="number" value={form.salaryMax} onChange={(e) => setForm({ ...form, salaryMax: e.target.value })} className="mt-1.5 rounded-xl h-11" />
          </div>
        </div>
        <Button onClick={() => save.mutate()} disabled={save.isPending || !form.title || !form.description} className="rounded-full gradient-primary text-primary-foreground">
          {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : isEdit ? "Save changes" : "Post job"}
        </Button>
      </Card>
    </PageMotion>
  );
}
