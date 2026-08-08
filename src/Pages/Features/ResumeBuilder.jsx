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
  AlertCircle,
  Lightbulb,
  XCircle,
  RefreshCw,
} from "lucide-react";

/* ================= ANIMATIONS ================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: "easeOut",
    },
  }),
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },

  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: "easeOut",
    },
  }),
};

/* ================= INPUT FIELDS ================= */

const inputFields = [
  {
    name: "fullName",
    label: "Full Name",
    icon: User,
    placeholder: "Aarav Sharma",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    icon: Mail,
    placeholder: "aarav@email.com",
    type: "email",
  },
  {
    name: "phone",
    label: "Phone",
    icon: Phone,
    placeholder: "+91 98765 43210",
    type: "text",
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedin,
    placeholder: "linkedin.com/in/aarav",
    type: "text",
  },
  {
    name: "github",
    label: "GitHub",
    icon: FaGithub,
    placeholder: "github.com/aarav",
    type: "text",
  },
  {
    name: "portfolio",
    label: "Portfolio",
    icon: Globe,
    placeholder: "aarav.dev",
    type: "text",
  },
];

/* ================= TEXTAREAS ================= */

const textareaFields = [
  {
    name: "education",
    label: "Education",
    icon: GraduationCap,
    placeholder:
      "B.Tech in Computer Science, XYZ University, 2022 - 2026",
  },
  {
    name: "skills",
    label: "Skills",
    icon: Code2,
    placeholder:
      "React, Node.js, MongoDB, Tailwind CSS",
  },
  {
    name: "projects",
    label: "Projects",
    icon: LayoutTemplate,
    placeholder:
      "CampusHub AI - SaaS platform for internships & placements",
  },
  {
    name: "experience",
    label: "Experience",
    icon: Briefcase,
    placeholder:
      "Frontend Intern at TechCorp - Built UI components in React",
  },
  {
    name: "achievements",
    label: "Achievements",
    icon: Award,
    placeholder:
      "Winner - Smart India Hackathon 2025",
  },
  {
    name: "objective",
    label: "Career Objective",
    icon: Target,
    placeholder:
      "Aspiring software engineer seeking an internship...",
  },
];

/* ================= FEATURES ================= */

const features = [
  {
    id: "ats",
    icon: Brain,
    title: "AI ATS Optimization",
    desc:
      "Analyze your resume using AI and receive a realistic ATS score based on your actual information.",
    action: "result",
  },

  {
    id: "templates",
    icon: LayoutTemplate,
    title: "Resume Templates",
    desc:
      "Choose a professional resume template and prepare your resume layout.",
    action: "templates",
  },

  {
    id: "suggestions",
    icon: Wand2,
    title: "Smart Suggestions",
    desc:
      "Get AI-generated suggestions based on the actual weaknesses in your resume.",
    action: "result",
  },

  {
    id: "grammar",
    icon: SpellCheck2,
    title: "Grammar Fix",
    desc:
      "Review AI suggestions for improving clarity, wording and professional language.",
    action: "result",
  },

  {
    id: "keywords",
    icon: KeyRound,
    title: "Keyword Optimization",
    desc:
      "Improve ATS-friendly keywords based on the information you provide.",
    action: "result",
  },

  {
    id: "download",
    icon: Download,
    title: "One Click Download",
    desc:
      "Open the browser print dialog and save your completed resume as PDF.",
    action: "download",
  },
];

/* ================= STEPS ================= */

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Enter Information",
    desc:
      "Fill in your details, education, skills, projects and experience.",
  },

  {
    number: "02",
    icon: Brain,
    title: "AI Analysis",
    desc:
      "Our AI studies your actual resume information and evaluates it.",
  },

  {
    number: "03",
    icon: Sparkles,
    title: "Resume Generation",
    desc:
      "Your resume is stored with its AI analysis and ATS score.",
  },

  {
    number: "04",
    icon: Download,
    title: "Download Resume",
    desc:
      "Save your completed resume as a recruiter-ready PDF.",
  },
];

/* ================= TEMPLATES ================= */

const templates = [
  {
    name: "Modern",
    accent: "from-cyan-500 to-blue-500",
  },

  {
    name: "Professional",
    accent: "from-blue-500 to-indigo-500",
  },

  {
    name: "Creative",
    accent: "from-fuchsia-500 to-cyan-500",
  },

  {
    name: "Minimal",
    accent: "from-slate-400 to-slate-600",
  },
];

/* ================= BENEFITS ================= */

