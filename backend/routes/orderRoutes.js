import express from "express";
const router = express.Router();
import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrder,
  getOrders,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

router
  .route("/")
  .post(protect, admin, createOrder)
  .get(protect, admin, getOrders);
router.route("/mine").get(protect, getMyOrders);
router
  .route("/:id")
  .get(protect, getOrderById)
  .delete(protect, admin, checkObjectId, deleteOrder);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id").put(protect, admin, updateOrder);

export default router;
