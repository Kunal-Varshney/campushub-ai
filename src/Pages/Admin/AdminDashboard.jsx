import { useState, useEffect } from "react";

import AdminTopbar from "../../components/Admin/AdminTopbar";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminStatsCard from "../../components/Admin/AdminStatsCard";
import UsersTable from "../../components/Admin/UsersTable";

import AdminNotes from "../../components/Admin/AdminNotes";
import AdminAnalytics from "../../components/Admin/AdminAnalytics";
import AdminSettings from "../../components/Admin/AdminSettings";

import {
  getAdminStats,
  getUsers,
  getUserById,
  getUserActivity,
  blockUser,
  unblockUser,
  deleteUser,
} from "../../services/adminService";

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
} from "react-icons/fi";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [stats, setStats] = useState({
    totalUsers: 0,
    students: 0,
    admins: 0,
    totalNotes: 0,
  });

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // USER DETAILS MODAL
  // ============================================================

  const [selectedUser, setSelectedUser] = useState(null);
  const [userActivity, setUserActivity] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // ============================================================
  // FETCH ADMIN DATA
  // ============================================================

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [statsRes, usersRes] = await Promise.all([
        getAdminStats(),
        getUsers(),
      ]);

      if (statsRes?.success) {
        setStats(statsRes.stats);
      }

      if (usersRes?.success) {
        setUsers(usersRes.users || []);
      }
    } catch (err) {
      console.error("Admin Error:", err);

      setError("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    fetchData();
  }, []);

  // ============================================================
  // VIEW USER DETAILS
  // ============================================================

  const handleViewActivity = async (user) => {
    if (!user?._id) {
      console.error("User ID missing");
      return;
    }

    try {
      setDetailsLoading(true);

      // Open modal immediately with table data
      setSelectedUser(user);
      setUserActivity(null);

      // Fetch complete user details + activity
      const [userResponse, activityResponse] =
        await Promise.all([
          getUserById(user._id),
          getUserActivity(user._id),
        ]);

      if (userResponse?.success && userResponse.user) {
        setSelectedUser(userResponse.user);
      }

      if (
        activityResponse?.success &&
        activityResponse.activity
      ) {
        setUserActivity(activityResponse.activity);
      }
    } catch (err) {
      console.error("View User Details Error:", err);

      alert("Failed to load user details");
    } finally {
      setDetailsLoading(false);
    }
  };

  // ============================================================
  // CLOSE USER DETAILS
  // ============================================================

  const closeUserDetails = () => {
    setSelectedUser(null);
    setUserActivity(null);
  };

  // ============================================================
  // BLOCK USER
  // ============================================================

  const handleBlock = async (user) => {
    if (!user?._id) {
      console.error("User ID missing");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to block ${
        user.name || "this user"
      }?`
    );

    if (!confirmed) return;

    try {
      const response = await blockUser(user._id);

      if (!response?.success) {
        alert(
          response?.message ||
            "Failed to block user"
        );
        return;
      }

      setUsers((prevUsers) =>
        prevUsers.map((item) =>
          item._id === user._id
            ? {
                ...item,
                isBlocked: true,
              }
            : item
        )
      );

      setSelectedUser((prev) =>
        prev?._id === user._id
          ? {
              ...prev,
              isBlocked: true,
            }
          : prev
      );

      alert("User blocked successfully");
    } catch (err) {
      console.error("Block User Error:", err);

      alert("Failed to block user");
    }
  };

  // ============================================================
  // UNBLOCK USER
  // ============================================================

  const handleUnblock = async (user) => {
    if (!user?._id) {
      console.error("User ID missing");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to unblock ${
        user.name || "this user"
      }?`
    );

    if (!confirmed) return;

    try {
      const response = await unblockUser(user._id);

      if (!response?.success) {
        alert(
          response?.message ||
            "Failed to unblock user"
        );
        return;
      }

      setUsers((prevUsers) =>
        prevUsers.map((item) =>
          item._id === user._id
            ? {
                ...item,
                isBlocked: false,
              }
            : item
        )
      );

      setSelectedUser((prev) =>
        prev?._id === user._id
          ? {
              ...prev,
              isBlocked: false,
            }
          : prev
      );

      alert("User unblocked successfully");
    } catch (err) {
      console.error(
        "Unblock User Error:",
        err
      );

      alert("Failed to unblock user");
    }
  };

  // ============================================================
  // DELETE USER
  // ============================================================

  const handleDelete = async (user) => {
    if (!user?._id) {
      console.error("User ID missing");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to permanently delete ${
        user.name || "this user"
      }?`
    );

    if (!confirmed) return;

    try {
      const response = await deleteUser(user._id);

      if (!response?.success) {
        alert(
          response?.message ||
            "Failed to delete user"
        );
        return;
      }

      setUsers((prevUsers) =>
        prevUsers.filter(
          (item) => item._id !== user._id
        )
      );

      setStats((prev) => ({
        ...prev,

        totalUsers: Math.max(
          0,
          prev.totalUsers - 1
        ),

        students:
          user.role?.toLowerCase() ===
          "student"
            ? Math.max(
                0,
                prev.students - 1
              )
            : prev.students,

        admins:
          user.role?.toLowerCase() ===
            "admin" ||
          user.role?.toLowerCase() ===
            "moderator"
            ? Math.max(
                0,
                prev.admins - 1
              )
            : prev.admins,
      }));

      closeUserDetails();

      alert("User deleted successfully");
    } catch (err) {
      console.error(
        "Delete User Error:",
        err
      );

      alert("Failed to delete user");
    }
  };

  // ============================================================
  // FORMAT DATE
  // ============================================================

  const formatDate = (dateString) => {
    if (!dateString) return "—";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "—";
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
  // FORMAT DATE + TIME
  // ============================================================

  const formatDateTime = (dateString) => {
    if (!dateString) return "—";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleString(
      "en-US",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // ============================================================
  // STATS
  // ============================================================

  const statCards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: FiUsers,
      gradient:
        "from-blue-500 to-cyan-400",
    },

    {
      label: "Students",
      value: stats.students,
      icon: FiUserCheck,
      gradient:
        "from-emerald-500 to-teal-400",
    },

    {
      label: "Admins",
      value: stats.admins,
      icon: FiShield,
      gradient:
        "from-purple-500 to-fuchsia-400",
    },

    {
      label: "Total Notes",
      value: stats.totalNotes,
      icon: FiFileText,
      gradient:
        "from-orange-500 to-amber-400",
    },
  ];

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">

      <AdminSidebar
        active={activeTab}
        setActive={setActiveTab}
      />

      <div className="min-w-0 lg:ml-64">
        <AdminTopbar />

        <main className="p-4 sm:p-6 lg:p-10">

          {/* ERROR */}

          {error && (
            <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
              {error}
            </div>
          )}

          {/* ==================================================
              DASHBOARD
          ================================================== */}

          {activeTab === "dashboard" && (
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Admin Dashboard
              </h1>

              <p className="mb-6 mt-2 text-sm text-slate-400 sm:mb-8 sm:text-base">
                CampusHub AI platform overview
              </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
                {statCards.map((card) => (
                  <AdminStatsCard
                    key={card.label}
                    label={card.label}
                    value={
                      loading
                        ? "..."
                        : card.value
                    }
                    icon={card.icon}
                    gradient={
                      card.gradient
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* ==================================================
              USERS
          ================================================== */}

          {activeTab === "users" && (
            <div>
              <h1 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">
                Users Management
              </h1>

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl sm:p-5 lg:p-6">

                {loading ? (
                  <p className="text-slate-400">
                    Loading users...
                  </p>
                ) : (
                  <UsersTable
                    users={users}
                    onViewActivity={
                      handleViewActivity
                    }
                    onBlock={
                      handleBlock
                    }
                    onUnblock={
                      handleUnblock
                    }
                    onDelete={
                      handleDelete
                    }
                  />
                )}

              </div>
            </div>
          )}

          {/* ==================================================
              NOTES
          ================================================== */}

          {activeTab === "notes" && (
            <AdminNotes />
          )}

          {/* ==================================================
              ANALYTICS
          ================================================== */}

          {activeTab === "analytics" && (
            <AdminAnalytics />
          )}

          {/* ==================================================
              SETTINGS
          ================================================== */}

          {activeTab === "settings" && (
            <AdminSettings />
          )}

        </main>
      </div>

      {/* ======================================================
          USER DETAILS MODAL
      ====================================================== */}

      {selectedUser && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-2 backdrop-blur-md sm:items-center sm:p-4"
          onClick={closeUserDetails}
        >
          <div
            className="max-h-[96vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-white/10 bg-slate-950 shadow-2xl sm:max-h-[92vh] sm:rounded-3xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur-xl sm:px-6 sm:py-5">

              <div>
                <h2 className="text-xl font-bold text-white">
                  User Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Complete account information
                  and activity
                </p>
              </div>

              <button
                type="button"
                onClick={
                  closeUserDetails
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <FiX />
              </button>

            </div>

            {/* LOADING */}

            {detailsLoading ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-blue-400" />

                  <p className="text-sm text-slate-400">
                    Loading complete user
                    details...
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-5 p-4 sm:space-y-6 sm:p-6">

                {/* ==================================================
                    PROFILE HEADER
                ================================================== */}

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-4">

                      {selectedUser.avatar ? (
                        <img
                          src={
                            selectedUser.avatar
                          }
                          alt={
                            selectedUser.name ||
                            "User"
                          }
                          className="h-20 w-20 rounded-2xl border border-white/10 object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500/10 text-3xl font-bold text-blue-300">
                          {selectedUser.name
                            ?.charAt(0)
                            ?.toUpperCase() ||
                            "?"}
                        </div>
                      )}

                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {selectedUser.name ||
                            "Unnamed User"}
                        </h3>

                        <p className="mt-1 text-sm text-slate-400">
                          {selectedUser.email ||
                            "—"}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">

                          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                            {(
                              selectedUser.role ||
                              "student"
                            )
                              .charAt(0)
                              .toUpperCase() +
                              (
                                selectedUser.role ||
                                "student"
                              ).slice(1)}
                          </span>

                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                              selectedUser.isBlocked
                                ? "border-red-500/30 bg-red-500/10 text-red-300"
                                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                            }`}
                          >
                            {selectedUser.isBlocked
                              ? "Blocked"
                              : "Active"}
                          </span>

                        </div>
                      </div>

                    </div>

                    {/* QUICK ACTION */}

                    <div className="flex w-full flex-wrap gap-2 sm:w-auto">

                      {selectedUser.isBlocked ? (
                        <button
                          type="button"
                          onClick={() =>
                            handleUnblock(
                              selectedUser
                            )
                          }
                          className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            handleBlock(
                              selectedUser
                            )
                          }
                          className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20"
                        >
                          Block
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            selectedUser
                          )
                        }
                        className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                </div>

                {/* ==================================================
                    ACCOUNT INFORMATION
                ================================================== */}

                <div>
                  <h3 className="mb-3 text-lg font-semibold">
                    Account Information
                  </h3>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                    <DetailCard
                      icon={FiUser}
                      label="Full Name"
                      value={
                        selectedUser.name ||
                        "—"
                      }
                    />

                    <DetailCard
                      icon={FiMail}
                      label="Email Address"
                      value={
                        selectedUser.email ||
                        "—"
                      }
                    />

                    <DetailCard
                      icon={FiShield}
                      label="Role"
                      value={
                        selectedUser.role ||
                        "student"
                      }
                    />

                    <DetailCard
                      icon={FiShieldOff}
                      label="Account Status"
                      value={
                        selectedUser.isBlocked
                          ? "Blocked"
                          : "Active"
                      }
                    />

                    <DetailCard
                      icon={FiBookOpen}
                      label="College"
                      value={
                        selectedUser.college ||
                        "Not provided"
                      }
                    />

                    <DetailCard
                      icon={FiBookOpen}
                      label="Branch"
                      value={
                        selectedUser.branch ||
                        "Not provided"
                      }
                    />

                    <DetailCard
                      icon={FiCalendar}
                      label="Year"
                      value={
                        selectedUser.year ||
                        "Not provided"
                      }
                    />

                    <DetailCard
                      icon={FiCalendar}
                      label="Joined"
                      value={formatDate(
                        selectedUser.createdAt
                      )}
                    />

                    <DetailCard
                      icon={FiClock}
                      label="Last Updated"
                      value={formatDateTime(
                        selectedUser.updatedAt
                      )}
                    />

                    <DetailCard
                      icon={FiUser}
                      label="User ID"
                      value={
                        selectedUser._id ||
                        "—"
                      }
                    />

                  </div>
                </div>

                {/* ==================================================
                    PERMISSIONS
                ================================================== */}

                <div>
                  <h3 className="mb-3 text-lg font-semibold">
                    Permissions
                  </h3>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                    <PermissionCard
                      label="Manage Users"
                      enabled={
                        selectedUser
                          .permissions
                          ?.manageUsers
                      }
                    />

                    <PermissionCard
                      label="Manage Notes"
                      enabled={
                        selectedUser
                          .permissions
                          ?.manageNotes
                      }
                    />

                    <PermissionCard
                      label="View Analytics"
                      enabled={
                        selectedUser
                          .permissions
                          ?.viewAnalytics
                      }
                    />

                  </div>
                </div>

                {/* ==================================================
                    ACTIVITY STATS
                ================================================== */}

                <div>
                  <h3 className="mb-3 text-lg font-semibold">
                    Activity Overview
                  </h3>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <ActivityCard
                      icon={FiDownload}
                      label="Total Downloads"
                      value={
                        userActivity
                          ?.downloadCount ??
                        0
                      }
                    />

                    <ActivityCard
                      icon={
                        FiMessageSquare
                      }
                      label="AI Queries"
                      value={
                        userActivity
                          ?.aiQueryCount ??
                        0
                      }
                    />

                  </div>
                </div>

                {/* ==================================================
                    RECENT DOWNLOADS
                ================================================== */}

                <div>
                  <h3 className="mb-3 text-lg font-semibold">
                    Recent Downloads
                  </h3>

                  {userActivity
                    ?.recentDownloads
                    ?.length > 0 ? (
                    <div className="overflow-hidden rounded-2xl border border-white/10">

                      {userActivity.recentDownloads.map(
                        (download, index) => (
                          <div
                            key={
                              download._id ||
                              index
                            }
                            className="flex items-center justify-between gap-4 border-b border-white/5 p-4 last:border-b-0"
                          >
                            <div className="flex min-w-0 items-center gap-3">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                                <FiDownload />
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-white">
                                  {download.noteTitle ||
                                    "Untitled Note"}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                  {download.category ||
                                    "General"}
                                </p>
                              </div>

                            </div>

                            <span className="shrink-0 text-xs text-slate-500">
                              {formatDateTime(
                                download.downloadedAt
                              )}
                            </span>
                          </div>
                        )
                      )}

                    </div>
                  ) : (
                    <EmptyActivity text="No downloads found" />
                  )}
                </div>

                {/* ==================================================
                    RECENT AI QUERIES
                ================================================== */}

                <div>
                  <h3 className="mb-3 text-lg font-semibold">
                    Recent AI Queries
                  </h3>

                  {userActivity
                    ?.recentQueries
                    ?.length > 0 ? (
                    <div className="overflow-hidden rounded-2xl border border-white/10">

                      {userActivity.recentQueries.map(
                        (query, index) => (
                          <div
                            key={
                              query._id ||
                              index
                            }
                            className="border-b border-white/5 p-4 last:border-b-0"
                          >

                            <div className="flex items-start gap-3">

                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300">
                                <FiMessageSquare />
                              </div>

                              <div className="min-w-0 flex-1">

                                <p className="text-sm leading-6 text-slate-200">
                                  {query.question ||
                                    "No question available"}
                                </p>

                                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">

                                  <span>
                                    Category:{" "}
                                    {query.category ||
                                      "General"}
                                  </span>

                                  <span>
                                    {formatDateTime(
                                      query.createdAt
                                    )}
                                  </span>

                                </div>

                              </div>

                            </div>

                          </div>
                        )
                      )}

                    </div>
                  ) : (
                    <EmptyActivity text="No AI queries found" />
                  )}
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

