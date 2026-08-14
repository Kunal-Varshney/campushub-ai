// src/components/Dashboard/DashboardCards.jsx

import StatsGrid from "./StatsGrid";
import ContinueLearning from "./ContinueLearning";
import RecentActivity from "./RecentActivity";
import ProfileCard from "./ProfileCard";

// ============================================================
// DASHBOARD CARDS
// ============================================================

function DashboardCards({
  dashboardData,
}) {
  const learning =
    dashboardData?.learning ||
    null;

  const activities =
    dashboardData?.activities ||
    [];

  const user =
    dashboardData?.user ||
    null;

  const stats =
    dashboardData?.stats ||
    {};

  return (
    <div className="space-y-8">

      {/* =====================================================
          PROGRESS SNAPSHOT

          Learning Progress
          Skills
          Learning Streak
          Achievements
      ====================================================== */}

      <StatsGrid
        stats={stats}
      />


      {/* =====================================================
          CONTINUE LEARNING + PROFILE
      ====================================================== */}

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* ---------------------------------------------------
            CONTINUE LEARNING
        ---------------------------------------------------- */}

        <div className="lg:col-span-2">
          <ContinueLearning
            learning={learning}
          />
        </div>


        {/* ---------------------------------------------------
            PROFILE
        ---------------------------------------------------- */}

        <ProfileCard
          user={user}
        />

      </section>


      {/* =====================================================
          RECENT ACTIVITY
      ====================================================== */}

      <section>
        <RecentActivity
          activities={
            activities
          }
        />
      </section>

    </div>
  );
}

export default DashboardCards;