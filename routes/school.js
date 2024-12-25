import express from 'express';
import School from '../models/School.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { 
            name,
            address,
            contact,
            principal,
            establishedyear,
            classeosffered,
            staff,
            status
        } = req.body;

        const school_exist = await School.findOne({ name });
        if (school_exist) {
            return res.status(409).json({
                success: false,
                msg: "School with this name already exists"
            });
        }

        const school = new School({
            name,
            address,
            contact,
            principal,
            establishedyear,
            classeosffered,
            staff,
            status
        });

        await school.save();

        res.status(201).json({
            success: true,
            msg: "School registered successfully",
            school
        });
    } catch (error) {
        console.error('Error creating school:', error);
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
            error: error.message
        });
    }
});

export default router;
