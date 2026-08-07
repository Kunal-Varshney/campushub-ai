import express from "express";
import cors from "cors";


import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import assistantRoutes from "./routes/assistant.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import resumeRoutes from "./routes/resume.routes.js";


const app = express();


app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  res.json({
    message: "CampusHub AI Backend Running 🚀",
  });
});



// Auth Routes
app.use("/api/auth", authRoutes);



// User Routes
app.use("/api/user", userRoutes);



// Notes Routes
app.use("/api/notes", notesRoutes);



// AI Assistant Routes
app.use("/api/assistant", assistantRoutes);



// Admin Routes
app.use("/api/admin", adminRoutes);



// Resume Builder Routes
app.use("/api/resume", resumeRoutes);



export default app;