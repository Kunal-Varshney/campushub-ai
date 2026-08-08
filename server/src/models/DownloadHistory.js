const mongoose = require("mongoose");

const downloadHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    noteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
      required: true,
    },
    noteTitle: { type: String, required: true },
    category: { type: String, required: true },
    downloadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

downloadHistorySchema.index({ userName: 1, noteTitle: 1, downloadedAt: -1 });

module.exports = mongoose.model("DownloadHistory", downloadHistorySchema);