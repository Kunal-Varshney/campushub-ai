import express from "express";

import {
  generateRoadmap,
  getMyRoadmaps,
  getRoadmapById,
  updateRoadmapStepProgress,
  generateStepLearning,
} from "../controllers/roadmap.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// ============================================================
// GENERATE ROADMAP
// POST /api/roadmap/generate
// ============================================================

router.post(
  "/generate",
  authMiddleware,
  generateRoadmap
);

// ============================================================
// GET ALL USER ROADMAPS
// GET /api/roadmap
// ============================================================

router.get(
  "/",
  authMiddleware,
  getMyRoadmaps
);

// ============================================================
// UPDATE ROADMAP STEP PROGRESS
// PATCH /api/roadmap/:id/progress
// ============================================================

router.patch(
  "/:id/progress",
  authMiddleware,
  updateRoadmapStepProgress
);

// ============================================================
// AI STEP TUTOR
// POST /api/roadmap/:id/steps/:stepIndex/learn
// ============================================================

router.post(
  "/:id/steps/:stepIndex/learn",
  authMiddleware,
  generateStepLearning
);

// ============================================================
// GET SINGLE ROADMAP
// GET /api/roadmap/:id
// ============================================================

router.get(
  "/:id",
  authMiddleware,
  getRoadmapById
);

export default router;