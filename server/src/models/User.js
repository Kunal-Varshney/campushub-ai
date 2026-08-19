import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: false,
      select: false,
    },

    avatar: {
      type: String,
      default: "",
    },

    college: {
      type: String,
      default: "",
    },

    branch: {
      type: String,
      default: "",
    },

    year: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["student", "moderator", "admin"],
      default: "student",
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    permissions: {
      manageUsers: {
        type: Boolean,
        default: false,
      },

      manageNotes: {
        type: Boolean,
        default: false,
      },

      viewAnalytics: {
        type: Boolean,
        default: false,
      },
    },

    // ==========================
    // GOOGLE AUTH
    // ==========================

    googleId: {
      type: String,
      default: null,
      sparse: true,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    // ==========================
    // PASSWORD RESET
    // ==========================

    resetPasswordToken: {
      type: String,
      default: null,
    },

    resetPasswordExpire: {
      type: Date,
      default: null,
    },

    // ==========================
    // ACTIVE LOGIN SESSION
    // ==========================

    activeSessionId: {
      type: String,
      default: null,
    },

    activeSessionExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// ============================================================
// HASH PASSWORD BEFORE SAVE
// ============================================================

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// ============================================================
// COMPARE PASSWORD
// ============================================================

userSchema.methods.comparePassword = async function (enteredPassword) {
  if (!this.password) {
    return false;
  }

  return await bcrypt.compare(enteredPassword, this.password);
};

// ============================================================
// CREATE MODEL
// ============================================================

const User = mongoose.model("User", userSchema);

export default User;