import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // User who should receive the notification
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Notification title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Notification message
    message: {
      type: String,
      required: true,
      trim: true,
    },

    // Used later for different notification UI/icons
    type: {
      type: String,
      enum: [
        "system",
        "ai",
        "learning",
        "internship",
        "roadmap",
        "community",
        "profile",
        "achievement",
      ],
      default: "system",
    },

    // Optional navigation route
    link: {
      type: String,
      default: "",
    },

    // Read status
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);


// Latest notifications first
notificationSchema.index({
  user: 1,
  createdAt: -1,
});


const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;