// import {
//   ArrowRight,
//   Briefcase,
//   CheckCircle2,
//   Flame,
//   Lightbulb,
//   Sparkles,
//   Target,
//   Trophy,
//   Zap,
// } from "lucide-react";

// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// import ContinueLearning from "./ContinueLearning";
// import RecentActivity from "./RecentActivity";
// import QuickAccess from "./QuickAccess";
// import ProfileCard from "./ProfileCard";
// import AIAssistant from "./AIAssistant";

// function DashboardCards({ dashboardData, timeContext }) {
//   const navigate = useNavigate();

//   const stats = dashboardData?.stats || {};

//   const coursesStarted =
//     stats?.coursesStarted ??
//     stats?.courses ??
//     0;

//   const problemsSolved =
//     stats?.problemsSolved ??
//     stats?.problems ??
//     0;

//   const achievements =
//     stats?.achievements ??
//     0;

//   const streak =
//     stats?.streak ??
//     stats?.learningStreak ??
//     0;

//   const missions = [
//     {
//       icon: Target,
//       title: "Build your next skill",
//       description:
//         timeContext?.period === "morning"
//           ? "Start with a focused learning session."
//           : timeContext?.period === "afternoon"
//           ? "Keep your learning momentum alive."
//           : timeContext?.period === "evening"
//           ? "Use your evening to complete one important task."
//           : "Review what you learned and prepare tomorrow.",
//       action: "Open Roadmap",
//       route: "/skill-roadmap",
//     },
//     {
//       icon: Briefcase,
//       title: "Move closer to your career",
//       description:
//         "Check opportunities that match your skills and career goal.",
//       action: "Find Internships",
//       route: "/internship-finder",
//     },
//     {
//       icon: Trophy,
//       title: "Keep your streak alive",
//       description:
//         streak > 0
//           ? `You're currently on a ${streak}-day learning streak.`
//           : "Start today and create your first learning streak.",
//       action: "Start Learning",
//       route: "/discover",
//     },
//   ];

//   return (
//     <div className="space-y-8">

//       {/* ================================
//           CAMPUSHUB AI COMMAND CENTER
//       ================================= */}

//       <motion.section
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.45 }}
//         className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 p-6 sm:p-8"
//       >
//         <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

//         <div className="relative">

//           <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

//             <div className="flex items-center gap-3">

//               <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-blue-500/20">
//                 <Sparkles size={21} />
//               </div>

//               <div>
//                 <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
//                   CampusHub Intelligence
//                 </p>

//                 <h2 className="text-xl font-bold">
//                   Your Career Command Center
//                 </h2>
//               </div>

//             </div>

//             <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
//               AI Powered
//             </span>

//           </div>

//           <div className="grid gap-4 lg:grid-cols-[1fr_auto]">

//             <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">

//               <div className="flex items-start gap-3">

//                 <Lightbulb
//                   size={20}
//                   className="mt-0.5 shrink-0 text-yellow-400"
//                 />

//                 <div>
//                   <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
//                     AI Insight
//                   </p>

//                   <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-200">
//                     {streak > 0
//                       ? `Your ${streak}-day streak shows consistency. Keep building on it with one focused task today.`
//                       : "You haven't started a learning streak yet. Complete one meaningful task today to begin."}
//                   </p>
//                 </div>

//               </div>

//             </div>

//             <button
//               type="button"
//               onClick={() => navigate("/ai-assistant")}
//               className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 text-sm font-semibold transition hover:scale-[1.02]"
//             >
//               <Sparkles size={17} />
//               Ask CampusHub AI
//             </button>

//           </div>

//         </div>
//       </motion.section>


//       {/* ================================
//           LIVE STUDENT SIGNALS
//       ================================= */}

//       <section>

//         <div className="mb-4 flex items-center justify-between">

//           <div>
//             <p className="text-xs uppercase tracking-wider text-gray-500">
//               Live Snapshot
//             </p>

//             <h3 className="mt-1 text-lg font-semibold">
//               Your Progress
//             </h3>
//           </div>

//         </div>

//         <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

//           <ProgressCard
//             icon={Flame}
//             label="Learning Streak"
//             value={`${streak} Days`}
//             description={
//               streak > 0
//                 ? "Keep the streak alive"
//                 : "Start your first streak"
//             }
//           />

//           <ProgressCard
//             icon={Zap}
//             label="Courses"
//             value={coursesStarted}
//             description="Learning journeys started"
//           />

//           <ProgressCard
//             icon={CheckCircle2}
//             label="Problems"
//             value={problemsSolved}
//             description="Coding problems solved"
//           />

//           <ProgressCard
//             icon={Trophy}
//             label="Achievements"
//             value={achievements}
//             description="Milestones unlocked"
//           />

//         </div>

//       </section>


//       {/* ================================
//           TODAY'S MISSION
//       ================================= */}

//       <section>

//         <div className="mb-4 flex items-end justify-between">

//           <div>
//             <p className="text-xs uppercase tracking-wider text-cyan-400">
//               {timeContext?.focus || "Today's Focus"}
//             </p>

