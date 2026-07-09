import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowRight, Play, Sparkles, GraduationCap, Briefcase, Store,
  Star, Quote, ShieldCheck, Zap, Heart, Globe2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { PageMotion } from "../components/PageMotion";

const stats = [
  { key: "stat_women", value: "128K+" },
  { key: "stat_courses", value: "1,200" },
  { key: "stat_jobs", value: "8,500" },
  { key: "stat_earnings", value: "₹42Cr" },
];

const partners = ["Google.org", "UN Women", "NASSCOM", "TATA", "Microsoft", "Unilever"];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Learner → Designer, Bengaluru",
    quote:
      "In three months on Sakhi I went from a curious learner to a freelance designer earning steady income. The lessons were in my language, at my pace.",
  },
  {
    name: "Anjali Deshmukh",
    role: "Marketplace seller, Pune",
    quote:
      "Sakhi's AI wrote beautiful descriptions for my sarees. My sales tripled in the first month. It felt like having a whole team behind me.",
  },
  {
    name: "Rukmini Iyer",
    role: "Data analyst, Chennai",
    quote:
      "The verified jobs meant no scams, no fake recruiters. Just real opportunities matched to my skills.",
  },
];

const faqs = [
  { q: "Is Sakhi really free to use?", a: "Yes — Learn is 100% free forever. Earn and Flourish take a small transparent fee only when you succeed." },
  { q: "Which languages does Sakhi support?", a: "English, Hindi, Marathi today — with Tamil, Bengali, Kannada and Telugu coming next." },
  { q: "How does AI personalise my journey?", a: "Every recommendation is based on your goals, pace and past activity — never on invasive tracking." },
  { q: "Can I use Sakhi on a low-end phone?", a: "Absolutely. Sakhi is designed mobile-first and works beautifully on 2G/3G networks." },
];

export function LandingPage() {
  const { t } = useTranslation();

  return (
    <PageMotion>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero pointer-events-none" />
        <div className="absolute top-24 -left-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl animate-float" />
        <div className="absolute top-40 -right-24 h-96 w-96 rounded-full bg-secondary/25 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {t("landing.eyebrow")}
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              <span className="text-gradient">{t("landing.title")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t("landing.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full gradient-primary text-primary-foreground shadow-glow hover:scale-[1.02] transition-transform">
                <Link to="/signup">
                  {t("landing.cta_primary")}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full glass border-border">
                <Link to="#features">
                  <Play className="mr-1 h-4 w-4" />
                  {t("landing.cta_secondary")}
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Floating dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-16 max-w-4xl"
          >
            <div className="glass rounded-3xl p-3 shadow-elegant">
              <div className="rounded-2xl bg-card p-6 sm:p-10">
                <div className="grid gap-6 sm:grid-cols-3">
                  {[
                    { icon: GraduationCap, label: "Lessons this week", value: "12", color: "text-primary" },
                    { icon: Briefcase, label: "Job matches", value: "8", color: "text-secondary" },
                    { icon: Store, label: "Orders shipped", value: "24", color: "text-accent" },
                  ].map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="rounded-2xl border border-border bg-background/60 p-5 hover-lift"
                    >
                      <s.icon className={`h-6 w-6 ${s.color}`} />
                      <div className="mt-4 text-3xl font-bold">{s.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold text-gradient">{s.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{t(`landing.${s.key}`)}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">{t("landing.features_title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("landing.features_subtitle")}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { icon: GraduationCap, key: "learn", tint: "from-primary/20 to-primary/5" },
            { icon: Briefcase, key: "earn", tint: "from-secondary/20 to-secondary/5" },
            { icon: Store, key: "flourish", tint: "from-accent/20 to-accent/5" },
          ].map((f, i) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`relative overflow-hidden rounded-3xl border-border bg-gradient-to-br ${f.tint} p-8 hover-lift h-full`}>
                <div className="gradient-primary inline-flex rounded-2xl p-3 shadow-md">
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="mt-6 text-2xl font-bold">{t(`landing.${f.key}_title`)}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t(`landing.${f.key}_desc`)}</p>
                <Link to="/signup" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary story-link">
                  Explore <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Value pillars */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "Verified & safe", desc: "Every course and job is human-reviewed." },
            { icon: Zap, title: "AI-personalised", desc: "Recommendations that actually fit you." },
            { icon: Globe2, title: "Your language", desc: "English, Hindi, Marathi and growing." },
            { icon: Heart, title: "Community-led", desc: "Learning circles and mentors near you." },
          ].map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <p.icon className="h-5 w-5 text-primary" />
              <div className="mt-4 font-semibold">{p.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{p.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">Trusted by partners</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partners.map((p) => (
            <span key={p} className="text-lg font-display font-semibold text-muted-foreground/70 hover:text-foreground transition-colors">
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">{t("landing.stories_title")}</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-3xl border-border bg-card p-8 h-full">
                <Quote className="h-6 w-6 text-primary/60" />
                <p className="mt-4 text-sm leading-relaxed">{s.quote}</p>
                <div className="mt-6 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <div className="mt-4">
                  <div className="font-semibold text-sm">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.role}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">{t("landing.faq_title")}</h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-medium hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="relative overflow-hidden rounded-4xl gradient-primary p-10 sm:p-16 text-center shadow-glow">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_80%,white,transparent_40%)]" />
          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-bold text-primary-foreground">Your journey starts today.</h2>
            <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
              Join 128,000+ women learning, earning and flourishing on Sakhi.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full bg-card text-foreground hover:bg-card/90 shadow-lg">
              <Link to="/signup">{t("landing.cta_primary")} <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </PageMotion>
  );
}
