import { useTranslation } from "react-i18next";
import { Moon, Sun, Monitor, Bell, Shield, Accessibility, Lock, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "@/app/contexts/ThemeContext";
import { PageMotion } from "../components/PageMotion";

export function SettingsPage() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  return (
    <PageMotion className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("settings.title")}</h1>
        <p className="mt-1 text-muted-foreground">Manage your preferences and account.</p>
      </div>

      <Section title={t("settings.appearance")}>
        <Label className="mb-3 block text-sm font-medium">{t("settings.theme")}</Label>
        <RadioGroup value={theme} onValueChange={(v) => setTheme(v as never)} className="grid grid-cols-3 gap-3">
          {[
            { v: "light", label: t("settings.light"), icon: Sun },
            { v: "dark", label: t("settings.dark"), icon: Moon },
            { v: "system", label: t("settings.system"), icon: Monitor },
          ].map((o) => (
            <label key={o.v} htmlFor={`th-${o.v}`} className={`flex flex-col items-center gap-2 rounded-2xl border p-4 cursor-pointer transition-all ${theme === o.v ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}>
              <RadioGroupItem value={o.v} id={`th-${o.v}`} className="sr-only" />
              <o.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{o.label}</span>
            </label>
          ))}
        </RadioGroup>
      </Section>

      <Section title={t("settings.language")}>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { v: "en", label: "English" },
            { v: "hi", label: "हिन्दी" },
            { v: "mr", label: "मराठी" },
          ].map((l) => (
            <button
              key={l.v}
              onClick={() => void i18n.changeLanguage(l.v)}
              className={`rounded-2xl border p-4 text-left transition-all ${i18n.language === l.v ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}
            >
              <div className="font-medium">{l.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{l.v.toUpperCase()}</div>
            </button>
          ))}
        </div>
      </Section>

      <Section title={t("settings.notifications")} icon={Bell}>
        <ToggleRow label="Email digest" description="Weekly summary of your progress" defaultChecked />
        <ToggleRow label="Push notifications" description="Real-time updates on your device" defaultChecked />
        <ToggleRow label="Marketing" description="Occasional emails about new features" />
      </Section>

      <Section title={t("settings.privacy")} icon={Shield}>
        <ToggleRow label="Public profile" description="Let mentors and employers find you" defaultChecked />
        <ToggleRow label="Show my location" description="Helps us surface nearby opportunities" />
      </Section>

      <Section title={t("settings.accessibility")} icon={Accessibility}>
        <ToggleRow label="Reduce motion" description="Minimise animations across the app" />
        <ToggleRow label="Larger text" description="Increase base font size" />
      </Section>

      <Section title={t("settings.account")} icon={Lock}>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="rounded-full">Change password</Button>
          <Button variant="outline" className="rounded-full">Download my data</Button>
          <Button variant="outline" className="rounded-full text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4 mr-1" /> Delete account
          </Button>
        </div>
      </Section>
    </PageMotion>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon?: typeof Bell; children: React.ReactNode }) {
  return (
    <Card className="rounded-3xl border-border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-primary" />}
        <h2 className="font-semibold">{title}</h2>
      </div>
      {children}
    </Card>
  );
}

function ToggleRow({ label, description, defaultChecked }: { label: string; description: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border p-4">
      <div className="min-w-0">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
