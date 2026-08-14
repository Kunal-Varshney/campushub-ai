// ============================================================
// CAMPUSHUB AI — USER CONTROLLER
// ============================================================

import User from "../models/User.js";
import AIUsage from "../models/AIUsage.js";
import Note from "../models/note.js";
import Roadmap from "../models/Roadmap.js";
import Resume from "../models/Resume.js";
import InternshipApplication from "../models/internshipApplication.model.js";
import Certificate from "../models/Certificate.js";
import Notification from "../models/Notification.js";

// ============================================================
// HELPER — GET INDIA DATE KEY
// ============================================================

function getIndiaDateKey(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
  }).format(new Date(date));
}

// ============================================================
// HELPER — CALCULATE CURRENT ACTIVITY STREAK
// ============================================================

function calculateStreak(dates = []) {
  if (!Array.isArray(dates) || dates.length === 0) {
    return 0;
  }

  const uniqueDates = [
    ...new Set(
      dates
        .filter(Boolean)
        .map((date) => getIndiaDateKey(date))
    ),
  ].sort((a, b) => new Date(b) - new Date(a));

  if (uniqueDates.length === 0) {
    return 0;
  }

  const today = getIndiaDateKey(new Date());

  const yesterdayDate = new Date();
  yesterdayDate.setDate(
    yesterdayDate.getDate() - 1
  );

  const yesterday =
    getIndiaDateKey(yesterdayDate);

  let currentDate;

  // If user was active today, start from today.
  // Otherwise allow yesterday to continue the streak.
  if (uniqueDates.includes(today)) {
    currentDate = new Date();
  } else if (uniqueDates.includes(yesterday)) {
    currentDate = yesterdayDate;
  } else {
    return 0;
  }

  let streak = 0;

  for (let i = 0; i < uniqueDates.length; i++) {
    const expectedDate =
      getIndiaDateKey(currentDate);

    if (uniqueDates.includes(expectedDate)) {
      streak++;

      currentDate.setDate(
        currentDate.getDate() - 1
      );
    } else {
      break;
    }
  }

  return streak;
}

// ============================================================
// GET USER PROFILE
// GET /api/user/profile
// ============================================================

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// UPDATE USER PROFILE
// PUT /api/user/profile
// ============================================================

export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      college,
      branch,
      year,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        college,
        branch,
        year,
      },
      {
        new: true,
        runValidators: true,
      }
    )
      .select("-password")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully 🚀",
      user,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// GET DASHBOARD DATA
