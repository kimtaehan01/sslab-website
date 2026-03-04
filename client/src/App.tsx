import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Research from "./pages/Research";
import Members from "./pages/Members";
import Publications from "./pages/Publications";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import MembersAdmin from "./pages/admin/MembersAdmin";
import PublicationsAdmin from "./pages/admin/PublicationsAdmin";
import ResearchAdmin from "./pages/admin/ResearchAdmin";
import NewsAdmin from "./pages/admin/NewsAdmin";

function PublicRouter() {
  return (
    <Layout>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/research" component={Research} />
        <Route path="/members" component={Members} />
        <Route path="/publications" component={Publications} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function AdminRouter() {
  return (
    <AdminLayout>
      <ScrollToTop />
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/members" component={MembersAdmin} />
        <Route path="/admin/publications" component={PublicationsAdmin} />
        <Route path="/admin/research" component={ResearchAdmin} />
        <Route path="/admin/news" component={NewsAdmin} />
        <Route component={NotFound} />
      </Switch>
    </AdminLayout>
  );
}

function Router() {
  return (
    <Switch>
      {/* Admin routes */}
      <Route path="/admin/:rest*" component={AdminRouter} />
      <Route path="/admin" component={AdminRouter} />
      {/* Public routes */}
      <Route component={PublicRouter} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
