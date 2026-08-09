import express from "express";

import {
  getInternships,
  getInternshipById,
  searchInternships,
  saveInternship,
  getSavedInternships,
  applyInternship,
  getApplications,
  updateApplicationStatus,
} from "../controllers/internship.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// ============================================================
// PUBLIC INTERNSHIP ROUTES
// ============================================================

// Get all internships
// GET /api/internships
router.get(
  "/",
  getInternships
);

// Search internships
// POST /api/internships/search
router.post(
  "/search",
  searchInternships
);

// ============================================================
// AUTHENTICATED ROUTES
// ============================================================

// Save / Unsave internship
// POST /api/internships/save
router.post(
  "/save",
  authMiddleware,
  saveInternship
);

// Get saved internships
// GET /api/internships/saved
router.get(
  "/saved",
  authMiddleware,
  getSavedInternships
);

// Apply for internship
// POST /api/internships/apply
router.post(
  "/apply",
  authMiddleware,
  applyInternship
);

// Get user's applications
// GET /api/internships/applications
router.get(
  "/applications",
  authMiddleware,
  getApplications
);

// Update application status
// PATCH /api/internships/application/:id
router.patch(
  "/application/:id",
  authMiddleware,
  updateApplicationStatus
);

// ============================================================
// SINGLE INTERNSHIP
// IMPORTANT: Keep this AFTER static routes
// ============================================================

// Get single internship
// GET /api/internships/:id
router.get(
  "/:id",
  getInternshipById
);

export default router;