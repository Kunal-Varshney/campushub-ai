import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiUsers,
  FiFileText,
  FiDownload,
  FiActivity,
  FiCpu,
  FiRefreshCw,
  FiTrendingUp,
  FiBarChart2,
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

// ============================================================
// STAT CARD
// ============================================================

const StatCard = ({ label, value, icon: Icon, gradient }) => (
  <div className="relative rounded-3xl p-[1px] overflow-hidden group">
    <div
      className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
    />

    <div className="relative h-full rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/10 p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-slate-400 text-xs sm:text-sm font-medium truncate">
            {label}
          </p>

          <p className="text-white text-2xl sm:text-3xl font-bold mt-1 tracking-tight">
            {Number(value || 0).toLocaleString()}
          </p>
        </div>

        <div
          className={`shrink-0 flex items-center justify-center h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg`}
        >
          <Icon className="text-lg sm:text-xl" />
        </div>
      </div>
    </div>
  </div>
);

// ============================================================
// CHART CARD
// ============================================================

const ChartCard = ({ title, subtitle, icon: Icon, children }) => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-4 sm:p-5 lg:p-6 shadow-xl">
    <div className="flex items-start justify-between gap-4 mb-5">
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-white/10 text-slate-300 shrink-0">
              <Icon className="text-base" />
            </div>
          )}

          <h3 className="text-white font-semibold text-sm sm:text-base">
            {title}
          </h3>
        </div>

        {subtitle && (
          <p className="text-slate-500 text-xs mt-2 ml-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </div>

    <div className="h-64 sm:h-72 w-full">
      {children}
    </div>
  </div>
);

// ============================================================
// EMPTY CHART STATE
// ============================================================

const EmptyChart = ({ message = "No data available yet" }) => (
  <div className="h-full flex flex-col items-center justify-center text-center">
    <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
      <FiBarChart2 className="text-slate-500 text-xl" />
    </div>

    <p className="text-slate-400 text-sm font-medium">
      {message}
    </p>

    <p className="text-slate-600 text-xs mt-1">
      Data will appear here once activity is recorded.
    </p>
  </div>
);

// ============================================================
// TOOLTIP
// ============================================================

const tooltipStyle = {
  backgroundColor: "rgba(15, 23, 42, 0.97)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "12px",
  padding: "8px 12px",
};

// ============================================================
// DATE FORMATTER
// ============================================================

const formatDate = (date) => {
  if (!date) return "";

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};

// ============================================================
// CHART DATA NORMALIZER
// ============================================================

const normalizeGrowthData = (data) => {
  if (!Array.isArray(data)) return [];

  return data
    .filter((item) => item && item.date)
    .map((item) => ({
      date: item.date,
      displayDate: formatDate(item.date),
      count: Number(item.count || 0),
    }));
};

// ============================================================
// ANALYTICS
// ============================================================

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================================
  // FETCH ANALYTICS
  // ==========================================================

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getAnalytics();

      if (res?.success) {
        setAnalytics(res.analytics || null);
      } else {
        setAnalytics(null);
        setError(
          res?.message || "Failed to load analytics."
        );
      }
    } catch (err) {
      console.error("Analytics Page Error:", err);

      setAnalytics(null);
      setError(
        err?.message ||
          "Something went wrong while loading analytics."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // ==========================================================
  // NORMALIZED DATA
  // ==========================================================

  const userGrowth = useMemo(
    () => normalizeGrowthData(analytics?.userGrowth),
    [analytics?.userGrowth]
  );

  const downloadGrowth = useMemo(
    () => normalizeGrowthData(analytics?.downloadGrowth),
    [analytics?.downloadGrowth]
  );

  const popularNotes = useMemo(() => {
    if (!Array.isArray(analytics?.popularNotes)) {
      return [];
    }

    return analytics.popularNotes
      .filter((item) => item)
      .map((item) => ({
        title: item.title || "Untitled",
        downloads: Number(item.downloads || 0),
        category: item.category || "General",
      }));
  }, [analytics?.popularNotes]);

  // ==========================================================
  // STAT CARDS
  // ==========================================================

  const cards = useMemo(() => {
    if (!analytics) return [];

    return [
      {
        label: "Total Users",
        value: analytics.totalUsers,
        icon: FiUsers,
        gradient: "from-blue-500 to-cyan-400",
      },
      {
        label: "Total Notes",
        value: analytics.totalNotes,
        icon: FiFileText,
        gradient: "from-orange-500 to-amber-400",
      },
      {
        label: "Total Downloads",
        value: analytics.totalDownloads,
        icon: FiDownload,
        gradient: "from-purple-500 to-fuchsia-400",
      },
      {
        label: "Active Users",
        value: analytics.activeUsers,
        icon: FiActivity,
        gradient: "from-emerald-500 to-teal-400",
      },
      {
        label: "AI Requests",
        value: analytics.aiRequests,
        icon: FiCpu,
        gradient: "from-pink-500 to-rose-400",
      },
    ];
  }, [analytics]);

  // ==========================================================
  // TOTALS
  // ==========================================================

  const totalUsers = Number(analytics?.totalUsers || 0);
  const totalNotes = Number(analytics?.totalNotes || 0);
  const totalDownloads = Number(
    analytics?.totalDownloads || 0
  );
  const activeUsers = Number(analytics?.activeUsers || 0);
  const aiRequests = Number(analytics?.aiRequests || 0);

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="min-h-screen w-full bg-slate-950 relative overflow-hidden">
      {/* ======================================================
          BACKGROUND
          ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute top-1/3 -right-40 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      {/* ======================================================
          MAIN
          ====================================================== */}

      <main className="relative z-10 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-[1600px] mx-auto">
        {/* ====================================================
            HEADER
            ==================================================== */}

        <div className="mb-7 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center">
                  <FiTrendingUp className="text-blue-400" />
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Analytics
                </h1>
              </div>

              <p className="text-slate-400 text-sm sm:text-base mt-2">
                Platform-wide usage and growth metrics
              </p>
            </div>

            {/* Refresh */}
            <button
              type="button"
              onClick={fetchAnalytics}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2.5 text-sm font-medium text-slate-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiRefreshCw
                className={loading ? "animate-spin" : ""}
              />

              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* ====================================================
            ERROR
            ==================================================== */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 backdrop-blur-xl px-4 sm:px-5 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-red-300 text-sm font-medium">
                  Unable to load analytics
                </p>

                <p className="text-red-400/80 text-xs mt-1">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={fetchAnalytics}
                className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 px-3 py-2 text-xs font-medium text-red-300 transition"
              >
                <FiRefreshCw />
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* ====================================================
            STAT CARDS
            ==================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-5 mb-6 sm:mb-8">
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-28 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl animate-pulse"
                >
                  <div className="h-full p-5 flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="h-3 w-20 bg-white/10 rounded" />
                      <div className="h-7 w-14 bg-white/10 rounded" />
                    </div>

                    <div className="h-11 w-11 rounded-2xl bg-white/10" />
                  </div>
                </div>
              ))
            : cards.length > 0
            ? cards.map((card) => (
                <StatCard
                  key={card.label}
                  {...card}
                />
              ))
            : null}
        </div>

        {/* ====================================================
            QUICK SUMMARY
            ==================================================== */}

        {!loading && analytics && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-slate-500 text-xs">
                Users
              </p>
              <p className="text-white font-semibold mt-1">
                {totalUsers.toLocaleString()}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-slate-500 text-xs">
                Notes
              </p>
              <p className="text-white font-semibold mt-1">
                {totalNotes.toLocaleString()}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-slate-500 text-xs">
                Downloads
              </p>
              <p className="text-white font-semibold mt-1">
                {totalDownloads.toLocaleString()}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <p className="text-slate-500 text-xs">
                AI Requests
              </p>
              <p className="text-white font-semibold mt-1">
                {aiRequests.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* ====================================================
            CHARTS
            ==================================================== */}

        {!loading && analytics && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
            {/* ==================================================
                USER GROWTH
                ================================================== */}

            <ChartCard
              title="User Growth"
              subtitle="New users registered during the last 30 days"
              icon={FiUsers}
            >
              {userGrowth.length === 0 ? (
                <EmptyChart message="No user growth data available" />
              ) : (
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart
                    data={userGrowth}
                    margin={{
                      top: 5,
                      right: 5,
                      left: -15,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                    />

                    <XAxis
                      dataKey="displayDate"
                      stroke="#64748b"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      minTickGap={20}
                    />

                    <YAxis
                      stroke="#64748b"
                      fontSize={10}
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      width={35}
                    />

                    <Tooltip
                      contentStyle={tooltipStyle}
                      labelStyle={{
                        color: "#94a3b8",
                        marginBottom: "4px",
                      }}
                      formatter={(value) => [
                        `${Number(value || 0).toLocaleString()} users`,
                        "New Users",
                      ]}
                    />

                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#60a5fa"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{
                        r: 5,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            {/* ==================================================
                DOWNLOAD GROWTH
                ================================================== */}

            <ChartCard
              title="Download Growth"
              subtitle="Note downloads during the last 30 days"
              icon={FiDownload}
            >
              {downloadGrowth.length === 0 ? (
                <EmptyChart message="No download data available" />
              ) : (
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart
                    data={downloadGrowth}
                    margin={{
                      top: 5,
                      right: 5,
                      left: -15,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                    />

                    <XAxis
                      dataKey="displayDate"
                      stroke="#64748b"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      minTickGap={20}
                    />

                    <YAxis
                      stroke="#64748b"
                      fontSize={10}
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      width={35}
                    />

                    <Tooltip
                      contentStyle={tooltipStyle}
                      labelStyle={{
                        color: "#94a3b8",
                        marginBottom: "4px",
                      }}
                      formatter={(value) => [
                        `${Number(value || 0).toLocaleString()} downloads`,
                        "Downloads",
                      ]}
                    />

                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#c084fc"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{
                        r: 5,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            {/* ==================================================
                POPULAR NOTES
                ================================================== */}

            <ChartCard
              title="Most Popular Notes"
              subtitle="Top 5 notes based on total downloads"
              icon={FiFileText}
            >
              {popularNotes.length === 0 ? (
                <EmptyChart message="No note download data available" />
              ) : (
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <BarChart
                    data={popularNotes}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 10,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                    />

                    <XAxis
                      type="number"
                      stroke="#64748b"
                      fontSize={10}
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      dataKey="title"
                      type="category"
                      stroke="#64748b"
                      fontSize={10}
                      width={110}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => {
                        const title = String(value || "");

                        return title.length > 16
                          ? `${title.slice(0, 16)}…`
                          : title;
                      }}
                    />

                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(value, name) => [
                        `${Number(value || 0).toLocaleString()}`,
                        name === "downloads"
                          ? "Downloads"
                          : name,
                      ]}
                      labelFormatter={(label) => label}
                    />

                    <Bar
                      dataKey="downloads"
                      fill="#22d3ee"
                      radius={[0, 8, 8, 0]}
                      maxBarSize={28}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </ChartCard>

            {/* ==================================================
                ACTIVITY OVERVIEW
                ================================================== */}

            <ChartCard
              title="Platform Activity"
              subtitle="Current platform usage overview"
              icon={FiActivity}
            >
              <div className="h-full flex flex-col justify-center">
                <div className="space-y-5">
                  {/* Active Users */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                          <FiActivity className="text-emerald-400 text-sm" />
                        </div>

                        <span className="text-slate-300 text-sm">
                          Active Users
                        </span>
                      </div>

                      <span className="text-white text-sm font-semibold">
                        {activeUsers.toLocaleString()}
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                        style={{
                          width:
                            totalUsers > 0
                              ? `${Math.min(
                                  100,
                                  (activeUsers /
                                    totalUsers) *
                                    100
                                )}%`
                              : "0%",
                        }}
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-xl bg-orange-500/10 flex items-center justify-center">
                          <FiFileText className="text-orange-400 text-sm" />
                        </div>

                        <span className="text-slate-300 text-sm">
                          Notes
                        </span>
                      </div>

                      <span className="text-white text-sm font-semibold">
                        {totalNotes.toLocaleString()}
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                      />
                    </div>
                  </div>

                  {/* Downloads */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-xl bg-purple-500/10 flex items-center justify-center">
                          <FiDownload className="text-purple-400 text-sm" />
                        </div>

                        <span className="text-slate-300 text-sm">
                          Downloads
                        </span>
                      </div>

                      <span className="text-white text-sm font-semibold">
                        {totalDownloads.toLocaleString()}
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full w-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-400"
                      />
                    </div>
                  </div>

                  {/* AI */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-xl bg-pink-500/10 flex items-center justify-center">
                          <FiCpu className="text-pink-400 text-sm" />
                        </div>

                        <span className="text-slate-300 text-sm">
                          AI Requests
                        </span>
                      </div>

                      <span className="text-white text-sm font-semibold">
                        {aiRequests.toLocaleString()}
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full w-full rounded-full bg-gradient-to-r from-pink-500 to-rose-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ChartCard>
          </div>
        )}

        {/* ====================================================
            LOADING CHART SKELETONS
            ==================================================== */}

        {loading && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[340px] rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl animate-pulse p-6"
              >
                <div className="h-4 w-32 bg-white/10 rounded mb-3" />
                <div className="h-3 w-48 bg-white/5 rounded mb-8" />
                <div className="h-56 bg-white/[0.03] rounded-2xl" />
              </div>
            ))}
          </div>
        )}

        {/* ====================================================
            NO DATA STATE
            ==================================================== */}

        {!loading && !analytics && !error && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-10 text-center">
            <div className="h-14 w-14 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <FiBarChart2 className="text-slate-500 text-2xl" />
            </div>

            <h3 className="text-white font-semibold">
              No analytics data
            </h3>

            <p className="text-slate-500 text-sm mt-1">
              Analytics data is currently unavailable.
            </p>

            <button
              type="button"
              onClick={fetchAnalytics}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/20 px-4 py-2.5 text-sm text-blue-300 transition"
            >
              <FiRefreshCw />
              Load Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Analytics;