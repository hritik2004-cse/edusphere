const express = require("express");
const Quiz = require("../models/Quiz");

const router = express.Router();

// ✅ Submit a Quiz
router.post("/submit", async (req, res) => {
    try {
        const { userId, score, questions } = req.body;
        const quiz = new Quiz({ userId, score, questions });

        await quiz.save();
        res.status(201).json({ message: "Quiz submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Retrieve User Quizzes
router.get("/user/:userId", async (req, res) => {
    try {
        const quizzes = await Quiz.find({ userId: req.params.userId });
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
