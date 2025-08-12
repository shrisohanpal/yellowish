import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import Book from "../models/bookModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";

// @desc    Get Admin Dashboard Data
// @route   GET /api/dashboard/admin
// @access  Private, Admin
const getAdminDashboard = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user.isAdmin) {
    res.json({
      totalBooks: await Book.countDocuments({}),
      totalUsers: await User.countDocuments({}),
      totalOrders: await Order.countDocuments({}),
      amazonOrders: await Order.countDocuments({ orderPlatform: "Amazon" }),
      flipkartOrders: await Order.countDocuments({
        orderPlatform: "Flipkart",
      }),
      kindleOrders: await Order.countDocuments({ orderPlatform: "Kindle" }),
    });
  } else {
    res.status(404);
    throw new Error("User not Authorise");
  }
});

// @desc    Get Author Dashboard Data
// @route   GET /api/dashboard/author
// @access  Private
const getAuthorDashboard = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      totalOrders: await Order.countDocuments({}),
      totalRoyalty: 56781, //await Order.countDocuments({}),
      amazonOrders: await Order.countDocuments({ orderPlatform: "Amazon" }),
      flipkartOrders: await Order.countDocuments({
        orderPlatform: "Flipkart",
      }),
      kindleOrders: await Order.countDocuments({ orderPlatform: "Kindle" }),
    });
  } else {
    res.status(404);
    throw new Error("User not Authorise");
  }
});

export { getAdminDashboard, getAuthorDashboard };
