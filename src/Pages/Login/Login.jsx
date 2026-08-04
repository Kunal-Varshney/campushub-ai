import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Brain,
  FileText,
  Target,
  Mic,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      email: formData.email,
      password: formData.password,
    });
    alert("Login Successful 🚀");
  };

  const features = [
    {
      icon: Brain,
      title: "AI Study Assistant",
      subtitle: "Learn smarter with AI",
    },
    {
      icon: FileText,
      title: "Smart Resume Builder",
      subtitle: "Build ATS friendly resumes",
    },
    {
      icon: Target,
      title: "Career Roadmaps",
      subtitle: "Achieve your goals faster",
    },
  ];

  const stats = [
    { value: "10K+", label: "Students" },
    { value: "50K+", label: "Smart Notes" },
    { value: "95%", label: "Success Rate" },
    { value: "500+", label: "Interview Qs" },
  ];

  const floatingCards = [
    {
      icon: Brain,
      title: "AI Assistant",
      subtitle: "Ready to help",
      className: "top-2 left-4 sm:left-8",
      delay: 0,
      duration: 5,
    },
    {
      icon: FileText,
      title: "Resume Score",
      subtitle: "ATS Score: 92%",
      className: "top-24 right-0 sm:right-4",
      delay: 0.6,
      duration: 6,
    },
    {
      icon: Mic,
      title: "Mock Interview",
      subtitle: "Practice Session",
      className: "top-52 left-0 sm:left-2",
      delay: 1.1,
      duration: 5.5,
    },
    {
      icon: TrendingUp,
      title: "Learning Progress",
      subtitle: "80% completed",
      className: "top-[17.5rem] right-2 sm:right-10",
      delay: 0.3,
      duration: 6.5,
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-8 text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-600/20 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-[110px]" />

      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-start justify-center pt-6 sm:items-center sm:pt-0">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
              <Sparkles size={16} />
              Welcome Back to CampusHub AI
            </div>

            <h1 className="text-5xl font-extrabold leading-tight">
              Continue Your{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Smart Learning
              </span>{" "}
              Journey
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-400">
              Login to access AI-powered learning, smart notes, resume tools,
              mock interviews and career guidance.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((item, index) => (
                <motion.div
                  key={item.title}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="group flex items-center gap-4 rounded-xl border border-transparent p-3 text-gray-300 transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-900/60"
                >
                  <div className="rounded-xl border border-blue-500/20 bg-slate-900 p-3 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/50">
                    <item.icon size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.subtitle}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating AI Dashboard Preview */}
            <div className="relative mt-12 hidden h-72 w-full max-w-md xl:block">
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-slate-800/60 bg-slate-900/20 backdrop-blur-sm" />

              {floatingCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: [0, -10, 0] }}
                    transition={{
                      opacity: { duration: 0.6, delay: card.delay },
                      y: {
                        duration: card.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: card.delay,
                      },
                    }}
                    whileHover={{ scale: 1.05, y: -6 }}
                    className={`absolute ${card.className} flex w-52 items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl shadow-black/30 backdrop-blur-xl transition-shadow duration-300 hover:border-blue-500/40 hover:shadow-blue-500/20`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {card.title}
                      </p>
                      <p className="truncate text-xs text-gray-400">
                        {card.subtitle}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -8 }}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-3 backdrop-blur transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <p className="font-bold">{stat.value}</p>
                  <span className="text-sm text-gray-400">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* LOGIN CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="mx-auto w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-blue-500/20 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/30 hover:shadow-blue-500/30"
          >
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="mt-2 text-gray-400">
              Login to continue your AI journey
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-4 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-12 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 hover:text-blue-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Remember me / Forgot password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-gray-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-blue-500 accent-blue-500"
                  />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-blue-400 transition-colors duration-300 hover:text-cyan-400"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
              >
                Login to CampusHub
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-slate-800" />
                <span className="text-xs text-gray-500">OR</span>
                <div className="h-px flex-1 bg-slate-800" />
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-950/60 py-3.5 font-medium text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-500 hover:bg-slate-900 hover:shadow-lg hover:shadow-black/30"
              >
                <GoogleIcon />
                Continue with Google
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              Don't have an account?
              <Link
                to="/signup"
                className="ml-2 font-medium text-blue-400 transition-colors duration-300 hover:text-cyan-400"
              >
                Create Account
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.28 1.48-1.13 2.73-2.4 3.58v2.98h3.88c2.27-2.09 3.54-5.17 3.54-8.8z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.88-2.98c-1.08.72-2.45 1.15-4.05 1.15-3.11 0-5.75-2.1-6.69-4.93H1.3v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.31 14.33c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.68H1.3A11.97 11.97 0 000 12c0 1.93.46 3.76 1.3 5.32l4.01-2.99z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.3 6.68l4.01 3.09c.94-2.83 3.58-4.93 6.69-5.02z"
      />
    </svg>
  );
}

export default Login;