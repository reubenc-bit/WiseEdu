import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MarketProvider } from "@/contexts/MarketContext";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";

// Pages
import Landing from "@/pages/Landing";
import StudentDashboard from "@/pages/StudentDashboard";
import TeacherDashboard from "@/pages/TeacherDashboard";
import ParentDashboard from "@/pages/ParentDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import Courses from "@/pages/Courses";
import CoursesPage from "@/pages/CoursesPage";
import TeacherResources from "@/pages/TeacherResources";
import ProfessionalDevelopmentPrograms from "@/pages/ProfessionalDevelopmentPrograms";
import CodingHub from "@/pages/CodingHub";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function RoleDashboard({ user }: { user: any }) {
  switch (user?.role) {
    case 'teacher':
      return <TeacherDashboard />;
    case 'parent':
      return <ParentDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <StudentDashboard />;
  }
}

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();

  return (
    <Switch>
      {/* Home route - shows Landing page or role-based dashboard */}
      <Route path="/">
        {isLoading || !isAuthenticated ? <Landing /> : <RoleDashboard user={user} />}
      </Route>

      {/* Public routes - accessible without authentication */}
      <Route path="/teacher-resources" component={TeacherResources} />
      <Route path="/professional-development" component={ProfessionalDevelopmentPrograms} />
      <Route path="/courses" component={CoursesPage} />

      {/* Protected routes - only accessible when authenticated */}
      <Route path="/dashboard/courses">
        {isAuthenticated ? <Courses /> : <Landing />}
      </Route>
      <Route path="/coding-hub">
        {isAuthenticated ? <CodingHub /> : <Landing />}
      </Route>

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MarketProvider>
          <Layout>
            <Router />
          </Layout>
        </MarketProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
