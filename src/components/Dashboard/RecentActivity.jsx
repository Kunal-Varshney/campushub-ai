// src/components/Dashboard/RecentActivity.jsx
import { FileText, BookOpen, Bot, Briefcase, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const activities = [
  { icon: FileText, text: "Resume Updated", time: "2 hours ago" },
  { icon: BookOpen, text: "Notes Created — DBMS Unit 3", time: "5 hours ago" },
  { icon: Bot, text: "AI Chat Completed", time: "Yesterday" },
  { icon: Briefcase, text: "Applied to Internship at Acme Corp", time: "2 days ago" },
  { icon: CheckCircle2, text: "Completed Quiz — OOP Basics", time: "3 days ago" },
];

function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <h3 className="mb-5 text-lg font-semibold">Recent Activity</h3>

      <ol className="relative space-y-6 border-l border-slate-800 pl-6">
        {activities.map(({ icon: Icon, text, time }) => (
          <li key={text} className="relative">
            <span className="absolute -left-[29px] flex h-6 w-6 items-center justify-center rounded-full border border-blue-400/30 bg-gradient-to-r from-blue-600 to-cyan-500">
              <Icon size={12} />
            </span>
            <p className="text-sm font-medium text-gray-200">{text}</p>
            <p className="text-xs text-gray-500">{time}</p>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

export default RecentActivity;