import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BrandMark } from "../components/BrandMark";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { ThemeToggle } from "../components/ThemeToggle";

export function AuthLayout() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 gradient-hero" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full gradient-primary opacity-30 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/40 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 mx-auto max-w-md px-6 py-8">
        <div className="flex items-center justify-between">
          <Link to="/"><BrandMark /></Link>
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-10 glass rounded-3xl p-8 shadow-elegant"
        >
          <Outlet />
        </motion.div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          By continuing you agree to Sakhi's <a href="#" className="underline hover:text-foreground">Terms</a> &amp; <a href="#" className="underline hover:text-foreground">Privacy</a>.
        </p>
      </div>
    </div>
  );
}
