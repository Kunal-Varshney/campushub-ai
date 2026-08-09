import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    stipend: {
      type: Number,
      default: 0,
    },

    duration: {
      type: String,
      default: "3 Months",
    },

    mode: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
      default: "Remote",
    },

    skills: {
      type: [String],
      default: [],
    },

    experience: {
      type: String,
      enum: ["Fresher", "Intermediate", "Advanced"],
      default: "Fresher",
    },

    category: {
      type: String,
      default: "Developer",
    },

    description: {
      type: String,
      default: "",
    },

    applyUrl: {
      type: String,
      default: "",
    },

    matchScore: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Internship = mongoose.model("Internship", internshipSchema);

export default Internship;