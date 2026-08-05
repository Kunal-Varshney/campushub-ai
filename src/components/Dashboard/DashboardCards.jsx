import { useNavigate } from "react-router-dom";
import { ArrowRight, Flame } from "lucide-react";
import { motion } from "framer-motion";

function DashboardCards() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-blue-600/20 via-slate-900/70 to-cyan-500/10 p-8 shadow-xl shadow-black/20 backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Welcome back, Student 👋
          </h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-300 sm:text-base">
            You're building strong momentum — keep going, one focused session
            at a time.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <Flame size={18} className="text-cyan-400" />
            <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-800 sm:w-56">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
            </div>
            <span className="text-sm text-gray-400">75% today</span>
          </div>
        </div>

        <button
          type="button"
          className="group flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30 active:scale-95"
        >
          Continue Learning
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </motion.div>
  );
}

export default DashboardCards;