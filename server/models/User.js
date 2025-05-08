import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ["user", "admin", "company"],
    default: "user",
  }
},{
  timestamps :true,
});

export default mongoose.model("User", userSchema);