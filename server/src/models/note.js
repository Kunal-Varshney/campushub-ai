const mongoose = require("mongoose");

const NOTE_CATEGORIES = [
  "DSA",
  "Machine Learning",
  "DBMS",
  "Web Development",
  "Programming",
];

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      enum: NOTE_CATEGORIES,
      required: [true, "Category is required"],
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    downloads: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

noteSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Note", noteSchema);
module.exports.NOTE_CATEGORIES = NOTE_CATEGORIES;