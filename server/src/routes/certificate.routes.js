import express from "express";

import {
  getCertificates,
  getUpcomingCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  downloadCertificate,
  verifyCertificate,
} from "../controllers/certificate.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

import { upload } from "../utils/certificate.utils.js";

const router = express.Router();

// ============================================================
// PUBLIC CERTIFICATE VERIFICATION
// GET /api/certificates/verify/:credentialId
// ============================================================
// No login required

router.get(
  "/verify/:credentialId",
  verifyCertificate
);

// ============================================================
// PRIVATE CERTIFICATE ROUTES
// ============================================================

// ============================================================
// GET ALL CERTIFICATES
// GET /api/certificates
// ============================================================

router.get(
  "/",
  authMiddleware,
  getCertificates
);

// ============================================================
// GET UPCOMING CERTIFICATES
// GET /api/certificates/upcoming
// ============================================================
// IMPORTANT:
// This route MUST come before "/:id"

router.get(
  "/upcoming",
  authMiddleware,
  getUpcomingCertificates
);

// ============================================================
// GET SINGLE CERTIFICATE
// GET /api/certificates/:id
// ============================================================

router.get(
  "/:id",
  authMiddleware,
  getCertificateById
);

// ============================================================
// CREATE CERTIFICATE
// POST /api/certificates
// ============================================================

router.post(
  "/",
  authMiddleware,
  upload.single("certificateFile"),
  createCertificate
);

// ============================================================
// UPDATE CERTIFICATE
// PUT /api/certificates/:id
// ============================================================

router.put(
  "/:id",
  authMiddleware,
  upload.single("certificateFile"),
  updateCertificate
);

// ============================================================
// DELETE CERTIFICATE
// DELETE /api/certificates/:id
// ============================================================

router.delete(
  "/:id",
  authMiddleware,
  deleteCertificate
);

// ============================================================
// DOWNLOAD CERTIFICATE
// GET /api/certificates/:id/download
// ============================================================

router.get(
  "/:id/download",
  authMiddleware,
  downloadCertificate
);

export default router;