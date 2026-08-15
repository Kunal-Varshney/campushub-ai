import {
  UserPlus,
  Sparkles,
  Compass,
  Rocket,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up on CampusHub AI and create your student profile to get started.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Discover Your Tools",
    description:
      "Explore AI-powered tools designed to help you learn, prepare, build skills and grow.",
  },
  {
    number: "03",
    icon: Compass,
    title: "Build Your Career Path",
    description:
      "Use personalized resources, roadmaps and opportunities to move toward the right career path.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Grow & Move Forward",
    description:
      "Keep learning, improving and discovering opportunities as you progress toward your career goals.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-slate-950 py-24 text-white"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-slate-900/80 px-4 py-2 text-sm text-blue-400">
            <Sparkles size={16} />
            Simple. Smart. Career-focused.
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            How{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              CampusHub AI
            </span>{" "}
            Works
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            From discovering your interests to building the right skills,
            CampusHub AI helps you take the next step in your career journey.
          </p>

        </div>


        {/* Steps */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-3xl border border-slate-800 bg-slate-900/50 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-blue-500/10"
              >

                {/* Number */}
                <div className="mb-6 flex items-center justify-between">

                  <span className="text-sm font-bold text-blue-500">
                    STEP {step.number}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={21} />
                  </div>

                </div>


                <h3 className="text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-400">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;