// src/pages/Careers.jsx

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Brain,
  Code2,
  Heart,
  Mail,
  Rocket,
  Sparkles,
  Users,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const benefits = [
  {
    icon: Rocket,
    title: "Build Something Meaningful",
    description:
      "CampusHub AI is being built to solve real problems students face while learning, building skills and planning careers.",
  },
  {
    icon: Brain,
    title: "Learn & Experiment",
    description:
      "We believe in curiosity, experimentation and continuous improvement as we build the platform.",
  },
  {
    icon: Users,
    title: "Student First",
    description:
      "Every product decision starts with one goal: making the student journey simpler and more useful.",
  },
  {
    icon: Heart,
    title: "Long-Term Vision",
    description:
      "We are focused on building a strong product and a meaningful community before expanding the team.",
  },
];

const values = [
  "Curiosity and willingness to learn",
  "Strong ownership and responsibility",
  "Focus on solving real student problems",
  "Quality over unnecessary complexity",
  "Continuous learning and improvement",
];

function Careers() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="pointer-events-none fixed -left-40 top-20 h-96 w-96 rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="pointer-events-none fixed -right-40 top-[45%] h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* HERO */}
      <section className="relative px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-medium text-indigo-300 backdrop-blur sm:text-sm"
          >
            <BriefcaseBusiness size={16} />
            Careers at CampusHub AI
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
          >
            We&apos;re building first.
            <span className="block bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Hiring later.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-lg sm:leading-8"
          >
            CampusHub AI is currently focused on building, improving and
            validating the platform. We don&apos;t have any open positions
            right now, and we are not actively looking for new team members.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mx-auto mt-9 flex max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <a
              href="#status"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20 sm:w-auto"
            >
              Current Hiring Status
              <ArrowRight size={17} />
            </a>

            <a
              href="#culture"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-indigo-500/50 hover:bg-slate-800 sm:w-auto"
            >
              Our Culture
            </a>
          </motion.div>
        </div>
      </section>

      {/* CURRENT STATUS */}
      <section id="status" className="relative px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 p-6 shadow-2xl sm:p-10 lg:p-12"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

            <div className="relative grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
                <Clock3 size={29} />
              </div>

              <div>
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-extrabold sm:text-3xl">
                    No Open Opportunities Right Now
                  </h2>
                  <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                    Hiring Closed
                  </span>
                </div>

                <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                  At the moment, CampusHub AI is a focused project and there
                  are no vacancies, internships or team openings available.
                  We&apos;re not looking to add anyone to the team right now.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-5 py-4 text-center">
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Status
                </p>
                <p className="mt-1 text-sm font-bold text-slate-200">
                  No positions available
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY CAMPUSHUB */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs text-indigo-300 sm:text-sm">
              <Sparkles size={16} />
              The Vision
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Build the product.
              <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Build the team later.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
              We want CampusHub AI to have a strong foundation before growing
              the team. Right now, our priority is product development,
              stability and creating value for students.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40 hover:bg-slate-900"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600">
                    <Icon size={22} />
                  </div>

                  <h3 className="mb-3 text-lg font-semibold">{item.title}</h3>

                  <p className="text-sm leading-7 text-slate-400">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CULTURE / FUTURE */}
      <section id="culture" className="relative px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 p-6 sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs text-indigo-300 sm:text-sm">
                  <Code2 size={16} />
                  When We Grow
                </div>

                <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                  Future opportunities will be built around
                  <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    real product needs.
                  </span>
                </h2>

                <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                  When CampusHub AI is ready to expand, we&apos;ll look for
                  people who care about the product, take ownership and want
                  to solve meaningful problems for students.
                </p>
              </div>

              <div className="space-y-3">
                {values.map((value) => (
                  <div
                    key={value}
                    className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                  >
                    <CheckCircle2
                      size={19}
                      className="shrink-0 text-cyan-400"
                    />
                    <span className="text-sm text-slate-300">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 px-5 py-12 text-center shadow-2xl backdrop-blur-xl sm:px-10 sm:py-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-indigo-600/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600">
                <Mail size={25} />
              </div>

              <h2 className="text-3xl font-extrabold sm:text-4xl">
                No applications needed right now.
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                Since there are currently no openings, please don&apos;t send
                a job application or resume. If opportunities are opened in
                the future, this page will be updated.
              </p>

              <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950/70 px-5 py-3 text-sm font-medium text-slate-300">
                <Rocket size={17} className="text-indigo-400" />
                Building the next version of CampusHub AI
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER MESSAGE */}
      <section className="border-t border-slate-900 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600">
              <Sparkles size={17} />
            </div>

            <span className="text-sm font-semibold">CampusHub AI</span>
          </div>

          <p className="text-xs text-slate-500 sm:text-sm">
            Building technology for the next generation of students.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Careers;
