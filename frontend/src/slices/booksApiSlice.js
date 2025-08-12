import { BOOKS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: BOOKS_URL,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Books"],
    }),
    getAllBooks: builder.query({
      query: () => ({
        url: `${BOOKS_URL}/all`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Books"],
    }),
    getMyBooks: builder.query({
      query: () => ({
        url: `${BOOKS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["BooksByUser"],
    }),
    getBookDetails: builder.query({
      query: (bookId) => ({
        url: `${BOOKS_URL}/${bookId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createBook: builder.mutation({
      query: () => ({
        url: `${BOOKS_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation({
      query: (data) => ({
        url: `${BOOKS_URL}/${data.bookId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    uploadBookImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `${BOOKS_URL}/${bookId}`,
        method: "DELETE",
      }),
      providesTags: ["Book"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${BOOKS_URL}/${data.bookId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    getTopBooks: builder.query({
      query: () => `${BOOKS_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetAllBooksQuery,
  useGetMyBooksQuery,
  useGetBookDetailsQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useUploadBookImageMutation,
  useDeleteBookMutation,
  useCreateReviewMutation,
  useGetTopBooksQuery,
} = booksApiSlice;
