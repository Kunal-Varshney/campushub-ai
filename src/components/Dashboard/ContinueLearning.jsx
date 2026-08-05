
import { Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function ContinueLearning() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <h3 className="mb-4 text-lg font-semibold">Continue Learning</h3>

      <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
        <p className="text-sm font-semibold">Data Structures & Algorithms</p>
        <p className="mt-1 text-xs text-gray-400">Module 4: Trees & Graphs</p>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock size={14} />
            25 min left
          </div>

          <button
            type="button"
            className="group flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-semibold transition-transform duration-300 hover:-translate-y-0.5 active:scale-95"
          >
            Continue
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ContinueLearning;