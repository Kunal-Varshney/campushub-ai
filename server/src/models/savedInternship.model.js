import mongoose from "mongoose";

const savedInternshipSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

savedInternshipSchema.index(
  {
    user: 1,
    internship: 1,
  },
  {
    unique: true,
  }
);

const SavedInternship = mongoose.model(
  "SavedInternship",
  savedInternshipSchema
);

export default SavedInternship;