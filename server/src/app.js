// ============================================================
// CAMPUSHUB AI — EXPRESS APP
// ============================================================

import express from "express";
import cors from "cors";

// ============================================================
// ROUTES
// ============================================================

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import assistantRoutes from "./routes/assistant.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import roadmapRoutes from "./routes/roadmap.routes.js";
import internshipRoutes from "./routes/internship.routes.js";
import communityRoutes from "./routes/community.routes.js";
import careerRoutes from "./routes/career.routes.js";
import aboutRoutes from "./routes/about.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

// ============================================================
// MIDDLEWARE
// ============================================================

import authMiddleware from "./middleware/auth.middleware.js";

const app = express();

// ============================================================
// GLOBAL MIDDLEWARE
// ============================================================

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

// ============================================================
// HEALTH CHECK
// GET /
// ============================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CampusHub AI Backend Running 🚀",
  });
});

// ============================================================
// AUTH ROUTES
// /api/auth
// ============================================================

app.use("/api/auth", authRoutes);

// ============================================================
// USER ROUTES
// /api/user
// ============================================================

app.use("/api/user", userRoutes);

// ============================================================
// NOTES ROUTES
// /api/notes
// ============================================================

app.use("/api/notes", notesRoutes);

// ============================================================
// SKILL ROADMAP ROUTES
// /api/roadmap
// Authentication required
// ============================================================

app.use(
  "/api/roadmap",
  authMiddleware,
  roadmapRoutes
);

// ============================================================
// AI ASSISTANT ROUTES
// /api/assistant
// ============================================================

app.use("/api/assistant", assistantRoutes);

// ============================================================
// ADMIN ROUTES
// /api/admin
// Authentication required
// ============================================================

app.use(
  "/api/admin",
  authMiddleware,
  adminRoutes
);

// ============================================================
// RESUME BUILDER ROUTES
// /api/resume
// ============================================================

app.use("/api/resume", resumeRoutes);

// ============================================================
// INTERNSHIP FINDER ROUTES
// /api/internship
// ============================================================

app.use(
  "/api/internship",
  internshipRoutes
);

// ============================================================
// COMMUNITY ROUTES
// /api/community
// ============================================================
//
// Community routes handle:
// - Create posts
// - Get posts
// - Like / unlike
// - Comments
// - Bookmarks
// - Polls
// - Other community actions
//
// Authentication is handled inside community.routes.js
// for protected actions.
//

app.use(
  "/api/community",
  communityRoutes
);

// ============================================================
// CAREER ROUTES
// /api/careers
// ============================================================
//
// Handles:
// - Career applications
// - Job opportunities
// - Application management
//

app.use(
  "/api/careers",
  careerRoutes
);


app.use("/api/about", aboutRoutes);

// ============================================================
// CERTIFICATE ROUTES
// /api/certificates
// ============================================================

app.use(
  "/api/certificates",
  certificateRoutes
);

// ============================================================
// NOTIFICATION ROUTES
// /api/notifications
// ============================================================

app.use(
  "/api/notifications",
  notificationRoutes
);


// ============================================================
// 404 ROUTE
// ============================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ============================================================
// EXPORT APP
// ============================================================

export default app;