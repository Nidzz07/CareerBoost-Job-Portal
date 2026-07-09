import { useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./i18n";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useAuthStore } from "./store/auth";

import { PublicLayout } from "./layouts/PublicLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { AppLayout } from "./layouts/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { LandingPage } from "./pages/Landing";
import { AboutPage } from "./pages/About";
import { HelpPage } from "./pages/Help";
import { NotFoundPage } from "./pages/NotFound";

import { LoginPage, SignupPage, ForgotPasswordPage, OtpPage, OnboardingPage } from "./pages/Auth";

import { DashboardPage } from "./pages/Dashboard";
import { LearnPage, CourseDetailPage } from "./pages/Learn";
import { EarnPage, JobDetailPage } from "./pages/Earn";
import { MarketplacePage, ProductDetailPage, CartPage, CheckoutPage, UploadProductPage } from "./pages/Flourish";
import { ProfilePage } from "./pages/Profile";
import { NotificationsPage } from "./pages/Notifications";
import { SettingsPage } from "./pages/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppShell() {
  const restore = useAuthStore((s) => s.restore);
  useEffect(() => {
    void restore();
  }, [restore]);

  return (
    <HashRouter>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public marketing */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Route>

          {/* Auth */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify" element={<OtpPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
          </Route>

          {/* Protected app */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
            <Route path="/app/dashboard" element={<DashboardPage />} />
            <Route path="/app/learn" element={<LearnPage />} />
            <Route path="/app/learn/:id" element={<CourseDetailPage />} />
            <Route path="/app/earn" element={<EarnPage />} />
            <Route path="/app/earn/:id" element={<JobDetailPage />} />
            <Route path="/app/flourish" element={<MarketplacePage />} />
            <Route path="/app/flourish/upload" element={<UploadProductPage />} />
            <Route path="/app/flourish/:id" element={<ProductDetailPage />} />
            <Route path="/app/cart" element={<CartPage />} />
            <Route path="/app/checkout" element={<CheckoutPage />} />
            <Route path="/app/profile" element={<ProfilePage />} />
            <Route path="/app/notifications" element={<NotificationsPage />} />
            <Route path="/app/settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </HashRouter>
  );
}

export function AppClient() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider delayDuration={200}>
          <AppShell />
          <Toaster position="top-right" richColors closeButton />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
