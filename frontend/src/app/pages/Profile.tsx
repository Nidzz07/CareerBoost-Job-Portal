import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Award, Sparkles, MapPin, Briefcase, GraduationCap, Plus, X, FileText, Flame, Lock, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/app/store/auth";
import { userApi, mlApi, resumeApi, coursesApi } from "@/app/services/api/endpoints";
import { unwrapError, API_BASE_URL } from "@/app/services/api/client";
import { useUserInsights } from "@/app/lib/insights";
import { PageMotion } from "../components/PageMotion";
import { ImageUploader } from "../components/ImageUploader";

const FILE_BASE = API_BASE_URL.replace(/\/api\/?$/, "");

export function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const { t } = useTranslation();
  const insights = useUserInsights();

  const resumeQuery = useQuery({ queryKey: ["resume-me"], queryFn: resumeApi.me, retry: false });
  const coursesQuery = useQuery({ queryKey: ["my-courses"], queryFn: coursesApi.myCourses });
  const certificates = (coursesQuery.data ?? []).filter((e) => e.certificateUrl);

  const [saving, setSaving] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [form, setForm] = useState({ name: user?.name ?? "", bio: "", location: user?.location ?? "" });
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  // Hydrate bio/skills from the real resume once it loads (falls back to empty).
  useEffect(() => {
    const r = resumeQuery.data;
    setForm((f) => ({ ...f, bio: r?.bio ?? f.bio, name: user?.name ?? f.name, location: user?.location ?? f.location }));
    if (r) setSkills(r.skills);
  }, [resumeQuery.data, user?.name, user?.location]);

  const suggestSkills = async () => {
    if (!form.bio.trim()) { toast.error("Add a bit about yourself in your bio first"); return; }
    setExtracting(true);
    try {
      const found = await mlApi.extractSkills(form.bio);
      if (found.length === 0) { toast("No skills detected — try describing what you do in more detail"); return; }
      setSkills((prev) => Array.from(new Set([...prev, ...found])));
      toast.success(`Added ${found.length} suggested skill${found.length > 1 ? "s" : ""}`);
    } catch (e) {
      toast.error(unwrapError(e).message);
    } finally { setExtracting(false); }
  };

  const initials = (user?.name ?? "S").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

  const save = async () => {
    setSaving(true);
    try {
      // name/location persist on the User; bio/skills persist on the Resume — the
      // resume is the single source of truth that also drives ML matching.
      const updated = await userApi.updateProfile({ name: form.name, location: form.location });
      await resumeApi.save({ bio: form.bio.trim() || undefined, skills });
      setUser({ ...updated, bio: form.bio, skills });
      void resumeQuery.refetch();
      toast.success("Profile updated");
    } catch (e) {
      toast.error(unwrapError(e).message);
    } finally { setSaving(false); }
  };

  const uploadAvatar = async (url: string) => {
    try {
      const updated = await userApi.updateProfile({ avatarUrl: url });
      setUser({ ...updated, bio: form.bio, skills });
      toast.success("Photo updated");
    } catch (e) {
      toast.error(unwrapError(e).message);
    }
  };

  const experience = resumeQuery.data?.experience ?? [];
  const education = resumeQuery.data?.education ?? [];
  const badges = deriveBadges(insights);

  return (
    <PageMotion className="space-y-8">
      {/* Header card */}
      <Card className="relative overflow-hidden rounded-3xl border-border bg-card">
        <div className="h-32 sm:h-40 gradient-aurora" />
        <div className="px-6 pb-6">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-card">
                  <AvatarImage src={user?.avatar_url} />
                  <AvatarFallback className="gradient-primary text-primary-foreground text-xl font-bold">{initials}</AvatarFallback>
                </Avatar>
              </div>
              <div className="pb-2">
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/app/resume"><FileText className="h-4 w-4 mr-1" /> Resume</Link>
              </Button>
              <ImageUploader onUploaded={uploadAvatar} accept="image/*" label="Change photo" />
              <Button onClick={save} disabled={saving} className="rounded-full gradient-primary text-primary-foreground shadow">
                {saving ? "Saving…" : t("common.save")}
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-3 max-w-lg">
            {[
              { icon: Sparkles, label: "XP", value: insights.xp },
              { icon: Flame, label: "Streak", value: insights.streak },
              { icon: Award, label: "Certificates", value: insights.certificates },
              { icon: GraduationCap, label: "Courses", value: insights.coursesCount },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl bg-muted/50 p-3 text-center">
                <s.icon className="h-4 w-4 mx-auto text-primary" />
                <div className="mt-1 text-lg font-bold">{s.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Tabs defaultValue="about">
        <TabsList className="rounded-full">
          <TabsTrigger value="about" className="rounded-full">About</TabsTrigger>
          <TabsTrigger value="experience" className="rounded-full">Experience</TabsTrigger>
          <TabsTrigger value="certificates" className="rounded-full">Certificates</TabsTrigger>
          <TabsTrigger value="badges" className="rounded-full">Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="mt-6 space-y-6">
          <Card className="rounded-3xl border-border bg-card p-6 space-y-4">
            <div>
              <Label>Full name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1.5 rounded-xl h-11" />
            </div>
            <div>
              <Label>Bio</Label>
              <Textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Tell others about yourself…" className="mt-1.5 rounded-2xl" />
            </div>
            <div>
              <Label>Location</Label>
              <div className="relative mt-1.5">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="pl-10 rounded-xl h-11" />
              </div>
            </div>
          </Card>

          <Card className="rounded-3xl border-border bg-card p-6">
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
            <p className="mt-3 text-xs text-muted-foreground">Skills are saved to your resume and used to match you with jobs.</p>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="mt-6 space-y-4">
          {experience.length === 0 ? (
            <Card className="rounded-3xl border-border bg-card p-8 text-center">
              <Briefcase className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">No experience added yet.</p>
              <Button asChild className="mt-4 rounded-full gradient-primary text-primary-foreground"><Link to="/app/resume">Add experience</Link></Button>
            </Card>
          ) : (
            experience.map((exp, i) => (
              <Card key={i} className="rounded-3xl border-border bg-card p-6 flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0"><Briefcase className="h-5 w-5" /></div>
                <div>
                  <div className="font-semibold">{exp.title || "Untitled role"}</div>
                  <div className="text-sm text-muted-foreground">{[exp.company, [exp.startDate, exp.endDate].filter(Boolean).join(" — ")].filter(Boolean).join(" · ")}</div>
                  {exp.description && <p className="mt-2 text-sm text-muted-foreground">{exp.description}</p>}
                </div>
              </Card>
            ))
          )}
          {education.length > 0 && (
            <Card className="rounded-3xl border-border bg-card p-6">
              <div className="flex items-center gap-2 font-semibold"><GraduationCap className="h-4 w-4 text-primary" /> Education</div>
              <div className="mt-3 space-y-2">
                {education.map((ed, i) => (
                  <div key={i} className="text-sm">
                    <span className="font-medium">{ed.institution || "Institution"}</span>
                    {ed.degree ? ` · ${ed.degree}` : ""}{ed.year ? ` · ${ed.year}` : ""}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="certificates" className="mt-6">
          {certificates.length === 0 ? (
            <Card className="rounded-3xl border-border bg-card p-8 text-center">
              <Award className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">No certificates yet. Complete a course to earn one.</p>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((e, i) => (
                <motion.div key={e.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="rounded-3xl border-border bg-card p-5 hover-lift">
                    <div className="h-24 gradient-primary rounded-2xl grid place-items-center">
                      <Award className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <div className="mt-4 text-sm font-semibold line-clamp-2">{e.course.title}</div>
                    {e.completedAt && <div className="text-xs text-muted-foreground">Issued {new Date(e.completedAt).toLocaleDateString()}</div>}
                    <Button asChild size="sm" className="mt-4 w-full rounded-full gradient-primary text-primary-foreground">
                      <a href={`${FILE_BASE}${e.certificateUrl}`} target="_blank" rel="noreferrer"><Download className="h-3.5 w-3.5 mr-1" /> View</a>
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="badges" className="mt-6">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {badges.map((b) => (
              <div key={b.label} className="text-center">
                <div className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl ${b.earned ? "gradient-aurora shadow-glow" : "bg-muted"}`}>
                  {b.earned ? <b.icon className="h-7 w-7 text-white" /> : <Lock className="h-6 w-6 text-muted-foreground" />}
                </div>
                <div className={`mt-2 text-xs font-medium ${b.earned ? "" : "text-muted-foreground"}`}>{b.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Badges unlock automatically as you learn, apply and sell.</p>
        </TabsContent>
      </Tabs>
    </PageMotion>
  );
}

type BadgeDef = { label: string; icon: typeof Award; earned: boolean };

function deriveBadges(i: ReturnType<typeof useUserInsights>): BadgeDef[] {
  return [
    { label: "First steps", icon: Sparkles, earned: i.coursesCount >= 1 },
    { label: "Graduate", icon: GraduationCap, earned: i.completedCourses >= 1 },
    { label: "Certified", icon: Award, earned: i.certificates >= 1 },
    { label: "Job seeker", icon: Briefcase, earned: i.applicationsCount >= 1 },
    { label: "Shopper", icon: Award, earned: i.ordersCount >= 1 },
    { label: "On a streak", icon: Flame, earned: i.streak >= 3 },
  ];
}
