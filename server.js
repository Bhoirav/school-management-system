import express from 'express';
import morgan from 'morgan';
import connectDb from './config/db.js';
import dotenv from 'dotenv';
import userRoute from './routes/user.js';
import studentRoute from './routes/student.js';
import schoolRoute from './routes/school.js';
import classroomRoute from './routes/classroom.js';
import cors from 'cors';
import requireAdmin from './middlewares/authRole.js';
import authenticateToken from './middlewares/authToken.js';

dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(express.json({}));

app.use(cors());

connectDb();

app.use('/user', userRoute);
app.use('/student', studentRoute);
app.use('/school', schoolRoute);
app.use('/classroom', classroomRoute);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});