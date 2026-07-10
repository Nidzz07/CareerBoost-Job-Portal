import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User as UserIcon, Phone, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuthStore } from "@/app/store/auth";
import { authApi, userApi } from "@/app/services/api/endpoints";
import { unwrapError } from "@/app/services/api/client";

// Backend authenticates by phone (see auth.controller.js).
const loginSchema = z.object({
  phone: z.string().min(10, "Enter a valid phone number"),
  password: z.string().min(6, "At least 6 characters"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Use 8+ characters for security"),
  phone: z.string().min(10, "Enter a valid phone number"),
});

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phone: "", password: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    try {
      await login(values.phone, values.password);
      toast.success("Welcome back to Sakhi 🌸");
      navigate("/app/dashboard");
    } catch (e) {
      toast.error(unwrapError(e).message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold">{t("auth.welcome_back")}</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">{t("auth.welcome_sub")}</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5">
        <Field
          label={t("auth.phone")}
          icon={<Phone className="h-4 w-4" />}
          error={form.formState.errors.phone?.message}
        >
          <Input type="tel" autoComplete="tel" {...form.register("phone")} className="pl-10 h-11 rounded-xl" />
        </Field>
        <Field
          label={t("auth.password")}
          icon={<Lock className="h-4 w-4" />}
          error={form.formState.errors.password?.message}
        >
          <Input type="password" autoComplete="current-password" {...form.register("password")} className="pl-10 h-11 rounded-xl" />
        </Field>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox id="remember" />
            <span className="text-muted-foreground">{t("auth.remember")}</span>
          </label>
          <Link to="/forgot-password" className="text-primary hover:underline">{t("auth.forgot")}</Link>
        </div>
        <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl gradient-primary text-primary-foreground shadow-md hover:shadow-glow">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{t("auth.sign_in")} <ArrowRight className="ml-1 h-4 w-4" /></>}
        </Button>
      </form>

      <OrDivider label={t("auth.or_continue")} />
      <SocialButtons />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {t("auth.no_account")} <Link to="/signup" className="text-primary font-medium hover:underline">{t("auth.sign_up")}</Link>
      </p>
    </div>
  );
}

export function SignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const signup = useAuthStore((s) => s.signup);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", phone: "" },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    try {
      await signup(values.name, values.email, values.password, values.phone);
      toast.success("Account created! Let's set things up.");
      navigate("/onboarding");
    } catch (e) {
      toast.error(unwrapError(e).message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold">{t("auth.create_account")}</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">{t("auth.create_sub")}</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <Field label={t("auth.full_name")} icon={<UserIcon className="h-4 w-4" />} error={form.formState.errors.name?.message}>
          <Input {...form.register("name")} className="pl-10 h-11 rounded-xl" />
        </Field>
        <Field label={t("auth.email")} icon={<Mail className="h-4 w-4" />} error={form.formState.errors.email?.message}>
          <Input type="email" {...form.register("email")} className="pl-10 h-11 rounded-xl" />
        </Field>
        <Field label={t("auth.phone")} icon={<Phone className="h-4 w-4" />} error={form.formState.errors.phone?.message}>
          <Input type="tel" {...form.register("phone")} className="pl-10 h-11 rounded-xl" />
        </Field>
        <Field label={t("auth.password")} icon={<Lock className="h-4 w-4" />} error={form.formState.errors.password?.message}>
          <Input type="password" {...form.register("password")} className="pl-10 h-11 rounded-xl" />
        </Field>
        <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl gradient-primary text-primary-foreground shadow-md hover:shadow-glow">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>{t("auth.sign_up")} <ArrowRight className="ml-1 h-4 w-4" /></>}
        </Button>
      </form>

      <OrDivider label={t("auth.or_continue")} />
      <SocialButtons />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {t("auth.have_account")} <Link to="/login" className="text-primary font-medium hover:underline">{t("auth.sign_in")}</Link>
      </p>
    </div>
  );
}

export function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"request" | "reset" | "done">("request");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const request = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.trim().length < 10) { toast.error("Enter a valid phone number"); return; }
    setLoading(true);
    try {
      const res = await authApi.forgotPassword(phone.trim());
      toast.success(res.message ?? "If an account exists, a reset code has been sent.");
      setStep("reset");
    } catch (e) {
      toast.error(unwrapError(e).message);
    } finally {
      setLoading(false);
    }
  };

  const reset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) { toast.error("Enter the 6-digit code"); return; }
    if (newPassword.length < 6) { toast.error("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      await authApi.resetPassword({ phone: phone.trim(), code, newPassword });
      setStep("done");
    } catch (e) {
      toast.error(unwrapError(e).message);
    } finally {
      setLoading(false);
    }
  };

  if (step === "done") {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-4">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent/20 text-accent">
          <Check className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-xl font-bold">Password updated</h1>
        <p className="mt-2 text-sm text-muted-foreground">You can now sign in with your new password.</p>
        <Button asChild variant="outline" className="mt-6 rounded-xl">
          <Link to="/login">Back to sign in</Link>
        </Button>
      </motion.div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold">{t("auth.reset_title")}</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">{t("auth.reset_sub")}</p>

      {step === "request" ? (
        <form onSubmit={request} className="mt-8 space-y-5">
          <Field label={t("auth.phone")} icon={<Phone className="h-4 w-4" />}>
            <Input type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10 h-11 rounded-xl" />
          </Field>
          <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl gradient-primary text-primary-foreground">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t("auth.send_link")}
          </Button>
        </form>
      ) : (
        <form onSubmit={reset} className="mt-8 space-y-5">
          <Field label="Reset code" icon={<Check className="h-4 w-4" />}>
            <Input inputMode="numeric" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} className="pl-10 h-11 rounded-xl tracking-[0.4em]" />
          </Field>
          <Field label="New password" icon={<Lock className="h-4 w-4" />}>
            <Input type="password" autoComplete="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="pl-10 h-11 rounded-xl" />
          </Field>
          <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl gradient-primary text-primary-foreground">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reset password"}
          </Button>
          <button type="button" onClick={() => setStep("request")} className="w-full text-sm text-muted-foreground hover:text-foreground">
            Use a different number
          </button>
        </form>
      )}

      <Link to="/login" className="mt-6 block text-center text-sm text-muted-foreground hover:text-foreground">
        {t("common.back")}
      </Link>
    </div>
  );
}

