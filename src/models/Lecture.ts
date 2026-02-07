import mongoose from 'mongoose';

const LectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    speaker: {
        type: String,
        default: '',
    },
    designation: {
        type: String,
        default: '',
    },
    company: {
        type: String,
        default: '',
    },
    bio: {
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
    attendees: {
        type: Number,
        default: 0,
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
        default: 'Industry Expert',
    },
    createdBy: {
        type: String,
        default: 'admin',
    },
}, {
    timestamps: true,
});

export default mongoose.models.Lecture || mongoose.model('Lecture', LectureSchema);
