import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function CTA() {

  const navigate = useNavigate();

  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-slate-950 py-24 text-white"
      aria-labelledby="cta-heading"
    >

      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-600/20 blur-[110px]" />

      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-[110px]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:56px_56px]" />


      <div className="relative mx-auto max-w-5xl px-6">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 20,
          }}

          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}

          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}

          viewport={{
            once: true,
            amount: 0.4,
          }}

          className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-slate-800
            bg-slate-900/70
            px-8
            py-16
            text-center
            shadow-2xl
            shadow-black/30
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-blue-500/50
            hover:shadow-blue-500/20
            sm:px-12
            sm:py-20
          "
        >

          {/* Corner Glow */}

          <div className="
            pointer-events-none
            absolute
            -top-16
            -right-16
            h-48
            w-48
            rounded-full
            bg-blue-500/20
            blur-3xl
            opacity-60
            transition-opacity
            duration-500
            group-hover:opacity-100
          "/>


          <div className="
            pointer-events-none
            absolute
            -bottom-16
            -left-16
            h-48
            w-48
            rounded-full
            bg-cyan-500/20
            blur-3xl
            opacity-40
            transition-opacity
            duration-500
            group-hover:opacity-90
          "/>



          <div className="relative flex flex-col items-center">


            <div className="
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-500/20
              bg-slate-950/80
              px-4
              py-2
              text-sm
              text-blue-400
              backdrop-blur
            ">

              <Sparkles size={16} />

              Start Learning Smarter

            </div>



            <h2
              id="cta-heading"
              className="
                max-w-2xl
                text-4xl
                font-extrabold
                leading-tight
                tracking-tight
                sm:text-5xl
              "
            >

              Ready to{" "}

              <span className="
                bg-gradient-to-r
                from-blue-500
                to-cyan-400
                bg-clip-text
                text-transparent
              ">
                Transform
              </span>

              {" "}
              Your Learning?

            </h2>



            <p className="
              mt-6
              max-w-xl
              text-lg
              leading-8
              text-gray-400
            ">

              Join students who are learning smarter with AI.

            </p>



            <div className="
              mt-10
              flex
              flex-wrap
              items-center
              justify-center
              gap-4
            ">


              {/* Signup Button */}

              <button

                type="button"

                onClick={() => navigate("/signup")}

                className="
                  group/btn
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-500
                  px-7
                  py-3.5
                  font-semibold
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:from-blue-500
                  hover:to-cyan-400
                  hover:shadow-2xl
                  hover:shadow-blue-500/30
                  active:scale-95
                "
              >

                Get Started

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover/btn:translate-x-1
                  "
                />

              </button>



              {/* Features Scroll Button */}

              <button

                type="button"

                onClick={() => navigate("/discover")}

                className="
                  group/btn
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-950/70
                  px-7
                  py-3.5
                  font-semibold
                  transition-all
                  duration-300
                  hover:border-blue-500
                  hover:bg-slate-800
                  hover:shadow-xl
                  hover:shadow-blue-500/20
                "
              >

                <Sparkles
                  size={21}
                  className="
                    text-blue-400
                    transition-transform
                    duration-300
                    group-hover/btn:scale-110
                  "
                />

                Discover CampusHub

              </button>


            </div>


          </div>


        </motion.div>


      </div>


    </section>
  );
}


export default CTA;