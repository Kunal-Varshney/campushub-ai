// src/Pages/Dashboard/NotificationCenter.jsx

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Bell,
  CheckCheck,
  Trash2,
  ArrowLeft,
  Sparkles,
  Clock,
  Loader2,
  Inbox,
} from "lucide-react";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "../../services/api";


// ============================================================
// FORMAT NOTIFICATION TIME
// ============================================================

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
      year: "numeric",
    }
  );
};


// ============================================================
// NOTIFICATION CENTER
// ============================================================

function NotificationCenter() {
  const navigate = useNavigate();

  // ============================================================
  // STATES
  // ============================================================

  const [notifications, setNotifications] = useState([]);

  const [unreadCount, setUnreadCount] = useState(0);

  const [loading, setLoading] = useState(true);

  const [actionLoading, setActionLoading] = useState(false);

  const [activeFilter, setActiveFilter] = useState("all");


  // ============================================================
  // LOAD NOTIFICATIONS
  // ============================================================

  const loadNotifications = async () => {
    try {
      setLoading(true);

      const response = await getNotifications();

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
      setLoading(false);
    }
  };


  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    loadNotifications();
  }, []);


  // ============================================================
  // FILTERED NOTIFICATIONS
  // ============================================================

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "unread") {
      return notifications.filter(
        (notification) => !notification.isRead
      );
    }

    if (activeFilter === "read") {
      return notifications.filter(
        (notification) => notification.isRead
      );
    }

    return notifications;
  }, [notifications, activeFilter]);


  // ============================================================
  // MARK ONE AS READ
  // ============================================================

  const handleNotificationClick = async (
    notification
  ) => {
    try {
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

      if (notification.link) {
        navigate(notification.link);
      }
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  };


  // ============================================================
  // MARK ALL AS READ
  // ============================================================

  const handleMarkAllRead = async () => {
    if (unreadCount === 0) return;

    try {
      setActionLoading(true);

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
        "Failed to mark all notifications as read:",
        error
      );
    } finally {
      setActionLoading(false);
    }
  };


  // ============================================================
  // DELETE NOTIFICATION
  // ============================================================

  const handleDelete = async (
    notificationId
  ) => {
    try {
      setActionLoading(true);

      const response =
        await deleteNotification(
          notificationId
        );

      if (response?.success) {
        const deletedNotification =
          notifications.find(
            (notification) =>
              notification._id === notificationId
          );

        setNotifications((current) =>
          current.filter(
            (notification) =>
              notification._id !== notificationId
          )
        );

        if (
          deletedNotification &&
          !deletedNotification.isRead
        ) {
          setUnreadCount((count) =>
            Math.max(0, count - 1)
          );
        }
      }
    } catch (error) {
      console.error(
        "Failed to delete notification:",
        error
      );
    } finally {
      setActionLoading(false);
    }
  };


  // ============================================================
  // NOTIFICATION ICON
  // ============================================================

  const getNotificationIcon = (type) => {
    switch (type) {
      case "ai":
        return <Sparkles size={18} />;

      case "achievement":
        return <Sparkles size={18} />;

      case "learning":
        return <Inbox size={18} />;

      case "internship":
        return <Bell size={18} />;

      case "roadmap":
        return <Inbox size={18} />;

      case "community":
        return <Bell size={18} />;

      default:
        return <Bell size={18} />;
    }
  };


  // ============================================================
  // RETURN
  // ============================================================

  return (
    <div
      className="
        min-h-screen
        bg-slate-950
        px-4
        py-6
        text-white
        sm:px-6
        lg:px-8
      "
    >

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div
        className="
          mx-auto
          max-w-5xl
        "
      >

        <div
          className="
            mb-6
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => navigate(-1)}
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
                bg-slate-900
                text-gray-400
                transition
                hover:border-cyan-500/40
                hover:text-cyan-400
              "
            >
              <ArrowLeft size={18} />
            </button>


            <div>

              <div className="flex items-center gap-2">

                <Bell
                  size={20}
                  className="text-cyan-400"
                />

                <h1
                  className="
                    text-xl
                    font-bold
                    sm:text-2xl
                  "
                >
                  Notification Center
                </h1>

              </div>

              <p
                className="
                  mt-1
                  text-xs
                  text-gray-500
                  sm:text-sm
                "
              >
                Stay updated with your CampusHub activity.
              </p>

            </div>

          </div>


          {unreadCount > 0 && (

            <button
              type="button"
              onClick={handleMarkAllRead}
              disabled={actionLoading}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-cyan-500/30
                bg-cyan-500/10
                px-4
                py-2.5
                text-xs
                font-semibold
                text-cyan-400
                transition
                hover:bg-cyan-500/15
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              {actionLoading ? (
                <Loader2
                  size={15}
                  className="animate-spin"
                />
              ) : (
                <CheckCheck size={15} />
              )}

              Mark all as read

            </button>

          )}

        </div>


        {/* ======================================================
            SUMMARY
        ====================================================== */}

        <div
          className="
            mb-6
            rounded-2xl
            border
            border-slate-800
            bg-slate-900/60
            p-4
            sm:p-5
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >

            <div>

              <p className="text-xs text-gray-500">
                Total notifications
              </p>

              <p
                className="
                  mt-1
                  text-2xl
                  font-bold
                  text-white
                "
              >
                {notifications.length}
              </p>

            </div>


            <div className="text-right">

              <p className="text-xs text-gray-500">
                Unread
              </p>

              <p
                className="
                  mt-1
                  text-2xl
                  font-bold
                  text-cyan-400
                "
              >
                {unreadCount}
              </p>

            </div>

          </div>

        </div>


        {/* ======================================================
            FILTERS
        ====================================================== */}

        <div
          className="
            mb-5
            flex
            gap-2
            overflow-x-auto
            pb-1
          "
        >

          {[
            {
              id: "all",
              label: "All",
            },
            {
              id: "unread",
              label: "Unread",
            },
            {
              id: "read",
              label: "Read",
            },
          ].map((filter) => (

            <button
              key={filter.id}
              type="button"
              onClick={() =>
                setActiveFilter(filter.id)
              }
              className={`
                shrink-0
                rounded-xl
                border
                px-4
                py-2
                text-xs
                font-medium
                transition
                ${
                  activeFilter === filter.id
                    ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
                    : "border-slate-800 bg-slate-900 text-gray-500 hover:text-gray-300"
                }
              `}
            >
              {filter.label}
            </button>

          ))}

        </div>


        {/* ======================================================
            NOTIFICATIONS
        ====================================================== */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-800
            bg-slate-900/60
          "
        >

          {loading ? (

            <div
              className="
                flex
                min-h-[300px]
                flex-col
                items-center
                justify-center
              "
            >

              <Loader2
                size={28}
                className="
                  animate-spin
                  text-cyan-400
                "
              />

              <p
                className="
                  mt-3
                  text-sm
                  text-gray-500
                "
              >
                Loading notifications...
              </p>

            </div>

          ) : filteredNotifications.length > 0 ? (

            filteredNotifications.map(
              (notification) => (

                <div
                  key={notification._id}
                  className={`
                    group
                    flex
                    gap-4
                    border-b
                    border-slate-800/70
                    p-4
                    transition
                    sm:p-5
                    ${
                      !notification.isRead
                        ? "bg-cyan-500/[0.025]"
                        : "bg-transparent"
                    }
                    hover:bg-slate-800/40
                  `}
                >

                  {/* ICON */}

                  <button
                    type="button"
                    onClick={() =>
                      handleNotificationClick(
                        notification
                      )
                    }
                    className="
                      mt-0.5
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-cyan-500/10
                      text-cyan-400
                    "
                  >
                    {getNotificationIcon(
                      notification.type
                    )}
                  </button>


                  {/* CONTENT */}

                  <button
                    type="button"
                    onClick={() =>
                      handleNotificationClick(
                        notification
                      )
                    }
                    className="
                      min-w-0
                      flex-1
                      text-left
                    "
                  >

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-3
                      "
                    >

                      <div className="min-w-0">

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <h3
                            className={`
                              truncate
                              text-sm
                              sm:text-base
                              ${
                                notification.isRead
                                  ? "font-medium text-gray-300"
                                  : "font-semibold text-white"
                              }
                            `}
                          >
                            {notification.title}
                          </h3>


                          {!notification.isRead && (

                            <span
                              className="
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
                            mt-1.5
                            text-xs
                            leading-5
                            text-gray-500
                            sm:text-sm
                          "
                        >
                          {notification.message}
                        </p>

                      </div>


                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDelete(
                            notification._id
                          );
                        }}
                        disabled={actionLoading}
                        aria-label="Delete notification"
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          text-gray-600
                          opacity-100
                          transition
                          hover:bg-red-500/10
                          hover:text-red-400
                          disabled:opacity-40
                          sm:opacity-0
                          sm:group-hover:opacity-100
                        "
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>


                    <div
                      className="
                        mt-3
                        flex
                        items-center
                        gap-2
                        text-[10px]
                        text-gray-600
                        sm:text-xs
                      "
                    >

                      <Clock size={12} />

                      {formatNotificationTime(
                        notification.createdAt
                      )}

                    </div>

                  </button>

                </div>

              )
            )

          ) : (

            <div
              className="
                flex
                min-h-[320px]
                flex-col
                items-center
                justify-center
                px-6
                text-center
              "
            >

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-slate-800
                  text-gray-600
                "
              >
                <Bell size={25} />
              </div>


              <h3
                className="
                  mt-4
                  text-sm
                  font-semibold
                  text-gray-300
                "
              >
                No notifications
              </h3>


              <p
                className="
                  mt-1
                  max-w-sm
                  text-xs
                  leading-5
                  text-gray-600
                "
              >
                {activeFilter === "unread"
                  ? "You don't have any unread notifications."
                  : activeFilter === "read"
                  ? "You don't have any read notifications."
                  : "You're all caught up. New updates will appear here."}
              </p>

            </div>

          )}

        </div>


        {/* ======================================================
            FOOTER INFO
        ====================================================== */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-center
            gap-2
            text-[10px]
            text-gray-600
          "
        >

          <Clock size={12} />

          Notifications are synced with your CampusHub account.

        </div>

      </div>

    </div>
  );
}


export default NotificationCenter;
