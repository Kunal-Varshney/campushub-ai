// import {
//   LayoutDashboard,
//   Brain,
//   BookOpen,
//   FileText,
//   Briefcase,
//   Target,
//   Settings,
//   Bell,
//   UserRound,
//   Send,
// } from "lucide-react";
// import { motion } from "framer-motion";


// const menuItems = [
//   {
//     title: "Dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "AI Assistant",
//     icon: Brain,
//   },
//   {
//     title: "Smart Notes",
//     icon: BookOpen,
//   },
//   {
//     title: "Resume Builder",
//     icon: FileText,
//   },
//   {
//     title: "Internships",
//     icon: Briefcase,
//   },
//   {
//     title: "Skill Roadmap",
//     icon: Target,
//   },
// ];


// const stats = [
//   {
//     title: "AI Sessions",
//     value: "25",
//   },
//   {
//     title: "Notes Created",
//     value: "48",
//   },
//   {
//     title: "Resume Score",
//     value: "85%",
//   },
//   {
//     title: "Applications",
//     value: "12",
//   },
// ];


// const features = [
//   {
//     title: "AI Study Assistant",
//     description:
//       "Ask questions and get instant AI powered learning support.",
//     icon: Brain,
//   },
//   {
//     title: "Smart Notes",
//     description:
//       "Create, organize and share your study material.",
//     icon: BookOpen,
//   },
//   {
//     title: "AI Resume Builder",
//     description:
//       "Build ATS friendly resumes with smart suggestions.",
//     icon: FileText,
//   },
//   {
//     title: "Internship Finder",
//     description:
//       "Discover internships based on your skills.",
//     icon: Briefcase,
//   },
// ];


// function StudentDashboard() {

//   return (

//     <div className="
//       min-h-screen
//       bg-slate-950
//       text-white
//       flex
//     ">


//       {/* Sidebar */}

//       <aside className="
//         hidden
//         md:flex
//         w-72
//         border-r
//         border-slate-800
//         bg-slate-900/70
//         backdrop-blur-xl
//         flex-col
//         p-6
//       ">


//         <h1 className="
//           text-3xl
//           font-extrabold
//           text-indigo-400
//         ">
//           CampusHub
//           <span className="text-white">
//             AI
//           </span>
//         </h1>


//         <nav className="
//           mt-10
//           space-y-3
//         ">

//           {
//             menuItems.map((item)=>{

//               const Icon = item.icon;

//               return (

//                 <button
//                   key={item.title}
//                   className="
//                     flex
//                     w-full
//                     items-center
//                     gap-3
//                     rounded-xl
//                     px-4
//                     py-3
//                     text-slate-300
//                     transition
//                     hover:bg-slate-800
//                     hover:text-blue-400
//                   "
//                 >

//                   <Icon size={20}/>

//                   {item.title}

//                 </button>

//               )

//             })
//           }


//         </nav>


//         <button className="
//           mt-auto
//           flex
//           items-center
//           gap-3
//           rounded-xl
//           px-4
//           py-3
//           text-slate-300
//           hover:bg-slate-800
//         ">
//           <Settings size={20}/>
//           Settings
//         </button>


//       </aside>





//       {/* Main */}
          

//           {/* Profile + AI Assistant */}

//         <div className="
//         mt-10
//         grid
//         gap-6
//         lg:grid-cols-3
//         ">


//         {/* Profile Card */}

//         <div className="
//             lg:col-span-1
//             rounded-3xl
//             border
//             border-slate-800
//             bg-slate-900/70
//             p-6
//             backdrop-blur-xl
//         ">

//             <div className="
//             flex
//             items-center
//             gap-4
//             ">

//             <div className="
//                 flex
//                 h-14
//                 w-14
//                 items-center
//                 justify-center
//                 rounded-full
//                 bg-gradient-to-r
//                 from-blue-600
//                 to-cyan-500
//             ">

//                 <UserRound size={26}/>

//             </div>


//             <div>

//                 <h3 className="
//                 text-lg
//                 font-semibold
//                 ">
//                 Kunal Varshney
//                 </h3>

//                 <p className="
//                 text-sm
//                 text-gray-400
//                 ">
//                 B.Tech CSE | AI & ML
//                 </p>

//             </div>

//             </div>



//             <div className="mt-6">

//             <div className="
//                 flex
//                 justify-between
//                 text-sm
//             ">

//                 <span className="text-gray-400">
//                 Profile Completion
//                 </span>

//                 <span className="text-blue-400">
//                 75%
//                 </span>

//             </div>


//             <div className="
//                 mt-3
//                 h-2
//                 rounded-full
//                 bg-slate-800
//             ">

//                 <div className="
//                 h-2
//                 w-3/4
//                 rounded-full
//                 bg-gradient-to-r
//                 from-blue-500
//                 to-cyan-400
//                 "/>

//             </div>

//             </div>


//         </div>





//         {/* AI Assistant Card */}


