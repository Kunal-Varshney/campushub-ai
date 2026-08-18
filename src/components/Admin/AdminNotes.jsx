import { useState, useEffect, useCallback } from "react";
import {
  FiSearch,
  FiFileText,
  FiCheck,
  FiX,
  FiTrash2,
  FiEdit2,
  FiSave,
} from "react-icons/fi";

import {
  getNotes,
  approveNote,
  rejectNote,
  updateNote,
  deleteNote,
} from "../../services/adminService";

const CATEGORIES = [
  "DSA",
  "Machine Learning",
  "DBMS",
  "Web Development",
  "Programming",
];

const StatusBadge = ({ status }) => {
  const normalizedStatus = status || "pending";

  const styles = {
    approved:
      "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    rejected:
      "bg-red-500/10 text-red-300 border-red-500/30",
    pending:
      "bg-amber-500/10 text-amber-300 border-amber-500/30",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-3
        py-1
        text-[11px]
        font-semibold
        capitalize
        whitespace-nowrap
        ${styles[normalizedStatus] || styles.pending}
      `}
    >
      {normalizedStatus}
    </span>
  );
};

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
      className={`
        flex
        h-9
        w-9
        shrink-0
        cursor-pointer
        items-center
        justify-center
        rounded-lg
        border
        transition-all
        duration-200
        hover:scale-105
        active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
};

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editDraft, setEditDraft] = useState({
    title: "",
    description: "",
    category: "",
  });

  const showToast = (text) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getNotes({
        search,
        category,
        status,
      });

      if (res?.success) {
        setNotes(res.notes || []);
      } else {
        setError(res?.message || "Failed to load notes");
      }
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  }, [search, category, status]);

  useEffect(() => {
    const timer = setTimeout(fetchNotes, 350);

    return () => clearTimeout(timer);
  }, [fetchNotes]);

  const handleApprove = async (note) => {
    const res = await approveNote(note._id);

    if (res?.success) {
      showToast(`"${note.title}" approved`);
      fetchNotes();
    } else {
      showToast(res?.message || "Failed to approve note");
    }
  };

  const handleReject = async (note) => {
    const res = await rejectNote(note._id);

    if (res?.success) {
      showToast(`"${note.title}" rejected`);
      fetchNotes();
    } else {
      showToast(res?.message || "Failed to reject note");
    }
  };

  const handleDelete = async (note) => {
    if (
      !window.confirm(
        `Delete "${note.title}"? This cannot be undone.`
      )
    ) {
      return;
    }

    const res = await deleteNote(note._id);

    if (res?.success) {
      showToast("Note deleted");
      fetchNotes();
    } else {
      showToast(res?.message || "Failed to delete note");
    }
  };

  const startEdit = (note) => {
    setEditingId(note._id);

    setEditDraft({
      title: note.title,
      description: note.description || "",
      category: note.category,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);

    setEditDraft({
      title: "",
      description: "",
      category: "",
    });
  };

  const saveEdit = async (note) => {
    const res = await updateNote(note._id, editDraft);

    if (res?.success) {
      showToast("Note updated");
      cancelEdit();
      fetchNotes();
    } else {
      showToast(res?.message || "Failed to update note");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <main
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1600px]
          px-4
          py-6
          sm:px-6
          sm:py-8
          lg:px-10
        "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-6 sm:mb-8">
          <h1
            className="
              text-2xl
              font-bold
              tracking-tight
              text-white
              sm:text-3xl
            "
          >
            Notes Management
          </h1>

          <p
            className="
              mt-1
              max-w-2xl
              text-sm
              leading-relaxed
              text-slate-400
              sm:text-base
            "
          >
            Review, approve and manage uploaded notes
          </p>
        </div>

        {/* =====================================================
            FILTERS
        ====================================================== */}

        <div
          className="
            mb-6
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
            lg:flex
            lg:flex-wrap
            lg:items-center
          "
        >
          {/* SEARCH */}

          <div
            className="
              flex
              min-w-0
              w-full
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
              sm:col-span-2
              lg:w-auto
              lg:min-w-[280px]
              lg:flex-1
            "
          >
            <FiSearch className="shrink-0 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="
                min-w-0
                w-full
                bg-transparent
                text-sm
                text-white
                outline-none
                placeholder:text-slate-500
              "
            />
          </div>

          {/* CATEGORY */}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              w-full
              min-w-0
              rounded-2xl
              border
              border-white/10
              bg-slate-900
              px-4
              py-3
              text-sm
              text-white
              outline-none
              transition
              focus:border-blue-500/50
              lg:w-auto
              lg:min-w-[190px]
            "
          >
            <option value="" className="bg-slate-900">
              All categories
            </option>

            {CATEGORIES.map((c) => (
              <option
                key={c}
                value={c}
                className="bg-slate-900"
              >
                {c}
              </option>
            ))}
          </select>

          {/* STATUS */}

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              w-full
              min-w-0
              rounded-2xl
              border
              border-white/10
              bg-slate-900
              px-4
              py-3
              text-sm
              text-white
              outline-none
              transition
              focus:border-blue-500/50
              lg:w-auto
              lg:min-w-[170px]
            "
          >
            <option value="" className="bg-slate-900">
              All statuses
            </option>

            <option value="pending" className="bg-slate-900">
              Pending
            </option>

            <option value="approved" className="bg-slate-900">
              Approved
            </option>

            <option value="rejected" className="bg-slate-900">
              Rejected
            </option>
          </select>
        </div>

        {/* ERROR */}

        {error && (
          <div
            className="
              mb-6
              rounded-2xl
              border
              border-red-500/30
              bg-red-500/10
              px-4
              py-4
              text-sm
              leading-relaxed
              text-red-300
              sm:px-5
            "
          >
            {error}
          </div>
        )}

        {/* =====================================================
            NOTES CONTAINER
        ====================================================== */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
          "
        >
          {/* LOADING */}

          {loading ? (
            <div className="space-y-3 p-4 sm:p-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="
                    h-20
                    animate-pulse
                    rounded-xl
                    bg-white/5
                    sm:h-14
                  "
                />
              ))}
            </div>
          ) : notes.length === 0 ? (
            /* EMPTY */

            <div
              className="
                flex
                min-h-[220px]
                flex-col
                items-center
                justify-center
                px-5
                py-16
                text-center
              "
            >
              <div
                className="
                  mb-4
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/5
                  text-slate-500
                "
              >
                <FiFileText size={24} />
              </div>

              <p className="text-sm font-medium text-slate-300">
                No notes found.
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <>
              {/* =================================================
                  DESKTOP TABLE
              ================================================== */}

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      {[
                        "Note",
                        "Category",
                        "Uploaded By",
                        "Status",
                        "Downloads",
                        "Actions",
                      ].map((col) => (
                        <th
                          key={col}
                          className="
                            whitespace-nowrap
                            px-5
                            py-4
                            text-xs
                            font-medium
                            uppercase
                            tracking-wide
                            text-slate-400
                          "
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {notes.map((note) => (
                      <tr
                        key={note._id}
                        className="
                          border-b
                          border-white/5
                          transition-colors
                          duration-200
                          last:border-b-0
                          hover:bg-white/5
                        "
                      >
                        {editingId === note._id ? (
                          <>
                            {/* EDIT TITLE */}

                            <td className="px-5 py-4">
                              <input
                                value={editDraft.title}
                                onChange={(e) =>
                                  setEditDraft((p) => ({
                                    ...p,
                                    title: e.target.value,
                                  }))
                                }
                                className="
                                  w-full
                                  min-w-[180px]
                                  rounded-lg
                                  border
                                  border-white/10
                                  bg-white/10
                                  px-3
                                  py-2
                                  text-sm
                                  text-white
                                  outline-none
                                  focus:border-blue-500/50
                                "
                              />
                            </td>

                            {/* EDIT CATEGORY */}

                            <td className="px-5 py-4">
                              <select
                                value={editDraft.category}
                                onChange={(e) =>
                                  setEditDraft((p) => ({
                                    ...p,
                                    category: e.target.value,
                                  }))
                                }
                                className="
                                  w-full
                                  min-w-[160px]
                                  rounded-lg
                                  border
                                  border-white/10
                                  bg-slate-900
                                  px-3
                                  py-2
                                  text-sm
                                  text-white
                                  outline-none
                                "
                              >
                                {CATEGORIES.map((c) => (
                                  <option
                                    key={c}
                                    value={c}
                                    className="bg-slate-900"
                                  >
                                    {c}
                                  </option>
                                ))}
                              </select>
                            </td>

                            <td
                              className="px-5 py-4 text-slate-400"
                              colSpan={2}
                            >
                              Editing...
                            </td>

                            <td className="whitespace-nowrap px-5 py-4 text-slate-400">
                              {note.downloads ?? 0}
                            </td>

                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <ActionButton
                                  onClick={() =>
                                    saveEdit(note)
                                  }
                                  title="Save"
                                  className="
                                    border-emerald-500/20
                                    bg-emerald-500/10
                                    text-emerald-300
                                    hover:bg-emerald-500/20
                                  "
                                >
                                  <FiSave />
                                </ActionButton>

                                <ActionButton
                                  onClick={cancelEdit}
                                  title="Cancel"
                                  className="
                                    border-white/10
                                    bg-white/5
                                    text-slate-300
                                    hover:bg-white/10
                                  "
                                >
                                  <FiX />
                                </ActionButton>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            {/* NOTE */}

                            <td className="px-5 py-4">
                              <div className="flex min-w-0 items-center gap-3">
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
                                    from-orange-500
                                    to-amber-400
                                    text-white
                                  "
                                >
                                  <FiFileText className="text-sm" />
                                </div>

                                <span
                                  className="
                                    max-w-[260px]
                                    truncate
                                    font-medium
                                    text-white
                                  "
                                >
                                  {note.title}
                                </span>
                              </div>
                            </td>

                            {/* CATEGORY */}

                            <td className="whitespace-nowrap px-5 py-4 text-blue-300">
                              {note.category}
                            </td>

                            {/* UPLOADED BY */}

                            <td className="whitespace-nowrap px-5 py-4 text-slate-300">
                              {note.uploadedBy?.name || "—"}
                            </td>

                            {/* STATUS */}

                            <td className="whitespace-nowrap px-5 py-4">
                              <StatusBadge
                                status={note.status}
                              />
                            </td>

                            {/* DOWNLOADS */}

                            <td className="whitespace-nowrap px-5 py-4 text-slate-400">
                              {note.downloads ?? 0}
                            </td>

                            {/* ACTIONS */}

                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <ActionButton
                                  onClick={() =>
                                    handleApprove(note)
                                  }
                                  title="Approve"
                                  className="
                                    border-emerald-500/20
                                    bg-emerald-500/10
                                    text-emerald-300
                                    hover:bg-emerald-500/20
                                  "
                                >
                                  <FiCheck />
                                </ActionButton>

                                <ActionButton
                                  onClick={() =>
                                    handleReject(note)
                                  }
                                  title="Reject"
                                  className="
                                    border-amber-500/20
                                    bg-amber-500/10
                                    text-amber-300
                                    hover:bg-amber-500/20
                                  "
                                >
                                  <FiX />
                                </ActionButton>

                                <ActionButton
                                  onClick={() =>
                                    startEdit(note)
                                  }
                                  title="Edit"
                                  className="
                                    border-blue-500/20
                                    bg-blue-500/10
                                    text-blue-300
                                    hover:bg-blue-500/20
                                  "
                                >
                                  <FiEdit2 />
                                </ActionButton>

                                <ActionButton
                                  onClick={() =>
                                    handleDelete(note)
                                  }
                                  title="Delete"
                                  className="
                                    border-red-500/20
                                    bg-red-500/10
                                    text-red-300
                                    hover:bg-red-500/20
                                  "
                                >
                                  <FiTrash2 />
                                </ActionButton>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* =================================================
                  MOBILE CARDS
              ================================================== */}

              <div className="space-y-3 p-3 md:hidden">
                {notes.map((note) => (
                  <div
                    key={note._id}
                    className="
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      p-4
                    "
                  >
                    {editingId === note._id ? (
                      /* ===============================
                         MOBILE EDIT
                      ================================ */

                      <div className="space-y-4">
                        <div>
                          <label
                            className="
                              mb-2
                              block
                              text-[11px]
                              font-semibold
                              uppercase
                              tracking-wide
                              text-slate-500
                            "
                          >
                            Note Title
                          </label>

                          <input
                            value={editDraft.title}
                            onChange={(e) =>
                              setEditDraft((p) => ({
                                ...p,
                                title: e.target.value,
                              }))
                            }
                            className="
                              w-full
                              rounded-xl
                              border
                              border-white/10
                              bg-white/5
                              px-3
                              py-3
                              text-sm
                              text-white
                              outline-none
                              focus:border-blue-500/50
                            "
                          />
                        </div>

                        <div>
                          <label
                            className="
                              mb-2
                              block
                              text-[11px]
                              font-semibold
                              uppercase
                              tracking-wide
                              text-slate-500
                            "
                          >
                            Category
                          </label>

                          <select
                            value={editDraft.category}
                            onChange={(e) =>
                              setEditDraft((p) => ({
                                ...p,
                                category: e.target.value,
                              }))
                            }
                            className="
                              w-full
                              rounded-xl
                              border
                              border-white/10
                              bg-slate-900
                              px-3
                              py-3
                              text-sm
                              text-white
                              outline-none
                            "
                          >
                            {CATEGORIES.map((c) => (
                              <option
                                key={c}
                                value={c}
                                className="bg-slate-900"
                              >
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex gap-2 border-t border-white/5 pt-4">
                          <button
                            type="button"
                            onClick={() =>
                              saveEdit(note)
                            }
                            className="
                              flex
                              min-h-10
                              flex-1
                              items-center
                              justify-center
                              gap-2
                              rounded-xl
                              border
                              border-emerald-500/20
                              bg-emerald-500/10
                              px-4
                              text-sm
                              font-medium
                              text-emerald-300
                              transition
                              hover:bg-emerald-500/20
                            "
                          >
                            <FiSave />
                            Save
                          </button>

                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="
                              flex
                              min-h-10
                              flex-1
                              items-center
                              justify-center
                              gap-2
                              rounded-xl
                              border
                              border-white/10
                              bg-white/5
                              px-4
                              text-sm
                              font-medium
                              text-slate-300
                              transition
                              hover:bg-white/10
                            "
                          >
                            <FiX />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* ===============================
                         MOBILE NOTE CARD
                      ================================ */

                      <>
                        {/* CARD HEADER */}

                        <div className="flex items-start gap-3">
                          <div
                            className="
                              flex
                              h-11
                              w-11
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-gradient-to-br
                              from-orange-500
                              to-amber-400
                              text-white
                              shadow-lg
                            "
                          >
                            <FiFileText size={18} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3
                              className="
                                break-words
                                text-sm
                                font-semibold
                                leading-5
                                text-white
                              "
                            >
                              {note.title || "Untitled Note"}
                            </h3>

                            <p className="mt-1 break-words text-xs text-slate-500">
                              Uploaded by{" "}
                              <span className="text-slate-400">
                                {note.uploadedBy?.name ||
                                  "Unknown"}
                              </span>
                            </p>
                          </div>

                          <StatusBadge
                            status={note.status}
                          />
                        </div>

                        {/* DETAILS */}

                        <div
                          className="
                            mt-4
                            grid
                            grid-cols-2
                            gap-2
                          "
                        >
                          <div
                            className="
                              min-w-0
                              rounded-xl
                              border
                              border-white/5
                              bg-white/[0.03]
                              p-3
                            "
                          >
                            <p
                              className="
                                mb-1
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-wide
                                text-slate-500
                              "
                            >
                              Category
                            </p>

                            <p
                              className="
                                break-words
                                text-xs
                                font-medium
                                text-blue-300
                              "
                            >
                              {note.category || "—"}
                            </p>
                          </div>

                          <div
                            className="
                              min-w-0
                              rounded-xl
                              border
                              border-white/5
                              bg-white/[0.03]
                              p-3
                            "
                          >
                            <p
                              className="
                                mb-1
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-wide
                                text-slate-500
                              "
                            >
                              Downloads
                            </p>

                            <p className="text-xs font-medium text-slate-300">
                              {note.downloads ?? 0}
                            </p>
                          </div>
                        </div>

                        {/* ACTIONS */}

                        <div
                          className="
                            mt-4
                            flex
                            items-center
                            justify-between
                            gap-2
                            border-t
                            border-white/5
                            pt-4
                          "
                        >
                          <span className="text-[11px] text-slate-500">
                            Manage note
                          </span>

                          <div className="flex items-center gap-2">
                            <ActionButton
                              onClick={() =>
                                handleApprove(note)
                              }
                              title="Approve"
                              className="
                                border-emerald-500/20
                                bg-emerald-500/10
                                text-emerald-300
                                hover:bg-emerald-500/20
                              "
                            >
                              <FiCheck />
                            </ActionButton>

                            <ActionButton
                              onClick={() =>
                                handleReject(note)
                              }
                              title="Reject"
                              className="
                                border-amber-500/20
                                bg-amber-500/10
                                text-amber-300
                                hover:bg-amber-500/20
                              "
                            >
                              <FiX />
                            </ActionButton>

                            <ActionButton
                              onClick={() =>
                                startEdit(note)
                              }
                              title="Edit"
                              className="
                                border-blue-500/20
                                bg-blue-500/10
                                text-blue-300
                                hover:bg-blue-500/20
                              "
                            >
                              <FiEdit2 />
                            </ActionButton>

                            <ActionButton
                              onClick={() =>
                                handleDelete(note)
                              }
                              title="Delete"
                              className="
                                border-red-500/20
                                bg-red-500/10
                                text-red-300
                                hover:bg-red-500/20
                              "
                            >
                              <FiTrash2 />
                            </ActionButton>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* =====================================================
          TOAST
      ====================================================== */}

      {message && (
        <div
          className="
            fixed
            bottom-4
            left-4
            right-4
            z-50
            sm:bottom-6
            sm:left-auto
            sm:right-6
          "
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-xl
              p-[1px]
              shadow-2xl
              shadow-black/40
            "
          >
            <div
              className="
                absolute
                inset-0
                rounded-xl
                bg-gradient-to-r
                from-blue-500
                to-purple-500
              "
            />

            <div
              className="
                relative
                rounded-xl
                bg-slate-900/95
                px-4
                py-3
                backdrop-blur-xl
                sm:min-w-[240px]
                sm:px-5
                sm:py-3.5
              "
            >
              <span className="break-words text-sm font-medium text-white">
                {message}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;