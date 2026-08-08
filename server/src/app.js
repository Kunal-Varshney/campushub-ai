import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import assistantRoutes from "./routes/assistant.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import resumeRoutes from "./routes/resume.routes.js";

import authMiddleware from "./middleware/auth.middleware.js";

const app = express();


// ==========================
// Global Middleware
// ==========================

app.use(cors());
app.use(express.json());


// ==========================
// Health Check
// ==========================

app.get("/", (req, res) => {
  res.json({
    message: "CampusHub AI Backend Running 🚀",
  });
});


// ==========================
// Auth Routes
// ==========================

app.use("/api/auth", authRoutes);


// ==========================
// User Routes
// ==========================

app.use("/api/user", userRoutes);


// ==========================
// Notes Routes
// ==========================

app.use("/api/notes", notesRoutes);


// ==========================
// AI Assistant Routes
// ==========================

app.use("/api/assistant", assistantRoutes);


// ==========================
// Admin Routes
// IMPORTANT:
// authMiddleware runs first,
// so req.user is available
// inside admin.middleware.js
// ==========================

app.use(
  "/api/admin",
  authMiddleware,
  adminRoutes
);


// ==========================
// Resume Builder Routes
// ==========================

app.use("/api/resume", resumeRoutes);


// ==========================
// Export App
// ==========================

export default app;