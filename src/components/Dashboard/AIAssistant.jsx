import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Bot, Send, FileText, BookOpen, Briefcase, Code2, Users } from "lucide-react";
import { motion } from "framer-motion";

const prompts = [
  { icon: Code2, label: "Explain DSA" },
  { icon: FileText, label: "Create Resume" },
  { icon: BookOpen, label: "Generate Notes" },
  { icon: Briefcase, label: "Find Internship" },
];

function AIAssistant() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
          <Bot size={20} />
        </div>
        <div>
          <h3 className="font-semibold">AI Assistant</h3>
          <p className="text-xs text-gray-400">Ask anything, anytime</p>
        </div>
      </div>
      <button
        onClick={() => navigate("/ai-assistant")}
        className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm text-gray-300 transition-colors duration-300 hover:border-blue-500 hover:text-blue-400"
      >
        <Users size={16} />
        Open Full AI Assistant
      </button>

      <div className="mb-4 space-y-3">
        <div className="rounded-xl border border-blue-500/30 bg-blue-600/10 p-3 text-sm text-gray-200">
          Hi! What would you like help with today?
        </div>
        <div className="flex items-center gap-2 pl-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" />
          <span
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400"
            style={{ animationDelay: "0.2s" }}
          />
          <span
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400"
            style={{ animationDelay: "0.4s" }}
          />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {prompts.map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            onClick={() => setMessage(label)}
            className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs text-gray-300 transition-colors duration-300 hover:border-blue-500 hover:text-blue-400"
          >
            <Icon size={12} />
            {label}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask your AI assistant..."
          className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors duration-300 focus:border-blue-500"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          <Send size={16} />
        </button>
      </form>
    </motion.div>
  );
}

export default AIAssistant;