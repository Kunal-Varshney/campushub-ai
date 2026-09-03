import {
  FiShield,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiActivity,
} from "react-icons/fi";

const AdminTopbar = ({
  mobileOpen,
  setMobileOpen,
}) => {
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
  // DYNAMIC GREETING
  // ============================================================

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 18
      ? "Good afternoon"
      : "Good evening";

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <header
      className="
        sticky
        top-0
        z-40
        h-[76px]
        border-b
        border-white/[0.07]
        bg-slate-950/90
        backdrop-blur-2xl
      "
    >
      <div
        className="
          flex
          h-full
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
          xl:px-10
        "
      >
        {/* ======================================================
            LEFT SECTION
        ====================================================== */}

        <div className="flex min-w-0 items-center gap-3">

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() => {
              if (typeof setMobileOpen === "function") {
                setMobileOpen((prev) => !prev);
              }
            }}
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              text-slate-300
              transition-all
              duration-200
              hover:border-blue-500/30
              hover:bg-blue-500/10
              hover:text-white
              active:scale-95
              lg:hidden
            "
            aria-label={
              mobileOpen
                ? "Close admin menu"
                : "Open admin menu"
            }
          >
            <FiMenu size={20} />
          </button>

          {/* ADMIN ICON */}

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
              shadow-[0_8px_30px_rgba(59,130,246,0.18)]
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

          {/* ADMIN CONTEXT */}

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <h1
                className="
                  truncate
                  text-[17px]
                  font-extrabold
                  tracking-tight
                  text-white
                  sm:text-lg
                "
              >
                Admin Control Center
              </h1>

              {/* SYSTEM STATUS */}

              <span
                className="
                  hidden
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-emerald-500/20
                  bg-emerald-500/10
                  px-2
                  py-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-emerald-400
                  md:inline-flex
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    animate-pulse
                    rounded-full
                    bg-emerald-400
                  "
                />

                Live
              </span>

            </div>

            <p
              className="
                mt-0.5
                hidden
                text-[11px]
                font-medium
                tracking-wide
                text-slate-500
                sm:block
              "
            >
              Monitor and manage your platform
            </p>

          </div>

        </div>

        {/* ======================================================
            RIGHT SECTION
        ====================================================== */}

        <div className="flex items-center gap-2 sm:gap-4">

          {/* GREETING */}

          <div
            className="
              hidden
              text-right
              lg:block
            "
          >
            <p
              className="
                text-sm
                font-semibold
                text-slate-200
              "
            >
              {greeting}, {name}
            </p>

            <p
              className="
                mt-0.5
                text-[10px]
                font-medium
                uppercase
                tracking-wider
                text-slate-500
              "
            >
              Administrator
            </p>
          </div>

          {/* NOTIFICATION */}

          <button
            type="button"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.035]
              text-slate-400
              transition-all
              duration-200
              hover:border-blue-500/30
              hover:bg-blue-500/10
              hover:text-white
              active:scale-95
            "
            aria-label="Notifications"
          >
            <FiBell size={18} />

            <span
              className="
                absolute
                right-2
                top-2
                h-1.5
                w-1.5
                rounded-full
                bg-blue-400
                ring-2
                ring-slate-950
              "
            />
          </button>

          {/* DIVIDER */}

          <div
            className="
              hidden
              h-8
              w-px
              bg-white/10
              sm:block
            "
          />

          {/* ADMIN PROFILE */}

          <div
            className="
              flex
              items-center
              gap-2.5
              rounded-2xl
              border
              border-white/[0.07]
              bg-white/[0.025]
              px-2
              py-1.5
              transition-all
              duration-200
              hover:border-white/10
              hover:bg-white/[0.05]
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
              "
            >
              {initial}
            </div>

            {/* PROFILE INFO */}

            <div className="hidden min-w-0 sm:block">

              <p
                className="
                  max-w-[130px]
                  truncate
                  text-xs
                  font-bold
                  text-white
                "
              >
                {name}
              </p>

              <div className="mt-0.5 flex items-center gap-1.5">

                <FiShield
                  size={10}
                  className="text-blue-400"
                />

                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                  "
                >
                  Administrator
                </span>

              </div>

            </div>

            {/* DROPDOWN */}

            <FiChevronDown
              size={14}
              className="
                hidden
                text-slate-500
                sm:block
              "
            />

          </div>

        </div>

      </div>
    </header>
  );
};

export default AdminTopbar;
