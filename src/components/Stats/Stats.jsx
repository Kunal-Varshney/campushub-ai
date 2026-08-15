import {
  Users,
  Sparkles,
  BookOpen,
  BriefcaseBusiness,
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    value: "10K+",
    label: "Students",
    description: "Students building their future",
    icon: Users,
  },
  {
    value: "20+",
    label: "AI-Powered Tools",
    description: "Smart tools for student growth",
    icon: Sparkles,
  },
  {
    value: "5K+",
    label: "Learning Resources",
    description: "Notes, roadmaps and career resources",
    icon: BookOpen,
  },
  {
    value: "1K+",
    label: "Career Opportunities",
    description: "Internships and career opportunities",
    icon: BriefcaseBusiness,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function Stats() {
  return (
    <section
      id="stats"
      className="relative overflow-hidden bg-slate-950 py-24 text-white"
      aria-labelledby="stats-heading"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Grid Background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
            <Sparkles size={16} />
            CampusHub AI in Numbers
          </div>

          <h2
            id="stats-heading"
            className="text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Built for the{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Next Generation
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            Everything students need to learn, build skills, discover
            opportunities and move confidently toward their careers.
          </p>

        </div>


        {/* Stats Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={containerVariants}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-7 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-blue-500/10"
              >

                {/* Hover Glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />


                {/* Icon */}
                <div className="relative mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={22} />
                </div>


                {/* Number */}
                <h3 className="relative text-4xl font-extrabold tracking-tight">
                  {stat.value}
                </h3>


                {/* Label */}
                <p className="relative mt-2 text-base font-semibold text-white">
                  {stat.label}
                </p>


                {/* Description */}
                <p className="relative mt-2 text-sm leading-6 text-gray-500">
                  {stat.description}
                </p>

              </motion.div>
            );
          })}

        </motion.div>

      </div>
    </section>
  );
}

export default Stats;