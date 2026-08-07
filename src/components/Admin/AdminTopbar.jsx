import {
  FiShield,
  FiZap,
} from "react-icons/fi";

const AdminTopbar = () => {


const user = JSON.parse(
  localStorage.getItem("user")
) || {};



const name = user.name || "Admin";

const initial = name
.charAt(0)
.toUpperCase();



return (

<header
className="
sticky
top-0
z-30
h-20
border-b
border-white/10
bg-slate-950/80
backdrop-blur-xl
"
>


<div className="
h-full
px-6
lg:px-10
flex
items-center
justify-between
gap-4
">



{/* LEFT */}

<div className="
flex
items-center
gap-3
min-w-0
">


<div
className="
h-10
w-10
rounded-xl
bg-gradient-to-br
from-blue-500
to-purple-500
flex
items-center
justify-center
text-white
shadow-lg
"
>

<FiZap/>

</div>



<div className="min-w-0">


<div className="
flex
items-center
gap-2
">

<h1 className="
text-white
font-bold
text-lg
truncate
">

CampusHub
<span className="text-blue-400">
 AI
</span>

</h1>



<span
className="
hidden
sm:flex
items-center
gap-1
px-2
py-1
rounded-full
text-[11px]
font-semibold
bg-purple-500/10
text-purple-300
border
border-purple-500/30
"
>

<FiShield/>

Admin

</span>


</div>



<p className="
hidden
sm:block
text-xs
text-slate-500
">

Platform Management Console

</p>


</div>


</div>







{/* RIGHT */}


<div className="
flex
items-center
gap-4
">


<div
className="
hidden
md:flex
flex-col
items-end
"
>

<p className="
text-sm
text-slate-300
font-medium
">

Welcome back, {name}

</p>


<p className="
text-xs
text-slate-500
">

Admin Control Panel

</p>


</div>





<div className="
flex
items-center
gap-3
pl-4
border-l
border-white/10
"
>


<div
className="
h-11
w-11
rounded-full
bg-gradient-to-br
from-blue-500
to-purple-500
flex
items-center
justify-center
text-white
font-bold
shadow-lg
"
>

{initial}

</div>




<div className="
hidden
sm:block
"
>

<p className="
text-white
text-sm
font-medium
">

{name}

</p>



<span
className="
inline-flex
px-2
py-0.5
rounded-full
text-[10px]
font-semibold
bg-blue-500/10
text-blue-300
border
border-blue-500/30
"
>

Administrator

</span>


</div>


</div>


</div>




</div>


</header>


);


};


export default AdminTopbar;