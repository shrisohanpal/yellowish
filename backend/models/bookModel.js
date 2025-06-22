import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
     // required: true,
      ref: 'User',
    },
    title: {
      type: String,
     // required: true,
    },
    image: {
      type: String,
     // required: true,
    },
    sellingPrice: {
      type: Number,
     // required: true,
    },
    printingCost: {
      type: Number,
     // required: true,
    },
    packagingCost: {
      type: Number,
     // required: true,
    },
    handlingCost: {
      type: Number,
     // required: true,
    },
    amazonPlatformFee: {
      type: Number,
     // required: true
    },
    amazonRoyalty: {
      type: Number,
     // required: true,
    },
    amazonUrl: {
      type: String,
     // required: true,
    },
    flipkartPlatformFee: {
      type: Number,
     // required: true
    },
    flipkartRoyalty: {
      type: Number,
    //  required: true,
    },
    flipkartUrl: {
      type: String,
     // required: true,
    },
    kindlePlatformFee: {
      type: Number,
    //  required: true
    },
    kindleRoyalty: {
      type: Number,
     // required: true,
    },
    kindleUrl: {
      type: String,
     // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
