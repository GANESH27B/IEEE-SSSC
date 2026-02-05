import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
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
    mode: {
        type: String,
        enum: ['Online', 'Hybrid', 'In-Person'],
        required: true,
    },
    host: {
        type: String,
        required: true,
    },
    participants: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['Live Coding', 'Workshop', 'Demo', 'Challenge'],
        required: true,
    },
    tools: {
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

export default mongoose.models.Session || mongoose.model('Session', SessionSchema);
