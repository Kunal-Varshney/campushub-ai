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

const CATEGORIES = ["DSA", "Machine Learning", "DBMS", "Web Development", "Programming"];

const StatusBadge = ({ status }) => {
  const styles = {
    approved: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    rejected: "bg-red-500/10 text-red-300 border-red-500/30",
    pending: "bg-amber-500/10 text-amber-300 border-amber-500/30",
  };
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || styles.pending}`}>
      {status || "pending"}
    </span>
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
  const [editDraft, setEditDraft] = useState({ title: "", description: "", category: "" });

  const showToast = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError("");
    const res = await getNotes({ search, category, status });
    if (res?.success) {
      setNotes(res.notes);
    } else {
      setError(res?.message || "Failed to load notes");
    }
    setLoading(false);
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
    if (!window.confirm(`Delete "${note.title}"? This cannot be undone.`)) return;
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
    setEditDraft({ title: note.title, description: note.description || "", category: note.category });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft({ title: "", description: "", category: "" });
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
    <div className="min-h-screen w-full bg-slate-950 relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <main className="relative z-10 px-4 sm:px-6 lg:px-10 py-8 max-w-[1600px] mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Notes Management</h1>
          <p className="text-slate-400 text-sm sm:text-base mt-1">
            Review, approve and manage uploaded notes
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex-1 min-w-[220px]">
            <FiSearch className="text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className="bg-transparent outline-none text-white w-full placeholder:text-slate-500 text-sm"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50"
          >
            <option value="" className="bg-slate-900">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-slate-900">{c}</option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50"
          >
            <option value="" className="bg-slate-900">All statuses</option>
            <option value="pending" className="bg-slate-900">Pending</option>
            <option value="approved" className="bg-slate-900">Approved</option>
            <option value="rejected" className="bg-slate-900">Rejected</option>
          </select>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 backdrop-blur-xl px-5 py-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Notes table */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-14 rounded-xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : notes.length === 0 ? (
            <div className="py-16 text-center text-slate-400">No notes found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    {["Note", "Category", "Uploaded By", "Status", "Downloads", "Actions"].map((col) => (
                      <th key={col} className="px-5 py-4 font-medium text-slate-400 uppercase tracking-wide text-xs whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {notes.map((note) => (
                    <tr key={note._id} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors duration-200">
                      {editingId === note._id ? (
                        <>
                          <td className="px-5 py-4">
                            <input
                              value={editDraft.title}
                              onChange={(e) => setEditDraft((p) => ({ ...p, title: e.target.value }))}
                              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white text-sm outline-none focus:border-blue-500/50"
                            />
                          </td>
                          <td className="px-5 py-4">
                            <select
                              value={editDraft.category}
                              onChange={(e) => setEditDraft((p) => ({ ...p, category: e.target.value }))}
                              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white text-sm outline-none"
                            >
                              {CATEGORIES.map((c) => (
                                <option key={c} value={c} className="bg-slate-900">{c}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-5 py-4 text-slate-400" colSpan={2}>
                            editing...
                          </td>
                          <td className="px-5 py-4 text-slate-400">{note.downloads ?? 0}</td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => saveEdit(note)} className="flex items-center justify-center h-8 w-8 rounded-lg text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20">
                                <FiSave className="text-sm" />
                              </button>
                              <button onClick={cancelEdit} className="flex items-center justify-center h-8 w-8 rounded-lg text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10">
                                <FiX className="text-sm" />
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white shrink-0">
                                <FiFileText className="text-sm" />
                              </div>
                              <span className="text-white font-medium truncate">{note.title}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-blue-300 whitespace-nowrap">{note.category}</td>
                          <td className="px-5 py-4 text-slate-300 whitespace-nowrap">{note.uploadedBy?.name || "—"}</td>
                          <td className="px-5 py-4 whitespace-nowrap"><StatusBadge status={note.status} /></td>
                          <td className="px-5 py-4 text-slate-400 whitespace-nowrap">{note.downloads ?? 0}</td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleApprove(note)} title="Approve" className="flex items-center justify-center h-8 w-8 rounded-lg text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20">
                                <FiCheck className="text-sm" />
                              </button>
                              <button onClick={() => handleReject(note)} title="Reject" className="flex items-center justify-center h-8 w-8 rounded-lg text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20">
                                <FiX className="text-sm" />
                              </button>
                              <button onClick={() => startEdit(note)} title="Edit" className="flex items-center justify-center h-8 w-8 rounded-lg text-blue-300 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20">
                                <FiEdit2 className="text-sm" />
                              </button>
                              <button onClick={() => handleDelete(note)} title="Delete" className="flex items-center justify-center h-8 w-8 rounded-lg text-red-300 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20">
                                <FiTrash2 className="text-sm" />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {message && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative rounded-xl p-[1px] overflow-hidden shadow-2xl shadow-black/40">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500" />
            <div className="relative rounded-xl bg-slate-900/90 backdrop-blur-xl px-5 py-3.5 min-w-[240px]">
              <span className="text-white text-sm font-medium">{message}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;