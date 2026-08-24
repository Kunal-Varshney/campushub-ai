// src/pages/StudentDashboard.jsx

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  BookOpen,
  FileText,
  ArrowRight,
  Clock,
  RefreshCw,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";
import DashboardCards from "../../components/Dashboard/DashboardCards";
import AIAssistant from "../../components/Dashboard/AIAssistant";

import API from "../../services/api";

// ============================================================
// SAVED NOTES CARD
// ============================================================

function SavedNotesCard({ notes, loading, onRefresh }) {
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return "";

    try {
      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) {
        return "";
      }

      return parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  // ----------------------------------------------------------
  // ONLY USER-SAVED NOTES
  // ----------------------------------------------------------

  const savedNotes = Array.isArray(notes) ? notes : [];

  // Dashboard preview limit only.
  // This is NOT "latest notes".
  const displayedNotes = savedNotes.slice(0, 6);

  // ----------------------------------------------------------
  // OPEN SAVED NOTE
  // ----------------------------------------------------------

  const handleOpenNote = (note) => {
    if (!note) return;

    const noteId =
      note?._id ||
      note?.id ||
      note?.noteId;

    if (!noteId) {
      console.error("Saved note does not have an ID:", note);
      return;
    }

    // Send the exact saved note to Smart Notes.
    navigate("/smart-notes", {
      state: {
        savedNote: note,
      },
    });
  };

  return (
    <section className="min-w-0 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-xl">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
            <BookOpen size={21} />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-white">
              Saved Notes
            </h2>

            <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
              Notes you saved for future learning
            </p>
          </div>

          <span className="shrink-0 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-400">
            {savedNotes.length}
          </span>
        </div>

        {/* REFRESH */}

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="group inline-flex w-fit items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs font-semibold text-gray-400 transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={loading ? "animate-spin" : ""}
          />

          <span>
            {loading ? "Refreshing..." : "Refresh"}
          </span>
        </button>
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div className="p-4 sm:p-6">
        {/* LOADING */}

        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-800" />

                  <div className="min-w-0 flex-1">
                    <div className="h-4 w-3/4 rounded bg-slate-800" />

                    <div className="mt-3 h-3 w-1/2 rounded bg-slate-800" />

                    <div className="mt-3 h-3 w-1/3 rounded bg-slate-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : displayedNotes.length === 0 ? (
          /* ====================================================
             EMPTY STATE
          ==================================================== */

          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 px-5 py-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-gray-500">
              <FileText size={24} />
            </div>

            <h3 className="mt-4 text-base font-semibold text-gray-200">
              No saved notes yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Generate notes from Smart Notes and click Save Note.
              Your saved notes will appear here for future access.
            </p>

            <Link
              to="/smart-notes"
              className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-cyan-400 transition-all duration-300 hover:bg-cyan-500/20 hover:text-cyan-300"
            >
              Create Notes

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        ) : (
          /* ====================================================
             SAVED NOTES
          ==================================================== */

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {displayedNotes.map((note) => {
              const noteId =
                note?._id ||
                note?.id ||
                note?.noteId;

              const title =
                note?.title ||
                "Untitled Note";

              const subject =
                note?.subject ||
                note?.category ||
                "General";

              const summary =
                note?.summary ||
                note?.description ||
                note?.topic ||
                "Saved study note";

              return (
                <button
                  type="button"
                  key={noteId || `${note.title}-${note.createdAt}`}
                  onClick={() => {
                    navigate("/smart-notes", {
                      state: {
                        savedNote: note,
                      },
                    });
                  }}
                  className="group w-full min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/50 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-slate-950 hover:shadow-lg hover:shadow-cyan-950/10"
                >
                  {/* TOP */}

                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-cyan-500/10 group-hover:text-cyan-400">
                      <FileText size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-sm font-semibold leading-5 text-gray-200 transition-colors group-hover:text-white">
                        {title}
                      </h3>

                      <p className="mt-1 truncate text-xs text-gray-500">
                        {subject}
                      </p>
                    </div>

                    <ChevronRight
                      size={17}
                      className="mt-1 shrink-0 text-gray-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400"
                    />
                  </div>

                  {/* SUMMARY */}

                  <p className="mt-4 line-clamp-2 text-xs leading-5 text-gray-500">
                    {summary}
                  </p>

                  {/* FOOTER */}

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-800 pt-4">
                    <div className="flex min-w-0 items-center gap-1.5 text-[11px] text-gray-600">
                      <Clock
                        size={12}
                        className="shrink-0"
                      />

                      <span className="truncate">
                        {formatDate(
                          note?.createdAt ||
                            note?.updatedAt
                        ) || "Recently saved"}
                      </span>
                    </div>

                    <span className="shrink-0 rounded-full border border-green-500/20 bg-green-500/5 px-2 py-1 text-[10px] font-medium text-green-400">
                      Saved
                    </span>
                  </div>

                  {/* OPEN TEXT */}

                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-cyan-500 opacity-70 transition-opacity group-hover:opacity-100">
                    Read saved note
                    <ArrowRight size={13} />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ======================================================
          MORE SAVED NOTES
      ====================================================== */}

      {savedNotes.length > 6 && !loading && (
        <div className="border-t border-slate-800 p-4 sm:p-5">
          <p className="text-center text-xs text-gray-500">
            Showing 6 of {savedNotes.length} saved notes.
            Use Smart Notes to access your saved notes.
          </p>
        </div>
      )}
    </section>
  );
}

// ============================================================
// TIME CONTEXT
// ============================================================

function getTimeContext() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      label: "Morning",
      title: "Build your momentum",
      message:
        "Start with one useful task and let CampusHub AI guide you.",
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      label: "Afternoon",
      title: "Keep the momentum going",
      message:
        "Use your time wisely and move one step closer to your goals.",
    };
  }

  if (hour >= 17 && hour < 21) {
    return {
      label: "Evening",
      title: "Make your evening count",
      message:
        "A focused learning session today can change your tomorrow.",
    };
  }

  return {
    label: "Night",
    title: "Small progress still matters",
    message:
      "Review, plan your next move and get ready for tomorrow.",
  };
}

