import {
  FiUsers,
  FiFileText,
  FiX,
  FiGrid,
  FiBarChart2,
  FiSettings,
  FiActivity,
  FiLogOut,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import API from "../../services/api";

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
  // CURRENT ADMIN
  // ============================================================

  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch (error) {
    console.error("Failed to read admin user:", error);
  }

  const name = user.name || "Admin";
  const initial = name.charAt(0).toUpperCase() || "A";

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    try {
      await API.post("/auth/logout");

      console.log("Admin logout successful");
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

    if (typeof setMobileOpen === "function") {
      setMobileOpen(false);
    }
  };

  // ============================================================
  // CLOSE MOBILE SIDEBAR
  // ============================================================

  const handleCloseSidebar = () => {
    if (typeof setMobileOpen === "function") {
      setMobileOpen(false);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

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
          border-white/[0.08]
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
            BRAND HEADER
        ==================================================== */}

        <div
          className="
            flex
            min-h-[76px]
            shrink-0
            items-center
            justify-between
            border-b
            border-white/[0.08]
            px-4
            py-4
            sm:px-5
            lg:min-h-[80px]
            lg:px-5
          "
        >
          {/* BRAND */}

          <div className="flex min-w-0 items-center gap-3">

            {/* BRAND ICON */}

            <div
              className="
                relative
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-2xl
                border
                border-blue-400/20
                bg-gradient-to-br
                from-blue-600
                via-indigo-600
                to-purple-600
                shadow-[0_8px_25px_rgba(59,130,246,0.18)]
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  bg-white/10
                "
              />

              <FiActivity
                size={21}
                className="relative text-white"
              />
            </div>

            {/* BRAND TEXT */}

            <div className="min-w-0">

              <div className="flex items-center gap-2">

                <h1
                  className="
                    truncate
                    text-[16px]
                    font-black
                    tracking-[0.04em]
                    text-white
                    sm:text-[17px]
                  "
                >
                  CAMPUS
                  <span className="text-blue-400">
                    HUB
                  </span>
                </h1>

                {/* STATUS DOT */}

                <span
                  className="
                    h-1.5
                    w-1.5
                    shrink-0
                    animate-pulse
                    rounded-full
                    bg-emerald-400
                  "
                />

              </div>

              <p
                className="
                  mt-0.5
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-slate-500
                "
              >
                Administration
              </p>

            </div>
          </div>

          {/* MOBILE CLOSE */}

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
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              text-slate-400
              transition-all
              duration-200
              hover:border-white/20
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
          {/* SECTION LABEL */}

          <p
            className="
              mb-3
              px-3
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-slate-600
            "
          >
            Workspace
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const activeBtn = active === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigation(item.id)}
                aria-current={
                  activeBtn ? "page" : undefined
                }
                className={`
                  group
                  relative
                  flex
                  min-h-[46px]
                  w-full
                  items-center
                  gap-3
                  overflow-hidden
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
                        border-blue-400/20
                        bg-blue-500/[0.10]
                        text-white
                      `
                      : `
                        border-transparent
                        text-slate-400
                        hover:border-white/[0.06]
                        hover:bg-white/[0.04]
                        hover:text-white
                      `
                  }
                `}
              >
                {/* ACTIVE INDICATOR */}

                {activeBtn && (
                  <span
                    className="
                      absolute
                      left-0
                      top-1/2
                      h-6
                      w-0.5
                      -translate-y-1/2
                      rounded-r-full
                      bg-blue-400
                    "
                  />
                )}

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
            border-white/[0.08]
            p-3
            sm:p-4
          "
        >
          {/* PROFILE */}

          <div
            className="
              mb-2
              flex
              min-w-0
              items-center
              gap-3
              rounded-xl
              border
              border-white/[0.07]
              bg-white/[0.035]
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
                rounded-xl
                bg-gradient-to-br
                from-blue-500
                to-indigo-600
                text-sm
                font-extrabold
                text-white
                shadow-lg
                shadow-blue-500/10
                sm:h-10
                sm:w-10
              "
            >
              {initial}
            </div>

            {/* USER INFO */}

            <div className="min-w-0 flex-1">

              <p
                className="
                  truncate
                  text-sm
                  font-semibold
                  text-white
                "
              >
                {name}
              </p>

              <div className="mt-0.5 flex items-center gap-1.5">

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-emerald-400
                  "
                />

                <p
                  className="
                    truncate
                    text-[10px]
                    font-medium
                    text-slate-500
                    sm:text-[11px]
                  "
                >
                  Administrator
                </p>

              </div>

            </div>
          </div>

          {/* LOGOUT */}

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
              text-slate-500
              transition-all
              duration-200
              hover:bg-red-500/[0.08]
              hover:text-red-400
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
