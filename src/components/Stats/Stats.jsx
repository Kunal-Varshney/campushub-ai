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
      aria-labelledby="stats-heading"
      className="
        relative
        w-full
        overflow-hidden
        bg-slate-950
        py-16
        text-white
        sm:py-20
        lg:py-24
      "
    >
      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -left-24
          top-10
          h-64
          w-64
          rounded-full
          bg-blue-600/10
          blur-[90px]
          sm:-left-32
          sm:h-80
          sm:w-80
          sm:blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-10
          -right-24
          h-64
          w-64
          rounded-full
          bg-cyan-500/10
          blur-[90px]
          sm:-right-32
          sm:h-80
          sm:w-80
          sm:blur-[120px]
        "
      />

      {/* Grid Background */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.04]
          [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)]
          [background-size:56px_56px]
        "
      />

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* Heading */}

        <div
          className="
            mx-auto
            mb-10
            w-full
            max-w-3xl
            text-center
            sm:mb-14
          "
        >
          {/* Badge */}

          <div
            className="
              mb-5
              inline-flex
              max-w-full
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-blue-500/20
              bg-slate-900/80
              px-3
              py-2
              text-xs
              text-blue-400
              backdrop-blur
              sm:mb-6
              sm:px-4
              sm:text-sm
            "
          >
            <Sparkles
              size={15}
              className="shrink-0 sm:h-4 sm:w-4"
            />

            <span>CampusHub AI in Numbers</span>
          </div>

          {/* Heading */}

          <h2
            id="stats-heading"
            className="
              text-3xl
              font-extrabold
              leading-tight
              tracking-tight
              sm:text-4xl
              lg:text-5xl
            "
          >
            Built for the{" "}
            <span
              className="
                bg-gradient-to-r
                from-blue-500
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              Next Generation
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-6
              text-gray-400
              sm:mt-5
              sm:text-lg
              sm:leading-8
            "
          >
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
            amount: 0.15,
          }}
          variants={containerVariants}
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            sm:gap-6
            lg:grid-cols-4
            lg:gap-6
          "
        >
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                className="
                  group
                  relative
                  min-w-0
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-800
                  bg-slate-900/50
                  p-5
                  text-center
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  sm:rounded-3xl
                  sm:p-7
                  lg:hover:-translate-y-2
                  lg:hover:border-blue-500/40
                  lg:hover:bg-slate-900/80
                  lg:hover:shadow-2xl
                  lg:hover:shadow-blue-500/10
                "
              >
                {/* Hover Glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-28
                    w-28
                    rounded-full
                    bg-blue-500/20
                    opacity-0
                    blur-3xl
                    transition-opacity
                    duration-500
                    lg:group-hover:opacity-100
                  "
                />

                <div className="relative">
                  {/* Icon */}

                  <div
                    className="
                      mx-auto
                      mb-4
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-blue-500/20
                      bg-blue-500/10
                      text-blue-400
                      transition-transform
                      duration-300
                      sm:mb-5
                      sm:h-12
                      sm:w-12
                      sm:rounded-2xl
                      lg:group-hover:scale-110
                    "
                  >
                    <Icon
                      size={21}
                      className="sm:h-[22px] sm:w-[22px]"
                    />
                  </div>

                  {/* Number */}

                  <h3
                    className="
                      text-3xl
                      font-extrabold
                      tracking-tight
                      sm:text-4xl
                    "
                  >
                    {stat.value}
                  </h3>

                  {/* Label */}

                  <p
                    className="
                      mt-1.5
                      text-sm
                      font-semibold
                      text-white
                      sm:mt-2
                      sm:text-base
                    "
                  >
                    {stat.label}
                  </p>

                  {/* Description */}

                  <p
                    className="
                      mx-auto
                      mt-2
                      max-w-xs
                      text-xs
                      leading-5
                      text-gray-500
                      sm:text-sm
                      sm:leading-6
                    "
                  >
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Stats;
