import React, { useEffect, useMemo, useState } from "react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import {
  generateRoadmap,
  getMyRoadmaps,
  updateRoadmapStepProgress,
  generateStepLearning,
} from "../../services/roadmapService";

import {
  Sparkles,
  Rocket,
  ArrowRight,
  Code2,
  Server,
  Layers,
  Brain,
  BarChart3,
  Shield,
  Cloud,
  GitBranch,
  Smartphone,
  PenTool,
  Database,
  CheckCircle2,
  Circle,
  ChevronDown,
  Wand2,
  Loader2,
  Clock,
  BookOpen,
  FileText,
  Library,
  GraduationCap,
  Target,
  TrendingUp,
  Users,
  Star,
  ExternalLink,
  Award,
  Mic,
  Terminal,
  Briefcase,
  FileCheck2,
  MessageSquare,
  Zap,
  Flag,
  X,
  Lightbulb,
  AlertTriangle,
  ListChecks,
  ClipboardList,
  HelpCircle,
  ArrowRightCircle,
} from "lucide-react";

/* ============================================================
   ANIMATION VARIANTS
============================================================ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.06,
      ease: "easeOut",
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.06,
      ease: "easeOut",
    },
  }),
};

/* ============================================================
   CAREERS
============================================================ */

const CAREERS = [
  {
    id: "frontend",
    name: "Frontend Developer",
    icon: Code2,
  },
  {
    id: "backend",
    name: "Backend Developer",
    icon: Server,
  },
  {
    id: "fullstack",
    name: "Full Stack Developer",
    icon: Layers,
  },
  {
    id: "ai",
    name: "AI Engineer",
    icon: Brain,
  },
  {
    id: "ml",
    name: "Machine Learning",
    icon: BarChart3,
  },
  {
    id: "data",
    name: "Data Scientist",
    icon: Database,
  },
  {
    id: "cyber",
    name: "Cyber Security",
    icon: Shield,
  },
  {
    id: "cloud",
    name: "Cloud Engineer",
    icon: Cloud,
  },
  {
    id: "devops",
    name: "DevOps Engineer",
    icon: GitBranch,
  },
  {
    id: "android",
    name: "Android Developer",
    icon: Smartphone,
  },
  {
    id: "uiux",
    name: "UI/UX Designer",
    icon: PenTool,
  },
];

/* ============================================================
   SKILL LEVELS
============================================================ */

const SKILL_LEVELS = [
  {
    id: "Beginner",
    desc: "Starting from scratch, little to no experience.",
  },
  {
    id: "Intermediate",
    desc: "Comfortable with basics, ready to build real projects.",
  },
  {
    id: "Advanced",
    desc: "Strong fundamentals, targeting job-ready mastery.",
  },
];

/* ============================================================
   STEP ICONS
============================================================ */

const STEP_ICONS = [
  FileText,
  PenTool,
  Code2,
  GitBranch,
  Layers,
  Server,
  Terminal,
  Database,
  Briefcase,
  Cloud,
  Mic,
  BookOpen,
];

const getStepIcon = (step, index) =>
  step?.icon || STEP_ICONS[index % STEP_ICONS.length];

/* ============================================================
   FALLBACK ROADMAP
============================================================ */

const ROADMAP_STEPS = [
  {
    title: "HTML Fundamentals",
    icon: FileText,
    difficulty: "Beginner",
    time: "1 Week",
    status: "pending",
    progress: 0,
    description:
      "Learn semantic HTML, forms, accessibility and document structure.",
  },
  {
    title: "CSS & Layouts",
    icon: PenTool,
    difficulty: "Beginner",
    time: "2 Weeks",
    status: "pending",
    progress: 0,
    description:
      "Master Flexbox, Grid, responsive design and modern styling.",
  },
  {
    title: "JavaScript Essentials",
    icon: Code2,
    difficulty: "Intermediate",
    time: "3 Weeks",
    status: "pending",
    progress: 0,
    description:
      "DOM manipulation, ES6+, async/await, and core programming logic.",
  },
  {
    title: "Git & GitHub",
    icon: GitBranch,
    difficulty: "Beginner",
    time: "1 Week",
    status: "pending",
    progress: 0,
    description:
      "Version control, branching, pull requests and collaboration.",
  },
  {
    title: "React.js",
    icon: Layers,
    difficulty: "Intermediate",
    time: "3 Weeks",
    status: "pending",
    progress: 0,
    description:
      "Components, hooks, state management and component architecture.",
  },
  {
    title: "Node.js",
    icon: Server,
    difficulty: "Intermediate",
    time: "2 Weeks",
    status: "pending",
    progress: 0,
    description:
      "Server-side JavaScript, event loop, and building REST APIs.",
  },
  {
    title: "Express.js",
    icon: Terminal,
    difficulty: "Intermediate",
    time: "2 Weeks",
    status: "pending",
    progress: 0,
    description:
      "Routing, middleware, authentication and API structuring.",
  },
  {
    title: "MongoDB",
    icon: Database,
    difficulty: "Intermediate",
    time: "2 Weeks",
    status: "pending",
    progress: 0,
    description:
      "NoSQL data modeling, Mongoose, aggregation and indexing.",
  },
  {
    title: "Build Projects",
    icon: Briefcase,
    difficulty: "Advanced",
    time: "4 Weeks",
    status: "pending",
    progress: 0,
    description:
      "Apply everything into 3-4 portfolio-ready full stack projects.",
  },
  {
    title: "Deployment",
    icon: Cloud,
    difficulty: "Advanced",
    time: "1 Week",
    status: "pending",
    progress: 0,
    description:
      "Deploy apps using Vercel, Render, and configure CI/CD basics.",
  },
  {
    title: "Interview Preparation",
    icon: Mic,
    difficulty: "Advanced",
    time: "3 Weeks",
    status: "pending",
    progress: 0,
    description:
      "DSA practice, mock interviews, and behavioral round preparation.",
  },
];

/* ============================================================
   WEEKLY PLAN
============================================================ */

const WEEKLY_PLAN = [
  {
    week: "Week 1",
    topics: ["HTML5 Semantics", "CSS Flexbox", "Responsive Design"],
    assignment: "Build a responsive landing page from scratch.",
    miniProject: "Personal Bio Page",
    hours: 10,
  },
  {
    week: "Week 2",
    topics: ["CSS Grid", "JavaScript Basics", "DOM Events"],
    assignment: "Create an interactive to-do list with vanilla JS.",
    miniProject: "To-Do List App",
    hours: 12,
  },
  {
    week: "Week 3",
    topics: ["ES6+ Features", "Fetch API", "Git & GitHub"],
    assignment: "Consume a public API and render the results.",
    miniProject: "Weather Dashboard",
    hours: 14,
  },
  {
    week: "Week 4",
    topics: ["React Basics", "Component Design", "Hooks"],
    assignment: "Convert a static site into a React component tree.",
    miniProject: "React Portfolio Starter",
    hours: 15,
  },
];

/* ============================================================
   PROJECTS
============================================================ */

