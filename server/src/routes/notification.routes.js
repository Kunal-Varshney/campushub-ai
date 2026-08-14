import express from "express";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "../controllers/notification.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Get latest notifications
router.get("/", authMiddleware, getNotifications);

// Mark all as read
router.patch(
  "/read-all",
  authMiddleware,
  markAllNotificationsRead
);

// Mark one as read
router.patch(
  "/:id/read",
  authMiddleware,
  markNotificationRead
);

// Delete notification
router.delete(
  "/:id",
  authMiddleware,
  deleteNotification
);

export default router;