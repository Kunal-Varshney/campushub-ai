import express from "express";

import {
  recordNoteDownload,
  getAllNotes,
} from "../controllers/admin.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Notes Routes
|--------------------------------------------------------------------------
*/

// Get notes
router.get("/", getAllNotes);

// Record note download
// POST /api/notes/:id/download
router.post(
  "/:id/download",
  authMiddleware,
  recordNoteDownload
);

export default router;