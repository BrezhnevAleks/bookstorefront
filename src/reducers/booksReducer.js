import {
  ADD_BOOKS,
  BOOKS_CONFIRM_COMPLETION,
  BOOKS_FETCH_SUCCESS,
  BOOKS_FETCH_STARTED,
  BOOKS_FETCH_FAILURE,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_STARTED,
  BOOK_CREATE_FAILURE,
  BOOK_CHANGE_SUCCESS,
  BOOK_CHANGE_STARTED,
  BOOK_CHANGE_FAILURE,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_STARTED,
  ADD_REVIEW_FAILURE,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_STARTED,
  GET_REVIEWS_FAILURE,
  GENRES_FETCH_SUCCESS,
  GENRES_FETCH_STARTED,
  GENRES_FETCH_FAILURE,
  BOOK_FETCH_SUCCESS,
  BOOK_FETCH_STARTED,
  BOOK_FETCH_FAILURE,
} from "../constants";

const booklist = (
  state = {
    loading: false,
    books: [],
    genres: [],
    error: null,
    created: {},
    changed: {},
    book: {},
    reviews: [],
    rate: 0,
    review: {},
    completed: false,
  },
  action,
) => {
  switch (action.type) {
    case ADD_BOOKS:
      return {
        ...state,
        loading: false,
        error: null,
        books: action.data,
      };
    case BOOKS_CONFIRM_COMPLETION:
      return {
        ...state,
        completed: action.completed,
      };
    case BOOKS_FETCH_STARTED:
      return {
        ...state,
        loading: true,
      };
    case BOOKS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        books: action.books,
      };
    case BOOKS_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case GENRES_FETCH_STARTED:
      return {
        ...state,
        loading: true,
      };
    case GENRES_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        genres: action.genres,
      };
    case GENRES_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case BOOK_CREATE_STARTED:
      return {
        ...state,
        loading: true,
      };
    case BOOK_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        created: action.data,
        completed: action.completed,
      };
    case BOOK_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        completed: action.completed,
      };
    case BOOK_CHANGE_STARTED:
      return {
        ...state,
        loading: true,
      };
    case BOOK_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        changed: action.data,
        completed: action.completed,
      };
    case BOOK_CHANGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        completed: action.completed,
      };
    case BOOK_FETCH_STARTED:
      return {
        ...state,
        loading: true,
      };
    case BOOK_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        book: action.book,
      };
    case BOOK_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.data,
        rate: action.rate,
      };
    case GET_REVIEWS_STARTED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_REVIEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        review: action.data,
      };
    case ADD_REVIEW_STARTED:
      return {
        ...state,
        loading: true,
      };
    case ADD_REVIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default booklist;
