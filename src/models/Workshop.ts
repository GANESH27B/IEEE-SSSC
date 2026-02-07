import mongoose from 'mongoose';

const WorkshopSchema = new mongoose.Schema({
    title: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    date: {
        type: String,
        default: '',
    },
    time: {
        type: String,
        default: '',
    },
    location: {
        type: String,
        default: '',
    },
    instructor: {
        type: String,
        default: '',
    },
    seats: {
        type: Number,
        default: 0,
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner',
    },
    duration: {
        type: String,
        default: '',
    },
    topics: {
        type: [String],
        default: [],
    },
    image: {
        type: String,
        default: '',
    },
    createdBy: {
        type: String,
        default: 'admin',
    },
}, {
    timestamps: true,
});

export default mongoose.models.Workshop || mongoose.model('Workshop', WorkshopSchema);
