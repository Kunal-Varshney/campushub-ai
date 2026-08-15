import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    // ============================================================
    // BASIC NOTE INFORMATION
    // ============================================================

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

    // Student ka actual subject
    subject: {
      type: String,
      trim: true,
      default: "",
    },

    // Student ka actual topic
    topic: {
      type: String,
      trim: true,
      default: "",
    },

    // Category sirf classification ke liye hai.
    // Student ko predefined categories tak restrict nahi karega.
    category: {
      type: String,
      trim: true,
      default: "AI Generated",
    },

    // ============================================================
    // AI GENERATED CONTENT
    // ============================================================

    summary: {
      type: String,
      trim: true,
      default: "",
    },

    points: {
      type: [String],
      default: [],
    },

    examples: {
      type: [String],
      default: [],
    },

    keywords: {
      type: [String],
      default: [],
    },

    examTips: {
      type: [String],
      default: [],
    },

    // ============================================================
    // STUDENT INFORMATION
    // ============================================================

    branch: {
      type: String,
      trim: true,
      default: "",
    },

    year: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ============================================================
    // FILE
    // ============================================================

    fileUrl: {
      type: String,
      default: "",
    },

    // ============================================================
    // STATUS
    // ============================================================

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // ============================================================
    // DOWNLOADS
    // ============================================================

    downloads: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// ============================================================
// SEARCH INDEX
// ============================================================

noteSchema.index({
  title: "text",
  description: "text",
  subject: "text",
  topic: "text",
  summary: "text",
  keywords: "text",
});

const Note = mongoose.model("Note", noteSchema);

export default Note;