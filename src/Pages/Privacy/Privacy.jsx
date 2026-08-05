import {
  Shield,
  Database,
  User,
  Lock,
  Globe,
  Cookie,
  Eye,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


function Privacy() {

  const navigate = useNavigate();


  const collectData = [
    {
      icon: User,
      title: "Personal Information",
      description:
        "We may collect your name, email address, college name and account details when you register on CampusHub AI.",
    },
    {
      icon: Database,
      title: "Learning Data",
      description:
        "Your activity such as notes, AI interactions, quizzes and learning progress may be stored to improve your experience.",
    },
    {
      icon: Globe,
      title: "Device Information",
      description:
        "Basic browser, operating system and device information helps us improve performance and security.",
    },
  ];


  const usageData = [
    {
      icon: Shield,
      title: "Improve Your Experience",
      description:
        "We personalize learning recommendations and improve platform performance.",
    },
    {
      icon: Lock,
      title: "Account Security",
      description:
        "Your information helps us detect suspicious activity and keep your account secure.",
    },
    {
      icon: Sparkles,
      title: "AI Personalization",
      description:
        "CampusHub AI may use your interactions to provide smarter recommendations and study assistance.",
    },
    {
      icon: Eye,
      title: "Platform Analytics",
      description:
        "Anonymous analytics help us understand usage trends and continuously improve CampusHub AI.",
    },
  ];


  return (

    <div className="min-h-screen bg-slate-950 text-white">



      {/* Hero Section */}

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
        " />


        <div className="
          absolute
          -bottom-24
          -right-24
          h-80
          w-80
          rounded-full
          bg-cyan-500/20
          blur-[120px]
        " />


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
              mb-6
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

              <Shield size={16}/>

              Privacy & Security

            </div>



            <h1 className="
              text-5xl
              font-extrabold
              leading-tight
            ">

              Privacy

              <span className="
                bg-gradient-to-r
                from-blue-500
                to-cyan-400
                bg-clip-text
                text-transparent
              ">

                {" "}Policy

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

              Your privacy matters to us. CampusHub AI is committed to
              protecting your personal information and providing a safe,
              secure and transparent learning experience.

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



      {/* Information We Collect */}


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

              Information

              <span className="text-blue-400">

                {" "}We Collect

              </span>

            </h2>



            <p className="
              mt-4
              max-w-2xl
              text-slate-400
            ">

              We collect only the information necessary to provide a better
              learning experience and improve CampusHub AI.

            </p>


          </motion.div>

                    <div className="
            mt-12
            grid
            gap-8
            md:grid-cols-3
          ">


            {collectData.map((item,index)=>{

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
                    delay:index * 0.15
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
          {/* How We Use Your Information */}



          <div className="mt-28">


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


                How We


                <span className="text-blue-400">

                  {" "}Use Your Information

                </span>


              </h2>
              <p className="
                mt-4
                max-w-2xl
                text-slate-400
              ">

                We use your information responsibly to improve your learning
                experience while keeping your privacy protected.

              </p>


            </motion.div>
            <div className="
              mt-12
              grid
              gap-8
              md:grid-cols-2
            ">


              {usageData.map((item,index)=>{


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
                      delay:index * 0.15
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
                      hover:border-cyan-500
                      hover:shadow-2xl
                      hover:shadow-cyan-500/10
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
                      bg-cyan-500/10
                      text-cyan-400
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
          {/* Data Security */}
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
              mt-28
              rounded-3xl
              border
              border-slate-800
              bg-slate-900/60
              p-10
              backdrop-blur-xl
            "

          >


            <div className="
              flex
              items-center
              gap-4
            ">


              <div className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-blue-500/10
                text-blue-400
              ">

                <Shield size={32}/>

              </div>
              <div>


                <h2 className="
                  text-3xl
                  font-bold
                ">

                  Data Security

                </h2>



                <p className="
                  mt-2
                  text-slate-400
                ">

                  Your privacy and account security are important to us.

                </p>



              </div>


            </div>

                        <div className="
              mt-8
              grid
              gap-6
              md:grid-cols-2
            ">


              <div className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-950/60
                p-6
              ">


                <h3 className="
                  text-xl
                  font-semibold
                ">

                  Secure Storage

                </h3>



                <p className="
                  mt-3
                  leading-7
                  text-slate-400
                ">

                  We use reasonable security measures to help protect your
                  personal information from unauthorized access, disclosure
                  or misuse.

                </p>


              </div>
              <div className="
                rounded-2xl
                border
                border-slate-800
                bg-slate-950/60
                p-6
              ">


                <h3 className="
                  text-xl
                  font-semibold
                ">

                  Account Protection

                </h3>



                <p className="
                  mt-3
                  leading-7
                  text-slate-400
                ">

                  Users are encouraged to use strong passwords and keep
                  their login credentials private to help maintain account
                  security.

                </p>


              </div>



            </div>



          </motion.div>
          {/* Cookies */}
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
              mt-24
              rounded-3xl
              border
              border-slate-800
              bg-slate-900/60
              p-10
              backdrop-blur-xl
            "

          >
            <div className="
              flex
              items-center
              gap-4
            ">



              <div className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-amber-500/10
                text-amber-400
              ">
                <Cookie size={30}/>
              </div>
              <div>
                <h2 className="
                  text-3xl
                  font-bold
                ">

                  Cookies

                </h2>
                <p className="
                  mt-2
                  text-slate-400
                ">

                  Small data files that help improve your browsing experience.
                </p>
              </div>
            </div>
            <p className="
              mt-8
              leading-8
              text-slate-400
            ">


              CampusHub AI may use cookies to remember your preferences,
              improve website performance and understand how visitors use
              our platform. You can disable cookies from your browser
              settings if you prefer.
            </p>
          </motion.div>
          {/* Third Party Services */}
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
              mt-24
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
              Third-Party Services
            </h2>
            <p className="
              mt-6
              leading-8
              text-slate-400
            ">
              CampusHub AI may integrate trusted third-party services such as
              authentication providers, analytics tools and AI services to
              enhance your experience. These services have their own privacy
              policies and we encourage you to review them whenever applicable.
            </p>
          </motion.div>
          {/* Your Rights */}
          <div className="mt-28">


            <h2 className="
              text-4xl
              font-bold
            ">
              Your
              <span className="text-blue-400">

                {" "}Rights

              </span>
            </h2>
            <div className="
              mt-10
              grid
              gap-6
              md:grid-cols-2
              lg:grid-cols-4
            ">



              {[
                {
                  title:"Access",
                  text:"Request access to your personal information."
                },

                {
                  title:"Update",
                  text:"Modify your profile information anytime."
                },

                {
                  title:"Delete",
                  text:"Request deletion of your account and data."
                },

                {
                  title:"Support",
                  text:"Contact us for privacy related questions."
                },

              ].map((item,index)=>(



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
                    delay:index*0.1
                  }}


                  className="
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-900/60
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:border-blue-500
                    hover:shadow-xl
                    hover:shadow-blue-500/10
                  "

                >
                  <h3 className="
                    text-xl
                    font-semibold
                  ">

                    {item.title}

                  </h3>
                  <p className="
                    mt-3
                    leading-7
                    text-slate-400
                  ">


                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

           {/* Contact */}

          <motion.div

            initial={{
              opacity:0
            }}

            whileInView={{
              opacity:1
            }}

            viewport={{
              once:true
            }}


            className="
              mt-24
              rounded-3xl
              border
              border-slate-800
              bg-slate-900/60
              p-10
              text-center
            "
          >
            <h2 className="
              text-3xl
              font-bold
            ">

              Contact Us

            </h2>
            <p className="
              mt-5
              leading-8
              text-slate-400
            ">

              If you have any questions regarding this Privacy Policy or your
              personal information, feel free to contact us.

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



              Ready to Start



              <span className="
                bg-gradient-to-r
                from-blue-500
                to-cyan-400
                bg-clip-text
                text-transparent
              ">

                {" "}Learning?

              </span>
            </h2>
            <p className="
              mx-auto
              mt-5
              max-w-2xl
              text-slate-400
            ">


              Join thousands of students using CampusHub AI to learn smarter,
              build better resumes and grow their careers.


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
export default Privacy;