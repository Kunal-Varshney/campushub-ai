// src/components/Dashboard/StatsGrid.jsx

import {
  BookOpen,
  Target,
  Flame,
  Trophy,
} from "lucide-react";

import { motion } from "framer-motion";

const defaultStats = {
  learningProgress: 0,
  skillsCompleted: 0,
  totalSkills: 8,
  streak: 0,
  achievements: 0,
  goalsCompleted: 0,
  totalGoals: 8,
};

function StatsGrid({ stats, learning, overview }) {
  // ============================================================
  // BACKEND STATS
  // Backend now sends stats as an OBJECT
  // ============================================================

  const backendStats =
    stats &&
    typeof stats === "object"
      ? stats
      : {};

  const getBackendValue = (key) => {
    return Number(
      backendStats?.[key] ?? 0
    );
  };

  // ============================================================
  // LEARNING DATA
  // ============================================================

  const learningProgress = Math.min(
    100,
    Math.max(
      0,
      Number(
        learning?.progress ??
          learning?.completion ??
          0
      )
    )
  );

  const totalSkills =
    Number(
      learning?.totalSteps ??
        defaultStats.totalSkills
    ) || defaultStats.totalSkills;

  const skillsCompleted =
    Number(
      learning?.completedSteps ?? 0
    );

  // ============================================================
  // BACKEND OVERVIEW
  // ============================================================

  const aiQuestions = Number(
    overview?.aiQuestions ??
      getBackendValue("aiQuestions")
  );

  const notes = Number(
    overview?.notes ??
      getBackendValue("notes")
  );

  const internships = Number(
    overview?.internships ??
      getBackendValue("internships")
  );

  const certificates = Number(
    overview?.certificates ??
      getBackendValue("certificates")
  );

  // ============================================================
  // CURRENT DASHBOARD DATA
  // ============================================================

  const data = {
    ...defaultStats,

    learningProgress,

    skillsCompleted,

    totalSkills,

    streak: Number(
      overview?.streak ??
        backendStats?.streak ??
        0
    ),

    achievements: Number(
      overview?.achievements ??
        backendStats?.achievements ??
        certificates
    ),

    goalsCompleted: Number(
      overview?.goalsCompleted ??
        backendStats?.goalsCompleted ??
        skillsCompleted
    ),

    totalGoals: Number(
      overview?.totalGoals ??
        backendStats?.totalGoals ??
        totalSkills
    ),

    aiQuestions,
    notes,
    internships,
    certificates,
  };

  // ============================================================
  // CARDS
  // ============================================================

  const items = [
    {
      icon: BookOpen,
      label: "Learning Progress",
      value: `${data.learningProgress}%`,
      description:
        learningProgress > 0
          ? `${data.skillsCompleted}/${data.totalSkills} roadmap steps completed`
          : "Start your learning journey",
      progress: data.learningProgress,
    },

    {
      icon: Target,
      label: "Skills",
      value: `${data.skillsCompleted}/${data.totalSkills}`,
      description:
        data.skillsCompleted > 0
          ? "Skills developed"
          : "Start completing roadmap skills",
      progress:
        data.totalSkills > 0
          ? (data.skillsCompleted /
              data.totalSkills) *
            100
          : 0,
    },

    {
      icon: Flame,
      label: "Learning Streak",
      value: `${data.streak} Days`,
      description:
        data.streak > 0
          ? "Keep your momentum going"
          : "Start your streak today",
      progress: Math.min(
        (data.streak / 30) * 100,
        100
      ),
    },

    {
      icon: Trophy,
      label: "Achievements",
      value: `${data.achievements}`,
      description:
        data.achievements > 0
          ? "Achievements unlocked"
          : "Complete goals to unlock achievements",
      progress: Math.min(
        data.achievements * 10,
        100
      ),
    },
  ];

  // ============================================================
  // UI
  // ============================================================

  return (
    <section>
      {/* HEADER */}

      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Progress Snapshot
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Your current learning and career progress
          </p>
        </div>

        {/* BACKEND SUMMARY */}

        <div className="hidden text-right sm:block">
          <p className="text-[11px] text-gray-500">
            CampusHub Activity
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {aiQuestions} AI questions •{" "}
            {notes} notes •{" "}
            {internships} internships
          </p>
        </div>
      </div>

      {/* CARDS */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = item.icon;

          const progress = Math.min(
            Math.max(
              Number(item.progress) || 0,
              0
            ),
            100
          );

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
              className="
                group
                rounded-2xl
                border
                border-slate-800
                bg-slate-900/70
                p-5
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-500/30
                hover:bg-slate-900
              "
            >
              {/* ICON */}

              <div
                className="
                  mb-5
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-500/10
                  text-cyan-400
                  transition
                  group-hover:scale-105
                "
              >
                <Icon size={19} />
              </div>

              {/* VALUE */}

              <h3 className="text-2xl font-bold tracking-tight">
                {item.value}
              </h3>

              {/* LABEL */}

              <p className="mt-1 text-sm font-semibold text-gray-200">
                {item.label}
              </p>

              {/* DESCRIPTION */}

              <p className="mt-1 text-[11px] leading-4 text-gray-500">
                {item.description}
              </p>

              {/* PROGRESS */}

              <div className="mt-4">
                <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${progress}%`,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.07,
                    }}
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-blue-600
                      to-cyan-400
                    "
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default StatsGrid;