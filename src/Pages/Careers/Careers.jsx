import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Rocket,
  Code,
  Brain,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Target,
  Palette,
  Database,
  Megaphone,
  Heart,
  Lightbulb,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { submitCareerApplication } from "../../services/api";
import { motion } from "framer-motion";

const opportunities = [
  {
    icon: Code,
    title: "Frontend Developer Intern",
    description:
      "Build responsive React interfaces, interactive experiences, and user-focused features for CampusHub AI.",
    skills: ["React", "JavaScript", "Tailwind CSS"],
  },

  {
    icon: Brain,
    title: "AI/ML Intern",
    description:
      "Work on intelligent features that help students learn, discover opportunities, and make better career decisions.",
    skills: ["Python", "Machine Learning", "AI"],
  },

  {
    icon: Database,
    title: "Backend Developer Intern",
    description:
      "Build secure APIs, database systems, authentication, and scalable backend services powering CampusHub AI.",
    skills: ["Node.js", "Express", "MongoDB"],
  },

  {
    icon: Palette,
    title: "UI/UX Designer",
    description:
      "Design simple, beautiful, and meaningful experiences that make learning technology easier for students.",
    skills: ["Figma", "UI/UX", "Prototyping"],
  },

  {
    icon: Megaphone,
    title: "Community & Growth Intern",
    description:
      "Help us grow the CampusHub community, connect with students, and create engaging educational experiences.",
    skills: ["Communication", "Content", "Community"],
  },

  {
    icon: Rocket,
    title: "Product Intern",
    description:
      "Work closely with the team to understand student problems, define features, and turn ideas into useful products.",
    skills: ["Research", "Product", "Problem Solving"],
  },
];

const benefits = [
  {
    icon: Rocket,
    title: "Build Real Products",
    description:
      "Don't just work on assignments. Build features that solve real problems for students.",
  },

  {
    icon: GraduationCap,
    title: "Learn From Mentors",
    description:
      "Get practical guidance, feedback, and exposure to real-world development practices.",
  },

  {
    icon: Target,
    title: "Own Your Work",
    description:
      "Take ownership of meaningful tasks and see your ideas become part of the product.",
  },

  {
    icon: Lightbulb,
    title: "Experiment & Innovate",
    description:
      "We encourage new ideas, experimentation, and creative approaches to difficult problems.",
  },

  {
    icon: Users,
    title: "Work With a Team",
    description:
      "Collaborate with developers, designers, AI enthusiasts, and other passionate students.",
  },

  {
    icon: Globe,
    title: "Build Your Career",
    description:
      "Gain experience, strengthen your portfolio, and develop skills that prepare you for your career.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Student First",
    description:
      "Every decision starts with one question: does this make a student's journey better?",
  },

  {
    icon: Lightbulb,
    title: "Think Big",
    description:
      "We believe technology and AI can completely transform the way students learn and grow.",
  },

  {
    icon: Users,
    title: "Grow Together",
    description:
      "We believe the best teams learn from each other and celebrate each other's growth.",
  },

  {
    icon: Sparkles,
    title: "Keep Improving",
    description:
      "We continuously learn, experiment, build, measure, and improve.",
  },
];

