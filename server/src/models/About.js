import mongoose from "mongoose";

// ============================================================
// ABOUT FEATURE SCHEMA
// ============================================================

const aboutFeatureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    tag: {
      type: String,
      required: true,
      trim: true,
    },

    route: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

// ============================================================
// PLATFORM GOAL SCHEMA
// ============================================================

const platformGoalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

// ============================================================
// ABOUT SCHEMA
// ============================================================

const aboutSchema = new mongoose.Schema(
  {
    // ========================================================
    // HERO
    // ========================================================

    title: {
      type: String,
      required: true,
      trim: true,
    },

    subtitle: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // ========================================================
    // MISSION & VISION
    // ========================================================

    mission: {
      type: String,
      required: true,
      trim: true,
    },

    vision: {
      type: String,
      required: true,
      trim: true,
    },

    // ========================================================
    // WHO WE ARE
    // ========================================================

    whoWeAreTitle: {
      type: String,
      required: true,
      trim: true,
    },

    whoWeAreDescription: {
      type: String,
      required: true,
      trim: true,
    },

    whoWeAreSecondaryDescription: {
      type: String,
      required: true,
      trim: true,
    },

    // ========================================================
    // AI FIRST EDUCATION
    // ========================================================

    aiEducationTitle: {
      type: String,
      required: true,
      trim: true,
    },

    aiEducationDescription: {
      type: String,
      required: true,
      trim: true,
    },

    aiEducationPoints: {
      type: [String],
      default: [],
    },

    // ========================================================
    // PLATFORM GOALS
    // ========================================================

    platformGoals: {
      type: [platformGoalSchema],
      default: [],
    },

    // ========================================================
    // 6 MAJOR FEATURES
    // ========================================================

    features: {
      type: [aboutFeatureSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// ============================================================
// MODEL
// ============================================================

const About = mongoose.model("About", aboutSchema);

export default About;