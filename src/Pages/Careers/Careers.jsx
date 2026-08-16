// src/pages/Careers.jsx

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Brain,
  Palette,
  Megaphone,
  Users,
  Sparkles,
  CheckCircle2,
  Mail,
  Rocket,
  Heart,
  Globe,
} from "lucide-react";

// ============================================================
// OPEN ROLES
// ============================================================

const roles = [
  {
    icon: Code2,
    title: "Frontend Developer",
    type: "Internship / Full-time",
    description:
      "Help us build fast, modern and intuitive experiences for students using React and modern frontend technologies.",
    skills: ["React", "JavaScript", "Tailwind CSS"],
  },
  {
    icon: Code2,
    title: "Backend Developer",
    type: "Internship / Full-time",
    description:
      "Build reliable APIs, services and systems that power the CampusHub AI platform.",
    skills: ["Node.js", "Express", "MongoDB"],
  },
  {
    icon: Brain,
    title: "AI / ML Developer",
    type: "Internship / Full-time",
    description:
      "Work on AI-powered features that help students learn, prepare and make better career decisions.",
    skills: ["Python", "Machine Learning", "AI APIs"],
  },
  {
    icon: Palette,
    title: "UI/UX Designer",
    type: "Internship / Freelance",
    description:
      "Design simple, engaging and student-friendly experiences across the CampusHub AI platform.",
    skills: ["Figma", "UI Design", "UX Research"],
  },
  {
    icon: Megaphone,
    title: "Content & Community",
    type: "Internship / Part-time",
    description:
      "Create useful content and help build a strong community of students around CampusHub AI.",
    skills: ["Content", "Communication", "Community"],
  },
  {
    icon: Rocket,
    title: "Product & Growth",
    type: "Internship / Full-time",
    description:
      "Help us understand students better, improve the product and grow CampusHub AI.",
    skills: ["Product Thinking", "Research", "Growth"],
  },
];

// ============================================================
// WHY JOIN
// ============================================================

const benefits = [
  {
    icon: Rocket,
    title: "Build Something Meaningful",
    description:
      "Work on a platform focused on solving real problems faced by students.",
  },
  {
    icon: Brain,
    title: "Learn & Experiment",
    description:
      "Get opportunities to work with modern technologies and explore new ideas.",
  },
  {
    icon: Users,
    title: "Collaborative Environment",
    description:
      "Work with people who enjoy building, learning and improving together.",
  },
  {
    icon: Heart,
    title: "Student First",
    description:
      "Every feature starts with one question: how can we make students' journeys easier?",
  },
];

// ============================================================
// CAREERS
// ============================================================

