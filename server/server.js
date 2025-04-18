import express from "express";
import connectDB from "./config/db.js";
import userRoutes from './routes/users.js';
import profileRoutes from './routes/profiles.js';

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);


connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})