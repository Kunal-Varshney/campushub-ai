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
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

// ============================================================
// FEATURES
// ============================================================

const features = [
  {
    icon: Wand2,
    title: "AI Summarization",
    description:
      "Convert lengthy content into short and meaningful explanations.",
  },
  {
    icon: Target,
    title: "Question Focused Notes",
    description:
      "AI focuses on exactly what you ask instead of adding unnecessary sections.",
  },
  {
    icon: Layers,
    title: "Smart Formatting",
    description:
      "Automatically organize definitions, concepts, types, examples and explanations.",
  },
  {
    icon: BookOpen,
    title: "Multiple Subjects",
    description:
      "Generate notes for coding, science, maths and almost any academic topic.",
  },
  {
    icon: Zap,
    title: "Quick Revision",
    description:
      "Get clear explanations and revision material instantly.",
  },
  {
    icon: GraduationCap,
    title: "Personalized Learning",
    description:
      "Explanations can be adapted to beginner, intermediate or advanced level.",
  },
];

// ============================================================
// HOW IT WORKS
// ============================================================

const steps = [
  {
    number: "01",
    icon: UploadCloud,
    title: "Ask Anything",
    description:
      "Enter a topic, question, concept or study requirement.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Understands",
    description:
      "CampusHub AI understands what you are actually asking.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Answer Generated",
    description:
      "Relevant and structured study material is generated.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Learn Faster",
    description:
      "Use the explanation for learning, revision and exam preparation.",
  },
];

// ============================================================
// BENEFITS
// ============================================================

