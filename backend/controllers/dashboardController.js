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
    const totalRoyaltyData = await Order.aggregate([
      {
        $match: { author: req.user._id }, // filter orders by the logged-in author
      },
      {
        $group: {
          _id: null,
          totalPlatformRoyalty: {
            $sum: { $multiply: ["$platformRoyalty", "$numberofOrders"] },
          },
        },
      },
    ]);

    const totalOrdersData = await Order.aggregate([
      { $match: { author: req.user._id } }, // filter by author
      {
        $group: {
          _id: null,
          totalOrdersNum: { $sum: "$numberofOrders" }, // sum the field
        },
      },
    ]);

    // Amazon
    const amazonOrdersData = await Order.aggregate([
      {
        $match: {
          author: req.user._id,
          orderPlatform: "Amazon", // filter by platform also
        },
      }, // filter by author & orderPlatform
      {
        $group: {
          _id: null,
          amazonOrdersNum: { $sum: "$numberofOrders" }, // sum the field
        },
      },
    ]);

    // Flipkart
    const flipkartOrdersData = await Order.aggregate([
      {
        $match: {
          author: req.user._id,
          orderPlatform: "Flipkart", // filter by platform also
        },
      }, // filter by author & orderPlatform
      {
        $group: {
          _id: null,
          flipkartOrdersNum: { $sum: "$numberofOrders" }, // sum the field
        },
      },
    ]);

    // Kindle
    const kindleOrdersData = await Order.aggregate([
      {
        $match: {
          author: req.user._id,
          orderPlatform: "Kindle", // filter by platform also
        },
      }, // filter by author & orderPlatform
      {
        $group: {
          _id: null,
          kindleOrdersNum: { $sum: "$numberofOrders" }, // sum the field
        },
      },
    ]);

    res.json({
      totalBooks: await Book.countDocuments({ author: req.user._id }),
      totalOrders:
        totalOrdersData.length > 0 ? totalOrdersData[0].totalOrdersNum : 0, //await Order.countDocuments({ author: req.user._id }),

      totalRoyalty:
        totalRoyaltyData.length > 0
          ? totalRoyaltyData[0].totalPlatformRoyalty
          : 0,

      amazonOrders:
        amazonOrdersData.length > 0 ? amazonOrdersData[0].amazonOrdersNum : 0,
      flipkartOrders:
        flipkartOrdersData.length > 0
          ? flipkartOrdersData[0].flipkartOrdersNum
          : 0,
      kindleOrders:
        kindleOrdersData.length > 0 ? kindleOrdersData[0].kindleOrdersNum : 0,

      /* amazonOrders: await Order.countDocuments({
        author: req.user._id,
        orderPlatform: "Amazon",
      }),
      flipkartOrders: await Order.countDocuments({
        author: req.user._id,
        orderPlatform: "Flipkart",
      }),
      kindleOrders: await Order.countDocuments({
        author: req.user._id,
        orderPlatform: "Kindle",
      }),*/
    });
  } else {
    res.status(404);
    throw new Error("User not Authorise");
  }
});

export { getAdminDashboard, getAuthorDashboard };
