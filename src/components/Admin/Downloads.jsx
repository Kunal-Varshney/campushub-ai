import { useState, useEffect, useCallback } from "react";
import { FiSearch, FiDownload, FiCalendar, FiUser } from "react-icons/fi";
import { getDownloadHistory } from "../../services/adminService";

const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date)) return "—";
  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [userSearch, setUserSearch] = useState("");
  const [noteSearch, setNoteSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const fetchDownloads = useCallback(async () => {
    setLoading(true);
    setError("");
    const res = await getDownloadHistory({ userSearch, noteSearch, from, to });
    if (res?.success) {
      setDownloads(res.downloads);
      setTotalDownloads(res.totalDownloads ?? res.downloads.length);
    } else {
      setError(res?.message || "Failed to load download history");
    }
    setLoading(false);
  }, [userSearch, noteSearch, from, to]);

  useEffect(() => {
    const timer = setTimeout(fetchDownloads, 350);
    return () => clearTimeout(timer);
  }, [fetchDownloads]);

  return (
    <div className="min-h-screen w-full bg-slate-950 relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <main className="relative z-10 px-4 sm:px-6 lg:px-10 py-8 max-w-[1600px] mx-auto">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Download History</h1>
            <p className="text-slate-400 text-sm sm:text-base mt-1">
              Track which user downloaded which note
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-3 flex items-center gap-3">
            <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-400 text-white">
              <FiDownload />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Total Downloads</p>
              <p className="text-white text-lg font-bold">{totalDownloads}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex-1 min-w-[200px]">
            <FiUser className="text-slate-400 shrink-0" />
            <input
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search by user..."
              className="bg-transparent outline-none text-white w-full placeholder:text-slate-500 text-sm"
            />
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex-1 min-w-[200px]">
            <FiSearch className="text-slate-400 shrink-0" />
            <input
              value={noteSearch}
              onChange={(e) => setNoteSearch(e.target.value)}
              placeholder="Search by note..."
              className="bg-transparent outline-none text-white w-full placeholder:text-slate-500 text-sm"
            />
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
            <FiCalendar className="text-slate-400 shrink-0" />
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="bg-transparent outline-none text-white text-sm [color-scheme:dark]"
            />
            <span className="text-slate-500 text-sm">to</span>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-transparent outline-none text-white text-sm [color-scheme:dark]"
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 backdrop-blur-xl px-5 py-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-12 rounded-xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : downloads.length === 0 ? (
            <div className="py-16 text-center text-slate-400">No downloads found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    {["User Name", "Email", "Note", "Category", "Downloaded At"].map((col) => (
                      <th key={col} className="px-5 py-4 font-medium text-slate-400 uppercase tracking-wide text-xs whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {downloads.map((d) => (
                    <tr key={d._id} className="border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors duration-200">
                      <td className="px-5 py-4 text-white font-medium whitespace-nowrap">{d.userName}</td>
                      <td className="px-5 py-4 text-slate-300 whitespace-nowrap">{d.userEmail}</td>
                      <td className="px-5 py-4 text-slate-300 whitespace-nowrap">{d.noteTitle}</td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/30">
                          {d.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-400 whitespace-nowrap">{formatDate(d.downloadedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Downloads;