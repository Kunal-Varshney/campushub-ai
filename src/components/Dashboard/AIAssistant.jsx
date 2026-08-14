import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  Briefcase,
  Code2,
  FileText,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const prompts = [
  {
    icon: Code2,
    label: "What should I learn next?",
  },
  {
    icon: Briefcase,
    label: "Find internships for me",
  },
  {
    icon: FileText,
    label: "Improve my resume",
  },
  {
    icon: MessageSquare,
    label: "Explain this topic",
  },
];

function AIAssistant() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = message.trim();

    if (!value) {
      navigate("/ai-assistant");
      return;
    }

    navigate("/ai-assistant", {
      state: {
        message: value,
      },
    });
  };

  const handlePrompt = (prompt) => {
    setMessage(prompt);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 p-6"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative">

        {/* Header */}

        <div className="flex items-start justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-blue-500/20">
              <Bot size={21} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
                CampusHub AI
              </p>

              <h3 className="mt-1 text-lg font-bold">
                Your personal campus copilot
              </h3>
            </div>

          </div>

          <span className="hidden items-center gap-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] text-cyan-300 sm:flex">
            <Sparkles size={12} />
            Online
          </span>

        </div>


        {/* AI Message */}

        <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4">

          <div className="flex gap-3">

            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Bot size={15} />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-200">
                What do you want to achieve today?
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Ask me about coding, career, internships, resume,
                learning or anything related to your campus journey.
              </p>
            </div>

          </div>

        </div>


        {/* Quick Prompts */}

        <div className="mt-4 flex flex-wrap gap-2">

          {prompts.map((prompt) => {
            const Icon = prompt.icon;

            return (
              <button
                key={prompt.label}
                type="button"
                onClick={() => handlePrompt(prompt.label)}
                className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-950/50 px-3 py-2 text-xs text-gray-400 transition hover:border-cyan-500/40 hover:text-cyan-400"
              >
                <Icon size={12} />
                {prompt.label}
              </button>
            );
          })}

        </div>


        {/* Input */}

        <form
          onSubmit={handleSubmit}
          className="mt-5 flex items-center gap-2"
        >

          <div className="relative flex-1">

            <MessageSquare
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
            />

            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask CampusHub AI..."
              className="w-full rounded-xl border border-slate-800 bg-slate-950/70 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-cyan-500/50"
            />

          </div>

          <button
            type="submit"
            aria-label="Ask AI"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 transition hover:scale-105"
          >
            <Send size={16} />
          </button>

        </form>


        {/* Full Assistant */}

        <button
          type="button"
          onClick={() => navigate("/ai-assistant")}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 py-2.5 text-xs font-semibold text-gray-400 transition hover:border-cyan-500/40 hover:text-cyan-400"
        >
          Open full AI workspace
          <ArrowRight size={14} />
        </button>

      </div>
    </motion.section>
  );
}

export default AIAssistant;