// GET /api/user/dashboard
// ============================================================

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // ========================================================
    // GET USER
    // ========================================================

    const user = await User.findById(userId)
      .select("-password")
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ========================================================
    // FETCH DASHBOARD DATA
    // ========================================================

    const [
      aiUsageCount,
      notesCount,
      roadmapCount,
      resumeCount,
      internshipCount,
      certificateCount,
      unreadNotifications,
      recentAI,
      recentNotifications,
      latestRoadmap,
      allAIActivity,
      allNotificationActivity,
    ] = await Promise.all([
      // ------------------------------------------------------
      // AI QUESTIONS
      // ------------------------------------------------------

      AIUsage.countDocuments({
        userId,
      }),

      // ------------------------------------------------------
      // NOTES
      // ------------------------------------------------------

      Note.countDocuments({
        uploadedBy: userId,
      }),

      // ------------------------------------------------------
      // ROADMAPS
      // ------------------------------------------------------

      Roadmap.countDocuments({
        user: userId,
      }),

      // ------------------------------------------------------
      // RESUMES
      // ------------------------------------------------------

      Resume.countDocuments({
        user: userId,
      }),

      // ------------------------------------------------------
      // INTERNSHIP APPLICATIONS
      // ------------------------------------------------------

      InternshipApplication.countDocuments({
        user: userId,
      }),

      // ------------------------------------------------------
      // CERTIFICATES
      // ------------------------------------------------------

      Certificate.countDocuments({
        user: userId,
      }),

      // ------------------------------------------------------
      // UNREAD NOTIFICATIONS
      // ------------------------------------------------------

      Notification.countDocuments({
        user: userId,
        isRead: false,
      }),

      // ------------------------------------------------------
      // RECENT AI
      // ------------------------------------------------------

      AIUsage.find({
        userId,
      })
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .select(
          "question category createdAt"
        )
        .lean(),

      // ------------------------------------------------------
      // RECENT NOTIFICATIONS
      // ------------------------------------------------------

      Notification.find({
        user: userId,
      })
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .select(
          "title message type link isRead createdAt"
        )
        .lean(),

      // ------------------------------------------------------
      // LATEST ROADMAP
      // ------------------------------------------------------

      Roadmap.findOne({
        user: userId,
      })
        .sort({
          updatedAt: -1,
        })
        .lean(),

      // ------------------------------------------------------
      // ALL AI ACTIVITY FOR STREAK
      // ------------------------------------------------------

      AIUsage.find({
        userId,
      })
        .select("createdAt")
        .lean(),

      // ------------------------------------------------------
      // ALL NOTIFICATION ACTIVITY FOR STREAK
      // ------------------------------------------------------

      Notification.find({
        user: userId,
      })
        .select("createdAt")
        .lean(),
    ]);

    // ========================================================
    // PROFILE STRENGTH
    // ========================================================

    let profileStrength = 20;

    if (user.name) {
      profileStrength += 15;
    }

    if (user.email) {
      profileStrength += 15;
    }

    if (user.college) {
      profileStrength += 15;
    }

    if (user.branch) {
      profileStrength += 10;
    }

    if (user.year) {
      profileStrength += 10;
    }

    if (user.avatar) {
      profileStrength += 10;
    }

    profileStrength = Math.min(
      profileStrength,
      100
    );

    // ========================================================
    // ROADMAP PROGRESS
    // ========================================================

    let roadmapProgress = 0;
    let totalRoadmapSteps = 0;
    let completedRoadmapSteps = 0;

    if (
      latestRoadmap &&
      Array.isArray(
        latestRoadmap.roadmapSteps
      ) &&
      latestRoadmap.roadmapSteps.length > 0
    ) {
      const steps =
        latestRoadmap.roadmapSteps;

      totalRoadmapSteps =
        steps.length;

      completedRoadmapSteps =
        steps.filter(
          (step) =>
            step.status ===
            "completed"
        ).length;

      const totalProgress =
        steps.reduce(
          (total, step) =>
            total +
            Number(
              step.progress || 0
            ),
          0
        );

      roadmapProgress =
        Math.round(
          totalProgress /
            steps.length
        );
    }

    // ========================================================
    // LEARNING STREAK
    // ========================================================

    const activityDates = [
      ...allAIActivity.map(
        (item) => item.createdAt
      ),

      ...allNotificationActivity.map(
        (item) => item.createdAt
      ),

      // Roadmap update also counts as activity.
      ...(latestRoadmap?.updatedAt
        ? [latestRoadmap.updatedAt]
        : []),
    ];

    const learningStreak =
      calculateStreak(
        activityDates
      );

    // ========================================================
    // ACHIEVEMENTS
    // ========================================================

    // Each completed roadmap step represents
    // a completed learning milestone.

    const achievements =
      completedRoadmapSteps;

    // ========================================================
    // SKILLS
    // ========================================================

    const skillsCompleted =
      completedRoadmapSteps;

    const totalSkills =
      totalRoadmapSteps;

    // ========================================================
    // GOALS
    // ========================================================

    const goalsCompleted =
      completedRoadmapSteps;

    const totalGoals =
      totalRoadmapSteps;

    // ========================================================
    // LEARNING DATA
    // ========================================================

    let learning = null;

    if (latestRoadmap) {
      learning = {
        title:
          `${latestRoadmap.career} Roadmap`,

        name:
          latestRoadmap.career,

        course:
          latestRoadmap.career,

        career:
          latestRoadmap.career,

        level:
          latestRoadmap.level,

        progress:
          roadmapProgress,

        completion:
          roadmapProgress,

        roadmapId:
          latestRoadmap._id,

        totalSteps:
          totalRoadmapSteps,

        completedSteps:
          completedRoadmapSteps,

        route:
          "/skill-roadmap",
      };
    }

    // ========================================================
    // RECENT ACTIVITIES
    // ========================================================

    const activities = [];

    // --------------------------------------------------------
    // AI ACTIVITIES
    // --------------------------------------------------------

    recentAI.forEach((item) => {
      activities.push({
        id: item._id,

        type: "ai",

        title:
          "Asked CampusHub AI",

        description:
          item.question ||
          "Asked CampusHub AI a question",

        category:
          item.category ||
          "General",

        createdAt:
          item.createdAt,

        time:
          item.createdAt,

        link:
          "/ai-assistant",
      });
    });

    // --------------------------------------------------------
    // NOTIFICATION ACTIVITIES
    // --------------------------------------------------------

    recentNotifications.forEach(
      (item) => {
        activities.push({
          id: item._id,

          type:
            item.type ||
            "system",

          title:
            item.title,

          description:
            item.message,

          createdAt:
            item.createdAt,

          time:
            item.createdAt,

          isRead:
            item.isRead,

          link:
            item.link || "",
        });
      }
    );

    // ========================================================
    // SORT ACTIVITIES
    // ========================================================

    activities.sort(
      (a, b) =>
        new Date(
          b.createdAt || 0
        ) -
        new Date(
          a.createdAt || 0
        )
    );

    const latestActivities =
      activities.slice(0, 10);

    // ========================================================
    // DASHBOARD RESPONSE
    // ========================================================

    return res.status(200).json({
      success: true,

      dashboard: {
        // ====================================================
        // USER
        // ====================================================

        user: {
          _id:
            user._id,

          name:
            user.name,

          email:
            user.email,

          avatar:
            user.avatar || "",

          college:
            user.college || "",

          branch:
            user.branch || "",

          year:
            user.year || "",

          profileStrength,
        },

        // ====================================================
        // DASHBOARD STATS
        // ====================================================

        stats: {
          // Learning
          learningProgress:
            roadmapProgress,

          // Skills
          skillsCompleted,
          totalSkills,

          // Streak
          streak:
            learningStreak,

          // Achievements
          achievements,

          // Goals
          goalsCompleted,
          totalGoals,

          // Existing platform stats
          aiQuestions:
            aiUsageCount,

          notes:
            notesCount,

          internships:
            internshipCount,

          certificates:
            certificateCount,

          roadmaps:
            roadmapCount,

          resumes:
            resumeCount,
        },

        // ====================================================
        // LEARNING
        // ====================================================

        learning,

        // ====================================================
        // OVERVIEW
        // ====================================================

        overview: {
          roadmaps:
            roadmapCount,

          resumes:
            resumeCount,

          aiQuestions:
            aiUsageCount,

          notes:
            notesCount,

          internships:
            internshipCount,

          certificates:
            certificateCount,

          learningProgress:
            roadmapProgress,

          skillsCompleted,

          totalSkills,

          streak:
            learningStreak,

          achievements,
        },

        // ====================================================
        // NOTIFICATIONS
        // ====================================================

        notifications: {
          unreadCount:
            unreadNotifications,

          latest:
            recentNotifications,
        },

        // ====================================================
        // ACTIVITIES
        // ====================================================

        activities:
          latestActivities,
      },
    });
  } catch (error) {
    console.error(
      "Dashboard Error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to load dashboard data",

      error:
        error.message,
    });
  }
};