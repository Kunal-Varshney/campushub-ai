import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

import { 
  getAllUsers,
  getDashboardStats
} from "../controllers/admin.controller.js";


const router = express.Router();


// Admin test route
router.get(
  "/test",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Admin access granted 🚀",
      user: {
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }
);


// Get all users
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);


// Dashboard Stats
router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  getDashboardStats
);


export default router;