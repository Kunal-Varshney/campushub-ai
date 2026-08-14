// src/components/Dashboard/Topbar.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  Home,
  LogOut,
  Sparkles,
  CheckCheck,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";


// ======================================================
// NOTIFICATIONS
// Temporary frontend data
// Later this will come from backend
// ======================================================

const initialNotifications = [
  {
    id: 1,
    title: "Complete your profile",
    message:
      "Add your academic details to improve your CampusHub AI experience.",
    time: "Today",
    unread: true,
  },

  {
    id: 2,
    title: "Keep your learning streak alive",
    message:
      "Spend some time learning today and keep building your consistency.",
    time: "Today",
    unread: true,
  },
];


// ======================================================
// TOPBAR
// ======================================================

function Topbar({ user }) {

  const navigate = useNavigate();


  // ------------------------------------------
  // UI STATES
  // ------------------------------------------

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [notifications, setNotifications] =
    useState(initialNotifications);


  // ------------------------------------------
  // CURRENT TIME GREETING
  // ------------------------------------------

  const getGreeting = () => {

    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    }

    if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    }

    if (hour >= 17 && hour < 21) {
      return "Good Evening";
    }

    return "Good Night";
  };


  const greeting = getGreeting();


  // ------------------------------------------
  // USER
  // ------------------------------------------

  const firstName =
    user?.name?.split(" ")[0] || "Student";

  const initial =
    user?.name?.charAt(0)?.toUpperCase() || "U";


  // ------------------------------------------
  // UNREAD NOTIFICATIONS
  // ------------------------------------------

  const unreadCount =
    notifications.filter(
      (notification) => notification.unread
    ).length;


  // ------------------------------------------
  // LOGOUT
  // ------------------------------------------

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  // ------------------------------------------
  // MARK ALL READ
  // ------------------------------------------

  const markAllRead = () => {

    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );

  };


  // ------------------------------------------
  // OPEN NOTIFICATION
  // ------------------------------------------

  const handleNotificationClick = (id) => {

    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification
      )
    );

  };


  return (

    <header
      className="
        sticky
        top-0
        z-30
        flex
        min-h-[73px]
        items-center
        justify-between
        gap-4
        border-b
        border-slate-800
        bg-slate-950/85
        px-4
        py-3
        backdrop-blur-xl
        sm:px-6
      "
    >


      {/* ==================================================
          LEFT SIDE
      ================================================== */}

      <div className="min-w-0">

        <h1
          className="
            truncate
            text-base
            font-semibold
            sm:text-xl
          "
        >

          {greeting},{" "}

          <span className="text-white">
            {firstName}
          </span>

          <span className="ml-1">
            👋
          </span>

        </h1>


        <p
          className="
            mt-0.5
            hidden
            text-sm
            text-gray-500
            sm:block
          "
        >
          Ready to move one step closer to your goals?
        </p>

      </div>



      {/* ==================================================
          RIGHT SIDE
      ================================================== */}

      <div
        className="
          flex
          shrink-0
          items-center
          gap-2
          sm:gap-3
        "
      >


        {/* ==================================================
            SEARCH
        ================================================== */}

        <div
          className="
            relative
            hidden
            w-full
            max-w-xs
            md:block
          "
        >

          <Search
            size={16}
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-500
            "
          />

          <input
            type="text"
            placeholder="Search CampusHub..."
            className="
              w-full
              rounded-xl
              border
              border-slate-800
              bg-slate-900/70
              py-2.5
              pl-9
              pr-4
              text-sm
              text-white
              placeholder-gray-600
              outline-none
              transition
              duration-300
              focus:border-cyan-500/50
              focus:bg-slate-900
            "
          />

        </div>



        {/* ==================================================
            HOME
        ================================================== */}

        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="Go to Home"
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-slate-800
            bg-slate-900/70
            text-gray-400
            transition
            duration-200
            hover:border-cyan-500/40
            hover:text-cyan-400
          "
        >

          <Home size={18} />

        </button>



        {/* ==================================================
            NOTIFICATIONS
        ================================================== */}

        <div className="relative">

          <button
            type="button"
            onClick={() => {

              setNotificationOpen(
                (open) => !open
              );

              setDropdownOpen(false);

            }}
            aria-label="Notifications"
            className="
              relative
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-slate-800
              bg-slate-900/70
              text-gray-400
              transition
              duration-200
              hover:border-cyan-500/40
              hover:text-cyan-400
            "
          >

            <Bell size={18} />


            {/* Unread indicator */}

            {unreadCount > 0 && (

              <>

                <span
                  className="
                    absolute
                    right-2
                    top-2
                    h-2
                    w-2
                    rounded-full
                    bg-cyan-400
                    shadow-lg
                    shadow-cyan-400/50
                  "
                />

              </>

            )}

          </button>



          {/* Notification Dropdown */}

          <AnimatePresence>

            {notificationOpen && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: -8,
                  scale: 0.97,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}

                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.97,
                }}

                transition={{
                  duration: 0.18,
                }}

                className="
                  absolute
                  right-0
                  z-50
                  mt-3
                  w-[calc(100vw-2rem)]
                  max-w-[350px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-800
                  bg-slate-900/95
                  shadow-2xl
                  shadow-black/40
                  backdrop-blur-xl
                "
              >


                {/* Notification Header */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-slate-800
                    px-4
                    py-3
                  "
                >

                  <div>

                    <h3 className="text-sm font-semibold">
                      Notifications
                    </h3>

                    <p className="mt-0.5 text-[11px] text-gray-600">
                      {unreadCount > 0
                        ? `${unreadCount} unread`
                        : "You're all caught up"}
                    </p>

                  </div>


                  {unreadCount > 0 && (

                    <button
                      type="button"
                      onClick={markAllRead}
                      className="
                        flex
                        items-center
                        gap-1
                        text-[11px]
                        font-medium
                        text-cyan-400
                        transition
                        hover:text-cyan-300
                      "
                    >

                      <CheckCheck size={13} />

                      Mark all read

                    </button>

                  )}

                </div>



                {/* Notification List */}

                <div
                  className="
                    max-h-[360px]
                    overflow-y-auto
                  "
                >

                  {notifications.length > 0 ? (

                    notifications.map(
                      (notification) => (

                        <button
                          key={notification.id}
                          type="button"
                          onClick={() =>
                            handleNotificationClick(
                              notification.id
                            )
                          }
                          className="
                            flex
                            w-full
                            gap-3
                            border-b
                            border-slate-800/70
                            px-4
                            py-4
                            text-left
                            transition
                            duration-200
                            hover:bg-slate-800/50
                          "
                        >

                          {/* Icon */}

                          <div
                            className="
                              mt-0.5
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-cyan-500/10
                              text-cyan-400
                            "
                          >

                            <Sparkles size={16} />

                          </div>


                          {/* Content */}

                          <div className="min-w-0 flex-1">

                            <div
                              className="
                                flex
                                items-start
                                justify-between
                                gap-2
                              "
                            >

                              <p
                                className={`
                                  text-sm
                                  ${
                                    notification.unread
                                      ? "font-semibold text-white"
                                      : "font-medium text-gray-400"
                                  }
                                `}
                              >
                                {notification.title}
                              </p>


                              {notification.unread && (

                                <span
                                  className="
                                    mt-1
                                    h-1.5
                                    w-1.5
                                    shrink-0
                                    rounded-full
                                    bg-cyan-400
                                  "
                                />

                              )}

                            </div>


                            <p
                              className="
                                mt-1
                                text-xs
                                leading-5
                                text-gray-500
                              "
                            >
                              {notification.message}
                            </p>


                            <p
                              className="
                                mt-1.5
                                text-[10px]
                                text-gray-600
                              "
                            >
                              {notification.time}
                            </p>

                          </div>

                        </button>

                      )
                    )

                  ) : (

                    <div
                      className="
                        px-6
                        py-10
                        text-center
                      "
                    >

                      <Bell
                        size={28}
                        className="mx-auto text-gray-700"
                      />

                      <p className="mt-3 text-sm font-medium">
                        You're all caught up
                      </p>

                      <p className="mt-1 text-xs text-gray-600">
                        No new notifications.
                      </p>

                    </div>

                  )}

                </div>



                {/* Notification Footer */}

                <button
                  type="button"
                  onClick={() => {
                    setNotificationOpen(false);
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    border-t
                    border-slate-800
                    px-4
                    py-3
                    text-xs
                    font-semibold
                    text-cyan-400
                    transition
                    hover:bg-slate-800/50
                  "
                >

                  View notification center

                </button>

              </motion.div>

            )}

          </AnimatePresence>

        </div>



        {/* ==================================================
            USER MENU
        ================================================== */}

        <div className="relative">

          <button
            type="button"
            onClick={() => {

              setDropdownOpen(
                (open) => !open
              );

              setNotificationOpen(false);

            }}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-800
              bg-slate-900/70
              py-1.5
              pl-1.5
              pr-2
              transition
              duration-200
              hover:border-cyan-500/40
              sm:pr-3
            "
          >

            {/* Avatar */}

            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                text-sm
                font-semibold
              "
            >

              {initial}

            </div>


            <ChevronDown
              size={14}
              className="
                hidden
                text-gray-500
                sm:block
              "
            />

          </button>



          {/* User Dropdown */}

          <AnimatePresence>

            {dropdownOpen && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: -8,
                  scale: 0.97,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}

                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.97,
                }}

                transition={{
                  duration: 0.18,
                }}

                className="
                  absolute
                  right-0
                  z-50
                  mt-3
                  w-52
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-800
                  bg-slate-900/95
                  shadow-2xl
                  shadow-black/40
                  backdrop-blur-xl
                "
              >


                {/* User Info */}

                <div
                  className="
                    border-b
                    border-slate-800
                    px-4
                    py-3
                  "
                >

                  <p className="truncate text-sm font-semibold text-white">
                    {user?.name || "Student"}
                  </p>

                  <p className="truncate text-xs text-gray-500">
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
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    text-gray-400
                    transition
                    hover:bg-slate-800
                    hover:text-white
                  "
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
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    px-4
                    py-3
                    text-sm
                    text-gray-400
                    transition
                    hover:bg-slate-800
                    hover:text-white
                  "
                >

                  <Settings size={16} />

                  Settings

                </button>



                {/* Logout */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    border-t
                    border-slate-800
                    px-4
                    py-3
                    text-sm
                    text-red-400
                    transition
                    hover:bg-red-500/10
                  "
                >

                  <LogOut size={16} />

                  Logout

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