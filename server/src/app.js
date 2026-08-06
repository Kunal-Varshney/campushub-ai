import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import notesRoutes from "./routes/notes.routes.js";

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


export default app;