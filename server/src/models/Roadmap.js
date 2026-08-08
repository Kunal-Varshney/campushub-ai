import mongoose from "mongoose";

const roadmapStepSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    time: {
      type: String,
      default: "1 Week",
    },

    status: {
      type: String,
      enum: ["completed", "in-progress", "pending"],
      default: "pending",
    },

    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    description: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const weeklyPlanSchema = new mongoose.Schema(
  {
    week: String,

    topics: {
      type: [String],
      default: [],
    },

    assignment: String,

    miniProject: String,

    hours: {
      type: Number,
      default: 10,
    },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    name: String,

    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    skills: {
      type: [String],
      default: [],
    },

    time: String,
  },
  { _id: false }
);

const skillAnalysisSchema = new mongoose.Schema(
  {
    currentSkills: {
      type: Number,
      default: 0,
    },

    missingSkills: {
      type: Number,
      default: 0,
    },

    industryReadiness: {
      type: Number,
      default: 0,
    },

    interviewReadiness: {
      type: Number,
      default: 0,
    },

    confidenceScore: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const roadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    career: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },

    roadmapSteps: {
      type: [roadmapStepSchema],
      default: [],
    },

    weeklyPlan: {
      type: [weeklyPlanSchema],
      default: [],
    },

    projects: {
      type: [projectSchema],
      default: [],
    },

    skillAnalysis: {
      type: skillAnalysisSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

export default Roadmap;