import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { saveLastVisited } from "../../utils/lastVisited";
import { useEffect, useState } from "react";

import {
  Sparkles,
  ArrowRight,
  UploadCloud,
  FileText,
  Wand2,
  BookOpen,
  Layers,
  GraduationCap,
  Zap,
  Brain,
  ListChecks,
  CheckCircle2,
  MessageSquare,
  Target,
  TrendingUp,
  RefreshCw,
  Lightbulb,
  Code2,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

// ============================================================
// FEATURES
// ============================================================

const features = [
  {
    icon: Wand2,
    title: "AI Notes Generation",
    description:
      "Turn any topic or study requirement into complete, structured notes.",
  },
  {
    icon: Target,
    title: "Topic Focused Notes",
    description:
      "AI understands exactly what you ask and focuses the notes around your requirement.",
  },
  {
    icon: Layers,
    title: "Smart Structure",
    description:
      "Definitions, concepts, types, examples, comparisons and other sections are added when relevant.",
  },
  {
    icon: BookOpen,
    title: "Multiple Subjects",
    description:
      "Generate notes for computer science, mathematics, science and almost any academic topic.",
  },
  {
    icon: Zap,
    title: "Quick Revision",
    description:
      "Get important points and exam-focused information whenever relevant.",
  },
  {
    icon: GraduationCap,
    title: "Personalized Learning",
    description:
      "Notes can be generated according to beginner, intermediate or advanced learning levels.",
  },
];

// ============================================================
// HOW IT WORKS
// ============================================================

const steps = [
  {
    number: "01",
    icon: UploadCloud,
    title: "Enter Your Topic",
    description:
      "Enter a topic, question, concept or complete study requirement.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Understands",
    description:
      "CampusHub AI understands what kind of notes the student actually needs.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Notes Generated",
    description:
      "Complete and structured notes are generated according to the topic.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Learn & Revise",
    description:
      "Use the generated notes for learning, revision and exam preparation.",
  },
];

// ============================================================
// BENEFITS
// ============================================================

const benefits = [
  "Generate complete notes from a short topic or question",
  "No unnecessary fixed sections",
  "Definitions, concepts, types and examples when relevant",
  "Important points and exam information when useful",
];

// ============================================================
// SMART NOTES
// ============================================================

function SmartNotes() {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState("");
  const [subject, setSubject] = useState("Computer Science");
  const [difficulty, setDifficulty] = useState("Intermediate");

  const [isLoading, setIsLoading] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  // ============================================================
  // FETCH PREVIOUS NOTES
  // ============================================================

  const fetchNotes = async () => {
    try {
      const response = await API.get("/notes");

      console.log("SAVED NOTES:", response.data);

      if (response.data?.success) {
        setSavedNotes(response.data.notes || []);
      }
    } catch (error) {
      console.log(
        "FETCH NOTES ERROR:",
        error?.response?.data || error.message
      );
    }
  };

  // ============================================================
  // AUTH + LAST VISITED
  // ============================================================

  useEffect(() => {
    saveLastVisited("/smart-notes");

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchNotes();
  }, [navigate]);

  // ============================================================
  // GENERATE NOTES
  // ============================================================

  const handleGenerate = async () => {
    if (!inputText.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setGeneratedNotes(null);

      const response = await API.post("/notes/generate", {
        description: inputText.trim(),
        subject,
        difficulty,
        branch: "AI & ML",
        year: 2,
      });

      console.log("NOTE RESPONSE:", response.data);

      if (!response.data?.success || !response.data?.note) {
        throw new Error(
          response.data?.message || "Unable to generate notes"
        );
      }

      const note = response.data.note;

      // ========================================================
      // IMPORTANT
      // Backend structure:
      //
      // note.answer.introduction
      // note.answer.sections[]
      //
      // ========================================================

      const answer = note.answer || {};

      const sections = Array.isArray(answer.sections)
        ? answer.sections
        : [];

      const keyPoints = Array.isArray(note.points)
        ? note.points
        : [];

      const keywords = Array.isArray(note.keywords)
        ? note.keywords
        : [];

      const examTips = Array.isArray(note.examTips)
        ? note.examTips
        : [];

      setGeneratedNotes({
        title: note.title || "Generated Notes",

        subject: note.subject || subject,

        difficulty,

        introduction: answer.introduction || "",

        sections,

        keyPoints,

        keywords,

        examTips,
      });

      // Refresh saved notes
      fetchNotes();

    } catch (error) {
      console.log(
        "NOTE ERROR:",
        error?.response?.data || error.message
      );

      alert(
        error?.response?.data?.message ||
          error.message ||
          "Note generation failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ============================================================
  // RENDER SECTION
  // ============================================================

  const renderSection = (section, index) => {
    if (!section) return null;

    const heading =
      section.heading ||
      `Topic ${index + 1}`;

    const content =
      section.content || "";

    const points = Array.isArray(section.points)
      ? section.points
      : [];

    const examples = Array.isArray(section.examples)
      ? section.examples
      : [];

    return (
      <motion.div
        key={index}
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
          delay: index * 0.05,
        }}
        className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70"
      >
        {/* SECTION HEADER */}

        <div className="border-b border-slate-800 bg-slate-800/50 px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 text-sm font-bold text-blue-400">
              {index + 1}
            </div>

            <h3 className="text-lg font-bold text-white">
              {heading}
            </h3>
          </div>
        </div>

        {/* SECTION BODY */}

        <div className="space-y-6 p-5">

          {/* CONTENT */}

          {content && (
            <div>
              <p className="whitespace-pre-line text-[15px] leading-8 text-gray-300">
                {content}
              </p>
            </div>
          )}

          {/* POINTS */}

          {points.length > 0 && (
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue-400">
                <ListChecks size={17} />
                Important Points
              </h4>

              <div className="space-y-3">
                {points.map((point, pointIndex) => (
                  <div
                    key={pointIndex}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-1 shrink-0 text-blue-400"
                    />

                    <p className="leading-7 text-gray-300">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXAMPLES */}

          {examples.length > 0 && (
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-cyan-400">
                <Code2 size={17} />
                Examples
              </h4>

              <div className="space-y-3">
                {examples.map((example, exampleIndex) => (
                  <div
                    key={exampleIndex}
                    className="rounded-xl border border-cyan-500/20 bg-slate-950 p-4"
                  >
                    <p className="whitespace-pre-line text-sm leading-7 text-gray-300">
                      {example}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </motion.div>
    );
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 text-white">

      {/* ====================================================== */}
      {/* BACKGROUND GRID */}
      {/* ====================================================== */}

      <div className="pointer-events-none fixed inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section className="relative overflow-hidden px-6 pb-20 pt-28 sm:pt-32">

        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-600/20 blur-[110px]" />

        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-[110px]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">

          {/* HERO TEXT */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="w-full max-w-xl text-center lg:text-left"
          >

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
              <Sparkles size={16} />
              AI Smart Notes
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Turn Any Topic Into{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Complete Notes
              </span>
            </h1>

            <p className="mt-6 text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
              Give CampusHub AI a topic, question or study requirement
              and get complete, structured notes designed for learning
              and revision.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">

              <a
                href="#generator"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95"
              >
                Generate Notes

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#generator"
                className="group flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/70 px-7 py-3.5 font-semibold transition-all duration-300 hover:border-blue-500 hover:bg-slate-800"
              >
                <UploadCloud
                  size={20}
                  className="text-blue-400"
                />

                Start Learning
              </a>

            </div>

          </motion.div>

          {/* HERO PREVIEW */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="flex w-full max-w-md justify-center lg:ml-auto"
          >

            <div className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-blue-900/20 backdrop-blur-xl sm:p-8">

              <div className="mb-6 flex items-center gap-4 rounded-2xl bg-slate-800/80 p-5">

                <div className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-3">
                  <FileText size={24} />
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Computer Science
                  </p>

                  <h3 className="text-lg font-semibold">
                    Types of Arrays
                  </h3>
                </div>

              </div>

              <div className="space-y-5">

                <div>
                  <p className="text-sm font-semibold text-blue-400">
                    Definition
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-300">
                    An array is a collection of elements of the same
                    data type stored in contiguous memory locations.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-blue-400">
                    1. One-Dimensional Array
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-300">
                    Stores elements in a single sequence and uses
                    one index to access each element.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-blue-400">
                    2. Two-Dimensional Array
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-300">
                    Stores data using rows and columns and is commonly
                    used to represent matrices.
                  </p>
                </div>

              </div>

              <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-600/10 p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">
                  Quick Revision
                </p>

                <p className="mt-2 text-sm leading-6 text-gray-300">
                  Array → 1D → 2D → Multidimensional
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* GENERATOR */}
      {/* ====================================================== */}

      <section
        id="generator"
        className="relative px-6 py-20"
      >

        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]" />

        <div className="relative mx-auto max-w-4xl">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-12 text-center"
          >

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
              <MessageSquare size={16} />
              AI Notes Generator
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Create Complete{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Study Notes
              </span>
            </h2>

            <p className="mt-4 text-base text-gray-400 sm:text-lg">
              Enter even a short topic. CampusHub AI will expand it
              into useful and structured notes.
            </p>

          </motion.div>

          {/* INPUT CARD */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
            }}
            className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-blue-900/10 backdrop-blur-xl sm:p-8"
          >

            <textarea
              value={inputText}
              onChange={(e) =>
                setInputText(e.target.value)
              }
              rows={7}
              placeholder={`Example:

Types of Array

OR

Operating System

OR

OOP in Java

OR

DBMS Normalization

OR

Binary Search with example`}
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-7 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
            />

            {/* OPTIONS */}

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* SUBJECT */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Select Subject
                </label>

                <select
                  value={subject}
                  onChange={(e) =>
                    setSubject(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-blue-500"
                >
                  <option>Computer Science</option>
                  <option>Mathematics</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>Other</option>
                </select>

              </div>

              {/* DIFFICULTY */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Learning Level
                </label>

                <select
                  value={difficulty}
                  onChange={(e) =>
                    setDifficulty(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-blue-500"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>

              </div>

            </div>

            {/* GENERATE */}

            <button
              type="button"
              onClick={handleGenerate}
              disabled={
                !inputText.trim() ||
                isLoading
              }
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            >

              {isLoading ? (
                <>
                  <RefreshCw
                    size={18}
                    className="animate-spin"
                  />

                  AI is creating your notes...
                </>
              ) : (
                <>
                  Generate Notes

                  <Wand2
                    size={18}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </>
              )}

            </button>

            {/* ================================================== */}
            {/* GENERATED NOTES */}
            {/* ================================================== */}

            <AnimatePresence>

              {generatedNotes && !isLoading && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -16,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="mt-10"
                >

                  {/* NOTES HEADER */}

                  <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

                    <div className="bg-gradient-to-r from-blue-600/20 to-cyan-500/10 p-6">

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
                          <FileText size={23} />
                        </div>

                        <div className="flex-1">

                          <p className="text-sm font-medium text-blue-400">
                            {generatedNotes.subject}
                          </p>

                          <h2 className="mt-1 text-2xl font-extrabold text-white">
                            {generatedNotes.title}
                          </h2>

                          <p className="mt-2 text-sm text-gray-400">
                            AI Generated Study Notes
                          </p>

                        </div>

                        <span className="w-fit rounded-full border border-blue-500/30 bg-blue-600/10 px-3 py-1.5 text-xs font-medium text-blue-400">
                          {generatedNotes.difficulty}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* ================================================== */}
                  {/* INTRODUCTION / DEFINITION */}
                  {/* ================================================== */}

                  {generatedNotes.introduction && (

                    <div className="mt-6 rounded-2xl border border-blue-500/30 bg-blue-600/10 p-6">

                      <div className="mb-3 flex items-center gap-2">

                        <BookOpen
                          size={19}
                          className="text-blue-400"
                        />

                        <h3 className="text-lg font-bold text-blue-400">
                          Definition / Introduction
                        </h3>

                      </div>

                      <p className="whitespace-pre-line text-[15px] leading-8 text-gray-300">
                        {generatedNotes.introduction}
                      </p>

                    </div>

                  )}

                  {/* ================================================== */}
                  {/* MAIN NOTES SECTIONS */}
                  {/* ================================================== */}

                  {generatedNotes.sections.length > 0 && (

                    <div className="mt-7 space-y-5">

                      {generatedNotes.sections.map(
                        renderSection
                      )}

                    </div>

                  )}

                  {/* ================================================== */}
                  {/* IMPORTANT POINTS */}
                  {/* ================================================== */}

                  {generatedNotes.keyPoints.length > 0 && (

                    <div className="mt-7 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

                      <div className="mb-5 flex items-center gap-2">

                        <ListChecks
                          size={20}
                          className="text-blue-400"
                        />

                        <h3 className="text-lg font-bold">
                          Important Points
                        </h3>

                      </div>

                      <div className="space-y-3">

                        {generatedNotes.keyPoints.map(
                          (point, index) => (

                            <div
                              key={index}
                              className="flex items-start gap-3"
                            >

                              <CheckCircle2
                                size={18}
                                className="mt-1 shrink-0 text-blue-400"
                              />

                              <p className="leading-7 text-gray-300">
                                {point}
                              </p>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  )}

                  {/* ================================================== */}
                  {/* KEYWORDS */}
                  {/* ================================================== */}

                  {generatedNotes.keywords.length > 0 && (

                    <div className="mt-7 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">

                      <div className="mb-4 flex items-center gap-2">

                        <Layers
                          size={19}
                          className="text-cyan-400"
                        />

                        <h3 className="text-lg font-bold">
                          Important Terms
                        </h3>

                      </div>

                      <div className="flex flex-wrap gap-2">

                        {generatedNotes.keywords.map(
                          (keyword, index) => (

                            <span
                              key={index}
                              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-gray-300"
                            >
                              {keyword}
                            </span>

                          )
                        )}

                      </div>

                    </div>

                  )}

                  {/* ================================================== */}
                  {/* EXAM TIPS */}
                  {/* ================================================== */}

                  {generatedNotes.examTips.length > 0 && (

                    <div className="mt-7 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-6">

                      <div className="mb-5 flex items-center gap-2">

                        <Lightbulb
                          size={20}
                          className="text-yellow-400"
                        />

                        <h3 className="text-lg font-bold text-yellow-400">
                          Exam-Oriented Points
                        </h3>

                      </div>

                      <div className="space-y-3">

                        {generatedNotes.examTips.map(
                          (tip, index) => (

                            <div
                              key={index}
                              className="flex items-start gap-3"
                            >

                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />

                              <p className="leading-7 text-gray-300">
                                {tip}
                              </p>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  )}

                  {/* ================================================== */}
                  {/* QUICK REVISION */}
                  {/* ================================================== */}

                  {(generatedNotes.keyPoints.length > 0 ||
                    generatedNotes.sections.length > 0) && (

                    <div className="mt-7 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-6">

                      <div className="mb-4 flex items-center gap-2">

                        <Zap
                          size={19}
                          className="text-cyan-400"
                        />

                        <h3 className="text-lg font-bold text-cyan-400">
                          Quick Revision
                        </h3>

                      </div>

                      <div className="space-y-2 text-sm leading-7 text-gray-300">

                        {generatedNotes.keyPoints.length > 0 ? (

                          generatedNotes.keyPoints
                            .slice(0, 5)
                            .map((point, index) => (
                              <p key={index}>
                                • {point}
                              </p>
                            ))

                        ) : (

                          generatedNotes.sections
                            .slice(0, 5)
                            .map((section, index) => (
                              <p key={index}>
                                • {section.heading}
                              </p>
                            ))

                        )}

                      </div>

                    </div>

                  )}

                </motion.div>

              )}

            </AnimatePresence>

          </motion.div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* FEATURES */}
      {/* ====================================================== */}

      <section className="relative px-6 py-20">

        <div className="relative mx-auto max-w-7xl">

          <div className="mx-auto mb-16 max-w-2xl text-center">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400">
              <Sparkles size={16} />
              Why It Works
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Notes that understand{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                your topic
              </span>
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

            {features.map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 28,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50"
                >

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg">
                    <Icon size={26} />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-base leading-relaxed text-gray-400">
                    {item.description}
                  </p>

                </motion.div>

              );
            })}

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* HOW IT WORKS */}
      {/* ====================================================== */}

      <section className="relative px-6 py-20">

        <div className="relative mx-auto max-w-7xl">

          <div className="mx-auto mb-16 max-w-2xl text-center">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400">
              <ListChecks size={16} />
              How It Works
            </div>

            <h2 className="text-3xl font-extrabold sm:text-4xl">
              From topic to{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                complete notes
              </span>
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {steps.map((step, index) => {

              const Icon = step.icon;

              return (

                <motion.div
                  key={step.title}
                  initial={{
                    opacity: 0,
                    y: 28,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="relative rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl"
                >

                  <span className="absolute right-6 top-6 text-3xl font-bold text-slate-800">
                    {step.number}
                  </span>

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
                    <Icon size={22} />
                  </div>

                  <h3 className="mb-2 text-lg font-semibold">
                    {step.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-gray-400">
                    {step.description}
                  </p>

                </motion.div>

              );
            })}

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* BENEFITS */}
      {/* ====================================================== */}

      <section className="relative px-6 py-20">

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400">
              <Target size={16} />
              Why Students Choose It
            </div>

            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Study Smarter{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                With AI
              </span>
            </h2>

            <p className="mt-6 text-base leading-7 text-gray-400 sm:text-lg">
              Start with a short topic and let CampusHub AI turn
              it into complete study notes.
            </p>

          </div>

          <div className="space-y-4">

            {benefits.map((benefit) => (

              <div
                key={benefit}
                className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl"
              >

                <CheckCircle2
                  size={20}
                  className="shrink-0 text-green-400"
                />

                <p className="text-sm text-gray-200 sm:text-base">
                  {benefit}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* FINAL CTA */}
      {/* ====================================================== */}

      <section className="relative px-6 py-24">

        <div className="relative mx-auto max-w-5xl">

          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60 px-8 py-16 text-center shadow-2xl backdrop-blur-xl sm:px-12 sm:py-20">

            <div className="relative flex flex-col items-center">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400">
                <FileText size={16} />
                AI Smart Notes
              </div>

              <h2 className="max-w-2xl text-4xl font-extrabold sm:text-5xl">
                Give us a topic.
                <span className="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Get complete notes.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
                Enter a topic, concept or study requirement and let
                CampusHub AI build structured notes for you.
              </p>

              <a
                href="#generator"
                className="mt-10 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30"
              >
                Generate My Notes
                <ArrowRight size={18} />
              </a>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default SmartNotes;