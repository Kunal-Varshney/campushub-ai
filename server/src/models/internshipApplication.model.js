import mongoose from "mongoose";

const internshipApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true,
    },

    status: {
      type: String,
      enum: [
        "applied",
        "review",
        "interview",
        "selected",
        "rejected",
      ],
      default: "applied",
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

internshipApplicationSchema.index(
  { user: 1, internship: 1 },
  { unique: true }
);

const InternshipApplication = mongoose.model(
  "InternshipApplication",
  internshipApplicationSchema
);

export default InternshipApplication;