const PROJECTS = [
  {
    name: "Weather App",
    difficulty: "Beginner",
    skills: ["JavaScript", "API", "CSS"],
    time: "1 Week",
  },
  {
    name: "Portfolio Website",
    difficulty: "Beginner",
    skills: ["HTML", "CSS", "React"],
    time: "1 Week",
  },
  {
    name: "Realtime Chat App",
    difficulty: "Intermediate",
    skills: ["Socket.IO", "Node.js", "React"],
    time: "2 Weeks",
  },
  {
    name: "CampusHub Clone",
    difficulty: "Advanced",
    skills: ["MERN", "JWT", "Cloudinary"],
    time: "4 Weeks",
  },
  {
    name: "Task Manager",
    difficulty: "Intermediate",
    skills: ["React", "MongoDB", "Express"],
    time: "2 Weeks",
  },
  {
    name: "E-commerce Store",
    difficulty: "Advanced",
    skills: ["MERN", "Payments", "Auth"],
    time: "3 Weeks",
  },
  {
    name: "Expense Tracker",
    difficulty: "Beginner",
    skills: ["React", "Charts", "LocalStorage"],
    time: "1 Week",
  },
];

/* ============================================================
   RESOURCES
============================================================ */

const RESOURCES = [
  {
    icon: FaYoutube,
    title: "YouTube",
    desc: "Free video tutorials covering every stage of your roadmap.",
    url: "https://www.youtube.com/",
  },
  {
    icon: BookOpen,
    title: "Documentation",
    desc: "Official docs for deep, accurate technical understanding.",
    url: "https://developer.mozilla.org/",
  },
  {
    icon: Terminal,
    title: "Practice",
    desc: "Hands-on coding platforms to sharpen problem solving.",
    url: "https://leetcode.com/",
  },
  {
    icon: FileText,
    title: "Articles",
    desc: "In-depth written guides and best-practice breakdowns.",
    url: "https://dev.to/",
  },
  {
    icon: Library,
    title: "Books",
    desc: "Structured, foundational reading for long-term mastery.",
    url: "https://www.oreilly.com/",
  },
  {
    icon: GraduationCap,
    title: "Courses",
    desc: "Guided, structured courses to fast-track your learning.",
    url: "https://www.coursera.org/",
  },
];

/* ============================================================
   SKILL ANALYSIS
============================================================ */

const SKILL_ANALYSIS = [
  {
    label: "Current Skills",
    value: 62,
    icon: Code2,
  },
  {
    label: "Missing Skills",
    value: 38,
    icon: Target,
  },
  {
    label: "Industry Readiness",
    value: 74,
    icon: TrendingUp,
  },
  {
    label: "Interview Readiness",
    value: 58,
    icon: Mic,
  },
];

/* ============================================================
   PLACEMENT CHECKLIST
============================================================ */

const PLACEMENT_CHECKLIST = [
  {
    label: "Resume Ready",
    icon: FileCheck2,
  },
  {
    label: "GitHub Ready",
    icon: FaGithub,
  },
  {
    label: "LinkedIn Ready",
    icon: FaLinkedin,
  },
  {
    label: "Projects",
    icon: Briefcase,
  },
  {
    label: "Portfolio",
    icon: Layers,
  },
  {
    label: "Communication",
    icon: MessageSquare,
  },
  {
    label: "Interview",
    icon: Mic,
  },
  {
    label: "Coding",
    icon: Terminal,
  },
];

/* ============================================================
   STATS
============================================================ */

const STATS = [
  {
    value: "15000+",
    label: "Students Learning",
    icon: Users,
  },
  {
    value: "500+",
    label: "Roadmaps Generated Daily",
    icon: Zap,
  },
  {
    value: "95%",
    label: "Placement Success",
    icon: Award,
  },
  {
    value: "100+",
    label: "Career Paths",
    icon: Flag,
  },
];

/* ============================================================
   TESTIMONIALS
============================================================ */

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    college: "NIT Trichy",
    career: "Frontend Developer",
    review:
      "The AI roadmap broke down exactly what to learn each week. I went from confused to confident in two months.",
  },
  {
    name: "Rahul Verma",
    college: "VIT Vellore",
    career: "Full Stack Developer",
    review:
      "Following the weekly plan and recommended projects gave me a portfolio that actually got recruiter attention.",
  },
  {
    name: "Sneha Iyer",
    college: "IIIT Hyderabad",
    career: "Data Scientist",
    review:
      "The skill analysis showed me my exact gaps. I focused only on what mattered and cleared my placement interviews.",
  },
];

/* ============================================================
   FAQS
============================================================ */

const FAQS = [
  {
    q: "How does the AI generate my roadmap?",
    a: "It combines your selected career path and current skill level to sequence topics in the order they build on each other, with realistic timeframes for each stage.",
  },
  {
    q: "Can I change my career path later?",
    a: "Yes. You can select a different career or skill level anytime and regenerate a fresh roadmap tailored to that path.",
  },
  {
    q: "Are the recommended projects beginner friendly?",
    a: "Projects are tagged by difficulty, so you can start with beginner-friendly builds and progress to advanced ones as your skills grow.",
  },
  {
    q: "Is the roadmap free to use?",
    a: "Yes, the AI Skill Roadmap is completely free to generate and use as part of CampusHub AI.",
  },
];

/* ============================================================
   SHARED UI
============================================================ */

function GlowBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[130px]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

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

function SectionHeading({ badge, title, subtitle }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="mb-14 text-center"
    >
      <SectionBadge>{badge}</SectionBadge>

      <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-3 max-w-xl text-slate-400">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function CircularProgress({
  value = 0,
  size = 120,
  label,
  sublabel,
}) {
  const safeValue = Math.min(
    100,
    Math.max(0, Number(value) || 0)
  );

  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (safeValue / 100) * circumference;

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        className="h-full w-full -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1e293b"
          strokeWidth="10"
          fill="none"
        />

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#roadmapGradient)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{
            strokeDashoffset: circumference,
          }}
          whileInView={{
            strokeDashoffset: offset,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.4,
            ease: "easeOut",
          }}
        />

        <defs>
          <linearGradient
            id="roadmapGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#22d3ee"
            />
            <stop
              offset="100%"
              stopColor="#3b82f6"
            />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-white">
          {safeValue}%
        </span>

        {sublabel && (
          <span className="text-[10px] text-slate-500">
            {sublabel}
          </span>
        )}
      </div>

      {label && (
        <span className="mt-2 text-xs text-slate-400">
          {label}
        </span>
      )}
    </div>
  );
}

