import express from "express";

import {
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";


const router = express.Router();


// GET USER PROFILE
router.get(
  "/profile",
  authMiddleware,
  getProfile
);


// UPDATE USER PROFILE
router.put(
  "/profile",
  authMiddleware,
  updateProfile
);


export default router;