import express from "express";

import {
  generateRoadmap,
  getMyRoadmaps,
  getRoadmapById,
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
// GET SINGLE ROADMAP
// GET /api/roadmap/:id
// ============================================================

router.get(
  "/:id",
  authMiddleware,
  getRoadmapById
);

export default router;