import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import Job from "../models/JobModel.js";

export const getAllJobs = async (req, res) => {
  const jobs = await JobModel.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ msg: `New Job has been created`, job });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
};

export const editJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ msg: "job has been modified", job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  return res
    .status(StatusCodes.OK)
    .json({ msg: `job has been deleted`, job: removedJob });
};