function FAQItem({
  item,
  isOpen,
  onClick,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <span className="text-sm font-medium text-white sm:text-base">
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
          <ChevronDown className="h-5 w-5 shrink-0 text-cyan-400" />
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
              ease: "easeInOut",
            }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-slate-400">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   STATUS STYLES
============================================================ */

const statusStyles = {
  completed: {
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    bar: "from-emerald-400 to-emerald-500",
    label: "Completed",
  },

  "in-progress": {
    text: "text-cyan-300",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    bar: "from-cyan-400 to-blue-500",
    label: "In Progress",
  },

  pending: {
    text: "text-slate-400",
    border: "border-slate-700",
    bg: "bg-slate-800/40",
    bar: "from-slate-600 to-slate-500",
    label: "Pending",
  },
};

/* ============================================================
   LEARNING PANEL — renders the AI-generated learning module
   for a single roadmap step. Pure presentation; all actions
   are passed in as callbacks so this stays decoupled from
   progress/completion logic.
============================================================ */

function LearningPanel({
  isOpen,
  isLoading,
  error,
  step,
  content,
  onClose,
  onRetry,
  onCompleteStep,
  isCompleting,
  isAlreadyCompleted,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-slate-800 bg-slate-950 shadow-2xl sm:inset-0 sm:top-10 sm:bottom-10 sm:my-auto sm:h-fit sm:rounded-3xl"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between gap-4 border-b border-slate-800 bg-slate-900/60 px-6 py-4">
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-cyan-300">
                  <Brain className="h-3.5 w-3.5" />
                  AI Learning Module
                </p>

                <h3 className="mt-0.5 truncate text-base font-semibold text-white sm:text-lg">
                  {step?.title || "Learning Step"}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {isLoading && (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
                  <p className="text-sm text-slate-400">
                    Your AI tutor is preparing this lesson...
                  </p>
                </div>
              )}

              {!isLoading && error && (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                  <AlertTriangle className="h-8 w-8 text-amber-400" />
                  <p className="max-w-sm text-sm text-slate-400">
                    {error}
                  </p>
                  <button
                    type="button"
                    onClick={onRetry}
                    className="mt-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!isLoading && !error && content && (
                <div className="space-y-8">
                  {/* OVERVIEW */}
                  {content.overview && (
                    <div>
                      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                        <BookOpen className="h-3.5 w-3.5" />
                        Overview
                      </p>
                      <p className="text-sm leading-relaxed text-slate-300">
                        {content.overview}
                      </p>
                    </div>
                  )}

                  {/* WHY IT MATTERS */}
                  {content.whyItMatters && (
                    <div>
                      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                        <Lightbulb className="h-3.5 w-3.5" />
                        Why This Matters
                      </p>
                      <p className="text-sm leading-relaxed text-slate-300">
                        {content.whyItMatters}
                      </p>
                    </div>
                  )}

                  {/* WHAT YOU'LL LEARN */}
                  {Array.isArray(content.whatYouWillLearn) &&
                    content.whatYouWillLearn.length > 0 && (
                      <div>
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                          <ListChecks className="h-3.5 w-3.5" />
                          What You'll Learn
                        </p>
                        <ul className="space-y-1.5">
                          {content.whatYouWillLearn.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-slate-300"
                            >
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* CORE CONCEPTS */}
                  {Array.isArray(content.coreConcepts) &&
                    content.coreConcepts.length > 0 && (
                      <div>
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                          <Brain className="h-3.5 w-3.5" />
                          Core Concepts
                        </p>
                        <div className="space-y-4">
                          {content.coreConcepts.map((concept, i) => (
                            <div
                              key={i}
                              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4"
                            >
                              <h4 className="text-sm font-semibold text-white">
                                {concept.title || `Concept ${i + 1}`}
                              </h4>
                              {concept.explanation && (
                                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                                  {concept.explanation}
                                </p>
                              )}
                              {concept.example && (
                                <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-cyan-200">
                                  <code>{concept.example}</code>
                                </pre>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* CODE EXAMPLES */}
                  {Array.isArray(content.codeExamples) &&
                    content.codeExamples.length > 0 && (
                      <div>
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                          <Terminal className="h-3.5 w-3.5" />
                          Code Examples
                        </p>
                        <div className="space-y-3">
                          {content.codeExamples.map((ex, i) => (
                            <div key={i}>
                              {ex.label && (
                                <p className="mb-1 text-xs text-slate-500">
                                  {ex.label}
                                </p>
                              )}
                              <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-cyan-200">
                                <code>{ex.code || ex}</code>
                              </pre>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* COMMON MISTAKES */}
                  {Array.isArray(content.commonMistakes) &&
                    content.commonMistakes.length > 0 && (
                      <div>
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-300">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Common Mistakes
                        </p>
                        <ul className="space-y-1.5">
                          {content.commonMistakes.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-slate-300"
                            >
                              <Circle className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* PRACTICE QUESTIONS */}
                  {Array.isArray(content.practiceQuestions) &&
                    content.practiceQuestions.length > 0 && (
                      <div>
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                          <HelpCircle className="h-3.5 w-3.5" />
                          Practice Questions
                        </p>
                        <ul className="space-y-1.5">
                          {content.practiceQuestions.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-slate-300"
                            >
                              <span className="text-cyan-400">
                                {i + 1}.
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* HANDS-ON TASK */}
                  {content.handsOnTask && (
                    <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                      <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                        <ClipboardList className="h-3.5 w-3.5" />
                        Hands-On Task
                      </p>
                      <p className="text-sm leading-relaxed text-slate-300">
                        {content.handsOnTask}
                      </p>
                    </div>
                  )}

                  {/* INTERVIEW QUESTIONS */}
                  {Array.isArray(content.interviewQuestions) &&
                    content.interviewQuestions.length > 0 && (
                      <div>
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-300">
                          <Mic className="h-3.5 w-3.5" />
                          Interview Questions
                        </p>
                        <ul className="space-y-1.5">
                          {content.interviewQuestions.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-slate-300"
                            >
                              <span className="text-cyan-400">
                                {i + 1}.
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* KEY TAKEAWAYS */}
                  {Array.isArray(content.keyTakeaways) &&
                    content.keyTakeaways.length > 0 && (
                      <div>
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                          <Star className="h-3.5 w-3.5" />
                          Key Takeaways
                        </p>
                        <ul className="space-y-1.5">
                          {content.keyTakeaways.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-slate-300"
                            >
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {/* NEXT STEP */}
                  {content.suggestedNextStep && (
                    <div className="flex items-start gap-2 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-300">
                      <ArrowRightCircle className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                      {content.suggestedNextStep}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* FOOTER ACTIONS */}
            {!isLoading && !error && content && (
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-slate-900/60 px-6 py-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-600"
                >
                  Continue Later
                </button>

                <button
                  type="button"
                  onClick={onCompleteStep}
                  disabled={isCompleting || isAlreadyCompleted}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCompleting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : isAlreadyCompleted ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Step Completed
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Complete Step
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

function SkillRoadmap() {
  const [selectedCareer, setSelectedCareer] =
    useState("fullstack");

  const [selectedLevel, setSelectedLevel] =
    useState("Beginner");

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [isLoadingRoadmap, setIsLoadingRoadmap] =
    useState(true);

  const [genProgress, setGenProgress] =
    useState(0);

  const [roadmapReady, setRoadmapReady] =
    useState(false);

  const [roadmapData, setRoadmapData] =
    useState(null);

  /*
   * IMPORTANT:
   * This state mirrors the progress saved in MongoDB.
   *
   * Example:
   * {
   *   0: 100,
   *   1: 100,
   *   2: 50,
   *   3: 0
   * }
   */
  const [stepProgress, setStepProgress] =
    useState({});

  /*
   * All roadmaps belonging to current user.
   */
  const [savedRoadmaps, setSavedRoadmaps] =
    useState([]);

  /*
   * Currently displayed roadmap ID.
   */
  const [activeRoadmapId, setActiveRoadmapId] =
    useState(null);

  const [openFaq, setOpenFaq] =
    useState(0);

  const [checklist, setChecklist] =
    useState(
      PLACEMENT_CHECKLIST.reduce(
        (acc, item, i) => ({
          ...acc,
          [item.label]: i < 3,
        }),
        {}
      )
    );

  /* ==========================================================
     AI LEARNING PANEL STATE
     Fully separate from roadmap progress state above.
     "Start Learning" only ever touches these.
  ========================================================== */

  const [isLearningPanelOpen, setIsLearningPanelOpen] =
    useState(false);

  const [isLearningLoading, setIsLearningLoading] =
    useState(false);

  const [learningError, setLearningError] =
    useState(null);

  const [learningStep, setLearningStep] =
    useState(null);

  const [learningStepIndex, setLearningStepIndex] =
    useState(null);

  const [learningContent, setLearningContent] =
    useState(null);

  const [isCompletingStep, setIsCompletingStep] =
    useState(false);

  /* ==========================================================
     ACTIVE CAREER
  ========================================================== */

  const activeCareer = useMemo(
    () =>
      CAREERS.find(
        (career) =>
          career.id === selectedCareer
      ) || CAREERS[0],
    [selectedCareer]
  );

  /* ==========================================================
     NORMALIZE ROADMAP STEPS
  ========================================================== */

  const displaySteps = useMemo(() => {
    if (
      !roadmapData?.roadmapSteps?.length
    ) {
      return ROADMAP_STEPS.map(
        (step, index) => ({
          ...step,
          progress:
            Number(
              stepProgress[index] ?? 0
            ),
          status:
            Number(
              stepProgress[index] ?? 0
            ) >= 100
              ? "completed"
              : "pending",
        })
      );
    }

    return roadmapData.roadmapSteps.map(
      (step, index) => {
        const progress = Math.min(
          100,
          Math.max(
            0,
            Number(
              stepProgress[index] ??
                step?.progress ??
                0
            )
          )
        );

        let status = "pending";

        if (progress >= 100) {
          status = "completed";
        } else if (progress > 0) {
          status = "in-progress";
        } else if (index === 0) {
          status = "in-progress";
        }

        return {
          ...step,
          progress,
          status,
        };
      }
    );
  }, [
    roadmapData,
    stepProgress,
  ]);

  /* ==========================================================
     WEEKLY PLAN / PROJECTS
  ========================================================== */

  const displayWeeklyPlan =
    roadmapData?.weeklyPlan?.length
      ? roadmapData.weeklyPlan
      : WEEKLY_PLAN;

  const displayProjects =
    roadmapData?.projects?.length
      ? roadmapData.projects
      : PROJECTS;

  /* ==========================================================
     SKILL ANALYSIS
  ========================================================== */

  const displaySkillAnalysis =
    roadmapData?.skillAnalysis
      ? [
          {
            label: "Current Skills",
            value:
              Number(
                roadmapData.skillAnalysis
                  .currentSkills
              ) || 0,
            icon: Code2,
          },
          {
            label: "Missing Skills",
            value:
              Number(
                roadmapData.skillAnalysis
                  .missingSkills
              ) || 0,
            icon: Target,
          },
          {
            label: "Industry Readiness",
            value:
              Number(
                roadmapData.skillAnalysis
                  .industryReadiness
              ) || 0,
            icon: TrendingUp,
          },
          {
            label: "Interview Readiness",
            value:
              Number(
                roadmapData.skillAnalysis
                  .interviewReadiness
              ) || 0,
            icon: Mic,
          },
        ]
      : SKILL_ANALYSIS;

  const displayConfidenceScore =
    Number(
      roadmapData?.skillAnalysis
        ?.confidenceScore
    ) || 0;

  const displayCareerName =
    roadmapData?.career ||
    activeCareer.name;

  /* ==========================================================
     OVERALL ROADMAP PROGRESS
     
     Overall progress = average progress of all roadmap steps.
     
     Example:
     10 steps:
     100 + 100 + 50 + 0... = 25%
  ========================================================== */

  const overallProgress = useMemo(() => {
    if (!displaySteps.length) {
      return 0;
    }

    const totalProgress =
      displaySteps.reduce(
        (sum, step) =>
          sum +
          Number(step.progress || 0),
        0
      );

    return Math.round(
      totalProgress /
        displaySteps.length
    );
  }, [displaySteps]);

  const completedRoadmapSteps =
    useMemo(() => {
      return displaySteps.filter(
        (step) =>
          Number(step.progress || 0) >=
          100
      ).length;
    }, [displaySteps]);

  /* ==========================================================
     LOAD SAVED ROADMAP
     
     This is the main persistence feature.
     
     New user:
     no roadmap -> 0%
     
     Existing user:
     MongoDB roadmap -> saved step progress
  ========================================================== */

  const loadSavedRoadmap = async () => {
    try {
      setIsLoadingRoadmap(true);

      const response =
        await getMyRoadmaps();

      console.log(
        "MY ROADMAPS RESPONSE:",
        response
      );

      /*
       * Backend can return:
       *
       * { roadmaps: [] }
       * { data: [] }
       * []
       */
      let roadmaps =
        response?.roadmaps ??
        response?.data ??
        response;

      /*
       * Sometimes backend may return:
       *
       * { data: { roadmaps: [] } }
       */
      if (
        !Array.isArray(roadmaps) &&
        Array.isArray(
          response?.data?.roadmaps
        )
      ) {
        roadmaps =
          response.data.roadmaps;
      }

      if (!Array.isArray(roadmaps)) {
        roadmaps = [];
      }

      setSavedRoadmaps(roadmaps);

      /*
       * NEW USER
       */
      if (!roadmaps.length) {
        setRoadmapData(null);
        setActiveRoadmapId(null);
        setStepProgress({});
        setRoadmapReady(false);
        return;
      }

      /*
       * Sort by created date if available.
       * Latest roadmap becomes active.
       */
      const sortedRoadmaps = [
        ...roadmaps,
      ].sort((a, b) => {
        const dateA = new Date(
          a?.createdAt || 0
        ).getTime();

        const dateB = new Date(
          b?.createdAt || 0
        ).getTime();

        return dateA - dateB;
      });

      const latestRoadmap =
        sortedRoadmaps[
          sortedRoadmaps.length - 1
        ];

      if (!latestRoadmap) {
        return;
      }

      /*
       * ROADMAP ID
       */
      const roadmapId =
        latestRoadmap?._id ||
        latestRoadmap?.id ||
        latestRoadmap?.roadmapId ||
        null;

      setActiveRoadmapId(
        roadmapId
      );

      setRoadmapData(
        latestRoadmap
      );

      /*
       * Restore saved progress.
       *
       * Supports:
       * step.progress
       * step.completion
       * step.completed
       */
      const restoredProgress =
        {};

      const steps =
        latestRoadmap?.roadmapSteps ||
        latestRoadmap?.steps ||
        [];

      steps.forEach(
        (step, index) => {
          let progress = Number(
            step?.progress ??
              step?.completion ??
              0
          );

          if (
            step?.completed === true
          ) {
            progress = 100;
          }

          if (
            !Number.isFinite(
              progress
            )
          ) {
            progress = 0;
          }

          progress = Math.min(
            100,
            Math.max(0, progress)
          );

          restoredProgress[
            index
          ] = progress;
        }
      );

      setStepProgress(
        restoredProgress
      );

      setRoadmapReady(true);

      /*
       * Keep career/level selectors
       * synchronized with saved roadmap.
       */
      if (
        latestRoadmap?.career
      ) {
        const savedCareer =
          String(
            latestRoadmap.career
          )
            .trim()
            .toLowerCase();

        const matchingCareer =
          CAREERS.find(
            (career) =>
              career.id ===
              savedCareer ||
              career.name
                .toLowerCase() ===
                savedCareer
          );

        if (matchingCareer) {
          setSelectedCareer(
            matchingCareer.id
          );
        }
      }

      if (
        latestRoadmap?.level
      ) {
        const matchingLevel =
          SKILL_LEVELS.find(
            (level) =>
              level.id.toLowerCase() ===
              String(
                latestRoadmap.level
              )
                .trim()
                .toLowerCase()
          );

        if (matchingLevel) {
          setSelectedLevel(
            matchingLevel.id
          );
        }
      }
    } catch (error) {
      console.error(
        "Failed to load saved roadmap:",
        error
      );

      /*
       * Do not break the page if
       * roadmap loading fails.
       */
    } finally {
      setIsLoadingRoadmap(false);
    }
  };

  /* ==========================================================
     INITIAL LOAD
  ========================================================== */

  useEffect(() => {
    loadSavedRoadmap();
  }, []);

  /* ==========================================================
     GENERATE ROADMAP
     (career + level -> full roadmap. Nothing to do with
     step-level learning content.)
  ========================================================== */

  const handleGenerateRoadmap = async () => {
    let progressInterval = null;

    try {
      setIsGenerating(true);
      setGenProgress(0);

      progressInterval = setInterval(() => {
        setGenProgress((prev) => {
          if (prev >= 90) {
            if (progressInterval) {
              clearInterval(progressInterval);
            }
            return 90;
          }

          return prev + 10;
        });
      }, 150);

      const response = await generateRoadmap(
        selectedCareer,
        selectedLevel
      );

      if (progressInterval) {
        clearInterval(progressInterval);
      }

      console.log("AI ROADMAP RESPONSE:", response);

      if (response?.success && response?.roadmap) {
        const generatedRoadmap = response.roadmap;

        /*
         * Find generated roadmap ID.
         */
        const roadmapId =
          generatedRoadmap?._id ||
          generatedRoadmap?.id ||
          generatedRoadmap?.roadmapId ||
          response?.roadmapId ||
          null;

        /*
         * New roadmap starts from 0.
         */
        const initialProgress = {};

        const generatedSteps =
          generatedRoadmap?.roadmapSteps || [];

        const normalizedSteps = generatedSteps.map((step) => ({
          ...step,
          progress: 0,
          learningUrl:
            step.learningUrl ||
            step.resourceUrl ||
            step.url ||
            "",
        }));

        const normalizedRoadmap = {
          ...generatedRoadmap,
          roadmapSteps: normalizedSteps,
        };

        normalizedSteps.forEach((_, index) => {
          initialProgress[index] = 0;
        });

        setStepProgress(initialProgress);
        setRoadmapData(normalizedRoadmap);
        setActiveRoadmapId(roadmapId);
        setGenProgress(100);
        setRoadmapReady(true);

        /*
         * Update saved roadmaps locally.
         */
        setSavedRoadmaps((prev) => [...prev, generatedRoadmap]);
      } else {
        throw new Error(
          response?.message || "Failed to generate roadmap"
        );
      }
    } catch (error) {
      console.error("Roadmap generation failed:", error);

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to generate roadmap. Please try again."
      );

      setRoadmapReady(false);
    } finally {
      if (progressInterval) {
        clearInterval(progressInterval);
      }

      setIsGenerating(false);
    }
  };

  /* ==========================================================
     START LEARNING
     
     Opens the AI tutor panel for ONE specific roadmap step.
     Does NOT touch progress/completion state in any way.
  ========================================================== */

  const handleStartLearning = async (step, index) => {
    if (!activeRoadmapId) {
      alert("Please generate or load a roadmap first.");
      return;
    }

    setLearningStep(step);
    setLearningStepIndex(index);
    setIsLearningPanelOpen(true);
    setIsLearningLoading(true);
    setLearningError(null);
    setLearningContent(null);

    try {
      const response = await generateStepLearning(
        activeRoadmapId,
        index,
        {
        career: displayCareerName,
        level: selectedLevel,
        step: {
          title: step?.title,
          description: step?.description,
          difficulty: step?.difficulty,
          time: step?.time,
          topics: step?.topics || step?.skills || [],
        },
      });

      console.log("STEP LEARNING RESPONSE:", response);

      const module =
        response?.learningModule ||
        response?.data?.learningModule ||
        response?.data ||
        response;

      if (!module || typeof module !== "object") {
        throw new Error(
          response?.message ||
            "AI did not return a valid learning module."
        );
      }

      setLearningContent(module);
    } catch (error) {
      console.error("Failed to generate step learning:", error);

      setLearningError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load the AI learning module. Please try again."
      );
    } finally {
      setIsLearningLoading(false);
    }
  };

  const handleRetryLearning = () => {
    if (learningStep && learningStepIndex !== null) {
      handleStartLearning(learningStep, learningStepIndex);
    }
  };

  const handleCloseLearningPanel = () => {
    setIsLearningPanelOpen(false);
    setLearningError(null);
    // Keep learningStep/content around briefly for exit animation;
    // reset happens the next time Start Learning is clicked.
  };

  /* ==========================================================
     UPDATE STEP PROGRESS (COMPLETION ONLY)
     
     This saves progress to backend. Only ever triggered
     explicitly by the user via "Complete Step" — never by
     Start Learning.
  ========================================================== */

  const toggleStepProgress = async (index) => {
    if (!activeRoadmapId) {
      console.warn("No active roadmap found.");
      alert("Please generate or load a roadmap first.");
      return false;
    }

    const currentProgress = Number(stepProgress[index] ?? 0);
    const nextProgress = currentProgress >= 100 ? 0 : 100;

    /*
     * Optimistic UI update.
     */
    setStepProgress((prev) => ({
      ...prev,
      [index]: nextProgress,
    }));

    try {
      const response = await updateRoadmapStepProgress(
        activeRoadmapId,
        index,
        nextProgress
      );

      console.log("ROADMAP STEP UPDATED:", response);

      /*
       * Backend may return updated roadmap.
       */
      const updatedRoadmap =
        response?.roadmap ||
        response?.data?.roadmap ||
        (response?.data?.roadmapSteps ? response.data : null);

      if (updatedRoadmap?.roadmapSteps) {
        setRoadmapData(updatedRoadmap);

        const syncedProgress = {};

        updatedRoadmap.roadmapSteps.forEach((step, stepIndex) => {
          let progress = Number(
            step?.progress ?? step?.completion ?? 0
          );

          if (step?.completed === true) {
            progress = 100;
          }

          syncedProgress[stepIndex] = Math.min(
            100,
            Math.max(0, progress)
          );
        });

        setStepProgress(syncedProgress);
      }

      return true;
    } catch (error) {
      console.error("Failed to update roadmap step:", error);

      /*
       * Rollback optimistic update if backend request failed.
       */
      setStepProgress((prev) => ({
        ...prev,
        [index]: currentProgress,
      }));

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save roadmap progress."
      );

      return false;
    }
  };

  /*
   * Explicit "Complete Step" handler used by the learning panel.
   * Only marks complete (does not un-toggle) — separate concern
   * from the inline timeline toggle above.
   */
  const handleCompleteStep = async () => {
    if (learningStepIndex === null) {
      return;
    }

    const alreadyComplete =
      Number(stepProgress[learningStepIndex] ?? 0) >= 100;

    if (alreadyComplete) {
      return;
    }

    setIsCompletingStep(true);

    try {
      if (!activeRoadmapId) {
        alert("Please generate or load a roadmap first.");
        return;
      }

      const response = await updateRoadmapStepProgress(
        activeRoadmapId,
        learningStepIndex,
        100
      );

      console.log("STEP MARKED COMPLETE:", response);

      setStepProgress((prev) => ({
        ...prev,
        [learningStepIndex]: 100,
      }));

      const updatedRoadmap =
        response?.roadmap ||
        response?.data?.roadmap ||
        (response?.data?.roadmapSteps ? response.data : null);

      if (updatedRoadmap?.roadmapSteps) {
        setRoadmapData(updatedRoadmap);
      }
    } catch (error) {
      console.error("Failed to mark step complete:", error);

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to save your progress. Please try again."
      );
    } finally {
      setIsCompletingStep(false);
    }
  };

  /* ==========================================================
     PLACEMENT CHECKLIST
  ========================================================== */

  const toggleChecklist = (
    label
  ) => {
    setChecklist(
      (prev) => ({
        ...prev,
        [label]:
          !prev[label],
      })
    );
  };

  const completedCount =
    Object.values(
      checklist
    ).filter(Boolean).length;

  const isLearningStepCompleted =
    learningStepIndex !== null &&
    Number(stepProgress[learningStepIndex] ?? 0) >= 100;

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 text-slate-100">
      {/* ======================================================
          1. HERO
      ====================================================== */}

      <section className="relative overflow-hidden px-6 pb-24 pt-28 sm:px-10 lg:px-20">
        <GlowBackground />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <SectionBadge>
              AI Skill Roadmap
            </SectionBadge>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your Personalized{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                AI Skill Roadmap
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base text-slate-400 sm:text-lg">
              Pick a career path, tell us
              your level, and let AI generate
              a step-by-step learning journey
              — from your first line of code
              to your first offer letter.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.a
                href="#career"
                whileHover={{
                  scale: 1.04,
                  boxShadow:
                    "0 0 30px rgba(34,211,238,0.35)",
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
              >
                Start Your Roadmap
                <ArrowRight className="h-4 w-4" />
              </motion.a>

              <motion.a
                href="#projects"
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur-md"
              >
                Explore Projects
              </motion.a>
            </div>
          </motion.div>

          <div className="relative flex h-80 items-center justify-center sm:h-96">
            <motion.div
              className="absolute h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {[
              {
                icon: Code2,
                label: "HTML/CSS",
                pos: "left-2 top-4",
                delay: 0,
              },
              {
                icon: Layers,
                label: "React",
                pos: "right-4 top-16",
                delay: 0.4,
              },
              {
                icon: Server,
                label: "Node.js",
                pos: "left-8 bottom-8",
                delay: 0.8,
              },
              {
                icon: Database,
                label: "MongoDB",
                pos: "right-2 bottom-2",
                delay: 1.2,
              },
            ].map(
              (card) => (
                <motion.div
                  key={card.label}
                  className={`absolute ${card.pos} flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 backdrop-blur-xl`}
                  animate={{
                    y: [0, -14, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: card.delay,
                  }}
                  initial={{
                    opacity: 0,
                  }}
                  whileInView={{
                    opacity: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                >
                  <card.icon className="h-4 w-4 text-cyan-400" />

                  <span className="text-xs font-medium text-slate-200">
                    {card.label}
                  </span>
                </motion.div>
              )
            )}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-xl"
            >
              <Rocket className="h-14 w-14 text-cyan-300" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================
          2. CAREER
      ====================================================== */}

      <section
        id="career"
        className="relative px-6 py-24 sm:px-10 lg:px-20"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="Career Path"
            title="Choose Your Career"
            subtitle="Select the path you want your roadmap built around."
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {CAREERS.map(
              (career, i) => {
                const isSelected =
                  selectedCareer ===
                  career.id;

                return (
                  <motion.button
                    key={
                      career.id
                    }
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                      once: true,
                    }}
                    variants={
                      scaleIn
                    }
                    onClick={() =>
                      setSelectedCareer(
                        career.id
                      )
                    }
                    whileHover={{
                      y: -4,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className={`flex flex-col items-center gap-3 rounded-2xl border p-5 text-center backdrop-blur-xl transition ${
                      isSelected
                        ? "border-cyan-400/60 bg-cyan-500/10 shadow-lg shadow-cyan-500/20"
                        : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                        isSelected
                          ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white"
                          : "bg-slate-800/70 text-cyan-400"
                      }`}
                    >
                      <career.icon className="h-6 w-6" />
                    </div>

                    <span
                      className={`text-xs font-medium ${
                        isSelected
                          ? "text-cyan-300"
                          : "text-slate-300"
                      }`}
                    >
                      {career.name}
                    </span>
                  </motion.button>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          3. SKILL LEVEL
      ====================================================== */}

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            badge="Skill Level"
            title="Where are you starting from?"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SKILL_LEVELS.map(
              (level, i) => {
                const isSelected =
                  selectedLevel ===
                  level.id;

                return (
                  <motion.button
                    key={
                      level.id
                    }
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                      once: true,
                    }}
                    variants={
                      fadeUp
                    }
                    onClick={() =>
                      setSelectedLevel(
                        level.id
                      )
                    }
                    whileHover={{
                      y: -4,
                    }}
                    className={`flex flex-col items-start gap-2 rounded-2xl border p-5 text-left backdrop-blur-xl transition ${
                      isSelected
                        ? "border-cyan-400/60 bg-cyan-500/10 shadow-lg shadow-cyan-500/20"
                        : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span
                        className={`text-sm font-semibold ${
                          isSelected
                            ? "text-cyan-300"
                            : "text-white"
                        }`}
                      >
                        {level.id}
                      </span>

                      {isSelected ? (
                        <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                      ) : (
                        <Circle className="h-4 w-4 text-slate-600" />
                      )}
                    </div>

                    <p className="text-xs text-slate-400">
                      {level.desc}
                    </p>
                  </motion.button>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          4. GENERATOR
      ====================================================== */}

      <section className="relative px-6 py-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="rounded-3xl border border-slate-800 bg-slate-900/50 p-10 backdrop-blur-xl"
          >
            <p className="text-sm text-slate-400">
              Generating a roadmap for{" "}
              <span className="font-semibold text-cyan-300">
                {activeCareer.name}
              </span>{" "}
              ·{" "}
              <span className="font-semibold text-cyan-300">
                {selectedLevel}
              </span>
            </p>

            <motion.button
              onClick={
                handleGenerateRoadmap
              }
              disabled={
                isGenerating
              }
              whileHover={{
                scale: isGenerating
                  ? 1
                  : 1.03,
              }}
              whileTap={{
                scale: isGenerating
                  ? 1
                  : 0.97,
              }}
              className="mx-auto mt-6 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 disabled:opacity-70"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  AI is Thinking...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Generate AI Roadmap
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="mt-6 overflow-hidden"
                >
                  <div className="mb-2 flex items-center justify-center gap-1.5 text-xs text-cyan-300">
                    <Brain className="h-3.5 w-3.5" />

                    Analyzing skills and
                    structuring milestones

                    {[0, 1, 2].map(
                      (i) => (
                        <motion.span
                          key={i}
                          className="h-1 w-1 rounded-full bg-cyan-400"
                          animate={{
                            opacity: [
                              0.3,
                              1,
                              0.3,
                            ],
                          }}
                          transition={{
                            duration: 0.9,
                            repeat:
                              Infinity,
                            delay:
                              i * 0.2,
                          }}
                        />
                      )
                    )}
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                      style={{
                        width: `${genProgress}%`,
                      }}
                    />
                  </div>

                  <p className="mt-1 text-right text-[11px] text-slate-500">
                    {genProgress}%
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          5. ROADMAP
      ====================================================== */}

      <AnimatePresence>
        {roadmapReady && (
          <motion.section
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="relative px-6 py-10 sm:px-10 lg:px-20"
          >
            <div className="mx-auto max-w-4xl">
              <SectionHeading
                badge="Your Roadmap"
                title={`${displayCareerName} Roadmap`}
                subtitle="Follow each stage in order — every step builds on the last."
              />

              {/* ==================================================
                  OVERALL PROGRESS
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mb-10 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                      Overall Progress
                    </p>

                    <div className="mt-2 flex items-end gap-3">
                      <span className="text-4xl font-bold text-white">
                        {overallProgress}%
                      </span>

                      <span className="mb-1 text-xs text-slate-500">
                        {completedRoadmapSteps}/
                        {
                          displaySteps.length
                        }{" "}
                        steps completed
                      </span>
                    </div>
                  </div>

                  <div className="w-full sm:max-w-xs">
                    <div className="mb-2 flex justify-between text-[11px] text-slate-500">
                      <span>
                        Learning Progress
                      </span>

                      <span>
                        {overallProgress}%
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-600"
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: `${overallProgress}%`,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ==================================================
                  LOADING SAVED ROADMAP
              ================================================== */}

              {isLoadingRoadmap && (
                <div className="mb-8 flex items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-xs text-slate-400">
                  <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
                  Loading your saved learning progress...
                </div>
              )}

              {/* ==================================================
                  TIMELINE
              ================================================== */}

              <div className="relative">
                <div className="absolute bottom-0 left-6 top-0 w-px bg-slate-800 sm:left-7" />

                <div className="space-y-6">
                  {displaySteps.map(
                    (step, i) => {
                      const style =
                        statusStyles[
                          step.status
                        ] ||
                        statusStyles.pending;

                      const StepIcon =
                        getStepIcon(
                          step,
                          i
                        );

                      const isThisStepLoading =
                        isLearningLoading &&
                        learningStepIndex === i;

                      return (
                        <motion.div
                          key={`${step.title}-${i}`}
                          custom={i}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{
                            once: true,
                          }}
                          variants={
                            fadeUp
                          }
                          className="relative flex gap-4 sm:gap-5"
                        >
                          {/* STEP ICON */}

                          <div
                            className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border sm:h-14 sm:w-14 ${style.border} ${style.bg}`}
                          >
                            <StepIcon
                              className={`h-5 w-5 sm:h-6 sm:w-6 ${style.text}`}
                            />
                          </div>

                          {/* STEP CARD */}

                          <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-xl">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h4 className="text-sm font-semibold text-white sm:text-base">
                                {step.title}
                              </h4>

                              <span
                                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${style.border} ${style.bg} ${style.text}`}
                              >
                                {style.label}
                              </span>
                            </div>

                            <p className="mt-2 text-xs text-slate-400 sm:text-sm">
                              {
                                step.description
                              }
                            </p>

                            <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-500">
                              <span className="flex items-center gap-1">
                                <Target className="h-3 w-3 text-cyan-400" />
                                {step.difficulty ||
                                  "General"}
                              </span>

                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-cyan-400" />
                                {step.time ||
                                  "Flexible"}
                              </span>
                            </div>

                            {/* PROGRESS BAR */}

                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                              <motion.div
                                className={`h-full rounded-full bg-gradient-to-r ${style.bar}`}
                                initial={{
                                  width: 0,
                                }}
                                animate={{
                                  width: `${step.progress}%`,
                                }}
                                transition={{
                                  duration: 0.7,
                                  ease: "easeOut",
                                }}
                              />
                            </div>

                            {/* PROGRESS CONTROLS */}

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                              <span className="text-[11px] text-slate-500">
                                {step.progress}% complete
                              </span>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStartLearning(step, i)
                                  }
                                  disabled={
                                    !activeRoadmapId ||
                                    isThisStepLoading
                                  }
                                  className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-[11px] font-semibold text-cyan-300 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {isThisStepLoading ? (
                                    <>
                                      <Loader2 className="h-3 w-3 animate-spin" />
                                      Loading...
                                    </>
                                  ) : (
                                    "Start Learning"
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => toggleStepProgress(i)}
                                  disabled={!activeRoadmapId}
                                  className={`rounded-xl border px-3 py-1.5 text-[11px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                    step.progress >= 100
                                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                                      : "border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-600"
                                  }`}
                                >
                                  {step.progress >= 100
                                    ? "Completed"
                                    : "Mark Complete"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ======================================================
          AI LEARNING PANEL
      ====================================================== */}

      <LearningPanel
        isOpen={isLearningPanelOpen}
        isLoading={isLearningLoading}
        error={learningError}
        step={learningStep}
        content={learningContent}
        onClose={handleCloseLearningPanel}
        onRetry={handleRetryLearning}
        onCompleteStep={handleCompleteStep}
        isCompleting={isCompletingStep}
        isAlreadyCompleted={isLearningStepCompleted}
      />

      {/* ======================================================
          6. WEEKLY PLAN
      ====================================================== */}

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="Weekly Plan"
            title="Your First Month, Mapped Out"
            subtitle="A structured week-by-week breakdown to keep you consistent."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayWeeklyPlan.map(
              (week, i) => (
                <motion.div
                  key={`${week.week}-${i}`}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                  }}
                  variants={fadeUp}
                  whileHover={{
                    y: -6,
                  }}
                  className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl"
                >
                  <span className="w-fit rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                    {week.week}
                  </span>

                  <div className="mt-4">
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Topics
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {(
                        week.topics ||
                        []
                      ).map(
                        (
                          topic
                        ) => (
                          <span
                            key={
                              topic
                            }
                            className="rounded-full border border-slate-700 bg-slate-800/60 px-2 py-0.5 text-[11px] text-slate-300"
                          >
                            {topic}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Assignment
                    </p>

                    <p className="text-xs text-slate-400">
                      {
                        week.assignment
                      }
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Mini Project
                    </p>

                    <p className="text-xs text-slate-400">
                      {
                        week.miniProject
                      }
                    </p>
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 text-xs text-cyan-300">
                    <Clock className="h-3.5 w-3.5" />
                    {week.hours} hrs /
                    week
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          7. PROJECTS
      ====================================================== */}

      <section
        id="projects"
        className="relative px-6 py-24 sm:px-10 lg:px-20"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="Projects"
            title="Recommended Projects"
            subtitle="Build these to turn your roadmap into a real portfolio."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map(
              (project, i) => (
                <motion.div
                  key={`${project.name}-${i}`}
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
                  className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-white sm:text-base">
                      {
                        project.name
                      }
                    </h3>

                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${
                        project.difficulty ===
                        "Beginner"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : project.difficulty ===
                            "Intermediate"
                          ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                          : "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300"
                      }`}
                    >
                      {
                        project.difficulty
                      }
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(
                      project.skills ||
                      []
                    ).map(
                      (skill) => (
                        <span
                          key={
                            skill
                          }
                          className="rounded-full border border-slate-700 bg-slate-800/60 px-2 py-0.5 text-[11px] text-slate-300"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5 text-cyan-400" />
                      {project.time}
                    </span>

                    <span className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-2.5 py-1 text-[11px] text-slate-300">
                      <FaGithub className="h-3.5 w-3.5" />
                      Open Source
                    </span>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          8. RESOURCES
      ====================================================== */}

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="Resources"
            title="Learning Resources"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map(
              (res, i) => (
                <motion.div
                  key={res.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                  }}
                  variants={fadeUp}
                  whileHover={{
                    y: -6,
                  }}
                  className="group flex flex-col rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl transition"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 text-cyan-400 transition group-hover:from-cyan-500 group-hover:to-blue-600 group-hover:text-white">
                    <res.icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-base font-semibold text-white">
                    {res.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm text-slate-400">
                    {res.desc}
                  </p>

                  <motion.a
                    href={
                      res.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    className="mt-4 flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/60 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-500/50 hover:text-cyan-300"
                  >
                    Open Resource

                    <ExternalLink className="h-3.5 w-3.5" />
                  </motion.a>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          9. SKILL ANALYSIS
      ====================================================== */}

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <GlowBackground />

        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            badge="Skill Analysis"
            title="AI Skill Analysis"
            subtitle="A live snapshot of where you stand right now."
          />

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {displaySkillAnalysis.map(
              (item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                  }}
                  variants={scaleIn}
                  className="flex flex-col items-center rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl"
                >
                  <CircularProgress
                    value={
                      item.value
                    }
                    size={110}
                  />

                  <span className="mt-3 flex items-center gap-1.5 text-center text-xs text-slate-400">
                    <item.icon className="h-3.5 w-3.5 text-cyan-400" />
                    {item.label}
                  </span>
                </motion.div>
              )
            )}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
            className="mx-auto mt-10 flex max-w-md flex-col items-center rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-8 text-center backdrop-blur-xl"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
              Confidence Score
            </p>

            <CircularProgress
              value={
                displayConfidenceScore
              }
              size={140}
              sublabel={
                displayConfidenceScore >=
                70
                  ? "Confident"
                  : displayConfidenceScore >=
                    40
                  ? "Building"
                  : "Getting Started"
              }
            />

            <p className="mt-3 text-xs text-slate-400">
              {roadmapData
                ? "You're on track. Keep following your personalized roadmap to raise your interview readiness."
                : "Generate your roadmap to see your real skill analysis and confidence score."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          10. PLACEMENT READINESS
      ====================================================== */}

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            badge="Placement Readiness"
            title="Are you placement ready?"
            subtitle={`${completedCount} of ${PLACEMENT_CHECKLIST.length} completed — tap to update.`}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PLACEMENT_CHECKLIST.map(
              (item, i) => {
                const done =
                  checklist[
                    item.label
                  ];

                return (
                  <motion.button
                    key={
                      item.label
                    }
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                      once: true,
                    }}
                    variants={
                      fadeUp
                    }
                    onClick={() =>
                      toggleChecklist(
                        item.label
                      )
                    }
                    whileHover={{
                      x: 4,
                    }}
                    className={`flex items-center gap-3 rounded-2xl border p-4 text-left backdrop-blur-xl transition ${
                      done
                        ? "border-emerald-500/30 bg-emerald-500/10"
                        : "border-slate-800 bg-slate-900/50"
                    }`}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        done
                          ? "bg-gradient-to-br from-emerald-400 to-emerald-500 text-white"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                    </div>

                    <span
                      className={`text-sm font-medium ${
                        done
                          ? "text-emerald-300"
                          : "text-slate-300"
                      }`}
                    >
                      {item.label}
                    </span>

                    {done ? (
                      <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-400" />
                    ) : (
                      <Circle className="ml-auto h-4 w-4 text-slate-600" />
                    )}
                  </motion.button>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          11. STATS
      ====================================================== */}

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map(
              (stat, i) => (
                <motion.div
                  key={
                    stat.label
                  }
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                  }}
                  variants={
                    scaleIn
                  }
                  whileHover={{
                    y: -6,
                  }}
                  className="flex flex-col items-center rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-center backdrop-blur-xl"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                    <stat.icon className="h-6 w-6" />
                  </div>

                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                    {stat.value}
                  </span>

                  <span className="mt-1 text-xs text-slate-400">
                    {stat.label}
                  </span>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          12. TESTIMONIALS
      ====================================================== */}

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="Testimonials"
            title="Students who leveled up"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map(
              (t, i) => (
                <motion.div
                  key={t.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                  }}
                  variants={fadeUp}
                  whileHover={{
                    y: -6,
                  }}
                  className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl"
                >
                  <div className="mb-4 flex items-center gap-1 text-amber-400">
                    {Array.from({
                      length: 5,
                    }).map(
                      (_, idx) => (
                        <Star
                          key={
                            idx
                          }
                          className="h-3.5 w-3.5 fill-amber-400"
                        />
                      )
                    )}
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-slate-300">
                    "{t.review}"
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white">
                      {t.name
                        .split(
                          " "
                        )
                        .map(
                          (
                            w
                          ) =>
                            w[0]
                        )
                        .join("")}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        {t.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {t.college} ·{" "}
                        {t.career}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          13. FAQ
      ====================================================== */}

      <section className="relative px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            badge="FAQ"
            title="Frequently asked questions"
          />

          <div className="space-y-4">
            {FAQS.map(
              (item, i) => (
                <motion.div
                  key={item.q}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: true,
                  }}
                  variants={
                    fadeUp
                  }
                >
                  <FAQItem
                    item={item}
                    isOpen={
                      openFaq ===
                      i
                    }
                    onClick={() =>
                      setOpenFaq(
                        openFaq ===
                          i
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

      {/* ======================================================
          14. FINAL CTA
      ====================================================== */}

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
              Start Learning Today
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Your career path is one
              click away. Let AI build
              the exact roadmap you need
              to get placed.
            </p>

            <motion.a
              href="#career"
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
              Generate My Roadmap
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default SkillRoadmap;

