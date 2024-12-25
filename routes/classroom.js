import express from 'express';
import Classroom from '../models/Classroom.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  const { name, teacher, students, subjects } = req.body;

  try {
    const teacherExists = await User.find({ _id: { $in: teacher } });
    if (!teacherExists) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    // const studentExists = await Student.find({ _id: { $in: students } });
    // if (studentExists.length !== students.length) {
    //   return res.status(404).json({ success: false, message: 'One or more students not found' });
    // }

    // if (!Array.isArray(subjects) || subjects.length === 0) {
    //   return res.status(400).json({ success: false, message: 'At least one subject is required' });
    // }

    // const invalidSubjects = subjects.filter(subject => !subject.name);
    // if (invalidSubjects.length > 0) {
    //   return res.status(400).json({ success: false, message: 'Each subject must have a name' });
    // }

    const classroom = new Classroom({
      name,
      teacher,
      students,
      subjects,
    });

    const savedClassroom = await classroom.save();

    res.status(201).json({
      success: true,
      message: 'Classroom created successfully',
      classroom: savedClassroom,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
    });
  }
});

export default router;
