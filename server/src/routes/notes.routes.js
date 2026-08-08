/**
 * This is only the ONE new route CampusHub AI needs for download
 * tracking. Add it into your EXISTING note routes file — don't
 * replace your current notes router with this, just merge this
 * route in alongside your upload/list/search routes.
 */
const express = require("express");
const router = express.Router();

const { recordNoteDownload } = require("../controllers/adminController");
// Replace with your actual auth middleware import:
const { protect } = require("../middleware/authMiddleware");

// POST /api/notes/:id/download
router.post("/:id/download", protect, recordNoteDownload);

module.exports = router;