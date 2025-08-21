import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/login").post(validateLoginInput, login);
router.route("/register").post(validateRegisterInput, register);

export default router;
