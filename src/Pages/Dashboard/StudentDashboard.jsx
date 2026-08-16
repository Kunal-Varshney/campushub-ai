// src/pages/StudentDashboard.jsx

import { useEffect, useMemo, useState } from "react";

import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import DashboardCards from "../../components/Dashboard/DashboardCards";
import AIAssistant from "../../components/Dashboard/AIAssistant";

import API from "../../services/api";

// ============================================================
// TIME CONTEXT
// ============================================================

function getTimeContext() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      label: "Morning",
      title: "Build your momentum",
      message:
        "Start with one useful task and let CampusHub AI guide you.",
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      label: "Afternoon",
      title: "Keep the momentum going",
      message:
        "Use your time wisely and move one step closer to your goals.",
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      label: "Evening",
      title: "Make your evening count",
      message:
        "A focused learning session today can change your tomorrow.",
    };
  }

  return {
    label: "Night",
    title: "Small progress still matters",
    message:
      "Review, plan your next move and get ready for tomorrow.",
  };
}

// ============================================================
// STUDENT DASHBOARD
// ============================================================

function StudentDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================================
  // TIME CONTEXT
  // ==========================================================

  const timeContext = useMemo(
    () => getTimeContext(),
    []
  );

  // ==========================================================
  // FETCH DASHBOARD DATA
  // ==========================================================

  useEffect(() => {
    let mounted = true;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(
          "/user/dashboard"
        );

        if (!mounted) return;

        if (response?.data?.success) {
          const dashboard =
            response?.data?.dashboard || {};

          setDashboardData({
            ...dashboard,

            // ------------------------------------------------
            // SAFE STATS
            // ------------------------------------------------
            stats:
              dashboard?.stats &&
              typeof dashboard.stats === "object"
                ? dashboard.stats
                : {},

            // ------------------------------------------------
            // SAFE OVERVIEW
            // ------------------------------------------------
            overview:
              dashboard?.overview &&
              typeof dashboard.overview === "object"
                ? dashboard.overview
                : {},

            // ------------------------------------------------
            // SAFE LEARNING
            // ------------------------------------------------
            learning:
              dashboard?.learning || null,

            // ------------------------------------------------
            // SAFE ACTIVITIES
            // ------------------------------------------------
            activities:
              Array.isArray(
                dashboard?.activities
              )
                ? dashboard.activities
                : [],

            // ------------------------------------------------
            // SAFE NOTIFICATIONS
            // ------------------------------------------------
            notifications:
              dashboard?.notifications || {
                unreadCount: 0,
                latest: [],
              },
          });
        } else {
          setError(
            response?.data?.message ||
              "Unable to load dashboard data."
          );
        }
      } catch (err) {
        console.error(
          "Student Dashboard Error:",
          err
        );

        if (!mounted) return;

        setError(
          err?.response?.data?.message ||
            "Unable to connect to dashboard server."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  // ==========================================================
  // LOADING STATE
  // ==========================================================

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

  // ==========================================================
  // SAFE DASHBOARD DATA
  // ==========================================================

  const safeDashboardData = {
    user: {
      name: "Student",
      email: "",
      college: "",
      branch: "",
      year: "",
      avatar: "",
      profileStrength: 0,

      ...(dashboardData?.user || {}),
    },

    // Backend currently returns stats as an object.
    // Keep it as an object so StatsGrid can use it safely.
    stats:
      dashboardData?.stats &&
      typeof dashboardData.stats === "object"
        ? dashboardData.stats
        : {},

    learning:
      dashboardData?.learning || null,

    overview:
      dashboardData?.overview &&
      typeof dashboardData.overview === "object"
        ? dashboardData.overview
        : {},

    activities:
      Array.isArray(
        dashboardData?.activities
      )
        ? dashboardData.activities
        : [],

    notifications:
      dashboardData?.notifications || {
        unreadCount: 0,
        latest: [],
      },
  };

  const user =
    safeDashboardData.user;

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="flex">

        {/* ====================================================
            SIDEBAR
        ==================================================== */}

        <Sidebar />

        <div className="min-w-0 flex-1">

          {/* ==================================================
              TOPBAR
          ================================================== */}

          <Topbar user={user} />

          <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">

            {/* =================================================
                PERSONALIZED HERO
            ================================================= */}

            <section className="relative mb-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 p-6 sm:p-8">

              {/* Background Glow */}

              <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />

              <div className="relative max-w-3xl">

                {/* Time Badge */}

                <div className="mb-3 inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                  {timeContext.label} mode
                </div>

                {/* Hero Title */}

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {timeContext.title}
                  <span className="text-cyan-400">
                    .
                  </span>
                </h1>

                {/* Hero Message */}

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
                  {timeContext.message}
                </p>

                {/* Backend Error */}

                {error && (
                  <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-amber-300">
                    {error}
                  </div>
                )}

                {/* User Information */}

                {!error && user?.name && (
                  <p className="mt-5 text-sm text-gray-500">
                    Welcome back,{" "}
                    <span className="font-medium text-gray-300">
                      {user.name}
                    </span>
                  </p>
                )}

              </div>
            </section>

            {/* =================================================
                DASHBOARD CONTENT

                StatsGrid is rendered inside DashboardCards
                so it appears only once.
            ================================================= */}

            <DashboardCards
              dashboardData={
                safeDashboardData
              }
            />

            {/* =================================================
                AI COMMAND CENTER
            ================================================= */}

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