// ============================================================
// STUDENT DASHBOARD
// ============================================================

function StudentDashboard() {
  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [savedNotes, setSavedNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(true);

  // ==========================================================
  // TIME CONTEXT
  // ==========================================================

  const timeContext = useMemo(
    () => getTimeContext(),
    []
  );

  // ==========================================================
  // FETCH SAVED NOTES
  // ==========================================================

  const fetchSavedNotes = useCallback(async () => {
    try {
      setNotesLoading(true);

      const response = await API.get("/notes");

      console.log(
        "STUDENT DASHBOARD - SAVED NOTES:",
        response.data
      );

      if (response?.data?.success) {
        const notes = Array.isArray(
          response?.data?.notes
        )
          ? response.data.notes
          : [];

        setSavedNotes(notes);
      } else {
        setSavedNotes([]);
      }
    } catch (err) {
      console.error(
        "Student Dashboard Saved Notes Error:",
        err?.response?.data ||
          err?.message
      );

      setSavedNotes([]);
    } finally {
      setNotesLoading(false);
    }
  }, []);

  // ==========================================================
  // INITIAL SAVED NOTES FETCH
  // ==========================================================

  useEffect(() => {
    fetchSavedNotes();
  }, [fetchSavedNotes]);

  // ==========================================================
  // REFRESH NOTES WHEN USER RETURNS
  // ==========================================================

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        document.visibilityState ===
        "visible"
      ) {
        fetchSavedNotes();
      }
    };

    const handleWindowFocus = () => {
      fetchSavedNotes();
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    window.addEventListener(
      "focus",
      handleWindowFocus
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.removeEventListener(
        "focus",
        handleWindowFocus
      );
    };
  }, [fetchSavedNotes]);

  // ==========================================================
  // FETCH DASHBOARD DATA
  // ==========================================================

  useEffect(() => {
    let mounted = true;

    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(
          "/user/dashboard"
        );

        console.log(
          "STUDENT DASHBOARD DATA:",
          response.data
        );

        if (!mounted) return;

        if (response?.data?.success) {
          const dashboard =
            response?.data?.dashboard || {};

          setDashboardData({
            ...dashboard,

            user:
              dashboard?.user &&
              typeof dashboard.user ===
                "object"
                ? dashboard.user
                : {},

            stats:
              dashboard?.stats &&
              typeof dashboard.stats ===
                "object"
                ? dashboard.stats
                : {},

            overview:
              dashboard?.overview &&
              typeof dashboard.overview ===
                "object"
                ? dashboard.overview
                : {},

            learning:
              dashboard?.learning ||
              null,

            activities:
              Array.isArray(
                dashboard?.activities
              )
                ? dashboard.activities
                : [],

            notifications:
              dashboard?.notifications &&
              typeof dashboard.notifications ===
                "object"
                ? dashboard.notifications
                : {
                    unreadCount: 0,
                    latest: [],
                  },
          });
        } else {
          setError(
            response?.data?.message ||
              "Unable to load dashboard data."
          );
        }
      } catch (err) {
        console.error(
          "Student Dashboard Error:",
          err
        );

        if (!mounted) return;

        setError(
          err?.response?.data?.message ||
            "Unable to connect to dashboard server."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  // ==========================================================
  // LOADING STATE
  // ==========================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-cyan-400" />

          <p className="mt-4 text-sm text-gray-400">
            Preparing your workspace...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // SAFE DASHBOARD DATA
  // ==========================================================

  const safeDashboardData = {
    user: {
      name: "Student",
      email: "",
      college: "",
      branch: "",
      year: "",
      avatar: "",
      profileStrength: 0,

      ...(dashboardData?.user || {}),
    },

    stats:
      dashboardData?.stats &&
      typeof dashboardData.stats ===
        "object"
        ? dashboardData.stats
        : {},

    learning:
      dashboardData?.learning ||
      null,

    overview:
      dashboardData?.overview &&
      typeof dashboardData.overview ===
        "object"
        ? dashboardData.overview
        : {},

    activities:
      Array.isArray(
        dashboardData?.activities
      )
        ? dashboardData.activities
        : [],

    notifications:
      dashboardData?.notifications &&
      typeof dashboardData.notifications ===
        "object"
        ? dashboardData.notifications
        : {
            unreadCount: 0,
            latest: [],
          },
  };

  const user =
    safeDashboardData.user;

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex">
        {/* ====================================================
            SIDEBAR
        ==================================================== */}

        <Sidebar />

        <div className="min-w-0 flex-1">
          {/* ==================================================
              TOPBAR
          ================================================== */}

          <Topbar user={user} />

          <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
            {/* =================================================
                PERSONALIZED HERO
            ================================================= */}

            <section className="relative mb-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />

              <div className="relative max-w-3xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                  <Sparkles size={13} />

                  {timeContext.label} mode
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {timeContext.title}

                  <span className="text-cyan-400">
                    .
                  </span>
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
                  {timeContext.message}
                </p>

                {error && (
                  <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-amber-300">
                    {error}
                  </div>
                )}

                {!error && user?.name && (
                  <p className="mt-5 text-sm text-gray-500">
                    Welcome back,{" "}
                    <span className="font-medium text-gray-300">
                      {user.name}
                    </span>
                  </p>
                )}
              </div>
            </section>

            {/* =================================================
                DASHBOARD CARDS
            ================================================= */}

            <section className="min-w-0">
              <DashboardCards
                dashboardData={safeDashboardData}
              />
            </section>

            {/* =================================================
                SAVED NOTES
            ================================================= */}

            <section className="mt-8 min-w-0">
              <SavedNotesCard
                notes={savedNotes}
                loading={notesLoading}
                onRefresh={fetchSavedNotes}
              />
            </section>

            {/* =================================================
                AI COMMAND CENTER
            ================================================= */}

            <section className="mt-8 min-w-0">
              <AIAssistant />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;