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

    subject: {
      type: String,
      trim: true,
      default: "",
    },

    topic: {
      type: String,
      trim: true,
      default: "",
    },

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

    answer: {
      introduction: {
        type: String,
        trim: true,
        default: "",
      },

      sections: [
        {
          heading: {
            type: String,
            trim: true,
            default: "",
          },

          content: {
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
        },
      ],
    },

    // ============================================================
    // IMPORTANT POINTS
    // ============================================================

    points: {
      type: [String],
      default: [],
    },

    // ============================================================
    // EXAMPLES
    // ============================================================

    examples: {
      type: [String],
      default: [],
    },

    // ============================================================
    // KEYWORDS
    // ============================================================

    keywords: {
      type: [String],
      default: [],
    },

    // ============================================================
    // QUICK REVISION
    // ============================================================

    quickRevision: {
      type: [String],
      default: [],
    },

    // ============================================================
    // EXAM TIPS
    // ============================================================

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
      default: "approved",
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