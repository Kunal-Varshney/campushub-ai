import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../services/api";
import {
  Brain,
  Target,
  Eye,
  Sparkles,
  BookOpen,
  Briefcase,
  Users,
  Map,
  FileText,
  ArrowRight,
  CheckCircle2,
  Lock,
} from "lucide-react";

// ============================================================
// DEFAULT / FALLBACK DATA
// ============================================================

const defaultFeatures = [
  {
    icon: Brain,
    title: "AI Study Assistant",
    description:
      "Get instant explanations, summaries, study guidance, and personalized learning support powered by AI.",
    route: "/ai-assistant",
    tag: "AI Powered",
  },
  {
    icon: BookOpen,
    title: "Smart Notes",
    description:
      "Create, organize, discover, and share useful academic notes with students across campuses.",
    route: "/smart-notes",
    tag: "Learning",
  },
  {
    icon: Briefcase,
    title: "Internship Finder",
    description:
      "Discover internship opportunities based on your skills, interests, career goals, and profile.",
    route: "/internship-finder",
    tag: "Career",
  },
  {
    icon: Map,
    title: "Skill & Career Roadmap",
    description:
      "Get a structured roadmap to build the skills required for your target career and become job-ready.",
    route: "/skill-roadmap",
    tag: "Career Growth",
  },
  {
    icon: Users,
    title: "Student Community",
    description:
      "Connect with students, share knowledge, participate in discussions, and grow together.",
    route: "/community",
    tag: "Community",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    description:
      "Create a professional resume, improve your profile, and prepare yourself for career opportunities.",
    route: "/resume-builder",
    tag: "Career Tools",
  },
];

// ============================================================
// DEFAULT PLATFORM GOALS
// ============================================================

const defaultPlatformGoals = [
  {
    title: "Learn",
    description: "Build skills faster with intelligent learning tools.",
  },
  {
    title: "Discover",
    description:
      "Find internships and opportunities that match your goals.",
  },
  {
    title: "Connect",
    description:
      "Learn and collaborate with a growing student community.",
  },
  {
    title: "Achieve",
    description:
      "Turn your skills and knowledge into career opportunities.",
  },
];

// ============================================================
// DEFAULT AI EDUCATION POINTS
// ============================================================

const defaultAiEducationPoints = [
  "Personalized learning assistance",
  "Career-focused guidance",
  "Smart academic resources",
  "Opportunity discovery",
];

// ============================================================
// COMPONENT
// ============================================================

