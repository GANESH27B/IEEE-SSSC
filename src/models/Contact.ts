import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name.'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email.'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number.'],
    },
    subject: {
        type: String,
        required: [true, 'Please provide a subject.'],
    },
    message: {
        type: String,
        required: [true, 'Please provide a message.'],
    },
    status: {
        type: String,
        enum: ['Pending', 'Reviewed', 'Resolved'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
