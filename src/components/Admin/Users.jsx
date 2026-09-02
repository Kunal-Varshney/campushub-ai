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
  // ============================================================
  // STATE
  // ============================================================

  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(100);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  // Activity modal
  const [activityModal, setActivityModal] = useState(null);
  const [activityLoading, setActivityLoading] = useState(false);

  // ============================================================
  // PAGINATION CALCULATION
  // ============================================================

  const totalPages = Math.max(
    1,
    Math.ceil(totalUsers / limit)
  );

  // ============================================================
  // TOAST
  // ============================================================

  const showToast = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // ============================================================
  // FETCH USERS
  // ============================================================

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getUsers({
        search,
        role,
        status,
        page,
        limit,
      });

      if (res?.success) {
        setUsers(res.users || []);

        setTotalUsers(
          res.totalUsers ?? (res.users?.length || 0)
        );
      } else {
        setUsers([]);
        setTotalUsers(0);

        setError(
          res?.message || "Failed to load users"
        );
      }
    } catch (error) {
      console.error("Fetch Users Error:", error);

      setUsers([]);
      setTotalUsers(0);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  }, [search, role, status, page, limit]);

  // ============================================================
  // AUTO FETCH
  // ============================================================

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 350);

    return () => clearTimeout(timer);
  }, [fetchUsers]);

  // ============================================================
  // RESET PAGINATION WHEN FILTERS CHANGE
  // ============================================================

  useEffect(() => {
    setPage(1);
  }, [search, role, status]);

  // ============================================================
  // KEEP PAGE VALID AFTER USER COUNT CHANGES
  // ============================================================

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // ============================================================
  // BLOCK USER
  // ============================================================

  const handleBlock = async (user) => {
    try {
      const res = await blockUser(user._id);

      if (res?.success) {
        showToast(`${user.name} has been blocked`);

        await fetchUsers();
      } else {
        showToast(
          res?.message || "Failed to block user"
        );
      }
    } catch (error) {
      console.error("Block User Error:", error);

      showToast("Failed to block user");
    }
  };

  // ============================================================
  // UNBLOCK USER
  // ============================================================

  const handleUnblock = async (user) => {
    try {
      const res = await unblockUser(user._id);

      if (res?.success) {
        showToast(`${user.name} has been unblocked`);

        await fetchUsers();
      } else {
        showToast(
          res?.message || "Failed to unblock user"
        );
      }
    } catch (error) {
      console.error("Unblock User Error:", error);

      showToast("Failed to unblock user");
    }
  };

  // ============================================================
  // DELETE USER
  // ============================================================

  const handleDelete = async (user) => {
    const confirmed = window.confirm(
      `Delete ${user.name}? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      const res = await deleteUser(user._id);

      if (res?.success) {
        showToast(`${user.name} was deleted`);

        await fetchUsers();
      } else {
        showToast(
          res?.message || "Failed to delete user"
        );
      }
    } catch (error) {
      console.error("Delete User Error:", error);

      showToast("Failed to delete user");
    }
  };

  // ============================================================
  // VIEW USER ACTIVITY
  // ============================================================

  const handleViewActivity = async (user) => {
    setActivityModal({
      user,
      activity: null,
    });

    setActivityLoading(true);

    try {
      const res = await getUserActivity(user._id);

      if (res?.success) {
        setActivityModal({
          user,
          activity: res.activity || {
            downloadCount: 0,
            aiQueryCount: 0,
            recentDownloads: [],
            recentQueries: [],
          },
        });
      } else {
        showToast(
          res?.message || "Failed to load activity"
        );

        setActivityModal(null);
      }
    } catch (error) {
      console.error(
        "User Activity Error:",
        error
      );

      showToast("Failed to load activity");

      setActivityModal(null);
    } finally {
      setActivityLoading(false);
    }
  };

  // ============================================================
  // CLOSE ACTIVITY MODAL
  // ============================================================

  const closeActivityModal = () => {
    if (activityLoading) {
      return;
    }

    setActivityModal(null);
  };

  // ============================================================
  // PAGINATION HANDLERS
  // ============================================================

  const handlePreviousPage = () => {
    setPage((currentPage) =>
      Math.max(1, currentPage - 1)
    );
  };

  const handleNextPage = () => {
    setPage((currentPage) =>
      Math.min(totalPages, currentPage + 1)
    );
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="relative min-h-full">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          User Management
        </h1>

        <p className="mt-1 text-sm text-slate-400 sm:text-base">
          {totalUsers} registered user
          {totalUsers === 1 ? "" : "s"} on the platform
        </p>
      </div>

      {/* ======================================================
          FILTERS
      ====================================================== */}

      <div className="mb-6 flex flex-wrap items-center gap-3">
        {/* SEARCH */}

        <div className="flex min-w-[220px] flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <FiSearch className="shrink-0 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by name or email..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>

        {/* ROLE */}

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/50"
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

        {/* STATUS */}

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500/50"
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

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300 backdrop-blur-xl">
          {error}
        </div>
      )}

      {/* ======================================================
          USERS TABLE
      ====================================================== */}

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
        <>
          <UsersTable
            users={users}
            onBlock={handleBlock}
            onUnblock={handleUnblock}
            onDelete={handleDelete}
            onViewActivity={handleViewActivity}
          />

          {/* ==================================================
              PAGINATION
          ================================================== */}

          {totalUsers > limit && (
            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              {/* PAGE INFO */}

              <p className="text-sm text-slate-400">
                Page{" "}
                <span className="font-medium text-white">
                  {page}
                </span>{" "}
                of{" "}
                <span className="font-medium text-white">
                  {totalPages}
                </span>
              </p>

              {/* BUTTONS */}

              <div className="flex items-center gap-2">
                {/* PREVIOUS */}

                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                {/* NEXT */}

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={page >= totalPages}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ======================================================
          ACTIVITY MODAL
      ====================================================== */}

      {activityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* BACKDROP */}

          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeActivityModal}
          />

          {/* MODAL */}

          <div className="relative w-full max-w-md overflow-hidden rounded-3xl p-[1px]">
            {/* GRADIENT BORDER */}

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/40 via-purple-500/30 to-cyan-400/40" />

            <div className="relative rounded-3xl border border-white/10 bg-slate-900/95 p-6 backdrop-blur-xl">
              {/* MODAL HEADER */}

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {activityModal.user.name}
                    {"'s Activity"}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    User activity overview
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeActivityModal}
                  disabled={activityLoading}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors duration-200 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              {/* LOADING */}

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
                  {/* STATS */}

                  <div className="grid grid-cols-2 gap-3">
                    {/* DOWNLOADS */}

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-blue-300">
                        <FiDownload />

                        <span>
                          Downloads
                        </span>
                      </div>

                      <p className="text-xl font-bold text-white">
                        {activityModal.activity
                          .downloadCount ?? 0}
                      </p>
                    </div>

                    {/* AI QUERIES */}

                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-purple-300">
                        <FiMessageSquare />

                        <span>
                          AI Queries
                        </span>
                      </div>

                      <p className="text-xl font-bold text-white">
                        {activityModal.activity
                          .aiQueryCount ?? 0}
                      </p>
                    </div>
                  </div>

                  {/* RECENT DOWNLOADS */}

                  {activityModal.activity
                    .recentDownloads?.length >
                    0 && (
                    <div>
                      <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                        <FiActivity />

                        Recent downloads
                      </p>

                      <div className="max-h-32 space-y-1.5 overflow-y-auto pr-1">
                        {activityModal.activity.recentDownloads.map(
                          (
                            download,
                            i
                          ) => (
                            <div
                              key={
                                download._id ||
                                i
                              }
                              className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2"
                            >
                              <p className="truncate text-xs text-slate-300">
                                {download.noteTitle ||
                                  "Untitled note"}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* NO DOWNLOADS */}

                  {!activityModal.activity
                    .recentDownloads
                    ?.length && (
                    <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-4 text-center">
                      <FiActivity className="mx-auto mb-2 text-lg text-slate-600" />

                      <p className="text-xs text-slate-500">
                        No recent downloads
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          TOAST
      ====================================================== */}

      {message && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative overflow-hidden rounded-xl p-[1px] shadow-2xl shadow-black/40">
            {/* GRADIENT */}

            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500" />

            {/* CONTENT */}

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