function Careers() {
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    portfolio: "",
    message: "",
  });

  const handleApply = (role) => {
    setSelectedRole(role);
    setShowModal(true);
    setSuccess(false);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await submitCareerApplication({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: selectedRole,
        resume: formData.resume,
        portfolio: formData.portfolio,
        message: formData.message,
      });

      if (response.success) {
        setSuccess(true);

        setFormData({
          name: "",
          email: "",
          phone: "",
          resume: "",
          portfolio: "",
          message: "",
        });
      } else {
        setError(
          response.message || "Failed to submit application."
        );
      }
    } catch (err) {
      console.error("Career application error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    if (loading) return;

    setShowModal(false);
    setError("");
  };

  return (
     <div className="min-h-screen bg-slate-950 text-white overflow-hidden">

    {/* =====================================================
        APPLICATION MODAL
    ===================================================== */}

    {showModal && (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) {
            closeModal();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-700 bg-slate-950 p-6 shadow-2xl shadow-blue-500/10 md:p-8"
        >

          {/* Close Button */}

          <button
            type="button"
            onClick={closeModal}
            disabled={loading}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-gray-400 transition hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            ✕
          </button>


          {!success ? (
            <>
              {/* Modal Header */}

              <div className="mb-8 pr-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Rocket size={24} />
                </div>

                <h2 className="text-2xl font-bold md:text-3xl">
                  Apply for Internship
                </h2>

                <p className="mt-2 text-gray-400">
                  You're applying for:
                </p>

                <div className="mt-2 inline-flex rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-400">
                  {selectedRole}
                </div>
              </div>


              {/* Error */}

              {error && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}


              {/* Application Form */}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>


                {/* Email */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>


                {/* Phone */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>


                {/* Resume */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Resume URL *
                  </label>

                  <input
                    type="url"
                    name="resume"
                    value={formData.resume}
                    onChange={handleChange}
                    required
                    placeholder="https://drive.google.com/..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />

                  <p className="mt-1 text-xs text-gray-600">
                    Upload your resume somewhere like Google Drive and paste
                    the public link here.
                  </p>
                </div>


                {/* Portfolio */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Portfolio / GitHub URL
                  </label>

                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://github.com/yourusername"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>


                {/* Message */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Why should we consider you?
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about yourself, your skills, projects, and why you want to join CampusHub AI..."
                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>


                {/* Submit */}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

              </form>
            </>
          ) : (

            /* =====================================================
                SUCCESS STATE
            ===================================================== */

            <div className="py-10 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2
                  size={45}
                  className="text-green-400"
                />
              </div>

              <h2 className="mt-6 text-3xl font-bold">
                Application Submitted!
              </h2>

              <p className="mx-auto mt-4 max-w-md leading-7 text-gray-400">
                Thank you for applying for the{" "}
                <span className="font-semibold text-blue-400">
                  {selectedRole}
                </span>{" "}
                position. Our team will review your application and get back
                to you soon.
              </p>

              <button
                type="button"
                onClick={closeModal}
                className="mt-8 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3 font-semibold transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20"
              >
                Done
              </button>

            </div>
          )}

        </motion.div>
      </div>
    )}


    {/* =====================================================
        HERO
    ===================================================== */}

    <section className="relative px-6 py-28 text-center">

        <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[140px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-4xl"
        >

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/70 px-5 py-2.5 text-sm text-blue-400 backdrop-blur">
            <Sparkles size={16} />
            We're building the future of student technology
          </div>

          <h1 className="mt-7 text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl">

            Build Something That

            <span className="block bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Matters.
            </span>

          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-gray-400 md:text-xl">
            Join CampusHub AI and help us build intelligent tools that make
            learning, career discovery, and student life simpler, smarter,
            and more accessible.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">

            <a
              href="#open-roles"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 font-semibold transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30"
            >
              Explore Opportunities
              <ArrowRight size={18} />
            </a>

            <a
              href="#culture"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-7 py-3.5 font-semibold text-gray-200 transition hover:border-blue-500/50"
            >
              Our Culture
            </a>

          </div>

        </motion.div>
      </section>


      {/* =====================================================
          MISSION
      ===================================================== */}

      <section className="px-6 py-20">

        <div className="mx-auto max-w-6xl">

          <div className="grid items-center gap-12 md:grid-cols-2">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >

              <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                Our Mission
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">
                Technology should make
                <span className="text-blue-400"> student life easier.</span>
              </h2>

              <p className="mt-6 leading-8 text-gray-400">
                Students today have access to more information than ever,
                but finding the right resources, building skills, discovering
                opportunities, and planning a career can still be confusing.
              </p>

              <p className="mt-4 leading-8 text-gray-400">
                CampusHub AI is building one intelligent ecosystem where
                students can learn, grow, discover opportunities, and prepare
                for their future.
              </p>

            </motion.div>


            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >

              {[
                ["Learn", "Build skills faster"],
                ["Discover", "Find the right opportunities"],
                ["Connect", "Grow with a community"],
                ["Achieve", "Move closer to your goals"],
              ].map(([title, description], index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-blue-500/40"
                >

                  <CheckCircle2 className="text-blue-400" size={25} />

                  <h3 className="mt-4 font-bold">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {description}
                  </p>

                </div>

              ))}

            </motion.div>

          </div>

        </div>

      </section>


      {/* =====================================================
          OPEN ROLES
      ===================================================== */}

      <section id="open-roles" className="bg-slate-900/40 px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Opportunities
            </span>

            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              Find Your Place With Us
            </h2>

            <p className="mt-5 text-gray-400">
              Whether you're a developer, designer, AI enthusiast, or
              community builder, there's a place for you to learn, contribute,
              and grow.
            </p>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {opportunities.map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="group rounded-3xl border border-slate-800 bg-slate-950/80 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 transition group-hover:scale-110">
                      <Icon size={28} />
                    </div>

                    <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-gray-500">
                      Internship
                    </span>

                  </div>


                  <h3 className="mt-6 text-xl font-bold">
                    {item.title}
                  </h3>


                  <p className="mt-4 min-h-[80px] text-sm leading-6 text-gray-400">
                    {item.description}
                  </p>


                  <div className="mt-5 flex flex-wrap gap-2">

                    {item.skills.map((skill) => (

                      <span
                        key={skill}
                        className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-gray-400"
                      >
                        {skill}
                      </span>

                    ))}

                  </div>


                  <button
                    onClick={() => handleApply(item.title)}
                    className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-semibold transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    Apply Now
                    <ArrowRight size={17} />
                  </button>

                </motion.div>

              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Why CampusHub AI?
            </span>

            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              More Than Just an Internship
            </h2>

            <p className="mt-5 text-gray-400">
              We want you to leave CampusHub AI with stronger skills,
              meaningful experience, and confidence in your abilities.
            </p>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {benefits.map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-7 transition hover:-translate-y-2 hover:border-blue-500/40"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-400">
                    {item.description}
                  </p>

                </motion.div>

              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          CULTURE
      ===================================================== */}

      <section id="culture" className="bg-slate-900/50 px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Our Culture
            </span>

            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              What We Believe In
            </h2>

            <p className="mt-5 text-gray-400">
              Great products are built by people who care about the problem,
              the users, and each other.
            </p>

          </div>


          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {values.map((item, index) => {

              const Icon = item.icon;

              return (

                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 text-center transition hover:-translate-y-2 hover:border-blue-500/40"
                >

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {item.description}
                  </p>

                </div>

              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHO WE ARE LOOKING FOR
      ===================================================== */}

      <section className="px-6 py-24">

        <div className="mx-auto max-w-5xl rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-slate-900 to-cyan-500/10 p-8 text-center md:p-14">

          <Users className="mx-auto text-blue-400" size={40} />

          <h2 className="mt-5 text-3xl font-bold md:text-4xl">
            Who Are We Looking For?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-400">
            You don't need to know everything. We are looking for curious,
            motivated people who love learning, solving problems, and building
            things that create real impact.
          </p>


          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-3">

            {[
              "Curious Learners",
              "Problem Solvers",
              "Developers",
              "AI Enthusiasts",
              "Designers",
              "Creators",
              "Team Players",
              "Self Starters",
            ].map((item) => (

              <span
                key={item}
                className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-gray-300"
              >
                {item}
              </span>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="relative overflow-hidden px-6 py-28 text-center">

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl">

          <Sparkles className="mx-auto text-cyan-400" size={35} />

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Ready to Build the Future?
          </h2>

          <p className="mt-5 text-lg leading-7 text-gray-400">
            Bring your ideas, curiosity, and ambition. Let's build something
            meaningful together.
          </p>

          <Link
            to="/signup"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-semibold transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30"
          >
            Start Your Journey
            <ArrowRight size={18} />
          </Link>

          <p className="mt-5 text-sm text-gray-500">
            We’re always interested in meeting talented and curious people.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Careers;
