// src/components/Dashboard/StatsGrid.jsx

import {
  Bot,
  FileText,
  Map,
  FileUser,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";

function StatsGrid({ stats }) {
  const data = {
    notes: Number(stats?.notes ?? 0),
    aiSessions: Number(stats?.aiSessions ?? 0),
    roadmaps: Number(stats?.roadmaps ?? 0),
    resumes: Number(stats?.resumes ?? 0),
    internshipApplications: Number(
      stats?.internshipApplications ?? 0
    ),
  };

  const items = [
    {
      icon: Bot,
      label: "AI Questions",
      value: data.aiSessions,
      description:
        data.aiSessions > 0
          ? "Questions asked to CampusHub AI"
          : "Ask CampusHub AI to get started",
      route: "/ai-assistant",
    },

    {
      icon: Map,
      label: "Roadmaps",
      value: data.roadmaps,
      description:
        data.roadmaps > 0
          ? "Career roadmaps created"
          : "Create your first roadmap",
      route: "/skill-roadmap",
    },

    {
      icon: FileUser,
      label: "Resumes",
      value: data.resumes,
      description:
        data.resumes > 0
          ? "Resume created"
          : "Build your professional resume",
      route: "/resume-builder",
    },

    {
      icon: FileText,
      label: "Notes",
      value: data.notes,
      description:
        data.notes > 0
          ? "Notes added to your account"
          : "Start building your notes",
      route: "/notes",
    },

    {
      icon: Briefcase,
      label: "Internships",
      value: data.internshipApplications,
      description:
        data.internshipApplications > 0
          ? "Applications submitted"
          : "Explore internship opportunities",
      route: "/internship-finder",
    },
  ];

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Progress Snapshot
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Your CampusHub activity and career progress
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.07,
              }}
              className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-slate-900"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 transition group-hover:scale-105">
                <Icon size={19} />
              </div>

              <h3 className="text-2xl font-bold tracking-tight">
                {item.value}
              </h3>

              <p className="mt-1 text-sm font-semibold text-gray-200">
                {item.label}
              </p>

              <p className="mt-1 min-h-[32px] text-[11px] leading-4 text-gray-500">
                {item.description}
              </p>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(
                      item.value * 20,
                      100
                    )}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.07,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default StatsGrid;