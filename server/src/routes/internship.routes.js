import express from "express";

import {
  getInternships,
  getInternshipById,
  searchInternships,
  toggleSavedInternship,
  getSavedInternships,
  applyInternship,
  getMyApplications,
  updateApplicationStatus,
  withdrawApplication,
} from "../controllers/internship.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// ============================================================
// PUBLIC
// ============================================================

// GET /api/internship
router.get(
  "/",
  getInternships
);

// POST /api/internship/search
router.post(
  "/search",
  searchInternships
);

// ============================================================
// AUTHENTICATED
// ============================================================

// POST /api/internship/save
router.post(
  "/save",
  authMiddleware,
  toggleSavedInternship
);

// GET /api/internship/saved
router.get(
  "/saved",
  authMiddleware,
  getSavedInternships
);

// POST /api/internship/apply
router.post(
  "/apply",
  authMiddleware,
  applyInternship
);

// GET /api/internship/applications
router.get(
  "/applications",
  authMiddleware,
  getMyApplications
);

// PATCH /api/internship/application/:id
router.patch(
  "/application/:id",
  authMiddleware,
  updateApplicationStatus
);

// DELETE /api/internship/application/:id
router.delete(
  "/application/:id",
  authMiddleware,
  withdrawApplication
);

// ============================================================
// SINGLE INTERNSHIP
// Keep this AFTER /saved, /apply and /applications
// ============================================================

// GET /api/internship/:id
router.get(
  "/:id",
  getInternshipById
);

export default router;