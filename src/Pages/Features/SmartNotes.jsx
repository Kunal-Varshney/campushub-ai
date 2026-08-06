import API from "../../services/api";
import { saveLastVisited } from "../../utils/lastVisited";
import { useEffect } from "react";
import { useState } from "react";
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

const features = [
  {
    icon: Wand2,
    title: "AI Summarization",
    description: "Convert lengthy content into short and meaningful summaries.",
  },
  {
    icon: Target,
    title: "Exam Focused Notes",
    description: "Highlight important topics and frequently asked concepts.",
  },
  {
    icon: Layers,
    title: "Smart Formatting",
    description: "Automatically organize headings, points and examples.",
  },
  {
    icon: BookOpen,
    title: "Multiple Subjects",
    description: "Generate notes for coding, science, maths and more.",
  },
  {
    icon: Zap,
    title: "Quick Revision",
    description: "Create last minute revision notes instantly.",
  },
  {
    icon: GraduationCap,
    title: "Personalized Learning",
    description: "Notes adapted according to your learning level.",
  },
];

const steps = [
  {
    number: "01",
    icon: UploadCloud,
    title: "Upload Content",
    description: "Paste your chapter, lecture notes or study material.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Understands",
    description: "CampusHub AI reads and identifies key concepts.",
  },
  {
    number: "03",
    icon: FileText,
    title: "Notes Generated",
    description: "Structured, exam-ready notes are created instantly.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Learn Faster",
    description: "Revise smarter with clear, organized material.",
  },
];

const benefits = [
  "Saves hours of manual note making",
  "Improves exam preparation",
  "Makes difficult topics simple",
  "Helps quick revision",
];

