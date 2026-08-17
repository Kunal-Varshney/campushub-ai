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
  Lock,
  Mail,
  Rocket,
  Sparkles,
  Target,
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

  return (
    <main className="relative min-h-screen min-h-[100dvh] overflow-x-hidden bg-[#050816] text-white">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[120px] sm:h-[520px] sm:w-[520px] sm:blur-[140px]" />

        <div className="absolute -bottom-40 -right-40 h-[430px] w-[430px] rounded-full bg-cyan-500/15 blur-[130px] sm:h-[550px] sm:w-[550px] sm:blur-[150px]" />

        <div className="absolute left-[42%] top-[35%] h-[250px] w-[250px] rounded-full bg-indigo-600/10 blur-[100px] sm:h-[300px] sm:w-[300px] sm:blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025] sm:opacity-[0.035]"
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

      <header className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
            <Sparkles size={18} className="sm:hidden" />
            <Sparkles size={20} className="hidden sm:block" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-bold tracking-tight sm:text-lg">
              CampusHub<span className="text-cyan-400"> AI</span>
            </p>

            <p className="hidden text-[10px] uppercase tracking-[0.22em] text-slate-500 sm:block">
              Learn • Build • Grow
            </p>
          </div>
        </Link>

        {/* Desktop signup */}

        <p className="hidden text-sm text-slate-400 sm:block">
          New to CampusHub AI?
          <Link
            to="/signup"
            className="ml-2 font-semibold text-cyan-400 transition hover:text-white"
          >
            Create account
          </Link>
        </p>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-start gap-8 px-4 pb-8 pt-3 sm:gap-12 sm:px-8 sm:pb-12 sm:pt-4 lg:min-h-[calc(100vh-88px)] lg:min-h-[calc(100dvh-88px)] lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-16">

        {/* =================================================
            LEFT SIDE
        ================================================== */}

        <motion.section
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="block w-full lg:block"
        >
          {/* Intro badge */}

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/5 px-3.5 py-2 text-[10px] font-semibold text-blue-300 backdrop-blur-xl sm:mb-7 sm:px-4 sm:text-xs">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>

            Welcome back to CampusHub AI
          </div>

          {/* Heading */}

          <h1 className="max-w-2xl text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
            Continue your
            <br />

            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              journey forward.
            </span>
          </h1>

          {/* Description */}

          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:mt-6 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
            Everything you need to learn, build skills, prepare for
            opportunities and move closer to your career goals — all in one
            place.
          </p>

          {/* =================================================
              CAREER JOURNEY
          ================================================== */}

          <div className="relative mt-6 w-full max-w-xl sm:mt-8 lg:mt-10">
            {/* Connecting line */}

            <div className="absolute left-[21px] top-7 h-[calc(100%-56px)] w-px bg-gradient-to-b from-blue-500/60 via-cyan-400/30 to-transparent sm:left-[24px] sm:top-8 sm:h-[calc(100%-64px)]" />

            <div className="space-y-3 sm:space-y-4">
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
                    whileHover={{ x: 6 }}
                    className="group relative flex w-full items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.045] sm:gap-5 sm:p-4"
                  >
                    {/* Icon */}

                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-[#091329] shadow-lg shadow-blue-500/10 sm:h-12 sm:w-12 sm:rounded-2xl">
                      <Icon
                        size={18}
                        className="text-cyan-300 sm:hidden"
                      />

                      <Icon
                        size={21}
                        className="hidden text-cyan-300 sm:block"
                      />
                    </div>

                    {/* Content */}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="text-[9px] font-bold tracking-[0.2em] text-blue-400 sm:text-[10px]">
                          {item.number}
                        </span>

                        <h3 className="text-sm font-semibold text-white sm:text-base">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-1 text-[11px] leading-4 text-slate-500 sm:text-sm sm:leading-5">
                        {item.text}
                      </p>
                    </div>

                    {/* Arrow */}

                    <ArrowUpRight
                      size={15}
                      className="hidden shrink-0 text-slate-700 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-400 sm:block sm:h-[17px] sm:w-[17px]"
                    />
                  </motion.div>
                );
              })}
            </div>
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
          <div className="relative overflow-hidden rounded-[24px] border border-white/[0.09] bg-[#0a1020]/90 p-5 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl sm:rounded-[30px] sm:p-8">
            {/* Card glow */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

            {/* Header */}

            <div className="relative">
              <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 sm:h-11 sm:w-11">
                  <Rocket
                    size={20}
                    className="text-cyan-300 sm:hidden"
                  />

                  <Rocket
                    size={21}
                    className="hidden text-cyan-300 sm:block"
                  />
                </div>

                <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-400/5 px-2.5 py-1 text-[9px] font-semibold text-emerald-300 sm:px-3 sm:text-[10px]">
                  <ShieldCheck
                    size={11}
                    className="sm:hidden"
                  />

                  <ShieldCheck
                    size={12}
                    className="hidden sm:block"
                  />

                  SECURE LOGIN
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Welcome back
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
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
                  className="relative mt-4 overflow-hidden rounded-xl border border-red-400/15 bg-red-500/[0.06] px-3.5 py-3 text-sm text-red-300 sm:mt-5 sm:px-4"
                >
                  <div className="flex items-start gap-2">
                    <X
                      size={17}
                      className="mt-0.5 shrink-0"
                    />

                    <span className="break-words">{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* =================================================
                LOGIN FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              className="relative mt-6 space-y-4 sm:mt-7 sm:space-y-5"
            >
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
                  className="absolute right-3.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white/[0.04] hover:text-cyan-400 sm:right-4"
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

              <div className="flex items-center justify-between gap-3 text-[11px] sm:text-sm">
                <button
                  type="button"
                  onClick={() =>
                    setRememberMe((prev) => !prev)
                  }
                  className="flex min-w-0 cursor-pointer items-center gap-2 text-left text-slate-500 transition-colors hover:text-slate-300"
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                      rememberMe
                        ? "border-cyan-400 bg-cyan-400 text-[#06101f]"
                        : "border-slate-600 bg-transparent"
                    }`}
                  >
                    {rememberMe && (
                      <Check
                        size={11}
                        strokeWidth={3}
                      />
                    )}
                  </span>

                  <span className="whitespace-nowrap">
                    Remember me
                  </span>
                </button>

                <Link
                  to="/forgot-password"
                  className="shrink-0 font-medium text-cyan-400 transition-colors hover:text-white"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { y: -2 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="group relative flex min-h-[52px] w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 py-3.5 text-sm font-bold shadow-xl shadow-blue-600/20 transition-all duration-300 hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60 sm:py-4"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing you in...
                  </>
                ) : (
                  <>
                    <span>Login to CampusHub</span>

                    <ArrowRight
                      size={17}
                      className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </motion.button>

              {/* Divider */}

              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-white/[0.06]" />

                <span className="whitespace-nowrap text-[9px] font-medium tracking-wider text-slate-600 sm:text-[10px]">
                  SECURE ACCESS
                </span>

                <div className="h-px flex-1 bg-white/[0.06]" />
              </div>

              {/* Security Note */}

              <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-3 py-3 text-center text-[10px] leading-4 text-slate-500 sm:px-4 sm:text-[11px]">
                <Lock
                  size={13}
                  className="shrink-0 text-emerald-400"
                />

                <span>
                  Your credentials are securely handled by CampusHub AI.
                </span>
              </div>

              {/* Mobile Signup */}

              <p className="pt-1 text-center text-xs text-slate-500 sm:hidden">
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

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 border-t border-white/[0.06] pt-4 text-center text-[9px] text-slate-600 sm:mt-6 sm:pt-5 sm:text-[10px]">
              <Zap size={12} />

              <span>Learn smarter</span>
              <span>•</span>
              <span>Build faster</span>
              <span>•</span>
              <span>Grow further</span>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

export default Login;