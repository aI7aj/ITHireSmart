import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); 
const db = process.env.MONGO_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Connected to MongoDB Successfully");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export default connectDB;
