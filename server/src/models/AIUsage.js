import mongoose from "mongoose";

const aiUsageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "General",
      trim: true,
    },

    response: {
      type: String,
      default: "",
    },

    model: {
      type: String,
      default: "Groq",
    },

    tokensUsed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const AIUsage = mongoose.model("AIUsage", aiUsageSchema);

export default AIUsage;