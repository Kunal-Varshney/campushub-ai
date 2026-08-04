import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);

    alert("Password reset link sent 🚀");
  };


  return (
    <section className="
      relative min-h-screen overflow-hidden
      bg-slate-950 px-6
      text-white
      flex items-center justify-center
    ">

      {/* Background Glow */}
      <div className="
        pointer-events-none absolute
        -top-24 -left-24
        h-80 w-80
        rounded-full
        bg-blue-600/20
        blur-[120px]
      " />

      <div className="
        pointer-events-none absolute
        -bottom-24 -right-24
        h-80 w-80
        rounded-full
        bg-cyan-500/20
        blur-[120px]
      " />


      {/* Grid */}
      <div className="
        pointer-events-none absolute inset-0
        opacity-[0.04]
        [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)]
        [background-size:56px_56px]
      " />


      <motion.div
        initial={{
          opacity:0,
          y:30
        }}
        animate={{
          opacity:1,
          y:0
        }}
        transition={{
          duration:0.6
        }}

        className="
          relative
          w-full
          max-w-md
          rounded-3xl
          border
          border-slate-800
          bg-slate-900/80
          p-8
          backdrop-blur-xl
          shadow-2xl
          shadow-blue-500/20
        "
      >


        {/* Icon */}
        <div className="flex justify-center">

          <div className="
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            p-4
          ">
            <Sparkles size={30}/>
          </div>

        </div>



        <h1 className="
          mt-6
          text-center
          text-3xl
          font-bold
        ">
          Forgot Password?
        </h1>


        <p className="
          mt-3
          text-center
          text-gray-400
        ">
          Don't worry! Enter your email and
          we'll help you recover your account.
        </p>



        {/* Security Badge */}

        <div className="
          mt-6
          flex
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-blue-500/20
          bg-blue-500/10
          py-3
          text-sm
          text-blue-400
        ">

          <ShieldCheck size={18}/>

          Secure Password Recovery

        </div>




        <form
          onSubmit={handleSubmit}
          className="
            mt-8
            space-y-5
          "
        >


          {/* Email */}

          <div className="relative">

            <Mail
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

              type="email"

              required

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              placeholder="Enter your email"

              className="
                w-full
                rounded-xl
                border
                border-slate-700
                bg-slate-950
                py-3
                pl-12
                pr-4
                text-white
                outline-none
                transition-all
                focus:border-blue-500
                focus:shadow-lg
                focus:shadow-blue-500/20
              "

            />

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
              transition-all
              hover:-translate-y-1
              hover:shadow-xl
              hover:shadow-blue-500/30
              active:scale-95
            "

          >

            Send Reset Link


            <ArrowRight

              size={18}

              className="
                transition-transform
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

          Remember your password?


          <Link

            to="/login"

            className="
              ml-2
              text-blue-400
              hover:text-cyan-400
            "

          >
            Back to Login

          </Link>


        </p>


      </motion.div>


    </section>
  );
}


export default ForgotPassword;