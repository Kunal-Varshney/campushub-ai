import mongoose from "mongoose";

const careerApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    resume: {
      type: String,
      trim: true,
    },

    portfolio: {
      type: String,
      trim: true,
    },

    message: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "reviewing", "shortlisted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Career",
  careerApplicationSchema
);