import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiCpu,
  FiUsers,
  FiTrendingUp,
  FiMessageSquare,
  FiRefreshCw,
  FiAlertCircle,
  FiActivity,
} from "react-icons/fi";

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

// ============================================================
// TOOLTIP
// ============================================================

const tooltipStyle = {
  backgroundColor: "rgba(15, 23, 42, 0.96)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#fff",
  fontSize: "12px",
};

// ============================================================
// DATE FORMATTER
// ============================================================

const formatDate = (dateString) => {
  if (!dateString) return "—";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ============================================================
// STAT CARD
// ============================================================

const StatCard = ({
  label,
  value,
  icon: Icon,
  gradient,
  description,
}) => {
  return (
    <div className="relative rounded-3xl p-[1px] overflow-hidden group">
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
      />

      <div className="relative h-full rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/10 p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-slate-400 text-xs font-medium">
              {label}
            </p>

            <p className="text-white text-2xl sm:text-3xl font-bold mt-1 truncate">
              {value}
            </p>

            {description && (
              <p className="text-slate-500 text-xs mt-1 truncate">
                {description}
              </p>
            )}
          </div>

          <div
            className={`flex items-center justify-center h-11 w-11 rounded-2xl bg-gradient-to-br ${gradient} text-white shrink-0 shadow-lg`}
          >
            <Icon className="text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SKELETON
// ============================================================

const StatSkeleton = () => (
  <div className="h-28 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl animate-pulse" />
);

// ============================================================
// AI ANALYTICS
// ============================================================

const AIAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // ==========================================================
  // FETCH DATA
  // ==========================================================

  const fetchData = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const res = await getAIUsage();

      if (res?.success) {
        setData({
          totalQueries: Number(res.totalQueries || 0),
          uniqueUsers: Number(res.uniqueUsers || 0),
          popularTopics: Array.isArray(res.popularTopics)
            ? res.popularTopics
            : [],
          queries: Array.isArray(res.queries)
            ? res.queries
            : [],
        });
      } else {
        setError(
          res?.message ||
            "Failed to load AI usage data."
        );
      }
    } catch (err) {
      console.error("AI Analytics Fetch Error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load AI usage data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ==========================================================
  // NORMALIZE TOPICS
  // ==========================================================

  const popularTopics = useMemo(() => {
    if (!Array.isArray(data?.popularTopics)) {
      return [];
    }

    return data.popularTopics
      .map((item) => ({
        topic: String(
          item?.topic ||
            item?.name ||
            item?._id ||
            "Unknown"
        ),
        count: Number(
          item?.count ||
            item?.queries ||
            item?.total ||
            0
        ),
      }))
      .filter((item) => item.count >= 0)
      .slice(0, 10);
  }, [data]);

  // ==========================================================
  // RECENT QUESTIONS
  // ==========================================================

  const recentQueries = useMemo(() => {
    if (!Array.isArray(data?.queries)) {
      return [];
    }

    return data.queries.slice(0, 30);
  }, [data]);

  // ==========================================================
  // TOP TOPIC
  // ==========================================================

  const topTopic = popularTopics[0]?.topic || "—";

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen w-full bg-slate-950 relative overflow-hidden">
      {/* ======================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />

        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <main className="relative z-10 px-4 sm:px-6 lg:px-10 py-8 max-w-[1600px] mx-auto">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-11 w-11 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/20">
                <FiCpu className="text-lg" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  AI Assistant Analytics
                </h1>

                <p className="text-slate-400 text-sm sm:text-base mt-1">
                  Monitor how students are using the AI assistant
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => fetchData(true)}
            disabled={loading || refreshing}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-sm font-medium hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <FiRefreshCw
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* ====================================================
            ERROR
        ==================================================== */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 backdrop-blur-xl px-5 py-4">
            <div className="flex items-start gap-3">
              <FiAlertCircle className="text-red-400 text-lg mt-0.5 shrink-0" />

              <div className="min-w-0">
                <p className="text-red-300 text-sm font-semibold">
                  Unable to load AI analytics
                </p>

                <p className="text-red-300/70 text-xs mt-1">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================
            STAT CARDS
        ==================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <StatSkeleton key={index} />
            ))
          ) : (
            <>
              <StatCard
                label="Total AI Queries"
                value={data?.totalQueries ?? 0}
                icon={FiCpu}
                gradient="from-pink-500 to-rose-400"
                description="Total questions asked"
              />

              <StatCard
                label="Unique Users"
                value={data?.uniqueUsers ?? 0}
                icon={FiUsers}
                gradient="from-blue-500 to-cyan-400"
                description="Students using AI"
              />

              <StatCard
                label="Top Topic"
                value={topTopic}
                icon={FiTrendingUp}
                gradient="from-purple-500 to-fuchsia-400"
                description="Most discussed topic"
              />
            </>
          )}
        </div>

        {/* ====================================================
            MAIN CONTENT
        ==================================================== */}

        {!loading && data && (
          <>
            {popularTopics.length === 0 &&
            recentQueries.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-white/5 border border-white/10 text-slate-500 mb-4">
                    <FiActivity className="text-2xl" />
                  </div>

                  <h3 className="text-white font-semibold text-lg">
                    No AI activity yet
                  </h3>

                  <p className="text-slate-500 text-sm mt-2 max-w-md">
                    AI usage statistics will appear here once
                    students start asking questions to the AI
                    assistant.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-6">
                {/* ==============================================
                    POPULAR TOPICS
                ============================================== */}

                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-white font-semibold text-base">
                        Popular Topics
                      </h3>

                      <p className="text-slate-500 text-xs mt-1">
                        Most requested AI topics
                      </p>
                    </div>

                    <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-pink-500/10 text-pink-300">
                      <FiTrendingUp />
                    </div>
                  </div>

                  {popularTopics.length === 0 ? (
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-slate-500 text-sm">
                        No topic data available.
                      </p>
                    </div>
                  ) : (
                    <div className="h-64">
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                      >
                        <BarChart
                          data={popularTopics}
                          layout="vertical"
                          margin={{
                            top: 5,
                            right: 10,
                            bottom: 5,
                            left: 5,
                          }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.05)"
                          />

                          <XAxis
                            type="number"
                            stroke="#64748b"
                            fontSize={11}
                            allowDecimals={false}
                          />

                          <YAxis
                            dataKey="topic"
                            type="category"
                            stroke="#64748b"
                            fontSize={10}
                            width={100}
                            tickFormatter={(value) =>
                              value?.length > 16
                                ? `${value.slice(0, 16)}…`
                                : value
                            }
                          />

                          <Tooltip
                            contentStyle={tooltipStyle}
                            cursor={{
                              fill: "rgba(255,255,255,0.03)",
                            }}
                            formatter={(value) => [
                              value,
                              "Queries",
                            ]}
                          />

                          <Bar
                            dataKey="count"
                            fill="#f472b6"
                            radius={[
                              0,
                              8,
                              8,
                              0,
                            ]}
                            barSize={20}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>

                {/* ==============================================
                    RECENT QUESTIONS
                ============================================== */}

                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-white font-semibold text-base flex items-center gap-2">
                        <FiMessageSquare className="text-pink-300" />
                        Recent Questions
                      </h3>

                      <p className="text-slate-500 text-xs mt-1">
                        Latest questions asked by students
                      </p>
                    </div>

                    <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-[11px]">
                      {recentQueries.length} shown
                    </div>
                  </div>

                  {recentQueries.length === 0 ? (
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-center">
                        <FiMessageSquare className="mx-auto text-slate-600 text-2xl mb-2" />

                        <p className="text-slate-500 text-sm">
                          No AI queries yet.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                      {recentQueries.map((query, index) => {
                        const question =
                          query?.question ||
                          query?.query ||
                          query?.prompt ||
                          "No question available";

                        const userName =
                          query?.userId?.name ||
                          query?.user?.name ||
                          query?.name ||
                          "Unknown user";

                        const key =
                          query?._id ||
                          query?.id ||
                          `${question}-${index}`;

                        return (
                          <div
                            key={key}
                            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/[0.08] transition-colors duration-200"
                          >
                            <p
                              className="text-white text-sm leading-5 break-words"
                              title={question}
                            >
                              {question}
                            </p>

                            <div className="flex items-center justify-between gap-3 mt-2 flex-wrap">
                              <span className="text-slate-500 text-xs truncate max-w-[50%]">
                                {userName}
                              </span>

                              <span className="text-slate-500 text-xs shrink-0">
                                {formatDate(
                                  query?.createdAt ||
                                    query?.timestamp ||
                                    query?.date
                                )}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {/* ====================================================
            LOADING CHART AREA
        ==================================================== */}

        {loading && (
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-6">
            <div className="h-[350px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl animate-pulse" />

            <div className="h-[350px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl animate-pulse" />
          </div>
        )}
      </main>

      {/* ======================================================
          SCROLLBAR
      ====================================================== */}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.2);
          border-radius: 999px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.35);
        }
      `}</style>
    </div>
  );
};

export default AIAnalytics;