// src/components/Dashboard/QuickAccess.jsx
import { Bot, FileText, BookOpen, Target, Mic, Award, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Bot, title: "AI Assistant", description: "Get instant study help" },
  { icon: FileText, title: "Resume Builder", description: "Build with AI suggestions" },
  { icon: BookOpen, title: "Smart Notes", description: "Create and share notes" },
  { icon: Target, title: "Roadmap", description: "Track your skill growth" },
  { icon: Mic, title: "Interview Practice", description: "Practice mock interviews" },
  { icon: Award, title: "Certificates", description: "View your achievements" },
  { icon: Briefcase, title: "Internships", description: "Find new opportunities" },
];

function QuickAccess() {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Quick Access</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.title}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group flex flex-col items-start rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Icon size={18} />
              </div>
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="mt-1 text-xs text-gray-400">{item.description}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickAccess;