import { PlayCircle, ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


function ContinueLearning() {

  const navigate = useNavigate();


  // Future me backend se aayega
  const learningData = null;


  return (

    <div>

      <h3 className="mb-4 text-lg font-semibold">
        Continue Learning
      </h3>


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


      {
        learningData ? (

          <>

          <div className="flex items-center gap-4">

            <div className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            ">

              <BookOpen size={22}/>

            </div>


            <div>

              <h4 className="font-semibold">
                {learningData.title}
              </h4>

              <p className="text-sm text-gray-400">
                Continue from where you stopped
              </p>

            </div>


          </div>



          <button

          onClick={()=>navigate(learningData.route)}

          className="
          mt-5
          flex
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-5
          py-2.5
          text-sm
          font-semibold
          hover:bg-blue-500
          "

          >

          Continue
          <ArrowRight size={16}/>

          </button>


          </>


        ) : (


          <div className="text-center">


            <div className="
            mx-auto
            mb-4
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-blue-600/20
            text-blue-400
            ">

              <PlayCircle size={28}/>

            </div>



            <h4 className="text-lg font-semibold">

               No course started yet

            </h4>



            <p className="
            mt-2
            text-sm
            text-gray-400
            ">

              You haven't started any course yet.
              Explore courses and begin learning.

            </p>



            <button

            onClick={()=>navigate("/discover")}

            className="
            mt-5
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-500
            px-6
            py-2.5
            text-sm
            font-semibold
            transition
            hover:scale-105
            "

            >

              Start Learning

            </button>


          </div>


        )

      }


      </motion.div>


    </div>

  );

}


export default ContinueLearning;