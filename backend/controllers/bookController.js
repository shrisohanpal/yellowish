import asyncHandler from "../middleware/asyncHandler.js";
import Book from "../models/bookModel.js";

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Book.countDocuments({ ...keyword });
  const books = await Book.find({ ...keyword })
    .populate("author", "userName")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  //console.log(books);
  res.json({ books, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  // console.log(books);
  res.json(books);
});

// @desc    Fetch books of a single author
// @route   GET /api/books/mine
// @access  Private
const getMyBooks = asyncHandler(async (req, res) => {
  //const books = await Book.find();
  const books = await Book.find({ author: req.user._id });
  res.json({ books });
});

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware. See README for more info.

  const book = await Book.findById(req.params.id).populate(
    "author",
    "userName"
  );
  if (book) {
    return res.json(book);
  } else {
    // NOTE: this will run if a valid ObjectId but no book was found
    // i.e. book may be null
    res.status(404);
    throw new Error("Book not found");
  }
});

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = asyncHandler(async (req, res) => {
  const book = new Book({
    title: "Sample Title",
    image: "/images/sample.jpg",
  });
  const createdBook = await book.save();
  res.status(201).json(createdBook);
});

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = asyncHandler(async (req, res) => {
  const {
    title,
    author,
    image,
    sellingPrice,
    printingCost,
    packagingCost,
    handlingCost,
    amazonPlaformFee,
    amazonRoyalty,
    amazonUrl,
    flipkartPlatformFee,
    flipkartRoyalty,
    flipkartUrl,
    kindlePlatformFee,
    kindleRoyalty,
    kindleUrl,
  } = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    book.title = title;
    book.author = author;
    book.image = image;
    book.sellingPrice = sellingPrice;
    book.printingCost = printingCost;
    book.packagingCost = packagingCost;
    book.handlingCost = handlingCost;
    book.amazonPlaformFee = amazonPlaformFee;
    book.amazonRoyalty = amazonRoyalty;
    book.amazonUrl = amazonUrl;
    book.flipkartPlatformFee = flipkartPlatformFee;
    book.flipkartRoyalty = flipkartRoyalty;
    book.flipkartUrl = flipkartUrl;
    book.kindlePlatformFee = kindlePlatformFee;
    book.kindleRoyalty = kindleRoyalty;
    book.kindleUrl = kindleUrl;

    const updatedBook = await book.save();
    res.json(updatedBook);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await Book.deleteOne({ _id: book._id });
    res.json({ message: "Book removed" });
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

// @desc    Create new review
// @route   POST /api/books/:id/reviews
// @access  Private
const createBookReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const book = await Book.findById(req.params.id);

  if (book) {
    const alreadyReviewed = book.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Book already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    book.reviews.push(review);

    book.numReviews = book.reviews.length;

    book.rating =
      book.reviews.reduce((acc, item) => item.rating + acc, 0) /
      book.reviews.length;

    await book.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

// @desc    Get top rated books
// @route   GET /api/books/top
// @access  Public
const getTopBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({}).sort({ rating: -1 }).limit(3);

  res.json(books);
});

export {
  getBooks,
  getAllBooks,
  getMyBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  createBookReview,
  getTopBooks,
};
