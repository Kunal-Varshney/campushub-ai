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
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />

          <p className="text-slate-400">
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
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="max-w-md rounded-3xl border border-red-500/20 bg-slate-900 p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400">
            !
          </div>

          <h2 className="mt-5 text-2xl font-bold">
            Unable to Load About Page
          </h2>

          <p className="mt-3 text-slate-400">
            {error || "About page data is not available."}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-500"
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

          // Backend currently stores feature information,
          // but icon is not stored in MongoDB.
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
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* ======================================================
          HERO SECTION
      ====================================================== */}

      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Background Glow */}

        <div className="absolute inset-0 -z-10">
          <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-indigo-600/20 blur-[140px]" />

          <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-blue-500/20 blur-[140px]" />

          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[160px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-5 py-2 text-sm text-indigo-300 backdrop-blur">
              <Sparkles size={18} />

              Empowering Students With Artificial Intelligence
            </div>

            {/* Heading */}

            <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
              {aboutData.title}

              <span className="block bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {aboutData.subtitle}
              </span>
            </h1>

            {/* Description */}

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-slate-400 md:text-xl">
              {aboutData.description}
            </p>

            {/* CTA */}

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-500/30"
              >
                Get Started

                <ArrowRight size={18} />
              </button>

              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-7 py-3.5 font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50"
              >
                Explore Features

                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}

      <div className="flex justify-center">
        <div className="h-1 w-24 rounded-full bg-indigo-500 opacity-70" />
      </div>

      {/* ======================================================
          WHO WE ARE
      ====================================================== */}

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Who We Are
            </span>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              {aboutData.whoWeAreTitle}
            </h2>

            <p className="mt-8 leading-8 text-slate-400">
              {aboutData.whoWeAreDescription}
            </p>

            <p className="mt-6 leading-8 text-slate-400">
              {aboutData.whoWeAreSecondaryDescription}
            </p>

            {/* Goals */}

            <div className="mt-8 grid grid-cols-2 gap-4">
              {platformGoals.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40"
                >
                  <CheckCircle2
                    size={22}
                    className="text-indigo-400"
                  />

                  <h3 className="mt-3 font-semibold">
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
            className="rounded-3xl border border-slate-800 bg-slate-900 p-10 transition-all duration-300 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <Brain
              size={58}
              className="mb-6 text-indigo-400"
            />

            <h3 className="text-3xl font-semibold">
              {aboutData.aiEducationTitle}
            </h3>

            <p className="mt-5 leading-8 text-slate-400">
              {aboutData.aiEducationDescription}
            </p>

            <div className="mt-8 space-y-4">
              {aiEducationPoints.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-indigo-400"
                  />

                  {typeof item === "string"
                    ? item
                    : item.text || item.title || ""}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ======================================================
          MISSION & VISION
      ====================================================== */}

      <section className="bg-slate-900/30 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2">
          {/* Mission */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-10 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500"
          >
            <Target
              size={48}
              className="mb-6 text-indigo-400"
            />

            <h3 className="text-3xl font-bold">
              Our Mission
            </h3>

            <p className="mt-6 leading-8 text-slate-400">
              {aboutData.mission}
            </p>
          </motion.div>

          {/* Vision */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-10 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500"
          >
            <Eye
              size={48}
              className="mb-6 text-indigo-400"
            />

            <h3 className="text-3xl font-bold">
              Our Vision
            </h3>

            <p className="mt-6 leading-8 text-slate-400">
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
        className="scroll-mt-20 py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          {/* Heading */}

          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              The CampusHub AI Ecosystem
            </span>

            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Everything Students Need

              <span className="block text-indigo-400">
                In One Platform
              </span>
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              From learning and notes to internships, career planning,
              community, and professional tools — CampusHub AI brings
              your student journey together.
            </p>
          </div>

          {/* Feature Grid */}

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  className="group relative flex flex-col rounded-3xl border border-slate-800 bg-slate-900/70 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/60 hover:shadow-xl hover:shadow-indigo-500/10"
                >
                  {/* Tag */}

                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={28} />
                    </div>

                    <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs text-slate-500">
                      {item.tag}
                    </span>
                  </div>

                  {/* Content */}

                  <h3 className="mt-6 text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-4 min-h-[90px] leading-7 text-slate-400">
                    {item.description}
                  </p>

                  {/* Button */}

                  <button
                    onClick={() =>
                      handleFeatureAccess(item.route)
                    }
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-5 py-3 font-semibold text-indigo-300 transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white"
                  >
                    <Lock size={16} />

                    Explore Feature

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

          <div className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-2 text-center text-sm text-slate-500">
            <Lock size={15} />

            Sign in to access the full CampusHub AI experience.
          </div>
        </div>
      </section>

      {/* ======================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="bg-slate-900/40 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Simple Journey
            </span>

            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Start Your Journey
            </h2>

            <p className="mt-5 text-slate-400">
              Getting started with CampusHub AI takes just a few simple steps.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
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
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-7"
              >
                <span className="text-4xl font-extrabold text-indigo-500/40">
                  {item.number}
                </span>

                <h3 className="mt-4 text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
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

      <section className="relative overflow-hidden py-28">
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[130px]" />

        <div className="relative mx-auto max-w-5xl px-6">
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
            className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-600/20 via-slate-900 to-blue-600/20 p-10 text-center md:p-14"
          >
            <Sparkles
              className="mx-auto text-cyan-400"
              size={38}
            />

            <h2 className="mt-6 text-4xl font-bold md:text-5xl">
              Ready To Learn Smarter?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-300">
              Join CampusHub AI and experience a smarter way of learning,
              collaborating, discovering opportunities, and building your
              career with Artificial Intelligence.
            </p>

            <button
              onClick={handleGetStarted}
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-95"
            >
              Create Your Account

              <ArrowRight size={19} />
            </button>

            <p className="mt-5 text-sm text-slate-500">
              Your smarter student journey starts here.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default About;