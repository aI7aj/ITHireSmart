import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyDescription: { type: String, required: true },
    companyField: { type: String, required: true },
    companyEmail: { type: String, required: true },
    companyNumbers: { type: String, required: true },
    location: { type: String, required: true },
    companyWebsite: { type: String, required: true },
    contactName: { type: String, required: true },
    contactPosition: { type: String, required: true },
    contactPhoneNumber: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
