import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import ebookRoutes from "./routes/ebookRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import summarizerRoutes from "./routes/summarizerRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB inside an async function
async function startServer() {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected");

    // ✅ Middleware (Only one CORS configuration)
    app.use(cors({
      origin: ["http://127.0.0.1:5500", "http://127.0.0.1:5501"], // Allow frontend access
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true
    }));
    
    app.use(express.json());

    // ✅ API Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/ebooks", ebookRoutes);
    app.use("/api/dashboard", dashboardRoutes);
    app.use("/api/summarizer", summarizerRoutes);

    // ✅ Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);  // Exit if DB connection fails
  }
}

// ✅ Start the server properly
startServer();
