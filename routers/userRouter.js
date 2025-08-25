import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";

const router = Router();

router.route("/current-user").get(getCurrentUser);
router.route("/admin/app-stats").get(getApplicationStats);
router.route("/ ").patch(updateUser);

export default router;
