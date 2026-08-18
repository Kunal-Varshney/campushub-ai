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

const StatCard = ({
  label,
  value,
  icon: Icon,
  gradient,
}) => (
  <div className="group relative min-w-0 overflow-hidden rounded-2xl p-[1px] sm:rounded-3xl">
    <div
      className={`
        absolute
        inset-0
        rounded-2xl
        bg-gradient-to-br
        ${gradient}
        opacity-30
        transition-opacity
        duration-300
        group-hover:opacity-50
        sm:rounded-3xl
      `}
    />

    <div
      className="
        relative
        h-full
        min-w-0
        rounded-2xl
        border
        border-white/10
        bg-slate-900/90
        p-4
        backdrop-blur-xl
        sm:rounded-3xl
        sm:p-5
      "
    >
      <div className="flex min-w-0 items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-medium text-slate-400 sm:text-sm">
            {label}
          </p>

          <p className="mt-1 truncate text-xl font-bold tracking-tight text-white sm:text-3xl">
            {Number(value || 0).toLocaleString()}
          </p>
        </div>

        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            ${gradient}
            text-white
            shadow-lg
            sm:h-12
            sm:w-12
            sm:rounded-2xl
          `}
        >
          <Icon className="text-base sm:text-xl" />
        </div>
      </div>
    </div>
  </div>
);

// ============================================================
// CHART CARD
// ============================================================

const ChartCard = ({
  title,
  subtitle,
  icon: Icon,
  children,
}) => (
  <div
    className="
      min-w-0
      overflow-hidden
      rounded-2xl
      border
      border-white/10
      bg-white/[0.04]
      p-4
      shadow-xl
      backdrop-blur-xl
      sm:rounded-3xl
      sm:p-5
      lg:p-6
    "
  >
    <div className="mb-4 flex min-w-0 items-start justify-between gap-3 sm:mb-5">
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2.5">
          {Icon && (
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-white/10
                text-slate-300
                sm:h-9
                sm:w-9
              "
            >
              <Icon className="text-sm sm:text-base" />
            </div>
          )}

          <h3 className="truncate text-sm font-semibold text-white sm:text-base">
            {title}
          </h3>
        </div>

        {subtitle && (
          <p className="mt-2 break-words text-[11px] leading-relaxed text-slate-500 sm:text-xs">
            {subtitle}
          </p>
        )}
      </div>
    </div>

    <div className="h-60 min-w-0 w-full sm:h-72">
      {children}
    </div>
  </div>
);

// ============================================================
// EMPTY CHART
// ============================================================

const EmptyChart = ({
  message = "No data available yet",
}) => (
  <div className="flex h-full flex-col items-center justify-center px-4 text-center">
    <div
      className="
        mb-3
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-2xl
        border
        border-white/10
        bg-white/5
      "
    >
      <FiBarChart2 className="text-lg text-slate-500" />
    </div>

    <p className="text-sm font-medium text-slate-400">
      {message}
    </p>

    <p className="mt-1 max-w-xs text-[11px] leading-relaxed text-slate-600">
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
    () =>
      normalizeGrowthData(
        analytics?.downloadGrowth
      ),
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

  const totalUsers = Number(
    analytics?.totalUsers || 0
  );

  const totalNotes = Number(
    analytics?.totalNotes || 0
  );

  const totalDownloads = Number(
    analytics?.totalDownloads || 0
  );

  const activeUsers = Number(
    analytics?.activeUsers || 0
  );

  const aiRequests = Number(
    analytics?.aiRequests || 0
  );

  const activeUserPercentage =
    totalUsers > 0
      ? Math.min(
          100,
          (activeUsers / totalUsers) * 100
        )
      : 0;

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        overflow-x-hidden
        bg-slate-950
      "
    >
      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="
            absolute
            -left-32
            -top-32
            h-64
            w-64
            rounded-full
            bg-blue-600/20
            blur-3xl
            sm:-left-40
            sm:-top-40
            sm:h-96
            sm:w-96
          "
        />

        <div
          className="
            absolute
            -right-32
            top-1/3
            h-64
            w-64
            rounded-full
            bg-purple-500/10
            blur-3xl
            sm:-right-40
            sm:h-96
            sm:w-96
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-1/3
            h-64
            w-64
            rounded-full
            bg-cyan-500/5
            blur-3xl
            sm:h-72
            sm:w-72
          "
        />
      </div>

      {/* ======================================================
          MAIN
      ====================================================== */}

      <main
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1600px]
          px-4
          py-5
          sm:px-6
          sm:py-8
          lg:px-10
        "
      >
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="mb-6 sm:mb-8">
          <div
            className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-blue-400/20
                    bg-blue-500/10
                  "
                >
                  <FiTrendingUp className="text-blue-400" />
                </div>

                <h1
                  className="
                    truncate
                    text-2xl
                    font-bold
                    tracking-tight
                    text-white
                    sm:text-3xl
                  "
                >
                  Analytics
                </h1>
              </div>

              <p
                className="
                  mt-2
                  text-xs
                  leading-relaxed
                  text-slate-400
                  sm:text-base
                "
              >
                Platform-wide usage and growth metrics
              </p>
            </div>

            {/* REFRESH */}

            <button
              type="button"
              onClick={fetchAnalytics}
              disabled={loading}
              className="
                inline-flex
                min-h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/5
                px-4
                py-2.5
                text-sm
                font-medium
                text-slate-200
                transition-all
                duration-200
                hover:bg-white/10
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:w-auto
              "
            >
              <FiRefreshCw
                className={
                  loading ? "animate-spin" : ""
                }
              />

              {loading
                ? "Refreshing..."
                : "Refresh"}
            </button>
          </div>
        </div>

        {/* ====================================================
            ERROR
        ==================================================== */}

        {error && (
          <div
            className="
              mb-5
              rounded-2xl
              border
              border-red-500/30
              bg-red-500/10
              px-4
              py-4
              backdrop-blur-xl
              sm:mb-6
              sm:px-5
            "
          >
            <div
              className="
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-red-300">
                  Unable to load analytics
                </p>

                <p className="mt-1 break-words text-xs text-red-400/80">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={fetchAnalytics}
                className="
                  inline-flex
                  min-h-10
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-red-300
                  transition
                  hover:bg-red-500/20
                "
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

        <div
          className="
            mb-5
            grid
            grid-cols-2
            gap-3
            sm:mb-8
            sm:grid-cols-2
            sm:gap-5
            xl:grid-cols-5
          "
        >
          {loading
            ? Array.from({ length: 5 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className={`
                      h-24
                      animate-pulse
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.04]
                      sm:h-28
                      sm:rounded-3xl
                      ${
                        index === 4
                          ? "col-span-2 xl:col-span-1"
                          : ""
                      }
                    `}
                  >
                    <div className="flex h-full items-center justify-between p-4 sm:p-5">
                      <div className="space-y-3">
                        <div className="h-3 w-16 rounded bg-white/10 sm:w-20" />
                        <div className="h-6 w-12 rounded bg-white/10 sm:h-7 sm:w-14" />
                      </div>

                      <div className="h-9 w-9 rounded-xl bg-white/10 sm:h-11 sm:w-11 sm:rounded-2xl" />
                    </div>
                  </div>
                )
              )
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
          <div
            className="
              mb-5
              grid
              grid-cols-2
              gap-3
              sm:mb-8
              sm:grid-cols-4
              sm:gap-4
            "
          >
            {[
              {
                label: "Users",
                value: totalUsers,
              },
              {
                label: "Notes",
                value: totalNotes,
              },
              {
                label: "Downloads",
                value: totalDownloads,
              },
              {
                label: "AI Requests",
                value: aiRequests,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="
                  min-w-0
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-3
                  py-3
                  sm:px-4
                "
              >
                <p className="truncate text-[11px] text-slate-500 sm:text-xs">
                  {item.label}
                </p>

                <p className="mt-1 truncate text-sm font-semibold text-white sm:text-base">
                  {item.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ====================================================
            CHARTS
        ==================================================== */}

        {!loading && analytics && (
          <div
            className="
              grid
              min-w-0
              grid-cols-1
              gap-4
              sm:gap-6
              xl:grid-cols-2
            "
          >
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
                      top: 8,
                      right: 8,
                      left: -18,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                    />

                    <XAxis
                      dataKey="displayDate"
                      stroke="#64748b"
                      fontSize={9}
                      tickLine={false}
                      axisLine={false}
                      minTickGap={24}
                    />

                    <YAxis
                      stroke="#64748b"
                      fontSize={9}
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      width={32}
                    />

                    <Tooltip
                      contentStyle={tooltipStyle}
                      labelStyle={{
                        color: "#94a3b8",
                        marginBottom: "4px",
                      }}
                      formatter={(value) => [
                        `${Number(
                          value || 0
                        ).toLocaleString()} users`,
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
                      top: 8,
                      right: 8,
                      left: -18,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                    />

                    <XAxis
                      dataKey="displayDate"
                      stroke="#64748b"
                      fontSize={9}
                      tickLine={false}
                      axisLine={false}
                      minTickGap={24}
                    />

                    <YAxis
                      stroke="#64748b"
                      fontSize={9}
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      width={32}
                    />

                    <Tooltip
                      contentStyle={tooltipStyle}
                      labelStyle={{
                        color: "#94a3b8",
                        marginBottom: "4px",
                      }}
                      formatter={(value) => [
                        `${Number(
                          value || 0
                        ).toLocaleString()} downloads`,
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
                      right: 8,
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
                      fontSize={9}
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      dataKey="title"
                      type="category"
                      stroke="#64748b"
                      fontSize={9}
                      width={85}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => {
                        const title = String(
                          value || ""
                        );

                        return title.length > 11
                          ? `${title.slice(0, 11)}…`
                          : title;
                      }}
                    />

                    <Tooltip
                      contentStyle={tooltipStyle}
                      formatter={(value, name) => [
                        `${Number(
                          value || 0
                        ).toLocaleString()}`,
                        name === "downloads"
                          ? "Downloads"
                          : name,
                      ]}
                      labelFormatter={(label) =>
                        label
                      }
                    />

                    <Bar
                      dataKey="downloads"
                      fill="#22d3ee"
                      radius={[0, 8, 8, 0]}
                      maxBarSize={24}
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
              <div className="flex h-full flex-col justify-center">
                <div className="space-y-5 sm:space-y-6">
                  {/* ACTIVE USERS */}

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                          <FiActivity className="text-sm text-emerald-400" />
                        </div>

                        <span className="truncate text-xs text-slate-300 sm:text-sm">
                          Active Users
                        </span>
                      </div>

                      <span className="shrink-0 text-xs font-semibold text-white sm:text-sm">
                        {activeUsers.toLocaleString()}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                        style={{
                          width: `${activeUserPercentage}%`,
                        }}
                      />
                    </div>

                    <p className="mt-1.5 text-right text-[10px] text-slate-600">
                      {activeUserPercentage.toFixed(1)}%
                      of total users
                    </p>
                  </div>

                  {/* NOTES */}

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                          <FiFileText className="text-sm text-orange-400" />
                        </div>

                        <span className="truncate text-xs text-slate-300 sm:text-sm">
                          Notes
                        </span>
                      </div>

                      <span className="shrink-0 text-xs font-semibold text-white sm:text-sm">
                        {totalNotes.toLocaleString()}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
                    </div>
                  </div>

                  {/* DOWNLOADS */}

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-500/10">
                          <FiDownload className="text-sm text-purple-400" />
                        </div>

                        <span className="truncate text-xs text-slate-300 sm:text-sm">
                          Downloads
                        </span>
                      </div>

                      <span className="shrink-0 text-xs font-semibold text-white sm:text-sm">
                        {totalDownloads.toLocaleString()}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-400" />
                    </div>
                  </div>

                  {/* AI */}

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-pink-500/10">
                          <FiCpu className="text-sm text-pink-400" />
                        </div>

                        <span className="truncate text-xs text-slate-300 sm:text-sm">
                          AI Requests
                        </span>
                      </div>

                      <span className="shrink-0 text-xs font-semibold text-white sm:text-sm">
                        {aiRequests.toLocaleString()}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/5">
                      <div className="h-full w-full rounded-full bg-gradient-to-r from-pink-500 to-rose-400" />
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
          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:gap-6
              xl:grid-cols-2
            "
          >
            {Array.from({ length: 4 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="
                    h-[320px]
                    animate-pulse
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    p-4
                    backdrop-blur-xl
                    sm:h-[340px]
                    sm:rounded-3xl
                    sm:p-6
                  "
                >
                  <div className="h-4 w-28 rounded bg-white/10 sm:w-32" />

                  <div className="mt-3 h-3 w-40 rounded bg-white/5 sm:w-48" />

                  <div className="mt-8 h-52 rounded-2xl bg-white/[0.03] sm:h-56" />
                </div>
              )
            )}
          </div>
        )}

        {/* ====================================================
            NO DATA STATE
        ==================================================== */}

        {!loading && !analytics && !error && (
          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/[0.04]
              p-8
              text-center
              backdrop-blur-xl
              sm:rounded-3xl
              sm:p-10
            "
          >
            <div
              className="
                mx-auto
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/5
              "
            >
              <FiBarChart2 className="text-2xl text-slate-500" />
            </div>

            <h3 className="font-semibold text-white">
              No analytics data
            </h3>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Analytics data is currently unavailable.
            </p>

            <button
              type="button"
              onClick={fetchAnalytics}
              className="
                mt-5
                inline-flex
                min-h-10
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-blue-400/20
                bg-blue-500/10
                px-4
                py-2.5
                text-sm
                text-blue-300
                transition
                hover:bg-blue-500/20
              "
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