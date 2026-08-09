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
      required: true,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
    },

    mode: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    matchScore: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      default: "Developer",
      trim: true,
    },

    experience: {
      type: String,
      default: "Fresher",
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    applicationLink: {
      type: String,
      default: "",
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

const Internship = mongoose.model(
  "Internship",
  internshipSchema
);

export default Internship;
