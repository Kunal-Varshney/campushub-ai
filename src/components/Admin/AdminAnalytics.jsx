import {
  FiTrendingUp,
  FiUsers,
  FiFileText,
  FiActivity,
} from "react-icons/fi";


const AdminAnalytics = () => {


const analyticsCards = [

{
title:"User Growth",
value:"+24%",
desc:"Monthly user increase",
icon:FiTrendingUp,
gradient:"from-blue-500 to-cyan-400",
},


{
title:"Active Students",
value:"82%",
desc:"Student engagement",
icon:FiUsers,
gradient:"from-emerald-500 to-teal-400",
},


{
title:"Notes Uploaded",
value:"1.2K",
desc:"Total platform notes",
icon:FiFileText,
gradient:"from-orange-500 to-amber-400",
},


{
title:"Platform Activity",
value:"96%",
desc:"System performance",
icon:FiActivity,
gradient:"from-purple-500 to-fuchsia-400",
},


];




return (

<div>


{/* Header */}

<div className="
mb-8
">

<h1 className="
text-3xl
font-bold
text-white
">

Analytics

</h1>


<p className="
text-slate-400
mt-2
">

Track CampusHub AI platform performance

</p>


</div>






{/* Stats Cards */}


<div className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5
mb-10
">


{

analyticsCards.map((card)=>(


<div

key={card.title}

className="
group
relative
rounded-3xl
p-6
bg-white/5
border
border-white/10
backdrop-blur-xl
hover:-translate-y-1
transition-all
duration-300
overflow-hidden
"

>


<div
className={`
absolute
- top-10
-right-10
h-32
w-32
rounded-full
bg-gradient-to-br
${card.gradient}
blur-3xl
opacity-20
group-hover:opacity-40
transition
`}
/>





<div className="
relative
flex
items-center
justify-between
">


<div>


<p className="
text-slate-400
text-sm
">

{card.title}

</p>


<h2 className="
text-3xl
font-bold
text-white
mt-3
">

{card.value}

</h2>


<p className="
text-xs
text-slate-500
mt-2
">

{card.desc}

</p>


</div>





<div
className={`
h-14
w-14
rounded-2xl
flex
items-center
justify-center
text-white
text-xl
bg-gradient-to-br
${card.gradient}
shadow-lg
group-hover:scale-110
transition
`}
>

<card.icon/>

</div>



</div>


</div>


))


}



</div>






{/* Activity Graph Placeholder */}


<div className="
rounded-3xl
bg-white/5
border
border-white/10
backdrop-blur-xl
p-6
">


<h2 className="
text-white
font-semibold
text-lg
mb-6
">

Platform Activity

</h2>




<div className="
h-64
rounded-2xl
bg-slate-900/50
border
border-white/10
flex
items-center
justify-center
text-slate-500
">

Analytics Chart Integration Coming Soon

</div>



</div>



</div>


);


};


export default AdminAnalytics;