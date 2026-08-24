import express from "express";

import {
  generateNote,
  createNote,
  getNotes,
  getNoteById,
} from "../controllers/noteController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ============================================================
// GENERATE NOTE
// ============================================================

router.post(
  "/generate",
  authMiddleware,
  generateNote
);

// ============================================================
// SAVE NOTE
// ============================================================

router.post(
  "/create",
  authMiddleware,
  createNote
);

// ============================================================
// GET ALL MY SAVED NOTES
// ============================================================

router.get(
  "/",
  authMiddleware,
  getNotes
);

// ============================================================
// GET ONE SAVED NOTE
// ============================================================

router.get(
  "/:id",
  authMiddleware,
  getNoteById
);

export default router;