import Notification from "../models/Notification.js";

// ============================================================
// GET MY NOTIFICATIONS
// GET /api/notifications
// ============================================================

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(30)
      .lean();

    const unreadCount = await Notification.countDocuments({
      user: req.user.id,
      isRead: false,
    });

    res.status(200).json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error("Get Notifications Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// MARK ONE NOTIFICATION AS READ
// PATCH /api/notifications/:id/read
// ============================================================

export const markNotificationRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error("Mark Notification Read Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// MARK ALL NOTIFICATIONS AS READ
// PATCH /api/notifications/read-all
// ============================================================

export const markAllNotificationsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        user: req.user.id,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("Mark All Notifications Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// DELETE NOTIFICATION
// DELETE /api/notifications/:id
// ============================================================

export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted",
    });
  } catch (error) {
    console.error("Delete Notification Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================================
// CREATE NOTIFICATION
// Reusable function for other backend features
// ============================================================

export const createNotification = async ({
  user,
  title,
  message,
  type = "system",
  link = "",
}) => {
  try {
    return await Notification.create({
      user,
      title,
      message,
      type,
      link,
    });
  } catch (error) {
    console.error("Create Notification Error:", error);
    return null;
  }
};