/**
 * NOTE: You already have a User model with auth fields (name, email,
 * password, etc). Do NOT replace your existing file with this one —
 * instead, merge in the fields below that your schema is missing:
 *
 *   role:        { type: String, enum: ["student", "moderator", "admin"], default: "student" }
 *   isBlocked:   { type: Boolean, default: false }
 *   permissions: {
 *     manageUsers:    { type: Boolean, default: false },
 *     manageNotes:    { type: Boolean, default: false },
 *     viewAnalytics:  { type: Boolean, default: false },
 *   }
 *
 * This file is provided as a reference for a full schema shape only.
 */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    avatar: { type: String, default: "" },
    college: { type: String, default: "" },
    branch: { type: String, default: "" },
    year: { type: String, default: "" },
    role: {
      type: String,
      enum: ["student", "moderator", "admin"],
      default: "student",
    },
    isBlocked: { type: Boolean, default: false },
    permissions: {
      manageUsers: { type: Boolean, default: false },
      manageNotes: { type: Boolean, default: false },
      viewAnalytics: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);