//             <h3 className="mt-1 text-xl font-bold">
//               Your next moves
//             </h3>
//           </div>

//           <span className="hidden text-xs text-gray-500 sm:block">
//             Small actions → long-term progress
//           </span>

//         </div>


//         <div className="grid gap-4 lg:grid-cols-3">

//           {missions.map((mission, index) => {

//             const Icon = mission.icon;

//             return (
//               <motion.button
//                 key={mission.title}
//                 type="button"
//                 onClick={() => navigate(mission.route)}
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{
//                   duration: 0.35,
//                   delay: index * 0.08,
//                 }}
//                 className="group text-left rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900"
//               >

//                 <div className="flex items-start justify-between">

//                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-cyan-400">
//                     <Icon size={19} />
//                   </div>

//                   <ArrowRight
//                     size={17}
//                     className="text-gray-600 transition group-hover:translate-x-1 group-hover:text-cyan-400"
//                   />

//                 </div>

//                 <h4 className="mt-5 font-semibold">
//                   {mission.title}
//                 </h4>

//                 <p className="mt-2 text-sm leading-5 text-gray-400">
//                   {mission.description}
//                 </p>

//                 <p className="mt-4 text-xs font-semibold text-cyan-400">
//                   {mission.action} →
//                 </p>

//               </motion.button>
//             );
//           })}

//         </div>

//       </section>


//       {/* ================================
//           MAIN WORKSPACE
//       ================================= */}

//       <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">

//         <div className="space-y-8 xl:col-span-2">

//           <AIAssistant />

//           <ContinueLearning
//             learning={dashboardData?.learning}
//           />

//           <RecentActivity
//             activities={dashboardData?.activities}
//           />

//         </div>


//         <div className="space-y-8">

//           <ProfileCard
//             user={dashboardData?.user}
//           />

//           <CareerReadiness
//             dashboardData={dashboardData}
//           />

//         </div>

//       </div>


//       {/* ================================
//           QUICK ACTIONS
//       ================================= */}

//       <QuickAccess data={dashboardData} />

//     </div>
//   );
// }


// /* --------------------------------
//    Progress Card
// --------------------------------- */

// function ProgressCard({
//   icon: Icon,
//   label,
//   value,
//   description,
// }) {
//   return (
//     <motion.div
//       whileHover={{ y: -3 }}
//       className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
//     >
//       <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/10 text-cyan-400">
//         <Icon size={19} />
//       </div>

//       <p className="text-2xl font-bold">
//         {value}
//       </p>

//       <p className="mt-1 text-sm font-semibold">
//         {label}
//       </p>

//       <p className="mt-1 text-xs text-gray-500">
//         {description}
//       </p>
//     </motion.div>
//   );
// }


// /* --------------------------------
//    Career Readiness
// --------------------------------- */

// function CareerReadiness({ dashboardData }) {

//   const stats = dashboardData?.stats || {};

//   const courses = Number(
//     stats?.coursesStarted ??
//     stats?.courses ??
//     0
//   );

//   const problems = Number(
//     stats?.problemsSolved ??
//     stats?.problems ??
//     0
//   );

//   const achievements = Number(
//     stats?.achievements ??
//     0
//   );

//   const score = Math.min(
//     100,
//     courses * 10 +
//     problems * 2 +
//     achievements * 10
//   );

//   return (
//     <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

//       <div className="flex items-center justify-between">

//         <div>
//           <p className="text-xs uppercase tracking-wider text-gray-500">
//             Career Intelligence
//           </p>

//           <h3 className="mt-1 font-semibold">
//             Career Readiness
//           </h3>
//         </div>

//         <Sparkles
//           size={18}
//           className="text-cyan-400"
//         />

//       </div>


//       <div className="mt-6 flex items-center gap-5">

//         <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-8 border-slate-800">

//           <div className="absolute inset-0 rounded-full border-8 border-cyan-400 border-l-transparent border-b-transparent" />

//           <span className="text-xl font-bold">
//             {score}%
//           </span>

//         </div>


//         <div>

//           <p className="text-sm font-semibold">
//             {score >= 70
//               ? "You're building strong momentum."
//               : score >= 40
//               ? "You're on your way."
//               : "Your journey is just beginning."}
//           </p>

//           <p className="mt-2 text-xs leading-5 text-gray-500">
//             Complete learning, projects and career activities to improve your readiness.
//           </p>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default DashboardCards;













import StatsGrid from "./StatsGrid";
import ContinueLearning from "./ContinueLearning";
import RecentActivity from "./RecentActivity";
import ProfileCard from "./ProfileCard";

function DashboardCards({ dashboardData }) {
  return (
    <div className="space-y-8">

      {/* Progress Snapshot */}

      <StatsGrid
        stats={dashboardData?.stats}
      />


      {/* Continue Learning + Career Readiness */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <ContinueLearning
            learning={dashboardData?.learning}
          />
        </div>

        <ProfileCard
          user={dashboardData?.user}
        />

      </div>


      {/* Recent Activity */}

      <RecentActivity
        activities={dashboardData?.activities}
      />

    </div>
  );
}

export default DashboardCards;