import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  ClerkProvider,
  useAuth,
} from "@clerk/clerk-react";
import TaskManager from "./pages/TaskManager";
import LandingPage from "./pages/Landing";
import LoadingSpinner from "./components/LoadingSpinner";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const AppRoutes = () => {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <Navigate to="/dashboard" />
            </SignedIn>
            <SignedOut>
              <LandingPage />
            </SignedOut>
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <TaskManager />
            </SignedIn>
            <SignedOut>
              <Navigate to="/" />
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
};

function App() {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden">
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        navigate={(to) => navigate(to)}
        afterSignOutUrl="/"
      >
        <AppRoutes />
      </ClerkProvider>
    </div>
  );
}

export default App;
