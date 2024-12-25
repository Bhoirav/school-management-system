import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

router.post('/create', async (req, res, next) => {
    const { 
        name,
        dateofbirth,
        gender,
        rollnumber,
        section,
        parents,
        status,
        school,
    } = req.body;

    let student_exist = await Student.findOne({ rollnumber: rollnumber });
    if (student_exist) {
        return res.status(409).json({
            success: false,
            msg: "Student already exists"
        });
    }

    const student = new Student({
        name: name,
        dateofbirth: dateofbirth,
        gender: gender,
        rollnumber: rollnumber,
        section: section,
        parents: parents,
        status: status,
        school: school
    });

    await student.save();

    res.status(200).json({
        success: true,
        msg: "Student registered successfully",
        student: student
    });
});

export default router;