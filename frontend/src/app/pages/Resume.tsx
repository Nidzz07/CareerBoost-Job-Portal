import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Sparkles, Plus, X, Briefcase, GraduationCap, LinkIcon, FileText, Save, Loader2, Eye,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { resumeApi, mlApi, userApi } from "@/app/services/api/endpoints";
import type { ResumeExperience, ResumeEducation } from "@/app/services/api/endpoints";
import { unwrapError, API_BASE_URL } from "@/app/services/api/client";
import { useAuthStore } from "@/app/store/auth";
import { PageMotion } from "../components/PageMotion";
import { ImageUploader } from "../components/ImageUploader";
import { ListSkeleton } from "../components/Skeletons";

const FILE_BASE = API_BASE_URL.replace(/\/api\/?$/, "");

/**
 * Resume Builder (Phase 5). CRUD over the existing Resume backend (PUT /resume,
 * GET /resume/me). The resume is the single source of truth for skills/bio, which
 * also feed the ML recommendation and job-match endpoints. Skills can be extracted
 * from the bio via the existing ML skill-extraction endpoint.
 */
export function ResumePage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const query = useQuery({ queryKey: ["resume-me"], queryFn: resumeApi.me, retry: false });

  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<ResumeExperience[]>([]);
  const [education, setEducation] = useState<ResumeEducation[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [resumeFileUrl, setResumeFileUrl] = useState<string | undefined>();
  const [newSkill, setNewSkill] = useState("");
  const [newLink, setNewLink] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  // Hydrate the form once the resume loads.
  useEffect(() => {
    const r = query.data;
    if (!r) return;
    setBio(r.bio ?? "");
    setSkills(r.skills);
    setExperience(r.experience);
    setEducation(r.education);
    setLinks(r.portfolioLinks);
    setResumeFileUrl(r.resumeFileUrl);
  }, [query.data]);

  const suggestSkills = async () => {
    if (!bio.trim()) { toast.error("Add a bit about yourself in your bio first"); return; }
    setExtracting(true);
    try {
      const found = await mlApi.extractSkills(bio);
      if (found.length === 0) { toast("No skills detected — describe what you do in more detail"); return; }
      setSkills((prev) => Array.from(new Set([...prev, ...found])));
      toast.success(`Added ${found.length} suggested skill${found.length > 1 ? "s" : ""}`);
    } catch (e) {
      toast.error(unwrapError(e).message);
    } finally { setExtracting(false); }
  };

  const save = async () => {
    setSaving(true);
    try {
      await resumeApi.save({
        bio: bio.trim() || undefined,
        skills,
        experience,
        education,
        portfolioLinks: links,
        resumeFileUrl,
      });
      // Keep the auth store's user in sync so Profile/Dashboard reflect skills/bio.
      if (user) setUser({ ...user, bio: bio.trim(), skills });
      toast.success("Resume saved");
    } catch (e) {
      toast.error(unwrapError(e).message);
    } finally { setSaving(false); }
  };

  if (query.isLoading) {
    return <PageMotion className="space-y-6"><ListSkeleton count={4} /></PageMotion>;
  }

  return (
    <PageMotion className="space-y-8 max-w-3xl mx-auto">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Resume Builder</h1>
          <p className="mt-1 text-muted-foreground">Your resume powers job matching and recommendations.</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" onClick={() => setPreview((p) => !p)} className="rounded-full">
            <Eye className="h-4 w-4 mr-1" /> {preview ? "Edit" : "Preview"}
          </Button>
          <Button onClick={save} disabled={saving} className="rounded-full gradient-primary text-primary-foreground shadow">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4 mr-1" /> {t("common.save")}</>}
          </Button>
        </div>
      </div>

      {preview ? (
        <ResumePreview
          name={user?.name ?? "You"}
          location={user?.location}
          bio={bio}
          skills={skills}
          experience={experience}
          education={education}
          links={links}
          resumeFileUrl={resumeFileUrl}
        />
      ) : (
        <div className="space-y-6">
          {/* Bio + skills */}
          <Card className="rounded-3xl border-border bg-card p-6 space-y-4">
            <div>
              <Label>Professional bio</Label>
              <Textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell employers about yourself, your strengths and what you're looking for…" className="mt-1.5 rounded-2xl" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label>Skills</Label>
                <Button type="button" size="sm" variant="ghost" onClick={suggestSkills} disabled={extracting} className="rounded-full text-primary">
                  <Sparkles className="h-3.5 w-3.5 mr-1" /> {extracting ? "Reading bio…" : "Suggest from bio"}
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <Badge key={s} variant="secondary" className="rounded-full pl-3 pr-1 py-1 gap-1">
                    {s}
                    <button aria-label={`Remove ${s}`} onClick={() => setSkills(skills.filter((x) => x !== s))} className="grid h-4 w-4 place-items-center rounded-full hover:bg-background">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <form
                  onSubmit={(e) => { e.preventDefault(); const v = newSkill.trim(); if (v && !skills.includes(v)) setSkills([...skills, v]); setNewSkill(""); }}
                  className="inline-flex items-center gap-1"
                >
                  <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add skill" className="h-8 w-32 rounded-full text-xs" />
                  <Button type="submit" size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0"><Plus className="h-3 w-3" /></Button>
                </form>
              </div>
            </div>
          </Card>

          {/* Experience */}
          <Card className="rounded-3xl border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold"><Briefcase className="h-4 w-4 text-primary" /> Experience</div>
              <Button type="button" size="sm" variant="outline" onClick={() => setExperience([...experience, { title: "", company: "", startDate: "", endDate: "", description: "" }])} className="rounded-full">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add
              </Button>
            </div>
            {experience.length === 0 && <p className="text-sm text-muted-foreground">No experience added yet.</p>}
            {experience.map((exp, i) => (
              <div key={i} className="rounded-2xl border border-border p-4 space-y-2">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Input value={exp.title} onChange={(e) => updateAt(setExperience, experience, i, { title: e.target.value })} placeholder="Role / title" className="rounded-xl h-10" />
                  <Input value={exp.company ?? ""} onChange={(e) => updateAt(setExperience, experience, i, { company: e.target.value })} placeholder="Company" className="rounded-xl h-10" />
                  <Input value={exp.startDate ?? ""} onChange={(e) => updateAt(setExperience, experience, i, { startDate: e.target.value })} placeholder="Start (e.g. 2023)" className="rounded-xl h-10" />
                  <Input value={exp.endDate ?? ""} onChange={(e) => updateAt(setExperience, experience, i, { endDate: e.target.value })} placeholder="End (e.g. Present)" className="rounded-xl h-10" />
                </div>
                <Textarea value={exp.description ?? ""} onChange={(e) => updateAt(setExperience, experience, i, { description: e.target.value })} rows={2} placeholder="What did you do?" className="rounded-2xl" />
                <Button type="button" size="sm" variant="ghost" onClick={() => setExperience(experience.filter((_, j) => j !== i))} className="rounded-full text-destructive hover:text-destructive">
                  <X className="h-3.5 w-3.5 mr-1" /> Remove
                </Button>
              </div>
            ))}
          </Card>

          {/* Education */}
          <Card className="rounded-3xl border-border bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold"><GraduationCap className="h-4 w-4 text-primary" /> Education</div>
              <Button type="button" size="sm" variant="outline" onClick={() => setEducation([...education, { institution: "", degree: "", year: "" }])} className="rounded-full">
                <Plus className="h-3.5 w-3.5 mr-1" /> Add
              </Button>
            </div>
            {education.length === 0 && <p className="text-sm text-muted-foreground">No education added yet.</p>}
            {education.map((ed, i) => (
              <div key={i} className="rounded-2xl border border-border p-4 space-y-2">
                <div className="grid gap-2 sm:grid-cols-3">
                  <Input value={ed.institution} onChange={(e) => updateAt(setEducation, education, i, { institution: e.target.value })} placeholder="Institution" className="rounded-xl h-10 sm:col-span-1" />
                  <Input value={ed.degree ?? ""} onChange={(e) => updateAt(setEducation, education, i, { degree: e.target.value })} placeholder="Degree / programme" className="rounded-xl h-10" />
                  <Input value={ed.year ?? ""} onChange={(e) => updateAt(setEducation, education, i, { year: e.target.value })} placeholder="Year" className="rounded-xl h-10" />
                </div>
                <Button type="button" size="sm" variant="ghost" onClick={() => setEducation(education.filter((_, j) => j !== i))} className="rounded-full text-destructive hover:text-destructive">
                  <X className="h-3.5 w-3.5 mr-1" /> Remove
                </Button>
              </div>
            ))}
          </Card>

          {/* Portfolio links + file */}
          <Card className="rounded-3xl border-border bg-card p-6 space-y-4">
            <div className="flex items-center gap-2 font-semibold"><LinkIcon className="h-4 w-4 text-primary" /> Portfolio links</div>
            <div className="flex flex-wrap gap-2">
              {links.map((l) => (
                <Badge key={l} variant="secondary" className="rounded-full pl-3 pr-1 py-1 gap-1 max-w-full">
                  <span className="truncate max-w-[220px]">{l}</span>
                  <button aria-label={`Remove ${l}`} onClick={() => setLinks(links.filter((x) => x !== l))} className="grid h-4 w-4 place-items-center rounded-full hover:bg-background">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); const v = newLink.trim(); if (v && !links.includes(v)) setLinks([...links, v]); setNewLink(""); }}
              className="flex items-center gap-2"
            >
              <Input value={newLink} onChange={(e) => setNewLink(e.target.value)} placeholder="https://…" className="rounded-xl h-10" />
              <Button type="submit" size="sm" variant="outline" className="rounded-full shrink-0"><Plus className="h-3.5 w-3.5 mr-1" /> Add</Button>
            </form>

            <div className="pt-2">
              <div className="flex items-center gap-2 font-semibold"><FileText className="h-4 w-4 text-primary" /> Resume file (PDF)</div>
              <div className="mt-2 flex items-center gap-3">
                <ImageUploader accept="application/pdf,image/*" label={resumeFileUrl ? "Replace file" : "Upload file"} onUploaded={setResumeFileUrl} />
                {resumeFileUrl && (
                  <a href={`${FILE_BASE}${resumeFileUrl}`} target="_blank" rel="noreferrer" className="text-sm text-primary story-link">View uploaded file</a>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </PageMotion>
  );
}

// Immutably updates an entry in a list-of-objects state setter.
function updateAt<T>(setter: (v: T[]) => void, list: T[], index: number, patch: Partial<T>) {
  setter(list.map((item, i) => (i === index ? { ...item, ...patch } : item)));
}

function ResumePreview({
  name, location, bio, skills, experience, education, links, resumeFileUrl,
}: {
  name: string; location?: string; bio: string; skills: string[];
  experience: ResumeExperience[]; education: ResumeEducation[]; links: string[]; resumeFileUrl?: string;
}) {
  return (
    <Card className="rounded-3xl border-border bg-card p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        {location && <p className="text-sm text-muted-foreground">{location}</p>}
      </div>
      {bio && <p className="text-sm leading-relaxed text-muted-foreground">{bio}</p>}

      {skills.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Skills</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {skills.map((s) => <Badge key={s} variant="secondary" className="rounded-full text-xs">{s}</Badge>)}
          </div>
        </div>
      )}

      {experience.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Experience</h3>
          <div className="mt-2 space-y-3">
            {experience.map((e, i) => (
              <div key={i}>
                <div className="font-medium">{e.title || "Untitled role"}{e.company ? ` · ${e.company}` : ""}</div>
                {(e.startDate || e.endDate) && <div className="text-xs text-muted-foreground">{[e.startDate, e.endDate].filter(Boolean).join(" — ")}</div>}
                {e.description && <p className="mt-1 text-sm text-muted-foreground">{e.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Education</h3>
          <div className="mt-2 space-y-2">
            {education.map((e, i) => (
              <div key={i} className="text-sm">
                <span className="font-medium">{e.institution || "Institution"}</span>
                {e.degree ? ` · ${e.degree}` : ""}{e.year ? ` · ${e.year}` : ""}
              </div>
            ))}
          </div>
        </div>
      )}

      {links.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Links</h3>
          <ul className="mt-2 space-y-1">
            {links.map((l) => <li key={l}><a href={l} target="_blank" rel="noreferrer" className="text-sm text-primary story-link break-all">{l}</a></li>)}
          </ul>
        </div>
      )}

      {resumeFileUrl && (
        <a href={`${FILE_BASE}${resumeFileUrl}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-primary story-link">
          <FileText className="h-4 w-4" /> Download attached resume
        </a>
      )}
    </Card>
  );
}
