import "express-async-errors";
import { nanoid } from "nanoid";
import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

let jobs = [
  { id: nanoid(), company: "apple", position: "frontend" },
  { id: nanoid(), company: "google", position: "backend" },
];

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  // console.log(job);

  if (!job) throw new NotFoundError(`no job with id ${id}`);

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

  if (!updatedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "job has been modified", job: updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  if (!removedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  return res
    .status(StatusCodes.OK)
    .json({ msg: `job has been deleted`, job: removedJob });
};
