import express from "express";

import {
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
} from "../controllers/admin.controller.js";

import {
  isAdminOrModerator,
  isAdmin,
  checkPermission,
} from "../middleware/admin.middleware.js";

const router = express.Router();

/* ============================================================
   ADMIN / MODERATOR ACCESS
   ============================================================ */

router.use(isAdminOrModerator);

/* ============================================================
   DASHBOARD
   ============================================================ */

router.get("/stats", getAdminStats);

/* ============================================================
   USERS
   ============================================================ */

router.get(
  "/users",
  checkPermission("manageUsers"),
  getAllUsers
);

router.get(
  "/users/:id",
  checkPermission("manageUsers"),
  getUserById
);

router.get(
  "/users/:id/activity",
  checkPermission("manageUsers"),
  getUserActivity
);

router.patch(
  "/users/:id/block",
  checkPermission("manageUsers"),
  blockUser
);

router.patch(
  "/users/:id/unblock",
  checkPermission("manageUsers"),
  unblockUser
);

router.delete(
  "/users/:id",
  checkPermission("manageUsers"),
  deleteUser
);

router.patch(
  "/users/:id/permissions",
  isAdmin,
  updateUserPermissions
);

/* ============================================================
   NOTES
   ============================================================ */

router.get(
  "/notes",
  checkPermission("manageNotes"),
  getAllNotes
);

router.get(
  "/notes/categories",
  checkPermission("manageNotes"),
  getNoteCategories
);

router.patch(
  "/notes/:id/approve",
  checkPermission("manageNotes"),
  approveNote
);

router.patch(
  "/notes/:id/reject",
  checkPermission("manageNotes"),
  rejectNote
);

router.put(
  "/notes/:id",
  checkPermission("manageNotes"),
  updateNote
);

router.delete(
  "/notes/:id",
  checkPermission("manageNotes"),
  deleteNote
);

/* ============================================================
   DOWNLOAD HISTORY
   ============================================================ */

router.get(
  "/download-history",
  checkPermission("viewAnalytics"),
  getDownloadHistory
);

/* ============================================================
   ANALYTICS
   ============================================================ */

router.get(
  "/analytics",
  checkPermission("viewAnalytics"),
  getAnalytics
);

/* ============================================================
   AI USAGE
   ============================================================ */

router.get(
  "/ai-usage",
  checkPermission("viewAnalytics"),
  getAIUsage
);

export default router;