function About() {
  const navigate = useNavigate();

  // ============================================================
  // ABOUT DATA STATE
  // ============================================================

  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // FETCH ABOUT DATA
  // ============================================================

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/about");

        if (response.data.success) {
          setAboutData(response.data.data);
        } else {
          setError("Failed to load About page data.");
        }
      } catch (err) {
        console.error("Failed to fetch About data:", err);
        setError("Failed to load About page data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // ============================================================
  // FEATURE ACCESS
  // ============================================================

  const handleFeatureAccess = (route) => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate(route);
    } else {
      navigate("/login", {
        state: {
          from: route,
        },
      });
    }
  };

  // ============================================================
  // SIGNUP
  // ============================================================

  const handleGetStarted = () => {
    navigate("/signup");
  };

  // ============================================================
  // LOADING STATE
  // ============================================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 text-white">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />

          <p className="text-sm text-slate-400 sm:text-base">
            Loading About CampusHub AI...
          </p>
        </div>
      </main>
    );
  }

  // ============================================================
  // ERROR STATE
  // ============================================================

  if (error || !aboutData) {
    return (
      <main className="flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 sm:px-6 text-white">
        <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-slate-900 p-6 text-center sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400">
            !
          </div>

          <h2 className="mt-5 text-xl font-bold sm:text-2xl">
            Unable to Load About Page
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
            {error || "About page data is not available."}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-500 sm:w-auto"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // ============================================================
  // DYNAMIC DATA
  // ============================================================

  const features =
    aboutData.features?.length > 0
      ? aboutData.features.map((item, index) => ({
          ...item,
          icon: defaultFeatures[index]?.icon || Brain,
        }))
      : defaultFeatures;

  const platformGoals =
    aboutData.platformGoals?.length > 0
      ? aboutData.platformGoals
      : defaultPlatformGoals;

  const aiEducationPoints =
    aboutData.aiEducationPoints?.length > 0
      ? aboutData.aiEducationPoints
      : defaultAiEducationPoints;

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-slate-950 text-white">
      {/* ======================================================
          HERO SECTION
      ====================================================== */}

      <section className="relative overflow-hidden py-16 sm:py-20 md:py-32">
        {/* Background Glow */}

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[-80px] top-20 h-56 w-56 rounded-full bg-indigo-600/20 blur-[110px] sm:left-10 sm:h-72 sm:w-72 sm:blur-[140px]" />

          <div className="absolute bottom-10 right-[-80px] h-56 w-56 rounded-full bg-blue-500/20 blur-[110px] sm:right-10 sm:h-72 sm:w-72 sm:blur-[140px]" />

          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px] sm:h-96 sm:w-96 sm:blur-[160px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}

            <div className="mx-auto mb-7 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-2 text-xs leading-5 text-indigo-300 backdrop-blur sm:mb-8 sm:px-5 sm:text-sm">
              <Sparkles size={16} className="shrink-0 sm:h-[18px] sm:w-[18px]" />

              <span>
                Empowering Students With Artificial Intelligence
              </span>
            </div>

            {/* Heading */}

            <h1 className="break-words text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-7xl">
              {aboutData.title}

              <span className="mt-1 block break-words bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent sm:mt-2">
                {aboutData.subtitle}
              </span>
            </h1>

            {/* Description */}

            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-400 sm:mt-8 sm:text-lg sm:leading-relaxed md:text-xl">
              {aboutData.description}
            </p>

            {/* CTA */}

            <div className="mx-auto mt-8 flex w-full max-w-md flex-col justify-center gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:gap-4">
              <button
                onClick={handleGetStarted}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-500/30 sm:w-auto sm:px-7"
              >
                Get Started

                <ArrowRight size={18} />
              </button>

              <a
                href="#features"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-3.5 font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 sm:w-auto sm:px-7"
              >
                Explore Features

                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}

      <div className="flex justify-center px-4">
        <div className="h-1 w-20 rounded-full bg-indigo-500 opacity-70 sm:w-24" />
      </div>

      {/* ======================================================
          WHO WE ARE
      ====================================================== */}

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:gap-14 sm:px-6 lg:grid-cols-2">
          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="min-w-0"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 sm:text-sm sm:tracking-widest">
              Who We Are
            </span>

            <h2 className="mt-3 break-words text-3xl font-bold leading-tight sm:mt-4 sm:text-4xl md:text-5xl">
              {aboutData.whoWeAreTitle}
            </h2>

            <p className="mt-6 text-sm leading-7 text-slate-400 sm:mt-8 sm:text-base sm:leading-8">
              {aboutData.whoWeAreDescription}
            </p>

            <p className="mt-5 text-sm leading-7 text-slate-400 sm:mt-6 sm:text-base sm:leading-8">
              {aboutData.whoWeAreSecondaryDescription}
            </p>

            {/* Goals */}

            <div className="mt-7 grid grid-cols-1 gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
              {platformGoals.map((item, index) => (
                <div
                  key={index}
                  className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 sm:p-5"
                >
                  <CheckCircle2
                    size={21}
                    className="text-indigo-400"
                  />

                  <h3 className="mt-3 break-words font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="min-w-0 rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10 sm:p-8 md:p-10"
          >
            <Brain
              size={48}
              className="mb-5 text-indigo-400 sm:mb-6 sm:h-[58px] sm:w-[58px]"
            />

            <h3 className="break-words text-2xl font-semibold sm:text-3xl">
              {aboutData.aiEducationTitle}
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:mt-5 sm:text-base sm:leading-8">
              {aboutData.aiEducationDescription}
            </p>

            <div className="mt-6 space-y-4 sm:mt-8">
              {aiEducationPoints.map((item, index) => (
                <div
                  key={index}
                  className="flex min-w-0 items-start gap-3 text-sm leading-6 text-slate-300"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-1 shrink-0 text-indigo-400"
                  />

                  <span className="min-w-0 break-words">
                    {typeof item === "string"
                      ? item
                      : item.text || item.title || ""}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          MISSION & VISION
      ====================================================== */}

      <section className="bg-slate-900/30 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:gap-10 sm:px-6 md:grid-cols-2">
          {/* Mission */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="min-w-0 rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500 sm:p-8 md:p-10"
          >
            <Target
              size={42}
              className="mb-5 text-indigo-400 sm:mb-6 sm:h-12 sm:w-12"
            />

            <h3 className="text-2xl font-bold sm:text-3xl">
              Our Mission
            </h3>

            <p className="mt-5 text-sm leading-7 text-slate-400 sm:mt-6 sm:text-base sm:leading-8">
              {aboutData.mission}
            </p>
          </motion.div>

          {/* Vision */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="min-w-0 rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500 sm:p-8 md:p-10"
          >
            <Eye
              size={42}
              className="mb-5 text-indigo-400 sm:mb-6 sm:h-12 sm:w-12"
            />

            <h3 className="text-2xl font-bold sm:text-3xl">
              Our Vision
            </h3>

            <p className="mt-5 text-sm leading-7 text-slate-400 sm:mt-6 sm:text-base sm:leading-8">
              {aboutData.vision}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          6 MAJOR FEATURES
      ====================================================== */}

      <section
        id="features"
        className="scroll-mt-20 py-16 sm:py-20 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Heading */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 sm:text-sm sm:tracking-widest">
              The CampusHub AI Ecosystem
            </span>

            <h2 className="mt-3 break-words text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Everything Students Need

              <span className="block text-indigo-400">
                In One Platform
              </span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:mt-5 sm:text-base sm:leading-7">
              From learning and notes to internships, career planning,
              community, and professional tools — CampusHub AI brings
              your student journey together.
            </p>
          </div>

          {/* Feature Grid */}

          <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  viewport={{
                    once: true,
                  }}
                  className="group relative flex min-w-0 flex-col rounded-3xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/60 hover:shadow-xl hover:shadow-indigo-500/10 sm:p-7"
                >
                  {/* Tag */}

                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
                      <Icon size={25} className="sm:h-7 sm:w-7" />
                    </div>

                    <span className="max-w-[55%] shrink-0 break-words rounded-full border border-slate-700 bg-slate-950 px-2.5 py-1 text-right text-[10px] text-slate-500 sm:px-3 sm:text-xs">
                      {item.tag}
                    </span>
                  </div>

                  {/* Content */}

                  <h3 className="mt-5 break-words text-lg font-bold sm:mt-6 sm:text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 min-h-0 text-sm leading-6 text-slate-400 sm:mt-4 sm:min-h-[90px] sm:leading-7">
                    {item.description}
                  </p>

                  {/* Button */}

                  <button
                    onClick={() =>
                      handleFeatureAccess(item.route)
                    }
                    className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-4 py-3 text-sm font-semibold text-indigo-300 transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white sm:mt-7 sm:px-5 sm:text-base"
                  >
                    <Lock size={16} />

                    <span>Explore Feature</span>

                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Access Note */}

          <div className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 px-2 text-center text-xs leading-5 text-slate-500 sm:mt-10 sm:text-sm">
            <Lock size={15} className="mt-0.5 shrink-0" />

            <span>
              Sign in to access the full CampusHub AI experience.
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="bg-slate-900/40 py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 sm:text-sm sm:tracking-widest">
              Simple Journey
            </span>

            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Start Your Journey
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:mt-5 sm:text-base">
              Getting started with CampusHub AI takes just a few simple steps.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Create Your Account",
                description:
                  "Sign up and create your student profile in a few simple steps.",
              },
              {
                number: "02",
                title: "Explore Your Tools",
                description:
                  "Access AI learning, notes, internships, roadmaps, community, and career tools.",
              },
              {
                number: "03",
                title: "Build Your Future",
                description:
                  "Develop skills, discover opportunities, and move closer to your career goals.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.number}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                className="min-w-0 rounded-2xl border border-slate-800 bg-slate-950/70 p-5 sm:p-7"
              >
                <span className="text-3xl font-extrabold text-indigo-500/40 sm:text-4xl">
                  {item.number}
                </span>

                <h3 className="mt-3 break-words text-lg font-bold sm:mt-4 sm:text-xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400 sm:leading-7">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[100px] sm:h-80 sm:w-80 sm:blur-[130px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-600/20 via-slate-900 to-blue-600/20 p-6 text-center sm:p-10 md:p-14"
          >
            <Sparkles
              className="mx-auto text-cyan-400"
              size={34}
            />

            <h2 className="mt-5 break-words text-3xl font-bold leading-tight sm:mt-6 sm:text-4xl md:text-5xl">
              Ready To Learn Smarter?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:mt-6 sm:text-base sm:leading-8">
              Join CampusHub AI and experience a smarter way of learning,
              collaborating, discovering opportunities, and building your
              career with Artificial Intelligence.
            </p>

            <button
              onClick={handleGetStarted}
              className="mt-8 inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-95 sm:mt-10 sm:w-auto sm:max-w-none sm:px-8 sm:py-4 sm:text-lg"
            >
              Create Your Account

              <ArrowRight size={19} />
            </button>

            <p className="mt-4 text-xs text-slate-500 sm:mt-5 sm:text-sm">
              Your smarter student journey starts here.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default About;
