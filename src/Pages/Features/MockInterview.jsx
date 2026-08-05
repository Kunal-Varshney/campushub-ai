import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaYoutube } from "react-icons/fa";
import {
  Sparkles,
  Mic,
  Send,
  SkipForward,
  StopCircle,
  Clock,
  BarChart3,
  Brain,
  Target,
  MessageSquare,
  Award,
  ShieldCheck,
  TrendingUp,
  Star,
  ChevronDown,
  ArrowRight,
  Loader2,
  CheckCircle2,
  User,
  Briefcase,
  Code2,
  Languages,
  ListChecks,
  Zap,
  Users,
  FileCheck2,
  BookOpen,
  GraduationCap,
  RotateCcw,
  Flame,
  Gauge,
  AlertTriangle,
  ThumbsUp,
  Lightbulb,
  BadgeCheck,
  Building2,
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
const JOB_ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "Data Scientist",
  "DevOps Engineer",
  "Software Engineer",
  "UI/UX Designer",
];

const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced"];
const LANGUAGES = ["JavaScript", "Python", "Java", "C++", "TypeScript", "Go"];
const INTERVIEW_TYPES = ["Technical", "HR", "Behavioral", "Aptitude"];

const ANALYZING_MESSAGES = [
  "Analyzing Profile...",
  "Preparing Questions...",
  "Matching Interview Difficulty...",
  "Building Personalized Interview...",
];

const QUESTION_BANK = {
  Technical: [
    { q: "Walk me through the difference between let, const and var, and when you'd use each.", topic: "Core Language" },
    { q: "Explain how you would design a REST API for a simple task management app.", topic: "API Design" },
    { q: "What is the difference between SQL and NoSQL databases, and when would you choose one over the other?", topic: "Database" },
    { q: "Describe the four pillars of Object-Oriented Programming with a real example from your projects.", topic: "OOP" },
    { q: "How does the browser's event loop work with synchronous and asynchronous code?", topic: "Core Language" },
    { q: "You have a slow API endpoint in production. Walk me through how you would debug it.", topic: "Debugging" },
    { q: "Explain the difference between processes and threads, and give an example of when concurrency matters.", topic: "Operating Systems" },
    { q: "How would you secure a login API against common attacks like SQL injection and brute force?", topic: "Security" },
  ],
  HR: [
    { q: "Tell me about yourself.", topic: "Introduction" },
    { q: "What would you say is your biggest strength, and how has it helped you in a real situation?", topic: "Strengths" },
    { q: "What is one weakness you're actively working on?", topic: "Weaknesses" },
    { q: "Describe a time you had to lead a group of people who didn't report to you.", topic: "Leadership" },
    { q: "Why should we hire you over other candidates?", topic: "Motivation" },
    { q: "Where do you see yourself in the next three years?", topic: "Goals" },
  ],
  Behavioral: [
    { q: "Tell me about a time you disagreed with a teammate. How did you resolve it? (Use the STAR method)", topic: "Conflict" },
    { q: "Describe a situation where you failed at something. What did you learn?", topic: "Failure" },
    { q: "Tell me about a time you had to work under a tight deadline.", topic: "Time Management" },
    { q: "Describe a project where you had to collaborate closely with others.", topic: "Teamwork" },
    { q: "Tell me about a time you took initiative without being asked.", topic: "Initiative" },
    { q: "Describe a situation where you had to learn something completely new very quickly.", topic: "Adaptability" },
  ],
  Aptitude: [
    { q: "A train 120m long crosses a pole in 6 seconds. What is its speed in km/hr?", topic: "Quantitative" },
    { q: "If the ratio of boys to girls in a class is 3:2 and there are 30 students, how many girls are there?", topic: "Quantitative" },
    { q: "Complete the series: 2, 6, 12, 20, 30, ?", topic: "Logical Reasoning" },
    { q: "If all Zips are Zaps and some Zaps are Zops, can we conclude all Zips are Zops? Explain your reasoning.", topic: "Logical Reasoning" },
    { q: "A shopkeeper marks up a product by 40% and then gives a 20% discount. What is his net profit percentage?", topic: "Quantitative" },
    { q: "Choose the odd one out and explain why: Apple, Banana, Carrot, Mango.", topic: "Verbal Reasoning" },
  ],
};

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const TOTAL_QUESTIONS = 6;
const QUESTION_TIME = 90;

