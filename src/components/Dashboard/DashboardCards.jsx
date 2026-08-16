import StatsGrid from "./StatsGrid";
import ContinueLearning from "./ContinueLearning";
import RecentActivity from "./RecentActivity";
import ProfileCard from "./ProfileCard";
import QuickAccess from "./QuickAccess";

// ============================================================
// DASHBOARD CARDS
// ============================================================

function DashboardCards({ dashboardData }) {
  const learning =
    dashboardData?.learning || null;

  const activities =
    dashboardData?.activities || [];

  const user =
    dashboardData?.user || null;

  const stats =
    dashboardData?.stats || [];

  const overview =
    dashboardData?.overview || {};

  return (
    <div className="space-y-8">

      {/* =====================================================
          PROGRESS SNAPSHOT
      ===================================================== */}

      <StatsGrid
        stats={stats}
        learning={learning}
        overview={overview}
      />

      {/* =====================================================
          CONTINUE LEARNING + PROFILE
      ===================================================== */}

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* CONTINUE LEARNING */}

        <div className="lg:col-span-2">
          <ContinueLearning
            learning={learning}
          />
        </div>

        {/* PROFILE */}

        <ProfileCard
          user={user}
        />

      </section>

      {/* =====================================================
          QUICK ACCESS
      ===================================================== */}

      <QuickAccess />

      {/* =====================================================
          RECENT ACTIVITY
      ===================================================== */}

      <RecentActivity
        activities={activities}
      />

    </div>
  );
}

export default DashboardCards;