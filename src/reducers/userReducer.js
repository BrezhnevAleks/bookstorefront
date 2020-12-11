import {
  ADD_USER,
  USER_CONFIRM_COMPLETION,
  SIGN_OUT_USER,
  GET_BY_TOKEN_FINISH,
  GET_BY_TOKEN_STARTED,
  USER_CREATE_FINISH,
  USER_CREATE_STARTED,
  USER_UPDATE_FINISH,
  USER_UPDATE_STARTED,
  USER_LOGIN_FINISH,
  USER_LOGIN_STARTED,
  FAVORITES_FETCH_STARTED,
  FAVORITES_FETCH_FINISH,
  ADD_FAVORITES_FINISH,
  ADD_FAVORITES_STARTED,
  ADD_SHOPLIST_FINISH,
  ADD_SHOPLIST_STARTED,
} from "../constants";

const defaultState = {
  loading: false,
  data: {},
  favorites: [],
  favoritesPageCount: 0,
  error: null,
  completed: false,
};
const user = (state = defaultState, action) => {
  switch (action.type) {
    case SIGN_OUT_USER:
      return defaultState;
    case USER_CONFIRM_COMPLETION:
      return {
        ...state,
        completed: action.completed,
      };
    case ADD_USER:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.data,
      };
    case USER_CREATE_STARTED:
      return {
        ...state,
        loading: true,
      };
    case USER_CREATE_FINISH:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: action.data,
      };

    case GET_BY_TOKEN_STARTED:
      return {
        ...state,
        loading: true,
      };
    case GET_BY_TOKEN_FINISH:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: action.data,
      };
    case USER_UPDATE_STARTED:
      return {
        ...state,
        loading: true,
      };
    case USER_UPDATE_FINISH:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: action.data,
        completed: true,
      };
    case USER_LOGIN_STARTED:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_FINISH:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: action.data,
      };

    case FAVORITES_FETCH_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FAVORITES_FETCH_FINISH:
      return {
        ...state,
        loading: false,
        error: action.error,
        favorites: action.favorites,
        favoritesPageCount: action.favoritesPageCount,
      };

    case ADD_FAVORITES_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_FAVORITES_FINISH:
      return {
        ...state,
        loading: false,
        error: action.error,
        favorites: action.data,
      };
    case ADD_SHOPLIST_STARTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_SHOPLIST_FINISH:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: { ...state.data, shoplist: action.data },
      };
    default:
      return state;
  }
};
export default user;
