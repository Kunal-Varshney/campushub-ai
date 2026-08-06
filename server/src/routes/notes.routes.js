import express from "express";

import {
  createNote,
  generateNote,
  getNotes,
} from "../controllers/notes.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// =====================
// SMART NOTE GENERATOR
// =====================
router.post(
  "/generate",
  authMiddleware,
  generateNote
);

// =====================
// CREATE NOTE
// =====================
router.post(
  "/",
  authMiddleware,
  createNote
);

// =====================
// GET NOTES
// =====================
router.get(
  "/",
  authMiddleware,
  getNotes
);

export default router;