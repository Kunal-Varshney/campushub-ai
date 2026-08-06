import { useEffect, useState } from "react";

import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import DashboardCards from "../../components/Dashboard/DashboardCards";

import API from "../../services/api";


function StudentDashboard() {


  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {


    const fetchDashboard = async () => {


      try {


        const response = await API.get("/user/dashboard");


        setDashboardData(response.data.dashboard);


      } catch(error) {


        console.log("Dashboard Error:", error);


      } finally {


        setLoading(false);


      }


    };


    fetchDashboard();


  }, []);



  if(loading){

    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading Dashboard...
      </div>
    );

  }



  return (

    <div className="
    min-h-screen
    bg-slate-950
    text-white
    flex
    gap-0
    ">


      <Sidebar />



      <div className="
      flex-1
      min-w-0
      ">


        <Topbar user={dashboardData?.user} />



        <main className="
        px-4
        py-6
        lg:px-6
        ">


          <div className="mb-8">


            <h1 className="
            text-3xl
            font-bold
            ">

              Welcome back {dashboardData?.user?.name || "👋"}

            </h1>


            <p className="
            mt-2
            text-gray-400
            ">

              Continue your learning journey and achieve your goals.

            </p>


          </div>



          <DashboardCards 
            dashboardData={dashboardData}
          />



        </main>


      </div>


    </div>

  );

}


export default StudentDashboard;