function Careers() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="pointer-events-none fixed -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="pointer-events-none fixed -right-40 top-[40%] h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative px-4 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36">

        <div className="relative mx-auto max-w-5xl text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-xs font-medium text-blue-400 backdrop-blur sm:text-sm"
          >
            <Sparkles size={16} />
            Careers at CampusHub AI
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          >
            Build the future of
            <span className="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              student careers.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-gray-400 sm:text-lg sm:leading-8"
          >
            CampusHub AI is building a platform that helps students
            understand themselves, discover opportunities, build skills
            and move confidently toward their careers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <a
              href="#open-roles"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30 sm:px-8 sm:text-base"
            >
              Explore Opportunities

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-3.5 text-sm font-semibold text-gray-200 transition-all duration-300 hover:border-blue-500 hover:bg-slate-800 sm:px-8 sm:text-base"
            >
              <Mail size={18} />
              Get in Touch
            </a>
          </motion.div>

        </div>
      </section>

      {/* ======================================================
          WHY JOIN CAMPUSHUB
      ====================================================== */}

      <section className="relative px-4 py-16 sm:px-6 sm:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-xs text-blue-400 sm:text-sm">
              <BriefcaseBusiness size={16} />
              Why CampusHub AI
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Work on something that
              <span className="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                actually matters.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
              Join us in building technology that can make education,
              skill development and career discovery more accessible
              for students.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {benefits.map((item, index) => {

              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40"
                >

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500">
                    <Icon size={23} />
                  </div>

                  <h3 className="mb-3 text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-7 text-gray-400">
                    {item.description}
                  </p>

                </motion.div>
              );
            })}

          </div>

        </div>
      </section>

      {/* ======================================================
          OPEN ROLES
      ====================================================== */}

      <section
        id="open-roles"
        className="relative px-4 py-16 sm:px-6 sm:py-24"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mb-12 sm:mb-16">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-xs text-blue-400 sm:text-sm">
              <Code2 size={16} />
              Open Opportunities
            </div>

            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

              <div className="max-w-2xl">

                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Find your place at
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    {" "}CampusHub AI
                  </span>
                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                  We are looking for curious people who want to learn,
                  build and contribute to a product with a real purpose.
                </p>

              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Globe size={17} />
                Remote-friendly opportunities
              </div>

            </div>

          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

            {roles.map((role, index) => {

              const Icon = role.icon;

              return (
                <motion.div
                  key={role.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                  }}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-900 sm:rounded-3xl sm:p-7"
                >

                  <div className="flex flex-col gap-5 sm:flex-row">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400 sm:h-14 sm:w-14">
                      <Icon size={25} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                        <div>
                          <h3 className="text-xl font-bold">
                            {role.title}
                          </h3>

                          <p className="mt-1 text-xs font-medium text-cyan-400">
                            {role.type}
                          </p>
                        </div>

                      </div>

                      <p className="mt-4 text-sm leading-7 text-gray-400">
                        {role.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">

                        {role.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}

                      </div>

                      <a
                        href="#contact"
                        className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition-colors hover:text-cyan-400"
                      >
                        Apply for this role

                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover/link:translate-x-1"
                        />
                      </a>

                    </div>

                  </div>

                </motion.div>
              );
            })}

          </div>

        </div>
      </section>

      {/* ======================================================
          WHO WE ARE LOOKING FOR
      ====================================================== */}

      <section className="relative px-4 py-16 sm:px-6 sm:py-24">

        <div className="mx-auto max-w-5xl">

          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 p-6 sm:p-10 lg:p-14">

            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

              <div>

                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs text-blue-400 sm:text-sm">
                  <Users size={16} />
                  Our Culture
                </div>

                <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                  You don't need to
                  <span className="block bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    know everything.
                  </span>
                </h2>

                <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
                  We value curiosity, ownership and the willingness to
                  learn. If you are a student, fresher or experienced
                  professional who wants to build meaningful products,
                  we would love to hear from you.
                </p>

              </div>

              <div className="space-y-4">

                {[
                  "Curious and willing to learn",
                  "Interested in solving real problems",
                  "Comfortable taking ownership",
                  "Passionate about technology and students",
                  "Ready to experiment and improve",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                  >

                    <CheckCircle2
                      size={19}
                      className="shrink-0 text-cyan-400"
                    />

                    <span className="text-sm text-gray-300">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ======================================================
          CONTACT / APPLICATION
      ====================================================== */}

      <section
        id="contact"
        className="relative px-4 py-16 sm:px-6 sm:py-24"
      >

        <div className="mx-auto max-w-4xl">

          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 px-5 py-12 text-center shadow-2xl backdrop-blur-xl sm:px-10 sm:py-16">

            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative">

              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500">
                <Mail size={25} />
              </div>

              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Don't see your role?
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
                We are always interested in meeting talented people.
                Send us your resume and tell us how you would like to
                contribute to CampusHub AI.
              </p>

              <a
                href="mailto:careers@campushub.ai?subject=Career%20Application%20-%20CampusHub%20AI"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/30 sm:text-base"
              >
                Send Your Application
                <ArrowRight size={18} />
              </a>

              <p className="mt-5 text-xs text-gray-500">
                Replace careers@campushub.ai with your actual
                CampusHub AI recruitment email before deployment.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* ======================================================
          FOOTER MESSAGE
      ====================================================== */}

      <section className="border-t border-slate-900 px-4 py-10 sm:px-6">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

          <div className="flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500">
              <Sparkles size={17} />
            </div>

            <span className="text-sm font-semibold">
              CampusHub AI
            </span>

          </div>

          <p className="text-xs text-gray-500 sm:text-sm">
            Building technology for the next generation of students.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Careers;