import React, { useEffect, useMemo, useState } from "react";
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
  Target,
  TrendingUp,
  Mic,
  Terminal,
  Briefcase,
  FileCheck2,
  MessageSquare,
  X,
  Lightbulb,
  AlertTriangle,
  ListChecks,
  ClipboardList,
  HelpCircle,
  ArrowRightCircle,
  Github,
  Linkedin,
  Users,
} from "lucide-react";

/* ============================================================
   ANIMATION VARIANTS
============================================================ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.06, ease: "easeOut" },
  }),
};

/* ============================================================
   STATIC DATA
============================================================ */

const CAREERS = [
  {
    id: "frontend",
    name: "Frontend Developer",
    description: "Build user interfaces and interactive web experiences.",
    icon: Code2,
  },
  {
    id: "backend",
    name: "Backend Developer",
    description: "Build servers, APIs and the logic that powers applications.",
    icon: Server,
  },
  {
    id: "fullstack",
    name: "Full Stack Developer",
    description: "Work across the entire application, from database to UI.",
    icon: Layers,
  },
  {
    id: "ai",
    name: "AI Engineer",
    description: "Design and build intelligent, AI-powered systems.",
    icon: Brain,
  },
  {
    id: "ml",
    name: "Machine Learning Engineer",
    description: "Build models that learn patterns from data.",
    icon: BarChart3,
  },
  {
    id: "data",
    name: "Data Scientist",
    description: "Turn raw data into insights that drive decisions.",
    icon: Database,
  },
  {
    id: "cyber",
    name: "Cyber Security Specialist",
    description: "Protect systems, networks and data from threats.",
    icon: Shield,
  },
  {
    id: "cloud",
    name: "Cloud Engineer",
    description: "Design and manage scalable cloud infrastructure.",
    icon: Cloud,
  },
  {
    id: "devops",
    name: "DevOps Engineer",
    description: "Automate and streamline software delivery pipelines.",
    icon: GitBranch,
  },
  {
    id: "android",
    name: "Android Developer",
    description: "Build native mobile applications for Android.",
    icon: Smartphone,
  },
  {
    id: "uiux",
    name: "UI/UX Designer",
    description: "Design intuitive, user-centered digital experiences.",
    icon: PenTool,
  },
];

const SKILL_LEVELS = [
  { id: "Beginner", desc: "Starting from scratch, little to no experience." },
  { id: "Intermediate", desc: "Comfortable with basics, ready to build real projects." },
  { id: "Advanced", desc: "Strong fundamentals, targeting job-ready mastery." },
];

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

const getStepIcon = (index) => STEP_ICONS[index % STEP_ICONS.length];

const PLACEMENT_CHECKLIST = [
  { label: "Resume Ready", icon: FileCheck2 },
  { label: "GitHub Portfolio", icon: Github },
  { label: "Projects Completed", icon: Briefcase },
  { label: "LinkedIn Profile", icon: Linkedin },
  { label: "Interview Practice", icon: Mic },
  { label: "DSA / Technical Preparation", icon: Terminal },
  { label: "Communication Skills", icon: MessageSquare },
  { label: "Mock Interview", icon: Users },
];

const FAQS = [
  {
    q: "How does the AI generate my roadmap?",
    a: "It combines your selected career path and current skill level to sequence topics in the order they build on each other, with realistic timeframes for each stage.",
  },
  {
    q: "Can I change my career path later?",
    a: "Yes. You can select a different career or skill level anytime and generate a fresh roadmap tailored to that path.",
  },
  {
    q: 'What happens when I click "Learn This Step"?',
    a: "An AI tutor generates a focused learning module for that exact step — overview, core concepts, examples, practice questions and a hands-on task — so you can actually learn the topic, not just check it off.",
  },
  {
    q: "Does starting a lesson mark the step as complete?",
    a: 'No. Opening a lesson only generates learning content. A step only becomes "completed" when you explicitly click Complete Step inside the learning panel.',
  },
  {
    q: "Is the roadmap free to use?",
    a: "Yes, the AI Skill Roadmap and the AI learning tutor are both free to use as part of CampusHub AI.",
  },
];

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
   HELPERS
============================================================ */

const getRoadmapId = (roadmap) =>
  roadmap?.id || roadmap?._id || roadmap?.roadmapId || null;

/* ============================================================
   SHARED UI
============================================================ */

function GlowBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[130px]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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
        <p className="mx-auto mt-3 max-w-xl text-slate-400">{subtitle}</p>
      )}
    </motion.div>
  );
}

function CircularProgress({ value = 0, size = 120, label, sublabel }) {
  const safeValue = Math.min(100, Math.max(0, Number(value) || 0));
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (safeValue / 100) * circumference;

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="h-full w-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
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
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="roadmapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-white">{safeValue}%</span>
        {sublabel && <span className="text-[10px] text-slate-500">{sublabel}</span>}
      </div>
      {label && <span className="mt-2 text-xs text-slate-400">{label}</span>}
    </div>
  );
}

function FAQItem({ item, isOpen, onClick }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <span className="text-sm font-medium text-white sm:text-base">{item.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
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

/* ============================================================
   AI LEARNING PANEL
============================================================ */

function LearningPanel({
  isOpen,
  isLoading,
  error,
  stepInfo,
  content,
  onClose,
  onRetry,
  onCompleteStep,
  isCompleting,
  isCompleted,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-slate-800 bg-slate-950 shadow-2xl sm:inset-0 sm:top-10 sm:bottom-10 sm:my-auto sm:h-fit sm:rounded-3xl"
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-800 bg-slate-900/60 px-6 py-4">
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-cyan-300">
                  <Brain className="h-3.5 w-3.5" />
                  AI Learning Tutor
                </p>
                <h3 className="mt-0.5 truncate text-base font-semibold text-white sm:text-lg">
                  {stepInfo?.title || "Learning Step"}
                </h3>
                {stepInfo && (
                  <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Target className="h-3 w-3 text-cyan-400" />
                      {stepInfo.difficulty || "General"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-cyan-400" />
                      {stepInfo.time || "Flexible"}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {isLoading && (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
                  <p className="text-sm text-slate-400">
                    AI is preparing your learning module...
                  </p>
                </div>
              )}

              {!isLoading && error && (
                <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                  <AlertTriangle className="h-8 w-8 text-amber-400" />
                  <p className="max-w-sm text-sm text-slate-400">{error}</p>
                  <div className="mt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={onRetry}
                      className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
                    >
                      Retry
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              {!isLoading && !error && content && (
                <div className="space-y-8">
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
                                {concept?.title || `Concept ${i + 1}`}
                              </h4>
                              {concept?.explanation && (
                                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                                  {concept.explanation}
                                </p>
                              )}
                              {concept?.example && (
                                <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-cyan-200">
                                  <code>{concept.example}</code>
                                </pre>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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
                              {ex?.label && (
                                <p className="mb-1 text-xs text-slate-500">{ex.label}</p>
                              )}
                              <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-cyan-200">
                                <code>{typeof ex === "string" ? ex : ex?.code || ""}</code>
                              </pre>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

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
                              <span className="text-cyan-400">{i + 1}.</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

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
                              <span className="text-cyan-400">{i + 1}.</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {Array.isArray(content.keyTakeaways) &&
                    content.keyTakeaways.length > 0 && (
                      <div>
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-300">
                          <CheckCircle2 className="h-3.5 w-3.5" />
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

                  {content.suggestedNextStep && (
                    <div className="flex items-start gap-2 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 text-sm text-slate-300">
                      <ArrowRightCircle className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                      {content.suggestedNextStep}
                    </div>
                  )}
                </div>
              )}
            </div>

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
                  disabled={isCompleting || isCompleted}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCompleting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : isCompleted ? (
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
  const [selectedCareer, setSelectedCareer] = useState("fullstack");
  const [selectedLevel, setSelectedLevel] = useState("Beginner");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoadingRoadmap, setIsLoadingRoadmap] = useState(true);
  const [genProgress, setGenProgress] = useState(0);

  const [roadmapReady, setRoadmapReady] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);
  const [roadmapError, setRoadmapError] = useState(null);

  const [stepProgress, setStepProgress] = useState({});

  const [learningStepIndex, setLearningStepIndex] = useState(null);
  const [learningContent, setLearningContent] = useState(null);
  const [isLearning, setIsLearning] = useState(false);
  const [learningError, setLearningError] = useState(null);
  const [isCompletingStep, setIsCompletingStep] = useState(false);

  const [openFaq, setOpenFaq] = useState(0);

  const [checklist, setChecklist] = useState(
    PLACEMENT_CHECKLIST.reduce(
      (acc, item, i) => ({ ...acc, [item.label]: i < 2 }),
      {}
    )
  );

  /* ==========================================================
     APPLY ROADMAP (shared by load + generate)
  ========================================================== */

  const applyRoadmapData = (roadmap) => {
    if (!roadmap) return;

    const steps = Array.isArray(roadmap.roadmapSteps) ? roadmap.roadmapSteps : [];

    const initialProgress = {};
    steps.forEach((step, index) => {
      const value = Number(step?.progress);
      initialProgress[index] = Number.isFinite(value)
        ? Math.min(100, Math.max(0, value))
        : 0;
    });

    setRoadmapData(roadmap);
    setStepProgress(initialProgress);
    setRoadmapReady(true);

    const careerMatch = CAREERS.find(
      (c) =>
        c.id === roadmap.careerId ||
        c.id === roadmap.career ||
        c.name === roadmap.career
    );
    if (careerMatch) setSelectedCareer(careerMatch.id);

    const levelMatch = SKILL_LEVELS.find((l) => l.id === roadmap.level);
    if (levelMatch) setSelectedLevel(levelMatch.id);
  };

  /* ==========================================================
     LOAD SAVED ROADMAP ON MOUNT
  ========================================================== */

  useEffect(() => {
    let isMounted = true;

    const loadSavedRoadmap = async () => {
      try {
        setIsLoadingRoadmap(true);
        setRoadmapError(null);

        const response = await getMyRoadmaps();

        const roadmaps = Array.isArray(response?.roadmaps)
          ? response.roadmaps
          : Array.isArray(response?.data?.roadmaps)
          ? response.data.roadmaps
          : Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response)
          ? response
          : [];

        if (!isMounted) return;

        if (!roadmaps.length) {
          setRoadmapReady(false);
          setRoadmapData(null);
          setStepProgress({});
          return;
        }

        const latest = [...roadmaps].sort((a, b) => {
          const dateA = new Date(a?.createdAt || 0).getTime();
          const dateB = new Date(b?.createdAt || 0).getTime();
          return dateB - dateA;
        })[0];

        applyRoadmapData(latest);
      } catch (error) {
        console.error("Load Roadmap Error:", error);
        if (isMounted) {
          setRoadmapError(
            error?.response?.data?.message ||
              error?.message ||
              "Failed to load your saved roadmap."
          );
        }
      } finally {
        if (isMounted) setIsLoadingRoadmap(false);
      }
    };

    loadSavedRoadmap();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ==========================================================
     GENERATE ROADMAP
  ========================================================== */

  const handleGenerateRoadmap = async () => {
    if (isGenerating) return;

    let progressTimer = null;

    try {
      setIsGenerating(true);
      setRoadmapError(null);
      setGenProgress(0);

      progressTimer = setInterval(() => {
        setGenProgress((prev) => (prev >= 90 ? 90 : prev + 10));
      }, 150);

      const response = await generateRoadmap(selectedCareer, selectedLevel);

      const roadmap =
        response?.roadmap || response?.data?.roadmap || response?.data || response;

      if (!roadmap || !Array.isArray(roadmap.roadmapSteps)) {
        throw new Error(response?.message || "Failed to generate roadmap.");
      }

      applyRoadmapData(roadmap);
      setGenProgress(100);
    } catch (error) {
      console.error("Generate Roadmap Error:", error);
      setRoadmapError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to generate roadmap. Please try again."
      );
    } finally {
      if (progressTimer) clearInterval(progressTimer);
      setIsGenerating(false);
    }
  };

  /* ==========================================================
     DERIVED DATA
  ========================================================== */

  const activeRoadmapId = useMemo(() => getRoadmapId(roadmapData), [roadmapData]);

  const activeCareer = useMemo(
    () => CAREERS.find((c) => c.id === selectedCareer) || CAREERS[0],
    [selectedCareer]
  );

  const displayCareerName = roadmapData?.career || activeCareer.name;

  const displaySteps = useMemo(() => {
    if (!roadmapData?.roadmapSteps?.length) return [];

    return roadmapData.roadmapSteps.map((step, index) => {
      const progress = Math.min(
        100,
        Math.max(0, Number(stepProgress[index] ?? step?.progress ?? 0))
      );

      const status =
        progress >= 100 ? "completed" : progress > 0 ? "in-progress" : "pending";

      return {
        ...step,
        stepNumber: step?.stepNumber || index + 1,
        progress,
        status,
      };
    });
  }, [roadmapData, stepProgress]);

  const overallProgress = useMemo(() => {
    if (!displaySteps.length) return 0;
    const total = displaySteps.reduce((sum, s) => sum + Number(s.progress || 0), 0);
    return Math.round(total / displaySteps.length);
  }, [displaySteps]);

  const completedStepsCount = useMemo(
    () => displaySteps.filter((s) => s.progress >= 100).length,
    [displaySteps]
  );

  const nextStep = useMemo(() => {
    return (
      displaySteps.find((s) => s.status === "in-progress") ||
      displaySteps.find((s) => s.status === "pending") ||
      null
    );
  }, [displaySteps]);

  const weeklyPlan = Array.isArray(roadmapData?.weeklyPlan) ? roadmapData.weeklyPlan : [];
  const projects = Array.isArray(roadmapData?.projects) ? roadmapData.projects : [];
  const skillAnalysisRaw = roadmapData?.skillAnalysis || null;
  const interviewPrep = roadmapData?.interviewPreparation || null;

  const skillAnalysisItems = useMemo(() => {
    if (!skillAnalysisRaw) return [];
    return [
      { label: "Current Skills", value: Number(skillAnalysisRaw.currentSkills) || 0, icon: Code2 },
      { label: "Missing Skills", value: Number(skillAnalysisRaw.missingSkills) || 0, icon: Target },
      {
        label: "Industry Readiness",
        value: Number(skillAnalysisRaw.industryReadiness) || 0,
        icon: TrendingUp,
      },
      {
        label: "Interview Readiness",
        value: Number(skillAnalysisRaw.interviewReadiness) || 0,
        icon: Mic,
      },
    ];
  }, [skillAnalysisRaw]);

  const confidenceScore = Number(skillAnalysisRaw?.confidenceScore) || 0;

  const learningStepInfo =
    learningStepIndex !== null && displaySteps[learningStepIndex]
      ? displaySteps[learningStepIndex]
      : null;

  const isLearningStepCompleted =
    learningStepIndex !== null &&
    Number(stepProgress[learningStepIndex] ?? 0) >= 100;

  /* ==========================================================
     AI LEARNING TUTOR
  ========================================================== */

  const handleStartLearning = async (index) => {
    if (!activeRoadmapId) {
      setLearningError("Please generate or load a roadmap first.");
      return;
    }

    setLearningStepIndex(index);
    setIsLearning(true);
    setLearningError(null);
    setLearningContent(null);

    try {
      const response = await generateStepLearning(activeRoadmapId, index);

      const module =
        response?.learningModule ||
        response?.data?.learningModule ||
        response?.data ||
        response;

      if (!module || typeof module !== "object") {
        throw new Error(response?.message || "AI did not return a valid learning module.");
      }

      setLearningContent(module);
    } catch (error) {
      console.error("Generate Step Learning Error:", error);
      setLearningError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load the AI learning module. Please try again."
      );
    } finally {
      setIsLearning(false);
    }
  };

  const handleRetryLearning = () => {
    if (learningStepIndex !== null) {
      handleStartLearning(learningStepIndex);
    }
  };

  const handleCloseLearningPanel = () => {
    setLearningStepIndex(null);
    setLearningContent(null);
    setLearningError(null);
    setIsLearning(false);
  };

  const handleCompleteStep = async () => {
    if (learningStepIndex === null || !activeRoadmapId) return;

    const alreadyComplete = Number(stepProgress[learningStepIndex] ?? 0) >= 100;
    if (alreadyComplete) return;

    setIsCompletingStep(true);

    try {
      const response = await updateRoadmapStepProgress(
        activeRoadmapId,
        learningStepIndex,
        100
      );

      const updatedRoadmap =
        response?.roadmap ||
        response?.data?.roadmap ||
        (Array.isArray(response?.data?.roadmapSteps) ? response.data : null);

      setStepProgress((prev) => ({ ...prev, [learningStepIndex]: 100 }));

      if (updatedRoadmap?.roadmapSteps) {
        setRoadmapData((prev) =>
          prev ? { ...prev, roadmapSteps: updatedRoadmap.roadmapSteps } : prev
        );
      }
    } catch (error) {
      console.error("Complete Step Error:", error);
      setLearningError(
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

  const toggleChecklist = (label) => {
    setChecklist((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const completedChecklistCount = Object.values(checklist).filter(Boolean).length;

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 text-slate-100">
      {/* ======================================================
          1. HERO
      ====================================================== */}

      <section className="relative overflow-hidden px-6 pb-20 pt-28 sm:px-10 lg:px-20">
        <GlowBackground />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <SectionBadge>AI Skill Roadmap</SectionBadge>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your Personalized{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                AI Skill Roadmap
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base text-slate-400 sm:text-lg">
              Choose a career path and your current skill level, and CampusHub AI
              builds a structured, step-by-step roadmap — plus an AI tutor for every
              step along the way.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <motion.a
                href="#career"
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(34,211,238,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
              >
                Start Your Roadmap
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>

          <div className="relative flex h-72 items-center justify-center sm:h-96">
            <motion.div
              className="absolute h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-xl"
            >
              <Rocket className="h-14 w-14 text-cyan-300" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ======================================================
          2. CAREER SELECTION
      ====================================================== */}

      <section id="career" className="relative px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="Career Path"
            title="Choose Your Career"
            subtitle="Select the path you want your roadmap built around."
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {CAREERS.map((career, i) => {
              const isSelected = selectedCareer === career.id;
              const Icon = career.icon;

              return (
                <motion.button
                  key={career.id}
                  type="button"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleIn}
                  onClick={() => setSelectedCareer(career.id)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-5 text-center backdrop-blur-xl transition ${
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
                    <Icon className="h-6 w-6" />
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isSelected ? "text-cyan-300" : "text-slate-300"
                    }`}
                  >
                    {career.name}
                  </span>
                  <span className="text-[10px] leading-snug text-slate-500">
                    {career.description}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          3. SKILL LEVEL
      ====================================================== */}

      <section className="relative px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeading badge="Skill Level" title="Where are you starting from?" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SKILL_LEVELS.map((level, i) => {
              const isSelected = selectedLevel === level.id;

              return (
                <motion.button
                  key={level.id}
                  type="button"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  onClick={() => setSelectedLevel(level.id)}
                  whileHover={{ y: -4 }}
                  className={`flex flex-col items-start gap-2 rounded-2xl border p-5 text-left backdrop-blur-xl transition ${
                    isSelected
                      ? "border-cyan-400/60 bg-cyan-500/10 shadow-lg shadow-cyan-500/20"
                      : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`text-sm font-semibold ${
                        isSelected ? "text-cyan-300" : "text-white"
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
                  <p className="text-xs text-slate-400">{level.desc}</p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          4. GENERATE ROADMAP
      ====================================================== */}

      <section className="relative px-6 py-12 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-3xl border border-slate-800 bg-slate-900/50 p-10 backdrop-blur-xl"
          >
            <p className="text-sm text-slate-400">
              {isLoadingRoadmap
                ? "Checking for a saved roadmap..."
                : (
                  <>
                    Generating a roadmap for{" "}
                    <span className="font-semibold text-cyan-300">{activeCareer.name}</span>{" "}
                    · <span className="font-semibold text-cyan-300">{selectedLevel}</span>
                  </>
                )}
            </p>

            <motion.button
              type="button"
              onClick={handleGenerateRoadmap}
              disabled={isGenerating || isLoadingRoadmap}
              whileHover={{ scale: isGenerating ? 1 : 1.03 }}
              whileTap={{ scale: isGenerating ? 1 : 0.97 }}
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
                  {roadmapReady ? "Regenerate Roadmap" : "Generate AI Roadmap"}
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 overflow-hidden"
                >
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                      style={{ width: `${genProgress}%` }}
                    />
                  </div>
                  <p className="mt-1 text-right text-[11px] text-slate-500">{genProgress}%</p>
                </motion.div>
              )}
            </AnimatePresence>

            {roadmapError && (
              <p className="mt-4 text-xs text-amber-400">{roadmapError}</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          5. ROADMAP STEPS + OVERALL PROGRESS
      ====================================================== */}

      <AnimatePresence>
        {roadmapReady && displaySteps.length > 0 && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="relative px-6 py-10 sm:px-10 lg:px-20"
          >
            <div className="mx-auto max-w-4xl">
              <SectionHeading
                badge="Your Roadmap"
                title={`${displayCareerName} Roadmap`}
                subtitle="Follow each stage in order — every step builds on the last."
              />

              {/* 6. OVERALL PROGRESS */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-6 backdrop-blur-xl"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                      Overall Progress
                    </p>
                    <div className="mt-2 flex items-end gap-3">
                      <span className="text-4xl font-bold text-white">{overallProgress}%</span>
                      <span className="mb-1 text-xs text-slate-500">
                        {completedStepsCount}/{displaySteps.length} steps completed
                      </span>
                    </div>
                    {nextStep && (
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                        <ArrowRightCircle className="h-3.5 w-3.5 text-cyan-400" />
                        Next up: {nextStep.title}
                      </p>
                    )}
                  </div>

                  <div className="w-full sm:max-w-xs">
                    <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${overallProgress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* TIMELINE */}
              <div className="relative">
                <div className="absolute bottom-0 left-6 top-0 w-px bg-slate-800 sm:left-7" />

                <div className="space-y-6">
                  {displaySteps.map((step, i) => {
                    const style = statusStyles[step.status] || statusStyles.pending;
                    const StepIcon = getStepIcon(i);
                    const isThisStepLoading = isLearning && learningStepIndex === i;

                    return (
                      <motion.div
                        key={`${step.title}-${i}`}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="relative flex gap-4 sm:gap-5"
                      >
                        <div
                          className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border sm:h-14 sm:w-14 ${style.border} ${style.bg}`}
                        >
                          <StepIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${style.text}`} />
                        </div>

                        <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-xl">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="text-sm font-semibold text-white sm:text-base">
                              {step.stepNumber}. {step.title}
                            </h4>
                            <span
                              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${style.border} ${style.bg} ${style.text}`}
                            >
                              {style.label}
                            </span>
                          </div>

                          <p className="mt-2 text-xs text-slate-400 sm:text-sm">
                            {step.description}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <Target className="h-3 w-3 text-cyan-400" />
                              {step.difficulty || "General"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-cyan-400" />
                              {step.time || "Flexible"}
                            </span>
                          </div>

                          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${style.bar}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${step.progress}%` }}
                              transition={{ duration: 0.7, ease: "easeOut" }}
                            />
                          </div>

                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                            <span className="text-[11px] text-slate-500">
                              {step.progress}% complete
                            </span>

                            <button
                              type="button"
                              onClick={() => handleStartLearning(i)}
                              disabled={!activeRoadmapId || isThisStepLoading}
                              className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-[11px] font-semibold text-cyan-300 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isThisStepLoading ? (
                                <>
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                  Loading...
                                </>
                              ) : step.progress >= 100 ? (
                                "Review Step"
                              ) : (
                                "Learn This Step"
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* AI LEARNING PANEL */}
      <LearningPanel
        isOpen={learningStepIndex !== null}
        isLoading={isLearning}
        error={learningError}
        stepInfo={learningStepInfo}
        content={learningContent}
        onClose={handleCloseLearningPanel}
        onRetry={handleRetryLearning}
        onCompleteStep={handleCompleteStep}
        isCompleting={isCompletingStep}
        isCompleted={isLearningStepCompleted}
      />

      {/* ======================================================
          7. WEEKLY PLAN
      ====================================================== */}

      {roadmapReady && weeklyPlan.length > 0 && (
        <section className="relative px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              badge="Weekly Plan"
              title="Your Learning Plan, Mapped Out"
              subtitle="A structured week-by-week breakdown to keep you consistent."
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {weeklyPlan.map((week, i) => (
                <motion.div
                  key={`${week.week}-${i}`}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
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
                      {(Array.isArray(week.topics) ? week.topics : []).map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full border border-slate-700 bg-slate-800/60 px-2 py-0.5 text-[11px] text-slate-300"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Assignment
                    </p>
                    <p className="text-xs text-slate-400">{week.assignment}</p>
                  </div>

                  <div className="mt-4">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Mini Project
                    </p>
                    <p className="text-xs text-slate-400">{week.miniProject}</p>
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 text-xs text-cyan-300">
                    <Clock className="h-3.5 w-3.5" />
                    {week.hours} hrs / week
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          8. PROJECTS
      ====================================================== */}

      {roadmapReady && projects.length > 0 && (
        <section className="relative px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              badge="Projects"
              title="Recommended Projects"
              subtitle="Build these to turn your roadmap into a real portfolio."
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <motion.div
                  key={`${project.name}-${i}`}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-semibold text-white sm:text-base">
                      {project.name}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${
                        project.difficulty === "Beginner"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : project.difficulty === "Intermediate"
                          ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                          : "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300"
                      }`}
                    >
                      {project.difficulty}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(Array.isArray(project.skills) ? project.skills : []).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-slate-700 bg-slate-800/60 px-2 py-0.5 text-[11px] text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="h-3.5 w-3.5 text-cyan-400" />
                    {project.time}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          9 & 10. SKILL ANALYSIS + CONFIDENCE SCORE
      ====================================================== */}

      {roadmapReady && skillAnalysisRaw && (
        <section className="relative px-6 py-20 sm:px-10 lg:px-20">
          <GlowBackground />

          <div className="relative mx-auto max-w-7xl">
            <SectionHeading
              badge="Skill Analysis"
              title="AI Skill Analysis"
              subtitle="A snapshot of where you stand right now."
            />

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {skillAnalysisItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleIn}
                  className="flex flex-col items-center rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl"
                >
                  <CircularProgress value={item.value} size={110} />
                  <span className="mt-3 flex items-center gap-1.5 text-center text-xs text-slate-400">
                    <item.icon className="h-3.5 w-3.5 text-cyan-400" />
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mx-auto mt-10 flex max-w-md flex-col items-center rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-8 text-center backdrop-blur-xl"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-300">
                Confidence Score
              </p>
              <CircularProgress
                value={confidenceScore}
                size={140}
                sublabel={
                  confidenceScore >= 70
                    ? "Confident"
                    : confidenceScore >= 40
                    ? "Building"
                    : "Getting Started"
                }
              />
              <p className="mt-3 text-xs text-slate-400">
                Keep following your roadmap to raise your interview readiness.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* ======================================================
          11. PLACEMENT READINESS
      ====================================================== */}

      <section className="relative px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            badge="Placement Readiness"
            title="Are you placement ready?"
            subtitle={`${completedChecklistCount} of ${PLACEMENT_CHECKLIST.length} completed — tap to update.`}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PLACEMENT_CHECKLIST.map((item, i) => {
              const done = checklist[item.label];
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.label}
                  type="button"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  onClick={() => toggleChecklist(item.label)}
                  whileHover={{ x: 4 }}
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
                    <Icon className="h-4 w-4" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      done ? "text-emerald-300" : "text-slate-300"
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
            })}
          </div>
        </div>
      </section>

      {/* ======================================================
          12. INTERVIEW PREPARATION
      ====================================================== */}

      {roadmapReady && interviewPrep && (
        <section className="relative px-6 py-20 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              badge="Interview Prep"
              title="Interview Preparation"
              subtitle={`Focused on ${interviewPrep.focus || displayCareerName}.`}
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-center backdrop-blur-xl"
              >
                <Mic className="mx-auto h-6 w-6 text-cyan-400" />
                <p className="mt-3 text-2xl font-bold text-white">
                  {interviewPrep.mockInterviews ?? 0}
                </p>
                <p className="mt-1 text-xs text-slate-400">Mock Interviews</p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={1}
                className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-center backdrop-blur-xl"
              >
                <Terminal className="mx-auto h-6 w-6 text-cyan-400" />
                <p className="mt-3 text-2xl font-bold text-white">
                  {interviewPrep.codingChallenges ?? 0}
                </p>
                <p className="mt-1 text-xs text-slate-400">Coding Challenges</p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={2}
                className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-center backdrop-blur-xl"
              >
                <Briefcase className="mx-auto h-6 w-6 text-cyan-400" />
                <p className="mt-3 text-2xl font-bold text-white">
                  {interviewPrep.portfolioReview ? "Included" : "Not Included"}
                </p>
                <p className="mt-1 text-xs text-slate-400">Portfolio Review</p>
              </motion.div>
            </div>

            {Array.isArray(interviewPrep.topics) && interviewPrep.topics.length > 0 && (
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {interviewPrep.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ======================================================
          13. FAQ
      ====================================================== */}

      <section className="relative px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading badge="FAQ" title="Frequently asked questions" />

          <div className="space-y-4">
            {FAQS.map((item, i) => (
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
    </div>
  );
}

export default SkillRoadmap;