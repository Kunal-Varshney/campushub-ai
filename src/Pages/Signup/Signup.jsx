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
  Brain,
  FileText,
  Target,
  Mic,
  BookOpen,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    console.log(formData);
    alert("Account Created Successfully 🚀");
  };

  const features = [
    { icon: Brain, text: "AI Study Assistant" },
    { icon: FileText, text: "Smart Notes Generator" },
    { icon: Target, text: "Career Roadmaps" },
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
      title: "AI Study Assistant",
      subtitle: "Ask anything, anytime",
      className: "top-2 left-4 sm:left-8",
      delay: 0,
      duration: 5,
    },
    {
      icon: FileText,
      title: "Resume Builder",
      subtitle: "ATS Score: 87%",
      className: "top-24 right-0 sm:right-4",
      delay: 0.6,
      duration: 6,
    },
    {
      icon: Mic,
      title: "Mock Interview",
      subtitle: "Practice session ready",
      className: "top-52 left-0 sm:left-2",
      delay: 1.1,
      duration: 5.5,
    },
    {
      icon: Target,
      title: "Career Roadmap",
      subtitle: "3 milestones this month",
      className: "top-[17.5rem] right-2 sm:right-10",
      delay: 0.3,
      duration: 6.5,
    },
    {
      icon: BookOpen,
      title: "Smart Notes",
      subtitle: "12 new notes shared",
      className: "top-[22rem] left-10 sm:left-16",
      delay: 0.9,
      duration: 5.2,
    },
    {
      icon: TrendingUp,
      title: "Learning Progress",
      subtitle: "75% this week",
      className: "top-[26.5rem] right-0 sm:right-6",
      delay: 1.4,
      duration: 6,
    },
    {
      icon: Users,
      title: "Student Community",
      subtitle: "2.4K online now",
      className: "top-[30.5rem] left-2 sm:left-10",
      delay: 0.5,
      duration: 5.8,
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-12 text-white">
      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[130px]" />

      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/70 px-4 py-2 text-sm text-blue-400 backdrop-blur transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <Sparkles size={16} />
              Join CampusHub AI
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 text-5xl font-extrabold leading-tight"
            >
              Build Your
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Smart Learning
              </span>{" "}
              Journey
            </motion.h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-400">
              Create your account and unlock AI-powered learning, smart
              notes, career tools and personalized growth.
            </p>

            <div className="mt-8 space-y-4">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="group flex items-center gap-4 rounded-xl border border-transparent p-3 text-gray-300 transition-all duration-300 hover:border-blue-500/30 hover:bg-slate-900/60"
                >
                  <div className="rounded-xl border border-blue-500/20 bg-slate-900 p-3 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/50">
                    <item.icon size={20} className="text-blue-400" />
                  </div>
                  {item.text}
                </motion.div>
              ))}
            </div>

            {/* Floating AI Dashboard Preview */}
            <div className="relative mt-12 hidden h-[34rem] w-full max-w-md xl:block">
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-slate-800/60 bg-slate-900/20 backdrop-blur-sm" />

              {floatingCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: [0, -10, 0],
                    }}
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

          {/* SIGNUP CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="mx-auto w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-blue-500/20 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/30 hover:shadow-blue-500/30"
          >
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="mt-2 text-gray-400">
              Start your AI learning journey
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <Input
                icon={<User size={18} />}
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
              />

              <Input
                icon={<Mail size={18} />}
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                type="email"
              />

              <Input
                icon={<GraduationCap size={18} />}
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="College Name"
              />

              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
                >
                  <option>Student</option>
                  <option>Recruiter</option>
                </select>
              </div>

              <PasswordInput
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                visible={showPassword}
                toggleVisible={() => setShowPassword(!showPassword)}
              />

              <PasswordInput
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                visible={showConfirmPassword}
                toggleVisible={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
              >
                Create Account
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
              Already have an account?
              <Link
                to="/login"
                className="ml-2 font-medium text-blue-400 transition-colors duration-300 hover:text-cyan-400"
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

function Input({ icon, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-300 peer-focus:text-blue-400">
        {icon}
      </span>

      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="peer w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
      />
    </div>
  );
}

function PasswordInput({
  name,
  value,
  onChange,
  placeholder,
  visible,
  toggleVisible,
}) {
  return (
    <div className="relative">
      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />

      <input
        name={name}
        value={value}
        onChange={onChange}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-12 pr-12 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
      />

      <button
        type="button"
        onClick={toggleVisible}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 hover:text-blue-400"
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
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

export default Signup;