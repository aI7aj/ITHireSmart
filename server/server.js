import express from "express";
import connectDB from "./config/db.js";
<<<<<<< HEAD
import userRoutes from './routes/users/usersRouts.js';
import profileRoutes from './routes/profile/profilesRout.js';
import jobRoutes from './routes/jobs/jobsRout.js';
import trainingRoutes from './routes/training/trainingRout.js';
import courseRoutes from './routes/course/courseRoutes.js';
import companyRoutes from './routes/company/companyRouts.js';
import cvRoutes from './routes/cv/cvRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
=======
import userRoutes from "./routes/users/usersRouts.js";
import profileRoutes from "./routes/profile/profilesRout.js";
import jobRoutes from "./routes/jobs/jobsRout.js";
import trainingRoutes from "./routes/training/trainingRout.js";
import courseRoutes from "./routes/course/courseRoutes.js";
import companyRoutes from "./routes/company/companyRouts.js";

import cors from "cors";
import dotenv from "dotenv";
>>>>>>> 3b71154209ff1a42617f05610d5a346ceb82b5e7
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/companies", companyRoutes);
<<<<<<< HEAD
app.use("/api/cv", cvRoutes);

=======
app.use("/api/trainings", trainingRoutes);
>>>>>>> 3b71154209ff1a42617f05610d5a346ceb82b5e7

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
