import mongoose from 'mongoose';

const WorkshopSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    seats: {
        type: Number,
        required: true,
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true,
    },
    duration: {
        type: String,
        required: true,
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
