import {
  FiSlash,
  FiCheckCircle,
  FiTrash2,
  FiEye,
} from "react-icons/fi";

// ============================================================
// FORMAT DATE
// ============================================================

const formatDate = (dateString) => {
  if (!dateString) return "—";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ============================================================
// ROLE BADGE
// ============================================================

const RoleBadge = ({ role }) => {
  const normalizedRole =
    role?.toLowerCase() || "student";

  const styles = {
    admin:
      "bg-purple-500/10 text-purple-300 border-purple-500/30",

    moderator:
      "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",

    student:
      "bg-blue-500/10 text-blue-300 border-blue-500/30",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[normalizedRole] || styles.student
      }`}
    >
      {normalizedRole.charAt(0).toUpperCase() +
        normalizedRole.slice(1)}
    </span>
  );
};

// ============================================================
// STATUS BADGE
// ============================================================

const StatusBadge = ({ isBlocked }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
        isBlocked
          ? "border-red-500/30 bg-red-500/10 text-red-300"
          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
      }`}
    >
      {isBlocked ? "Blocked" : "Active"}
    </span>
  );
};

// ============================================================
// USER AVATAR
// ============================================================

const UserAvatar = ({ name, avatar }) => {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name || "User"}
        className="h-10 w-10 rounded-full border border-white/20 object-cover"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    );
  }

  const initial = name
    ? name.charAt(0).toUpperCase()
    : "?";

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 font-bold text-white">
      {initial}
    </div>
  );
};

// ============================================================
// ACTION BUTTON
// ============================================================

