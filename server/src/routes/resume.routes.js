import express from "express";

import {
  generateResume,
  optimizeATS,
  fixGrammar,
  smartSuggestions,
  optimizeKeywords,
  changeTemplate,
} from "../controllers/resume.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();


// Generate
router.post(
  "/generate",
  protect,
  generateResume
);


// AI ATS Optimization
router.post(
  "/ats-optimize",
  protect,
  optimizeATS
);


// Grammar Fix
router.post(
  "/grammar-fix",
  protect,
  fixGrammar
);


// Smart Suggestions
router.post(
  "/smart-suggestions",
  protect,
  smartSuggestions
);


// Keyword Optimization
router.post(
  "/keyword-optimize",
  protect,
  optimizeKeywords
);


// Template
router.put(
  "/template",
  protect,
  changeTemplate
);


export default router;