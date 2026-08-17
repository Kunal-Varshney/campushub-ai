import { useMemo, useState } from "react";
import API from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Check,
  CheckCircle2,
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
  User,
  Users,
  X,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    college: "",
    role: "Student",
  });

  const handleChange = (e) => {
    setError("");

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const passwordStrength = useMemo(() => {
    const password = formData.password;

    if (!password) {
      return {
        score: 0,
        label: "Enter a password",
        width: "0%",
      };
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const levels = {
      1: { label: "Weak password", width: "25%" },
      2: { label: "Fair password", width: "50%" },
      3: { label: "Good password", width: "75%" },
      4: { label: "Strong password", width: "100%" },
    };

    return {
      score,
      ...levels[score],
    };
  }, [formData.password]);

  const passwordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!accepted) {
      setError("Please accept the Terms & Privacy Policy.");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        college: formData.college,
        role: formData.role,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        navigate("/dashboard");
      } else {
        setError(response.data.message || "Signup failed.");
      }
    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data);
      console.log("REGISTER STATUS:", err.response?.status);

      setError(
        err.response?.data?.message ||
          "Unable to create your account. Please try again."
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
      text: "AI-powered learning built around you.",
    },
    {
      number: "02",
      icon: Target,
      title: "Find your path",
      text: "Discover the career direction that fits.",
    },
    {
      number: "03",
      icon: Rocket,
      title: "Build your future",
      text: "Turn skills into real career opportunities.",
    },
  ];

  const floatingCards = [
    {
      icon: Brain,
      title: "AI Assistant",
      subtitle: "Ready to help",
      position: "top-[6%] left-[4%]",
    },
    {
      icon: Map,
      title: "Career Roadmap",
      subtitle: "Your path is clear",
      position: "top-[24%] right-[2%]",
    },
    {
      icon: FileText,
      title: "Resume Builder",
      subtitle: "ATS optimized",
      position: "top-[48%] left-[1%]",
    },
    {
      icon: Zap,
      title: "Skill Progress",
      subtitle: "Keep moving forward",
      position: "bottom-[9%] right-[4%]",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050816] text-white">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[120px] sm:h-[520px] sm:w-[520px] sm:blur-[140px]" />

        <div className="absolute -bottom-48 -right-40 h-[450px] w-[450px] rounded-full bg-cyan-500/15 blur-[130px] sm:h-[550px] sm:w-[550px] sm:blur-[150px]" />

        <div className="absolute left-[42%] top-[35%] h-[250px] w-[250px] rounded-full bg-indigo-600/10 blur-[100px] sm:h-[300px] sm:w-[300px] sm:blur-[120px]" />

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
          TOP BRAND
      ====================================================== */}

      <div className="relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 sm:px-8 sm:py-6">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
            <Sparkles size={18} className="sm:h-5 sm:w-5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-bold tracking-tight sm:text-lg">
              CampusHub<span className="text-cyan-400"> AI</span>
            </p>

            <p className="hidden text-[10px] uppercase tracking-[0.22em] text-slate-500 xs:block sm:block">
              Learn • Build • Grow
            </p>
          </div>
        </Link>

        <p className="hidden text-sm text-slate-400 sm:block">
          Already a member?
          <Link
            to="/login"
            className="ml-2 font-semibold text-cyan-400 transition hover:text-white"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div
        className="
          relative z-10 mx-auto flex w-full max-w-7xl flex-col
          gap-8 px-4 pb-10 pt-2
          sm:gap-10 sm:px-8 sm:pb-12 sm:pt-4
          lg:grid lg:min-h-[calc(100vh-88px)]
          lg:grid-cols-[1.05fr_.95fr]
          lg:items-center lg:gap-16
        "
      >
        {/* =================================================
            LEFT — CAREER EXPERIENCE
        ================================================== */}

        <motion.section
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full"
        >
          {/* Desktop / Tablet heading */}

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/5 px-3.5 py-2 text-[10px] font-semibold text-blue-300 backdrop-blur-xl sm:mb-7 sm:px-4 sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>

            AI-powered student platform
          </div>

          <h1 className="max-w-2xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-5xl xl:text-6xl">
            Your career
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
              starts here.
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:mt-6 sm:text-lg sm:leading-8">
            One platform to help you learn new skills, discover your career
            path, build projects, prepare for opportunities and grow with AI.
          </p>

          {/* =================================================
              Career journey visual
          ================================================== */}

          <div className="relative mt-7 max-w-xl sm:mt-10">
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
                    whileHover={{ x: 8 }}
                    className="group relative flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.045] sm:gap-5 sm:p-4"
                  >
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-[#091329] shadow-lg shadow-blue-500/10 sm:h-12 sm:w-12 sm:rounded-2xl">
                      <Icon
                        size={18}
                        className="text-cyan-300 sm:h-[21px] sm:w-[21px]"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-[9px] font-bold tracking-[0.2em] text-blue-400 sm:text-[10px]">
                          {item.number}
                        </span>

                        <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-0.5 text-xs leading-5 text-slate-500 sm:mt-1 sm:text-sm">
                        {item.text}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-slate-700 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-400 sm:h-[17px] sm:w-[17px]"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* =================================================
              Floating ecosystem
          ================================================== */}

          <div className="relative mt-5 h-28 max-w-xl overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] sm:mt-8 sm:h-36">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.04] via-transparent to-cyan-500/[0.04]" />

            <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-cyan-400/20 bg-[#0a1429] shadow-2xl shadow-cyan-500/10 sm:h-16 sm:w-16 sm:rounded-2xl">
              <GraduationCap
                size={22}
                className="text-cyan-300 sm:h-7 sm:w-7"
              />
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
            RIGHT — SIGNUP
        ================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65 }}
          className="mx-auto w-full max-w-[500px]"
        >
          <div className="relative overflow-hidden rounded-[26px] border border-white/[0.09] bg-[#0a1020]/90 p-5 shadow-2xl shadow-blue-950/40 backdrop-blur-2xl sm:rounded-[30px] sm:p-8">
            {/* Card glow */}

            <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

            {/* Heading */}

            <div className="relative">
              <div className="mb-4 flex items-center justify-between sm:mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 sm:h-11 sm:w-11 sm:rounded-2xl">
                  <Rocket
                    size={19}
                    className="text-cyan-300 sm:h-[21px] sm:w-[21px]"
                  />
                </div>

                <span className="rounded-full border border-emerald-400/15 bg-emerald-400/5 px-2.5 py-1 text-[9px] font-semibold text-emerald-300 sm:px-3 sm:text-[10px]">
                  FREE TO JOIN
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Create your account
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                Start building your personalized career journey with
                CampusHub AI.
              </p>
            </div>

            {/* Error */}

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -5 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative mt-4 overflow-hidden rounded-xl border border-red-400/15 bg-red-500/[0.06] px-3.5 py-3 text-xs text-red-300 sm:mt-5 sm:px-4 sm:text-sm"
                >
                  <div className="flex items-start gap-2">
                    <X size={16} className="mt-0.5 shrink-0" />

                    <span>{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form
              onSubmit={handleSubmit}
              className="relative mt-6 space-y-3.5 sm:mt-7 sm:space-y-4"
            >
              {/* Name */}

              <Input
                icon={<User size={17} />}
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name"
              />

              {/* Email */}

              <Input
                icon={<Mail size={17} />}
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                type="email"
              />

              {/* College */}

              <Input
                icon={<GraduationCap size={17} />}
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="College / University"
              />

              {/* Role */}

              <div className="group relative">
                <Users
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-cyan-400"
                />

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-2xl border border-white/[0.08] bg-[#070d1b] py-3.5 pl-11 pr-10 text-sm text-white outline-none transition-all duration-300 hover:border-white/[0.14] focus:border-cyan-400/40 focus:bg-[#0a1121] focus:ring-4 focus:ring-cyan-400/[0.06]"
                >
                  <option value="Student">Student</option>
                  <option value="Recruiter">Recruiter</option>
                </select>

                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">
                  <ArrowRight size={15} className="rotate-90" />
                </div>
              </div>

              {/* Password */}

              <div>
                <PasswordInput
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  visible={showPassword}
                  toggleVisible={() =>
                    setShowPassword((prev) => !prev)
                  }
                />

                {formData.password && (
                  <div className="mt-2 px-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">
                        Password strength
                      </span>

                      <span
                        className={
                          passwordStrength.score >= 3
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }
                      >
                        {passwordStrength.label}
                      </span>
                    </div>

                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: passwordStrength.width,
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 via-cyan-400 to-emerald-400"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm password */}

              <div className="relative">
                <PasswordInput
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  visible={showConfirmPassword}
                  toggleVisible={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                />

                {formData.confirmPassword && (
                  <div className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2">
                    {passwordsMatch ? (
                      <CheckCircle2
                        size={17}
                        className="text-emerald-400"
                      />
                    ) : (
                      <X size={17} className="text-red-400" />
                    )}
                  </div>
                )}
              </div>

              {/* Terms */}

              <button
                type="button"
                onClick={() => setAccepted((prev) => !prev)}
                className="flex w-full items-start gap-3 text-left"
              >
                <span
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                    accepted
                      ? "border-cyan-400 bg-cyan-400 text-[#06101f]"
                      : "border-slate-600 bg-transparent"
                  }`}
                >
                  {accepted && <Check size={11} strokeWidth={3} />}
                </span>

                <span className="text-[10px] leading-5 text-slate-500 sm:text-[11px]">
                  I agree to the{" "}
                  <span className="text-slate-300 hover:text-cyan-400">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-slate-300 hover:text-cyan-400">
                    Privacy Policy
                  </span>
                  .
                </span>
              </button>

              {/* Submit */}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { y: -2 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 py-3.5 text-sm font-bold shadow-xl shadow-blue-600/20 transition-all duration-300 hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60 sm:py-4"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating your account...
                  </>
                ) : (
                  <>
                    Create my account

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </motion.button>

              {/* Mobile login */}

              <p className="pt-1 text-center text-xs text-slate-500 sm:hidden">
                Already have an account?

                <Link
                  to="/login"
                  className="ml-1 font-semibold text-cyan-400"
                >
                  Sign in
                </Link>
              </p>
            </form>

            {/* Trust footer */}

            <div className="mt-5 flex flex-wrap items-center justify-center gap-1.5 border-t border-white/[0.06] pt-4 text-center text-[9px] text-slate-600 sm:mt-6 sm:gap-2 sm:pt-5 sm:text-[10px]">
              <Lock size={12} />

              <span>Your account is securely protected</span>

              <span>•</span>

              <span>CampusHub AI</span>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

/* ============================================================
   INPUT
============================================================ */

function Input({
  icon,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div className="group relative">
      <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within:text-cyan-400">
        {icon}
      </span>

      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full rounded-2xl border border-white/[0.08] bg-[#070d1b] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 hover:border-white/[0.14] focus:border-cyan-400/40 focus:bg-[#0a1121] focus:ring-4 focus:ring-cyan-400/[0.06]"
      />
    </div>
  );
}

/* ============================================================
   PASSWORD INPUT
============================================================ */

function PasswordInput({
  name,
  value,
  onChange,
  placeholder,
  visible,
  toggleVisible,
}) {
  return (
    <div className="group relative">
      <Lock
        size={17}
        className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500 transition-colors duration-300 group-focus-within:text-cyan-400"
      />

      <input
        name={name}
        value={value}
        onChange={onChange}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        autoComplete="new-password"
        className="w-full rounded-2xl border border-white/[0.08] bg-[#070d1b] py-3.5 pl-11 pr-12 text-sm text-white placeholder:text-slate-600 outline-none transition-all duration-300 hover:border-white/[0.14] focus:border-cyan-400/40 focus:bg-[#0a1121] focus:ring-4 focus:ring-cyan-400/[0.06]"
      />

      <button
        type="button"
        onClick={toggleVisible}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-cyan-400"
      >
        {visible ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  );
}

export default Signup;