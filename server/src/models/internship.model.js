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

    description: {
      type: String,
      default: "",
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
      min: 0,
    },

    duration: {
      type: String,
      default: "3 Months",
      trim: true,
    },

    mode: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
      default: "Remote",
    },

    category: {
      type: String,
      default: "Developer",
      trim: true,
    },

    experience: {
      type: String,
      enum: [
        "Fresher",
        "Intermediate",
        "Advanced",
      ],
      default: "Fresher",
    },

    skills: {
      type: [String],
      default: [],
    },

    companyVerified: {
      type: Boolean,
      default: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    applicationUrl: {
      type: String,
      default: "",
      trim: true,
    },

    matchScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    applicantsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

internshipSchema.index({
  role: "text",
  company: "text",
  skills: "text",
});

internshipSchema.index({
  location: 1,
  category: 1,
  mode: 1,
});

const Internship = mongoose.model(
  "Internship",
  internshipSchema
);

export default Internship;