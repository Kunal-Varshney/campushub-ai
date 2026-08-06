import {
  BookOpen,
  Code2,
  Trophy,
  Flame,
} from "lucide-react";

import { motion } from "framer-motion";


const stats = [

  {
    icon: BookOpen,
    title: "Courses Started",
    value: "0",
    description: "Start learning today",
  },

  {
    icon: Code2,
    title: "Problems Solved",
    value: "0",
    description: "Practice coding daily",
  },

  {
    icon: Trophy,
    title: "Achievements",
    value: "0",
    description: "Complete goals to unlock",
  },

  {
    icon: Flame,
    title: "Learning Streak",
    value: "0 Days",
    description: "Build your consistency",
  },

];


function StatsGrid(){


return (

<div>


<h3 className="mb-4 text-lg font-semibold">
Learning Overview
</h3>



<div className="
grid
grid-cols-2
gap-4
lg:grid-cols-4
">


{
stats.map((item,index)=>{


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
delay:index*0.08
}}


className="
rounded-2xl
border
border-slate-800
bg-slate-900/70
p-5
backdrop-blur-xl
hover:border-blue-500/40
transition
"


>


<div className="
mb-4
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

<Icon size={20}/>

</div>



<h4 className="
text-2xl
font-bold
">

{item.value}

</h4>



<p className="
mt-1
text-sm
font-semibold
">

{item.title}

</p>



<p className="
mt-1
text-xs
text-gray-400
">

{item.description}

</p>



</motion.div>


)


})

}


</div>


</div>

);


}


export default StatsGrid;