import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
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
      trim: true,
      minlength: 10,
      maxlength: 100,
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
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    role: {
      type: String,
      enum: ["user", "admin", "company"],
      default: "user",
    },
    /* Using AI to get This Info  */
    education: [String],
    experience: [String],
    trainingCourses: [String],
    skills: [String],
    languages: [String]

    , profilepic: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
        publicid: null
      }
    },
    bio: String,

  },
  {
    timestamps: true,

  }
)
  ;

export default mongoose.model("User", userSchema);