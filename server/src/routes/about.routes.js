import express from "express";

import {
  getAboutData,
  createAboutData,
  updateAboutData,
  deleteAboutData,
} from "../controllers/about.controller.js";

const router = express.Router();

// ============================================================
// ABOUT PAGE
// ============================================================

// GET /api/about
router.get("/", getAboutData);

// ============================================================
// CREATE ABOUT DATA
// ============================================================

// POST /api/about
router.post("/", createAboutData);

// ============================================================
// UPDATE ABOUT DATA
// ============================================================

// PUT /api/about
router.put("/", updateAboutData);

// ============================================================
// DELETE ABOUT DATA
// ============================================================

// DELETE /api/about
router.delete("/", deleteAboutData);

export default router;