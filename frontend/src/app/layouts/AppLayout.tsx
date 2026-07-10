import { Outlet, NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useState, type FormEvent } from "react";
import {
  Home, GraduationCap, Briefcase, Store, User, Bell, Settings, LogOut,
  Menu, X, ShoppingBag, Search, Library, ShieldCheck, ClipboardList, Building2, Package, FileText,
} from "lucide-react";
import { BrandMark } from "../components/BrandMark";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useAuthStore } from "@/app/store/auth";
import { useCartStore } from "@/app/store/cart";
import { filterNavByRole, type RoleNavItem } from "@/app/lib/roles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { cn } from "@/lib/utils";

export function AppLayout() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const cartCount = useCartStore((s) => s.count());
  const navigate = useNavigate();
  const location = useLocation();

  // Global search: the header field routes to the dedicated search results page,
  // which performs the debounced cross-module search.
  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    navigate(q ? `/app/search?q=${encodeURIComponent(q)}` : "/app/search");
  };

  // Nav items may carry a `roles` restriction; all current items are visible to every
  // role. Role-scoped destinations (admin/employer/seller) are added in later phases.
  const nav: Array<RoleNavItem & { icon: typeof Home }> = [
    { to: "/app/dashboard", icon: Home, label: t("nav.dashboard") },
    { to: "/app/search", icon: Search, label: t("nav.search") },
    { to: "/app/learn", icon: GraduationCap, label: t("nav.learn") },
    { to: "/app/learn/mine", icon: Library, label: "My Learning" },
    { to: "/app/earn", icon: Briefcase, label: t("nav.earn") },
    { to: "/app/earn/mine", icon: ClipboardList, label: "My Jobs" },
    { to: "/app/earn/manage", icon: Building2, label: "Hiring", roles: ["earner", "all"] },
    { to: "/app/flourish", icon: Store, label: t("nav.flourish") },
    { to: "/app/flourish/mine", icon: Package, label: "My Shop", roles: ["seller", "all"] },
    { to: "/app/orders", icon: ShoppingBag, label: "Orders" },
    { to: "/app/resume", icon: FileText, label: "Resume" },
    { to: "/app/admin/courses", icon: ShieldCheck, label: "Review Queue", roles: ["all"] },
  ];
  const visibleNav = filterNavByRole(nav, user);

  const initials = (user?.name ?? "S").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

  const SidebarNav = () => (
    <nav className="flex flex-col gap-1">
      {visibleNav.map((n) => (
        <NavLink
          key={n.to}
          to={n.to}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            cn(
              "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all",
              isActive
                ? "bg-primary/10 text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )
          }
        >
          {({ isActive }) => (
            <>
              <n.icon className={cn("h-4.5 w-4.5 transition-transform group-hover:scale-110", isActive && "text-primary")} />
              <span>{n.label}</span>
              {isActive && (
                <motion.div layoutId="active-nav-dot" className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-dvh bg-background">
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <button aria-label="Menu" onClick={() => setMobileOpen(true)} className="rounded-full p-2 hover:bg-muted">
            <Menu className="h-5 w-5" />
          </button>
          <BrandMark />
          <div className="flex items-center gap-1">
            <Link to="/app/search" aria-label={t("nav.search")} className="rounded-full p-2 hover:bg-muted">
              <Search className="h-5 w-5" />
            </Link>
            <Link to="/app/cart" aria-label="Cart" className="relative rounded-full p-2 hover:bg-muted">
              <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 text-[10px] rounded-full gradient-primary text-primary-foreground grid place-items-center">
                {cartCount}
              </span>
            )}
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px]">
        {/* Sidebar - desktop */}
        <aside className="hidden lg:flex sticky top-0 h-dvh w-64 shrink-0 flex-col gap-6 border-r border-border/60 px-5 py-6">
          <Link to="/app/dashboard"><BrandMark /></Link>
          <SidebarNav />
          <div className="mt-auto rounded-2xl gradient-aurora p-4 text-white">
            <div className="text-xs font-medium opacity-90">Weekly streak</div>
            <div className="mt-1 text-2xl font-bold">{user?.streak ?? 7} 🔥</div>
            <p className="mt-2 text-xs opacity-90">Keep going! You're doing amazing.</p>
          </div>
        </aside>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", damping: 24 }}
                className="fixed inset-y-0 left-0 z-50 w-72 bg-card p-6 lg:hidden overflow-y-auto"
              >
                <div className="flex items-center justify-between">
                  <BrandMark />
                  <button aria-label="Close" onClick={() => setMobileOpen(false)} className="rounded-full p-2 hover:bg-muted">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-8"><SidebarNav /></div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Desktop top bar */}
          <header className="hidden lg:flex sticky top-0 z-30 items-center gap-4 border-b border-border/60 bg-background/70 px-8 py-4 backdrop-blur-xl">
            <form onSubmit={submitSearch} className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("search.placeholder")}
                aria-label={t("search.placeholder")}
                className="pl-10 rounded-full bg-muted/50 border-transparent focus-visible:bg-card"
              />
            </form>
            <div className="flex items-center gap-1">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button asChild variant="ghost" size="icon" className="rounded-full relative" aria-label="Notifications">
                <Link to="/app/notifications">
                  <Bell className="h-4.5 w-4.5" />
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-secondary" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="rounded-full relative" aria-label="Cart">
                <Link to="/app/cart">
                  <ShoppingBag className="h-4.5 w-4.5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 p-0 grid place-items-center rounded-full gradient-primary text-[10px] text-primary-foreground border-2 border-background">
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="ml-2 rounded-full ring-2 ring-transparent hover:ring-primary/40 transition">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.avatar_url} alt={user?.name ?? ""} />
                      <AvatarFallback className="gradient-primary text-primary-foreground font-semibold text-xs">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-2xl w-56">
                  <DropdownMenuLabel>
                    <div className="text-sm font-semibold">{user?.name}</div>
                    <div className="text-xs text-muted-foreground font-normal">{user?.email}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link to="/app/profile"><User className="h-4 w-4 mr-2" />{t("nav.profile")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link to="/app/settings"><Settings className="h-4 w-4 mr-2" />{t("nav.settings")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={async () => { await logout(); navigate("/login"); }}
                    className="rounded-lg cursor-pointer text-destructive focus:text-destructive"
                  >
                    <LogOut className="h-4 w-4 mr-2" />{t("nav.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
            {/* Per-page boundary: a crash in one page shows a fallback but keeps the
                app chrome, and recovers automatically when navigating elsewhere. */}
            <ErrorBoundary compact resetKey={location.pathname}>
              <Outlet />
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </div>
  );
}
