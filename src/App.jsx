// import {
//   Routes,
//   Route
// } from "react-router-dom";

// import Home from "./pages/Home/Home";
// import About from "./pages/About/About";
// import Careers from "./pages/Careers/Careers";
// import Privacy from "./pages/Privacy/Privacy";
// import Terms from "./pages/Terms/Terms";

// import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
// import Signup from "./pages/Signup/Signup";
// import Login from "./pages/Login/Login";
// import StudentDashboard from "./pages/Dashboard/StudentDashboard";
// import Discover from "./pages/Discover/Discover";
// import Forgot  from "./pages/Forgot/ForgotPassword";


// function App() {

//   return (
//     <>
//       <ScrollToTop />

//       <Routes>

//         <Route 
//           path="/" 
//           element={<Home />} 
//         />

//         <Route 
//           path="/about" 
//           element={<About />} 
//         />

//         <Route 
//           path="/careers" 
//           element={<Careers />} 
//         />

//         <Route 
//           path="/privacy" 
//           element={<Privacy />} 
//         />

//          <Route 
//           path="/terms" 
//           element={<Terms />} 
//         />

//          <Route 
//           path="/signup" 
//           element={<Signup />} 
//         />

//         <Route 
//           path="/login" 
//           element={<Login />} 
//         />
        
//         <Route 
//           path="/dashboard" 
//           element={<StudentDashboard />} 
//         />

//         <Route 
//           path="/discover" 
//           element={<Discover />} 
//         />

//         <Route
//           path="/forgot-password"
//           element={<Forgot />} 
//         />
       

//       </Routes>

//     </>
//   );
// }

// export default App;




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


        {/* Main Pages */}

        <Route 
          path="/dashboard" 
          element={<StudentDashboard />} 
        />

        <Route 
          path="/discover" 
          element={<Discover />} 
        />


      </Routes>
    </>
  );
}

export default App;