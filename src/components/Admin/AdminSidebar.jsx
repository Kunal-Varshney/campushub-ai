import {
  FiUsers,
  FiUserCheck,
  FiShield,
  FiFileText,
  FiX,
  FiUser,
  FiMail,
  FiBookOpen,
  FiCalendar,
  FiActivity,
  FiDownload,
  FiMessageSquare,
  FiClock,
  FiShieldOff,
  FiMenu,
  FiGrid,
  FiBarChart2,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: FiGrid,
  },
  {
    id: "users",
    label: "Users",
    icon: FiUsers,
  },
  {
    id: "notes",
    label: "Notes",
    icon: FiFileText,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: FiBarChart2,
  },
  {
    id: "settings",
    label: "Settings",
    icon: FiSettings,
  },
];

const AdminSidebar = ({
  active,
  setActive,
  mobileOpen,
  setMobileOpen,
}) => {
  const navigate = useNavigate();

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };

  // ============================================================
  // NAVIGATION
  // ============================================================

  const handleNavigation = (id) => {
    setActive(id);

    // Close sidebar on mobile
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* ======================================================
          MOBILE OVERLAY
      ====================================================== */}

      {mobileOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/60
            backdrop-blur-sm
            lg:hidden
          "
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-72
          flex-col
          border-r
          border-white/10
          bg-slate-950/95
          shadow-2xl
          backdrop-blur-xl
          transition-transform
          duration-300
          ease-in-out

          lg:w-64
          lg:translate-x-0

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* ====================================================
            LOGO
        ==================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/10
            px-5
            py-5
            lg:px-6
            lg:py-6
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-blue-500
                to-purple-500
                text-white
                shadow-lg
              "
            >
              <FiZap size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-white">
                CampusHub AI
              </h1>

              <p className="text-xs text-slate-400">
                Admin Panel
              </p>
            </div>
          </div>

          {/* MOBILE CLOSE */}

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              border-white/10
              bg-white/5
              text-slate-400
              transition
              hover:bg-white/10
              hover:text-white
              lg:hidden
            "
          >
            <FiX size={18} />
          </button>
        </div>

        {/* ====================================================
            NAVIGATION
        ==================================================== */}

        <nav
          className="
            flex-1
            space-y-2
            overflow-y-auto
            px-4
            py-6
          "
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const activeBtn =
              active === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  handleNavigation(item.id)
                }
                className={`
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-left
                  transition-all
                  duration-300

                  ${
                    activeBtn
                      ? `
                        border
                        border-blue-400/30
                        bg-gradient-to-r
                        from-blue-500/20
                        to-purple-500/20
                        text-white
                        shadow-lg
                      `
                      : `
                        text-slate-400
                        hover:bg-white/5
                        hover:text-white
                      `
                  }
                `}
              >
                <Icon
                  className={`
                    shrink-0
                    text-lg

                    ${
                      activeBtn
                        ? "text-blue-400"
                        : ""
                    }
                  `}
                />

                <span className="text-sm font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* ====================================================
            PROFILE + LOGOUT
        ==================================================== */}

        <div
          className="
            border-t
            border-white/10
            p-4
          "
        >
          {/* PROFILE */}

          <div
            className="
              mb-3
              flex
              items-center
              gap-3
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-3
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-blue-500
                to-purple-500
                font-bold
                text-white
              "
            >
              K
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm text-white">
                Kunal
              </p>

              <p className="truncate text-xs text-slate-400">
                Administrator
              </p>
            </div>
          </div>

          {/* LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-red-400
              transition-all
              duration-200
              hover:bg-red-500/10
              hover:text-red-300
            "
          >
            <FiLogOut />

            <span className="text-sm font-medium">
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;