import express from "express";

import {
  getPosts,
  createPost,
  toggleLike,
  toggleBookmark,
  addComment,
  votePoll,
} from "../controllers/community.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// ============================================================
// COMMUNITY POSTS
// ============================================================

// Get all community posts
router.get(
  "/posts",
  authMiddleware,
  getPosts
);

// Create new post
router.post(
  "/posts",
  authMiddleware,
  createPost
);

// Like / Unlike
router.put(
  "/posts/:id/like",
  authMiddleware,
  toggleLike
);

// Bookmark / Unbookmark
router.put(
  "/posts/:id/bookmark",
  authMiddleware,
  toggleBookmark
);

// Add comment
router.post(
  "/posts/:id/comments",
  authMiddleware,
  addComment
);

// Poll vote
router.post(
  "/posts/:id/poll/vote",
  authMiddleware,
  votePoll
);

export default router;