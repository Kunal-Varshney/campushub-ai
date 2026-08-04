import {
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Careers from "./pages/Careers/Careers";
import Privacy from "./pages/Privacy/Privacy";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";


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
          path="/signup" 
          element={<Signup />} 
        />

        <Route 
          path="/login" 
          element={<Login />} 
        />
        
        <Route 
          path="/dashboard" 
          element={<StudentDashboard />} 
        />

      </Routes>

    </>
  );
}

export default App;