// src/pages/Dashboard/StudentDashboard.jsx

import { useEffect, useState } from "react";

import API from "../../services/api";

import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import DashboardCards from "../../components/Dashboard/DashboardCards";
import StatsGrid from "../../components/Dashboard/StatsGrid";
import QuickAccess from "../../components/Dashboard/QuickAccess";
import ContinueLearning from "../../components/Dashboard/ContinueLearning";
import RecentActivity from "../../components/Dashboard/RecentActivity";
import AIAssistant from "../../components/Dashboard/AIAssistant";
import ProfileCard from "../../components/Dashboard/ProfileCard";


function StudentDashboard() {

  const [user, setUser] = useState(null);


  const getProfile = async () => {
    try {

      const response = await API.get("/user/profile");

      console.log("PROFILE:", response.data);

      setUser(response.data.user);

    } catch (error) {

      console.log("PROFILE ERROR:", error);

    }
  };


  useEffect(() => {
    getProfile();
  }, []);


  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />


      <div className="flex-1">

        <Topbar user={user} />


        <main className="mx-auto max-w-7xl space-y-8 px-6 py-8">

          <DashboardCards />

          <StatsGrid />


          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

            <div className="space-y-8 lg:col-span-2">

              <QuickAccess />


              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                <ContinueLearning />

                <RecentActivity />

              </div>

            </div>



            <div className="space-y-8">

              <ProfileCard user={user} />

              <AIAssistant />

            </div>


          </div>

        </main>

      </div>

    </div>
  );
}


export default StudentDashboard;