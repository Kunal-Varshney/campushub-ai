import {
  PlayCircle,
  Clock,
  Flame,
  TrendingUp,
  Target,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

const items = [
  {
    icon: Flame,
    title: "Learning Streak",
    description: "0 Days Active",
    info: "Start learning today 🚀",
  },

  {
    icon: TrendingUp,
    title: "Skill Progress",
    description: "No progress yet",
    info: "Complete lessons to grow",
  },

  {
    icon: Target,
    title: "Your Goals",
    description: "No goals added",
    info: "Set your career targets",
  },

  {
    icon: Sparkles,
    title: "AI Recommendation",
    description: "Waiting for activity",
    info: "AI will personalize suggestions",
  },

  {
    icon: Clock,
    title: "Study Planner",
    description: "Create your schedule",
    info: "Plan your learning journey",
  },

  {
    icon: PlayCircle,
    title: "Daily Challenge",
    description: "No challenge started",
    info: "Complete tasks to improve",
  },
];


function QuickAccess(){

return (

<div>

<h3 className="mb-4 text-lg font-semibold">
Quick Access
</h3>


<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">


{items.map((item,index)=>{

const Icon=item.icon;


return (

<motion.div

key={item.title}

initial={{
opacity:0,
y:15
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:0.4,
delay:index*0.05
}}

className="
rounded-2xl
border
border-slate-800
bg-slate-900/70
p-5
backdrop-blur-xl
hover:border-blue-500/50
transition-all
duration-300
hover:shadow-lg
hover:shadow-blue-500/20
hover:-translate-y-1
"

>


<div className="
mb-3
flex
h-10
w-10
items-center
justify-center
rounded-lg
bg-gradient-to-r
from-blue-600
to-cyan-500
">

<Icon size={18}/>

</div>


<p className="text-sm font-semibold">
{item.title}
</p>


<p className="mt-1 text-xs text-gray-300">
{item.description}
</p>


<p className="mt-2 text-[11px] text-gray-500">
{item.info}
</p>


</motion.div>

)

})}


</div>


</div>

)

}


export default QuickAccess;