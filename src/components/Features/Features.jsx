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
    route: "/ai-assistant",
    icon: Brain,
    title: "AI Study Assistant",
    description:
      "Get instant answers and personalized learning support using artificial intelligence.",
  },
  {
    route: "/smart-notes",
    icon: BookOpen,
    title: "Smart Notes Sharing",
    description:
      "Create, share and access quality notes with students across campuses.",
  },
  {
    route: "/community",
    icon: Users,
    title: "Campus Community",
    description:
      "Connect with students and collaborate with your campus community.",
  },
  {
    route: "/internship-finder",
    icon: Briefcase,
    title: "Internship Finder",
    description:
      "Discover internships and career opportunities based on your skills.",
  },
  {
    route: "/resume-builder",
    icon: FileText,
    title: "AI Resume Builder",
    description:
      "Build professional resumes with AI-powered suggestions.",
  },
  {
    route: "/skill-roadmap",
    icon: Target,
    title: "Skill Roadmap",
    description:
      "Follow a personalized roadmap to improve your technical skills.",
  },
];

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },

  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      ease: "easeOut",
    },
  }),
};

function Features() {
  const navigate = useNavigate();

  return (
    <section
      id="features"
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
      {/* Background glow */}
      <div
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-blue-600/20
          blur-[90px]
          sm:h-80
          sm:w-80
          sm:blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -right-24
          h-64
          w-64
          rounded-full
          bg-purple-600/20
          blur-[90px]
          sm:h-80
          sm:w-80
          sm:blur-[110px]
        "
      />

      {/* Grid texture */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.05]
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
        {/* Header */}
        <div
          className="
            mx-auto
            mb-10
            w-full
            max-w-2xl
            text-center
            sm:mb-14
            lg:mb-16
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
            <Sparkles size={15} className="shrink-0 sm:h-4 sm:w-4" />

            <span>AI Powered Features</span>
          </div>

          {/* Heading */}
          <h2
            className="
              text-3xl
              font-extrabold
              leading-tight
              tracking-tight
              sm:text-4xl
              lg:text-5xl
            "
          >
            Powerful Features{" "}
            <span
              className="
                bg-gradient-to-r
                from-blue-500
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              For Students
            </span>
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              leading-6
              text-gray-400
              sm:mt-6
              sm:text-lg
              sm:leading-8
            "
          >
            Everything students need to learn smarter, connect better and
            grow faster.
          </p>
        </div>

        {/* Cards */}
        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:gap-6
            md:grid-cols-2
            lg:grid-cols-3
            lg:gap-8
          "
        >
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.route}
                id={item.route}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                variants={cardVariants}
                className="
                  group
                  relative
                  flex
                  h-full
                  min-w-0
                  scroll-mt-24
                  flex-col
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-800
                  bg-slate-900/60
                  p-5
                  shadow-xl
                  shadow-black/20
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  sm:rounded-3xl
                  sm:p-7
                  lg:p-8
                  lg:hover:-translate-y-2
                  lg:hover:border-blue-500/50
                  lg:hover:shadow-2xl
                  lg:hover:shadow-blue-500/20
                "
              >
                {/* Corner glow */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-32
                    w-32
                    rounded-full
                    bg-blue-500/20
                    opacity-0
                    blur-3xl
                    transition-opacity
                    duration-500
                    lg:group-hover:opacity-100
                  "
                />

                <div className="relative flex h-full min-w-0 flex-col">
                  {/* Icon */}
                  <div
                    className="
                      mb-5
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-blue-400/20
                      bg-gradient-to-r
                      from-blue-600
                      to-cyan-500
                      text-white
                      shadow-lg
                      shadow-blue-500/20
                      backdrop-blur-md
                      transition-transform
                      duration-300
                      sm:mb-6
                      sm:h-14
                      sm:w-14
                      lg:group-hover:scale-110
                      lg:group-hover:rotate-6
                    "
                  >
                    <Icon
                      size={23}
                      className="sm:h-[26px] sm:w-[26px]"
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="
                      mb-3
                      break-words
                      text-lg
                      font-semibold
                      leading-snug
                      sm:text-xl
                    "
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      flex-1
                      break-words
                      text-sm
                      leading-6
                      text-gray-400
                      sm:text-base
                      sm:leading-relaxed
                    "
                  >
                    {item.description}
                  </p>

                  {/* CTA */}
                  <div
                    className="
                      mt-6
                      border-t
                      border-slate-800
                      pt-5
                      sm:mt-8
                      sm:pt-6
                    "
                  >
                    <button
                      type="button"
                      onClick={() => navigate("/signup")}
                      aria-label={`Learn more about ${item.title}`}
                      className="
                        inline-flex
                        min-h-10
                        w-fit
                        items-center
                        gap-2
                        rounded-lg
                        text-sm
                        font-semibold
                        text-blue-400
                        transition-colors
                        duration-300
                        hover:text-blue-300
                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-blue-500
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-slate-950
                      "
                    >
                      Learn More

                      <ArrowRight
                        size={16}
                        className="
                          transition-transform
                          duration-300
                          lg:group-hover/cta:translate-x-1
                        "
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

