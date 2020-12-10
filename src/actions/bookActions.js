import { axiosInstance } from "../axios";
import {
  ADD_BOOKS,
  BOOKS_CONFIRM_COMPLETION,
  BOOKS_FETCH_FINISH,
  BOOKS_FETCH_STARTED,
  BOOK_CREATE_FINISH,
  BOOK_CREATE_STARTED,
  BOOK_CHANGE_FINISH,
  BOOK_CHANGE_STARTED,
  ADD_REVIEW_FINISH,
  ADD_REVIEW_STARTED,
  GET_REVIEWS_FINISH,
  GET_REVIEWS_STARTED,
  GENRES_FETCH_FINISH,
  GENRES_FETCH_STARTED,
  BOOK_FETCH_FINISH,
  BOOK_FETCH_STARTED,
} from "../constants";

export const addBooks = (data) => ({
  type: ADD_BOOKS,
  data,
});

export const booksConfirmation = () => ({
  type: BOOKS_CONFIRM_COMPLETION,
  completed: false,
});

export const getBooks = (filter = "id", genre = 0, page = 1, perPage = 4) => {
  return async (dispatch) => {
    dispatch(booksFetchStarted());
    try {
      const response = await axiosInstance.get("books", {
        params: {
          filter,
          genre,
          page,
          perPage,
        },
      });
      const { data: { books, pageCount } } = response;
      dispatch(booksFetchFinish(books, pageCount, null));
      dispatch(addBooks(books));
    } catch (err) {
      dispatch(booksFetchFinish([], 0, err.message));
    }
  };
};

export const booksFetchFinish = (books, pageCount, error) => ({
  type: BOOKS_FETCH_FINISH,
  books,
  pageCount,
  error,
});

export const booksFetchStarted = () => ({
  type: BOOKS_FETCH_STARTED,
});

export const getOneBook = (id) => {
  return async (dispatch) => {
    dispatch(bookFetchStarted());
    try {
      const response = await axiosInstance.get("books/one", {
        params: {
          id,
        },
      });
      const { data } = response;
      dispatch(bookFetchFinish(data, null));
    } catch (err) {
      dispatch(bookFetchFinish({}, err.message));
    }
  };
};

export const bookFetchFinish = (book, error) => ({
  type: BOOK_FETCH_FINISH,
  book,
  error,
});

export const bookFetchStarted = () => ({
  type: BOOK_FETCH_STARTED,
});

export const createBook = (payload) => {
  return async (dispatch) => {
    dispatch(createBookStarted());
    try {
      const response = await axiosInstance({
        method: "post",
        url: "books/newbook",
        data: payload,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { data } = response;
      dispatch(createBookFinish(data, null));
    } catch (err) {
      dispatch(createBookFinish({}, err.message));
    }
  };
};

export const createBookFinish = (data, error) => ({
  type: BOOK_CREATE_FINISH,
  data,
  error,
  completed: true,
});

export const createBookStarted = () => ({
  type: BOOK_CREATE_STARTED,
});

export const changeBook = (payload) => {
  return async (dispatch) => {
    dispatch(changeBookStarted());
    try {
      const response = await axiosInstance({
        method: "patch",
        url: "books/changebook",
        data: payload,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { data } = response;
      dispatch(changeBookFinish(data, null));
    } catch (err) {
      dispatch(changeBookFinish({}, err.message));
    }
  };
};

export const changeBookFinish = (data, error) => ({
  type: BOOK_CHANGE_FINISH,
  data,
  error,
  completed: true,
});

export const changeBookStarted = () => ({
  type: BOOK_CHANGE_STARTED,
});

export const addReview = (userId, bookId, text, rating) => {
  return async (dispatch) => {
    dispatch(addReviewStarted());
    try {
      const response = await axiosInstance.post("users/addreview", {
        userId,
        bookId,
        text,
        rating,
      });
      const { data } = response;
      dispatch(addReviewFinish(data, null));
    } catch (err) {
      dispatch(addReviewFinish({}, err.message));
    }
  };
};

export const addReviewFinish = (data, error) => ({
  type: ADD_REVIEW_FINISH,
  data,
  error,
});

export const addReviewStarted = () => ({
  type: ADD_REVIEW_STARTED,
});

export const getReviews = (bookId) => {
  return async (dispatch) => {
    dispatch(getReviewsStarted());
    try {
      const response = await axiosInstance.get("books/reviews", {
        params: {
          bookId,
        },
      });
      const {
        data: { reviews, rate },
      } = response;
      dispatch(getReviewsFinish(reviews, rate, null));
    } catch (err) {
      dispatch(getReviewsFinish([], 0, err.message));
    }
  };
};

export const getReviewsFinish = (reviews, rate, error) => ({
  type: GET_REVIEWS_FINISH,
  data: reviews,
  rate,
  error,
});

export const getReviewsStarted = () => ({
  type: GET_REVIEWS_STARTED,
});

export const getGenres = () => {
  return async (dispatch) => {
    dispatch(genresFetchStarted());
    try {
      const response = await axiosInstance.get("books/getgenres");
      const { data } = response;
      dispatch(genresFetchFinish(data, null));
    } catch (err) {
      dispatch(genresFetchFinish([], err.message));
    }
  };
};

export const genresFetchFinish = (genres, error) => ({
  type: GENRES_FETCH_FINISH,
  genres,
  error,
});

export const genresFetchStarted = () => ({
  type: GENRES_FETCH_STARTED,
});
