const express = require("express");
const router = express.Router();

const {
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
  getDownloadHistory,
  getAnalytics,
  getAIUsage,
  updateUserPermissions,
} = require("../controllers/adminController");

const { isAdminOrModerator, isAdmin, checkPermission } = require("../middleware/adminMiddleware");

// NOTE: mount this router behind your existing auth middleware, e.g.:
//   const { protect } = require("../middleware/authMiddleware");
//   app.use("/api/admin", protect, adminRoutes);
// so that req.user is populated before these routes run.

router.use(isAdminOrModerator);

/* Dashboard */
router.get("/stats", getAdminStats);

/* Users */
router.get("/users", checkPermission("manageUsers"), getAllUsers);
router.get("/users/:id", checkPermission("manageUsers"), getUserById);
router.get("/users/:id/activity", checkPermission("manageUsers"), getUserActivity);
router.patch("/users/:id/block", checkPermission("manageUsers"), blockUser);
router.patch("/users/:id/unblock", checkPermission("manageUsers"), unblockUser);
router.delete("/users/:id", checkPermission("manageUsers"), deleteUser);
router.patch("/users/:id/permissions", isAdmin, updateUserPermissions);

/* Notes */
router.get("/notes", checkPermission("manageNotes"), getAllNotes);
router.get("/notes/categories", checkPermission("manageNotes"), getNoteCategories);
router.patch("/notes/:id/approve", checkPermission("manageNotes"), approveNote);
router.patch("/notes/:id/reject", checkPermission("manageNotes"), rejectNote);
router.put("/notes/:id", checkPermission("manageNotes"), updateNote);
router.delete("/notes/:id", checkPermission("manageNotes"), deleteNote);

/* Downloads */
router.get("/download-history", checkPermission("viewAnalytics"), getDownloadHistory);

/* Analytics */
router.get("/analytics", checkPermission("viewAnalytics"), getAnalytics);

/* AI Assistant monitoring */
router.get("/ai-usage", checkPermission("viewAnalytics"), getAIUsage);

module.exports = router;