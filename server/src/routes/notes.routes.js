import express from "express";

import {
  createNote,
  getNotes,
} from "../controllers/notes.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";


const router = express.Router();


// Upload Note
router.post(
  "/",
  authMiddleware,
  createNote
);


// Get All Notes
router.get(
  "/",
  authMiddleware,
  getNotes
);


export default router;