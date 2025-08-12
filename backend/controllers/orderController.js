import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import Book from "../models/bookModel.js";
import { calcPrices } from "../utils/calcPrices.js";
import { verifyPayPalPayment, checkIfNewTransaction } from "../utils/paypal.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private/ Admin
const createOrder = asyncHandler(async (req, res) => {
  const order = new Order({});
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // NOTE: here we need to verify the payment was made to PayPal before marking
  // the order as paid
  const { verified, value } = await verifyPayPalPayment(req.body.id);
  if (!verified) throw new Error("Payment not verified");

  // check if this transaction has been used before
  const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  if (!isNewTransaction) throw new Error("Transaction has been used before");

  const order = await Order.findById(req.params.id);

  if (order) {
    // check the correct amount was paid
    const paidCorrectAmount = order.totalPrice.toString() === value;
    if (!paidCorrectAmount) throw new Error("Incorrect amount paid");

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order details
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.bookName = req.body.bookName;
    order.orderPrice = req.body.orderPrice;
    order.orderStatus = req.body.orderStatus;
    order.paymentStatus = req.body.paymentStatus;
    order.orderPlatform = req.body.orderPlatform;
    order.deliveryCharges = req.body.deliveryCharges;
    order.platformRoyalty = req.body.platformRoyalty;
    order.numberofOrders = req.body.numberofOrders;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}); //.populate('user', 'id name');
  res.json(orders);
});

// @desc    Delete a order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await Order.deleteOne({ _id: order._id });
    res.json({ message: "Order removed" });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrder,
  getOrders,
  deleteOrder,
};
