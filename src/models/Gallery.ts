import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
    title: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    category: {
        type: String,
        enum: ['Workshop', 'Competition', 'Event', 'Lecture'],
        default: 'Event',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
