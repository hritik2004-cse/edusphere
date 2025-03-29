const express = require("express");
const axios = require("axios");

const router = express.Router();

// ✅ AI Summarization Endpoint
router.post("/summarize", async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ message: "Text is required for summarization!" });

        const apiKey = "your-ai-api-key"; // Replace with actual AI API key
        const response = await axios.post(
            "https://api.your-summarizer.com/summarize",
            { text },
            { headers: { Authorization: `Bearer ${apiKey}` } }
        );

        res.json({ summary: response.data.summary });
    } catch (error) {
        res.status(500).json({ error: "Error in text summarization!" });
    }
});

module.exports = router;
