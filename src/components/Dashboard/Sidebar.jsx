// src/components/Dashboard/Sidebar.jsx
import api from "../../services/api";

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Bot,
  BookOpen,
  FileText,
  Briefcase,
  Target,
  Mic,
  Award,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "AI Assistant",
    icon: Bot,
    path: "/ai-assistant",
  },
  {
    label: "Smart Notes",
    icon: BookOpen,
    path: "/smart-notes",
  },
  {
    label: "Resume Builder",
    icon: FileText,
    path: "/resume-builder",
  },
  {
    label: "Internships",
    icon: Briefcase,
    path: "/internship-finder",
  },
  {
    label: "Skill Roadmap",
    icon: Target,
    path: "/skill-roadmap",
  },
  {
    label: "Community",
    icon: Users,
    path: "/community",
  },
  {
    label: "Mock Interview",
    icon: Mic,
    path: "/mock-interview",
  },
  {
    label: "Certificates",
    icon: Award,
    path: "/certificates",
  },
];

function SidebarContent({ pathname, onNavigate }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("LOGOUT: Request started");

      const response = await api.post("/auth/logout");

      console.log("LOGOUT: Backend response:", response.data);
    } catch (error) {
      console.error(
        "LOGOUT ERROR:",
        error?.response?.status,
        error?.response?.data,
        error.message
      );
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      console.log("LOGOUT: Local storage cleared");

      navigate("/login", {
        replace: true,
      });
    }
  };

  return (
    <div className="flex h-full flex-col">

      {/* Brand */}

      <div className="border-b border-slate-800/70 px-4 py-5">

        <Link
          to="/dashboard"
          onClick={onNavigate}
          className="group flex items-center gap-3 rounded-xl px-2 py-1"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg shadow-blue-500/20 transition group-hover:scale-105">
            <Sparkles size={18} />
          </div>

          <div>
            <p className="text-base font-bold tracking-tight">
              CampusHub<span className="text-cyan-400">AI</span>
            </p>

            <p className="text-[10px] uppercase tracking-wider text-gray-600">
              Student workspace
            </p>
          </div>

        </Link>

      </div>


      {/* Navigation */}

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-600">
          Workspace
        </p>

        {menuItems.map((item) => {

          const Icon = item.icon;

          const active =
            pathname === item.path ||
            (item.path !== "/dashboard" &&
              pathname.startsWith(`${item.path}/`));

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-gray-500 hover:bg-slate-900 hover:text-gray-200"
              }`}
            >

              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute left-0 h-6 w-0.5 rounded-full bg-gradient-to-b from-blue-500 to-cyan-400"
                />
              )}

              <Icon
                size={17}
                className={`shrink-0 transition-transform duration-200 ${
                  active
                    ? "text-cyan-400"
                    : "group-hover:scale-105"
                }`}
              />

              <span className="flex-1">
                {item.label}
              </span>

              {active && (
                <ChevronRight
                  size={14}
                  className="text-cyan-500/70"
                />
              )}

            </Link>
          );
        })}

      </nav>


      {/* Bottom */}

      <div className="border-t border-slate-800/70 p-3">

        <Link
          to="/settings"
          onClick={onNavigate}
          className={`mb-1 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
            pathname === "/settings"
              ? "bg-cyan-500/10 text-cyan-400"
              : "text-gray-500 hover:bg-slate-900 hover:text-gray-200"
          }`}
        >
          <Settings size={17} />
          Settings
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={17} />
          Logout
        </button>

      </div>

    </div>
  );
}


function Sidebar() {

  const { pathname } = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>

      {/* Desktop */}

      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-slate-800 bg-slate-950/95 backdrop-blur-xl lg:block">
        <SidebarContent
          pathname={pathname}
          onNavigate={() => {}}
        />
      </aside>


      {/* Mobile menu button */}

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/90 text-gray-300 shadow-xl backdrop-blur lg:hidden"
      >
        <Menu size={19} />
      </button>


      {/* Mobile drawer */}

      <AnimatePresence>

        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: -290 }}
              animate={{ x: 0 }}
              exit={{ x: -290 }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-800 bg-slate-950 lg:hidden"
            >

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-gray-400 hover:text-white"
              >
                <X size={16} />
              </button>

              <SidebarContent
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />

            </motion.aside>
          </>
        )}

      </AnimatePresence>

    </>
  );
}

export default Sidebar;