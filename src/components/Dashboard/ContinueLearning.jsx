import { ArrowRight, BookOpen, PlayCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ContinueLearning({ learning }) {
  const navigate = useNavigate();

  const hasLearning =
    learning &&
    typeof learning === "object" &&
    (
      learning.title ||
      learning.name ||
      learning.course ||
      learning.progress !== undefined
    );

  const title =
    learning?.title ||
    learning?.name ||
    learning?.course ||
    "Start your learning journey";

  const progress = Math.min(
    100,
    Math.max(
      0,
      Number(learning?.progress ?? learning?.completion ?? 0)
    )
  );

  const route = learning?.route || "/discover";

  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-cyan-400">
            Learning
          </p>

          <h3 className="mt-1 text-xl font-bold">
            {hasLearning ? "Continue where you left off" : "Your next learning move"}
          </h3>
        </div>

        {hasLearning && (
          <span className="text-xs text-gray-500">
            {progress}% complete
          </span>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
      >
        {hasLearning ? (
          <>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/10 text-cyan-400">
                <BookOpen size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-wider text-gray-500">
                  In Progress
                </p>

                <h4 className="mt-1 truncate text-lg font-semibold">
                  {title}
                </h4>

                <p className="mt-1 text-sm text-gray-400">
                  Pick up from where you stopped.
                </p>
              </div>

              <Sparkles
                size={18}
                className="shrink-0 text-cyan-400"
              />
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs">
                <span className="text-gray-500">
                  Progress
                </span>

                <span className="font-semibold text-cyan-400">
                  {progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate(route)}
              className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold transition hover:scale-[1.02]"
            >
              Continue Learning
              <ArrowRight size={16} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
              <PlayCircle size={28} />
            </div>

            <h4 className="mt-4 text-lg font-semibold">
              Nothing in progress yet
            </h4>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
              Start a learning path and CampusHub AI will remember your progress
              and help you decide what to learn next.
            </p>

            <button
              type="button"
              onClick={() => navigate("/discover")}
              className="mt-5 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold transition hover:scale-[1.02]"
            >
              Explore Learning
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}

export default ContinueLearning;