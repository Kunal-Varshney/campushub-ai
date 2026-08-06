import dotenv from "dotenv";
dotenv.config();

console.log("SERVER GROQ KEY =", process.env.GROQ_API_KEY);

import app from "./app.js";
import connectDB from "./config/db.js";

// Connect MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});