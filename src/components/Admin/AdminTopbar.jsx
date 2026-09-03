import { useEffect, useRef, useState } from "react";

import {
  FiShield,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiCheck,
  FiClock,
  FiUserPlus,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../services/api";

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
  // LIVE STATUS
  // ============================================================

  const [isLive, setIsLive] = useState(false);
  const [checkingHealth, setCheckingHealth] = useState(true);

  // ============================================================
  // NOTIFICATIONS
  // ============================================================

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationOpen, setNotificationOpen] =
    useState(false);
  const [notificationLoading, setNotificationLoading] =
    useState(false);

  const notificationRef = useRef(null);

  // ============================================================
  // API ROOT
  // ============================================================

  const API_ROOT = (
    import.meta.env.VITE_API_URL ||
    "https://campushub-ai-um6d.onrender.com/api"
  ).replace(/\/api\/?$/, "");

  // ============================================================
  // CHECK BACKEND HEALTH
  // GET /healthz
  // ============================================================

  const checkBackendHealth = async () => {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 8000);

    try {
      setCheckingHealth(true);

      const response = await fetch(
        `${API_ROOT}/healthz`,
        {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        throw new Error(
          `Health check failed: ${response.status}`
        );
      }

      const data = await response.json();

      setIsLive(data?.status === "ok");
    } catch (error) {
      console.error(
        "Backend Health Check Error:",
        error
      );

      setIsLive(false);
    } finally {
      clearTimeout(timeout);
      setCheckingHealth(false);
    }
  };

  // ============================================================
  // FETCH NOTIFICATIONS
  // ============================================================

  const fetchNotifications = async (
    showLoading = false
  ) => {
    try {
      if (showLoading) {
        setNotificationLoading(true);
      }

      const response = await getNotifications();

      if (!response?.success) {
        return;
      }

      setNotifications(
        Array.isArray(response.notifications)
          ? response.notifications
          : []
      );

      setUnreadCount(
        Number(response.unreadCount || 0)
      );
    } catch (error) {
      console.error(
        "Notification Fetch Error:",
        error
      );
    } finally {
      if (showLoading) {
        setNotificationLoading(false);
      }
    }
  };

  // ============================================================
  // INITIAL HEALTH CHECK + POLLING
  // ============================================================

  useEffect(() => {
    checkBackendHealth();

    const healthInterval = setInterval(() => {
      checkBackendHealth();
    }, 30000);

    return () => {
      clearInterval(healthInterval);
    };
  }, []);

  // ============================================================
  // INITIAL NOTIFICATION LOAD + POLLING
  // ============================================================

  useEffect(() => {
    fetchNotifications();

    const notificationInterval =
      setInterval(() => {
        fetchNotifications();
      }, 30000);

    return () => {
      clearInterval(notificationInterval);
    };
  }, []);

  // ============================================================
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // ============================================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // ============================================================
  // TOGGLE NOTIFICATIONS
  // ============================================================

  const handleNotificationToggle = async () => {
    const nextState = !notificationOpen;

    setNotificationOpen(nextState);

    if (nextState) {
      await fetchNotifications(true);
    }
  };

  // ============================================================
  // MARK ONE AS READ
  // ============================================================

  const handleMarkRead = async (notification) => {
    if (!notification?._id) {
      return;
    }

    if (notification.isRead) {
      return;
    }

    try {
      const response =
        await markNotificationRead(
          notification._id
        );

      if (!response?.success) {
        return;
      }

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === notification._id
            ? {
                ...item,
                isRead: true,
              }
            : item
        )
      );

      setUnreadCount((prev) =>
        Math.max(0, prev - 1)
      );
    } catch (error) {
      console.error(
        "Mark Notification Read Error:",
        error
      );
    }
  };

  // ============================================================
  // MARK ALL AS READ
  // ============================================================

  const handleMarkAllRead = async () => {
    if (unreadCount === 0) {
      return;
    }

    try {
      const response =
        await markAllNotificationsRead();

      if (!response?.success) {
        return;
      }

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          isRead: true,
        }))
      );

      setUnreadCount(0);
    } catch (error) {
      console.error(
        "Mark All Notifications Error:",
        error
      );
    }
  };

  // ============================================================
  // NOTIFICATION ICON
  // ============================================================

  const getNotificationIcon = (type) => {
    switch (type) {
      case "profile":
        return <FiUserPlus size={16} />;

      case "achievement":
        return <FiCheck size={16} />;

      case "learning":
        return <FiClock size={16} />;

      case "ai":
        return <FiAlertCircle size={16} />;

      default:
        return <FiBell size={16} />;
    }
  };

  // ============================================================
  // TIME FORMAT
  // ============================================================

  const formatNotificationTime = (
    dateString
  ) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "";
    }

    const diff =
      Date.now() - date.getTime();

    const seconds = Math.floor(
      diff / 1000
    );

    const minutes = Math.floor(
      seconds / 60
    );

    const hours = Math.floor(
      minutes / 60
    );

    const days = Math.floor(
      hours / 24
    );

    if (seconds < 60) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes}m ago`;
    }

    if (hours < 24) {
      return `${hours}h ago`;
    }

    if (days < 7) {
      return `${days}d ago`;
    }

    return date.toLocaleDateString(
      "en-US",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

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
              if (
                typeof setMobileOpen ===
                "function"
              ) {
                setMobileOpen(
                  (prev) => !prev
                );
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

              {/* REAL LIVE STATUS */}

              <span
                className={`
                  hidden
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  px-2
                  py-1
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wider
                  md:inline-flex
                  ${
                    isLive
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                      : "border-red-500/20 bg-red-500/10 text-red-400"
                  }
                `}
              >
                <span
                  className={`
                    h-1.5
                    w-1.5
                    rounded-full
                    ${
                      checkingHealth
                        ? "animate-pulse bg-yellow-400"
                        : isLive
                        ? "animate-pulse bg-emerald-400"
                        : "bg-red-400"
                    }
                  `}
                />

                {checkingHealth
                  ? "Checking"
                  : isLive
                  ? "Live"
                  : "Offline"}
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

          <div className="hidden text-right lg:block">
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

          {/* ====================================================
              NOTIFICATION
          ==================================================== */}

          <div
            ref={notificationRef}
            className="relative"
          >
            <button
              type="button"
              onClick={
                handleNotificationToggle
              }
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
              aria-expanded={
                notificationOpen
              }
            >
              <FiBell size={18} />

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    -right-1
                    -top-1
                    flex
                    min-h-[18px]
                    min-w-[18px]
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-slate-950
                    bg-blue-500
                    px-1
                    text-[9px]
                    font-extrabold
                    text-white
                  "
                >
                  {unreadCount > 99
                    ? "99+"
                    : unreadCount}
                </span>
              )}
            </button>

            {/* ==================================================
                NOTIFICATION DROPDOWN
            ================================================== */}

            {notificationOpen && (
              <div
                className="
                  absolute
                  right-0
                  top-12
                  z-[100]
                  w-[calc(100vw-32px)]
                  max-w-[380px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-slate-950
                  shadow-2xl
                  shadow-black/40
                "
              >
                {/* HEADER */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/10
                    px-4
                    py-3
                  "
                >
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Notifications
                    </h3>

                    <p className="mt-0.5 text-[10px] text-slate-500">
                      {unreadCount > 0
                        ? `${unreadCount} unread notification${
                            unreadCount === 1
                              ? ""
                              : "s"
                          }`
                        : "You're all caught up"}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={
                          handleMarkAllRead
                        }
                        className="
                          rounded-lg
                          px-2
                          py-1.5
                          text-[10px]
                          font-semibold
                          text-blue-400
                          transition
                          hover:bg-blue-500/10
                          hover:text-blue-300
                        "
                      >
                        Mark all read
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setNotificationOpen(
                          false
                        )
                      }
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-lg
                        text-slate-500
                        transition
                        hover:bg-white/5
                        hover:text-white
                      "
                      aria-label="Close notifications"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="max-h-[420px] overflow-y-auto">
                  {notificationLoading ? (
                    <div className="flex min-h-[180px] items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-blue-400" />

                        <p className="text-xs text-slate-500">
                          Loading notifications...
                        </p>
                      </div>
                    </div>
                  ) : notifications.length ===
                    0 ? (
                    <div className="flex min-h-[180px] flex-col items-center justify-center px-6 text-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] text-slate-500">
                        <FiBell size={20} />
                      </div>

                      <p className="text-sm font-semibold text-slate-300">
                        No notifications
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        New platform activity will appear here.
                      </p>
                    </div>
                  ) : (
                    notifications.map(
                      (notification) => (
                        <button
                          type="button"
                          key={
                            notification._id
                          }
                          onClick={() =>
                            handleMarkRead(
                              notification
                            )
                          }
                          className={`
                            flex
                            w-full
                            items-start
                            gap-3
                            border-b
                            border-white/5
                            px-4
                            py-3
                            text-left
                            transition
                            last:border-b-0
                            hover:bg-white/[0.04]
                            ${
                              notification.isRead
                                ? "bg-transparent"
                                : "bg-blue-500/[0.045]"
                            }
                          `}
                        >
                          {/* ICON */}

                          <div
                            className={`
                              mt-0.5
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              ${
                                notification.isRead
                                  ? "bg-white/[0.04] text-slate-500"
                                  : "bg-blue-500/10 text-blue-400"
                              }
                            `}
                          >
                            {getNotificationIcon(
                              notification.type
                            )}
                          </div>

                          {/* TEXT */}

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p
                                className={`
                                  text-xs
                                  font-bold
                                  ${
                                    notification.isRead
                                      ? "text-slate-300"
                                      : "text-white"
                                  }
                                `}
                              >
                                {notification.title}
                              </p>

                              {!notification.isRead && (
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                              )}
                            </div>

                            <p className="mt-1 text-[11px] leading-5 text-slate-500">
                              {notification.message}
                            </p>

                            <p className="mt-1.5 text-[9px] font-medium text-slate-600">
                              {formatNotificationTime(
                                notification.createdAt
                              )}
                            </p>
                          </div>
                        </button>
                      )
                    )
                  )}
                </div>
              </div>
            )}
          </div>

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

            {/* DROPDOWN ICON */}

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
