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
  FAVORITES_FOR_BOOKLIST,
} from "../constants";

const booklist = (
  state = {
    loading: false,
    books: [],
    bookCount: 0,
    pageCount: 0,
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
    case BOOKS_FETCH_FINISH:
      return {
        ...state,
        loading: false,
        error: action.error,
        books: action.books,
        pageCount: action.pageCount,
        bookCount: action.bookCount,
      };

    case GENRES_FETCH_STARTED:
      return {
        ...state,
        loading: true,
      };
    case GENRES_FETCH_FINISH:
      return {
        ...state,
        loading: false,
        error: action.error,
        genres: action.genres,
      };
    case BOOK_CREATE_STARTED:
      return {
        ...state,
        loading: true,
      };
    case BOOK_CREATE_FINISH:
      return {
        ...state,
        loading: false,
        error: action.error,
        created: action.data,
        completed: action.completed,
      };

    case BOOK_CHANGE_STARTED:
      return {
        ...state,
        loading: true,
      };
    case BOOK_CHANGE_FINISH:
      return {
        ...state,
        loading: false,
        error: action.error,
        changed: action.data,
        completed: action.completed,
      };

    case BOOK_FETCH_STARTED:
      return {
        ...state,
        loading: true,
      };
    case BOOK_FETCH_FINISH:
      return {
        ...state,
        loading: false,
        error: action.error,
        book: action.book,
      };
    case GET_REVIEWS_FINISH:
      return {
        ...state,
        loading: false,
        reviews: action.data,
        rate: action.rate,
        error: action.error,
      };
    case GET_REVIEWS_STARTED:
      return {
        ...state,
        loading: false,
      };

    case FAVORITES_FOR_BOOKLIST:
      return {
        ...state,
        books: state.books.map((item) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          (item.id === action.id ? { ...item, favorite: !item.favorite } : item)),
      };

    case ADD_REVIEW_FINISH:
      return {
        ...state,
        loading: false,
        error: action.error,
        review: action.data,
      };
    case ADD_REVIEW_STARTED:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default booklist;
