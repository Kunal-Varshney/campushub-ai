// ============================================================
// LIGHTWEIGHT AUTH RATE LIMITING
// ============================================================
//
// Uses express-rate-limit (free, native to the Express ecosystem,
// no external service, no paid dependency) to slow down basic
// spam/abuse against the registration and OTP endpoints.
//
// This intentionally stays simple: in-memory counters keyed by IP.
// It is not meant to replace a production-grade abuse system, only
// to stop naive scripted abuse for a free-tier deployment.
// ============================================================

import rateLimit from "express-rate-limit";

// Registration: limit how many accounts can be attempted from a
// single IP in a short window.
export const registerRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many registration attempts. Please try again later.",
  },
});

// OTP verification: limit brute-force guessing of the 6-digit code.
export const verifyOtpRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many verification attempts. Please try again later.",
  },
});

// OTP resend: separate, tighter limit on top of the existing
// per-account 60s cooldown already enforced in the controller.
export const resendOtpRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many resend requests. Please try again later.",
  },
});