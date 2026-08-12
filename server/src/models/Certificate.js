import mongoose from "mongoose";
import crypto from "crypto";

const CATEGORIES = [
  "web-dev",
  "ai-ml",
  "cloud",
  "programming",
  "other",
];

const DIFFICULTIES = [
  "Foundational",
  "Intermediate",
  "Advanced",
];

const STATUSES = [
  "active",
  "expired",
  "revoked",
];

const CertificateSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, "Certificate title is required"],
      trim: true,
      maxlength: 200,
    },

    issuer: {
      type: String,
      required: [true, "Issuer / provider is required"],
      trim: true,
      maxlength: 150,
    },

    category: {
      type: String,
      enum: CATEGORIES,
      default: "other",
    },

    difficulty: {
      type: String,
      enum: DIFFICULTIES,
      default: "Intermediate",
    },

    credentialId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    credentialUrl: {
      type: String,
      trim: true,
      default: null,
    },

    issueDate: {
      type: Date,
      required: [true, "Issue date is required"],
    },

    expiryDate: {
      type: Date,
      default: null,
      validate: {
        validator: function (value) {
          if (!value) return true;

          return value > this.issueDate;
        },
        message: "Expiry date must be after issue date",
      },
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    certificateFile: {
      url: {
        type: String,
        default: null,
      },

      publicId: {
        type: String,
        default: null,
      },

      format: {
        type: String,
        default: null,
      },
    },

    verified: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: STATUSES,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// ============================================================
// INDEX
// ============================================================

CertificateSchema.index({
  user: 1,
  category: 1,
});

// ============================================================
// VIRTUAL — IS EXPIRED
// ============================================================

CertificateSchema.virtual("isExpired").get(function () {
  return Boolean(
    this.expiryDate &&
      this.expiryDate.getTime() < Date.now()
  );
});

// ============================================================
// JSON VIRTUALS
// ============================================================

CertificateSchema.set("toJSON", {
  virtuals: true,
});

// ============================================================
// GENERATE CREDENTIAL ID
// ============================================================

CertificateSchema.statics.generateCredentialId = function (
  issuer = "CH"
) {
  const prefix =
    issuer
      .replace(/[^a-zA-Z]/g, "")
      .slice(0, 4)
      .toUpperCase() || "CERT";

  const year = new Date().getFullYear();

  const random = crypto
    .randomBytes(3)
    .toString("hex")
    .toUpperCase();

  return `${prefix}-${year}-${random}`;
};

// ============================================================
// MODEL
// ============================================================

const Certificate = mongoose.model(
  "Certificate",
  CertificateSchema
);

export default Certificate;

export {
  CATEGORIES,
  DIFFICULTIES,
};