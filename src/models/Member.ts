import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        default: 'password123', // Default password for placeholder accounts
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member',
    },
    department: {
        type: String,
        default: '',
    },
    year: {
        type: String,
        default: '',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
