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
    salary: {
      type: String,
    },
    salaryPeriod: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    jobType: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    workType: {
      type: String,
      required: true,
    },
    Requirements: {
      type: [String],
      required: true,
    },
    Responsibilities: {
      type: [String],
    },
    experienceLevel: {
      type: String,
    },
    applicants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        appliedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
