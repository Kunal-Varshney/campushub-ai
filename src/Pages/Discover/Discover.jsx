import {
  Sparkles,
  Brain,
  BookOpen,
  FileText,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Rocket,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";


const features = [
  {
    icon: Brain,
    title: "AI Assistant",
    description:
      "Get instant help with doubts, concepts, coding problems and personalized learning guidance.",
  },
  {
    icon: BookOpen,
    title: "Smart Notes",
    description:
      "Generate, organize and revise AI-powered notes for smarter exam preparation.",
  },
  {
    icon: FileText,
    title: "ATS Resume Builder",
    description:
      "Create professional resumes optimized for modern hiring systems.",
  },
  {
    icon: Briefcase,
    title: "Internship Finder",
    description:
      "Discover internships and career opportunities based on your skills.",
  },
];


const steps = [
  "Create your CampusHub AI account",
  "Learn with AI powered tools",
  "Build skills and career profile",
  "Get internship and job opportunities",
];


const stats = [
  {
    number: "10K+",
    text: "Students",
  },
  {
    number: "50K+",
    text: "Smart Notes",
  },
  {
    number: "500+",
    text: "Resume Reviews",
  },
  {
    number: "95%",
    text: "Career Support",
  },
];


function Discover() {

  const navigate = useNavigate();


  return (

    <div className="min-h-screen bg-slate-950 text-white">


      <Navbar />


      {/* HERO */}

      <section className="relative overflow-hidden py-24">


        <div className="
          absolute
          -top-24
          -left-24
          h-80
          w-80
          rounded-full
          bg-blue-600/20
          blur-[120px]
        "/>


        <div className="
          mx-auto
          max-w-6xl
          px-6
          text-center
        ">


          <motion.div

            initial={{
              opacity:0,
              y:40
            }}

            animate={{
              opacity:1,
              y:0
            }}

            transition={{
              duration:0.6
            }}

          >


            <div className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-500/30
              bg-slate-900
              px-5
              py-2
              text-sm
              text-blue-400
            ">

              <Sparkles size={16}/>

              Discover CampusHub AI

            </div>



            <h1 className="
              mt-8
              text-5xl
              font-extrabold
              leading-tight
              md:text-6xl
            ">


              The Future of

              <span className="
                text-blue-500
              ">

                {" "}Student Growth

              </span>


            </h1>



            <p className="
              mx-auto
              mt-6
              max-w-3xl
              text-lg
              leading-8
              text-slate-400
            ">


              CampusHub AI brings learning, career preparation,
              resume building and internship discovery together
              in one intelligent platform.


            </p>



            <button

              onClick={() => navigate("/signup")}

              className="
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                px-8
                py-4
                font-semibold
                transition
                hover:-translate-y-1
                hover:shadow-xl
                hover:shadow-blue-500/30
              "

            >

              Start Learning

              <ArrowRight size={18}/>

            </button>


          </motion.div>


        </div>


      </section>





      {/* FEATURES */}


      <section className="py-20">


        <div className="
          mx-auto
          max-w-6xl
          px-6
        ">


          <h2 className="
            text-center
            text-4xl
            font-bold
          ">

            Everything You Need In One Platform

          </h2>



          <div className="
            mt-12
            grid
            gap-8
            md:grid-cols-2
          ">


          {
            features.map((item,index)=>{

              const Icon=item.icon;


              return (

                <motion.div

                  key={index}

                  whileHover={{
                    y:-8
                  }}

                  className="
                    rounded-3xl
                    border
                    border-slate-800
                    bg-slate-900/70
                    p-8
                  "

                >


                  <div className="
                    mb-5
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-500/10
                    text-blue-400
                  ">

                    <Icon size={28}/>

                  </div>



                  <h3 className="
                    text-2xl
                    font-semibold
                  ">

                    {item.title}

                  </h3>



                  <p className="
                    mt-3
                    leading-7
                    text-slate-400
                  ">

                    {item.description}

                  </p>


                </motion.div>

              )

            })
          }


          </div>


        </div>


      </section>
            {/* HOW IT WORKS */}

      <section className="py-20">

        <div className="
          mx-auto
          max-w-6xl
          px-6
        ">


          <h2 className="
            text-center
            text-4xl
            font-bold
          ">

            How CampusHub AI Works

          </h2>


          <p className="
            mx-auto
            mt-4
            max-w-2xl
            text-center
            text-slate-400
          ">

            A simple journey from learning to career growth.

          </p>




          <div className="
            mt-12
            grid
            gap-6
            md:grid-cols-4
          ">


            {
              steps.map((step,index)=>(


                <motion.div

                  key={index}

                  initial={{
                    opacity:0,
                    y:30
                  }}

                  whileInView={{
                    opacity:1,
                    y:0
                  }}

                  viewport={{
                    once:true
                  }}

                  transition={{
                    delay:index * 0.1
                  }}

                  className="
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-900/60
                    p-6
                  "

                >


                  <div className="
                    mb-5
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-600/20
                    text-blue-400
                    font-bold
                    text-xl
                  ">

                    {index + 1}

                  </div>



                  <p className="
                    text-slate-300
                    leading-7
                  ">

                    {step}

                  </p>


                </motion.div>


              ))
            }


          </div>


        </div>


      </section>





      {/* STATS */}


      <section className="py-20">


        <div className="
          mx-auto
          max-w-6xl
          px-6
        ">


          <div className="
            grid
            gap-6
            md:grid-cols-4
          ">


            {
              stats.map((item,index)=>(


                <motion.div

                  key={index}

                  whileHover={{
                    y:-6
                  }}

                  className="
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-900/70
                    p-8
                    text-center
                  "

                >


                  <h3 className="
                    text-4xl
                    font-bold
                    text-blue-400
                  ">

                    {item.number}

                  </h3>



                  <p className="
                    mt-2
                    text-slate-400
                  ">

                    {item.text}

                  </p>


                </motion.div>


              ))
            }


          </div>


        </div>


      </section>





      {/* WHY CAMPUSHUB */}


      <section className="py-20">


        <div className="
          mx-auto
          max-w-6xl
          px-6
        ">


          <div className="
            rounded-3xl
            border
            border-slate-800
            bg-slate-900/70
            p-10
          ">


            <div className="
              flex
              items-center
              gap-3
            ">


              <Rocket 
                className="text-blue-400"
                size={32}
              />


              <h2 className="
                text-3xl
                font-bold
              ">

                Why Choose CampusHub AI?

              </h2>


            </div>




            <div className="
              mt-8
              grid
              gap-5
              md:grid-cols-2
            ">


              {
                [
                  "AI powered personalized learning",
                  "Career focused student tools",
                  "Modern ATS resume optimization",
                  "Smart preparation for interviews",
                ].map((item,index)=>(


                  <div

                    key={index}

                    className="
                      flex
                      items-center
                      gap-3
                      text-slate-300
                    "

                  >

                    <CheckCircle2 
                      size={20}
                      className="text-green-400"
                    />

                    {item}

                  </div>


                ))
              }


            </div>


          </div>


        </div>


      </section>
            {/* FINAL CTA */}

      <section className="pb-24">


        <motion.div

          initial={{
            opacity:0,
            scale:0.95
          }}

          whileInView={{
            opacity:1,
            scale:1
          }}

          viewport={{
            once:true
          }}

          className="
            mx-auto
            max-w-6xl
            rounded-3xl
            border
            border-slate-800
            bg-gradient-to-r
            from-slate-900
            via-slate-900
            to-slate-950
            p-12
            text-center
          "

        >


          <h2 className="
            text-4xl
            font-bold
            md:text-5xl
          ">


            Ready to Transform Your


            <span className="
              text-blue-500
            ">

              {" "}Learning Journey?

            </span>


          </h2>



          <p className="
            mx-auto
            mt-5
            max-w-2xl
            text-lg
            leading-8
            text-slate-400
          ">


            Join CampusHub AI and unlock smarter learning,
            better career preparation and endless growth opportunities.


          </p>




          <button

            onClick={() => navigate("/signup")}

            className="
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              px-8
              py-4
              font-semibold
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-2xl
              hover:shadow-blue-500/30
            "

          >

            Get Started

            <ArrowRight size={18}/>

          </button>



        </motion.div>


      </section>


      <Footer />


    </div>

  );

}


export default Discover;