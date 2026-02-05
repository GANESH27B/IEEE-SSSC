import mongoose from 'mongoose';

const LectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    speaker: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    bio: {
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
    attendees: {
        type: Number,
        required: true,
    },
    topics: {
        type: [String],
        default: [],
    },
    linkedin: {
        type: String,
        default: '',
    },
    website: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        enum: ['Industry Expert', 'Academic', 'Researcher', 'Entrepreneur'],
        required: true,
    },
    createdBy: {
        type: String,
        default: 'admin',
    },
}, {
    timestamps: true,
});

export default mongoose.models.Lecture || mongoose.model('Lecture', LectureSchema);
