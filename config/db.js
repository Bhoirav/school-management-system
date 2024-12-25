import mongoose from 'mongoose';
mongoose.set("strictQuery", false);

import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.DB_NAME
        });
        console.log(`MongoDB Connected: ${conn.connection.host}, Database: ${conn.connection.name}`);
    } catch (err) {
        console.error(`MongoDB Connection Error: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;
