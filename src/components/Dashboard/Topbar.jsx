// src/components/Dashboard/Topbar.jsx

import { useEffect, useRef, useState } from "react";
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

  if (Number.isNaN(notificationDate.getTime())) {
    return "";
  }

  const now = new Date();

  const diff = Math.floor(
    (now - notificationDate) / 1000
  );

  if (diff < 0) {
    return "Just now";
  }

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
  // REFS
  // ======================================================

  const notificationRef = useRef(null);
  const dropdownRef = useRef(null);

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

  const [search, setSearch] = useState("");

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

      const response = await getNotifications();

      if (response?.success) {
        setNotifications(
          Array.isArray(response.notifications)
            ? response.notifications
            : []
        );

        setUnreadCount(
          Number(response.unreadCount || 0)
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
  // OUTSIDE CLICK + ESCAPE KEY
  // ======================================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setNotificationOpen(false);
        setDropdownOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setDropdownOpen(false);
    setNotificationOpen(false);

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
          current.map((notification) => ({
            ...notification,
            isRead: true,
          }))
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
        if (!notification?.isRead) {
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

        if (notification?.link) {
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
  // HANDLE SEARCH
  // ======================================================

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const value = search.trim();

    if (!value) {
      return;
    }

    // Keep search ready for future global search.
    // Currently no dedicated search route is forced.
    console.log("CampusHub Search:", value);
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
        min-h-[68px]
        w-full
        items-center
        justify-between
        gap-2
        border-b
        border-slate-800
        bg-slate-950/90
        px-3
        py-3
        backdrop-blur-xl
        sm:min-h-[73px]
        sm:gap-4
        sm:px-6
      "
    >
      {/* ==================================================
          LEFT SIDE
      ================================================== */}

      <div className="min-w-0 flex-1">
        <h1
          className="
            truncate
            text-sm
            font-semibold
            leading-5
            sm:text-xl
            sm:leading-normal
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
          gap-1.5
          sm:gap-3
        "
      >
        {/* ==================================================
            SEARCH
        ================================================== */}

        <form
          onSubmit={handleSearchSubmit}
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
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search CampusHub..."
            aria-label="Search CampusHub"
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
        </form>

        {/* ==================================================
            HOME
        ================================================== */}

        <button
          type="button"
          onClick={() => navigate("/")}
          aria-label="Go to Home"
          className="
            flex
            h-9
            w-9
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
            sm:h-10
            sm:w-10
          "
        >
          <Home size={18} />
        </button>

        {/* ==================================================
            NOTIFICATIONS
        ================================================== */}

        <div
          ref={notificationRef}
          className="relative"
        >
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
            aria-expanded={notificationOpen}
            className="
              relative
              flex
              h-9
              w-9
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
              sm:h-10
              sm:w-10
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
                  fixed
                  left-3
                  right-3
                  top-[68px]
                  z-50
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-800
                  bg-slate-900/95
                  shadow-2xl
                  shadow-black/40
                  backdrop-blur-xl
                  sm:absolute
                  sm:left-auto
                  sm:right-0
                  sm:top-auto
                  sm:mt-3
                  sm:w-[350px]
                "
              >
                {/* HEADER */}

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

                  {unreadCount > 0 &&
                    !notificationLoading && (
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

                {/* NOTIFICATION LIST */}

                <div
                  className="
                    max-h-[55vh]
                    overflow-y-auto
                    sm:max-h-[360px]
                  "
                >
                  {/* LOADING */}

                  {notificationLoading ? (
                    <div className="px-6 py-10 text-center">
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
                          {/* ICON */}

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

                          {/* CONTENT */}

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
                                {notification.title ||
                                  "CampusHub Update"}
                              </p>

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
                              {notification.message ||
                                "You have a new CampusHub update."}
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
                    /* EMPTY STATE */

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

                {/* FOOTER */}

                <button
                  type="button"
                  onClick={() => {
                    setNotificationOpen(false);
                    navigate("/notifications");
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

        <div
          ref={dropdownRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() => {
              setDropdownOpen(
                (open) => !open
              );

              setNotificationOpen(false);
            }}
            aria-label="Open user menu"
            aria-expanded={dropdownOpen}
            className="
              flex
              h-9
              items-center
              gap-1.5
              rounded-xl
              border
              border-slate-800
              bg-slate-900/70
              py-1
              pl-1
              pr-1.5
              transition
              duration-200
              hover:border-cyan-500/40
              sm:h-auto
              sm:gap-2
              sm:py-1.5
              sm:pl-1.5
              sm:pr-3
            "
          >
            {/* AVATAR */}

            <div
              className="
                flex
                h-7
                w-7
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
                  fixed
                  right-3
                  top-[68px]
                  z-50
                  w-[calc(100vw-1.5rem)]
                  max-w-[260px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-800
                  bg-slate-900/95
                  shadow-2xl
                  shadow-black/40
                  backdrop-blur-xl
                  sm:absolute
                  sm:right-0
                  sm:top-auto
                  sm:mt-3
                  sm:w-52
                "
              >
                {/* USER INFO */}

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

                {/* PROFILE */}

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

                {/* SETTINGS */}

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

                {/* LOGOUT */}

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
