import {
  FiFileText,
  FiSearch,
  FiDownload,
  FiUser,
} from "react-icons/fi";

const AdminNotes = () => {


const notes = [
{
id:1,
title:"Data Structures Notes",
subject:"DSA",
uploadedBy:"Kunal",
date:"07 Aug 2026",
},

{
id:2,
title:"Machine Learning Basics",
subject:"AI & ML",
uploadedBy:"Rahul",
date:"06 Aug 2026",
},

{
id:3,
title:"Database Management System",
subject:"DBMS",
uploadedBy:"Aman",
date:"05 Aug 2026",
},

];



return (

<div>


<div className="
mb-8
">

<h1 className="
text-3xl
font-bold
text-white
">

Notes Management

</h1>


<p className="
text-slate-400
mt-2
">

Manage uploaded notes and AI generated notes

</p>


</div>





{/* Search */}


<div className="
mb-6
flex
items-center
gap-3
bg-white/5
border
border-white/10
rounded-2xl
px-4
py-3
max-w-xl
">


<FiSearch className="
text-slate-400
"/>


<input

placeholder="Search notes..."

className="
bg-transparent
outline-none
text-white
w-full
placeholder:text-slate-500
"

/>


</div>







{/* Notes Cards */}


<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
">


{

notes.map((note)=>(


<div

key={note.id}

className="
group
rounded-3xl
bg-white/5
border
border-white/10
backdrop-blur-xl
p-6
hover:border-blue-400/40
transition-all
duration-300
hover:-translate-y-1
"

>


<div className="
flex
items-center
justify-between
mb-5
">


<div className="
h-12
w-12
rounded-2xl
bg-gradient-to-br
from-orange-500
to-amber-400
flex
items-center
justify-center
text-white
text-xl
"
>

<FiFileText/>

</div>



<button
className="
text-slate-400
hover:text-white
transition
"
>

<FiDownload/>

</button>



</div>





<h2 className="
text-white
font-semibold
text-lg
mb-2
">

{note.title}

</h2>



<p className="
text-blue-300
text-sm
mb-4
">

{note.subject}

</p>





<div className="
space-y-2
text-sm
text-slate-400
">


<div className="
flex
items-center
gap-2
">

<FiUser/>

{note.uploadedBy}

</div>



<p>

Joined: {note.date}

</p>


</div>




</div>


))


}



</div>


</div>


);


};


export default AdminNotes;