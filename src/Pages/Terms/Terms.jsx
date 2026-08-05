import {
  FileText,
  Shield,
  UserCheck,
  CreditCard,
  AlertCircle,
  Globe,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

function Terms() {


  const sections = [
    {
      icon: UserCheck,
      title: "User Responsibilities",
      description:
        "Users must provide accurate information and use CampusHub AI responsibly while following all applicable rules.",
    },
    {
      icon: Shield,
      title: "Account Security",
      description:
        "Users are responsible for maintaining their account credentials and keeping their login information secure.",
    },
    {
      icon: Sparkles,
      title: "AI Services",
      description:
        "CampusHub AI provides AI-powered learning assistance. Users should verify important information before making decisions.",
    },
    {
      icon: CreditCard,
      title: "Payments & Services",
      description:
        "Any premium services, subscriptions or payments will be handled through secure payment providers.",
    },
    {
      icon: Globe,
      title: "Platform Usage",
      description:
        "Users should not misuse the platform, attempt unauthorized access or harm the experience of other users.",
    },
    {
      icon: AlertCircle,
      title: "Limitations",
      description:
        "CampusHub AI continuously improves its services but cannot guarantee uninterrupted availability at all times.",
    },
  ];



  return (

    <div className="min-h-screen bg-slate-950 text-white">


      {/* Hero */}

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
          absolute
          -bottom-24
          -right-24
          h-80
          w-80
          rounded-full
          bg-cyan-500/20
          blur-[120px]
        "/>



        <div className="
          relative
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
              border-blue-500/20
              bg-slate-900/70
              px-5
              py-2
              text-sm
              text-blue-400
            ">

              <FileText size={16}/>

              Terms & Conditions

            </div>



            <h1 className="
              mt-6
              text-5xl
              font-extrabold
            ">


              Terms


              <span className="
                bg-gradient-to-r
                from-blue-500
                to-cyan-400
                bg-clip-text
                text-transparent
              ">

                {" "}of Service

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


              Please read these terms carefully before using CampusHub AI.
              By accessing our platform, you agree to follow these terms.


            </p>



            <div className="
              mt-8
              inline-flex
              rounded-full
              border
              border-slate-700
              bg-slate-900/60
              px-5
              py-2
              text-sm
              text-slate-300
            ">

              Last Updated • August 2026

            </div>


          </motion.div>


        </div>


      </section>
            {/* Terms Sections */}

      <section className="pb-24">

        <div className="
          mx-auto
          max-w-6xl
          px-6
        ">


          <motion.div

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

          >

            <h2 className="
              text-4xl
              font-bold
            ">

              Terms

              <span className="text-blue-400">

                {" "}and Conditions

              </span>

            </h2>


            <p className="
              mt-4
              max-w-2xl
              text-slate-400
            ">

              These terms explain how users can access and use CampusHub AI
              services safely and responsibly.

            </p>


          </motion.div>





          <div className="
            mt-12
            grid
            gap-8
            md:grid-cols-2
            lg:grid-cols-3
          ">



            {sections.map((item,index)=>{


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


                  viewport={{
                    once:true
                  }}


                  transition={{
                    delay:index * 0.12
                  }}



                  className="
                    group
                    rounded-3xl
                    border
                    border-slate-800
                    bg-slate-900/60
                    p-8
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-blue-500
                    hover:shadow-2xl
                    hover:shadow-blue-500/10
                  "


                >



                  <div className="
                    mb-6
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-blue-500/10
                    text-blue-400
                    transition
                    duration-300
                    group-hover:scale-110
                  ">


                    <Icon size={30}/>


                  </div>





                  <h3 className="
                    mb-4
                    text-xl
                    font-semibold
                  ">


                    {item.title}


                  </h3>





                  <p className="
                    leading-7
                    text-slate-400
                  ">


                    {item.description}


                  </p>




                </motion.div>



              )


            })}



          </div>



        </div>


      </section>
            {/* Important Information */}


      <section className="pb-24">


        <div className="
          mx-auto
          max-w-6xl
          px-6
        ">



          <div className="
            grid
            gap-8
            md:grid-cols-2
          ">



            <motion.div

              initial={{
                opacity:0,
                x:-40
              }}

              whileInView={{
                opacity:1,
                x:0
              }}

              viewport={{
                once:true
              }}


              className="
                rounded-3xl
                border
                border-slate-800
                bg-slate-900/60
                p-10
                backdrop-blur-xl
              "

            >


              <h2 className="
                text-3xl
                font-bold
              ">

                User Agreement

              </h2>



              <p className="
                mt-5
                leading-8
                text-slate-400
              ">


                By creating an account and using CampusHub AI, you agree to
                follow these terms and use the platform only for educational
                and productive purposes.


              </p>



              <p className="
                mt-5
                leading-8
                text-slate-400
              ">


                Users must not attempt to damage the platform, access
                unauthorized data, or misuse AI features.


              </p>



            </motion.div>






            <motion.div

              initial={{
                opacity:0,
                x:40
              }}

              whileInView={{
                opacity:1,
                x:0
              }}

              viewport={{
                once:true
              }}


              className="
                rounded-3xl
                border
                border-slate-800
                bg-slate-900/60
                p-10
                backdrop-blur-xl
              "

            >


              <h2 className="
                text-3xl
                font-bold
              ">

                Service Availability

              </h2>




              <p className="
                mt-5
                leading-8
                text-slate-400
              ">


                We continuously work to keep CampusHub AI available and
                reliable. However, temporary interruptions may occur due to
                maintenance, updates or technical issues.


              </p>



              <p className="
                mt-5
                leading-8
                text-slate-400
              ">


                We reserve the right to improve, modify or update features
                to provide a better learning experience.


              </p>



            </motion.div>



          </div>






          <motion.div

            initial={{
              opacity:0,
              y:40
            }}

            whileInView={{
              opacity:1,
              y:0
            }}

            viewport={{
              once:true
            }}


            className="
              mt-10
              rounded-3xl
              border
              border-slate-800
              bg-slate-900/60
              p-10
              backdrop-blur-xl
            "

          >



            <h2 className="
              text-3xl
              font-bold
            ">


              Intellectual Property


            </h2>




            <p className="
              mt-5
              leading-8
              text-slate-400
            ">


              All content, designs, branding, logos, software and materials
              available on CampusHub AI belong to their respective owners and
              should not be copied, distributed or used without permission.


            </p>



          </motion.div>





          <motion.div

            initial={{
              opacity:0,
              y:40
            }}

            whileInView={{
              opacity:1,
              y:0
            }}

            viewport={{
              once:true
            }}


            className="
              mt-10
              rounded-3xl
              border
              border-slate-800
              bg-slate-900/60
              p-10
              backdrop-blur-xl
            "

          >



            <h2 className="
              text-3xl
              font-bold
            ">


              Privacy Policy


            </h2>




            <p className="
              mt-5
              leading-8
              text-slate-400
            ">


              Your privacy is important to us. Information collected through
              CampusHub AI is handled according to our Privacy Policy to keep
              your data safe and secure.


            </p>



          </motion.div>




        </div>


      </section>
            {/* Contact Section */}


      <section className="pb-24">


        <div className="
          mx-auto
          max-w-6xl
          px-6
        ">



          <motion.div

            initial={{
              opacity:0,
              y:40
            }}

            whileInView={{
              opacity:1,
              y:0
            }}

            viewport={{
              once:true
            }}


            className="
              rounded-3xl
              border
              border-slate-800
              bg-slate-900/60
              p-10
              text-center
              backdrop-blur-xl
            "

          >



            <h2 className="
              text-3xl
              font-bold
            ">


              Contact Us


            </h2>




            <p className="
              mx-auto
              mt-5
              max-w-2xl
              leading-8
              text-slate-400
            ">


              If you have any questions regarding these Terms and Conditions,
              please contact our support team.


            </p>




            <p className="
              mt-6
              text-lg
              font-semibold
              text-blue-400
            ">


              support@campushubai.com


            </p>



          </motion.div>







          {/* CTA */}



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
              mt-24
              overflow-hidden
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
            ">


              Start Your Learning Journey


              <span className="
                bg-gradient-to-r
                from-blue-500
                to-cyan-400
                bg-clip-text
                text-transparent
              ">

                {" "}Today

              </span>


            </h2>






            <p className="
              mx-auto
              mt-5
              max-w-2xl
              text-slate-400
            ">


              Join CampusHub AI and explore smarter learning,
              AI assistance and career growth tools.


            </p>







            <button

              onClick={() => navigate("/signup")}


              className="
                mt-10
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                px-8
                py-4
                text-lg
                font-semibold
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                hover:shadow-blue-500/30
              "

            >


              Get Started →


            </button>





          </motion.div>




        </div>


      </section>



    </div>


  );


}



export default Terms;