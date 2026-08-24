import API from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { saveLastVisited } from "../../utils/lastVisited";
import { useEffect, useState } from "react";

import {
  Sparkles,
  ArrowRight,
  UploadCloud,
  Save,
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
  const location = useLocation();

  const [inputText, setInputText] = useState("");
  const [subject, setSubject] = useState("Computer Science");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isCurrentNoteSaved, setIsCurrentNoteSaved] = useState(false);

  // ============================================================
  // OPEN SAVED NOTE
  // ============================================================

  useEffect(() => {
    const savedNoteId =
      location.state?.savedNote ||
      location.state?.savedNoteId;

    if (!savedNoteId) return;

    const loadSavedNote = async () => {
      try {
        setIsLoading(true);

        const response = await API.get(
          `/notes/${savedNoteId}`
        );

        if (
          !response?.data?.success ||
          !response?.data?.note
        ) {
          throw new Error(
            response?.data?.message ||
            "Saved note not found"
          );
        }

        const savedNote =
          response.data.note;

        console.log(
          "OPENING COMPLETE SAVED NOTE:",
          savedNote
        );

        const answer =
          savedNote?.answer &&
          typeof savedNote.answer === "object"
            ? savedNote.answer
            : {};

        const sections =
          Array.isArray(answer?.sections)
            ? answer.sections
            : [];

        const keyPoints =
          Array.isArray(savedNote?.points)
            ? savedNote.points
            : [];

        const keywords =
          Array.isArray(savedNote?.keywords)
            ? savedNote.keywords
            : [];

        const examTips =
          Array.isArray(savedNote?.examTips)
            ? savedNote.examTips
            : [];

        const quickRevision =
          Array.isArray(savedNote?.quickRevision)
            ? savedNote.quickRevision
            : [];

        // ======================================================
        // RESTORE INPUT
        // ======================================================

        setInputText(
          savedNote?.topic ||
          savedNote?.description ||
          ""
        );

        setSubject(
          savedNote?.subject ||
          savedNote?.category ||
          "Computer Science"
        );

        setDifficulty(
          savedNote?.difficulty ||
          "Intermediate"
        );

        // ======================================================
        // RESTORE COMPLETE SAVED NOTE
        // ======================================================

        setGeneratedNotes({
          _id: savedNote._id,

          title:
            savedNote?.title ||
            "Saved Notes",

          subject:
            savedNote?.subject ||
            savedNote?.category ||
            "General",

          difficulty:
            savedNote?.difficulty ||
            "Intermediate",

          introduction:
            savedNote?.summary ||
            answer?.introduction ||
            "",

          sections,

          keyPoints,

          keywords,

          examTips,

          quickRevision,
        });

        // ======================================================
        // IMPORTANT
        // ======================================================

        setIsCurrentNoteSaved(true);

        // Remove navigation state so refresh doesn't
        // repeatedly request the same note.
        navigate(
          location.pathname,
          {
            replace: true,
            state: {},
          }
        );
      } catch (error) {
        console.error(
          "OPEN SAVED NOTE ERROR:",
          error?.response?.data ||
            error?.message
        );

        alert(
          error?.response?.data?.message ||
          error?.message ||
          "Unable to open saved note"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedNote();
  }, [
  location.state?.savedNote,
  location.state?.savedNoteId,
  navigate,
  location.pathname,
]);

  // ============================================================
  // FETCH PREVIOUS NOTES
  // ============================================================

  const fetchNotes = async () => {
    try {
      const response = await API.get("/notes");

      console.log(
        "SMART NOTES - SAVED NOTES:",
        response.data
      );

      if (response?.data?.success) {
        setSavedNotes(
          Array.isArray(response?.data?.notes)
            ? response.data.notes
            : []
        );
      } else {
        setSavedNotes([]);
      }
    } catch (error) {
      console.error(
        "FETCH NOTES ERROR:",
        error?.response?.data || error?.message
      );

      setSavedNotes([]);
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
  // FILE UPLOAD
  // ============================================================

  const handleFileUpload = (event) => {
  const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    const allowedExtensions = [".pdf", ".doc", ".docx", ".txt"];

    const fileName = file.name.toLowerCase();

    const isValidType =
      allowedTypes.includes(file.type) ||
      allowedExtensions.some((extension) =>
        fileName.endsWith(extension)
      );

    if (!isValidType) {
      alert("Please upload a PDF, DOC, DOCX or TXT file.");
      event.target.value = "";
      return;
    }

    // Maximum file size: 10 MB
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10 MB.");
      event.target.value = "";
      return;
    }

    setUploadedFile(file);
    setUploadMessage("");

    // TXT files can be read directly in the browser.
    if (file.type === "text/plain" || fileName.endsWith(".txt")) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result;

        if (typeof text === "string" && text.trim()) {
          setInputText(text.trim());

          setUploadMessage(
            "TXT file loaded successfully. You can generate notes now."
          );
        }
      };

      reader.onerror = () => {
        setUploadMessage("Unable to read this file.");
      };

      reader.readAsText(file);
    } else {
      setUploadMessage(
        `${file.name} selected successfully. PDF/DOC/DOCX processing requires backend file extraction.`
      );
    }

    // Allow selecting the same file again
    event.target.value = "";
  };

  // ============================================================
  // GENERATE NOTES
  // ============================================================

  const handleGenerate = async () => {
    if (!inputText.trim() || isLoading) return;

    try {
      setIsLoading(true);
      setGeneratedNotes(null);
      setIsCurrentNoteSaved(false);

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
        quickRevision: Array.isArray(note.quickRevision)
          ? note.quickRevision
          : [],
      });

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
  // SAVE GENERATED NOTE
  // ============================================================

  const handleSaveNote = async () => {
    if (!generatedNotes || isSaving || isCurrentNoteSaved) return;

    try {
      setIsSaving(true);

      const response = await API.post("/notes/create", {
        title: generatedNotes.title,

        description:
          inputText.trim(),

        subject:
          generatedNotes.subject,

        topic:
          inputText.trim(),

        category:
          generatedNotes.subject,

        difficulty:
          generatedNotes.difficulty,

        branch:
          "AI & ML",

        year:
          2,

        summary:
          generatedNotes.introduction,

        answer: {
          introduction:
            generatedNotes.introduction,

          sections:
            generatedNotes.sections,
        },

        points:
          generatedNotes.keyPoints,

        keywords:
          generatedNotes.keywords,

        examTips:
          generatedNotes.examTips,

        quickRevision:
          generatedNotes.quickRevision,

        fileUrl:
          "ai-generated",
      });

      console.log("SAVE NOTE RESPONSE:", response.data);

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to save note"
        );
      }

      setIsCurrentNoteSaved(true);

      // Refresh saved notes
      await fetchNotes();

      alert(
        response.data?.alreadySaved
          ? "This note is already saved."
          : "Note saved successfully 💾"
      );

    } catch (error) {
      console.log(
        "SAVE NOTE ERROR:",
        error?.response?.data || error.message
      );

      alert(
        error?.response?.data?.message ||
          error.message ||
          "Failed to save note"
      );
    } finally {
      setIsSaving(false);
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
        className="min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70"
      >
        {/* SECTION HEADER */}

        <div className="border-b border-slate-800 bg-slate-800/50 px-4 py-4 sm:px-5">
          <div className="flex min-w-0 items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 text-sm font-bold text-blue-400">
              {index + 1}
            </div>

            <h3 className="min-w-0 break-words text-base font-bold leading-6 text-white sm:text-lg">
              {heading}
            </h3>
          </div>
        </div>

        {/* SECTION BODY */}

        <div className="space-y-6 p-4 sm:p-5">

          {/* CONTENT */}

          {content && (
            <div className="min-w-0">
              <p className="whitespace-pre-line break-words text-sm leading-7 text-gray-300 sm:text-[15px] sm:leading-8">
                {content}
              </p>
            </div>
          )}

          {/* POINTS */}

          {points.length > 0 && (
            <div className="min-w-0">
              <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-400 sm:text-sm">
                <ListChecks
                  size={17}
                  className="shrink-0"
                />
                Important Points
              </h4>

              <div className="space-y-3">
                {points.map((point, pointIndex) => (
                  <div
                    key={pointIndex}
                    className="flex min-w-0 items-start gap-3"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-1 shrink-0 text-blue-400"
                    />

                    <p className="min-w-0 break-words text-sm leading-7 text-gray-300 sm:text-base">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXAMPLES */}

          {examples.length > 0 && (
            <div className="min-w-0">
              <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-cyan-400 sm:text-sm">
                <Code2
                  size={17}
                  className="shrink-0"
                />
                Examples
              </h4>

              <div className="space-y-3">
                {examples.map((example, exampleIndex) => (
                  <div
                    key={exampleIndex}
                    className="min-w-0 overflow-hidden rounded-xl border border-cyan-500/20 bg-slate-950 p-3 sm:p-4"
                  >
                    <p className="whitespace-pre-line break-words text-sm leading-7 text-gray-300">
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
    <div className="relative w-full min-w-0 overflow-hidden bg-slate-950 text-white">

      {/* ====================================================== */}
      {/* BACKGROUND GRID */}
      {/* ====================================================== */}

      <div className="pointer-events-none fixed inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section className="relative overflow-hidden px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-32">

        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-600/20 blur-[110px]" />

        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-[110px]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-10 sm:gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">

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
            className="w-full min-w-0 max-w-xl text-center lg:text-left"
          >

            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-3 py-2 text-xs text-blue-400 backdrop-blur sm:mb-6 sm:px-4 sm:text-sm">
              <Sparkles
                size={16}
                className="shrink-0"
              />
              <span>AI Smart Notes</span>
            </div>

            <h1 className="break-words text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Turn Any Topic Into{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Complete Notes
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-gray-400 sm:mt-6 sm:text-lg sm:leading-8 lg:mx-0">
              Give CampusHub AI a topic, question or study requirement
              and get complete, structured notes designed for learning
              and revision.
            </p>

            <div className="mt-7 flex w-full flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4 lg:justify-start">

              <a
                href="#generator"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95 sm:w-auto sm:px-7 sm:text-base"
              >
                Generate Notes

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

            <label
              htmlFor="smart-notes-upload"
              className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3.5 text-sm font-semibold transition-all duration-300 hover:border-blue-500 hover:bg-slate-800 active:scale-95 sm:w-auto sm:px-7 sm:text-base"
            >
              <UploadCloud
                size={20}
                className="shrink-0 text-blue-400 transition-transform duration-300 group-hover:-translate-y-0.5"
              />

              <span>Upload Files</span>

              <input
                id="smart-notes-upload"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
            

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
            className="flex w-full min-w-0 max-w-md justify-center lg:ml-auto"
          >

            <div className="w-full min-w-0 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-2xl shadow-blue-900/20 backdrop-blur-xl sm:rounded-3xl sm:p-8">

              <div className="mb-5 flex min-w-0 items-center gap-3 rounded-2xl bg-slate-800/80 p-4 sm:gap-4 sm:p-5">

                <div className="shrink-0 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-3">
                  <FileText size={24} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-400 sm:text-sm">
                    Computer Science
                  </p>

                  <h3 className="break-words text-base font-semibold sm:text-lg">
                    Types of Arrays
                  </h3>
                </div>

              </div>

              <div className="space-y-5">

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-blue-400">
                    Definition
                  </p>

                  <p className="mt-1 break-words text-sm leading-6 text-gray-300">
                    An array is a collection of elements of the same
                    data type stored in contiguous memory locations.
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="break-words text-sm font-semibold text-blue-400">
                    1. One-Dimensional Array
                  </p>

                  <p className="mt-1 break-words text-sm leading-6 text-gray-300">
                    Stores elements in a single sequence and uses
                    one index to access each element.
                  </p>
                </div>

                <div className="min-w-0">
                  <p className="break-words text-sm font-semibold text-blue-400">
                    2. Two-Dimensional Array
                  </p>

                  <p className="mt-1 break-words text-sm leading-6 text-gray-300">
                    Stores data using rows and columns and is commonly
                    used to represent matrices.
                  </p>
                </div>

              </div>

              <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-600/10 p-3 sm:p-4">

                <p className="text-xs font-semibold uppercase tracking-wide text-blue-400">
                  Quick Revision
                </p>

                <p className="mt-2 break-words text-sm leading-6 text-gray-300">
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
        className="relative px-4 py-16 sm:px-6 sm:py-20"
      >

        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]" />

        <div className="relative mx-auto w-full max-w-4xl min-w-0">

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
            className="mb-10 text-center sm:mb-12"
          >

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-3 py-2 text-xs text-blue-400 backdrop-blur sm:mb-6 sm:px-4 sm:text-sm">
              <MessageSquare
                size={16}
                className="shrink-0"
              />
              AI Notes Generator
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
              Create Complete{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Study Notes
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-lg">
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
            className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-2xl shadow-blue-900/10 backdrop-blur-xl sm:rounded-3xl sm:p-8"
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
              className="w-full min-w-0 resize-none rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm leading-7 text-white outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20 sm:px-4"
            />

            {/* OPTIONS */}

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* SUBJECT */}

              <div className="min-w-0">

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Select Subject
                </label>

                <select
                  value={subject}
                  onChange={(e) =>
                    setSubject(e.target.value)
                  }
                  className="w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-blue-500 sm:px-4 sm:text-base"
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

              <div className="min-w-0">

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Learning Level
                </label>

                <select
                  value={difficulty}
                  onChange={(e) =>
                    setDifficulty(e.target.value)
                  }
                  className="w-full min-w-0 rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-blue-500 sm:px-4 sm:text-base"
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
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 sm:px-7 sm:text-base"
            >

              {isLoading ? (
                <>
                  <RefreshCw
                    size={18}
                    className="shrink-0 animate-spin"
                  />

                  <span className="break-words">
                    AI is creating your notes...
                  </span>
                </>
              ) : (
                <>
                  Generate Notes

                  <Wand2
                    size={18}
                    className="shrink-0 transition-transform duration-300 group-hover:scale-110"
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
                  className="mt-8 min-w-0 sm:mt-10"
                >

                  {/* NOTES HEADER */}

                  <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

                    <div className="bg-gradient-to-r from-blue-600/20 to-cyan-500/10 p-4 sm:p-6">

                      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:flex-wrap">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
                          <FileText size={23} />
                        </div>

                        <div className="min-w-0 flex-1">

                          <p className="text-sm font-medium text-blue-400">
                            {generatedNotes.subject}
                          </p>

                          <h2 className="mt-1 break-words text-xl font-extrabold leading-tight text-white sm:text-2xl">
                            {generatedNotes.title}
                          </h2>

                          <p className="mt-2 text-sm text-gray-400">
                            AI Generated Study Notes
                          </p>

                        </div>

                        <span className="w-fit max-w-full shrink-0 break-words rounded-full border border-blue-500/30 bg-blue-600/10 px-3 py-1.5 text-xs font-medium text-blue-400">
                          {generatedNotes.difficulty}
                        </span>
                        <button
                          type="button"
                          onClick={handleSaveNote}
                          disabled={isSaving || isCurrentNoteSaved}
                          className={`flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                            isCurrentNoteSaved
                              ? "cursor-default border border-green-500/30 bg-green-500/10 text-green-400"
                              : "border border-blue-500/30 bg-blue-600/10 text-blue-400 hover:border-blue-500 hover:bg-blue-600/20 hover:-translate-y-0.5"
                          } disabled:opacity-70`}
                        >
                          {isSaving ? (
                            <>
                              <RefreshCw
                                size={17}
                                className="animate-spin"
                              />
                              Saving...
                            </>
                          ) : isCurrentNoteSaved ? (
                            <>
                              <CheckCircle2 size={17} />
                              Saved
                            </>
                          ) : (
                            <>
                              <Save size={17} />
                              Save Note
                            </>
                          )}
                        </button>

                      </div>

                    </div>

                  </div>

                  {/* ================================================== */}
                  {/* INTRODUCTION / DEFINITION */}
                  {/* ================================================== */}

                  {generatedNotes.introduction && (

                    <div className="mt-6 min-w-0 rounded-2xl border border-blue-500/30 bg-blue-600/10 p-4 sm:p-6">

                      <div className="mb-3 flex items-center gap-2">

                        <BookOpen
                          size={19}
                          className="shrink-0 text-blue-400"
                        />

                        <h3 className="break-words text-base font-bold text-blue-400 sm:text-lg">
                          Definition / Introduction
                        </h3>

                      </div>

                      <p className="whitespace-pre-line break-words text-sm leading-7 text-gray-300 sm:text-[15px] sm:leading-8">
                        {generatedNotes.introduction}
                      </p>

                    </div>

                  )}

                  {/* ================================================== */}
                  {/* MAIN NOTES SECTIONS */}
                  {/* ================================================== */}

                  {generatedNotes.sections.length > 0 && (

                    <div className="mt-7 min-w-0 space-y-5">

                      {generatedNotes.sections.map(
                        renderSection
                      )}

                    </div>

                  )}

                  {/* ================================================== */}
                  {/* IMPORTANT POINTS */}
                  {/* ================================================== */}

                  {generatedNotes.keyPoints.length > 0 && (

                    <div className="mt-7 min-w-0 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6">

                      <div className="mb-5 flex items-center gap-2">

                        <ListChecks
                          size={20}
                          className="shrink-0 text-blue-400"
                        />

                        <h3 className="text-base font-bold sm:text-lg">
                          Important Points
                        </h3>

                      </div>

                      <div className="space-y-3">

                        {generatedNotes.keyPoints.map(
                          (point, index) => (

                            <div
                              key={index}
                              className="flex min-w-0 items-start gap-3"
                            >

                              <CheckCircle2
                                size={18}
                                className="mt-1 shrink-0 text-blue-400"
                              />

                              <p className="min-w-0 break-words text-sm leading-7 text-gray-300 sm:text-base">
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

                    <div className="mt-7 min-w-0 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6">

                      <div className="mb-4 flex items-center gap-2">

                        <Layers
                          size={19}
                          className="shrink-0 text-cyan-400"
                        />

                        <h3 className="text-base font-bold sm:text-lg">
                          Important Terms
                        </h3>

                      </div>

                      <div className="flex min-w-0 flex-wrap gap-2">

                        {generatedNotes.keywords.map(
                          (keyword, index) => (

                            <span
                              key={index}
                              className="max-w-full break-words rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-gray-300 sm:text-sm"
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

                    <div className="mt-7 min-w-0 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4 sm:p-6">

                      <div className="mb-5 flex items-center gap-2">

                        <Lightbulb
                          size={20}
                          className="shrink-0 text-yellow-400"
                        />

                        <h3 className="break-words text-base font-bold text-yellow-400 sm:text-lg">
                          Exam-Oriented Points
                        </h3>

                      </div>

                      <div className="space-y-3">

                        {generatedNotes.examTips.map(
                          (tip, index) => (

                            <div
                              key={index}
                              className="flex min-w-0 items-start gap-3"
                            >

                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow-400" />

                              <p className="min-w-0 break-words text-sm leading-7 text-gray-300 sm:text-base">
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

                  {(
                    generatedNotes.quickRevision?.length > 0 ||
                    generatedNotes.keyPoints.length > 0 ||
                    generatedNotes.sections.length > 0
                  ) && (

                    <div className="mt-7 min-w-0 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 sm:p-6">

                      <div className="mb-4 flex items-center gap-2">

                        <Zap
                          size={19}
                          className="shrink-0 text-cyan-400"
                        />

                        <h3 className="text-base font-bold text-cyan-400 sm:text-lg">
                          Quick Revision
                        </h3>

                      </div>

                      <div className="space-y-2 text-sm leading-7 text-gray-300">

                       {generatedNotes.quickRevision?.length > 0 ? (

                        generatedNotes.quickRevision
                          .map((point, index) => (
                            <p
                              key={index}
                              className="break-words"
                            >
                              • {point}
                            </p>
                          ))

                      ) : generatedNotes.keyPoints.length > 0 ? (

                        generatedNotes.keyPoints
                          .slice(0, 5)
                          .map((point, index) => (
                            <p
                              key={index}
                              className="break-words"
                            >
                              • {point}
                            </p>
                          ))

                      ) : (

                        generatedNotes.sections
                          .slice(0, 5)
                          .map((section, index) => (
                            <p
                              key={index}
                              className="break-words"
                            >
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
      {/* SAVED NOTES */}
      {/* ====================================================== */}

      <section className="relative px-4 py-16 sm:px-6 sm:py-20">

        <div className="relative mx-auto w-full max-w-7xl">

          <div className="mb-10 text-center sm:mb-12">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-3 py-2 text-xs text-blue-400 backdrop-blur sm:mb-6 sm:px-4 sm:text-sm">
              <Save size={16} />
              My Saved Notes
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
              Your{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Saved Notes
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-lg">
              Open your previously generated notes and continue learning.
            </p>

          </div>

          {savedNotes.length === 0 ? (

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 text-center sm:rounded-3xl sm:p-12">

              <FileText
                size={42}
                className="mx-auto mb-4 text-slate-600"
              />

              <h3 className="text-lg font-bold text-white sm:text-xl">
                No saved notes yet
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Generate and save your first note to see it here.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {savedNotes.map((note) => (

                <motion.button
                  key={note._id}
                  type="button"
                  onClick={() => {
                    navigate("/smart-notes", {
                      state: {
                        savedNote: note._id,
                      },
                    });
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  className="group min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-left transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-900 sm:rounded-3xl sm:p-6"
                >

                  {/* ICON */}

                  <div className="mb-5 flex items-start justify-between gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
                      <FileText size={21} />
                    </div>

                    <ArrowRight
                      size={19}
                      className="mt-2 shrink-0 text-slate-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-400"
                    />

                  </div>

                  {/* TITLE */}

                  <h3 className="break-words text-base font-bold leading-6 text-white sm:text-lg">
                    {note.title || "Saved Notes"}
                  </h3>

                  {/* SUBJECT */}

                  <p className="mt-2 break-words text-sm text-blue-400">
                    {note.subject || note.category || "General"}
                  </p>

                  {/* DESCRIPTION */}

                  <p className="mt-3 line-clamp-3 break-words text-sm leading-6 text-gray-400">
                    {note.summary ||
                      note.description ||
                      note.topic ||
                      "Saved study notes"}
                  </p>

                  {/* META */}

                  <div className="mt-5 flex flex-wrap items-center gap-2">

                    <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-gray-400">
                      {note.difficulty || "Intermediate"}
                    </span>

                    {note.branch && (
                      <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-gray-400">
                        {note.branch}
                      </span>
                    )}

                  </div>

                </motion.button>

              ))}

            </div>

          )}

        </div>

      </section>

      {/* ====================================================== */}
      {/* FEATURES */}
      {/* ====================================================== */}

      <section className="relative px-4 py-16 sm:px-6 sm:py-20">

        <div className="relative mx-auto max-w-7xl">

          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-3 py-2 text-xs text-blue-400 sm:mb-6 sm:px-4 sm:text-sm">
              <Sparkles size={16} />
              Why It Works
            </div>

            <h2 className="break-words text-2xl font-extrabold tracking-tight sm:text-4xl">
              Notes that understand{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                your topic
              </span>
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">

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
                  className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 sm:rounded-3xl sm:p-8"
                >

                  <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg sm:mb-6 sm:h-14 sm:w-14">
                    <Icon size={26} />
                  </div>

                  <h3 className="mb-3 break-words text-lg font-semibold sm:text-xl">
                    {item.title}
                  </h3>

                  <p className="break-words text-sm leading-relaxed text-gray-400 sm:text-base">
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

      <section className="relative px-4 py-16 sm:px-6 sm:py-20">

        <div className="relative mx-auto max-w-7xl">

          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-3 py-2 text-xs text-blue-400 sm:mb-6 sm:px-4 sm:text-sm">
              <ListChecks size={16} />
              How It Works
            </div>

            <h2 className="break-words text-2xl font-extrabold sm:text-4xl">
              From topic to{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                complete notes
              </span>
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">

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
                  className="relative min-w-0 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl sm:rounded-3xl sm:p-6"
                >

                  <span className="absolute right-5 top-5 text-2xl font-bold text-slate-800 sm:right-6 sm:top-6 sm:text-3xl">
                    {step.number}
                  </span>

                  <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
                    <Icon size={22} />
                  </div>

                  <h3 className="mb-2 break-words text-lg font-semibold">
                    {step.title}
                  </h3>

                  <p className="break-words text-sm leading-relaxed text-gray-400">
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

      <section className="relative px-4 py-16 sm:px-6 sm:py-20">

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 lg:grid-cols-2">

          <div className="min-w-0">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-3 py-2 text-xs text-blue-400 sm:mb-6 sm:px-4 sm:text-sm">
              <Target size={16} />
              Why Students Choose It
            </div>

            <h2 className="break-words text-2xl font-extrabold sm:text-4xl">
              Study Smarter{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                With AI
              </span>
            </h2>

            <p className="mt-5 break-words text-sm leading-7 text-gray-400 sm:mt-6 sm:text-lg">
              Start with a short topic and let CampusHub AI turn
              it into complete study notes.
            </p>

          </div>

          <div className="min-w-0 space-y-4">

            {benefits.map((benefit) => (

              <div
                key={benefit}
                className="flex min-w-0 items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl sm:items-center sm:gap-4 sm:p-5"
              >

                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-green-400 sm:mt-0"
                />

                <p className="min-w-0 break-words text-sm leading-6 text-gray-200 sm:text-base">
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

      <section className="relative px-4 py-16 sm:px-6 sm:py-24">

        <div className="relative mx-auto max-w-5xl">

          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-12 text-center shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:px-12 sm:py-20">

            <div className="relative flex flex-col items-center">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-3 py-2 text-xs text-blue-400 sm:mb-6 sm:px-4 sm:text-sm">
                <FileText size={16} />
                AI Smart Notes
              </div>

              <h2 className="max-w-2xl break-words text-3xl font-extrabold leading-tight sm:text-5xl">
                Give us a topic.
                <span className="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Get complete notes.
                </span>
              </h2>

              <p className="mt-5 max-w-xl break-words text-base leading-7 text-gray-400 sm:mt-6 sm:text-lg sm:leading-8">
                Enter a topic, concept or study requirement and let
                CampusHub AI build structured notes for you.
              </p>

              <a
                href="#generator"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30 sm:mt-10 sm:w-auto sm:px-8 sm:text-base"
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