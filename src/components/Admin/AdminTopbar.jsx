import {
  FiShield,
  FiZap,
} from "react-icons/fi";

const AdminTopbar = () => {
  // ============================================================
  // CURRENT ADMIN
  // ============================================================

  let user = {};

  try {
    user =
      JSON.parse(
        localStorage.getItem("user")
      ) || {};
  } catch (error) {
    console.error(
      "Failed to read admin user:",
      error
    );
  }

  const name =
    user.name || "Admin";

  const initial =
    name
      .charAt(0)
      .toUpperCase() || "A";

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <header
      className="
        sticky
        top-0
        z-30
        h-20
        border-b
        border-white/10
        bg-slate-950/80
        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          h-full
          items-center
          justify-between
          gap-3
          px-4
          sm:px-6
          lg:px-10
        "
      >

        {/* ====================================================
            LEFT
        ==================================================== */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
          "
        >

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
            "
          >
            <FiZap size={19} />
          </div>

          {/* BRAND */}

          <div className="min-w-0">

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <h1
                className="
                  truncate
                  text-base
                  font-bold
                  text-white
                  sm:text-lg
                "
              >
                CampusHub
                <span className="text-blue-400">
                  {" "}AI
                </span>
              </h1>

              {/* ADMIN BADGE */}

              <span
                className="
                  hidden
                  items-center
                  gap-1
                  rounded-full
                  border
                  border-purple-500/30
                  bg-purple-500/10
                  px-2
                  py-1
                  text-[10px]
                  font-semibold
                  text-purple-300
                  sm:flex
                "
              >
                <FiShield size={11} />

                Admin
              </span>

            </div>

            {/* SUBTITLE */}

            <p
              className="
                hidden
                text-xs
                text-slate-500
                sm:block
              "
            >
              Platform Management Console
            </p>

          </div>

        </div>

        {/* ====================================================
            RIGHT
        ==================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-3
            sm:gap-4
          "
        >

          {/* WELCOME TEXT */}

          <div
            className="
              hidden
              flex-col
              items-end
              md:flex
            "
          >

            <p
              className="
                max-w-[220px]
                truncate
                text-sm
                font-medium
                text-slate-300
              "
            >
              Welcome back, {name}
            </p>

            <p
              className="
                text-xs
                text-slate-500
              "
            >
              Admin Control Panel
            </p>

          </div>

          {/* PROFILE */}

          <div
            className="
              flex
              items-center
              gap-3
              border-l
              border-white/10
              pl-3
              sm:pl-4
            "
          >

            {/* AVATAR */}

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
                shadow-lg
                sm:h-11
                sm:w-11
              "
            >
              {initial}
            </div>

            {/* NAME */}

            <div className="hidden min-w-0 sm:block">

              <p
                className="
                  max-w-[120px]
                  truncate
                  text-sm
                  font-medium
                  text-white
                "
              >
                {name}
              </p>

              <span
                className="
                  inline-flex
                  rounded-full
                  border
                  border-blue-500/30
                  bg-blue-500/10
                  px-2
                  py-0.5
                  text-[10px]
                  font-semibold
                  text-blue-300
                "
              >
                Administrator
              </span>

            </div>

          </div>

        </div>

      </div>
    </header>
  );
};

export default AdminTopbar;