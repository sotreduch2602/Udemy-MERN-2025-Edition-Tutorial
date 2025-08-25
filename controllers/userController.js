import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  const userWithoutPassword = user.toJSON();

  res
    .status(StatusCodes.OK)
    .json({ msg: "Your Current User", user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const user = await User.countDocuments();
  const job = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ msg: "application stats", user, job });
};

export const updateUser = async (req, res) => {
  console.log({ ...req.body });
  const objWithoutPassword = { ...req.body };
  delete objWithoutPassword.password;
  console.log(objWithoutPassword);
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body);
  res.status(StatusCodes.OK).json({ msg: "update user" });
};
