import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({
        path:'../config/.env'
});

const router = express.Router();

router.post('/register', async (req, res, next) => {
    const {
        username,
        phone,
        email,
        password
    } = req.body;

    try {
        let user_exist = await User.findOne({ phone: phone });
        if (user_exist) {
            return res.status(409).json({
                success: false,
                msg: "User already exists"
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let user = new User({
            username: username,
            phone: phone,
            email: email,
            password: hashedPassword,
        });

        await user.save();
        res.status(200).json({
            success: true,
            msg: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                phone: user.phone,
                email: user.email,
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username: username });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {

                const payload = { id: user._id, phone: user.username };

                const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
                const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

                user.refreshTokens.push({
                    token: refreshToken,
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    issuedAt: new Date(),
                    used: false,
                });
                await user.save();

                const { password, ...userObject } = user.toObject();
                res.json({
                    success: true,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    user: userObject,
                    msg: "Logged in successfully"
                });
            } else {
                res.json({
                    success: false,
                    msg: "Wrong password"
                });
            }
        } else {
            res.json({
                success: false,
                msg: "User doesn't exist"
            });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});

router.post('/logout', async (req, res, next) => {

});

router.get('/profile', async (req, res, next) => {
    const { userid } = req.body;

    try {
        let user = await User.findById(userid)
        if (!user) {
            res.json({
                success: false,
                msg: "User doesn't exist"
            });
        }

        const { password, ...userObject } = user.toObject();

        res.json({
            success: true,
            user: userObject,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
});

export default router;