const ActionButton = ({
  onClick,
  title,
  children,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (typeof onClick === "function") {
          onClick();
        }
      }}
      title={title}
      aria-label={title}
      className={`relative z-30 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
};

// ============================================================
// USERS TABLE
// ============================================================

const UsersTable = ({
  users = [],
  onBlock,
  onUnblock,
  onDelete,
  onViewActivity,
}) => {

  // ==========================================================
  // ACTION HANDLERS
  // ==========================================================

  const handleView = (user) => {
    if (!user?._id) {
      console.error("User ID missing:", user);
      return;
    }

    if (typeof onViewActivity !== "function") {
      console.error(
        "onViewActivity handler is missing."
      );
      return;
    }

    onViewActivity(user);
  };

  const handleBlock = (user) => {
    if (!user?._id) {
      console.error("User ID missing:", user);
      return;
    }

    if (typeof onBlock !== "function") {
      console.error(
        "onBlock handler is missing."
      );
      return;
    }

    onBlock(user);
  };

  const handleUnblock = (user) => {
    if (!user?._id) {
      console.error("User ID missing:", user);
      return;
    }

    if (typeof onUnblock !== "function") {
      console.error(
        "onUnblock handler is missing."
      );
      return;
    }

    onUnblock(user);
  };

  const handleDelete = (user) => {
    if (!user?._id) {
      console.error("User ID missing:", user);
      return;
    }

    if (typeof onDelete !== "function") {
      console.error(
        "onDelete handler is missing."
      );
      return;
    }

    onDelete(user);
  };

  // ==========================================================
  // EMPTY STATE
  // ==========================================================

  if (!users || users.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
        <p className="text-sm font-medium text-slate-300">
          No users found
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* ======================================================
          DESKTOP TABLE
      ====================================================== */}

      <div className="hidden overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl md:block">
        <table className="w-full min-w-[850px] text-left">

          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">

              <th className="px-5 py-4 font-medium">
                User
              </th>

              <th className="px-5 py-4 font-medium">
                Email
              </th>

              <th className="px-5 py-4 font-medium">
                Role
              </th>

              <th className="px-5 py-4 font-medium">
                Status
              </th>

              <th className="px-5 py-4 font-medium">
                Joined
              </th>

              <th className="px-5 py-4 text-right font-medium">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-white/5 transition-colors duration-200 last:border-b-0 hover:bg-white/[0.04]"
              >

                {/* USER */}

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">

                    <UserAvatar
                      name={user.name}
                      avatar={user.avatar}
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {user.name ||
                          "Unnamed User"}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        ID:{" "}
                        {user._id
                          ? user._id.slice(-6)
                          : "—"}
                      </p>
                    </div>

                  </div>
                </td>

                {/* EMAIL */}

                <td className="px-5 py-4">
                  <p className="max-w-[220px] truncate text-sm text-slate-300">
                    {user.email || "—"}
                  </p>
                </td>

                {/* ROLE */}

                <td className="px-5 py-4">
                  <RoleBadge role={user.role} />
                </td>

                {/* STATUS */}

                <td className="px-5 py-4">
                  <StatusBadge
                    isBlocked={user.isBlocked}
                  />
                </td>

                {/* JOINED */}

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-400">
                  {formatDate(user.createdAt)}
                </td>

                {/* ACTIONS */}

                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">

                    {/* VIEW */}

                    <ActionButton
                      onClick={() =>
                        handleView(user)
                      }
                      title="View activity"
                      className="border-blue-500/20 bg-blue-500/10 text-blue-300 hover:border-blue-500/40 hover:bg-blue-500/20"
                    >
                      <FiEye className="text-sm" />
                    </ActionButton>

                    {/* BLOCK / UNBLOCK */}

                    {user.isBlocked ? (
                      <ActionButton
                        onClick={() =>
                          handleUnblock(user)
                        }
                        title="Unblock user"
                        className="border-emerald-500/20 bg-emerald-500/10 text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-500/20"
                      >
                        <FiCheckCircle className="text-sm" />
                      </ActionButton>
                    ) : (
                      <ActionButton
                        onClick={() =>
                          handleBlock(user)
                        }
                        title="Block user"
                        className="border-amber-500/20 bg-amber-500/10 text-amber-300 hover:border-amber-500/40 hover:bg-amber-500/20"
                      >
                        <FiSlash className="text-sm" />
                      </ActionButton>
                    )}

                    {/* DELETE */}

                    <ActionButton
                      onClick={() =>
                        handleDelete(user)
                      }
                      title="Delete user"
                      className="border-red-500/20 bg-red-500/10 text-red-300 hover:border-red-500/40 hover:bg-red-500/20"
                    >
                      <FiTrash2 className="text-sm" />
                    </ActionButton>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ======================================================
          MOBILE CARDS
      ====================================================== */}

      <div className="space-y-3 md:hidden">

        {users.map((user) => (
          <div
            key={user._id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
          >

            {/* USER HEADER */}

            <div className="flex items-start justify-between gap-3">

              <div className="flex min-w-0 items-center gap-3">

                <UserAvatar
                  name={user.name}
                  avatar={user.avatar}
                />

                <div className="min-w-0">

                  <p className="truncate text-sm font-semibold text-white">
                    {user.name ||
                      "Unnamed User"}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {user.email || "—"}
                  </p>

                </div>

              </div>

              <StatusBadge
                isBlocked={user.isBlocked}
              />

            </div>

            {/* USER DETAILS */}

            <div className="mt-4 grid grid-cols-2 gap-3">

              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <p className="mb-1 text-[11px] uppercase tracking-wide text-slate-500">
                  Role
                </p>

                <RoleBadge role={user.role} />
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <p className="mb-1 text-[11px] uppercase tracking-wide text-slate-500">
                  Joined
                </p>

                <p className="text-xs font-medium text-slate-300">
                  {formatDate(user.createdAt)}
                </p>
              </div>

            </div>

            {/* ACTIONS */}

            <div className="mt-4 flex items-center justify-end gap-2 border-t border-white/5 pt-4">

              {/* VIEW */}

              <ActionButton
                onClick={() =>
                  handleView(user)
                }
                title="View activity"
                className="border-blue-500/20 bg-blue-500/10 text-blue-300 hover:border-blue-500/40 hover:bg-blue-500/20"
              >
                <FiEye />
              </ActionButton>

              {/* BLOCK / UNBLOCK */}

              {user.isBlocked ? (
                <ActionButton
                  onClick={() =>
                    handleUnblock(user)
                  }
                  title="Unblock user"
                  className="border-emerald-500/20 bg-emerald-500/10 text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-500/20"
                >
                  <FiCheckCircle />
                </ActionButton>
              ) : (
                <ActionButton
                  onClick={() =>
                    handleBlock(user)
                  }
                  title="Block user"
                  className="border-amber-500/20 bg-amber-500/10 text-amber-300 hover:border-amber-500/40 hover:bg-amber-500/20"
                >
                  <FiSlash />
                </ActionButton>
              )}

              {/* DELETE */}

              <ActionButton
                onClick={() =>
                  handleDelete(user)
                }
                title="Delete user"
                className="border-red-500/20 bg-red-500/10 text-red-300 hover:border-red-500/40 hover:bg-red-500/20"
              >
                <FiTrash2 />
              </ActionButton>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default UsersTable;