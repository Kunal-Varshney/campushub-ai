import { Routes, Route } from "react-router-dom";

// Main Pages
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Careers from "./Pages/Careers/Careers";
import Privacy from "./Pages/Privacy/Privacy";
import Terms from "./Pages/Terms/Terms";

// Authentication
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Forgot from "./Pages/Forgot/ForgotPassword";

// Dashboard
import StudentDashboard from "./Pages/Dashboard/StudentDashboard";
import Discover from "./Pages/Discover/Discover";
import Settings from "./Pages/Settings/Settings";
import Profile from "./Pages/Profile/Profile";

// Features
import AIAssistant from "./Pages/Features/AIAssistant";
import SmartNotes from "./Pages/Features/SmartNotes";
import ResumeBuilder from "./Pages/Features/ResumeBuilder";
import MockInterview from "./Pages/Features/MockInterview";
import InternshipFinder from "./Pages/Features/InternshipFinder";
import SkillRoadmap from "./Pages/Features/SkillRoadmap";
import Certificates from "./Pages/Features/Certificates";
import Community from "./Pages/Features/Community";

// Layout
import MainLayout from "./layouts/MainLayout";

// Admin
import AdminDashboard from "./Pages/Admin/AdminDashboard";

function App() {
  return (
    <Routes>

      {/* ================= MAIN WEBSITE ================= */}

      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/careers" element={<Careers />} />

        <Route path="/privacy" element={<Privacy />} />

        <Route path="/terms" element={<Terms />} />


        {/* ================= DASHBOARD / DISCOVER ================= */}

        <Route path="/discover" element={<Discover />} />


        {/* ================= FEATURES ================= */}

        <Route path="/ai-assistant" element={<AIAssistant />} />

        <Route path="/smart-notes" element={<SmartNotes />} />

        <Route path="/resume-builder" element={<ResumeBuilder />} />

        <Route path="/mock-interview" element={<MockInterview />} />

        <Route path="/internship-finder" element={<InternshipFinder />} />

        <Route path="/skill-roadmap" element={<SkillRoadmap />} />

        <Route path="/certificates" element={<Certificates />} />

        <Route path="/community" element={<Community />} />

      </Route>


      {/* ================= AUTHENTICATION ================= */}

      <Route path="/signup" element={<Signup />} />

      <Route path="/login" element={<Login />} />

      <Route path="/forgot-password" element={<Forgot />} />


      {/* ================= STUDENT DASHBOARD ================= */}

      <Route path="/dashboard" element={<StudentDashboard />} />

      <Route path="/settings" element={<Settings />} />

      <Route path="/profile" element={<Profile />} />


      {/* ================= ADMIN PANEL ================= */}

      <Route path="/admin/dashboard" element={<AdminDashboard />} />

    </Routes>
  );
}

export default App;