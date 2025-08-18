import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "declined", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "HO CHI MINH CITY",
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', JobSchema);
