import mongoose from 'mongoose';

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
    },
    contact: {
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        website: {
            type: String,
        }
    },
    principal: {
        name: String,
        email: String,
        phone: String
    },
    establishedyear: {
        type: String,
        required: true,
    },

    classeosffered: {
        type: String,
    },

    staff: [
        {
            name: String,
            role: String,
            email: String,
            phone: String,
        }
    ],

    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Under Construction'],
        default: 'Active',
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model('School', schoolSchema);