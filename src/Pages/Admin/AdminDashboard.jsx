import { useState, useEffect } from "react";


import AdminTopbar from "../../components/Admin/AdminTopbar";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminStatsCard from "../../components/Admin/AdminStatsCard";
import UsersTable from "../../components/Admin/UsersTable";


// Admin Sections
import AdminNotes from "../../components/Admin/AdminNotes";
import AdminAnalytics from "../../components/Admin/AdminAnalytics";
import AdminSettings from "../../components/Admin/AdminSettings";


import {
  getAdminStats,
  getUsers,
} from "../../services/adminService";


import {
  FiUsers,
  FiUserCheck,
  FiShield,
  FiFileText,
} from "react-icons/fi";



const AdminDashboard = () => {


const [activeTab,setActiveTab] = useState("dashboard");


const [stats,setStats] = useState({
  totalUsers:0,
  students:0,
  admins:0,
  totalNotes:0,
});


const [users,setUsers] = useState([]);

const [loading,setLoading] = useState(true);

const [error,setError] = useState("");





useEffect(()=>{


const fetchData = async()=>{


try{


setLoading(true);


const [
statsRes,
usersRes

]= await Promise.all([

getAdminStats(),

getUsers()

]);



if(statsRes?.success){

setStats(statsRes.stats);

}



if(usersRes?.success){

setUsers(usersRes.users);

}



}

catch(err){


console.log(
"Admin Error:",
err
);


setError(
"Failed to load admin data"
);



}

finally{

setLoading(false);

}



};



fetchData();



},[]);








const statCards=[


{
label:"Total Users",
value:stats.totalUsers,
icon:FiUsers,
gradient:"from-blue-500 to-cyan-400"
},


{
label:"Students",
value:stats.students,
icon:FiUserCheck,
gradient:"from-emerald-500 to-teal-400"
},


{
label:"Admins",
value:stats.admins,
icon:FiShield,
gradient:"from-purple-500 to-fuchsia-400"
},


{
label:"Total Notes",
value:stats.totalNotes,
icon:FiFileText,
gradient:"from-orange-500 to-amber-400"
},


];






return (


<div className="
min-h-screen
bg-slate-950
text-white
">


<AdminSidebar

active={activeTab}

setActive={setActiveTab}

/>




<div className="
lg:ml-64
">


<AdminTopbar />




<main className="
p-6
lg:p-10
">





{
error &&

<div className="
mb-6
rounded-2xl
border
border-red-500/30
bg-red-500/10
p-4
text-red-300
">

{error}

</div>

}









{/* DASHBOARD */}

{

activeTab==="dashboard" &&

<div>


<h1 className="
text-3xl
font-bold
">

Admin Dashboard

</h1>


<p className="
text-slate-400
mt-2
mb-8
">

CampusHub AI platform overview

</p>





<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
">


{

statCards.map((card)=>(


<AdminStatsCard

key={card.label}

label={card.label}

value={
loading
?
"..."
:
card.value
}

icon={card.icon}

gradient={card.gradient}

/>


))


}



</div>



</div>


}









{/* USERS */}

{

activeTab==="users" &&


<div>


<h1 className="
text-3xl
font-bold
mb-6
">

Users Management

</h1>



<div className="
rounded-3xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-6
">


{

loading

?

<p className="text-slate-400">

Loading users...

</p>


:

<UsersTable users={users}/>


}


</div>


</div>


}









{/* NOTES */}


{

activeTab==="notes" &&

<AdminNotes />

}








{/* ANALYTICS */}


{

activeTab==="analytics" &&

<AdminAnalytics />

}








{/* SETTINGS */}


{

activeTab==="settings" &&

<AdminSettings />

}





</main>


</div>


</div>


);


};


export default AdminDashboard;