const IMPROVEMENT_TIPS = [
  "Use the STAR method to structure your answers with clear outcomes.",
  "Slow down and structure your answer before speaking — clarity beats speed.",
  "Back up claims with specific numbers or measurable results where possible.",
  "Tie your answer back to the actual role and company you're interviewing for.",
  "Practice explaining technical concepts in plain language, not just jargon.",
  "Keep answers focused — aim for 60-90 seconds unless asked to go deeper.",
];

const LEARNING_RESOURCES = [
  { icon: FaYoutube, title: "Mock Interview Playlists", desc: "Watch real interview breakdowns for your target role." },
  { icon: BookOpen, title: "System Design Primer", desc: "Strengthen your answers to architecture-style questions." },
  { icon: GraduationCap, title: "STAR Method Guide", desc: "A structured framework for behavioral answers." },
];

const STATS = [
  { value: "25000+", label: "Students Practiced", icon: Users },
  { value: "80000+", label: "Interviews Conducted", icon: MessageSquare },
  { value: "7.8/10", label: "Average Score", icon: BarChart3 },
  { value: "91%", label: "Success Rate", icon: TrendingUp },
];

const TESTIMONIALS = [
  {
    name: "Ananya Rao",
    role: "Frontend Developer",
    review:
      "The AI asked follow-ups exactly like a real panel would. My actual interview felt like round two of practice.",
  },
  {
    name: "Karthik Menon",
    role: "Backend Developer",
    review:
      "The feedback after every answer was brutally honest but genuinely useful. My communication score improved fast.",
  },
  {
    name: "Divya Nair",
    role: "Data Analyst",
    review:
      "I used the HR + behavioral mode before my interviews. The final report told me exactly what to fix.",
  },
];

const FAQS = [
  {
    q: "How does the AI decide question difficulty?",
    a: "The AI starts at a baseline difficulty based on your experience level and adjusts up or down depending on how strong your recent answers have been.",
  },
  {
    q: "Can I retake the interview?",
    a: "Yes. You can generate a new interview anytime with the same or a different role, experience level, or interview type.",
  },
  {
    q: "Is this a real recording or a simulation?",
    a: "This is a text-based simulation. The voice button is available in the interface, but scoring is based on the written answers you submit.",
  },
  {
    q: "What does the final report include?",
    a: "You'll get an overall score, category-wise breakdowns, strong and weak areas, mistakes made, placement probability, and a personalized improvement plan.",
  },
];

