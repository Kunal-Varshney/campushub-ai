import API from "../../services/api";
import { useEffect, useState } from "react";
import { saveLastVisited } from "../../utils/lastVisited";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  FileText,
  Wand2,
  CheckCircle2,
  Download,
  Brain,
  SpellCheck2,
  KeyRound,
  LayoutTemplate,
  ChevronDown,
  Mail,
  Phone,
  Globe,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Target,
  User,
  Loader2,
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  TrendingUp,
  Clock,
  Zap,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

const inputFields = [
  { name: "fullName", label: "Full Name", icon: User, placeholder: "Aarav Sharma", type: "text" },
  { name: "email", label: "Email", icon: Mail, placeholder: "aarav@email.com", type: "email" },
  { name: "phone", label: "Phone", icon: Phone, placeholder: "+91 98765 43210", type: "text" },
  { name: "linkedin", label: "LinkedIn", icon: FaLinkedin, placeholder: "linkedin.com/in/aarav", type: "text" },
  { name: "github", label: "GitHub", icon: FaGithub, placeholder: "github.com/aarav", type: "text" },
  { name: "portfolio", label: "Portfolio", icon: Globe, placeholder: "aarav.dev", type: "text" },
];

const textareaFields = [
  { name: "education", label: "Education", icon: GraduationCap, placeholder: "B.Tech in Computer Science, XYZ University, 2022 - 2026" },
  { name: "skills", label: "Skills", icon: Code2, placeholder: "React, Node.js, MongoDB, Tailwind CSS" },
  { name: "projects", label: "Projects", icon: LayoutTemplate, placeholder: "CampusHub AI - SaaS platform for internships & placements" },
  { name: "experience", label: "Experience", icon: Briefcase, placeholder: "Frontend Intern at TechCorp - Built UI components in React" },
  { name: "achievements", label: "Achievements", icon: Award, placeholder: "Winner - Smart India Hackathon 2025" },
  { name: "objective", label: "Career Objective", icon: Target, placeholder: "Aspiring software engineer seeking an internship..." },
];

const features = [
  {
    icon: Brain,
    title: "AI ATS Optimization",
    desc: "Our AI restructures your resume so it clears applicant tracking systems without losing your voice.",
  },
  {
    icon: LayoutTemplate,
    title: "Resume Templates",
    desc: "Choose from modern, professional, creative and minimal layouts built for recruiters.",
  },
  {
    icon: Wand2,
    title: "Smart Suggestions",
    desc: "Get line-by-line rewrite suggestions that make your achievements sound stronger.",
  },
  {
    icon: SpellCheck2,
    title: "Grammar Fix",
    desc: "Automatic grammar and tone correction so every bullet point reads cleanly.",
  },
  {
    icon: KeyRound,
    title: "Keyword Optimization",
    desc: "We match your resume against the job description's keywords automatically.",
  },
  {
    icon: Download,
    title: "One Click Download",
    desc: "Export a polished, print-ready PDF resume in a single click, anytime.",
  },
];

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Enter Information",
    desc: "Fill in your details, education, skills, projects and experience.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analysis",
    desc: "Our AI studies your input and benchmarks it against ATS standards.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Resume Generation",
    desc: "A polished, keyword-optimized resume is generated instantly.",
  },
  {
    number: "04",
    icon: Download,
    title: "Download Resume",
    desc: "Export your resume as a recruiter-ready PDF in one click.",
  },
];

const templates = [
  { name: "Modern", accent: "from-cyan-500 to-blue-500" },
  { name: "Professional", accent: "from-blue-500 to-indigo-500" },
  { name: "Creative", accent: "from-fuchsia-500 to-cyan-500" },
  { name: "Minimal", accent: "from-slate-400 to-slate-600" },
];

const atsChecklist = [
  { label: "Keyword Match", value: 94 },
  { label: "Formatting", value: 90 },
  { label: "Readability", value: 88 },
  { label: "Recruiter Friendly", value: 95 },
  { label: "Grammar", value: 96 },
];

const benefits = [
  { icon: TrendingUp, title: "Increase Interview Chances", desc: "Resumes built here get shortlisted more often." },
  { icon: BadgeCheck, title: "ATS Optimized", desc: "Formatted to pass automated screening systems." },
  { icon: LayoutTemplate, title: "Professional Layout", desc: "Clean, recruiter-approved visual structure." },
  { icon: Clock, title: "Save Time", desc: "Go from blank page to finished resume in minutes." },
  { icon: Zap, title: "AI Powered", desc: "Every section is refined by intelligent suggestions." },
];

