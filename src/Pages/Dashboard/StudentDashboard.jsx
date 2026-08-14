// src/pages/StudentDashboard.jsx

import { useEffect, useMemo, useState } from "react";

import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import DashboardCards from "../../components/Dashboard/DashboardCards";
import AIAssistant from "../../components/Dashboard/AIAssistant";

import API from "../../services/api";

function getTimeContext() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      label: "Morning",
      title: "Build your momentum",
      message: "Start with one useful task and let CampusHub AI guide you.",
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      label: "Afternoon",
      title: "Keep the momentum going",
      message: "Use your time wisely and move one step closer to your goals.",
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      label: "Evening",
      title: "Make your evening count",
      message: "A focused learning session today can change your tomorrow.",
    };
  }

  return {
    label: "Night",
    title: "Small progress still matters",
    message: "Review, plan your next move and get ready for tomorrow.",
  };
}

function StudentDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const timeContext = useMemo(() => getTimeContext(), []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await API.get("/user/dashboard");

        const data = response?.data?.dashboard;

        setDashboardData(data || null);
      } catch (error) {
        console.error("Dashboard Error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-400" />

          <p className="mt-4 text-sm text-gray-400">
            Preparing your workspace...
          </p>
        </div>
      </div>
    );
  }

  const user = dashboardData?.user;

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="flex">

        <Sidebar />

        <div className="min-w-0 flex-1">

          <Topbar user={user} />

          <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

            {/* Personalized Hero */}

            <section className="relative mb-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 p-6 sm:p-8">

              <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />

              <div className="relative max-w-3xl">

                <div className="mb-3 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                  {timeContext.label} mode
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {timeContext.title}
                  <span className="text-cyan-400">.</span>
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
                  {timeContext.message}
                </p>

                {error && (
                  <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-amber-300">
                    Some dashboard data could not be loaded. You can still
                    explore CampusHub normally.
                  </div>
                )}

              </div>
            </section>


            {/* Dashboard Content */}

            <DashboardCards
              dashboardData={dashboardData}
            />


            {/* AI Command Center */}

            <div className="mt-8">
              <AIAssistant />
            </div>

          </main>

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;