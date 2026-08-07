import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    subject: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      default: "",
    },

    year: {
      type: Number,
      default: null,
    },

    fileUrl: {
      type: String,
      default: "",
    },

    // ===== SMART NOTES =====
    summary: {
      type: String,
      default: "",
    },

    points: [
      {
        type: String,
      },
    ],

    keywords: [
      {
        type: String,
      },
    ],

    examTips: [
      {
        type: String,
      },
    ],

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;