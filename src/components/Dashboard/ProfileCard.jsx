// src/components/Dashboard/ProfileCard.jsx

import { Pencil } from "lucide-react";
import { motion } from "framer-motion";

function ProfileCard({ user }) {

  const completion = 82;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl"
    >

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-400/20 bg-gradient-to-r from-blue-600 to-cyan-500 text-lg font-semibold shadow-lg shadow-blue-500/20">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>


        <div>

          <h3 className="font-semibold">
            {user?.name || "Loading..."}
          </h3>

          <p className="text-sm text-gray-400">
            {user?.branch || "Computer Science"}
          </p>

        </div>

      </div>



      <dl className="mt-5 space-y-2 text-sm">


        <div className="flex justify-between text-gray-400">
          <dt>College</dt>

          <dd className="text-gray-200">
            {user?.college || "Not Added"}
          </dd>
        </div>



        <div className="flex justify-between text-gray-400">
          <dt>Year</dt>

          <dd className="text-gray-200">
            {user?.year ? `${user.year} Year` : "Not Added"}
          </dd>
        </div>



        <div className="flex justify-between text-gray-400">
          <dt>Email</dt>

          <dd className="truncate text-gray-200">
            {user?.email || "Not Added"}
          </dd>
        </div>



        <div className="flex justify-between text-gray-400">
          <dt>Role</dt>

          <dd className="capitalize text-gray-200">
            {user?.role || "Student"}
          </dd>
        </div>


      </dl>



      <div className="mt-5">

        <div className="mb-1.5 flex items-center justify-between text-xs text-gray-400">

          <span>
            Profile Completion
          </span>

          <span>
            {completion}%
          </span>

        </div>


        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">

          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
            style={{ width: `${completion}%` }}
          />

        </div>

      </div>



      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 py-2.5 text-sm font-semibold transition-colors duration-300 hover:border-blue-500 hover:text-blue-400"
      >

        <Pencil size={14} />

        Edit Profile

      </button>


    </motion.div>
  );
}


export default ProfileCard;