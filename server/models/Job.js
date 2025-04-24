import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    jobTitle: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    salaryPeriod: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    jobType: {
      type: String,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    Requirements: {
      type: [String],
    },
    Responsibilities: {
      type: [String],
    },
    experienceLevel: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
