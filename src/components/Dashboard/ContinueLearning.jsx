// src/components/Dashboard/ContinueLearning.jsx

import {
  ArrowRight,
  BookOpen,
  PlayCircle,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ContinueLearning({ learning }) {
  const navigate = useNavigate();

  // ==========================================================
  // CHECK LEARNING DATA
  // ==========================================================

  const hasLearning =
    learning &&
    typeof learning === "object" &&
    learning.career;

  // ==========================================================
  // LEARNING DATA
  // ==========================================================

  const career =
    learning?.career || "";

  const level =
    learning?.level || "Beginner";

  const progress = Math.min(
    100,
    Math.max(
      0,
      Number(learning?.progress ?? 0)
    )
  );

  // ==========================================================
  // ROADMAP ROUTE
  // ==========================================================

  const handleContinue = () => {
    navigate("/skill-roadmap");
  };

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <section>

      {/* ======================================================
          HEADER
      ======================================================= */}

      <div className="mb-4 flex items-end justify-between">

        <div>

          <p className="text-xs uppercase tracking-wider text-cyan-400">
            Learning
          </p>

          <h3 className="mt-1 text-xl font-bold">
            {hasLearning
              ? "Continue your roadmap"
              : "Your next learning move"}
          </h3>

        </div>

        {hasLearning && (
          <span className="text-xs text-gray-500">
            {progress}% complete
          </span>
        )}

      </div>


      {/* ======================================================
          CARD
      ======================================================= */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
      >

        {hasLearning ? (
          <>

            {/* =================================================
                ROADMAP HEADER
            ================================================= */}

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/10 text-cyan-400">
                <BookOpen size={22} />
              </div>


              <div className="min-w-0 flex-1">

                <p className="text-xs uppercase tracking-wider text-gray-500">
                  Active Roadmap
                </p>

                <h4 className="mt-1 text-lg font-semibold">
                  {career}
                </h4>

                <p className="mt-1 text-sm text-gray-400">
                  {level} learning roadmap
                </p>

              </div>


              <Sparkles
                size={18}
                className="shrink-0 text-cyan-400"
              />

            </div>


            {/* =================================================
                PROGRESS
            ================================================= */}

            <div className="mt-6">

              <div className="mb-2 flex justify-between text-xs">

                <span className="text-gray-500">
                  Roadmap Progress
                </span>

                <span className="font-semibold text-cyan-400">
                  {progress}%
                </span>

              </div>


              <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                />

              </div>

            </div>


            {/* =================================================
                STATUS
            ================================================= */}

            <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/50 p-4">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium">
                    {progress === 100
                      ? "Roadmap completed 🎉"
                      : progress > 0
                      ? "Keep going"
                      : "Ready to start"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {progress === 100
                      ? "You completed this learning roadmap."
                      : progress > 0
                      ? "Continue your roadmap and build your skills."
                      : "Start your roadmap to begin learning."}
                  </p>

                </div>

                <span className="text-xs font-semibold text-cyan-400">
                  {level}
                </span>

              </div>

            </div>


            {/* =================================================
                ACTION
            ================================================= */}

            <button
              type="button"
              onClick={handleContinue}
              className="mt-6 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold transition hover:scale-[1.02]"
            >

              {progress === 100
                ? "View Roadmap"
                : "Continue Roadmap"}

              <ArrowRight size={16} />

            </button>

          </>
        ) : (

          /* ===================================================
             EMPTY STATE
          ==================================================== */

          <div className="flex flex-col items-center py-6 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
              <PlayCircle size={28} />
            </div>

            <h4 className="mt-4 text-lg font-semibold">
              No active roadmap
            </h4>

            <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
              Create a skill roadmap and CampusHub AI will track
              your learning progress here.
            </p>

            <button
              type="button"
              onClick={() => navigate("/skill-roadmap")}
              className="mt-5 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-semibold transition hover:scale-[1.02]"
            >
              Create Roadmap
              <ArrowRight size={16} />
            </button>

          </div>

        )}

      </motion.div>

    </section>
  );
}

export default ContinueLearning;