// ============================================================
// DETAIL CARD
// ============================================================

const DetailCard = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">

      <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
        <Icon className="text-blue-400" />
        <span>{label}</span>
      </div>

      <p className="break-all text-sm font-medium text-slate-200">
        {value}
      </p>

    </div>
  );
};

// ============================================================
// PERMISSION CARD
// ============================================================

const PermissionCard = ({
  label,
  enabled,
}) => {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        enabled
          ? "border-emerald-500/20 bg-emerald-500/10"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="flex items-center justify-between">

        <span className="text-sm text-slate-300">
          {label}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            enabled
              ? "bg-emerald-500/10 text-emerald-300"
              : "bg-slate-500/10 text-slate-500"
          }`}
        >
          {enabled
            ? "Enabled"
            : "Disabled"}
        </span>

      </div>
    </div>
  );
};

// ============================================================
// ACTIVITY CARD
// ============================================================

const ActivityCard = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {value}
          </p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-xl text-blue-300">
          <Icon />
        </div>

      </div>

    </div>
  );
};

// ============================================================
// EMPTY ACTIVITY
// ============================================================

const EmptyActivity = ({ text }) => {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">

      <FiActivity className="mx-auto mb-3 text-2xl text-slate-600" />

      <p className="text-sm text-slate-500">
        {text}
      </p>

    </div>
  );
};

export default AdminDashboard;
