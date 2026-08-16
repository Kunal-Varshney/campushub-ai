// src/components/Dashboard/Topbar.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../services/api";

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
// NOTIFICATION TIME FORMATTER
// ======================================================

const formatNotificationTime = (date) => {
  if (!date) return "";

  const notificationDate = new Date(date);
  const now = new Date();

  const diff = Math.floor(
    (now - notificationDate) / 1000
  );

  if (diff < 60) {
    return "Just now";
  }

  if (diff < 3600) {
    return `${Math.floor(diff / 60)}m ago`;
  }

  if (diff < 86400) {
    return `${Math.floor(diff / 3600)}h ago`;
  }

  if (diff < 172800) {
    return "Yesterday";
  }

  return notificationDate.toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
    }
  );
};


// ======================================================
// TOPBAR
// ======================================================

function Topbar({ user }) {

  const navigate = useNavigate();


  // ======================================================
  // UI STATES
  // ======================================================

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [notifications, setNotifications] =
    useState([]);

  const [unreadCount, setUnreadCount] =
    useState(0);

  const [notificationLoading, setNotificationLoading] =
    useState(false);


  // ======================================================
  // CURRENT TIME GREETING
  // ======================================================

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


  // ======================================================
  // USER
  // ======================================================

  const firstName =
    user?.name?.split(" ")[0] || "Student";

  const initial =
    user?.name?.charAt(0)?.toUpperCase() || "U";


  // ======================================================
  // LOAD NOTIFICATIONS
  // ======================================================

  const loadNotifications = async () => {

    try {

      setNotificationLoading(true);

      const response =
        await getNotifications();

      if (response?.success) {

        setNotifications(
          response.notifications || []
        );

        setUnreadCount(
          response.unreadCount || 0
        );

      }

    } catch (error) {

      console.error(
        "Failed to load notifications:",
        error
      );

    } finally {

      setNotificationLoading(false);

    }

  };


  // ======================================================
  // LOAD NOTIFICATIONS WHEN USER IS AVAILABLE
  // ======================================================

  useEffect(() => {

    if (user) {
      loadNotifications();
    }

  }, [user]);


  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };


  // ======================================================
  // MARK ALL NOTIFICATIONS AS READ
  // ======================================================

  const markAllRead = async () => {

    try {

      const response =
        await markAllNotificationsRead();

      if (response?.success) {

        setNotifications((current) =>
          current.map(
            (notification) => ({
              ...notification,
              isRead: true,
            })
          )
        );

        setUnreadCount(0);

      }

    } catch (error) {

      console.error(
        "Failed to mark all notifications:",
        error
      );

    }

  };


  // ======================================================
  // HANDLE NOTIFICATION CLICK
  // ======================================================

  const handleNotificationClick =
    async (notification) => {

      try {

        // ------------------------------------------
        // Mark notification as read
        // ------------------------------------------

        if (!notification.isRead) {

          const response =
            await markNotificationRead(
              notification._id
            );

          if (response?.success) {

            setNotifications((current) =>
              current.map((item) =>
                item._id === notification._id
                  ? {
                      ...item,
                      isRead: true,
                    }
                  : item
              )
            );

            setUnreadCount((count) =>
              Math.max(0, count - 1)
            );

          }

        }


        // ------------------------------------------
        // Navigate if notification has a link
        // ------------------------------------------

        if (notification.link) {

          setNotificationOpen(false);

          navigate(notification.link);

        }

      } catch (error) {

        console.error(
          "Failed to handle notification:",
          error
        );

      }

    };


  // ======================================================
  // RETURN
  // ======================================================

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
            onClick={async () => {

              const nextState =
                !notificationOpen;

              setNotificationOpen(nextState);
              setDropdownOpen(false);

              if (nextState) {
                await loadNotifications();
              }

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

            <Bell
              size={18}
              className={
                unreadCount > 0
                  ? "text-cyan-400"
                  : ""
              }
            />


            {/* ==================================================
                UNREAD INDICATOR
            ================================================== */}

            {unreadCount > 0 && (

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

            )}

          </button>


          {/* ==================================================
              NOTIFICATION DROPDOWN
          ================================================== */}

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


                {/* ==================================================
                    NOTIFICATION HEADER
                ================================================== */}

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

                      {notificationLoading
                        ? "Checking for updates..."
                        : unreadCount > 0
                        ? `${unreadCount} unread`
                        : "You're all caught up"}

                    </p>

                  </div>


                  {unreadCount > 0 && !notificationLoading && (

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


                {/* ==================================================
                    NOTIFICATION LIST
                ================================================== */}

                <div
                  className="
                    max-h-[360px]
                    overflow-y-auto
                  "
                >

                  {/* ==================================================
                      LOADING
                  ================================================== */}

                  {notificationLoading ? (

                    <div
                      className="
                        px-6
                        py-10
                        text-center
                      "
                    >

                      <div
                        className="
                          mx-auto
                          h-7
                          w-7
                          animate-spin
                          rounded-full
                          border-2
                          border-slate-700
                          border-t-cyan-400
                        "
                      />

                      <p
                        className="
                          mt-3
                          text-xs
                          text-gray-500
                        "
                      >
                        Loading notifications...
                      </p>

                    </div>

                  ) : notifications.length > 0 ? (

                    notifications.map(
                      (notification) => (

                        <button
                          key={notification._id}
                          type="button"
                          onClick={() =>
                            handleNotificationClick(
                              notification
                            )
                          }
                          className={`
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
                            ${
                              !notification.isRead
                                ? "bg-cyan-500/[0.03]"
                                : ""
                            }
                          `}
                        >


                          {/* ==================================================
                              NOTIFICATION ICON
                          ================================================== */}

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


                          {/* ==================================================
                              NOTIFICATION CONTENT
                          ================================================== */}

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
                                    !notification.isRead
                                      ? "font-semibold text-white"
                                      : "font-medium text-gray-400"
                                  }
                                `}
                              >
                                {notification.title}
                              </p>


                              {/* Unread dot */}

                              {!notification.isRead && (

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
                              {formatNotificationTime(
                                notification.createdAt
                              )}
                            </p>

                          </div>

                        </button>

                      )
                    )

                  ) : (

                    /* ==================================================
                       EMPTY STATE
                    ================================================== */

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

                      <p
                        className="
                          mt-3
                          text-sm
                          font-medium
                          text-gray-400
                        "
                      >
                        You're all caught up
                      </p>

                      <p
                        className="
                          mt-1
                          text-xs
                          text-gray-600
                        "
                      >
                        No new notifications.
                      </p>

                    </div>

                  )}

                </div>


                {/* ==================================================
                    NOTIFICATION FOOTER
                ================================================== */}

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


          {/* ==================================================
              USER DROPDOWN
          ================================================== */}

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


                {/* ==================================================
                    USER INFO
                ================================================== */}

                <div
                  className="
                    border-b
                    border-slate-800
                    px-4
                    py-3
                  "
                >

                  <p
                    className="
                      truncate
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    {user?.name || "Student"}
                  </p>

                  <p
                    className="
                      truncate
                      text-xs
                      text-gray-500
                    "
                  >
                    {user?.email || ""}
                  </p>

                </div>


                {/* ==================================================
                    PROFILE
                ================================================== */}

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


                {/* ==================================================
                    SETTINGS
                ================================================== */}

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


                {/* ==================================================
                    LOGOUT
                ================================================== */}

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
