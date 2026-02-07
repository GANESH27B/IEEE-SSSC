import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    role: {
        type: String,
        default: '',
    },
    department: {
        type: String,
        default: '',
    },
    year: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    linkedin: {
        type: String,
        default: '',
    },
    github: {
        type: String,
        default: '',
    },
    isLead: {
        type: Boolean,
        default: false,
    },
    isCore: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);
