import express from "express";
import axios from "axios"; // If calling an external AI API
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Improved summarization logic
router.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required for summarization" });
    }

    // Splitting text and keeping 40% of the words instead of just 10 words
    const words = text.split(" ");
    const summaryLength = Math.max(Math.floor(words.length * 0.4), 50); // At least 50 words
    const summary = words.slice(0, summaryLength).join(" ") + "...";

    res.json({ summary });

  } catch (error) {
    console.error("Summarization Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
