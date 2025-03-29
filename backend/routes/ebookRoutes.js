import express from 'express';
import Ebook from '../models/Ebook.js';

const router = express.Router();

// Upload eBook
router.post('/upload', async (req, res) => {
    try {
        const { title, author, category, fileUrl } = req.body;
        if (!title || !author || !category || !fileUrl) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newEbook = new Ebook({ title, author, category, fileUrl });
        await newEbook.save();
        res.status(201).json({ message: 'Ebook uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get all eBooks
router.get('/', async (req, res) => {
    try {
        const ebooks = await Ebook.find();
        res.status(200).json(ebooks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Search eBooks by title
router.get('/search', async (req, res) => {
    try {
        const { title } = req.query;
        const ebooks = await Ebook.find({ title: { $regex: title, $options: 'i' } });
        res.status(200).json(ebooks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Filter eBooks by category
router.get('/filter', async (req, res) => {
    try {
        const { category } = req.query;
        const ebooks = await Ebook.find({ category });
        res.status(200).json(ebooks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

export default router;
