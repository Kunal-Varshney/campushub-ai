import { Navigate, Routes, Route } from "react-router-dom";

// ============================================================
// MAIN PAGES
// ============================================================

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Careers from "./Pages/Careers/Careers";
import Privacy from "./Pages/Privacy/Privacy";
import Terms from "./Pages/Terms/Terms";

// ============================================================
// AUTHENTICATION
// ============================================================

import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Forgot from "./Pages/Forgot/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/Resetpassword";
import GoogleLoginSuccess from "./Pages/GoogleLoginSuccess/GoogleLoginSuccess";

// ============================================================
// DASHBOARD
// ============================================================

import StudentDashboard from "./Pages/Dashboard/StudentDashboard";
import NotificationCenter from "./Pages/Dashboard/NotificationCenter";
import Discover from "./Pages/Discover/Discover";
import Settings from "./Pages/Settings/Settings";
import Profile from "./Pages/Profile/Profile";

// ============================================================
// FEATURES
// ============================================================

import AIAssistant from "./Pages/Features/AIAssistant";
import SmartNotes from "./Pages/Features/SmartNotes";
import ResumeBuilder from "./Pages/Features/ResumeBuilder";
import MockInterview from "./Pages/Features/MockInterview";
import InternshipFinder from "./Pages/Features/InternshipFinder";
import SkillRoadmap from "./Pages/Features/SkillRoadmap";
import Certificates from "./Pages/Features/Certificates";
import Community from "./Pages/Features/Community";
import VerifyCertificate from "./Pages/Features/VerifyCertificate";

// ============================================================
// LAYOUT
// ============================================================

import MainLayout from "./layouts/MainLayout";

// ============================================================
// ADMIN
// ============================================================

import AdminDashboard from "./Pages/Admin/AdminDashboard";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";


// ============================================================
// AUTH HELPERS
// ============================================================

// Logged-in user ko login/signup page access nahi karne dena
function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    let user = null;

    try {
      user = JSON.parse(localStorage.getItem("user") || "null");
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
    }

    // Admin ko admin dashboard par bhejo
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    // Normal authenticated user
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


// ============================================================
// PROTECTED ROUTE
// ============================================================

// Sirf authenticated users ke liye
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// ============================================================
// ADMIN ROUTE
// ============================================================

// Sirf authenticated admin users ke liye
function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch (error) {
    console.error("Invalid user data in localStorage:", error);
  }

  // Login nahi hai
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged-in user admin nahi hai
  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


// ============================================================
// APP
// ============================================================

function App() {
  return (
    <Routes>

      {/* ====================================================
          MAIN WEBSITE + PUBLIC FEATURES + PROTECTED FEATURES
          MainLayout = Navbar + Page Content + Footer
      ==================================================== */}

      <Route element={<MainLayout />}>

        {/* ==================================================
            PUBLIC MAIN PAGES
        ================================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/careers"
          element={<Careers />}
        />

        <Route
          path="/privacy"
          element={<Privacy />}
        />

        <Route
          path="/terms"
          element={<Terms />}
        />

        {/* ==================================================
            DISCOVER
        ================================================== */}

        <Route
          path="/discover"
          element={<Discover />}
        />

        {/* ==================================================
            PUBLIC CERTIFICATE VERIFICATION
        ================================================== */}

        <Route
          path="/certificates/verify/:credentialId"
          element={<VerifyCertificate />}
        />


        {/* ==================================================
            PROTECTED FEATURES

            These pages will now automatically get:

            Navbar
              ↓
            Feature Page
              ↓
            Footer
        ================================================== */}

        <Route
          path="/ai-assistant"
          element={
            <ProtectedRoute>
              <AIAssistant />
            </ProtectedRoute>
          }
        />

        <Route
          path="/smart-notes"
          element={
            <ProtectedRoute>
              <SmartNotes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume-builder"
          element={
            <ProtectedRoute>
              <ResumeBuilder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mock-interview"
          element={
            <ProtectedRoute>
              <MockInterview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/internship-finder"
          element={
            <ProtectedRoute>
              <InternshipFinder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skill-roadmap"
          element={
            <ProtectedRoute>
              <SkillRoadmap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/certificates"
          element={
            <ProtectedRoute>
              <Certificates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />

      </Route>


      {/* ====================================================
          AUTHENTICATION
          These intentionally stay OUTSIDE MainLayout
      ==================================================== */}

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/auth/google/success"
        element={<GoogleLoginSuccess />}
      />

      <Route
        path="/verify-email"
        element={<VerifyEmail />}
      />

      <Route
        path="/forgot-password"
        element={<Forgot />}
      />

      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />


      {/* ====================================================
          PROTECTED STUDENT DASHBOARD
          Dashboard has its own UI/layout
      ==================================================== */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <NotificationCenter />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />


      {/* ====================================================
          ADMIN PANEL
          Admin has its own UI/layout
      ==================================================== */}

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

    </Routes>
  );
}

export default App;