export function OtpPage() {
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const phone = user?.phone ?? "";

  const onSubmit = async () => {
    if (otp.length !== 6) return;
    if (!phone) { toast.error("Sign in first to verify your phone."); return; }
    setLoading(true);
    try {
      await authApi.verifyOtp(phone, otp);
      toast.success("Phone verified!");
      navigate("/app/dashboard");
    } catch (e) {
      toast.error(unwrapError(e).message);
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (!phone) { toast.error("Sign in first to verify your phone."); return; }
    setResending(true);
    try {
      await authApi.sendOtp(phone);
      toast.success("A new code has been sent.");
    } catch (e) {
      toast.error(unwrapError(e).message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl sm:text-3xl font-bold">{t("auth.otp_title")}</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {phone ? `${t("auth.otp_sub")} (${phone})` : t("auth.otp_sub")}
      </p>
      <div className="mt-8 flex justify-center">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, i) => (
              <InputOTPSlot key={i} index={i} className="h-12 w-12 text-lg rounded-xl" />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button onClick={onSubmit} disabled={otp.length !== 6 || loading} className="mt-8 w-full h-11 rounded-xl gradient-primary text-primary-foreground">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t("auth.verify")}
      </Button>
      <button onClick={resend} disabled={resending} className="mt-4 text-sm text-primary hover:underline disabled:opacity-50">
        {resending ? "Sending…" : t("auth.resend")}
      </button>
    </div>
  );
}

export function OnboardingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);
  const user = useAuthStore((s) => s.user);
  const [step, setStep] = useState<0 | 1>(0);
  const [lang, setLang] = useState("en");
  const [role, setRole] = useState("learner");
  const [loading, setLoading] = useState(false);

  const complete = async () => {
    setLoading(true);
    try {
      const updated = await userApi.completeOnboarding({ language: lang, role });
      setUser(updated);
      toast.success("You're all set!");
      navigate("/app/dashboard");
    } catch {
      // Still route them into the app — backend is optional in demo
      if (user) setUser({ ...user, language: lang, role: role as never, onboarded: true });
      navigate("/app/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-8">
        {[0, 1].map((s) => (
          <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${step >= s ? "gradient-primary" : "bg-muted"}`} />
        ))}
      </div>

      {step === 0 && (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-2xl font-bold">{t("auth.select_language")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("auth.onboarding_sub")}</p>
          <RadioGroup value={lang} onValueChange={setLang} className="mt-6 grid gap-3">
            {[
              { v: "en", label: "English" },
              { v: "hi", label: "हिन्दी (Hindi)" },
              { v: "mr", label: "मराठी (Marathi)" },
            ].map((o) => (
              <label key={o.v} htmlFor={o.v} className={`flex items-center gap-3 rounded-2xl border p-4 cursor-pointer transition-all ${lang === o.v ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}>
                <RadioGroupItem value={o.v} id={o.v} />
                <span className="font-medium">{o.label}</span>
              </label>
            ))}
          </RadioGroup>
          <Button onClick={() => setStep(1)} className="mt-8 w-full h-11 rounded-xl gradient-primary text-primary-foreground">
            {t("auth.continue")} <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-2xl font-bold">{t("auth.select_role")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("auth.onboarding_sub")}</p>
          <RadioGroup value={role} onValueChange={setRole} className="mt-6 grid gap-3">
            {[
              { v: "learner", label: t("auth.role_learner") },
              { v: "earner", label: t("auth.role_earner") },
              { v: "seller", label: t("auth.role_seller") },
            ].map((o) => (
              <label key={o.v} htmlFor={`r-${o.v}`} className={`flex items-center gap-3 rounded-2xl border p-4 cursor-pointer transition-all ${role === o.v ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}>
                <RadioGroupItem value={o.v} id={`r-${o.v}`} />
                <span className="font-medium">{o.label}</span>
              </label>
            ))}
          </RadioGroup>
          <Button onClick={complete} disabled={loading} className="mt-8 w-full h-11 rounded-xl gradient-primary text-primary-foreground">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t("auth.continue")}
          </Button>
          <button onClick={() => navigate("/app/dashboard")} className="mt-3 w-full text-sm text-muted-foreground hover:text-foreground">
            {t("auth.skip")}
          </button>
        </motion.div>
      )}
    </div>
  );
}

/* ————— helpers ————— */
function Field({ label, icon, error, children }: { label: string; icon?: React.ReactNode; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      <div className="relative mt-1.5">
        {icon && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>}
        {children}
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function OrDivider({ label }: { label: string }) {
  return (
    <div className="my-6 flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" className="rounded-xl h-11">Google</Button>
      <Button variant="outline" className="rounded-xl h-11">Apple</Button>
    </div>
  );
}
