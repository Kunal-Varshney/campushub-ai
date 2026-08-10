// src/components/Dashboard/Sidebar.jsx
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },

  { 
    label: "AI Assistant", 
    icon: Bot, 
    path: "/ai-assistant" 
  },

  { 
    label: "Smart Notes", 
    icon: BookOpen, 
    path: "/smart-notes" 
  },

  { 
    label: "Resume Builder", 
    icon: FileText, 
    path: "/resume-builder" 
  },

  { 
    label: "Internships", 
    icon: Briefcase, 
    path: "/internship-finder" 
  },

  { 
    label: "Skill Roadmap", 
    icon: Target, 
    path: "/skill-roadmap" 
  },

  {
    label: "Community",
    icon: Users,
    path: "/community"
  },

  { 
    label: "Mock Interview", 
    icon: Mic, 
    path: "/mock-interview" 
  },

  { 
    label: "Certificates", 
    icon: Award, 
    path: "/certificates" 
  },

  { 
    label: "Settings", 
    icon: Settings, 
    path: "/settings" 
  },
];

function SidebarContent({ pathname, onNavigate }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex h-full flex-col">
      <Link
        to="/dashboard"
        onClick={onNavigate}
        className="flex items-center gap-2 px-6 py-7"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500">
          <Sparkles size={18} />
        </div>
        <span className="text-lg font-bold">
          CampusHub<span className="text-blue-500">AI</span>
        </span>
      </Link>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                active
                  ? "bg-gradient-to-r from-blue-600/20 to-cyan-500/20 text-blue-400"
                  : "text-gray-400 hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute left-0 h-6 w-1 rounded-full bg-gradient-to-b from-blue-500 to-cyan-400"
                />
              )}
              <Icon
                size={18}
                className="shrink-0 transition-transform duration-300 group-hover:scale-110"
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 px-3 py-5">
        <button
          type="button"
           onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 transition-colors duration-300 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={18} />
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
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-slate-800 bg-slate-950/95 backdrop-blur-xl lg:block">
        <SidebarContent pathname={pathname} onNavigate={() => {}} />
      </aside>

      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        className="fixed top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/90 backdrop-blur lg:hidden"
      >
        <Menu size={20} />
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
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-800 bg-slate-950 lg:hidden"
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900"
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