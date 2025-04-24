import mongoose, { Schema } from "mongoose";

const TrainingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trainingTitle: {
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
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
    trainingType: {
      type: String,
    },
    trainingDescription: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
    },
    topicsCovered: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Training", TrainingSchema);
