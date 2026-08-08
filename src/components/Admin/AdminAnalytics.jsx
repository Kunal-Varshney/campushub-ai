import { useState, useEffect } from "react";
import {
  FiUsers,
  FiFileText,
  FiDownload,
  FiActivity,
  FiCpu,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getAnalytics } from "../../services/adminService";

const StatCard = ({ label, value, icon: Icon, gradient }) => (
  <div className="relative rounded-3xl p-[1px] overflow-hidden">
    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-40`} />
    <div className="relative rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-xs font-medium">{label}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`flex items-center justify-center h-11 w-11 rounded-2xl bg-gradient-to-br ${gradient} text-white`}>
          <Icon />
        </div>
      </div>
    </div>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
    <h3 className="text-white font-semibold text-base mb-4">{title}</h3>
    <div className="h-64">{children}</div>
  </div>
);

const tooltipStyle = {
  backgroundColor: "rgba(15, 23, 42, 0.95)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "12px",
};

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError("");
      const res = await getAnalytics();
      if (res?.success) {
        setAnalytics(res.analytics);
      } else {
        setError(res?.message || "Failed to load analytics");
      }
      setLoading(false);
    };
    fetchAnalytics();
  }, []);

  const cards = analytics
    ? [
        { label: "Total Users", value: analytics.totalUsers, icon: FiUsers, gradient: "from-blue-500 to-cyan-400" },
        { label: "Total Notes", value: analytics.totalNotes, icon: FiFileText, gradient: "from-orange-500 to-amber-400" },
        { label: "Total Downloads", value: analytics.totalDownloads, icon: FiDownload, gradient: "from-purple-500 to-fuchsia-400" },
        { label: "Active Users", value: analytics.activeUsers, icon: FiActivity, gradient: "from-emerald-500 to-teal-400" },
        { label: "AI Requests", value: analytics.aiRequests, icon: FiCpu, gradient: "from-pink-500 to-rose-400" },
      ]
    : [];

  return (
    <div className="min-h-screen w-full bg-slate-950 relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <main className="relative z-10 px-4 sm:px-6 lg:px-10 py-8 max-w-[1600px] mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Analytics</h1>
          <p className="text-slate-400 text-sm sm:text-base mt-1">
            Platform-wide usage and growth metrics
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 backdrop-blur-xl px-5 py-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-28 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl animate-pulse" />
              ))
            : cards.map((c) => <StatCard key={c.label} {...c} />)}
        </div>

        {!loading && analytics && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ChartCard title="User Growth (30 days)">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="count" stroke="#60a5fa" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Download Growth (30 days)">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.downloadGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="count" stroke="#c084fc" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Most Popular Notes">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.popularNotes} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" stroke="#64748b" fontSize={11} allowDecimals={false} />
                  <YAxis
                    dataKey="title"
                    type="category"
                    stroke="#64748b"
                    fontSize={11}
                    width={140}
                    tickFormatter={(v) => (v.length > 18 ? `${v.slice(0, 18)}…` : v)}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="downloads" fill="#22d3ee" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}
      </main>
    </div>
  );
};

export default Analytics;