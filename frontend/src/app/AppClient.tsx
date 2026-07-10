import { useEffect } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./i18n";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PreferencesProvider } from "./contexts/PreferencesContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useAuthStore } from "./store/auth";

import { PublicLayout } from "./layouts/PublicLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import { AppLayout } from "./layouts/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RoleRoute } from "./components/RoleRoute";

import { LandingPage } from "./pages/Landing";
import { AboutPage } from "./pages/About";
import { HelpPage } from "./pages/Help";
import { NotFoundPage } from "./pages/NotFound";

import { LoginPage, SignupPage, ForgotPasswordPage, OtpPage, OnboardingPage } from "./pages/Auth";

import { DashboardPage } from "./pages/Dashboard";
import { LearnPage, CourseDetailPage } from "./pages/Learn";
import { MyCoursesPage } from "./pages/MyCourses";
import { CoursePlayerPage } from "./pages/CoursePlayer";
import { QuizPage } from "./pages/Quiz";
import { CertificatesPage } from "./pages/Certificates";
import { CourseEditorPage } from "./pages/CourseEditor";
import { AdminCourseReviewPage } from "./pages/AdminCourseReview";
import { EarnPage, JobDetailPage } from "./pages/Earn";
import { MyJobsPage } from "./pages/MyJobs";
import { EmployerJobsPage } from "./pages/EmployerJobs";
import { JobEditorPage } from "./pages/JobEditor";
import { JobApplicantsPage } from "./pages/JobApplicants";
import { MarketplacePage, ProductDetailPage, CartPage, CheckoutPage, UploadProductPage } from "./pages/Flourish";
import { MyProductsPage } from "./pages/MyProducts";
import { SellerDashboardPage } from "./pages/SellerDashboard";
import { OrdersPage } from "./pages/Orders";
import { ProfilePage } from "./pages/Profile";
import { ResumePage } from "./pages/Resume";
import { SearchResultsPage } from "./pages/SearchResults";
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
            <Route path="/app/learn/mine" element={<MyCoursesPage />} />
            <Route path="/app/learn/create" element={<CourseEditorPage />} />
            <Route path="/app/learn/:id" element={<CourseDetailPage />} />
            <Route path="/app/learn/:id/edit" element={<CourseEditorPage />} />
            <Route path="/app/learn/:id/learn" element={<CoursePlayerPage />} />
            <Route path="/app/learn/:id/quiz" element={<QuizPage />} />
            <Route path="/app/certificates" element={<CertificatesPage />} />
            <Route
              path="/app/admin/courses"
              element={
                <RoleRoute allow={["all"]}>
                  <AdminCourseReviewPage />
                </RoleRoute>
              }
            />
            <Route path="/app/earn" element={<EarnPage />} />
            <Route path="/app/earn/mine" element={<MyJobsPage />} />
            <Route path="/app/earn/manage" element={<RoleRoute allow={["earner", "all"]}><EmployerJobsPage /></RoleRoute>} />
            <Route path="/app/earn/post" element={<RoleRoute allow={["earner", "all"]}><JobEditorPage /></RoleRoute>} />
            <Route path="/app/earn/:id" element={<JobDetailPage />} />
            <Route path="/app/earn/:id/edit" element={<RoleRoute allow={["earner", "all"]}><JobEditorPage /></RoleRoute>} />
            <Route path="/app/earn/:id/applicants" element={<RoleRoute allow={["earner", "all"]}><JobApplicantsPage /></RoleRoute>} />
            <Route path="/app/flourish" element={<MarketplacePage />} />
            <Route path="/app/flourish/mine" element={<RoleRoute allow={["seller", "all"]}><MyProductsPage /></RoleRoute>} />
            <Route path="/app/flourish/seller" element={<RoleRoute allow={["seller", "all"]}><SellerDashboardPage /></RoleRoute>} />
            <Route path="/app/flourish/upload" element={<RoleRoute allow={["seller", "all"]}><UploadProductPage /></RoleRoute>} />
            <Route path="/app/flourish/:id/edit" element={<RoleRoute allow={["seller", "all"]}><UploadProductPage /></RoleRoute>} />
            <Route path="/app/flourish/:id" element={<ProductDetailPage />} />
            <Route path="/app/cart" element={<CartPage />} />
            <Route path="/app/checkout" element={<CheckoutPage />} />
            <Route path="/app/orders" element={<OrdersPage />} />
            <Route path="/app/search" element={<SearchResultsPage />} />
            <Route path="/app/profile" element={<ProfilePage />} />
            <Route path="/app/resume" element={<ResumePage />} />
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
        <PreferencesProvider>
          <TooltipProvider delayDuration={200}>
            <ErrorBoundary>
              <AppShell />
            </ErrorBoundary>
            <Toaster position="top-right" richColors closeButton />
          </TooltipProvider>
        </PreferencesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
