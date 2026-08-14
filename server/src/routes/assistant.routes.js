import express from "express";

import { chatWithAI } from "../controllers/assistant.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// ============================================================
// AI ASSISTANT
// POST /api/assistant/chat
// Authentication required
// ============================================================

router.post(
  "/chat",
  authMiddleware,
  chatWithAI
);

export default router;