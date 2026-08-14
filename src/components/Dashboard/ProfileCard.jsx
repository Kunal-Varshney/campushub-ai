import {
  ArrowRight,
  Mail,
  Sparkles,
  User,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ProfileCard({ user }) {
  const navigate = useNavigate();

  const profile = user || {};

  const name = profile?.name || "New Student";
  const email = profile?.email || "Complete your profile";

  const profileStrength = Math.min(
    100,
    Math.max(
      0,
      Number(profile?.profileStrength ?? 20)
    )
  );

  const initials = name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const profileMessage =
    profileStrength >= 80
      ? "Your profile is looking strong."
      : profileStrength >= 50
      ? "You're building a solid profile."
      : "Complete your profile to unlock better recommendations.";

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60"
    >
      <div className="relative p-6">

        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative flex items-start gap-4">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-lg font-bold shadow-lg shadow-blue-500/20">
            {initials || <User size={22} />}
          </div>

          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wider text-cyan-400">
              Career Identity
            </p>

            <h3 className="mt-1 truncate text-lg font-bold">
              {name}
            </h3>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
              <Mail size={12} />
              <span className="truncate">{email}</span>
            </div>
          </div>

        </div>


        <div className="relative mt-6">

          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Profile strength
            </span>

            <span className="text-sm font-bold text-cyan-400">
              {profileStrength}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${profileStrength}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
            />
          </div>

          <p className="mt-3 text-xs leading-5 text-gray-500">
            {profileMessage}
          </p>

        </div>


        <div className="relative mt-6 grid grid-cols-2 gap-3">

          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
            <p className="text-[11px] text-gray-500">
              Status
            </p>

            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Active
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
            <p className="text-[11px] text-gray-500">
              AI Support
            </p>

            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
              <Sparkles size={13} className="text-cyan-400" />
              Ready
            </p>
          </div>

        </div>


        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="relative mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 py-2.5 text-sm font-semibold transition hover:border-cyan-500/50 hover:text-cyan-400"
        >
          Improve Profile
          <ArrowRight size={15} />
        </button>

      </div>
    </motion.section>
  );
}

export default ProfileCard;