//         <div className="
//             lg:col-span-2
//             rounded-3xl
//             border
//             border-slate-800
//             bg-slate-900/70
//             p-6
//             backdrop-blur-xl
//         ">


//             <div className="
//             flex
//             items-center
//             gap-3
//             ">


//             <div className="
//                 rounded-xl
//                 bg-blue-600/20
//                 p-3
//             ">

//                 <Brain className="text-blue-400"/>

//             </div>


//             <div>

//                 <h3 className="
//                 text-xl
//                 font-semibold
//                 ">
//                 CampusHub AI Assistant
//                 </h3>


//                 <p className="
//                 text-sm
//                 text-gray-400
//                 ">
//                 Ask about study, resume or career
//                 </p>

//             </div>


//             </div>




//             <div className="
//             mt-6
//             rounded-xl
//             bg-slate-800
//             p-4
//             text-gray-300
//             ">

//             👋 Hi Kunal, how can I help you today?

//             </div>




//             <div className="
//             mt-4
//             flex
//             gap-3
//             ">


//             <input

//                 placeholder="Ask your question..."

//                 className="
//                 flex-1
//                 rounded-xl
//                 border
//                 border-slate-700
//                 bg-slate-950
//                 px-4
//                 py-3
//                 text-white
//                 outline-none
//                 focus:border-blue-500
//                 "

//             />



//             <button

//                 className="
//                 rounded-xl
//                 bg-gradient-to-r
//                 from-blue-600
//                 to-cyan-500
//                 px-4
//                 "

//             >

//                 <Send size={20}/>

//             </button>


//             </div>


//         </div>


//         </div>
            




//         {/* Stats */}

//         <div className="
//           mt-10
//           grid
//           gap-6
//           sm:grid-cols-2
//           xl:grid-cols-4
//         ">


//           {
//             stats.map((item,index)=>(

//               <motion.div
//                 key={item.title}
//                 initial={{
//                   opacity:0,
//                   y:20
//                 }}
//                 animate={{
//                   opacity:1,
//                   y:0
//                 }}
//                 transition={{
//                   delay:index*0.1
//                 }}
//                 className="
//                   rounded-2xl
//                   border
//                   border-slate-800
//                   bg-slate-900/70
//                   p-6
//                   backdrop-blur-xl
//                 "
//               >

//                 <p className="text-gray-400">
//                   {item.title}
//                 </p>

//                 <h3 className="
//                   mt-3
//                   text-3xl
//                   font-bold
//                   text-blue-400
//                 ">
//                   {item.value}
//                 </h3>


//               </motion.div>

//             ))
//           }


//         </div>





//         {/* Feature Cards */}


//         <h2 className="
//           mt-12
//           text-2xl
//           font-bold
//         ">
//           Quick Access
//         </h2>


//         <div className="
//           mt-6
//           grid
//           gap-6
//           md:grid-cols-2
//         ">


//           {
//             features.map((item)=>{

//               const Icon=item.icon;

//               return (

//                 <div
//                   key={item.title}
//                   className="
//                     rounded-3xl
//                     border
//                     border-slate-800
//                     bg-slate-900/70
//                     p-6
//                     hover:border-blue-500/50
//                     transition
//                   "
//                 >

//                   <Icon
//                     size={30}
//                     className="text-blue-400"
//                   />

//                   <h3 className="
//                     mt-4
//                     text-xl
//                     font-semibold
//                   ">
//                     {item.title}
//                   </h3>

//                   <p className="
//                     mt-2
//                     text-gray-400
//                   ">
//                     {item.description}
//                   </p>


//                 </div>

//               )

//             })
//           }


//         </div>

    
//       </main>


//     </div>

//   );
// }


// export default StudentDashboard;













import {
  LayoutDashboard,
  Brain,
  BookOpen,
  FileText,
  Briefcase,
  Target,
  Settings,
  Bell,
  UserRound,
  Send,
} from "lucide-react";

import { motion } from "framer-motion";


const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Assistant",
    icon: Brain,
  },
  {
    title: "Smart Notes",
    icon: BookOpen,
  },
  {
    title: "Resume Builder",
    icon: FileText,
  },
  {
    title: "Internships",
    icon: Briefcase,
  },
  {
    title: "Skill Roadmap",
    icon: Target,
  },
];


const stats = [
  {
    title: "AI Sessions",
    value: "25",
  },
  {
    title: "Notes Created",
    value: "48",
  },
  {
    title: "Resume Score",
    value: "85%",
  },
  {
    title: "Applications",
    value: "12",
  },
];


const features = [
  {
    title: "AI Study Assistant",
    description:
      "Ask questions and get instant AI powered learning support.",
    icon: Brain,
  },
  {
    title: "Smart Notes",
    description:
      "Create, organize and share your study material.",
    icon: BookOpen,
  },
  {
    title: "AI Resume Builder",
    description:
      "Build ATS friendly resumes with smart suggestions.",
    icon: FileText,
  },
  {
    title: "Internship Finder",
    description:
      "Discover internships based on your skills.",
    icon: Briefcase,
  },
];


