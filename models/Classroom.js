import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    teacher: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }],
    subjects: [{
        name: {
            type: String,
            required: true,
        },
        description: String,
    }],
    createdDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
    },
});

export default mongoose.model('Classroom', classroomSchema);
