import {
  Briefcase,
  Users,
  Rocket,
  Code,
  Brain,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Target
} from "lucide-react";

import { motion } from "framer-motion";

const opportunities = [

  {
    icon: Code,
    title: "Frontend Developer Intern",
    description:
      "Build modern React interfaces and create smooth experiences for students."
  },

  {
    icon: Brain,
    title: "AI/ML Intern",
    description:
      "Develop intelligent solutions using machine learning and AI technologies."
  },

  {
    icon: Users,
    title: "Community Manager",
    description:
      "Build student communities and help learners grow together."
  }

];



const benefits = [

  {
    icon: Rocket,
    title:"Real Product Experience",
    description:
    "Work on features used by students and solve real problems."
  },


  {
    icon: GraduationCap,
    title:"Learn & Grow",
    description:
    "Improve your skills with mentorship and practical projects."
  },


  {
    icon: Target,
    title:"Career Growth",
    description:
    "Build experience that helps you achieve your career goals."
  }

];



function Careers(){

return (

<div className="
min-h-screen
bg-slate-950
text-white
overflow-hidden
">



{/* HERO */}

<section className="
relative
px-6
py-24
text-center
">


<div className="
absolute
-top-20
left-1/2
h-96
w-96
-translate-x-1/2
rounded-full
bg-blue-600/20
blur-[120px]
"/>



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

className="relative"

>


<div className="
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
">

<Sparkles size={16}/>

Join CampusHub AI Team

</div>




<h1 className="
mt-6
text-4xl
md:text-6xl
font-extrabold
">


Build The Future With


<span className="
bg-gradient-to-r
from-blue-500
to-cyan-400
bg-clip-text
text-transparent
">

CampusHub AI

</span>


</h1>



<p className="
mx-auto
mt-6
max-w-2xl
text-lg
text-gray-400
">

Join us in building AI-powered tools that help
students learn smarter and grow faster.

</p>


</motion.div>


</section>





{/* OPEN ROLES */}


<section className="
px-6
py-20
">


<div className="
mx-auto
max-w-6xl
">


<h2 className="
text-center
text-3xl
font-bold
mb-12
">

Open Opportunities

</h2>




<div className="
grid
gap-8
md:grid-cols-3
">


{

opportunities.map((item,index)=>{

const Icon=item.icon;


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

transition={{
duration:0.5,
delay:index*0.15
}}

viewport={{
once:true
}}


className="
group
rounded-3xl
border
border-slate-800
bg-slate-900/70
p-8
text-center
backdrop-blur-xl
transition-all
duration-300
hover:-translate-y-3
hover:border-blue-500/50
hover:shadow-xl
hover:shadow-blue-500/20
"

>


<div className="
mx-auto
mb-6
flex
h-16
w-16
items-center
justify-center
rounded-2xl
bg-blue-500/20
text-blue-400
transition
duration-300
group-hover:scale-110
">

<Icon size={30}/>

</div>



<h3 className="
text-xl
font-bold
">

{item.title}

</h3>



<p className="
mt-4
text-gray-400
">

{item.description}

</p>



<button className="
mt-6
flex
mx-auto
items-center
gap-2
rounded-xl
bg-gradient-to-r
from-blue-600
to-cyan-500
px-6
py-3
font-semibold
transition
hover:-translate-y-1
hover:shadow-lg
hover:shadow-blue-500/30
">

Apply Now

<ArrowRight size={17}/>

</button>



</motion.div>


)

})


}



</div>


</div>


</section>





{/* WHY JOIN */}



<section className="
bg-slate-900/50
px-6
py-20
">


<div className="
mx-auto
max-w-6xl
">


<h2 className="
text-center
text-3xl
font-bold
mb-12
">

Why Join CampusHub AI?

</h2>




<div className="
grid
gap-8
md:grid-cols-3
">


{

benefits.map((item,index)=>{


const Icon=item.icon;


return (

<div

key={index}

className="
rounded-2xl
border
border-slate-800
bg-slate-950/70
p-7
transition
hover:-translate-y-2
hover:border-blue-500/40
"

>


<Icon
size={32}
className="text-blue-400"
/>


<h3 className="
mt-5
text-xl
font-semibold
">

{item.title}

</h3>


<p className="
mt-3
text-gray-400
">

{item.description}

</p>


</div>


)


})


}



</div>


</div>


</section>





{/* CTA */}


<section className="
px-6
py-20
text-center
">


<h2 className="
text-4xl
font-bold
">

Ready To Build With Us?

</h2>



<p className="
mt-4
text-gray-400
">

Become a part of the future of AI-powered education.

</p>



<button className="
mt-8
rounded-xl
bg-gradient-to-r
from-blue-600
to-cyan-500
px-8
py-3
font-semibold
hover:shadow-xl
hover:shadow-blue-500/30
">

Start Your Journey

</button>


</section>

</div>


);

}


export default Careers;