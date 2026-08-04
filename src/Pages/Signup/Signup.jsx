import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";

function Signup() {

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    role: "Student",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Signup Data:", formData);

    alert("Account Created Successfully 🚀");
  };


  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-12 text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-600/20 blur-[110px]" />

      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 h-80 rounded-full bg-cyan-500/20 blur-[110px]" />


      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center">

        <div className="grid w-full items-center gap-12 lg:grid-cols-2">


          {/* LEFT */}

          <motion.div
            initial={{opacity:0,x:-40}}
            animate={{opacity:1,x:0}}
            transition={{duration:0.6}}
            className="hidden lg:block"
          >

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400">

              <Sparkles size={16}/>
              Join CampusHub AI

            </div>


            <h1 className="text-5xl font-extrabold leading-tight">

              Start Your

              <span className="text-blue-500">
                {" "}Smart Learning
              </span>

              Journey

            </h1>


            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-400">

              Create your account and unlock AI-powered learning,
              smart notes, resume building and career opportunities.

            </p>


            <div className="mt-8 space-y-4 text-gray-300">

              {[
                "AI Study Assistant",
                "ATS Resume Builder",
                "Mock Interview Practice",
                "Career Roadmaps",
              ].map((item)=>(
                <div key={item} className="flex items-center gap-3">

                  <div className="h-2 w-2 rounded-full bg-blue-400"/>

                  {item}

                </div>
              ))}

            </div>

          </motion.div>




          {/* CARD */}

          <motion.div
            initial={{opacity:0,scale:0.95}}
            animate={{opacity:1,scale:1}}
            transition={{duration:0.6}}
            className="mx-auto w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-blue-500/10 backdrop-blur-xl"
          >


            <h2 className="text-3xl font-bold">
              Create Account
            </h2>


            <p className="mt-2 text-gray-400">
              Join thousands of students using CampusHub AI
            </p>



            <form 
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >


              {/* Name */}

              <div className="relative">

                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  className="input-style"
                />

              </div>



              {/* Email */}

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Address"
                  className="input-style"
                />

              </div>



              {/* College */}

              <div className="relative">

                <GraduationCap
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  type="text"
                  placeholder="College Name"
                  className="input-style"
                />

              </div>



              {/* Role */}

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="
                w-full
                rounded-xl
                border
                border-slate-700
                bg-slate-950
                px-4
                py-3
                text-white
                outline-none
                focus:border-blue-500
                "
              >

                <option>
                  Student
                </option>

                <option>
                  Recruiter
                </option>

              </select>





              {/* Password */}

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />


                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={showPassword ? "text":"password"}
                  placeholder="Password"
                  className="input-style"
                />


                <button
                  type="button"
                  onClick={()=>setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >

                  {
                    showPassword
                    ?
                    <EyeOff size={18}/>
                    :
                    <Eye size={18}/>
                  }

                </button>

              </div>




              {/* Submit */}

              <button
                type="submit"
                className="
                group
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                py-3.5
                font-semibold
                transition-all
                hover:-translate-y-1
                hover:shadow-xl
                hover:shadow-blue-500/30
                "
              >

                Create Account

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />

              </button>


              <button
                type="button"
                className="
                w-full
                rounded-xl
                border
                border-slate-700
                bg-slate-950
                py-3
                hover:border-blue-500
                "
              >

                Continue with Google

              </button>


            </form>



            <p className="mt-6 text-center text-sm text-gray-400">

              Already have an account?

              <Link
                to="/login"
                className="ml-2 text-blue-400 hover:text-blue-300"
              >
                Login
              </Link>

            </p>


          </motion.div>


        </div>

      </div>


    </section>
  );
}

export default Signup;