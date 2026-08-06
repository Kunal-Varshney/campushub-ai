// src/components/Dashboard/Topbar.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Topbar({ user }) {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/80 px-6 py-4 backdrop-blur-xl">


      <div>

        <h1 className="text-lg font-semibold sm:text-xl">
          Good Morning {user?.name?.split(" ")[0] || "👋"} 👋
        </h1>

        <p className="hidden text-sm text-gray-400 sm:block">
          Ready to learn something new today?
        </p>

      </div>



      <div className="flex flex-1 items-center justify-end gap-3">


        <div className="relative hidden w-full max-w-xs md:block">

          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search notes, courses..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/70 py-2.5 pl-9 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-colors duration-300 focus:border-blue-500"
          />

        </div>



        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 transition-colors duration-300 hover:border-blue-500 hover:text-blue-400"
        >

          <Bell size={18} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-cyan-400" />

        </button>




        <div className="relative">

          <button
            type="button"
            onClick={() => setDropdownOpen((open) => !open)}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/70 py-1.5 pl-1.5 pr-3 transition-colors duration-300 hover:border-blue-500"
          >

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-semibold">

              {user?.name?.charAt(0).toUpperCase() || "U"}

            </div>


            <ChevronDown size={14} className="text-gray-400" />

          </button>




          <AnimatePresence>

            {dropdownOpen && (

              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/95 shadow-xl shadow-black/30 backdrop-blur-xl"
              >


                <div className="border-b border-slate-800 px-4 py-3">

                  <p className="text-sm font-semibold text-white">
                    {user?.name || "User"}
                  </p>

                  <p className="truncate text-xs text-gray-400">
                    {user?.email || ""}
                  </p>

                </div>



                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm text-gray-300 transition-colors duration-300 hover:bg-slate-800 hover:text-white"
                >

                  <User size={16} /> Profile

                </button>



                <button
                  type="button"
                  onClick={() => navigate("/settings")}
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm text-gray-300 transition-colors duration-300 hover:bg-slate-800 hover:text-white"
                >

                  <Settings size={16} /> Settings

                </button>



                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 border-t border-slate-800 px-4 py-3 text-sm text-red-400 transition-colors duration-300 hover:bg-red-500/10"
                >

                  <LogOut size={16} /> Logout

                </button>


              </motion.div>

            )}

          </AnimatePresence>


        </div>


      </div>


    </header>
  );
}


export default Topbar;