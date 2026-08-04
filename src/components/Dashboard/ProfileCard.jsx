// src/components/Dashboard/ProfileCard.jsx
import { Pencil } from "lucide-react";
import { motion } from "framer-motion";

const profile = {
  name: "Aarav Mehta",
  college: "SRM Institute of Technology",
  branch: "Computer Science Engineering",
  semester: "6th Semester",
  email: "aarav.mehta@example.com",
  completion: 82,
};

function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-400/20 bg-gradient-to-r from-blue-600 to-cyan-500 text-lg font-semibold shadow-lg shadow-blue-500/20">
          {profile.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold">{profile.name}</h3>
          <p className="text-sm text-gray-400">{profile.branch}</p>
        </div>
      </div>

      <dl className="mt-5 space-y-2 text-sm">
        <div className="flex justify-between text-gray-400">
          <dt>College</dt>
          <dd className="text-gray-200">{profile.college}</dd>
        </div>
        <div className="flex justify-between text-gray-400">
          <dt>Semester</dt>
          <dd className="text-gray-200">{profile.semester}</dd>
        </div>
        <div className="flex justify-between text-gray-400">
          <dt>Email</dt>
          <dd className="truncate text-gray-200">{profile.email}</dd>
        </div>
      </dl>

      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between text-xs text-gray-400">
          <span>Profile Completion</span>
          <span>{profile.completion}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
            style={{ width: `${profile.completion}%` }}
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