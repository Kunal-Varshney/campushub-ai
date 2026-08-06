import { Clock, MessageSquare, BookOpen, FileText } from "lucide-react";
import { motion } from "framer-motion";


const activities = null;


function RecentActivity() {


  return (

    <div>


      <h3 className="mb-4 text-lg font-semibold">
        Recent Activity
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
        activities ? (


          <div className="space-y-4">


            {activities.map((item,index)=>(

              <div

              key={index}

              className="
              flex
              items-center
              gap-4
              rounded-xl
              border
              border-slate-800
              bg-slate-950/50
              p-4
              "

              >


              <div className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              bg-blue-600/20
              text-blue-400
              ">

                {
                  item.type==="ai"
                  ?
                  <MessageSquare size={18}/>
                  :
                  item.type==="notes"
                  ?
                  <FileText size={18}/>
                  :
                  <BookOpen size={18}/>
                }

              </div>



              <div>

                <p className="text-sm font-semibold">
                  {item.title}
                </p>

                <p className="text-xs text-gray-400">
                  {item.time}
                </p>

              </div>



              </div>


            ))}


          </div>



        ) : (


          <div className="py-6 text-center">


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

              <Clock size={28}/>

            </div>



            <h4 className="text-lg font-semibold">

              No activity yet

            </h4>



            <p className="
            mt-2
            text-sm
            text-gray-400
            ">

              Start using AI Assistant, Notes or Courses.
               Your progress will appear here.

            </p>


          </div>


        )

      }


      </motion.div>


    </div>

  );

}


export default RecentActivity;