import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

import Auth from "@/pages/Auth";
import Onboarding from "@/pages/Onboarding";
import Dashboard from "@/pages/Dashboard";
import Tracking from "@/pages/Tracking";
import Learning from "@/pages/Learning";
import Chat from "@/pages/Chat";
import Doctors from "@/pages/Doctors";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/" />;
  }

  if (!user.onboardingCompleted) {
    return <Redirect to="/onboarding" />;
  }

  return (
    <Layout>
      <Component />
    </Layout>
  );
}

function Router() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <Switch>
      <Route path="/">
        {user ? <Redirect to="/dashboard" /> : <Auth />}
      </Route>
      
      <Route path="/onboarding">
        {user ? <Onboarding /> : <Redirect to="/" />}
      </Route>

      <Route path="/dashboard">
        <ProtectedRoute component={Dashboard} />
      </Route>
      
      <Route path="/tracking">
        <ProtectedRoute component={Tracking} />
      </Route>

      <Route path="/learning">
        <ProtectedRoute component={Learning} />
      </Route>

      <Route path="/chat">
        <ProtectedRoute component={Chat} />
      </Route>

      <Route path="/doctors">
        <ProtectedRoute component={Doctors} />
      </Route>

      <Route path="/settings">
        <ProtectedRoute component={Settings} />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
