import "dotenv/config";

import app from "./app.js";
import connectDB from "./config/db.js";

console.log(
  "GROQ KEY:",
  process.env.GROQ_API_KEY ? "LOADED ✅" : "MISSING ❌"
);

// Connect MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});