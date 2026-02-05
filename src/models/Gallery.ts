import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Workshop', 'Competition', 'Event', 'Lecture'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
