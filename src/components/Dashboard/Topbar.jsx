// src/components/Dashboard/Topbar.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  Home,
  LogOut,
  Sun,
  Moon,
  Sunset,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function getTimeContext() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      greeting: "Good Morning",
      message: "Start your day with one smart move.",
      icon: Sun,
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      greeting: "Good Afternoon",
      message: "Keep building your skills.",
      icon: Sun,
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      greeting: "Good Evening",
      message: "Make your evening count.",
      icon: Sunset,
    };
  }

  return {
    greeting: "Good Night",
    message: "A little progress today still counts.",
    icon: Moon,
  };
}

function Topbar({ user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [timeContext, setTimeContext] = useState(getTimeContext());

  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      setTimeContext(getTimeContext());
    };

    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (!query) return;

    navigate(`/discover?search=${encodeURIComponent(query)}`);
  };

  const TimeIcon = timeContext.icon;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 py-3 sm:px-6">

        {/* Greeting */}

        <div className="min-w-0">

          <div className="flex items-center gap-2">

            <TimeIcon
              size={17}
              className="shrink-0 text-cyan-400"
            />

            <h1 className="truncate text-base font-semibold sm:text-xl">
              {timeContext.greeting},{" "}
              {user?.name?.split(" ")[0] || "there"}
            </h1>

          </div>

          <p className="mt-1 hidden text-xs text-gray-500 sm:block">
            {timeContext.message}
          </p>

        </div>


        {/* Right Controls */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* Search */}

          <form
            onSubmit={handleSearch}
            className="relative hidden w-full max-w-xs md:block"
          >
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search CampusHub..."
              className="w-full rounded-xl border border-slate-800 bg-slate-900/70 py-2.5 pl-9 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-500/50"
            />
          </form>


          {/* Home */}

          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="Go to home"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-gray-400 transition hover:border-cyan-500/40 hover:text-cyan-400"
          >
            <Home size={17} />
          </button>


          {/* Notifications */}

          <button
            type="button"
            onClick={() => navigate("/notifications")}
            aria-label="Notifications"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-gray-400 transition hover:border-cyan-500/40 hover:text-cyan-400"
          >
            <Bell size={17} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-400" />
          </button>


          {/* Profile */}

          <div className="relative">

            <button
              type="button"
              onClick={() => setDropdownOpen((open) => !open)}
              className="flex h-10 items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 px-1.5 pr-2.5 transition hover:border-cyan-500/40"
            >

              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 text-xs font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <ChevronDown
                size={13}
                className={`text-gray-500 transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />

            </button>


            <AnimatePresence>

              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/95 shadow-2xl shadow-black/40 backdrop-blur-xl"
                >

                  {/* User */}

                  <div className="border-b border-slate-800 px-4 py-3">

                    <p className="truncate text-sm font-semibold text-white">
                      {user?.name || "Student"}
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {user?.email || ""}
                    </p>

                  </div>


                  {/* Profile */}

                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-400 transition hover:bg-slate-800 hover:text-white"
                  >
                    <User size={16} />
                    Profile
                  </button>


                  {/* Settings */}

                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/settings");
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-400 transition hover:bg-slate-800 hover:text-white"
                  >
                    <Settings size={16} />
                    Settings
                  </button>


                  {/* Logout */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 border-t border-slate-800 px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

      </div>
    </header>
  );
}

export default Topbar;