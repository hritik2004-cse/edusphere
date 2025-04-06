import express from "express";
import multer from "multer";
import bcrypt from "bcryptjs";
import User from "../models/User.js";  // ✅ Ensure the correct file extension

const router = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Update user profile
router.post("/update", upload.single("profilePicture"), async (req, res) => {
    try {
        const { name, email, dob, password } = req.body;
        let updateFields = { name, email, dob };

        if (req.file) {
            updateFields.profilePicture = req.file.path;
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updateFields, { new: true });

        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

export default router; // ✅ Use ES module syntax
