// src/components/Dashboard/RecentActivity.jsx

import {
  Bot,
  BookOpen,
  FileText,
  Clock,
  Briefcase,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Award,
  Bell,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ============================================================
// ACTIVITY ICON
// ============================================================

function getActivityIcon(type) {
  switch (type) {
    case "ai":
      return Bot;

    case "notes":
    case "note":
      return FileText;

    case "internship":
      return Briefcase;

    case "course":
    case "learning":
    case "roadmap":
      return BookOpen;

    case "completed":
    case "achievement":
      return CheckCircle2;

    case "certificate":
      return Award;

    case "notification":
      return Bell;

    default:
      return Clock;
  }
}

// ============================================================
// FORMAT TIME
// ============================================================

function formatTime(value) {
  if (!value) {
    return "Recently";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString([], {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ============================================================
// RECENT ACTIVITY
// ============================================================

function RecentActivity({ activities }) {
  const navigate = useNavigate();

  const hasActivities =
    Array.isArray(activities) &&
    activities.length > 0;

  // ==========================================================
  // HANDLE ACTIVITY CLICK
  // ==========================================================

  const handleActivityClick = (item) => {
    if (item?.link) {
      navigate(item.link);
    }
  };

  return (
    <section>
      {/* ======================================================
          HEADER
      ======================================================= */}

      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500">
            Activity
          </p>

          <h3 className="mt-1 text-xl font-bold">
            Your recent moves
          </h3>
        </div>

        {hasActivities && (
          <span className="text-xs text-gray-500">
            {Math.min(activities.length, 10)} recent
          </span>
        )}
      </div>

      {/* ======================================================
          ACTIVITY CARD
      ======================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
      >
        {hasActivities ? (
          <div className="space-y-2">
            {activities.slice(0, 10).map((item, index) => {
              const Icon = getActivityIcon(
                item?.type
              );

              const activityId =
                item?.id ||
                item?._id ||
                `activity-${index}`;

              // Backend sends `description`.
              // Old frontend data may still send `message`.
              const description =
                item?.description ||
                item?.message ||
                "CampusHub activity";

              // Backend sends `createdAt`.
              // Old frontend may still send `time`.
              const activityTime =
                item?.createdAt ||
                item?.time;

              const hasLink =
                Boolean(item?.link);

              return (
                <motion.button
                  key={activityId}
                  type="button"
                  onClick={() =>
                    handleActivityClick(item)
                  }
                  disabled={!hasLink}
                  initial={{
                    opacity: 0,
                    x: -8,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                  className={`
                    group
                    flex
                    w-full
                    items-center
                    gap-4
                    rounded-xl
                    border
                    border-transparent
                    bg-slate-950/40
                    p-3
                    text-left
                    transition
                    ${
                      hasLink
                        ? "cursor-pointer hover:border-slate-700 hover:bg-slate-950/70"
                        : "cursor-default"
                    }
                  `}
                >
                  {/* ==================================================
                      ICON
                  =================================================== */}

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-500/10
                      text-cyan-400
                    "
                  >
                    <Icon size={17} />
                  </div>

                  {/* ==================================================
                      CONTENT
                  =================================================== */}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-200">
                      {item?.title || "Activity"}
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {description}
                    </p>

                    <p className="mt-1 text-[10px] text-gray-600">
                      {formatTime(activityTime)}
                    </p>
                  </div>

                  {/* ==================================================
                      ARROW
                  =================================================== */}

                  {hasLink && (
                    <ArrowRight
                      size={15}
                      className="
                        shrink-0
                        text-gray-700
                        transition
                        group-hover:translate-x-1
                        group-hover:text-cyan-400
                      "
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        ) : (
          /* ====================================================
             EMPTY STATE
          ===================================================== */

          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
              <Sparkles size={26} />
            </div>

            <h4 className="mt-4 text-lg font-semibold">
              Your journey starts here
            </h4>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
              Use AI Assistant, create a roadmap,
              build your resume or explore
              internships. Your important actions
              will appear here.
            </p>
          </div>
        )}
      </motion.div>
    </section>
  );
}

export default RecentActivity;