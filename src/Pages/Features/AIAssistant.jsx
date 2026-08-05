import { saveLastVisited } from "../../utils/lastVisited";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Sparkles,
  ArrowRight,
  Send,
  Code2,
  BookOpen,
  Mic,
  Briefcase,
  Calendar,
  HelpCircle,
  MessageSquare,
  Wand2,
  Target,
  TrendingUp,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const suggestedPrompts = [
  "Explain binary search",
  "Help me build a resume",
  "Prepare me for interviews",
];

function getAIReply(userMessage) {
  const message = userMessage.toLowerCase();

  if (message.includes("resume")) {
    return "I can help you build an ATS friendly resume with strong projects and measurable impact.";
  }
  if (message.includes("interview")) {
    return "Let's prepare together — I can run mock interview questions and give feedback on your answers.";
  }
  if (message.includes("binary search") || message.includes("dsa")) {
    return "Binary search works by repeatedly halving a sorted array until you find the target value.";
  }
  return "I can help with coding, notes, interviews, career guidance and study planning — what's on your mind?";
}

const capabilities = [
  {
    icon: Code2,
    title: "Coding Help",
    description: "Debug errors, understand algorithms and write cleaner code with step-by-step guidance.",
  },
  {
    icon: BookOpen,
    title: "Smart Notes Generation",
    description: "Turn long chapters and lectures into concise, structured study notes in seconds.",
  },
  {
    icon: Mic,
    title: "Interview Preparation",
    description: "Practice with realistic mock interviews and get instant, actionable feedback.",
  },
  {
    icon: Briefcase,
    title: "Career Guidance",
    description: "Get personalized career paths, role suggestions and skill gap analysis.",
  },
  {
    icon: Calendar,
    title: "Study Planning",
    description: "Build a realistic study schedule around your exams, goals and available time.",
  },
  {
    icon: HelpCircle,
    title: "Doubt Solving",
    description: "Ask any academic question and get clear, simple explanations instantly.",
  },
];

const steps = [
  {
    icon: MessageSquare,
    title: "Ask Question",
    description: "Type any academic, career or coding question in plain language.",
  },
  {
    icon: Wand2,
    title: "AI Understands",
    description: "CampusHub AI analyzes context and identifies exactly what you need.",
  },
  {
    icon: Target,
    title: "Get Solution",
    description: "Receive a clear, step-by-step answer tailored to your level.",
  },
  {
    icon: TrendingUp,
    title: "Improve Learning",
    description: "Track progress over time as the assistant adapts to how you learn.",
  },
];

const benefits = [
  "Available 24/7 — no waiting for office hours",
  "Personalized to your pace and skill level",
  "Covers academics, coding and career in one place",
  "Turns confusion into clear, actionable steps",
];

function AIAssistant() {
  useEffect(() => {
    saveLastVisited("/ai-assistant");
  }, []);

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    { type: "ai", text: "👋 Hi! I'm your CampusHub AI Assistant. Ask me anything." },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [chat, isTyping]);

  const sendMessage = (text) => {
    const trimmed = (text ?? message).trim();
    if (!trimmed) return;

    setChat((prev) => [...prev, { type: "user", text: trimmed }]);
    setMessage("");
    setIsTyping(true);

    setTimeout(() => {
      setChat((prev) => [...prev, { type: "ai", text: getAIReply(trimmed) }]);
      setIsTyping(false);
    }, 1000);
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
              CampusHub AI Assistant
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Your Personal{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                AI Study Partner
              </span>
            </h1>

            <p className="mt-6 text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
              Get instant help with coding, notes, interviews and career
              decisions — all from one intelligent assistant built for
              students.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              <button
                onClick={() => navigate("/signup")}
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-cyan-400 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95"
              >
                Try It Free
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <a
                href="#chat-demo"
                className="group flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/70 px-7 py-3.5 font-semibold transition-all duration-300 hover:border-blue-500 hover:bg-slate-800 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <Zap size={20} className="text-blue-400 transition-transform duration-300 group-hover:scale-110" />
                See It In Action
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
                  <Brain size={26} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">CampusHub AI</p>
                  <h3 className="text-lg font-semibold">Always ready to help</h3>
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-blue-500/30 bg-blue-600/10 p-4 text-sm text-gray-200">
                  Explain recursion with a simple example
                </div>
                <div className="ml-auto w-fit max-w-[85%] rounded-xl bg-blue-600 p-4 text-sm text-white">
                  Sure — think of recursion like Russian nesting dolls...
                </div>
                <div className="flex items-center gap-2 pl-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: "0.2s" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CHAT DEMO */}
      {/* ---------------------------------------------------------------- */}
      <section id="chat-demo" className="relative px-6 py-20">
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-[110px]" />

        <div className="relative mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
              <MessageSquare size={16} />
              Live Demo
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Try the{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                AI Assistant
              </span>{" "}
              right now
            </h2>
            <p className="mt-4 text-base text-gray-400 sm:text-lg">
              This is a live preview — ask a question below and see how it responds.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-blue-900/20 backdrop-blur-xl sm:p-8"
          >
            <div className="mb-5 flex items-center gap-4 rounded-2xl bg-slate-800/80 p-4">
              <div className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 p-2.5">
                <Brain size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400">CampusHub AI</p>
                <h3 className="text-sm font-semibold">Your Personal AI Assistant</h3>
              </div>
            </div>

            <div className="max-h-[320px] space-y-3 overflow-y-auto pr-2">
              {chat.map((item, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-4 text-sm ${
                    item.type === "user"
                      ? "ml-auto w-fit max-w-[80%] bg-blue-600 text-white"
                      : "border border-blue-500/30 bg-blue-600/10 text-gray-200"
                  }`}
                >
                  {item.text}
                </div>
              ))}

              {isTyping && (
                <div className="flex w-fit items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-600/10 px-4 py-3 text-sm text-gray-300">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: "0.2s" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: "0.4s" }} />
                  <span className="ml-1 text-xs text-gray-400">AI is typing...</span>
                </div>
              )}

              <div ref={chatEndRef}></div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs text-gray-300 transition-colors duration-300 hover:border-blue-500 hover:text-blue-400"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="mt-4 flex gap-2"
            >
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask your AI assistant..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 font-semibold transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CAPABILITIES */}
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
              What It Can Do
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              One assistant,{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                every student need
              </span>
            </h2>
            <p className="mt-4 text-base text-gray-400 sm:text-lg">
              From late-night doubts to interview prep, it's built to handle it all.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, index) => {
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
              <Wand2 size={16} />
              How It Works
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              From question to{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                clarity
              </span>{" "}
              in seconds
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
                    {String(index + 1).padStart(2, "0")}
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
              Built for the way{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                students actually learn
              </span>
            </h2>
            <p className="mt-6 text-base leading-7 text-gray-400 sm:text-lg">
              No generic chatbot — an assistant tuned specifically for campus life,
              coursework and career prep.
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
                <Brain size={16} />
                Meet Your AI Assistant
              </div>

              <h2 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Stop searching.{" "}
                <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Start asking.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
                Join thousands of students already learning faster with
                CampusHub AI Assistant.
              </p>

              <button
                onClick={() => navigate("/signup")}
                className="group/btn mt-10 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-cyan-400 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95"
              >
                Start Using AI Assistant
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default AIAssistant;