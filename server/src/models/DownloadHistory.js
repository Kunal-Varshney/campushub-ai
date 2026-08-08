import mongoose from "mongoose";

const downloadHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userName: {
      type: String,
      default: "",
    },

    userEmail: {
      type: String,
      default: "",
    },

    noteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
      required: true,
    },

    noteTitle: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "General",
    },

    downloadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const DownloadHistory = mongoose.model(
  "DownloadHistory",
  downloadHistorySchema
);

export default DownloadHistory;