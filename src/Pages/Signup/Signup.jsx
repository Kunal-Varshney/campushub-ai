import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Brain,
  FileText,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";


function Signup() {

  const [showPassword, setShowPassword] = useState(false);


  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
    college:"",
    role:"Student",
  });



  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(formData);

    alert("Account Created Successfully 🚀");

  };



  const features = [
    {
      icon: Brain,
      text:"AI Study Assistant"
    },
    {
      icon: FileText,
      text:"Smart Notes Generator"
    },
    {
      icon: Target,
      text:"Career Roadmaps"
    }
  ];



  return (

    <section className="
      relative
      min-h-screen
      overflow-hidden
      bg-slate-950
      px-6
      py-12
      text-white
    ">


      {/* Background Glow */}

      <div className="
        absolute
        -top-20
        -left-20
        h-96
        w-96
        rounded-full
        bg-blue-600/20
        blur-[120px]
      "/>


      <div className="
        absolute
        -bottom-20
        -right-20
        h-96
        w-96
        rounded-full
        bg-cyan-500/20
        blur-[120px]
      "/>



      <div className="
        relative
        mx-auto
        flex
        min-h-screen
        max-w-7xl
        items-center
        justify-center
      ">



        <div className="
          grid
          w-full
          items-center
          gap-12
          lg:grid-cols-2
        ">



          {/* LEFT SIDE */}

        <motion.div
          initial={{
            opacity:0,
            x:-50
          }}

          animate={{
            opacity:1,
            x:0
          }}

          transition={{
            duration:0.6
          }}

          className="
            hidden
            lg:block
          "

        >


          <motion.div

            whileHover={{
              scale:1.05
            }}

            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-blue-500/20
              bg-slate-900/70
              px-4
              py-2
              text-sm
              text-blue-400
              transition-all
              duration-300
              hover:border-blue-500/50
              hover:shadow-lg
              hover:shadow-blue-500/20
            "

          >

            <Sparkles size={16}/>

            Join CampusHub AI

          </motion.div>




          <motion.h1

            initial={{
              opacity:0,
              y:20
            }}

            animate={{
              opacity:1,
              y:0
            }}

            transition={{
              delay:0.2,
              duration:0.6
            }}

            className="
              mt-6
              text-5xl
              font-extrabold
              leading-tight
            "

          >

            Build Your

            <span className="
              bg-gradient-to-r
              from-blue-500
              to-cyan-400
              bg-clip-text
              text-transparent
            ">

              {" "}Smart Learning

            </span>

            Journey

          </motion.h1>




          <p className="
            mt-6
            max-w-lg
            text-lg
            leading-relaxed
            text-gray-400
          ">

            Create your account and unlock AI-powered learning,
            smart notes, career tools and personalized growth.

          </p>





          <div className="
            mt-8
            space-y-4
          ">


            {
              features.map((item,index)=>(


                <motion.div

                  key={index}

                  whileHover={{
                    x:10
                  }}

                  transition={{
                    duration:0.25
                  }}

                  className="
                    group
                    flex
                    items-center
                    gap-4
                    rounded-xl
                    border
                    border-transparent
                    p-3
                    text-gray-300
                    transition-all
                    duration-300
                    hover:border-blue-500/30
                    hover:bg-slate-900/60
                  "

                >


                  <div className="
                    rounded-xl
                    border
                    border-blue-500/20
                    bg-slate-900
                    p-3
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:border-blue-500/50
                  ">


                    <item.icon

                      size={20}

                      className="
                        text-blue-400
                      "

                    />


                  </div>


                  {item.text}


                </motion.div>


              ))
            }


          </div>






          <div className="
            mt-10
            flex
            gap-4
          ">


            <motion.div

              whileHover={{
                y:-8
              }}

              className="
                rounded-xl
                border
                border-slate-800
                bg-slate-900/60
                px-5
                py-3
                transition-all
                duration-300
                hover:border-blue-500/40
                hover:shadow-lg
                hover:shadow-blue-500/20
              "

            >

              <p className="font-bold">
                10K+
              </p>

              <span className="
                text-sm
                text-gray-400
              ">
                Students
              </span>


            </motion.div>





            <motion.div

              whileHover={{
                y:-8
              }}

              className="
                rounded-xl
                border
                border-slate-800
                bg-slate-900/60
                px-5
                py-3
                transition-all
                duration-300
                hover:border-blue-500/40
                hover:shadow-lg
                hover:shadow-blue-500/20
              "

            >

              <p className="font-bold">
                50K+
              </p>


              <span className="
                text-sm
                text-gray-400
              ">

                Notes

              </span>


            </motion.div>



          </div>



        </motion.div>






          {/* SIGNUP CARD */}


          <motion.div

            initial={{
              opacity:0,
              scale:0.95
            }}

            animate={{
              opacity:1,
              scale:1
            }}

            transition={{
              duration:0.6
            }}


            className="
              mx-auto
              w-full
              max-w-md
              rounded-3xl
              border
              border-slate-800
              bg-slate-900/70
              p-8
              shadow-2xl
              shadow-blue-500/20
              backdrop-blur-xl
              transition-all
              duration-500
              hover:translate-y-2
              hover:shadow-blue-500/40
              hover:shadow-blue-500/30
             "
          >


            <h2 className="
              text-3xl
              font-bold
            ">

              Create Account

            </h2>


            <p className="
              mt-2
              text-gray-400
            ">

              Start your AI learning journey

            </p>




            <form
              onSubmit={handleSubmit}
              className="
                mt-8
                space-y-5
              "
            >



              <Input
                icon={<User size={18}/>}
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
              />



              <Input
                icon={<Mail size={18}/>}
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                type="email"
              />



              <Input
                icon={<GraduationCap size={18}/>}
                name="college"
                value={formData.college}
                onChange={handleChange}
                placeholder="College Name"
              />




              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-950
                  px-4
                  py-3
                  text-white
                  outline-none
                "
              >

                <option>
                  Student
                </option>

                <option>
                  Recruiter
                </option>

              </select>




              <div className="relative">

                <Lock
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-500
                  "
                />

                <input

                  name="password"

                  value={formData.password}

                  onChange={handleChange}

                  type={
                    showPassword
                    ?
                    "text"
                    :
                    "password"
                  }

                  placeholder="Password"

                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-950
                    py-3
                    pl-12
                    pr-12
                    text-white
                    outline-none
                    focus:border-blue-500
                  "

                />



                <button
                  type="button"
                  onClick={()=>setShowPassword(!showPassword)}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                >

                  {
                    showPassword
                    ?
                    <EyeOff size={18}/>
                    :
                    <Eye size={18}/>
                  }

                </button>

              </div>




              <button

                type="submit"

                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-500
                  py-3.5
                  font-semibold
                  transition
                  hover:-translate-y-1
                  hover:shadow-xl
                  hover:shadow-blue-500/30
                "

              >

                Create Account

                <ArrowRight
                  size={18}
                  className="
                    transition
                    group-hover:translate-x-1
                  "
                />

              </button>



            </form>




            <p className="
              mt-6
              text-center
              text-sm
              text-gray-400
            ">

              Already have an account?

              <Link
                to="/login"
                className="
                  ml-2
                  text-blue-400
                "
              >
                Login
              </Link>

            </p>


          </motion.div>



        </div>

      </div>


    </section>

  );

}





function Input({
  icon,
  name,
  value,
  onChange,
  placeholder,
  type="text"
}){

  return (

    <div className="relative">

      <span className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-gray-500
      ">

        {icon}

      </span>


      <input

        name={name}

        value={value}

        onChange={onChange}

        type={type}

        placeholder={placeholder}

        className="
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-950
          py-3
          pl-12
          text-white
          outline-none
          transition
          focus:border-blue-500
        "

      />


    </div>

  );

}


export default Signup;