/* ============================================================
   SHARED UI PIECES
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
      <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-xl text-slate-400">{subtitle}</p>}
    </motion.div>
  );
}

function CircularProgress({ value = 0, size = 100, strokeWidth = 8, sublabel }) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 10) * circumference;

  const color = value >= 8 ? "#34d399" : value >= 5 ? "#22d3ee" : "#f97316";

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg className="h-full w-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#1e293b" strokeWidth={strokeWidth} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-bold text-white">{value.toFixed(1)}</span>
        {sublabel && <span className="text-[9px] text-slate-500">/10</span>}
      </div>
    </div>
  );
}

function FAQItem({ item, isOpen, onClick }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-md">
      <button onClick={onClick} className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left">
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

function Dropdown({ label, icon: Icon, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
        <Icon className="h-3.5 w-3.5 text-cyan-400" />
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

/* Deterministic pseudo-random score generator so results feel varied but stable per answer */
function scoreFromText(text, seedBoost = 0) {
  const length = text.trim().length;
  let base = 4.5;
  if (length > 40) base += 1.5;
  if (length > 120) base += 1.5;
  if (length > 250) base += 1;
  const variance = ((text.length * 7 + seedBoost * 13) % 20) / 10 - 1; // -1 to +1 range roughly
  const score = Math.min(9.8, Math.max(2.5, base + variance));
  return Math.round(score * 10) / 10;
}

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function MockInterview() {
  const [stage, setStage] = useState("setup"); // setup | analyzing | interview | feedback | report
  const [candidate, setCandidate] = useState({
    name: "",
    jobRole: JOB_ROLES[0],
    experience: EXPERIENCE_LEVELS[0],
    language: LANGUAGES[0],
    interviewType: INTERVIEW_TYPES[0],
  });

  const [analyzingIndex, setAnalyzingIndex] = useState(0);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [difficulty, setDifficulty] = useState("Medium");
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [voiceActive, setVoiceActive] = useState(false);

  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [history, setHistory] = useState([]); // collected feedback per question

  const timerRef = useRef(null);

  const handleCandidateChange = (field, value) => {
    setCandidate((prev) => ({ ...prev, [field]: value }));
  };

  /* ---------------- STAGE: ANALYZING ---------------- */
  const startInterview = () => {
    if (!candidate.name.trim()) return;
    setStage("analyzing");
    setAnalyzingIndex(0);
    setAnalyzingProgress(0);

    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx += 1;
      if (msgIdx < ANALYZING_MESSAGES.length) {
        setAnalyzingIndex(msgIdx);
      } else {
        clearInterval(msgInterval);
      }
    }, 700);

    const progInterval = setInterval(() => {
      setAnalyzingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 100);

    setTimeout(() => {
      clearInterval(msgInterval);
      clearInterval(progInterval);
      const bank = QUESTION_BANK[candidate.interviewType];
      const picked = [...bank].sort(() => 0.5 - Math.random()).slice(0, TOTAL_QUESTIONS);
      setQuestions(picked);
      setCurrentIndex(0);
      setDifficulty(candidate.experience === "Advanced" ? "Hard" : candidate.experience === "Intermediate" ? "Medium" : "Easy");
      setHistory([]);
      setAnswer("");
      setTimeLeft(QUESTION_TIME);
      setStage("interview");
    }, 2900);
  };

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (stage !== "interview") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [stage, currentIndex]);

  const timeFormatted = `${Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`;

  /* ---------------- SUBMIT / SKIP ANSWER ---------------- */
  const evaluateAnswer = (text) => {
    const accuracy = scoreFromText(text, 1);
    const confidence = scoreFromText(text, 2);
    const communication = scoreFromText(text, 3);
    const technical = candidate.interviewType === "Technical" ? scoreFromText(text, 4) : scoreFromText(text, 4) - 0.5;
    const problemSolving = scoreFromText(text, 5);
    const professionalism = scoreFromText(text, 6);
    const overall =
      Math.round(
        ((accuracy + confidence + communication + Math.max(2, technical) + problemSolving + professionalism) / 6) * 10
      ) / 10;

    const strengths = [];
    const weaknesses = [];
    if (communication >= 7) strengths.push("Clear and structured communication");
    else weaknesses.push("Communication could be more structured");
    if (accuracy >= 7) strengths.push("Strong grasp of the core concept");
    else weaknesses.push("Answer could be more accurate and complete");
    if (text.trim().length < 60) weaknesses.push("Answer was too short — add more detail");
    if (technical >= 7) strengths.push("Solid technical depth");

    const tip = IMPROVEMENT_TIPS[Math.floor(Math.random() * IMPROVEMENT_TIPS.length)];

    return {
      question: questions[currentIndex]?.q,
      topic: questions[currentIndex]?.topic,
      difficulty,
      answerText: text,
      accuracy,
      confidence,
      communication,
      technical: Math.max(2, Math.round(technical * 10) / 10),
      problemSolving,
      professionalism,
      overall,
      strengths: strengths.length ? strengths : ["Attempted the question with a relevant approach"],
      weaknesses: weaknesses.length ? weaknesses : ["Minor polish needed on delivery"],
      tip,
      idealAnswer:
        "A strong answer would clearly state your approach, back it with a specific example or reasoning, and end with the outcome or conclusion — kept concise and confident.",
    };
  };

  const handleSubmitAnswer = () => {
    if (!answer.trim()) return;
    const feedback = evaluateAnswer(answer);
    setCurrentFeedback(feedback);
    setHistory((prev) => [...prev, feedback]);

    // Adaptive difficulty
    if (feedback.overall >= 7.5) {
      setDifficulty((prev) => (prev === "Easy" ? "Medium" : "Hard"));
    } else if (feedback.overall < 5) {
      setDifficulty((prev) => (prev === "Hard" ? "Medium" : "Easy"));
    }

    setStage("feedback");
  };

  const handleSkipQuestion = () => {
    const feedback = {
      question: questions[currentIndex]?.q,
      topic: questions[currentIndex]?.topic,
      difficulty,
      answerText: "(Skipped)",
      accuracy: 0,
      confidence: 0,
      communication: 0,
      technical: 0,
      problemSolving: 0,
      professionalism: 0,
      overall: 0,
      strengths: [],
      weaknesses: ["Question was skipped — try to attempt every question, even partially"],
      tip: "Even a partial, structured attempt scores better than a skip.",
      idealAnswer: "Attempt every question, even briefly — interviewers value effort and reasoning over silence.",
    };
    setHistory((prev) => [...prev, feedback]);
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    setAnswer("");
    setTimeLeft(QUESTION_TIME);
    setCurrentFeedback(null);
    if (currentIndex + 1 >= questions.length) {
      setStage("report");
    } else {
      setCurrentIndex((prev) => prev + 1);
      setStage("interview");
    }
  };

  const handleEndInterview = () => {
    setStage("report");
  };

  const handleRestart = () => {
    setStage("setup");
    setQuestions([]);
    setHistory([]);
    setCurrentIndex(0);
    setAnswer("");
    setCurrentFeedback(null);
  };

  /* ---------------- REPORT CALCULATIONS ---------------- */
  const report = useMemo(() => {
    const attempted = history.filter((h) => h.answerText !== "(Skipped)");
    const count = attempted.length || 1;
    const avg = (key) => Math.round((attempted.reduce((sum, h) => sum + h[key], 0) / count) * 10) / 10;

    const overallScore = avg("overall");
    const technicalScore = avg("technical");
    const communicationScore = avg("communication");
    const confidenceScore = avg("confidence");
    const problemSolvingScore = avg("problemSolving");

    const allWeaknesses = [...new Set(history.flatMap((h) => h.weaknesses))];
    const allStrengths = [...new Set(history.flatMap((h) => h.strengths))];
    const skippedCount = history.filter((h) => h.answerText === "(Skipped)").length;

    const placementProbability = Math.min(97, Math.max(20, Math.round(overallScore * 10)));
    const atsCompatibility = Math.min(98, Math.max(30, Math.round((communicationScore + technicalScore) * 5)));

    return {
      overallScore,
      technicalScore,
      communicationScore,
      confidenceScore,
      problemSolvingScore,
      strengths: allStrengths.slice(0, 5),
      weaknesses: allWeaknesses.slice(0, 5),
      skippedCount,
      placementProbability,
      atsCompatibility,
      companyReadiness:
        overallScore >= 8 ? "Product-Based Companies" : overallScore >= 6 ? "Mid-Size & Service Companies" : "Needs More Practice",
    };
  }, [history]);

  /* ============================================================
     RENDER
  ============================================================ */
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950 text-slate-100">
      {/* ================= 1. HERO SECTION ================= */}
      {stage === "setup" && (
        <section className="relative overflow-hidden px-6 pb-16 pt-28 sm:px-10 lg:px-20">
          <GlowBackground />
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <SectionBadge>AI Mock Interview</SectionBadge>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Practice Interviews with{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Real AI Precision
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base text-slate-400 sm:text-lg">
                A live, adaptive mock interview that adjusts difficulty to your answers — with detailed
                feedback after every question and a full performance report at the end.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <motion.a
                  href="#setup-card"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(34,211,238,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
                >
                  Start Interview <ArrowRight className="h-4 w-4" />
                </motion.a>
              </div>
            </motion.div>

            <div className="relative flex h-80 items-center justify-center sm:h-96">
              <motion.div
                className="absolute h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              {[
                { icon: Brain, label: "Adaptive AI", pos: "left-2 top-4", delay: 0 },
                { icon: Target, label: "Live Scoring", pos: "right-4 top-16", delay: 0.4 },
                { icon: MessageSquare, label: "Instant Feedback", pos: "left-8 bottom-8", delay: 0.8 },
                { icon: Award, label: "Full Report", pos: "right-2 bottom-2", delay: 1.2 },
              ].map((card) => (
                <motion.div
                  key={card.label}
                  className={`absolute ${card.pos} flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 backdrop-blur-xl`}
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: card.delay }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <card.icon className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-medium text-slate-200">{card.label}</span>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 flex h-40 w-40 items-center justify-center rounded-full border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-xl"
              >
                <Brain className="h-14 w-14 text-cyan-300" />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ================= 2. CANDIDATE SETUP CARD ================= */}
      {stage === "setup" && (
        <section id="setup-card" className="relative px-6 py-16 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl sm:p-10"
            >
              <div className="mb-8 text-center">
                <SectionBadge>Candidate Setup</SectionBadge>
                <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Set up your interview</h2>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <User className="h-3.5 w-3.5 text-cyan-400" /> Full Name
                  </label>
                  <input
                    value={candidate.name}
                    onChange={(e) => handleCandidateChange("name", e.target.value)}
                    placeholder="Aarav Sharma"
                    className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <Dropdown
                  label="Job Role"
                  icon={Briefcase}
                  value={candidate.jobRole}
                  onChange={(v) => handleCandidateChange("jobRole", v)}
                  options={JOB_ROLES}
                />
                <Dropdown
                  label="Experience Level"
                  icon={Gauge}
                  value={candidate.experience}
                  onChange={(v) => handleCandidateChange("experience", v)}
                  options={EXPERIENCE_LEVELS}
                />
                <Dropdown
                  label="Preferred Language"
                  icon={Languages}
                  value={candidate.language}
                  onChange={(v) => handleCandidateChange("language", v)}
                  options={LANGUAGES}
                />
                <Dropdown
                  label="Interview Type"
                  icon={ListChecks}
                  value={candidate.interviewType}
                  onChange={(v) => handleCandidateChange("interviewType", v)}
                  options={INTERVIEW_TYPES}
                />
              </div>

              <motion.button
                onClick={startInterview}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
              >
                <Zap className="h-4 w-4" /> Start Interview
              </motion.button>
            </motion.div>
          </div>
        </section>
      )}

      {/* ================= 3. AI INTERVIEW STATUS ================= */}
      {stage === "analyzing" && (
        <section className="relative flex min-h-screen items-center justify-center px-6 sm:px-10 lg:px-20">
          <GlowBackground />
          <div className="relative mx-auto w-full max-w-lg text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-cyan-500/50"
            >
              <Brain className="h-8 w-8 text-cyan-300" />
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.p
                key={analyzingIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-lg font-semibold text-white"
              >
                {ANALYZING_MESSAGES[analyzingIndex]}
              </motion.p>
            </AnimatePresence>

            <div className="mx-auto mt-8 h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                style={{ width: `${analyzingProgress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">{analyzingProgress}%</p>
          </div>
        </section>
      )}

      {/* ================= 4. LIVE INTERVIEW INTERFACE ================= */}
      {stage === "interview" && questions.length > 0 && (
        <section className="relative flex min-h-screen items-center px-6 py-24 sm:px-10 lg:px-20">
          <GlowBackground />
          <div className="relative mx-auto w-full max-w-4xl">
            {/* Top status bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 px-5 py-4 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ListChecks className="h-4 w-4 text-cyan-400" />
                Question {currentIndex + 1} of {questions.length}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Flame className="h-4 w-4 text-amber-400" />
                <span
                  className={`rounded-full border px-2.5 py-0.5 font-medium ${
                    difficulty === "Hard"
                      ? "border-rose-500/30 bg-rose-500/10 text-rose-400"
                      : difficulty === "Medium"
                      ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                      : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {difficulty}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                <Clock className="h-4 w-4" /> {timeFormatted}
              </div>
            </div>

            <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>

            {/* Question card */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl"
            >
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium text-cyan-300">
                <Target className="h-3 w-3" /> {questions[currentIndex].topic}
              </span>
              <h3 className="text-lg font-semibold leading-relaxed text-white sm:text-xl">
                {questions[currentIndex].q}
              </h3>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows={7}
                className="mt-6 w-full resize-none rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20"
              />

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <motion.button
                  onClick={handleSubmitAnswer}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
                >
                  <Send className="h-4 w-4" /> Submit Answer
                </motion.button>
                <motion.button
                  onClick={handleSkipQuestion}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/60 px-5 py-3 text-sm font-medium text-slate-300"
                >
                  <SkipForward className="h-4 w-4" /> Skip Question
                </motion.button>
                <motion.button
                  onClick={() => setVoiceActive((v) => !v)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                    voiceActive
                      ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300"
                      : "border-slate-700 bg-slate-800/60 text-slate-300"
                  }`}
                >
                  <Mic className="h-4 w-4" /> {voiceActive ? "Listening..." : "Voice"}
                </motion.button>
                <motion.button
                  onClick={handleEndInterview}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="ml-auto flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400"
                >
                  <StopCircle className="h-4 w-4" /> End Interview
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ================= 5 & 6. AI FEEDBACK + IMPROVEMENT SUGGESTIONS ================= */}
      {stage === "feedback" && currentFeedback && (
        <section className="relative flex min-h-screen items-center px-6 py-24 sm:px-10 lg:px-20">
          <GlowBackground />
          <div className="relative mx-auto w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-medium text-cyan-300">
                  <BadgeCheck className="h-4 w-4" /> AI Feedback
                </span>
                <span className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-[11px] text-slate-400">
                  {currentFeedback.topic}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {[
                  { label: "Accuracy", value: currentFeedback.accuracy },
                  { label: "Confidence", value: currentFeedback.confidence },
                  { label: "Communication", value: currentFeedback.communication },
                  { label: "Technical", value: currentFeedback.technical },
                  { label: "Problem Solving", value: currentFeedback.problemSolving },
                  { label: "Professionalism", value: currentFeedback.professionalism },
                ].map((metric) => (
                  <div key={metric.label} className="flex flex-col items-center gap-2">
                    <CircularProgress value={metric.value} size={78} strokeWidth={6} sublabel />
                    <span className="text-center text-[10px] text-slate-400">{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 text-center">
                <span className="text-xs font-semibold uppercase tracking-wide text-cyan-300">Overall Rating</span>
                <span className="mt-1 text-3xl font-bold text-white">{currentFeedback.overall}/10</span>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <ThumbsUp className="h-3.5 w-3.5" /> Strengths
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentFeedback.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                    <AlertTriangle className="h-3.5 w-3.5" /> Weaknesses
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {currentFeedback.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-400" /> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                  <Lightbulb className="h-3.5 w-3.5" /> Improvement Tip
                </p>
                <p className="text-xs text-slate-400">{currentFeedback.tip}</p>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-cyan-300">
                  <BookOpen className="h-3.5 w-3.5" /> Ideal Answer Approach
                </p>
                <p className="text-xs text-slate-400">{currentFeedback.idealAnswer}</p>
              </div>

              <motion.button
                onClick={goToNextQuestion}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20"
              >
                {currentIndex + 1 >= questions.length ? "View Final Report" : "Next Question"}{" "}
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      )}

      {/* ================= 7. FINAL INTERVIEW REPORT ================= */}
      {stage === "report" && (
        <section className="relative px-6 py-28 sm:px-10 lg:px-20">
          <GlowBackground />
          <div className="relative mx-auto max-w-5xl">
            <SectionHeading
              badge="Interview Report"
              title={`Great work, ${candidate.name || "Candidate"}`}
              subtitle={`${candidate.jobRole} · ${candidate.interviewType} Interview · ${candidate.experience}`}
            />

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-xl">
              <div className="flex flex-col items-center rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-8 text-center">
                <span className="text-xs font-semibold uppercase tracking-wide text-cyan-300">Overall Score</span>
                <span className="mt-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-5xl font-bold text-transparent">
                  {report.overallScore}/10
                </span>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  { label: "Technical Score", value: report.technicalScore },
                  { label: "Communication", value: report.communicationScore },
                  { label: "Confidence", value: report.confidenceScore },
                  { label: "Problem Solving", value: report.problemSolvingScore },
                ].map((metric) => (
                  <div key={metric.label} className="flex flex-col items-center gap-2">
                    <CircularProgress value={metric.value} size={90} sublabel />
                    <span className="text-center text-[11px] text-slate-400">{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-center">
                  <ShieldCheck className="mx-auto h-5 w-5 text-cyan-400" />
                  <p className="mt-2 text-xs text-slate-400">Placement Probability</p>
                  <p className="mt-1 text-lg font-bold text-white">{report.placementProbability}%</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-center">
                  <FileCheck2 className="mx-auto h-5 w-5 text-cyan-400" />
                  <p className="mt-2 text-xs text-slate-400">ATS Compatibility</p>
                  <p className="mt-1 text-lg font-bold text-white">{report.atsCompatibility}%</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-center">
                  <Building2 className="mx-auto h-5 w-5 text-cyan-400" />
                  <p className="mt-2 text-xs text-slate-400">Company Readiness</p>
                  <p className="mt-1 text-sm font-bold text-white">{report.companyReadiness}</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <ThumbsUp className="h-3.5 w-3.5" /> Strong Areas
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {report.strengths.length ? (
                      report.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-400" /> {s}
                        </li>
                      ))
                    ) : (
                      <li className="text-slate-500">Attempt more questions to surface strong areas.</li>
                    )}
                  </ul>
                </div>
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                    <AlertTriangle className="h-3.5 w-3.5" /> Topics to Improve
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {report.weaknesses.length ? (
                      report.weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-400" /> {w}
                        </li>
                      ))
                    ) : (
                      <li className="text-slate-500">No major gaps found — great job.</li>
                    )}
                  </ul>
                </div>
              </div>

              {report.skippedCount > 0 && (
                <div className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 p-4">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                    <AlertTriangle className="h-3.5 w-3.5" /> Mistakes Made
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {report.skippedCount} question{report.skippedCount > 1 ? "s were" : " was"} skipped — this
                    lowers your overall confidence and completeness score.
                  </p>
                </div>
              )}

              <div className="mt-8">
                <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
                  <GraduationCap className="h-4 w-4" /> Recommended Learning Resources
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {LEARNING_RESOURCES.map((res) => (
                    <div key={res.title} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                      <res.icon className="h-4 w-4 text-cyan-400" />
                      <p className="mt-2 text-xs font-semibold text-white">{res.title}</p>
                      <p className="mt-1 text-[11px] text-slate-500">{res.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-cyan-300">
                  <Target className="h-4 w-4" /> Personalized Improvement Plan
                </p>
                <p className="text-xs leading-relaxed text-slate-400">
                  Spend the next two weeks focused on {report.weaknesses[0] ? report.weaknesses[0].toLowerCase() : "structuring your answers"}.
                  Practice 2-3 mock interviews per week in {candidate.interviewType} mode, review the ideal
                  answers for each question, and track whether your overall score crosses 8/10 before your
                  real interview.
                </p>
              </div>

              <motion.button
                onClick={handleRestart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/60 px-6 py-3.5 text-sm font-semibold text-slate-200"
              >
                <RotateCcw className="h-4 w-4" /> Generate Another Interview
              </motion.button>
            </div>
          </div>
        </section>
      )}

      {/* ================= 8. STATISTICS SECTION ================= */}
      {stage === "setup" && (
        <section className="relative px-6 py-24 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleIn}
                  whileHover={{ y: -6 }}
                  className="flex flex-col items-center rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-center backdrop-blur-xl"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-xs text-slate-400">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= 9. TESTIMONIALS ================= */}
      {stage === "setup" && (
        <section className="relative px-6 py-24 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeading badge="Testimonials" title="Students who nailed their interviews" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={t.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="flex flex-col rounded-3xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl"
                >
                  <div className="mb-4 flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="h-3.5 w-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-slate-300">"{t.review}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white">
                      {t.name.split(" ").map((w) => w[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= 10. FAQ SECTION ================= */}
      {stage === "setup" && <FAQSection />}

      {/* ================= 11. FINAL CTA ================= */}
      {stage === "setup" && (
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
                Ready for your dream job?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Practice with an AI interviewer that adapts to you — then walk into the real thing prepared.
              </p>
              <motion.a
                href="#setup-card"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(34,211,238,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30"
              >
                Generate Another Interview <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        </section>
      )}
    </div>
  );
}

/* ============================================================
   FAQ SECTION (separate to keep its own accordion state)
============================================================ */
function FAQSection() {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <section className="relative px-6 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-3xl">
        <SectionHeading badge="FAQ" title="Frequently asked questions" />
        <div className="space-y-4">
          {FAQS.map((item, i) => (
            <motion.div key={item.q} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <FAQItem item={item} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}