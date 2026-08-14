import User from "../models/User.js";
import Notification from "../models/Notification.js";
import AIUsage from "../models/AIUsage.js";
import Note from "../models/note.js";
import Roadmap from "../models/Roadmap.js";
import Resume from "../models/Resume.js";
import InternshipApplication from "../models/internshipApplication.model.js";


// ============================================================
// HELPER — PROFILE STRENGTH
// ============================================================

const calculateProfileStrength = (user) => {
  const fields = [
    user.name,
    user.email,
    user.college,
    user.branch,
    user.year,
  ];

  const completed = fields.filter(
    (field) => field && String(field).trim() !== ""
  ).length;

  return Math.round((completed / fields.length) * 100);
};


// ============================================================
// GET USER PROFILE
// GET /api/user/profile
// ============================================================

export const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    console.error("Get Profile Error:", error);

    res.status(500).json({
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
    ).select("-password");


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    // --------------------------------------------------------
    // PROFILE UPDATE NOTIFICATION
    // --------------------------------------------------------

    try {

      await Notification.create({
        user: user._id,

        title: "Profile Updated",

        message:
          "Your CampusHub AI profile was updated successfully.",

        type: "profile",

        link: "/profile",
      });

    } catch (notificationError) {

      console.error(
        "Profile Notification Error:",
        notificationError.message
      );

    }


    res.status(200).json({

      success: true,

      message:
        "Profile Updated Successfully 🚀",

      user,

    });

  } catch (error) {

    console.error(
      "Update Profile Error:",
      error
    );

    res.status(500).json({

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

    // ========================================================
    // USER
    // ========================================================

    const user = await User.findById(req.user.id)
      .select("-password");


    if (!user) {

      return res.status(404).json({

        success: false,

        message: "User not found",

      });

    }


    // ========================================================
    // DATABASE COUNTS
    // ========================================================

    const [
      notesCount,
      aiUsageCount,
      roadmapCount,
      resumeCount,
      internshipApplicationsCount,
      unreadNotifications,
    ] = await Promise.all([


      // ------------------------------------------------------
      // NOTES
      // ------------------------------------------------------

      Note.countDocuments({
        uploadedBy: req.user.id,
      }),


      // ------------------------------------------------------
      // AI USAGE
      // ------------------------------------------------------

      AIUsage.countDocuments({
        userId: req.user.id,
      }),


      // ------------------------------------------------------
      // ROADMAPS
      // ------------------------------------------------------

      Roadmap.countDocuments({
        user: req.user.id,
      }),


      // ------------------------------------------------------
      // RESUMES
      // ------------------------------------------------------

      Resume.countDocuments({
        user: req.user.id,
      }),


      // ------------------------------------------------------
      // INTERNSHIP APPLICATIONS
      // ------------------------------------------------------

      InternshipApplication.countDocuments({
        user: req.user.id,
      }),


      // ------------------------------------------------------
      // UNREAD NOTIFICATIONS
      // ------------------------------------------------------

      Notification.countDocuments({
        user: req.user.id,
        isRead: false,
      }),

    ]);


    // ========================================================
    // PROFILE STRENGTH
    // ========================================================

    const profileStrength =
      calculateProfileStrength(user);


    // ========================================================
    // RECENT NOTIFICATIONS / ACTIVITY
    // ========================================================

    const recentNotifications =
      await Notification.find({
        user: req.user.id,
      })
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .lean();


    const activities =
      recentNotifications.map(
        (notification) => ({

          id: notification._id,

          title: notification.title,

          message: notification.message,

          time: notification.createdAt,

          type: notification.type,

          link: notification.link,

          isRead: notification.isRead,

        })
      );


    // ========================================================
    // DASHBOARD RESPONSE
    // ========================================================

    res.status(200).json({

      success: true,

      dashboard: {


        // ====================================================
        // USER
        // ====================================================

        user: {

          name: user.name,

          email: user.email,

          college: user.college,

          branch: user.branch,

          year: user.year,

          avatar: user.avatar,

          profileStrength,

        },


        // ====================================================
        // DASHBOARD STATS
        // ====================================================

        stats: {

          notes: notesCount,

          aiSessions: aiUsageCount,

          roadmaps: roadmapCount,

          resumes: resumeCount,

          internshipApplications:
            internshipApplicationsCount,

        },


        // ====================================================
        // CONTINUE LEARNING
        // ====================================================

        learning: {

          hasStarted:
            roadmapCount > 0 || notesCount > 0,

          roadmaps:
            roadmapCount,

          notes:
            notesCount,

          message:
            roadmapCount === 0 &&
            notesCount === 0

              ? "Start your learning journey today."

              : "Keep building your skills.",

        },


        // ====================================================
        // RECENT ACTIVITY
        // ====================================================

        activities,


        // ====================================================
        // NOTIFICATIONS
        // ====================================================

        notifications: {

          unreadCount:
            unreadNotifications,

        },


        // ====================================================
        // FEATURE STATUS
        // ====================================================

        features: {

          smartNotes:
            notesCount > 0,

          aiAssistant:
            aiUsageCount > 0,

          skillRoadmap:
            roadmapCount > 0,

          resumeBuilder:
            resumeCount > 0,

          internships:
            internshipApplicationsCount > 0,

          learningStreak:
            false,

          achievements:
            false,

        },

      },

    });

  } catch (error) {

    console.error(
      "Dashboard Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};