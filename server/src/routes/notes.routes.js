import express from "express";

import {
  recordNoteDownload,
} from "../controllers/admin.controller.js";

import {
  generateNote,
  createNote,
  getNotes,
} from "../controllers/notes.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// ============================================================
// GET MY NOTES
// GET /api/notes
// ============================================================

router.get(
  "/",
  authMiddleware,
  getNotes
);


// ============================================================
// AI SMART NOTE GENERATOR
// POST /api/notes/generate
// ============================================================

router.post(
  "/generate",
  authMiddleware,
  generateNote
);


// ============================================================
// CREATE NOTE
// POST /api/notes/create
// ============================================================

router.post(
  "/create",
  authMiddleware,
  createNote
);


// ============================================================
// RECORD NOTE DOWNLOAD
// POST /api/notes/:id/download
// ============================================================

router.post(
  "/:id/download",
  authMiddleware,
  recordNoteDownload
);

export default router;