const benefits = [
  {
    icon: TrendingUp,
    title: "Increase Interview Chances",
    desc:
      "Build a stronger resume with AI-powered analysis.",
  },

  {
    icon: BadgeCheck,
    title: "ATS Optimized",
    desc:
      "Analyze your resume using ATS-focused criteria.",
  },

  {
    icon: LayoutTemplate,
    title: "Professional Layout",
    desc:
      "Keep your resume clean and recruiter friendly.",
  },

  {
    icon: Clock,
    title: "Save Time",
    desc:
      "Get AI feedback without manually checking every section.",
  },

  {
    icon: Zap,
    title: "AI Powered",
    desc:
      "Your resume is analyzed using the connected Groq AI backend.",
  },
];

/* ================= FAQ ================= */

const faqs = [
  {
    q: "Is my resume ATS friendly?",
    a:
      "The AI analyzes your actual resume information and gives an ATS score based on skills, projects, education, experience, achievements, objective, completeness, wording and ATS keywords.",
  },

  {
    q: "Can I edit my resume later?",
    a:
      "Yes. You can change the information in the builder and generate the resume again.",
  },

  {
    q: "Can I download my resume as a PDF?",
    a:
      "Yes. After generating your resume, use the Download Resume option to open the browser print dialog and save it as PDF.",
  },

  {
    q: "Is CampusHub AI Resume Builder free?",
    a:
      "Yes. The core resume builder is available as part of CampusHub AI.",
  },
];

/* ================= BACKGROUND ================= */

function GlowBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />
    </div>
  );
}

/* ================= SECTION BADGE ================= */

function SectionBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-300">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

/* ================= LOADING DOTS ================= */

