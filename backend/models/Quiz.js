const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    score: { type: Number, required: true },
    questions: { type: Array, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Quiz", QuizSchema);
