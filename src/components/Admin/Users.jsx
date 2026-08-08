import { useState, useEffect, useCallback } from "react";
import {
  FiSearch,
  FiX,
  FiActivity,
  FiDownload,
  FiMessageSquare,
} from "react-icons/fi";

import UsersTable from "../../components/Admin/UsersTable";

import {
  getUsers,
  blockUser,
  unblockUser,
  deleteUser,
  getUserActivity,
} from "../../services/adminService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const [activityModal, setActivityModal] = useState(null);
  const [activityLoading, setActivityLoading] = useState(false);

  const showToast = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    const res = await getUsers({
      search,
      role,
      status,
    });

    if (res?.success) {
      setUsers(res.users || []);
      setTotalUsers(
        res.totalUsers ?? (res.users?.length || 0)
      );
    } else {
      setError(res?.message || "Failed to load users");
    }

    setLoading(false);
  }, [search, role, status]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 350);

    return () => clearTimeout(timer);
  }, [fetchUsers]);

  const handleBlock = async (user) => {
    const res = await blockUser(user._id);

    if (res?.success) {
      showToast(`${user.name} has been blocked`);
      fetchUsers();
    } else {
      showToast(res?.message || "Failed to block user");
    }
  };

  const handleUnblock = async (user) => {
    const res = await unblockUser(user._id);

    if (res?.success) {
      showToast(`${user.name} has been unblocked`);
      fetchUsers();
    } else {
      showToast(res?.message || "Failed to unblock user");
    }
  };

  const handleDelete = async (user) => {
    if (
      !window.confirm(
        `Delete ${user.name}? This cannot be undone.`
      )
    ) {
      return;
    }

    const res = await deleteUser(user._id);

    if (res?.success) {
      showToast(`${user.name} was deleted`);
      fetchUsers();
    } else {
      showToast(res?.message || "Failed to delete user");
    }
  };

  const handleViewActivity = async (user) => {
    setActivityLoading(true);

    setActivityModal({
      user,
      activity: null,
    });

    const res = await getUserActivity(user._id);

    setActivityLoading(false);

    if (res?.success) {
      setActivityModal({
        user,
        activity: res.activity,
      });
    } else {
      showToast(
        res?.message || "Failed to load activity"
      );

      setActivityModal(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="relative z-10 mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            User Management
          </h1>

          <p className="mt-1 text-sm text-slate-400 sm:text-base">
            {totalUsers} registered user
            {totalUsers === 1 ? "" : "s"} on the platform
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3">

          {/* Search */}
          <div className="flex min-w-[220px] flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <FiSearch className="shrink-0 text-slate-400" />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search by name or email..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          {/* Role */}
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50"
          >
            <option
              value=""
              className="bg-slate-900"
            >
              All roles
            </option>

            <option
              value="student"
              className="bg-slate-900"
            >
              Student
            </option>

            <option
              value="moderator"
              className="bg-slate-900"
            >
              Moderator
            </option>

            <option
              value="admin"
              className="bg-slate-900"
            >
              Admin
            </option>
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50"
          >
            <option
              value=""
              className="bg-slate-900"
            >
              All statuses
            </option>

            <option
              value="active"
              className="bg-slate-900"
            >
              Active
            </option>

            <option
              value="blocked"
              className="bg-slate-900"
            >
              Blocked
            </option>
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300 backdrop-blur-xl">
            {error}
          </div>
        )}

        {/* Users Table */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map(
              (_, i) => (
                <div
                  key={i}
                  className="h-14 animate-pulse rounded-xl bg-white/5"
                />
              )
            )}
          </div>
        ) : (
          <UsersTable
            users={users}
            onBlock={handleBlock}
            onUnblock={handleUnblock}
            onDelete={handleDelete}
            onViewActivity={
              handleViewActivity
            }
          />
        )}
      </main>

      {/* Activity Modal */}
      {activityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() =>
              setActivityModal(null)
            }
          />

          <div className="relative w-full max-w-md overflow-hidden rounded-3xl p-[1px]">

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/40 via-purple-500/30 to-cyan-400/40" />

            <div className="relative rounded-3xl border border-white/10 bg-slate-900/95 p-6 backdrop-blur-xl">

              {/* Modal Header */}
              <div className="mb-5 flex items-center justify-between">

                <h3 className="text-base font-semibold text-white">
                  {activityModal.user.name}
                  's Activity
                </h3>

                <button
                  onClick={() =>
                    setActivityModal(null)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                >
                  <FiX className="text-lg" />
                </button>

              </div>

              {/* Loading */}
              {activityLoading ||
              !activityModal.activity ? (
                <div className="space-y-3">
                  {Array.from({
                    length: 3,
                  }).map((_, i) => (
                    <div
                      key={i}
                      className="h-12 animate-pulse rounded-xl bg-white/5"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-blue-300">
                        <FiDownload />
                        Downloads
                      </div>

                      <p className="text-xl font-bold text-white">
                        {
                          activityModal
                            .activity
                            .downloadCount
                        }
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-purple-300">
                        <FiMessageSquare />
                        AI Queries
                      </div>

                      <p className="text-xl font-bold text-white">
                        {
                          activityModal
                            .activity
                            .aiQueryCount
                        }
                      </p>
                    </div>

                  </div>

                  {/* Recent Downloads */}
                  {activityModal.activity
                    .recentDownloads
                    ?.length > 0 && (
                    <div>
                      <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                        <FiActivity />
                        Recent downloads
                      </p>

                      <div className="space-y-1.5">
                        {activityModal.activity.recentDownloads.map(
                          (download, i) => (
                            <p
                              key={i}
                              className="truncate text-xs text-slate-300"
                            >
                              {
                                download.noteTitle
                              }
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {message && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative overflow-hidden rounded-xl p-[1px] shadow-2xl shadow-black/40">

            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500" />

            <div className="relative min-w-[240px] rounded-xl bg-slate-900/90 px-5 py-3.5 backdrop-blur-xl">
              <span className="text-sm font-medium text-white">
                {message}
              </span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Users;