import {
  Bot,
  FileText,
  Briefcase,
  Target,
  Users,
  Mic,
  ArrowUpRight,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    icon: Bot,
    title: "Ask AI",
    description: "Get help with your career, study or coding.",
    route: "/ai-assistant",
  },
  {
    icon: Target,
    title: "Skill Roadmap",
    description: "See what skill you should build next.",
    route: "/skill-roadmap",
  },
  {
    icon: Briefcase,
    title: "Find Internships",
    description: "Discover opportunities matching your skills.",
    route: "/internship-finder",
  },
  {
    icon: FileText,
    title: "Build Resume",
    description: "Create and improve your professional resume.",
    route: "/resume-builder",
  },
  {
    icon: Mic,
    title: "Mock Interview",
    description: "Practice before your next interview.",
    route: "/mock-interview",
  },
  {
    icon: Users,
    title: "Community",
    description: "Learn, ask and connect with other students.",
    route: "/community",
  },
];

function QuickAccess() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="mb-4">
        <p className="text-xs uppercase tracking-wider text-gray-500">
          Explore CampusHub
        </p>

        <h3 className="mt-1 text-xl font-bold">
          Everything you need, one move away
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.route}
              type="button"
              onClick={() => navigate(item.route)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-left transition hover:border-cyan-500/40 hover:bg-slate-900"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Icon size={17} />
                </div>

                <ArrowUpRight
                  size={15}
                  className="text-gray-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-400"
                />
              </div>

              <p className="mt-4 text-sm font-semibold">
                {item.title}
              </p>

              <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-gray-500">
                {item.description}
              </p>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

export default QuickAccess;