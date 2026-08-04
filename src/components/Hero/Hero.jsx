import {
  ArrowRight,
  Sparkles,
  Brain,
  PlayCircle,
  CheckCircle2,
  BookOpen,
  FileText,
  Mic,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const quickFeatures = [
  "AI Study Notes",
  "ATS Resume Builder",
  "Mock Interviews",
  "Career Roadmaps",
];

const trustStats = [
  { value: "10K+", label: "Students" },
  { value: "500+", label: "Resumes Reviewed" },
  { value: "95%", label: "Placement Support" },
];

const assistantMessages = [
  { icon: BookOpen, text: "Generate Smart Study Notes" },
  { icon: FileText, text: "Build ATS Friendly Resume" },
  { icon: Mic, text: "AI Mock Interview Practice" },
  { icon: Briefcase, text: "Find Internships & Jobs" },
];

function Hero() {
  const navigate = useNavigate();
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-slate-950 text-white"
    >
      {/* Background glow — two anchors only, kept deliberately sparse */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-600/20 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-purple-600/20 blur-[110px]" />

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 pt-28 pb-16 lg:grid lg:min-h-screen lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:py-24">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-xl"
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
            <Sparkles size={16} />
            AI Powered Campus Platform
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Your{" "}
            <span className="text-blue-500">
              AI-Powered
              <br />
            </span>
            Campus Companion
          </h1>

          <p className="mt-4 text-lg font-medium text-blue-300 sm:text-xl">
            Learn Faster • Build Better • Get Hired
          </p>

          <p className="mt-6 text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
            CampusHub AI empowers students with AI-driven learning, ATS
            resume building, interview preparation, semester planning,
            internships and career guidance — all from one intelligent
            platform.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
            onClick={() => navigate('/signup')}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-cyan-400 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95">
              Start Free
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <button className="group flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/70 px-7 py-3.5 font-semibold transition-all duration-300 hover:border-blue-500 hover:bg-slate-800 hover:shadow-xl hover:shadow-blue-500/20">
              <PlayCircle
                size={21}
                className="text-blue-400 transition-transform duration-300 group-hover:scale-110"
              />
              Explore Features
            </button>
          </div>

          {/* Quick Features */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            {quickFeatures.map((item) => (
              <div key={item} className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 size={18} className="shrink-0 text-green-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Trust */}
          <div className="mt-10 flex flex-wrap gap-8 border-t border-slate-800 pt-8">
            {trustStats.map((stat) => (
              <div key={stat.label}>
                <h3 className="text-3xl font-bold text-blue-400">{stat.value}</h3>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="flex w-full max-w-[520px] flex-col gap-4 lg:ml-auto"
        >
          {/* Main AI Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-blue-900/20 backdrop-blur-xl transition-shadow duration-300 hover:shadow-blue-700/25 sm:p-8">
            {/* Header — "AI Powered" integrated here, no floating badge */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-800/80 p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-3">
                  <Brain size={26} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">CampusHub AI</p>
                  <h3 className="text-lg font-semibold">Your Personal AI Assistant</h3>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-600/10 px-3 py-1 text-xs font-medium text-blue-400">
                <Sparkles size={12} />
                AI Powered
              </span>
            </div>

            {/* Chat */}
            <div className="space-y-3">
              <div className="rounded-xl border border-blue-500/30 bg-blue-600/20 p-4 text-sm sm:text-base">
                👋 Hello Student!
              </div>

              {assistantMessages.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 rounded-xl bg-slate-800 p-4 text-sm sm:text-base"
                >
                  <Icon size={18} className="shrink-0 text-blue-400" />
                  <span>{text}</span>
                </div>
              ))}

              <div className="flex items-center gap-2 pt-2">
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
                  style={{ animationDelay: "0.4s" }}
                />
                <span className="ml-2 text-sm text-gray-400">AI is typing...</span>
              </div>
            </div>
          </div>

          {/* Trust strip — in normal flow, no overlap with the card */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 px-5 py-4 backdrop-blur-xl">
            <div>
              <p className="text-xs text-gray-400">Trusted by</p>
              <h3 className="text-lg font-bold text-white">
                10,000+ <span className="text-blue-400">Students 🚀</span>
              </h3>
            </div>
            <CheckCircle2 size={22} className="shrink-0 text-green-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;