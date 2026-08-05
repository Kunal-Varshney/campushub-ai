import { Mic, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function MockInterview() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-28 text-white sm:px-10 lg:px-20">

      <div className="mx-auto max-w-5xl text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600">
            <Mic className="h-8 w-8 text-white" />
          </div>

          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
            AI Mock Interview
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Practice interviews with AI and improve your communication,
            technical skills and confidence.
          </p>

        </motion.div>


        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/50 p-10 backdrop-blur-xl"
        >

          <Sparkles className="mx-auto h-10 w-10 text-cyan-400" />

          <h2 className="mt-4 text-2xl font-semibold">
            Interview Simulator Coming Soon
          </h2>

          <p className="mt-3 text-slate-400">
            AI powered mock interviews, instant feedback and improvement
            suggestions will be available here.
          </p>

        </motion.div>

      </div>

    </div>
  );
}

export default MockInterview;