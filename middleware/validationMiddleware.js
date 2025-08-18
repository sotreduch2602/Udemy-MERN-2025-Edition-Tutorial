import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPES } from "../utils/constants.js";
import Job from "../models/JobModel.js";
import mongoose from "mongoose";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg);
        if (errorMessage[0].startsWith("no job"))
          throw new NotFoundError(errorMessage);

        throw new BadRequestError(errorMessage);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("company is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPES))
    .withMessage("invalid type value"),
]);

export const validateIdParam = withValidationErrors([
  param("id")
    .custom(async (value) => {
      const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidMongoId) throw new BadRequestError("invalid MongoDB id");

      const job = await Job.findById(value);
      if (!job) throw new NotFoundError(`no job with id ${value}`);
    })
]);
