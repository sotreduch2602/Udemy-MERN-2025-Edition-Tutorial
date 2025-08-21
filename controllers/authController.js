import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { comparePassword, hashedPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";

export const register = async (req, res, next) => {
  try {
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? "admin" : "user";

    const newHashedPassword = await hashedPassword(req.body.password);
    req.body.password = newHashedPassword;

    const user = await User.create(req.body);
    res.status(StatusCodes.CREATED).json({ msg: "User created", user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const isValidUser =
      user && (await comparePassword(req.body.password, user.password));

    if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

    res.send("login");
  } catch (error) {
    next(error);
  }
};
