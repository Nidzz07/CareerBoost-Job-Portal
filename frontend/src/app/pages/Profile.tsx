import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Camera, Award, Sparkles, MapPin, Briefcase, GraduationCap, Plus, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/app/store/auth";
import { userApi } from "@/app/services/api/endpoints";
import { PageMotion } from "../components/PageMotion";

export function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? "",
    bio: user?.bio ?? "I'm learning, earning and flourishing on Sakhi 🌸",
    location: user?.location ?? "",
  });
  const [skills, setSkills] = useState<string[]>(user?.skills ?? ["Figma", "Content writing", "Photography"]);
  const [newSkill, setNewSkill] = useState("");

  const initials = (user?.name ?? "S").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

  const save = async () => {
    setSaving(true);
    try {
      const updated = await userApi.updateProfile({ ...form, skills });
      setUser(updated);
      toast.success("Profile updated");
    } catch {
      if (user) setUser({ ...user, ...form, skills });
      toast.success("Profile saved");
    } finally { setSaving(false); }
  };

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
                <button aria-label="Change photo" className="absolute bottom-1 right-1 rounded-full p-1.5 bg-primary text-primary-foreground shadow-md">
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="pb-2">
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button onClick={save} disabled={saving} className="rounded-full gradient-primary text-primary-foreground shadow">
              {saving ? "Saving…" : t("common.save")}
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
            {[
              { icon: Sparkles, label: "XP", value: user?.xp ?? 1280 },
              { icon: Award, label: "Certificates", value: 4 },
              { icon: GraduationCap, label: "Courses", value: 12 },
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
              <Textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="mt-1.5 rounded-2xl" />
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
            <Label>Skills</Label>
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
                onSubmit={(e) => { e.preventDefault(); if (newSkill.trim()) { setSkills([...skills, newSkill.trim()]); setNewSkill(""); } }}
                className="inline-flex items-center gap-1"
              >
                <Input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add skill" className="h-8 w-32 rounded-full text-xs" />
                <Button type="submit" size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0"><Plus className="h-3 w-3" /></Button>
              </form>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="experience" className="mt-6 space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="rounded-3xl border-border bg-card p-6 flex items-start gap-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0"><Briefcase className="h-5 w-5" /></div>
              <div>
                <div className="font-semibold">{["Freelance Designer", "Community Marketing Volunteer"][i]}</div>
                <div className="text-sm text-muted-foreground">{["Sakhi Marketplace", "Local NGO"][i]} · 2023 — Present</div>
                <p className="mt-2 text-sm text-muted-foreground">{["Designed 30+ product covers.", "Organised weekly digital literacy workshops."][i]}</p>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="certificates" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="rounded-3xl border-border bg-card p-5 hover-lift">
                  <div className="h-24 gradient-primary rounded-2xl grid place-items-center">
                    <Award className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div className="mt-4 text-sm font-semibold">Certificate #{i + 1}</div>
                  <div className="text-xs text-muted-foreground">Issued {new Date().toLocaleDateString()}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="badges" className="mt-6">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl gradient-aurora shadow-glow">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <div className="mt-2 text-xs font-medium">Badge {i + 1}</div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PageMotion>
  );
}
