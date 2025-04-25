import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseTitle: {
      type: String,
      required: true,
    },
    instructorName: {
      type: String,
    },
    location: {
      type: String,
      default: "Online",
    },
    courseType: {
      type: String,
      enum: ["Online", "company"],  
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
    },
    studentsEnrolled: {
      type: Number,
      default: 0,
    },
    topics: {
      type: [String],
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);
