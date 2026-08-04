// src/components/Dashboard/StatsGrid.jsx
import { useEffect, useRef, useState } from "react";
import { Bot, BookOpen, FileText, Briefcase } from "lucide-react";
import { motion, useInView } from "framer-motion";

const stats = [
  { icon: Bot, value: 128, label: "AI Sessions" },
  { icon: BookOpen, value: 42, label: "Notes Created" },
  { icon: FileText, value: 87, label: "Resume Score", suffix: "%" },
  { icon: Briefcase, value: 9, label: "Internships Applied" },
];

function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frameId;
    const start = performance.now();
    const duration = 900;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <Icon size={18} />
            </div>
            <p className="text-2xl font-bold text-blue-400 sm:text-3xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

export default StatsGrid;