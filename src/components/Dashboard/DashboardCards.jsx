import StatsGrid from "./StatsGrid";
import ContinueLearning from "./ContinueLearning";
import RecentActivity from "./RecentActivity";
import QuickAccess from "./QuickAccess";
import ProfileCard from "./ProfileCard";


function DashboardCards({dashboardData}) {


  return (

    <div className="space-y-8">


      {/* Learning Stats */}

      <StatsGrid 
        stats={dashboardData?.stats}
      />



      {/* Main Dashboard Area */}

      <div className="
      grid
      grid-cols-1
      gap-8
      lg:grid-cols-3
      ">


        {/* Left Content */}

        <div className="
        space-y-8
        lg:col-span-2
        ">


          <ContinueLearning 
            learning={dashboardData?.learning}
          />

          <RecentActivity 
            activities={dashboardData?.activities}
          />


        </div>



        {/* Right Profile */}

        <div>

          <ProfileCard 
             user={dashboardData?.user}
          />

        </div>


      </div>

     <QuickAccess 
        data={dashboardData}
     />


    </div>

  );

}


export default DashboardCards;