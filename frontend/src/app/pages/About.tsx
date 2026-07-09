import { motion } from "framer-motion";
import { PageMotion } from "../components/PageMotion";
import { Heart, Target, Users } from "lucide-react";

export function AboutPage() {
  return (
    <PageMotion className="mx-auto max-w-4xl px-6 py-16">
      <div className="text-center">
        <span className="text-xs uppercase tracking-widest text-primary font-medium">About Sakhi</span>
        <h1 className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight">
          Built with love, <span className="text-gradient">powered by AI</span>, for every woman.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
          Sakhi began with a simple belief — that every woman deserves the tools, mentors and marketplace to shape her own future. We combined AI with community to make that possible.
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {[
          { icon: Heart, title: "Our mission", body: "Unlock economic independence for 10M women by 2030." },
          { icon: Target, title: "How we do it", body: "AI-personalised learning, verified jobs and a fair marketplace." },
          { icon: Users, title: "Our community", body: "128,000+ women, 4,200+ mentors and growing every day." },
        ].map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl border border-border bg-card p-6 hover-lift"
          >
            <p.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </PageMotion>
  );
}
