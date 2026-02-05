import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    linkedin: {
        type: String,
        default: '',
    },
    github: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