function LoadingDots() {
  return (
    <span className="ml-1 inline-flex items-center gap-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-cyan-400"
          animate={{
            opacity: [0.3, 1, 0.3],
            y: [0, -3, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </span>
  );
}

/* ================= CIRCULAR ATS SCORE ================= */

function CircularScore({ score = 0 }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const safeScore = Math.max(
    0,
    Math.min(100, Number(score) || 0)
  );

  const offset =
    circumference - (safeScore / 100) * circumference;

  return (
    <div className="relative flex h-44 w-44 items-center justify-center">
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        className="-rotate-90"
      >
        <defs>
          <linearGradient
            id="scoreGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>

        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          className="text-slate-800"
        />

        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          stroke="url(#scoreGradient)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          animate={{
            strokeDashoffset: offset,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        />
      </svg>

      <div className="absolute text-center">
        <div className="text-4xl font-bold text-white">
          {safeScore}%
        </div>

        <div className="mt-1 text-xs font-medium text-slate-400">
          ATS Score
        </div>
      </div>
    </div>
  );
}

/* ================= RESUME PREVIEW ================= */

function ResumePreviewCard({
  data,
  atsScore = 0,
  compact = false,
  onDownload,
}) {
  const initials =
    data?.fullName
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AS";

  const skills = data?.skills
    ? data.skills.split(",")
    : [];

  return (
    <div
      className={`relative rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl ${
        compact
          ? ""
          : "shadow-2xl shadow-cyan-500/10"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white">
            {initials}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {data?.fullName || "Your Name"}
            </h3>

            <p className="text-xs text-slate-400">
              {data?.email || "your@email.com"}
              {data?.phone
                ? ` • ${data.phone}`
                : ""}
            </p>
          </div>
        </div>

        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
          ATS {Number(atsScore) || 0}%
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-400">
            <GraduationCap className="h-3.5 w-3.5" />
            Education
          </p>

          <p className="text-sm text-slate-300">
            {data?.education ||
              "Your education details will appear here."}
          </p>
        </div>

        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-400">
            <Code2 className="h-3.5 w-3.5" />
            Skills
          </p>

          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {skills.slice(0, 8).map((skill, i) => (
                <span
                  key={i}
                  className="rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-0.5 text-xs text-slate-300"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              Add your skills above.
            </p>
          )}
        </div>

        {!compact && (
          <>
            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-400">
                <Briefcase className="h-3.5 w-3.5" />
                Experience
              </p>

              <p className="text-sm text-slate-300">
                {data?.experience ||
                  "Experience details will appear here."}
              </p>
            </div>

            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-400">
                <LayoutTemplate className="h-3.5 w-3.5" />
                Projects
              </p>

              <p className="text-sm text-slate-300">
                {data?.projects ||
                  "Project details will appear here."}
              </p>
            </div>

            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-400">
                <Award className="h-3.5 w-3.5" />
                Achievements
              </p>

              <p className="text-sm text-slate-300">
                {data?.achievements ||
                  "Achievement details will appear here."}
              </p>
            </div>

            {data?.objective && (
              <div>
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-400">
                  <Target className="h-3.5 w-3.5" />
                  Objective
                </p>

                <p className="text-sm text-slate-300">
                  {data.objective}
                </p>
              </div>
            )}
          </>
        )}

        {!compact && onDownload && (
          <button
            onClick={onDownload}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01]"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </button>
        )}
      </div>
    </div>
  );
}

/* ================= AI ANALYSIS ================= */

function AIAnalysisCard({ analysis }) {
  if (!analysis) {
    return null;
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
      {/* Summary */}

      <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6">
        <div className="mb-3 flex items-center gap-2">
          <Brain className="h-5 w-5 text-cyan-400" />

          <h3 className="font-semibold text-white">
            AI Resume Assessment
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-slate-300">
          {analysis.summary ||
            "AI analysis completed successfully."}
        </p>
      </div>

      {/* Strengths */}

      <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />

          <h3 className="font-semibold text-white">
            Strengths
          </h3>
        </div>

        <div className="space-y-2">
          {(analysis.strengths || []).map(
            (item, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span className="mt-1 text-emerald-400">
                  •
                </span>

                <span>{item}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Weaknesses */}

      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
        <div className="mb-4 flex items-center gap-2">
          <XCircle className="h-5 w-5 text-red-400" />

          <h3 className="font-semibold text-white">
            Weaknesses
          </h3>
        </div>

        <div className="space-y-2">
          {(analysis.weaknesses || []).map(
            (item, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span className="mt-1 text-red-400">
                  •
                </span>

                <span>{item}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Suggestions */}

      <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-400" />

          <h3 className="font-semibold text-white">
            AI Suggestions
          </h3>
        </div>

        <div className="space-y-2">
          {(analysis.suggestions || []).map(
            (item, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-sm text-slate-300"
              >
                <span className="mt-1 text-yellow-400">
                  •
                </span>

                <span>{item}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= FAQ ================= */

function FAQItem({ item, isOpen, onClick }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-white">
          {item.q}
        </span>

        <motion.span
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <ChevronDown className="h-4 w-4 text-cyan-400" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <div className="border-t border-slate-800 px-5 py-4 text-sm leading-relaxed text-slate-400">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */

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

  const [experienceLevel, setExperienceLevel] =
    useState("Fresher");

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [generatedResume, setGeneratedResume] =
    useState(null);

  const [openFaq, setOpenFaq] = useState(0);

  const [selectedTemplate, setSelectedTemplate] =
    useState("Modern");

  // Resume AI Tools
  const [activeTool, setActiveTool] =
    useState(null);

  const [isToolLoading, setIsToolLoading] =
    useState(false);

  const [jobDescription, setJobDescription] =
    useState("");

  const [suggestions, setSuggestions] =
    useState([]);

  const [missingKeywords, setMissingKeywords] =
    useState([]);

  /* ================= FORM CHANGE ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= DOWNLOAD ================= */

  const handleDownload = () => {
    if (!generatedResume) {
      alert(
        "Please generate your resume first."
      );

      return;
    }

    window.print();
  };

  /* ================= FEATURE CLICK ================= */

  const handleFeatureClick = (feature) => {
    if (feature.action === "download") {
      handleDownload();

      return;
    }

    if (feature.action === "templates") {
      document
        .getElementById("templates")
        ?.scrollIntoView({
          behavior: "smooth",
        });

      return;
    }

    if (feature.action === "result") {
      if (!generatedResume) {
        document
          .getElementById("builder")
          ?.scrollIntoView({
            behavior: "smooth",
          });

        return;
      }

      document
        .getElementById("ai-analysis")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }
  };

  /* ================= TEMPLATE ================= */

  const handleTemplateSelect = (templateName) => {
    setSelectedTemplate(templateName);

    document
      .getElementById("builder")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  /* ================= GENERATE ================= */

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);

      const response = await API.post("/resume/generate", {
        ...formData,
        experienceLevel,
      });

      console.log("RESUME RESPONSE:", response.data);

      setGeneratedResume(response.data.resume);

    } catch (error) {
      console.error(
        "RESUME GENERATION ERROR:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Resume generation failed"
      );

    } finally {
      setIsGenerating(false);
    }
  };

  const actualScore = Number(
    generatedResume?.atsScore || 0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden px-6 py-24 sm:px-10 lg:px-20">
        <GlowBackground />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <SectionBadge>
              AI Resume Builder
            </SectionBadge>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Build Professional{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                ATS Friendly Resume
              </span>{" "}
              with AI
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
              Create modern resumes that pass ATS
              filters and get realistic AI feedback
              based on the information you actually
              provide.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <motion.a
                href="#builder"
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
              >
                Build Resume
                <ArrowRight className="h-4 w-4" />
              </motion.a>

              <motion.a
                href="#templates"
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-md"
              >
                View Templates
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
          >
            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ResumePreviewCard
                data={generatedResume}
                atsScore={actualScore}
                compact
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= BUILDER ================= */}

      <section
        id="builder"
        className="relative px-6 py-24 sm:px-10 lg:px-20"
      >
        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <SectionBadge>
              Resume Builder
            </SectionBadge>

            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Fill your details, let AI do the rest
            </h2>

            <p className="mt-3 text-slate-400">
              Enter your information below and
              generate a personalized AI analysis.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl sm:p-10"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {inputFields.map((field) => (
                <div
                  key={field.name}
                  className="flex flex-col gap-2"
                >
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <field.icon className="h-3.5 w-3.5 text-cyan-400" />
                    {field.label}
                  </label>

                  <input
                    type={field.type}
                    name={field.name}
                    value={
                      formData[field.name]
                    }
                    onChange={handleChange}
                    placeholder={
                      field.placeholder
                    }
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
                  onChange={(e) =>
                    setExperienceLevel(
                      e.target.value
                    )
                  }
                  className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
                >
                  <option>Fresher</option>
                  <option>
                    Intermediate
                  </option>
                  <option>
                    Experienced
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {textareaFields.map(
                (field) => (
                  <div
                    key={field.name}
                    className="flex flex-col gap-2"
                  >
                    <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                      <field.icon className="h-3.5 w-3.5 text-cyan-400" />
                      {field.label}
                    </label>

                    <textarea
                      name={field.name}
                      value={
                        formData[
                          field.name
                        ]
                      }
                      onChange={
                        handleChange
                      }
                      placeholder={
                        field.placeholder
                      }
                      rows={3}
                      className="resize-none rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
                    />
                  </div>
                )
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-xs text-slate-500">
                Selected Template:
              </span>

              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                {selectedTemplate}
              </span>
            </div>

            <motion.button
              onClick={handleGenerate}
              disabled={isGenerating}
              whileHover={{
                scale: isGenerating
                  ? 1
                  : 1.02,
              }}
              whileTap={{
                scale: isGenerating
                  ? 1
                  : 0.98,
              }}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  AI Analyzing Resume...
                  <LoadingDots />
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Generate Resume
                </>
              )}
            </motion.button>

            {/* ================= GENERATED RESULT ================= */}

            <AnimatePresence>
              {generatedResume && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 20,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="mt-10"
                >
                  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                    <p className="flex items-center gap-2 text-sm font-semibold text-cyan-300">
                      <CheckCircle2 className="h-4 w-4" />
                      AI analysis completed
                    </p>

                    <button
                      onClick={handleDownload}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-500/50 hover:text-cyan-300"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </button>
                  </div>

                  <ResumePreviewCard
                    data={generatedResume}
                    atsScore={
                      generatedResume.atsScore
                    }
                    onDownload={
                      handleDownload
                    }
                  />

                  {/* AI ANALYSIS */}

                  <div id="ai-analysis">
                    <AIAnalysisCard
                      analysis={
                        generatedResume.aiAnalysis
                      }
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <SectionBadge>
              Features
            </SectionBadge>

            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Everything you need to stand out
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-slate-400">
              Click any feature to use it or jump
              directly to the relevant section.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(
              (feature, i) => (
                <motion.button
                  key={feature.title}
                  type="button"
                  onClick={() =>
                    handleFeatureClick(
                      feature
                    )
                  }
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                  }}
                  variants={fadeUp}
                  whileHover={{
                    y: -6,
                    borderColor:
                      "rgba(34,211,238,0.4)",
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-left backdrop-blur-xl transition"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 transition group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {feature.desc}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-cyan-400">
                    Open Feature
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </div>
                </motion.button>
              )
            )}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <SectionBadge>
              How It Works
            </SectionBadge>

            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Four steps to your dream resume
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(
              (step, i) => (
                <motion.div
                  key={step.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                  }}
                  variants={scaleIn}
                  whileHover={{
                    y: -6,
                  }}
                  className="relative rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl"
                >
                  <span className="absolute right-5 top-4 text-4xl font-bold text-slate-800">
                    {step.number}
                  </span>

                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                    <step.icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-base font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {step.desc}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ================= TEMPLATES ================= */}

      <section
        id="templates"
        className="relative px-6 py-24 sm:px-10 lg:px-20"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="mb-14 text-center"
          >
            <SectionBadge>
              Templates
            </SectionBadge>

            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Choose your resume template
            </h2>

            <p className="mt-3 text-slate-400">
              Select a template before generating
              your resume.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {templates.map(
              (template, i) => {
                const isSelected =
                  selectedTemplate ===
                  template.name;

                return (
                  <motion.div
                    key={template.name}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                      once: true,
                    }}
                    variants={fadeUp}
                    whileHover={{
                      y: -8,
                    }}
                    className={`overflow-hidden rounded-3xl border bg-slate-900/50 backdrop-blur-xl transition ${
                      isSelected
                        ? "border-cyan-500/60 shadow-lg shadow-cyan-500/10"
                        : "border-slate-800"
                    }`}
                  >
                    <div
                      className={`relative h-40 w-full bg-gradient-to-br ${template.accent} p-4`}
                    >
                      <div className="h-full w-full space-y-1.5 rounded-xl bg-slate-950/30 p-3 backdrop-blur-sm">
                        <div className="h-2 w-1/2 rounded-full bg-white/70" />
                        <div className="h-1.5 w-1/3 rounded-full bg-white/40" />
                        <div className="mt-2 h-1.5 w-full rounded-full bg-white/30" />
                        <div className="h-1.5 w-5/6 rounded-full bg-white/30" />
                        <div className="h-1.5 w-2/3 rounded-full bg-white/30" />
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-semibold text-white">
                          {template.name}
                        </h3>

                        <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" />
                          ATS Friendly
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          handleTemplateSelect(
                            template.name
                          )
                        }
                        className={`mt-4 w-full rounded-xl py-2 text-xs font-semibold transition ${
                          isSelected
                            ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                            : "border border-slate-700 bg-slate-800/60 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300"
                        }`}
                      >
                        {isSelected
                          ? "Selected"
                          : "Use Template"}
                      </button>
                    </div>
                  </motion.div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* ================= ATS SCORE ================= */}

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <GlowBackground />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="flex justify-center"
          >
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-10 backdrop-blur-xl">
              <CircularScore
                score={actualScore}
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
          >
            <SectionBadge>
              AI ATS Score
            </SectionBadge>

            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Know exactly how your resume performs
            </h2>

            <p className="mt-3 text-slate-400">
              This score comes from the AI analysis of
              the resume information you submitted.
            </p>

            {!generatedResume && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />

                <p className="text-sm text-slate-400">
                  Generate your resume to see your
                  actual AI ATS score.
                </p>
              </div>
            )}

            {generatedResume && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3">
                  <ClipboardCheck className="h-4 w-4 text-cyan-400" />

                  <span className="flex-1 text-sm text-slate-300">
                    AI ATS Evaluation
                  </span>

                  <span className="text-sm font-semibold text-cyan-300">
                    Completed
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                  <span className="flex-1 text-sm text-slate-300">
                    Resume Analysis
                  </span>

                  <span className="text-sm font-semibold text-emerald-300">
                    AI Generated
                  </span>
                </div>

                <button
                  onClick={() =>
                    document
                      .getElementById(
                        "ai-analysis"
                      )
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  className="mt-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-semibold text-white"
                >
                  View AI Analysis
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
          >
            <SectionBadge>
              Benefits
            </SectionBadge>

            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Why students choose CampusHub AI
            </h2>

            <p className="mt-3 text-slate-400">
              Built for students and freshers who want
              useful AI feedback instead of a fixed
              artificial score.
            </p>
          </motion.div>

          <div className="space-y-4">
            {benefits.map(
              (benefit, i) => (
                <motion.div
                  key={benefit.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                  }}
                  variants={fadeUp}
                  whileHover={{
                    x: 6,
                  }}
                  className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-xl"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                    <benefit.icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {benefit.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <SectionBadge>
              FAQ
            </SectionBadge>

            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Frequently asked questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map(
              (item, i) => (
                <motion.div
                  key={item.q}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                  }}
                  variants={fadeUp}
                >
                  <FAQItem
                    item={item}
                    isOpen={
                      openFaq === i
                    }
                    onClick={() =>
                      setOpenFaq(
                        openFaq === i
                          ? -1
                          : i
                      )
                    }
                  />
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          variants={scaleIn}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-12 text-center backdrop-blur-xl sm:p-16"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/25 blur-[100px]" />
          </div>

          <div className="relative">
            <SectionBadge>
              Get Started
            </SectionBadge>

            <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
              Ready to build your dream resume?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Generate your resume and let AI analyze
              your actual skills, projects, experience
              and achievements.
            </p>

            <motion.a
              href="#builder"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 0 40px rgba(34,211,238,0.4)",
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30"
            >
              Generate Resume
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}