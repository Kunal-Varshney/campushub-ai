import {
  Briefcase,
  Users,
  Rocket,
  Code
} from "lucide-react";

import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";


const opportunities = [
  {
    icon: Code,
    title: "Frontend Developer Intern",
    description:
      "Work with React, Tailwind CSS and build modern AI powered interfaces."
  },

  {
    icon: Rocket,
    title: "AI/ML Intern",
    description:
      "Explore machine learning solutions and AI based student tools."
  },

  {
    icon: Users,
    title: "Community Manager",
    description:
      "Help students connect, collaborate and grow together."
  }
];


function Careers() {

  return (

    <div className="bg-slate-950 min-h-screen text-white">

      <Navbar />


      {/* Hero */}

      <section className="
      py-20
      text-center
      px-6
      ">

        <h1 className="
        text-4xl
        md:text-5xl
        font-bold
        ">
          Build The Future With
          <span className="text-indigo-400">
            {" "}CampusHub AI
          </span>
        </h1>


        <p className="
        mt-6
        max-w-2xl
        mx-auto
        text-slate-400
        ">
          Join our team and help us create smarter solutions
          for students around the world.
        </p>


      </section>



      {/* Opportunities */}

      <section className="
      pb-20
      px-6
      ">

        <div className="
        max-w-6xl
        mx-auto
        ">

          <h2 className="
          text-3xl
          font-bold
          text-center
          mb-12
          ">
            Open Opportunities
          </h2>


          <div className="
          grid
          md:grid-cols-3
          gap-8
          ">


          {
            opportunities.map((item,index)=>{

              const Icon = item.icon;


              return (

                <motion.div

                key={index}

                initial={{
                  opacity:0,
                  y:40
                }}

                whileInView={{
                  opacity:1,
                  y:0
                }}

                transition={{
                  duration:0.5,
                  delay:index*0.2
                }}

                viewport={{
                  once:true
                }}

                className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-8
                text-center
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-indigo-500
                hover:shadow-xl
                "

                >

                  <div className="
                  mx-auto
                  mb-6
                  w-16
                  h-16
                  flex
                  items-center
                  justify-center
                  rounded-full
                  bg-indigo-500/20
                  text-indigo-400
                  ">

                    <Icon size={32}/>

                  </div>


                  <h3 className="
                  text-xl
                  font-semibold
                  mb-3
                  ">
                    {item.title}
                  </h3>


                  <p className="
                  text-slate-400
                  ">
                    {item.description}
                  </p>


                  <button className="
                  mt-6
                  rounded-lg
                  bg-indigo-500
                  px-6
                  py-2
                  font-medium
                  hover:bg-indigo-600
                  transition
                  ">
                    Apply Now
                  </button>


                </motion.div>

              )

            })
          }


          </div>

        </div>

      </section>


      <Footer />

    </div>

  );
}

export default Careers; 