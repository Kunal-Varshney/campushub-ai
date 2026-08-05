import { Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getLastVisited } from "../../utils/lastVisited";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContinueLearning() {
  const navigate = useNavigate();
  const [lastVisited] = useState(
    getLastVisited()
  );

  // useEffect(() => {
  //   const visited = getLastVisited();
  //   setLastVisited(visited);
  // }, []);

  const pageData = {
    "/internship-finder": {
      title: "Internship Finder",
      subtitle: "AI matched internships available",
      time: "Explore new opportunities",
    },
    "/skill-roadmap": {
      title: "Skill Roadmap",
      subtitle: "Continue your learning journey",
      time: "Track your progress",
    },
    "/ai-assistant": {
      title: "AI Assistant",
      subtitle: "Ask AI and solve your doubts",
      time: "Continue conversation",
    },
  };

  const current = pageData[lastVisited] || {
    title: "Data Structures & Algorithms",
    subtitle: "Module 4: Trees & Graphs",
    time: "25 min left",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <h3 className="mb-4 text-lg font-semibold">
        Continue Learning
      </h3>

      <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">

        <p className="text-sm font-semibold">
          {current.title}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {current.subtitle}
        </p>

        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
        </div>

        <div className="mt-4 flex items-center justify-between">

          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Clock size={14} />
            {current.time}
          </div>

          <button
            onClick={() => lastVisited && navigate(lastVisited)}
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