function SmartNotes() {
  const [inputText, setInputText] = useState("");
  const [subject, setSubject] = useState("Computer Science");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);

  const fetchNotes = async () => {
    try {

      const response = await API.get("/notes");

      console.log(response.data);

      setSavedNotes(response.data.notes);

    } catch (error) {

      console.log("FETCH ERROR:", error);

    }
  };

   useEffect(() => {
    saveLastVisited("/smart-notes");
    fetchNotes();
  }, []);
  
  const handleGenerate = async () => {

    if(!inputText.trim() || isLoading) return;

      try {

        setIsLoading(true);
        setGeneratedNotes(null);


        const response = await API.post(
          "/notes/generate",
          {
            description: inputText,
            subject,
          }
        );


        console.log(
          "NOTE RESPONSE:",
          response.data
        );


        const note = response.data.note;

        setGeneratedNotes({
          subject: note.subject,
          chapter: note.title,
          difficulty,

          points: note.points,
          summary: note.summary,
          keywords: note.keywords,
          examTips: note.examTips,
        });
       
        fetchNotes();

      }
      catch(error){

        console.log(
          "NOTE ERROR:",
          error.response?.data || error.message
        );

        alert(
          error.response?.data?.message ||
          "Note generation failed"
        );

      }
      finally{

        setIsLoading(false);

      }

    };

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 text-white">
      {/* Grid texture — shared across sections */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* ---------------------------------------------------------------- */}
      {/* HERO */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden px-6 pb-20 pt-28 sm:pt-32">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-600/20 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-[110px]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-xl text-center lg:text-left"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
              <Sparkles size={16} />
              Smart Notes Generator
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Transform Learning With{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                AI Generated Notes
              </span>
            </h1>

            <p className="mt-6 text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
              Convert your lectures, PDFs and chapters into structured,
              exam-ready notes within seconds.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <a
                href="#generator"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-cyan-400 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95"
              >
                Generate Notes
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#generator"
                className="group flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/70 px-7 py-3.5 font-semibold transition-all duration-300 hover:border-blue-500 hover:bg-slate-800 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <UploadCloud
                  size={20}
                  className="text-blue-400 transition-transform duration-300 group-hover:scale-110"
                />
                Upload Material
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex w-full max-w-md justify-center lg:ml-auto"
          >
            <div className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-blue-900/20 backdrop-blur-xl sm:p-8">
              <div className="mb-6 flex items-center gap-4 rounded-2xl bg-slate-800/80 p-5">
                <div className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-3">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Computer Science</p>
                  <h3 className="text-lg font-semibold">Data Structures — Trees</h3>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  "A tree is a hierarchical, non-linear data structure.",
                  "Each node has a value and references to child nodes.",
                  "Binary trees allow a maximum of two children per node.",
                  "Traversals: Inorder, Preorder, Postorder.",
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-400" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-blue-500/30 bg-blue-600/10 p-4 text-sm text-gray-200">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-400">
                  Summary
                </p>
                Trees are essential for representing hierarchical data and are
                the foundation for more advanced structures like heaps and
                graphs.
              </div>

              <div className="mt-4 flex items-center gap-2 pl-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: "0.2s" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: "0.4s" }} />
                <span className="ml-1 text-xs text-gray-400">AI is generating notes...</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* GENERATOR */}
      {/* ---------------------------------------------------------------- */}
      <section id="generator" className="relative px-6 py-20">
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]" />

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
              <MessageSquare size={16} />
              Try It Now
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Generate your{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                notes instantly
              </span>
            </h2>
            <p className="mt-4 text-base text-gray-400 sm:text-lg">
              Paste your material below and let AI structure it for you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-blue-900/10 backdrop-blur-xl sm:p-8"
          >
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={6}
              placeholder="Paste your chapter, lecture notes or study material here..."
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-all duration-300 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/20"
            />

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Select Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
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

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Select Difficulty
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-blue-500"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={!inputText.trim() || isLoading}
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {isLoading ? (
                <>
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white" style={{ animationDelay: "0.2s" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-white" style={{ animationDelay: "0.4s" }} />
                  <span className="ml-2">AI is analyzing your content...</span>
                </>
              ) : (
                <>
                  Generate Notes
                  <Wand2 size={18} className="transition-transform duration-300 group-hover:scale-110" />
                </>
              )}
            </button>

            <AnimatePresence>
              {generatedNotes && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/70 p-6 sm:p-7"
                >
                  <div className="mb-5 flex items-center gap-4 rounded-xl bg-slate-800/80 p-4">
                    <div className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 p-2.5">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">{generatedNotes.subject}</p>
                      <h3 className="text-base font-semibold">{generatedNotes.chapter}</h3>
                    </div>
                    <span className="ml-auto rounded-full border border-blue-500/30 bg-blue-600/10 px-3 py-1 text-xs font-medium text-blue-400">
                      {generatedNotes.difficulty}
                    </span>
                  </div>

                  {/* Summary */}
                  <div className="mt-5 rounded-xl border border-blue-500/30 bg-blue-600/10 p-4">
                    <h3 className="mb-2 text-blue-400 font-semibold">
                      Summary
                    </h3>

                    <p className="text-gray-300">
                      {generatedNotes.summary}
                    </p>
                  </div>

                  {/* Key Points */}
                  <div className="mt-6">
                    <h3 className="mb-3 font-semibold text-lg">
                      Key Points
                    </h3>

                    <div className="space-y-2">
                      {generatedNotes.points?.map((point, index) => (
                        <div
                          key={index}
                          className="flex gap-2 items-start"
                        >
                          <CheckCircle2
                            className="text-green-400 mt-1"
                            size={18}
                          />

                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="mt-6">
                    <h3 className="mb-3 font-semibold text-lg">
                      Keywords
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {generatedNotes.keywords?.map((word, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-blue-600/20 border border-blue-500 text-sm"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Exam Tips */}
                  <div className="mt-6">
                    <h3 className="mb-3 font-semibold text-lg">
                      Exam Tips
                    </h3>

                    <div className="space-y-2">
                      {generatedNotes.examTips?.map((tip, index) => (
                        <div
                          key={index}
                          className="flex gap-2 items-start"
                        >
                          <CheckCircle2
                            className="text-yellow-400 mt-1"
                            size={18}
                          />

                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                 
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FEATURES */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative px-6 py-20">
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-purple-600/10 blur-[110px]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
              <Sparkles size={16} />
              Why It Works
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Everything you need for{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                smarter notes
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex h-full flex-col">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-blue-400/20 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <Icon size={26} />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold leading-snug">{item.title}</h3>
                    <p className="text-base leading-relaxed text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* HOW IT WORKS */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative px-6 py-20">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:56px_56px]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
              <ListChecks size={16} />
              How It Works
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              From raw content to{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                ready notes
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  className="relative rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <span className="absolute right-6 top-6 text-3xl font-bold text-slate-800">
                    {step.number}
                  </span>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
                    <Icon size={22} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* BENEFITS */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative px-6 py-20">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-600/10 blur-[110px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
              <Target size={16} />
              Why Students Choose It
            </div>
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Study Smarter{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                With AI
              </span>
            </h2>
            <p className="mt-6 text-base leading-7 text-gray-400 sm:text-lg">
              Stop spending hours rewriting notes by hand — let AI do the
              heavy lifting so you can focus on understanding.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <CheckCircle2 size={20} className="shrink-0 text-green-400" />
                <p className="text-sm text-gray-200 sm:text-base">{benefit}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FINAL CTA */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative px-6 py-24">
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-[110px]" />

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60 px-8 py-16 text-center shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-blue-500/20 sm:px-12 sm:py-20"
          >
            <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-90" />

            <div className="relative flex flex-col items-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
                <FileText size={16} />
                Smart Notes Generator
              </div>

              <h2 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Ready to create your{" "}
                <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  smart notes?
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
                Turn any chapter or lecture into structured notes in seconds.
              </p>

              <a
                href="#generator"
                className="group/btn mt-10 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-cyan-400 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95"
              >
                Generate My Notes
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default SmartNotes;