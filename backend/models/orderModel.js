import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Book",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },
    orderPrice: {
      type: Number,
      // required: true,
      default: 0.0,
    },
    orderStatus: {
      type: String,
      // required: true,
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      // required: true,
      default: "Pending",
    },
    orderPlatform: {
      type: String,
      // required: true,
    },
    deliveryCharges: {
      type: Number,
      // required: true,
      default: 0,
    },
    platformRoyalty: {
      type: Number,
      // required: true,
      default: 0,
    },
    numberofOrders: {
      type: Number,
      // required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