function StudentDashboard() {

return (

<div className="
min-h-screen
bg-slate-950
text-white
flex
">


{/* Sidebar */}

<aside className="
hidden
md:flex
w-72
border-r
border-slate-800
bg-slate-900/70
backdrop-blur-xl
flex-col
p-6
">


<h1 className="
text-3xl
font-extrabold
text-indigo-400
">

CampusHub
<span className="text-white">
AI
</span>

</h1>


<nav className="
mt-10
space-y-3
">


{
menuItems.map((item)=>{

const Icon=item.icon;


return (

<button
key={item.title}
className="
flex
w-full
items-center
gap-3
rounded-xl
px-4
py-3
text-slate-300
transition
hover:bg-slate-800
hover:text-blue-400
"
>

<Icon size={20}/>

{item.title}

</button>

)

})
}


</nav>


<button className="
mt-auto
flex
items-center
gap-3
rounded-xl
px-4
py-3
text-slate-300
hover:bg-slate-800
">

<Settings size={20}/>

Settings

</button>


</aside>





{/* Main */}

<main className="
flex-1
p-6
lg:p-10
">


{/* Topbar */}

<div className="
flex
items-center
justify-between
">


<div>

<h2 className="
text-3xl
font-bold
">

Good Morning 👋

</h2>


<p className="
mt-2
text-gray-400
">

Ready to learn something new today?

</p>


</div>


<button className="
rounded-xl
border
border-slate-700
p-3
hover:border-blue-500
">

<Bell size={22}/>

</button>


</div>





{/* Profile + AI Assistant */}


<div className="
mt-10
grid
gap-6
lg:grid-cols-3
">



{/* Profile Card */}


<div className="
lg:col-span-1
rounded-3xl
border
border-slate-800
bg-slate-900/70
p-6
backdrop-blur-xl
">


<div className="
flex
items-center
gap-4
">


<div className="
flex
h-14
w-14
items-center
justify-center
rounded-full
bg-gradient-to-r
from-blue-600
to-cyan-500
">


<UserRound size={26}/>


</div>


<div>

<h3 className="
text-lg
font-semibold
">

Kunal Varshney

</h3>


<p className="
text-sm
text-gray-400
">

B.Tech CSE | AI & ML

</p>


</div>


</div>


<div className="mt-6">


<div className="
flex
justify-between
text-sm
">


<span className="text-gray-400">
Profile Completion
</span>


<span className="text-blue-400">
75%
</span>


</div>


<div className="
mt-3
h-2
rounded-full
bg-slate-800
">


<div className="
h-2
w-3/4
rounded-full
bg-gradient-to-r
from-blue-500
to-cyan-400
"/>


</div>


</div>


</div>

{/* AI Assistant Card */}


<div className="
lg:col-span-2
rounded-3xl
border
border-slate-800
bg-slate-900/70
p-6
backdrop-blur-xl
">


<div className="
flex
items-center
gap-3
">


<div className="
rounded-xl
bg-blue-600/20
p-3
">

<Brain className="text-blue-400"/>

</div>


<div>

<h3 className="
text-xl
font-semibold
">

CampusHub AI Assistant

</h3>


<p className="
text-sm
text-gray-400
">

Ask about study, resume or career

</p>


</div>


</div>





<div className="
mt-6
rounded-xl
bg-slate-800
p-4
text-gray-300
">

👋 Hi Kunal, how can I help you today?

</div>





<div className="
mt-4
flex
gap-3
">


<input

placeholder="Ask your question..."

className="
flex-1
rounded-xl
border
border-slate-700
bg-slate-950
px-4
py-3
text-white
outline-none
focus:border-blue-500
"

/>



<button

className="
rounded-xl
bg-gradient-to-r
from-blue-600
to-cyan-500
px-4
"

>

<Send size={20}/>

</button>


</div>


</div>


</div>







{/* Stats */}


<div className="
mt-10
grid
gap-6
sm:grid-cols-2
xl:grid-cols-4
">


{
stats.map((item,index)=>(


<motion.div

key={item.title}

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:index*0.1
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


<p className="text-gray-400">

{item.title}

</p>


<h3 className="
mt-3
text-3xl
font-bold
text-blue-400
">

{item.value}

</h3>


</motion.div>


))
}


</div>







{/* Quick Access */}


<h2 className="
mt-12
text-2xl
font-bold
">

Quick Access

</h2>




<div className="
mt-6
grid
gap-6
md:grid-cols-2
">


{

features.map((item)=>{


const Icon=item.icon;


return (

<div

key={item.title}

className="
rounded-3xl
border
border-slate-800
bg-slate-900/70
p-6
transition
hover:border-blue-500/50
"

>


<Icon

size={30}

className="text-blue-400"

/>



<h3 className="
mt-4
text-xl
font-semibold
">

{item.title}

</h3>



<p className="
mt-2
text-gray-400
">

{item.description}

</p>



</div>

)


})

}



</div>



</main>



</div>


);

}


export default StudentDashboard;