import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Check,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  Lock,
  Mail,
  Map,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  ShieldCheck,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setError("");

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN SUCCESS:", response.data);

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Invalid login response from server");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      console.error("STATUS:", error.response?.status);
      console.error("SERVER RESPONSE:", error.response?.data);

      setError(
        error.response?.data?.message ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  const journey = [
    {
      number: "01",
      icon: Brain,
      title: "Learn smarter",
      text: "Get personalized help with AI-powered learning.",
    },
    {
      number: "02",
      icon: Target,
      title: "Follow your path",
      text: "Stay focused with a clear career roadmap.",
    },
    {
      number: "03",
      icon: Rocket,
      title: "Build your future",
      text: "Turn your skills into real opportunities.",
    },
  ];

  const floatingCards = [
    {
      icon: Brain,
      title: "AI Assistant",
      subtitle: "Ready to help",
      position: "top-[7%] left-[4%]",
    },
    {
      icon: Map,
      title: "Career Roadmap",
      subtitle: "3 milestones ahead",
      position: "top-[25%] right-[2%]",
    },
    {
      icon: FileText,
      title: "Resume Builder",
      subtitle: "ATS optimized",
      position: "top-[49%] left-[1%]",
    },
    {
      icon: TrendingUp,
      title: "Learning Progress",
      subtitle: "80% completed",
      position: "bottom-[9%] right-[4%]",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[140px]" />

        <div className="absolute -bottom-48 -right-40 h-[550px] w-[550px] rounded-full bg-cyan-500/15 blur-[150px]" />

        <div className="absolute left-[42%] top-[35%] h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />
      </div>

      {/* =====================================================
          BRAND HEADER
      ====================================================== */}

      <div className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105">
            <Sparkles size={20} />
          </div>

          <div>
            <p className="text-lg font-bold tracking-tight">
              CampusHub<span className="text-cyan-400"> AI</span>
            </p>

            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
              Learn • Build • Grow
            </p>
          </div>
        </Link>

        <p className="hidden text-sm text-slate-400 sm:block">
          New to CampusHub AI?
          <Link
            to="/signup"
            className="ml-2 font-semibold text-cyan-400 transition hover:text-white"
          >
            Create account
          </Link>
        </p>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-7xl items-center gap-12 px-5 pb-12 pt-4 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        {/* =================================================
            LEFT SIDE
        ================================================== */}

        <motion.section
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:block"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/5 px-4 py-2 text-xs font-semibold text-blue-300 backdrop-blur-xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>

            Welcome back to CampusHub AI
          </div>

          <h1 className="max-w-2xl text-5xl font-black leading-[1.08] tracking-tight xl:text-6xl">
            Continue your
            <br />

            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              journey forward.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
            Everything you need to learn, build skills, prepare for
            opportunities and move closer to your career goals — all in one
            place.
          </p>

          {/* Career journey */}

          <div className="relative mt-10 max-w-xl">
            <div className="absolute left-[24px] top-8 h-[calc(100%-64px)] w-px bg-gradient-to-b from-blue-500/60 via-cyan-400/30 to-transparent" />

            <div className="space-y-4">
              {journey.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.number}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.25 + index * 0.12,
                    }}
                    whileHover={{ x: 8 }}
                    className="group relative flex items-center gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.045]"
                  >
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-[#091329] shadow-lg shadow-blue-500/10">
                      <Icon size={21} className="text-cyan-300" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-blue-400">
                          {item.number}
                        </span>

                        <h3 className="font-semibold text-white">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.text}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="text-slate-700 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-400"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Floating ecosystem */}

          <div className="relative mt-8 h-36 max-w-xl overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.04] via-transparent to-cyan-500/[0.04]" />

            <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-cyan-400/20 bg-[#0a1429] shadow-2xl shadow-cyan-500/10">
              <GraduationCap size={28} className="text-cyan-300" />
            </div>

            {floatingCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 4 + index * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute ${card.position} hidden items-center gap-2 rounded-xl border border-white/[0.07] bg-[#0b1224]/90 px-3 py-2 backdrop-blur-xl sm:flex`}
                >
                  <Icon size={14} className="text-cyan-400" />

                  <div>
                    <p className="text-[11px] font-semibold">
                      {card.title}
                    </p>

                    <p className="text-[9px] text-slate-500">
                      {card.subtitle}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* =================================================
            LOGIN CARD
        ================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65 }}
          className="mx-auto w-full max-w-[500px]"
        >
          <div className="relative overflow-hidden rounded-[30px] border border-white/[0.09] bg-[#0a1020]/90 p-6 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl sm:p-8">
            {/* Card glow */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

            {/* Header */}

            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
                  <Rocket size={21} className="text-cyan-300" />
                </div>

                <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/5 px-3 py-1 text-[10px] font-semibold text-emerald-300">
                  <ShieldCheck size={12} />
                  SECURE LOGIN
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to continue your personalized learning and career
                journey.
              </p>
            </div>

            {/* Error */}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -5 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative mt-5 overflow-hidden rounded-xl border border-red-400/15 bg-red-500/[0.06] px-4 py-3 text-sm text-red-300"
                >
                  <div className="flex items-start gap-2">
                    <X size={17} className="mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="relative mt-7 space-y-5">
              {/* Email */}

              <div className="group relative">
                <Mail
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within:text-cyan-400"
                />

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  autoComplete="email"
                  className="w-full rounded-2xl border border-white/[0.08] bg-[#070d1b] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 hover:border-white/[0.14] focus:border-cyan-400/40 focus:bg-[#0a1121] focus:ring-4 focus:ring-cyan-400/[0.06]"
                />
              </div>

              {/* Password */}

              <div className="group relative">
                <Lock
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within:text-cyan-400"
                />

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="w-full rounded-2xl border border-white/[0.08] bg-[#070d1b] py-3.5 pl-11 pr-12 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 hover:border-white/[0.14] focus:border-cyan-400/40 focus:bg-[#0a1121] focus:ring-4 focus:ring-cyan-400/[0.06]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-cyan-400"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>

              {/* Remember / Forgot */}

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <button
                  type="button"
                  onClick={() =>
                    setRememberMe((prev) => !prev)
                  }
                  className="flex cursor-pointer items-center gap-2 text-slate-500 transition-colors hover:text-slate-300"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded border transition-all ${
                      rememberMe
                        ? "border-cyan-400 bg-cyan-400 text-[#06101f]"
                        : "border-slate-600 bg-transparent"
                    }`}
                  >
                    {rememberMe && (
                      <Check size={11} strokeWidth={3} />
                    )}
                  </span>

                  Remember me
                </button>

                <Link
                  to="/forgot-password"
                  className="font-medium text-cyan-400 transition-colors hover:text-white"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login */}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { y: -2 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 py-4 text-sm font-bold shadow-xl shadow-blue-600/20 transition-all duration-300 hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing you in...
                  </>
                ) : (
                  <>
                    Login to CampusHub
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </motion.button>

              {/* Divider */}

              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-white/[0.06]" />

                <span className="text-[10px] font-medium tracking-wider text-slate-600">
                  SECURE ACCESS
                </span>

                <div className="h-px flex-1 bg-white/[0.06]" />
              </div>

              {/* Security note */}

              <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-4 py-3 text-[11px] text-slate-500">
                <Lock size={13} className="text-emerald-400" />
                Your credentials are securely handled by CampusHub AI.
              </div>

              {/* Mobile signup */}

              <p className="pt-2 text-center text-xs text-slate-500 sm:hidden">
                Don't have an account?
                <Link
                  to="/signup"
                  className="ml-1 font-semibold text-cyan-400"
                >
                  Create account
                </Link>
              </p>
            </form>

            {/* Footer */}

            <div className="mt-6 flex items-center justify-center gap-2 border-t border-white/[0.06] pt-5 text-[10px] text-slate-600">
              <Zap size={12} />
              Learn smarter • Build faster • Grow further
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

export default Login;
