import {
  FiUsers,
  FiFileText,
  FiX,
  FiGrid,
  FiBarChart2,
  FiSettings,
  FiZap,
  FiLogOut,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/api";

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

  const handleLogout = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    try {
      await logoutUser();
    } catch (error) {
      console.error("Admin Logout Error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login", {
        replace: true,
      });
    }
  };

  // ============================================================
  // NAVIGATION
  // ============================================================

  const handleNavigation = (id) => {
    setActive(id);

    // Close sidebar after selecting a page on mobile
    if (setMobileOpen) {
      setMobileOpen(false);
    }
  };

  // ============================================================
  // CLOSE MOBILE SIDEBAR
  // ============================================================

  const handleCloseSidebar = () => {
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
          onClick={handleCloseSidebar}
          aria-hidden="true"
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
          h-[100dvh]
          w-[min(18rem,85vw)]
          flex-col
          overflow-hidden
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
            LOGO / HEADER
        ==================================================== */}

        <div
          className="
            flex
            min-h-[76px]
            shrink-0
            items-center
            justify-between
            border-b
            border-white/10
            px-4
            py-4
            sm:px-5
            lg:min-h-[80px]
            lg:px-6
          "
        >
          {/* BRAND */}

          <div className="flex min-w-0 items-center gap-3">
            {/* LOGO */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-blue-500
                to-purple-500
                text-white
                shadow-lg
                sm:h-11
                sm:w-11
              "
            >
              <FiZap className="text-lg sm:text-xl" />
            </div>

            {/* BRAND TEXT */}

            <div className="min-w-0">
              <h1
                className="
                  truncate
                  text-base
                  font-bold
                  text-white
                  sm:text-lg
                "
              >
                CampusHub AI
              </h1>

              <p
                className="
                  truncate
                  text-[11px]
                  text-slate-400
                  sm:text-xs
                "
              >
                Admin Panel
              </p>
            </div>
          </div>

          {/* ==================================================
              MOBILE CLOSE BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={handleCloseSidebar}
            aria-label="Close admin menu"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              border
              border-white/10
              bg-white/5
              text-slate-400
              transition
              duration-200
              hover:bg-white/10
              hover:text-white
              active:scale-95
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
            min-h-0
            flex-1
            space-y-1.5
            overflow-y-auto
            overscroll-contain
            px-3
            py-5
            sm:space-y-2
            sm:px-4
            sm:py-6
          "
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const activeBtn = active === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  handleNavigation(item.id)
                }
                aria-current={
                  activeBtn
                    ? "page"
                    : undefined
                }
                className={`
                  group
                  flex
                  min-h-[46px]
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  border
                  px-3
                  py-3
                  text-left
                  transition-all
                  duration-200
                  active:scale-[0.98]

                  sm:px-4

                  ${
                    activeBtn
                      ? `
                        border-blue-400/30
                        bg-gradient-to-r
                        from-blue-500/20
                        to-purple-500/20
                        text-white
                        shadow-lg
                      `
                      : `
                        border-transparent
                        text-slate-400
                        hover:border-white/5
                        hover:bg-white/5
                        hover:text-white
                      `
                  }
                `}
              >
                {/* ICON */}

                <Icon
                  className={`
                    shrink-0
                    text-lg
                    transition-colors
                    duration-200

                    ${
                      activeBtn
                        ? "text-blue-400"
                        : "text-slate-500 group-hover:text-slate-300"
                    }
                  `}
                />

                {/* LABEL */}

                <span
                  className="
                    min-w-0
                    truncate
                    text-sm
                    font-medium
                  "
                >
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
            shrink-0
            border-t
            border-white/10
            p-3
            sm:p-4
          "
        >
          {/* ==================================================
              PROFILE
          ================================================== */}

          <div
            className="
              mb-2
              flex
              min-w-0
              items-center
              gap-3
              rounded-xl
              border
              border-white/10
              bg-white/5
              p-3
            "
          >
            {/* AVATAR */}

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-blue-500
                to-purple-500
                text-sm
                font-bold
                text-white
                shadow-lg
                sm:h-10
                sm:w-10
              "
            >
              K
            </div>

            {/* USER INFO */}

            <div className="min-w-0 flex-1">
              <p
                className="
                  truncate
                  text-sm
                  font-medium
                  text-white
                "
              >
                Kunal
              </p>

              <p
                className="
                  truncate
                  text-[11px]
                  text-slate-400
                  sm:text-xs
                "
              >
                Administrator
              </p>
            </div>
          </div>

          {/* ==================================================
              LOGOUT
          ================================================== */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              min-h-[44px]
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-3
              text-red-400
              transition-all
              duration-200
              hover:bg-red-500/10
              hover:text-red-300
              active:scale-[0.98]
              sm:px-4
            "
          >
            <FiLogOut className="shrink-0 text-base" />

            <span
              className="
                text-sm
                font-medium
              "
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;