import mongoose from "mongoose";

// ============================================================
// ROADMAP STEP
// ============================================================

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

// ============================================================
// WEEKLY PLAN
// ============================================================

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

// ============================================================
// PROJECT
// ============================================================

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

// ============================================================
// SKILL ANALYSIS
// ============================================================

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

// ============================================================
// INTERVIEW PREPARATION
// ============================================================

const interviewPreparationSchema = new mongoose.Schema(
  {
    focus: {
      type: String,
      default: "",
    },

    topics: {
      type: [String],
      default: [],
    },

    mockInterviews: {
      type: Number,
      default: 0,
    },

    codingChallenges: {
      type: Number,
      default: 0,
    },

    portfolioReview: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

// ============================================================
// ROADMAP SCHEMA
// ============================================================

const roadmapSchema = new mongoose.Schema(
  {
    // --------------------------------------------------------
    // USER
    // --------------------------------------------------------

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // --------------------------------------------------------
    // CAREER
    // --------------------------------------------------------

    career: {
      type: String,
      required: true,
    },

    // --------------------------------------------------------
    // LEVEL
    // --------------------------------------------------------

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },

    // --------------------------------------------------------
    // ROADMAP STEPS
    // --------------------------------------------------------

    roadmapSteps: {
      type: [roadmapStepSchema],
      default: [],
    },

    // --------------------------------------------------------
    // WEEKLY PLAN
    // --------------------------------------------------------

    weeklyPlan: {
      type: [weeklyPlanSchema],
      default: [],
    },

    // --------------------------------------------------------
    // PROJECTS
    // --------------------------------------------------------

    projects: {
      type: [projectSchema],
      default: [],
    },

    // --------------------------------------------------------
    // SKILL ANALYSIS
    // --------------------------------------------------------

    skillAnalysis: {
      type: skillAnalysisSchema,
      default: {},
    },

    // --------------------------------------------------------
    // INTERVIEW PREPARATION
    // --------------------------------------------------------

    interviewPreparation: {
      type: interviewPreparationSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// ============================================================
// MODEL
// ============================================================

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

export default Roadmap;