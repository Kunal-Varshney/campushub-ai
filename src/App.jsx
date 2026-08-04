import {
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Careers from "./pages/Careers/Careers";
import Privacy from "./pages/Privacy/Privacy";
import Terms from "./pages/Terms/Terms";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";

import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import Discover from "./pages/Discover/Discover";

import Forgot from "./pages/Forgot/ForgotPassword";
import Settings from "./pages/Settings/Settings";
import AIAssistant from "./Pages/Features/AIAssistant";
import SmartNotes from "./Pages/Features/SmartNotes";

function App() {

  return (
    <>
      <ScrollToTop />

      <Routes>

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


        {/* Authentication */}

        <Route 
          path="/signup" 
          element={<Signup />} 
        />

        <Route 
          path="/login" 
          element={<Login />} 
        />

        <Route 
          path="/forgot-password" 
          element={<Forgot />} 
        />

        <Route
          path="/settings"
          element={<Settings />}
        />


        {/* Main Pages */}

        <Route 
          path="/dashboard" 
          element={<StudentDashboard />} 
        />

        <Route 
          path="/discover" 
          element={<Discover />} 
        />

        <Route 
          path="/ai-assistant" 
          element={<AIAssistant />} 
        />

        <Route 
          path="/smart-notes" 
          element={<SmartNotes />} 
        />


      </Routes>
    </>
  );
}

export default App;