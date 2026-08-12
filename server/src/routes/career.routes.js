import express from "express";

import {
  submitApplication,
  getApplications,
  updateApplicationStatus,
} from "../controllers/career.controller.js";

const router = express.Router();

// Public
router.post("/apply", submitApplication);

// Admin
router.get("/applications", getApplications);
router.patch(
  "/applications/:id/status",
  updateApplicationStatus
);

export default router;