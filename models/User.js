import mongoose from 'mongoose';

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    issuedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    used: {
        type: Boolean,
        default: false,
    },
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [ 'superadmin', 'admin', 'basic' ],
        required: true,
        default: 'basic',
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    refreshTokens: {
        type: [refreshTokenSchema],
        default: [],
    },
});

export default mongoose.model('User', userSchema);