const benefits = [
  "Ask for exactly what you want to learn",
  "No unnecessary fixed sections",
  "Definitions, types and examples when relevant",
  "Useful for both learning and revision",
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
        description: inputText,
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

      setGeneratedNotes({
        title: note.title,
        subject: note.subject || subject,
        difficulty,

        // Flexible AI response
        summary: note.summary || "",
        sections: Array.isArray(note.sections)
          ? note.sections
          : [],

        points: Array.isArray(note.points)
          ? note.points
          : [],

        examples: Array.isArray(note.examples)
          ? note.examples
          : [],

        types: Array.isArray(note.types)
          ? note.types
          : [],

        conclusion: note.conclusion || "",
      });

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
  // RENDER FLEXIBLE SECTION
  // ============================================================

  const renderSectionContent = (section) => {
    if (!section) return null;

    if (Array.isArray(section.content)) {
      return (
        <div className="space-y-3">
          {section.content.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 text-gray-300"
            >
              <CheckCircle2
                size={17}
                className="mt-1 shrink-0 text-blue-400"
              />

              <span className="leading-7">
                {item}
              </span>
            </div>
          ))}
        </div>
      );
    }

    return (
      <p className="whitespace-pre-line leading-7 text-gray-300">
        {section.content}
      </p>
    );
  };

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
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="w-full max-w-xl text-center lg:text-left"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
              <Sparkles size={16} />
              Smart Notes Generator
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Learn Any Topic With{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                AI Generated Notes
              </span>
            </h1>

            <p className="mt-6 text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
              Ask CampusHub AI anything about your studies and get a
              clear, structured and topic-focused explanation.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <a
                href="#generator"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95"
              >
                Ask AI
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
                Add Material
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
              ease: "easeOut",
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

              <div className="space-y-4">

                <div>
                  <p className="text-sm font-semibold text-blue-400">
                    One-Dimensional Array
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-300">
                    Stores elements in a single sequence and
                    can be accessed using one index.
                  </p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-blue-400">
                    Multi-Dimensional Array
                  </p>

                  <p className="mt-1 text-sm leading-6 text-gray-300">
                    Organizes elements across multiple dimensions,
                    such as rows and columns.
                  </p>
                </div>

              </div>

              <div className="mt-5 rounded-xl border border-blue-500/30 bg-blue-600/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">
                  AI understands your question
                </p>

                <p className="mt-1 text-sm text-gray-300">
                  It explains the requested concept instead of
                  forcing unrelated sections.
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
              Ask CampusHub AI
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ask anything about your{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                studies
              </span>
            </h2>

            <p className="mt-4 text-base text-gray-400 sm:text-lg">
              Ask a question, explain a concept, list types,
              compare topics or paste your study material.
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
              delay: 0.1,
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

Explain OOP in detail

OR

What are the types of arrays?

OR

Explain DBMS normalization with examples

OR

Explain binary search step by step`}
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-7 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
            />

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

            {/* GENERATE BUTTON */}

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
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white" />

                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-white"
                    style={{
                      animationDelay: "0.2s",
                    }}
                  />

                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-white"
                    style={{
                      animationDelay: "0.4s",
                    }}
                  />

                  <span className="ml-2">
                    AI is understanding your question...
                  </span>
                </>
              ) : (
                <>
                  Generate Answer
                  <Wand2
                    size={18}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </>
              )}
            </button>

            {/* ================================================== */}
            {/* GENERATED ANSWER */}
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
                    ease: "easeOut",
                  }}
                  className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/70 p-6 sm:p-7"
                >

                  {/* HEADER */}

                  <div className="mb-7 flex items-start gap-4 rounded-xl bg-slate-800/80 p-4">

                    <div className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 p-2.5">
                      <FileText size={20} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        {generatedNotes.subject}
                      </p>

                      <h3 className="mt-1 text-xl font-bold">
                        {generatedNotes.title}
                      </h3>
                    </div>

                    <span className="ml-auto rounded-full border border-blue-500/30 bg-blue-600/10 px-3 py-1 text-xs font-medium text-blue-400">
                      {generatedNotes.difficulty}
                    </span>

                  </div>

                  {/* SUMMARY */}

                  {generatedNotes.summary && (
                    <div className="rounded-xl border border-blue-500/30 bg-blue-600/10 p-5">

                      <h3 className="mb-3 flex items-center gap-2 font-semibold text-blue-400">
                        <BookOpen size={18} />
                        Explanation
                      </h3>

                      <p className="whitespace-pre-line leading-7 text-gray-300">
                        {generatedNotes.summary}
                      </p>

                    </div>
                  )}

                  {/* DYNAMIC SECTIONS */}

                  {generatedNotes.sections?.length > 0 && (
                    <div className="mt-7 space-y-6">

                      {generatedNotes.sections.map(
                        (section, index) => (
                          <div
                            key={index}
                            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
                          >

                            <h3 className="mb-4 text-lg font-semibold text-white">
                              {section.title}
                            </h3>

                            {renderSectionContent(
                              section
                            )}

                          </div>
                        )
                      )}

                    </div>
                  )}

                  {/* FALLBACK POINTS */}

                  {generatedNotes.sections?.length === 0 &&
                    generatedNotes.points?.length > 0 && (
                      <div className="mt-7">

                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                          <ListChecks
                            size={19}
                            className="text-blue-400"
                          />
                          Important Points
                        </h3>

                        <div className="space-y-3">

                          {generatedNotes.points.map(
                            (point, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3"
                              >
                                <CheckCircle2
                                  size={18}
                                  className="mt-1 shrink-0 text-blue-400"
                                />

                                <span className="leading-7 text-gray-300">
                                  {point}
                                </span>
                              </div>
                            )
                          )}

                        </div>

                      </div>
                    )}

                  {/* TYPES */}

                  {generatedNotes.types?.length > 0 && (
                    <div className="mt-7">

                      <h3 className="mb-4 text-lg font-semibold">
                        Types
                      </h3>

                      <div className="space-y-4">

                        {generatedNotes.types.map(
                          (type, index) => (
                            <div
                              key={index}
                              className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
                            >

                              <h4 className="mb-2 font-semibold text-blue-400">
                                {type.name}
                              </h4>

                              <p className="leading-7 text-gray-300">
                                {type.description}
                              </p>

                              {type.example && (
                                <div className="mt-3 rounded-lg bg-slate-950 p-3 text-sm text-gray-400">
                                  <span className="font-semibold text-gray-300">
                                    Example:
                                  </span>{" "}
                                  {type.example}
                                </div>
                              )}

                            </div>
                          )
                        )}

                      </div>

                    </div>
                  )}

                  {/* EXAMPLES */}

                  {generatedNotes.examples?.length > 0 && (
                    <div className="mt-7">

                      <h3 className="mb-4 text-lg font-semibold">
                        Examples
                      </h3>

                      <div className="space-y-3">

                        {generatedNotes.examples.map(
                          (example, index) => (
                            <div
                              key={index}
                              className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-gray-300"
                            >
                              {example}
                            </div>
                          )
                        )}

                      </div>

                    </div>
                  )}

                  {/* CONCLUSION */}

                  {generatedNotes.conclusion && (
                    <div className="mt-7 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-5">

                      <h3 className="mb-2 font-semibold text-cyan-400">
                        Conclusion
                      </h3>

                      <p className="leading-7 text-gray-300">
                        {generatedNotes.conclusion}
                      </p>

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

        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-purple-600/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl">

          <div className="mx-auto mb-16 max-w-2xl text-center">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
              <Sparkles size={16} />
              Why It Works
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              AI that understands{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                your question
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
              From question to{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                complete answer
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
              Ask your actual question and let CampusHub AI
              create the explanation you need.
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
                Smart Notes Generator
              </div>

              <h2 className="max-w-2xl text-4xl font-extrabold sm:text-5xl">
                Ask your question.
                <span className="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Learn the answer.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
                Explain a concept, ask for types, request examples,
                or paste your complete study material.
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