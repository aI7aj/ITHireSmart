import express from "express";
import connectDB from "./config/db.js";
import userRoutes from './routes/users.js';
import profileRoutes from './routes/profiles.js';
import jobRoutes from './routes/jobs.js';
import trainingRoutes from './routes/training.js';
import courseRoutes from './routes/course.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/training", trainingRoutes);   
app.use("/api/course", courseRoutes);


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})