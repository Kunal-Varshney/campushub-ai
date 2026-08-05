import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  Target,
  Eye,
  Sparkles,
  BookOpen,
  Briefcase,
  Users,
} from "lucide-react";

function About() {
  const navigate = useNavigate();
  return (
    <main className="bg-slate-950 text-white min-h-screen">


      {/* Hero Section */}

      <section className="relative overflow-hidden py-24">

        {/* Background Glow */}

        <div className="absolute inset-0 -z-10">

          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-indigo-600/20 blur-[140px]" />

          <div className="absolute bottom-10 right-20 w-72 h-72 rounded-full bg-blue-500/20 blur-[140px]" />

        </div>

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            text-center
          "
        >

          <motion.div

            initial={{
              opacity: 0,
              y: 40,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.7,
            }}

          >

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-indigo-500/40
                bg-indigo-500/10
                px-5
                py-2
                text-indigo-300
                text-sm
                mb-8
              "
            >

              <Sparkles size={18} />

              Empowering Students With Artificial Intelligence

            </div>

            <h1
              className="
                text-5xl
                md:text-7xl
                font-extrabold
                leading-tight
              "
            >

              Building The Future

              <span className="block text-indigo-400">

                Of Student Learning

              </span>

            </h1>

            <p
              className="
                mt-8
                max-w-3xl
                mx-auto
                text-lg
                text-slate-400
                leading-relaxed
              "
            >

              CampusHub AI is an AI-powered platform built to
              transform the student journey by combining intelligent
              learning tools, collaboration, career guidance and
              innovation into one seamless experience.

            </p>

          </motion.div>

        </div>

      </section>

      <div className="flex justify-center">
        <div className="w-24 h-1 bg-indigo-500 rounded-full opacity-70"></div>
      </div>

      {/* Who We Are */}

      <section className="py-20">

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            grid
            lg:grid-cols-2
            gap-14
            items-center
          "
        >

          <motion.div

            initial={{
              opacity: 0,
              x: -50,
            }}

            whileInView={{
              opacity: 1,
              x: 0,
            }}

            viewport={{
              once: true,
            }}

            transition={{
              duration: 0.6,
            }}

          >

            <h2
              className="
                text-4xl
                font-bold
              "
            >

              Who

              <span className="text-indigo-400">

                {" "}We Are

              </span>

            </h2>

            <p
              className="
                mt-8
                text-slate-400
                leading-8
              "
            >

              CampusHub AI is designed for students who want to learn
              smarter instead of harder. We believe education should
              be interactive, personalized and powered by modern AI.

            </p>

            <p
              className="
                mt-6
                text-slate-400
                leading-8
              "
            >

              From AI study assistance to smart note sharing,
              internship opportunities and collaborative communities,
              our mission is to build one platform that supports every
              student throughout their academic journey.

            </p>

          </motion.div>

          <motion.div

            initial={{
              opacity: 0,
              x: 50,
            }}

            whileInView={{
              opacity: 1,
              x: 0,
            }}

            viewport={{
              once: true,
            }}

            transition={{
              duration: 0.6,
            }}

            className="
              rounded-3xl
              border
              border-slate-800
              bg-slate-900
              p-10
              hover:border-indigo-500
              transition-all
              duration-300
              hover:shadow-xl
              hover:shadow-indigo-500/10
            "

          >

            <Brain
              size={55}
              className="text-indigo-400 mb-6"
            />

            <h3 className="text-2xl font-semibold">

              AI First Education

            </h3>

            <p
              className="
                mt-5
                text-slate-400
                leading-8
              "
            >

              We combine Artificial Intelligence with practical
              student tools to create a learning experience that's
              faster, smarter and more engaging.

            </p>

          </motion.div>

        </div>

      </section>

      {/* Mission & Vision */}

      <section className="py-20">

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            grid
            md:grid-cols-2
            gap-10
          "
        >

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

            className="
              rounded-3xl
              border
              border-slate-800
              bg-slate-900
              p-10
              hover:border-indigo-500
              transition-all
              duration-300
              hover:-translate-y-2
            "

          >

            <Target
              size={48}
              className="text-indigo-400 mb-6"
            />

            <h3 className="text-3xl font-bold">

              Our Mission

            </h3>

            <p
              className="
                mt-6
                text-slate-400
                leading-8
              "
            >

              To empower every student with AI-driven learning,
              collaboration and career opportunities that simplify
              education and unlock future success.

            </p>

          </motion.div>

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
              duration: 0.7,
            }}

            className="
              rounded-3xl
              border
              border-slate-800
              bg-slate-900
              p-10
              hover:border-indigo-500
              transition-all
              duration-300
              hover:-translate-y-2
            "

          >

            <Eye
              size={48}
              className="text-indigo-400 mb-6"
            />

            <h3 className="text-3xl font-bold">

              Our Vision

            </h3>

            <p
              className="
                mt-6
                text-slate-400
                leading-8
              "
            >

              To become the world's most trusted AI-powered student
              ecosystem where learning, networking and career growth
              happen in one intelligent platform.

            </p>

          </motion.div>

        </div>

      </section>
      





            {/* Why Choose CampusHub AI */}

      <section className="py-20">

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
          "
        >

          <div className="text-center mb-16">

            <h2
              className="
                text-4xl
                md:text-5xl
                font-bold
              "
            >

              Why Choose

              <span className="text-indigo-400">
                {" "}CampusHub AI
              </span>

            </h2>

            <p
              className="
                mt-5
                text-slate-400
                max-w-2xl
                mx-auto
              "
            >

              Everything a student needs to learn, collaborate and grow
              — all in one intelligent platform.

            </p>

          </div>

          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-4
              gap-8
            "
          >

            {[
              {
                icon: Brain,
                title: "AI Study Assistant",
                desc: "Get instant explanations, summaries and learning support powered by AI."
              },
              {
                icon: BookOpen,
                title: "Smart Notes",
                desc: "Share and discover quality notes from students across campuses."
              },
              {
                icon: Briefcase,
                title: "Internship & Career Opportunities",
                desc: "Explore internships and career opportunities based on your skills."
              },
              {
                icon: Users,
                title: "Student Community",
                desc: "Connect, collaborate and learn with students from different colleges."
              }
              ].map((item, index) => {

                const Icon = item.icon;

                return (

                  <motion.div

                    key={index}

                    initial={{
                      opacity: 0,
                      y: 40,
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

                    className="
                      rounded-2xl
                      border
                      border-slate-800
                      bg-slate-900
                      p-8
                      text-center
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:border-indigo-500
                      hover:shadow-xl
                      hover:shadow-indigo-500/10
                    "

                  >

                    <div className="flex justify-center mb-6">

                      <Icon
                        size={48}
                        className="text-indigo-400"
                      />

                    </div>

                    <h3
                      className="
                        text-xl
                        font-semibold
                        mb-4
                      "
                    >

                      {item.title}

                    </h3>

                    <p
                      className="
                        text-slate-400
                        leading-relaxed
                      "
                    >

                      {item.desc}

                    </p>

                  </motion.div>

                );

              })}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24">

        <div
          className="
            max-w-5xl
            mx-auto
            px-6
          "
        >

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

            className="
              rounded-3xl
              border
              border-indigo-500/30
              bg-gradient-to-r
              from-indigo-600/20
              via-slate-900
              to-blue-600/20
              p-12
              text-center
            "

          >

            <h2
              className="
                text-4xl
                md:text-5xl
                font-bold
              "
            >

              Ready To Learn Smarter?

            </h2>

            <p
              className="
                mt-6
                text-slate-300
                max-w-2xl
                mx-auto
                leading-8
              "
            >

              Join CampusHub AI and experience a smarter way of
              learning, collaborating and building your career with
              Artificial Intelligence.

            </p>

            <button
              onClick={() => navigate("/signup")}
              className="
                mt-10
                rounded-xl
                bg-indigo-600
                px-8
                py-4
                text-lg
                font-semibold
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                hover:shadow-blue-500/30
                active:scale-95
              "
            >

              Get Started →

            </button>
          </motion.div>

        </div>

      </section>

    </main>
  );
}

export default About;

