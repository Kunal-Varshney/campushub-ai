import User from "../models/User.js";
import Note from "../models/note.js";
import DownloadHistory from "../models/DownloadHistory.js";
import AIUsage from "../models/AIUsage.js";

/* ============================================================
   DASHBOARD STATS
   ============================================================ */

const getAdminStats = async (req, res) => {
  try {
    const [totalUsers, students, admins, totalNotes] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "student" }),
      User.countDocuments({ role: { $in: ["admin", "moderator"] } }),
      Note.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        students,
        admins,
        totalNotes,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================
   USER MANAGEMENT
   ============================================================ */

// GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const {
      search = "",
      role = "",
      status = "",
      page = 1,
      limit = 100,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (role) {
      query.role = role;
    }

    if (status === "blocked") {
      query.isBlocked = true;
    }

    if (status === "active") {
      query.isBlocked = false;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [users, totalUsers] = await Promise.all([
      User.find(query)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),

      User.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      totalUsers,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/admin/users/:id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PATCH /api/admin/users/:id/block
const blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User blocked",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PATCH /api/admin/users/:id/unblock
const unblockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User unblocked",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /api/admin/users/:id
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/admin/users/:id/activity
const getUserActivity = async (req, res) => {
  try {
    const userId = req.params.id;

    const [
      downloadCount,
      aiQueryCount,
      recentDownloads,
      recentQueries,
    ] = await Promise.all([
      DownloadHistory.countDocuments({
        userId,
      }),

      AIUsage.countDocuments({
        userId,
      }),

      DownloadHistory.find({
        userId,
      })
        .sort({
          downloadedAt: -1,
        })
        .limit(5),

      AIUsage.find({
        userId,
      })
        .sort({
          createdAt: -1,
        })
        .limit(5),
    ]);

    res.status(200).json({
      success: true,
      activity: {
        downloadCount,
        aiQueryCount,
        recentDownloads,
        recentQueries,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================
   NOTES MANAGEMENT
   ============================================================ */

// GET /api/admin/notes
const getAllNotes = async (req, res) => {
  try {
    const {
      search = "",
      category = "",
      status = "",
    } = req.query;

    const query = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    const notes = await Note.find(query)
      .populate("uploadedBy", "name email")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PATCH /api/admin/notes/:id/approve
const approveNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        status: "approved",
      },
      {
        new: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note approved",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PATCH /api/admin/notes/:id/reject
const rejectNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected",
      },
      {
        new: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note rejected",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PUT /api/admin/notes/:id
const updateNote = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
    } = req.body;

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated",
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /api/admin/notes/:id
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/admin/notes/categories
const getNoteCategories = async (req, res) => {
  res.status(200).json({
    success: true,
    categories: [
      "DSA",
      "Machine Learning",
      "DBMS",
      "Web Development",
      "Programming",
    ],
  });
};

/* ============================================================
   DOWNLOAD TRACKING
   ============================================================ */

// POST /api/notes/:id/download
const recordNoteDownload = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    await DownloadHistory.create({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      noteId: note._id,
      noteTitle: note.title,
      category: note.category,
    });

    note.downloads += 1;

    await note.save();

    res.status(200).json({
      success: true,
      message: "Download recorded",
      fileUrl: note.fileUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/admin/download-history
const getDownloadHistory = async (req, res) => {
  try {
    const {
      userSearch = "",
      noteSearch = "",
      from = "",
      to = "",
    } = req.query;

    const query = {};

    if (userSearch) {
      query.$or = [
        {
          userName: {
            $regex: userSearch,
            $options: "i",
          },
        },
        {
          userEmail: {
            $regex: userSearch,
            $options: "i",
          },
        },
      ];
    }

    if (noteSearch) {
      query.noteTitle = {
        $regex: noteSearch,
        $options: "i",
      };
    }

    if (from || to) {
      query.downloadedAt = {};

      if (from) {
        query.downloadedAt.$gte = new Date(from);
      }

      if (to) {
        query.downloadedAt.$lte = new Date(to);
      }
    }

    const [
      downloads,
      totalDownloads,
    ] = await Promise.all([
      DownloadHistory.find(query).sort({
        downloadedAt: -1,
      }),

      DownloadHistory.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      totalDownloads,
      downloads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================
   ANALYTICS
   ============================================================ */

// GET /api/admin/analytics
const getAnalytics = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();

    thirtyDaysAgo.setDate(
      thirtyDaysAgo.getDate() - 30
    );

    const [
      totalUsers,
      totalNotes,
      totalDownloads,
      aiRequests,
      activeUsers,
    ] = await Promise.all([
      User.countDocuments(),

      Note.countDocuments(),

      DownloadHistory.countDocuments(),

      AIUsage.countDocuments(),

      DownloadHistory.distinct(
        "userId",
        {
          downloadedAt: {
            $gte: thirtyDaysAgo,
          },
        }
      ),
    ]);

    const userGrowthRaw = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: thirtyDaysAgo,
          },
        },
      },

      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },

          count: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const downloadGrowthRaw =
      await DownloadHistory.aggregate([
        {
          $match: {
            downloadedAt: {
              $gte: thirtyDaysAgo,
            },
          },
        },

        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$downloadedAt",
              },
            },

            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            _id: 1,
          },
        },
      ]);

    const popularNotesRaw = await Note.find()
      .sort({
        downloads: -1,
      })
      .limit(5)
      .select("title downloads category");

    res.status(200).json({
      success: true,

      analytics: {
        totalUsers,
        totalNotes,
        totalDownloads,
        activeUsers: activeUsers.length,
        aiRequests,

        userGrowth: userGrowthRaw.map(
          (d) => ({
            date: d._id,
            count: d.count,
          })
        ),

        downloadGrowth:
          downloadGrowthRaw.map(
            (d) => ({
              date: d._id,
              count: d.count,
            })
          ),

        popularNotes:
          popularNotesRaw.map(
            (n) => ({
              title: n.title,
              downloads: n.downloads,
              category: n.category,
            })
          ),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================
   AI ASSISTANT MONITORING
   ============================================================ */

// GET /api/admin/ai-usage
const getAIUsage = async (req, res) => {
  try {
    const {
      search = "",
      category = "",
    } = req.query;

    const query = {};

    if (search) {
      query.question = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    const [
      queries,
      totalQueries,
      uniqueUsers,
      popularTopicsRaw,
    ] = await Promise.all([
      AIUsage.find(query)
        .populate("userId", "name email")
        .sort({
          createdAt: -1,
        })
        .limit(50),

      AIUsage.countDocuments(),

      AIUsage.distinct("userId"),

      AIUsage.aggregate([
        {
          $group: {
            _id: "$category",
            count: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            count: -1,
          },
        },

        {
          $limit: 6,
        },
      ]),
    ]);

    res.status(200).json({
      success: true,
      totalQueries,
      uniqueUsers: uniqueUsers.length,

      popularTopics:
        popularTopicsRaw.map(
          (t) => ({
            topic: t._id || "General",
            count: t.count,
          })
        ),

      queries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================
   PERMISSIONS
   ============================================================ */

// PATCH /api/admin/users/:id/permissions
const updateUserPermissions = async (req, res) => {
  try {
    const {
      manageUsers,
      manageNotes,
      viewAnalytics,
      role,
    } = req.body;

    const update = {
      permissions: {
        manageUsers: !!manageUsers,
        manageNotes: !!manageNotes,
        viewAnalytics: !!viewAnalytics,
      },
    };

    if (role) {
      update.role = role;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      update,
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

    res.status(200).json({
      success: true,
      message: "Permissions updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ============================================================
   EXPORTS
   ============================================================ */

export {
  getAdminStats,
  getAllUsers,
  getUserById,
  blockUser,
  unblockUser,
  deleteUser,
  getUserActivity,
  getAllNotes,
  approveNote,
  rejectNote,
  updateNote,
  deleteNote,
  getNoteCategories,
  recordNoteDownload,
  getDownloadHistory,
  getAnalytics,
  getAIUsage,
  updateUserPermissions,
};