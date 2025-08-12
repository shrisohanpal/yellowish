import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import books from "./data/books.js";
import orders from "./data/orders.js";
import User from "./models/userModel.js";
import Book from "./models/bookModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;
    const authorUser1 = createdUsers[1]._id;
    const authorUser2 = createdUsers[2]._id;
    const authorUser3 = createdUsers[3]._id;

    const author1Books = books.slice(0, 7).map((book) => {
      return { ...book, author: authorUser1 };
    });
    const author2Books = books.slice(7, 14).map((book) => {
      return { ...book, author: authorUser2 };
    });
    const author3Books = books.slice(14, 21).map((book) => {
      return { ...book, author: authorUser3 };
    });
    await Book.insertMany(author1Books);
    await Book.insertMany(author2Books);
    await Book.insertMany(author3Books);

    await Order.insertMany(orders);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
