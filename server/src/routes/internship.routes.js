import express from "express";

import {
  getInternships,
  getInternshipById,
  searchInternships,
} from "../controllers/internship.controller.js";

const router = express.Router();

// ============================================================
// GET ALL INTERNSHIPS
// GET /api/internships
// ============================================================

router.get("/", getInternships);

// ============================================================
// SEARCH / AI RECOMMENDATIONS
// GET /api/internships/search
// ============================================================

router.get("/search", searchInternships);

// ============================================================
// GET SINGLE INTERNSHIP
// GET /api/internships/:id
// ============================================================

router.get("/:id", getInternshipById);

export default router;

