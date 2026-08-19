import express from "express";
import passport from "passport";

import authMiddleware from "../middleware/auth.middleware.js";

import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  googleLoginSuccess,
  logoutUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

// ============================================================
// REGISTER
// POST /api/auth/register
// ============================================================

router.post("/register", registerUser);

// ============================================================
// LOGIN
// POST /api/auth/login
// ============================================================

router.post("/login", loginUser);

// ============================================================
// LOGOUT
// POST /api/auth/logout
// ============================================================

router.post("/logout", authMiddleware, logoutUser);

// ============================================================
// FORGOT PASSWORD
// POST /api/auth/forgot-password
// ============================================================

router.post("/forgot-password", forgotPassword);

// ============================================================
// RESET PASSWORD
// POST /api/auth/reset-password/:token
// ============================================================

router.post("/reset-password/:token", resetPassword);

// ============================================================
// GOOGLE LOGIN
// GET /api/auth/google
// ============================================================

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// ============================================================
// GOOGLE CALLBACK
// GET /api/auth/google/callback
// ============================================================

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect:
      `${process.env.CLIENT_URL}/login?error=google-login-failed`,
  }),
  googleLoginSuccess
);

export default router;