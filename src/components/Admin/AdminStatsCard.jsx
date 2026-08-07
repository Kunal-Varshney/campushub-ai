const AdminStatsCard = ({
  label,
  value,
  icon: Icon,
  gradient,
}) => {

return (

<div className="
relative
group
rounded-3xl
transition-all
duration-300
hover:-translate-y-1
">


{/* Gradient Glow Border */}

<div
className={`
absolute
inset-0
rounded-3xl
bg-gradient-to-br
${gradient}
opacity-40
blur-sm
group-hover:opacity-80
transition-all
duration-300
`}
/>



{/* Card */}

<div
className="
relative
rounded-3xl
bg-slate-900/90
backdrop-blur-xl
border
border-white/10
p-6
overflow-hidden
shadow-xl
"
>



{/* Background Glow */}

<div
className={`
absolute
-webkit-top-10
right-0
h-36
w-36
rounded-full
bg-gradient-to-br
${gradient}
blur-3xl
opacity-0
group-hover:opacity-30
transition-all
duration-500
`}
/>




<div className="
relative
flex
items-start
justify-between
gap-5
">


<div>


<p className="
text-slate-400
text-sm
font-medium
mb-3
">

{label}

</p>



<h2 className="
text-4xl
font-bold
text-white
tracking-tight
group-hover:scale-105
transition-transform
origin-left
">

{value}

</h2>


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
text-2xl
bg-gradient-to-br
${gradient}
shadow-lg
transition-all
duration-300
group-hover:scale-110
group-hover:rotate-6
`}
>

{
Icon &&
<Icon/>
}

</div>



</div>





{/* Bottom Progress Glow */}

<div className="
mt-6
h-1
rounded-full
bg-white/10
overflow-hidden
">


<div

className={`
h-full
w-2/3
rounded-full
bg-gradient-to-r
${gradient}
group-hover:w-full
transition-all
duration-500
`}

/>


</div>




</div>


</div>


);


};


export default AdminStatsCard;