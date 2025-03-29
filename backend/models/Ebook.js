import mongoose from 'mongoose';

const EbookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    fileUrl: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Ebook', EbookSchema);
