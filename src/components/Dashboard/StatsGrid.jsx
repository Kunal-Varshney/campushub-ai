// import {
//   BookOpen,
//   Code2,
//   Trophy,
//   Flame,
// } from "lucide-react";

// import { motion } from "framer-motion";


// const stats = [

//   {
//     icon: BookOpen,
//     title: "Courses Started",
//     value: "0",
//     description: "Start learning today",
//   },

//   {
//     icon: Code2,
//     title: "Problems Solved",
//     value: "0",
//     description: "Practice coding daily",
//   },

//   {
//     icon: Trophy,
//     title: "Achievements",
//     value: "0",
//     description: "Complete goals to unlock",
//   },

//   {
//     icon: Flame,
//     title: "Learning Streak",
//     value: "0 Days",
//     description: "Build your consistency",
//   },

// ];


// function StatsGrid(){


// return (

// <div>


// <h3 className="mb-4 text-lg font-semibold">
// Learning Overview
// </h3>



// <div className="
// grid
// grid-cols-2
// gap-4
// lg:grid-cols-4
// ">


// {
// stats.map((item,index)=>{


// const Icon=item.icon;


// return (


// <motion.div

// key={item.title}


// initial={{
// opacity:0,
// y:15
// }}


// animate={{
// opacity:1,
// y:0
// }}


// transition={{
// duration:0.4,
// delay:index*0.08
// }}


// className="
// rounded-2xl
// border
// border-slate-800
// bg-slate-900/70
// p-5
// backdrop-blur-xl
// hover:border-blue-500/40
// transition
// "


// >


// <div className="
// mb-4
// flex
// h-10
// w-10
// items-center
// justify-center
// rounded-lg
// bg-gradient-to-r
// from-blue-600
// to-cyan-500
// ">

// <Icon size={20}/>

// </div>



// <h4 className="
// text-2xl
// font-bold
// ">

// {item.value}

// </h4>



// <p className="
// mt-1
// text-sm
// font-semibold
// ">

// {item.title}

// </p>



// <p className="
// mt-1
// text-xs
// text-gray-400
// ">

// {item.description}

// </p>



// </motion.div>


// )


// })

// }


// </div>


// </div>

// );


// }


// export default StatsGrid;









// src/components/Dashboard/StatsGrid.jsx

import {
  BookOpen,
  Target,
  Flame,
  Trophy,
} from "lucide-react";

import { motion } from "framer-motion";

const defaultStats = {
  learningProgress: 0,
  skillsCompleted: 0,
  totalSkills: 8,
  streak: 0,
  goalsCompleted: 0,
  totalGoals: 5,
};

function StatsGrid({ stats }) {
  const data = {
    ...defaultStats,
    ...(stats || {}),
  };

  const items = [
    {
      icon: BookOpen,
      label: "Learning Progress",
      value: `${data.learningProgress}%`,
      description: "Overall learning journey",
      progress: data.learningProgress,
    },

    {
      icon: Target,
      label: "Skills",
      value: `${data.skillsCompleted}/${data.totalSkills}`,
      description: "Skills developed",
      progress:
        data.totalSkills > 0
          ? (data.skillsCompleted / data.totalSkills) * 100
          : 0,
    },

    {
      icon: Flame,
      label: "Learning Streak",
      value: `${data.streak} Days`,
      description:
        data.streak > 0
          ? "Keep your momentum going"
          : "Start your streak today",
      progress: Math.min((data.streak / 30) * 100, 100),
    },

    {
      icon: Trophy,
      label: "Goals",
      value: `${data.goalsCompleted}/${data.totalGoals}`,
      description: "Career goals completed",
      progress:
        data.totalGoals > 0
          ? (data.goalsCompleted / data.totalGoals) * 100
          : 0,
    },
  ];

  return (
    <section>

      <div className="mb-4 flex items-end justify-between">

        <div>
          <h2 className="text-lg font-semibold">
            Progress Snapshot
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Your current learning and career progress
          </p>
        </div>

      </div>


      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        {items.map((item, index) => {

          const Icon = item.icon;

          const progress = Math.min(
            Math.max(item.progress || 0, 0),
            100
          );

          return (
            <motion.div
              key={item.label}

              initial={{
                opacity: 0,
                y: 15,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.4,
                delay: index * 0.07,
              }}

              className="
                group
                rounded-2xl
                border
                border-slate-800
                bg-slate-900/70
                p-5
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-500/30
                hover:bg-slate-900
              "
            >

              {/* Icon */}

              <div
                className="
                  mb-5
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-500/10
                  text-cyan-400
                  transition
                  group-hover:scale-105
                "
              >
                <Icon size={19} />
              </div>


              {/* Value */}

              <div className="flex items-baseline gap-1">

                <h3 className="text-2xl font-bold tracking-tight">
                  {item.value}
                </h3>

              </div>


              {/* Label */}

              <p className="mt-1 text-sm font-semibold text-gray-200">
                {item.label}
              </p>


              {/* Description */}

              <p className="mt-1 text-[11px] leading-4 text-gray-500">
                {item.description}
              </p>


              {/* Progress */}

              <div className="mt-4">

                <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">

                  <motion.div
                    initial={{ width: 0 }}

                    animate={{
                      width: `${progress}%`,
                    }}

                    transition={{
                      duration: 0.8,
                      delay: index * 0.07,
                    }}

                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-blue-600
                      to-cyan-400
                    "
                  />

                </div>

              </div>

            </motion.div>
          );
        })}

      </div>

    </section>
  );
}

export default StatsGrid;