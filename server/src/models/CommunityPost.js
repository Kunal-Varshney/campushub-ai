import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const pollOptionSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },

    votes: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      trim: true,
    },

    options: {
      type: [pollOptionSchema],
      default: [],
    },

    totalVotes: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

const communityPostSchema = new mongoose.Schema(
  {
    // ==============================
    // AUTHOR
    // ==============================
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ==============================
    // POST CONTENT
    // ==============================
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "ai-ml",
        "web-dev",
        "career",
        "projects",
        "events",
        "general",
      ],
      default: "general",
    },

    tags: {
      type: [String],
      default: [],
    },

    // ==============================
    // OPTIONAL ATTACHMENTS
    // ==============================
    codeSnippet: {
      type: String,
      default: null,
    },

    imageUrl: {
      type: String,
      default: null,
    },

    // ==============================
    // ENGAGEMENT
    // ==============================
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // ==============================
    // COMMENTS
    // ==============================
    comments: {
      type: [commentSchema],
      default: [],
    },

    // ==============================
    // POLL
    // ==============================
    poll: {
      type: pollSchema,
      default: null,
    },

    // ==============================
    // ADMIN / COMMUNITY CONTROLS
    // ==============================
    pinned: {
      type: Boolean,
      default: false,
    },

    isApproved: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model(
  "CommunityPost",
  communityPostSchema
);