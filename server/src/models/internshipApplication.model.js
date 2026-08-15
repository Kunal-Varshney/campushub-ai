import mongoose from "mongoose";

const internshipApplicationSchema =
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      internship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Internship",
        required: true,
        index: true,
      },

      status: {
        type: String,
        enum: [
          "applied",
          "review",
          "interview",
          "selected",
          "rejected",
          "withdrawn",
        ],
        default: "applied",
        index: true,
      },

      appliedAt: {
        type: Date,
        default: Date.now,
      },

      updatedAtStatus: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

internshipApplicationSchema.index(
  {
    user: 1,
    internship: 1,
  },
  {
    unique: true,
  }
);

const InternshipApplication =
  mongoose.model(
    "InternshipApplication",
    internshipApplicationSchema
  );

export default InternshipApplication;