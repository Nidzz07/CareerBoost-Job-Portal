import { Outlet, Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BrandMark } from "../components/BrandMark";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

export function PublicLayout() {
  const { t } = useTranslation();
  const nav = [
    { to: "/", label: t("nav.home"), end: true },
    { to: "/about", label: t("nav.about") },
    { to: "/help", label: t("nav.help") },
  ];
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sticky top-0 z-40"
      >
        <div className="mx-auto mt-4 max-w-6xl px-4">
          <div className="glass flex items-center justify-between gap-3 rounded-full px-4 py-2.5">
            <Link to="/" aria-label="Sakhi home">
              <BrandMark />
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {nav.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) =>
                    `px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-1">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button asChild variant="ghost" size="sm" className="rounded-full hidden sm:inline-flex">
                <Link to="/login">{t("nav.login")}</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full gradient-primary text-primary-foreground shadow-md hover:shadow-glow transition-shadow">
                <Link to="/signup">{t("nav.signup")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/60 bg-card/40 mt-20">
        <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 md:grid-cols-4">
          <div>
            <BrandMark />
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">{t("brand.tagline")}</p>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Product</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/help" className="hover:text-foreground">Help center</Link></li>
              <li><Link to="/login" className="hover:text-foreground">Sign in</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Modules</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/signup" className="hover:text-foreground">Learn</Link></li>
              <li><Link to="/signup" className="hover:text-foreground">Earn</Link></li>
              <li><Link to="/signup" className="hover:text-foreground">Flourish</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Get in touch</div>
            <p className="text-sm text-muted-foreground">hello@sakhi.app</p>
            <p className="text-xs text-muted-foreground mt-6">© {new Date().getFullYear()} Sakhi. {t("landing.footer_rights")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
