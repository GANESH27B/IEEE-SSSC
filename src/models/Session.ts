import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
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
    mode: {
        type: String,
        enum: ['Online', 'Hybrid', 'In-Person'],
        default: 'Online',
    },
    host: {
        type: String,
        default: '',
    },
    participants: {
        type: Number,
        default: 0,
    },
    type: {
        type: String,
        enum: ['Live Coding', 'Workshop', 'Demo', 'Challenge'],
        default: 'Workshop',
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
