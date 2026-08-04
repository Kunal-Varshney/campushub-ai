import { useNavigate } from "react-router-dom";
import {
  Brain,
  BookOpen,
  Users,
  Briefcase,
  FileText,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    route: "ai-assistant",
    icon: Brain,
    title: "AI Study Assistant",
    description:
      "Get instant answers and personalized learning support using artificial intelligence.",
  },
  {
    route: "smart-notes",
    icon: BookOpen,
    title: "Smart Notes Sharing",
    description:
      "Create, share and access quality notes with students across campuses.",
  },
  {
    route: "community",
    icon: Users,
    title: "Campus Community",
    description:
      "Connect with students and collaborate with your campus community.",
  },
  {
    route: "internship-finder",
    icon: Briefcase,
    title: "Internship Finder",
    description:
      "Discover internships and career opportunities based on your skills.",
  },
  {
    route: "ai-resume-builder",
    icon: FileText,
    title: "AI Resume Builder",
    description: "Build professional resumes with AI-powered suggestions.",
  },
  {
    route: "skill-roadmap",
    icon: Target,
    title: "Skill Roadmap",
    description:
      "Follow a personalized roadmap to improve your technical skills.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" },
  }),
};

function Features() {
  const navigate = useNavigate();
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-slate-950 py-24 text-white"
    >
      {/* Background glow — same language as Hero */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-600/20 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-purple-600/20 blur-[110px]" />

      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400 backdrop-blur">
            <Sparkles size={16} />
            AI Powered Features
          </div>

          <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Powerful Features{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              For Students
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Everything students need to learn smarter, connect better and
            grow faster.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.route}
                id={item.route}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                className="group relative flex h-full scroll-mt-32 flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                {/* Corner glow — hidden until hover */}
                <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex h-full flex-col">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-blue-400/20 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Icon size={26} />
                  </div>

                  <h3 className="mb-3 text-xl font-semibold leading-snug">
                    {item.title}
                  </h3>

                  <p className="flex-1 text-base leading-relaxed text-gray-400">
                    {item.description}
                  </p>

                  <div className="mt-8 border-t border-slate-800 pt-6">
                    <button
                      type="button"
                      onClick={() => navigate(item.route)}
                      aria-label={`Learn more about ${item.title}`}
                      className="group/cta inline-flex w-fit items-center gap-2 rounded-lg text-sm font-semibold text-blue-400 transition-colors duration-300 hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      Learn More
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover/cta:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;