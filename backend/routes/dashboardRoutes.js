import express from "express";
import {
  getAdminDashboard,
  getAuthorDashboard,
} from "../controllers/dashboardController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/admin").get(protect, admin, getAdminDashboard);
router.route("/author").get(protect, getAuthorDashboard);

export default router;
