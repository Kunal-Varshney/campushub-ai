import { useState, useEffect } from "react";
import { FiCpu, FiUsers, FiTrendingUp, FiMessageSquare } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getAIUsage } from "../../services/adminService";

const tooltipStyle = {
  backgroundColor: "rgba(15, 23, 42, 0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "12px",
};

const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date)) return "—";
  return date.toLocaleString("en-US", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
};

const AIAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      const res = await getAIUsage();
      if (res?.success) {
        setData(res);
      } else {
        setError(res?.message || "Failed to load AI usage data");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-950 relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <main className="relative z-10 px-4 sm:px-6 lg:px-10 py-8 max-w-[1600px] mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">AI Assistant Analytics</h1>
          <p className="text-slate-400 text-sm sm:text-base mt-1">
            Monitor how students are using the AI assistant
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 backdrop-blur-xl px-5 py-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-28 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl animate-pulse" />
            ))
          ) : (
            <>
              <div className="relative rounded-3xl p-[1px] overflow-hidden">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-400 opacity-40" />
                <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5 flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs font-medium">Total AI Queries</p>
                    <p className="text-white text-2xl font-bold mt-1">{data?.totalQueries ?? 0}</p>
                  </div>
                  <div className="flex items-center justify-center h-11 w-11 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-400 text-white">
                    <FiCpu />
                  </div>
                </div>
              </div>

              <div className="relative rounded-3xl p-[1px] overflow-hidden">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-400 opacity-40" />
                <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5 flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs font-medium">Unique Users</p>
                    <p className="text-white text-2xl font-bold mt-1">{data?.uniqueUsers ?? 0}</p>
                  </div>
                  <div className="flex items-center justify-center h-11 w-11 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                    <FiUsers />
                  </div>
                </div>
              </div>

              <div className="relative rounded-3xl p-[1px] overflow-hidden">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 to-fuchsia-400 opacity-40" />
                <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5 flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-xs font-medium">Top Topic</p>
                    <p className="text-white text-lg font-bold mt-1 truncate">
                      {data?.popularTopics?.[0]?.topic ?? "—"}
                    </p>
                  </div>
                  <div className="flex items-center justify-center h-11 w-11 rounded-2xl bg-gradient-to-br from-purple-500 to-fuchsia-400 text-white">
                    <FiTrendingUp />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {!loading && data && (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <h3 className="text-white font-semibold text-base mb-4">Popular Topics</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.popularTopics} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis type="number" stroke="#64748b" fontSize={11} allowDecimals={false} />
                    <YAxis dataKey="topic" type="category" stroke="#64748b" fontSize={11} width={110} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="count" fill="#f472b6" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              <h3 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
                <FiMessageSquare /> Recent Questions
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {data.queries?.length === 0 ? (
                  <p className="text-slate-400 text-sm py-8 text-center">No AI queries yet.</p>
                ) : (
                  data.queries?.map((q) => (
                    <div key={q._id} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                      <p className="text-white text-sm truncate">{q.question}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-slate-500 text-xs">{q.userId?.name || "Unknown user"}</span>
                        <span className="text-slate-500 text-xs">{formatDate(q.createdAt)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AIAnalytics;