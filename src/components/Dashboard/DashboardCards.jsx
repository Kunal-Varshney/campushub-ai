// src/components/Dashboard/DashboardCards.jsx

import ContinueLearning from "./ContinueLearning";
import RecentActivity from "./RecentActivity";
import ProfileCard from "./ProfileCard";

function DashboardCards({ dashboardData }) {
  const learning = dashboardData?.learning || null;
  const activities = dashboardData?.activities || [];
  const user = dashboardData?.user || null;

  return (
    <div className="space-y-8">

      {/* =====================================================
          CONTINUE LEARNING + PROFILE
      ====================================================== */}

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Continue Learning */}

        <div className="lg:col-span-2">
          <ContinueLearning
            learning={learning}
          />
        </div>

        {/* Profile */}

        <ProfileCard
          user={user}
        />

      </section>


      {/* =====================================================
          RECENT ACTIVITY
      ====================================================== */}

      <section>
        <RecentActivity
          activities={activities}
        />
      </section>

    </div>
  );
}

export default DashboardCards;