const faqs = [
  {
    q: "Is my resume ATS friendly?",
    a: "Yes. Every resume generated on CampusHub AI is checked against real applicant tracking system rules for formatting, keywords and structure before it's shown to you.",
  },
  {
    q: "Can I edit my resume later?",
    a: "Absolutely. You can come back anytime, update any section, and regenerate a fresh, updated version of your resume.",
  },
  {
    q: "Can I download my resume as a PDF?",
    a: "Yes, once your resume is generated you can download a clean, print-ready PDF with a single click.",
  },
  {
    q: "Is CampusHub AI Resume Builder free to use?",
    a: "Yes, the core resume builder is completely free for students to use as part of CampusHub AI.",
  },
];

function GlowBackground() {
    
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[130px]" />
      <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />
    </div>
  );
}

function SectionBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur-md">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-cyan-400"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}

function CircularScore({ score = 92 }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex h-52 w-52 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={radius} stroke="#1e293b" strokeWidth="12" fill="none" />
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          stroke="url(#scoreGradient)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
          {score}%
        </span>
        <span className="text-xs text-slate-400">ATS Score</span>
      </div>
    </div>
  );
}

function ResumePreviewCard({ data, atsScore = 92, compact = false }) {
  return (
    <div
      className={`relative rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl ${
        compact ? "" : "shadow-2xl shadow-cyan-500/10"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-lg font-bold text-white">
            {(data?.fullName || "A S")
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">{data?.fullName || "Aarav Sharma"}</h4>
            <p className="text-xs text-slate-400">{data?.email || "aarav@email.com"} • {data?.phone || "+91 98765 43210"}</p>
          </div>
        </div>
        <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5" />
          ATS {atsScore}%
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-400">
            <GraduationCap className="h-3.5 w-3.5" /> Education
          </p>
          <p className="text-sm text-slate-300">{data?.education || "B.Tech Computer Science, XYZ University"}</p>
        </div>

        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-400">
            <Code2 className="h-3.5 w-3.5" /> Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(data?.skills
              ? data.skills.split(",")
              : ["React", "Node.js", "MongoDB", "Tailwind"]
            )
              .slice(0, 6)
              .map((skill, i) => (
                <span
                  key={i}
                  className="rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-xs text-slate-300"
                >
                  {skill.trim()}
                </span>
              ))}
          </div>
        </div>

        {!compact && (
          <>
            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-400">
                <Briefcase className="h-3.5 w-3.5" /> Experience
              </p>
              <p className="text-sm text-slate-300">
                {data?.experience || "Frontend Intern at TechCorp - Built reusable UI components in React"}
              </p>
            </div>

            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-400">
                <LayoutTemplate className="h-3.5 w-3.5" /> Projects
              </p>
              <p className="text-sm text-slate-300">
                {data?.projects || "CampusHub AI - SaaS platform for internships & placements"}
              </p>
            </div>

            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-400">
                <Award className="h-3.5 w-3.5" /> Achievements
              </p>
              <p className="text-sm text-slate-300">{data?.achievements || "Winner - Smart India Hackathon 2025"}</p>
            </div>
          </>
        )}

        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-3">
          <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
            <Wand2 className="h-3.5 w-3.5" /> AI Suggestions
            {compact && <LoadingDots />}
          </p>
          <p className="text-xs text-slate-400">
            Add measurable impact to your project bullet points, e.g. "improved load time by 40%".
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ item, isOpen, onClick }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <span className="text-sm font-medium text-white sm:text-base">{item.q}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-5 w-5 shrink-0 text-cyan-400" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-slate-400">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ResumeBuilder() {

    useEffect(() => {
        saveLastVisited("/resume-builder");
    }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    education: "",
    skills: "",
    projects: "",
    experience: "",
    achievements: "",
    objective: "",
  });
  const [experienceLevel, setExperienceLevel] = useState("Fresher");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async()=>{

    try{

    setIsGenerating(true);

    const response = await API.post(
    "/resume/generate",
    formData
    );


    console.log(
    "RESUME RESPONSE",
    response.data
    );


    setGeneratedResume(
    response.data.resume
    );


    }
    catch(error){

    console.log(error);

    alert(
    error.response?.data?.message ||
    "Resume generation failed"
    );


    }
    finally{

    setIsGenerating(false);

    }


    };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 text-slate-100">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden px-6 pb-24 pt-28 sm:px-10 lg:px-20">
        <GlowBackground />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <SectionBadge>AI Resume Builder</SectionBadge>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Build Professional{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                ATS Friendly Resume
              </span>{" "}
              with AI
            </h1>
            <p className="mt-6 max-w-xl text-base text-slate-400 sm:text-lg">
              Create modern resumes that pass ATS filters and impress recruiters, powered by AI-driven
              suggestions built for students and freshers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.a
                href="#builder"
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(34,211,238,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
              >
                Build Resume <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#templates"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-md"
              >
                View Template
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ResumePreviewCard data={null} atsScore={92} compact />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= RESUME BUILDER SECTION ================= */}
      <section id="builder" className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <SectionBadge>Resume Builder</SectionBadge>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Fill your details, let AI do the rest</h2>
            <p className="mt-3 text-slate-400">Enter your information below and generate a polished resume instantly.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl sm:p-10"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {inputFields.map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <field.icon className="h-3.5 w-3.5 text-cyan-400" />
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <Target className="h-3.5 w-3.5 text-cyan-400" />
                  Experience Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
                >
                  <option>Fresher</option>
                  <option>Intermediate</option>
                  <option>Experienced</option>
                </select>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {textareaFields.map((field) => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <field.icon className="h-3.5 w-3.5 text-cyan-400" />
                    {field.label}
                  </label>
                  <textarea
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    rows={3}
                    className="resize-none rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>
              ))}
            </div>

            <motion.button
              onClick={handleGenerate}
              disabled={isGenerating}
              whileHover={{ scale: isGenerating ? 1 : 1.02 }}
              whileTap={{ scale: isGenerating ? 1 : 0.98 }}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 disabled:opacity-70 sm:w-auto"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Generating Resume...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" /> Generate Resume
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {generatedResume && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                  className="mt-10"
                >
                  <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-300">
                    <CheckCircle2 className="h-4 w-4" /> Your resume is ready
                  </p>
                  <ResumePreviewCard data={generatedResume} atsScore={generatedResume.atsScore} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <SectionBadge>Features</SectionBadge>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Everything you need to stand out</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -6, borderColor: "rgba(34,211,238,0.4)" }}
                className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl transition"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 transition group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <SectionBadge>How It Works</SectionBadge>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Four steps to your dream resume</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                className="relative rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl"
              >
                <span className="absolute right-5 top-4 text-4xl font-bold text-slate-800">{step.number}</span>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RESUME TEMPLATES ================= */}
      <section id="templates" className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <SectionBadge>Templates</SectionBadge>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Premium resume templates</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {templates.map((template, i) => (
              <motion.div
                key={template.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl"
              >
                <div className={`relative h-40 w-full bg-gradient-to-br ${template.accent} p-4`}>
                  <div className="h-full w-full space-y-1.5 rounded-xl bg-slate-950/30 p-3 backdrop-blur-sm">
                    <div className="h-2 w-1/2 rounded-full bg-white/70" />
                    <div className="h-1.5 w-1/3 rounded-full bg-white/40" />
                    <div className="mt-2 h-1.5 w-full rounded-full bg-white/30" />
                    <div className="h-1.5 w-5/6 rounded-full bg-white/30" />
                    <div className="h-1.5 w-2/3 rounded-full bg-white/30" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-white">{template.name}</h3>
                    <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" /> ATS Friendly
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-800/60 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-500/50 hover:text-cyan-300"
                  >
                    Use Template
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ATS SCORE SECTION ================= */}
      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <GlowBackground />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex justify-center"
          >
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-10 backdrop-blur-xl">
              <CircularScore score={92} />
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <SectionBadge>ATS Score</SectionBadge>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Know exactly how your resume performs</h2>
            <p className="mt-3 text-slate-400">
              Every resume is scored across the factors recruiters and ATS software actually check.
            </p>
            <div className="mt-6 space-y-3">
              {atsChecklist.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3"
                >
                  <ClipboardCheck className="h-4 w-4 shrink-0 text-cyan-400" />
                  <span className="flex-1 text-sm text-slate-300">{item.label}</span>
                  <span className="text-sm font-semibold text-cyan-300">{item.value}%</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= BENEFITS SECTION ================= */}
      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <SectionBadge>Benefits</SectionBadge>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Why students choose CampusHub AI</h2>
            <p className="mt-3 text-slate-400">
              Built specifically for students and freshers to create resumes that actually get noticed by
              recruiters and hiring systems.
            </p>
          </motion.div>

          <div className="space-y-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                whileHover={{ x: 6 }}
                className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-xl"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                  <benefit.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-1 text-xs text-slate-400">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Frequently asked questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((item, i) => (
              <motion.div
                key={item.q}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <FAQItem
                  item={item}
                  isOpen={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-12 text-center backdrop-blur-xl sm:p-16"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/25 blur-[100px]" />
          </div>
          <div className="relative">
            <SectionBadge>Get Started</SectionBadge>
            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
              Ready to build your dream resume?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Join students using CampusHub AI to create ATS friendly resumes that actually get interviews.
            </p>
            <motion.a
              href="#builder"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(34,211,238,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30"
            >
              Generate Resume <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}