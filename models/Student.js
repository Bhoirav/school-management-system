import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dateofbirth: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },

    phone: String,
    email: String,
    
    address: {
        type: String,
    },
    rollnumber: {
        type: String,
        unique: true,
        required: true,
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        // required: true,
    },
    grade: {
        type: String,
    },
    section: {
        type: String,
    },
    parents: {
        father: {
            name: String,
            phone: String,
            email: String,
        },
        mother: {
            name: String,
            phone: String,
            email: String,
        },
        guardian: {
            name: String,
            relationship: String,
            phone: String,
        },
    },
    academicRecords: [
        {
            year: Number,
            subjects: [
                {
                    name: String,
                    marks: Number,
                    grade: String,
                }
            ],
            attendancePercentage: Number,
        }
    ],
    attendance: [
        {
            date: Date,
            status: {
                type: String,
                enum: ['Present', 'Absent', 'Late'],
                default: 'Present'
            },
        }
    ],
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Graduated', 'Transferred'],
        default: 'Active'
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

export default mongoose.model('Student', studentSchema);
