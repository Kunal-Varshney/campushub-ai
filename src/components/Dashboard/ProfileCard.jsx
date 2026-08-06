import { User, Mail, Edit3 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


function ProfileCard() {

  const navigate = useNavigate();


  // Future me backend se aayega
  const storedUser = JSON.parse(
    localStorage.getItem("user")
  );

  const user = {
    name: storedUser?.name || "New Student",
    email: storedUser?.email || "Complete your profile",
    strength: storedUser?.profileStrength || 20,
  };


  return (

    <motion.div

      initial={{
        opacity:0,
        y:15
      }}

      animate={{
        opacity:1,
        y:0
      }}

      className="
      rounded-2xl
      border
      border-slate-800
      bg-slate-900/70
      p-6
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
        rounded-full
        bg-gradient-to-r
        from-blue-600
        to-cyan-500
        ">

          <User size={30}/>

        </div>



        <div>

          <h3 className="
          text-lg
          font-semibold
          ">

            {user.name}

          </h3>


          <div className="
          mt-1
          flex
          items-center
          gap-2
          text-sm
          text-gray-400
          ">

            <Mail size={14}/>

            {user.email}

          </div>


        </div>


      </div>



      <div className="mt-6">


        <div className="
        mb-2
        flex
        justify-between
        text-sm
        ">


          <span className="text-gray-400">
            Profile Strength
          </span>


          <span className="font-semibold">
            {user.strength}%
          </span>


        </div>



        <div className="
        h-2
        overflow-hidden
        rounded-full
        bg-slate-800
        ">


          <div

          className="
          h-full
          rounded-full
          bg-gradient-to-r
          from-blue-600
          to-cyan-500
          "

          style={{
            width:`${user.strength}%`
          }}

          />


        </div>


      </div>




      <button

      onClick={()=>navigate("/profile")}

      className="
      mt-6
      flex
      w-full
      items-center
      justify-center
      gap-2
      rounded-xl
      border
      border-slate-700
      bg-slate-800/60
      py-2.5
      text-sm
      font-semibold
      transition
      hover:border-blue-500
      hover:text-blue-400
      "

      >

        <Edit3 size={16}/>

        Complete Profile

      </button>



    </motion.div>

  );

}


export default ProfileCard;