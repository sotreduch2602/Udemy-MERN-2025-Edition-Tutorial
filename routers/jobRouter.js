import { Router } from "express";
import {
  createJob,
  deleteJob,
  editJob,
  getAllJobs,
  getSingleJob,
} from "../controllers/jobControllers.js";
import {
  validateIdParam,
  validateJobInput,
} from "../middleware/validationMiddleware.js";
const router = Router();

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .patch(validateJobInput, validateIdParam, editJob)
  .delete(validateIdParam, deleteJob);

export default router;
