// src/pages/Profile.jsx

import {
  User,
  Mail,
  GraduationCap,
  Code2,
  Target,
  CalendarDays,
  Sparkles,
  Edit3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const user = {
    name: storedUser?.name || "Student",
    email: storedUser?.email || "Not Available",
    college: storedUser?.college || "Not Added",
    branch: storedUser?.branch || "Not Added",
    year: storedUser?.year || "Not Added",
    role: storedUser?.role || "student",
    skills: storedUser?.skills || [],
    profileStrength: storedUser?.profileStrength || 40,
    careerGoal: storedUser?.careerGoal || "Not Set",
  };

  const firstLetter =
    user.name?.charAt(0)?.toUpperCase() || "S";

  return (
    <section className="min-h-screen bg-slate-950 px-4 py-6 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-8">

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mb-5 text-sm text-gray-500 transition hover:text-cyan-400"
          >
            ← Back to Dashboard
          </button>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                <Sparkles size={13} />
                Career Identity
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                My Profile
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Your identity, skills and career direction in one place.
              </p>

            </div>

            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-800
                bg-slate-900
                px-4
                py-2.5
                text-sm
                font-semibold
                text-gray-300
                transition
                hover:border-cyan-500/40
                hover:text-cyan-400
              "
            >
              <Edit3 size={16} />
              Edit Profile
            </button>

          </div>

        </div>


        {/* Main Grid */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">


          {/* Identity Card */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              rounded-3xl
              border
              border-slate-800
              bg-slate-900/70
              p-6
              backdrop-blur-xl
            "
          >

            <div className="flex flex-col items-center text-center">

              <div className="
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-3xl
                bg-gradient-to-br
                from-blue-600
                to-cyan-400
                text-3xl
                font-bold
                shadow-xl
                shadow-blue-500/10
              ">
                {firstLetter}
              </div>

              <h2 className="mt-5 text-xl font-bold">
                {user.name}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {user.email}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Student
              </div>

            </div>


            {/* Profile Strength */}

            <div className="mt-8">

              <div className="mb-2 flex items-center justify-between">

                <span className="text-sm text-gray-400">
                  Profile Strength
                </span>

                <span className="text-sm font-semibold text-cyan-400">
                  {user.profileStrength}%
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${user.profileStrength}%`,
                  }}
                  transition={{ duration: 0.8 }}
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-400
                  "
                />

              </div>

              <p className="mt-2 text-xs text-gray-600">
                Complete more details to improve your career profile.
              </p>

            </div>

          </motion.div>


          {/* Academic Information */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="
              rounded-3xl
              border
              border-slate-800
              bg-slate-900/70
              p-6
              backdrop-blur-xl
              lg:col-span-2
            "
          >

            <div className="mb-6">

              <h2 className="text-lg font-semibold">
                Academic Identity
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Your current education details
              </p>

            </div>


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <InfoCard
                icon={GraduationCap}
                label="College"
                value={user.college}
              />

              <InfoCard
                icon={Code2}
                label="Branch"
                value={user.branch}
              />

              <InfoCard
                icon={CalendarDays}
                label="Academic Year"
                value={user.year}
              />

              <InfoCard
                icon={ShieldCheck}
                label="Account Role"
                value={user.role}
              />

            </div>

          </motion.div>


          {/* Career Direction */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="
              rounded-3xl
              border
              border-slate-800
              bg-slate-900/70
              p-6
              backdrop-blur-xl
              lg:col-span-2
            "
          >

            <div className="flex items-start gap-4">

              <div className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-purple-500/10
                text-purple-400
              ">
                <Target size={20} />
              </div>

              <div>

                <h2 className="text-lg font-semibold">
                  Career Direction
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  What you're currently working toward
                </p>

              </div>

            </div>


            <div className="
              mt-6
              rounded-2xl
              border
              border-slate-800
              bg-slate-950/50
              p-5
            ">

              <p className="text-xs uppercase tracking-wider text-gray-600">
                Current Goal
              </p>

              <p className="mt-2 text-lg font-semibold">
                {user.careerGoal}
              </p>

              <button
                type="button"
                onClick={() => navigate("/skill-roadmap")}
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-cyan-400
                  transition
                  hover:text-cyan-300
                "
              >
                View Skill Roadmap
                <ArrowRight size={15} />
              </button>

            </div>

          </motion.div>


          {/* Account */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="
              rounded-3xl
              border
              border-slate-800
              bg-slate-900/70
              p-6
              backdrop-blur-xl
            "
          >

            <h2 className="text-lg font-semibold">
              Account
            </h2>

            <div className="mt-5 space-y-4">

              <div className="flex items-center gap-3">

                <Mail
                  size={17}
                  className="text-cyan-400"
                />

                <div className="min-w-0">

                  <p className="text-xs text-gray-600">
                    Email
                  </p>

                  <p className="truncate text-sm text-gray-300">
                    {user.email}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() => navigate("/settings")}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-950/60
                  py-2.5
                  text-sm
                  font-semibold
                  text-gray-400
                  transition
                  hover:border-cyan-500/30
                  hover:text-cyan-400
                "
              >
                Account Settings
                <ArrowRight size={15} />
              </button>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}


function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="
      rounded-2xl
      border
      border-slate-800
      bg-slate-950/50
      p-4
    ">

      <div className="flex items-center gap-3">

        <div className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          bg-cyan-500/10
          text-cyan-400
        ">
          <Icon size={17} />
        </div>

        <div className="min-w-0">

          <p className="text-xs text-gray-600">
            {label}
          </p>

          <p className="mt-0.5 truncate text-sm font-semibold text-gray-200">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Profile;