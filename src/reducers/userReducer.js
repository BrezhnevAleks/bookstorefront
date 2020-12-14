import {
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
} from "../constants";

const defaultState = {
  loading: false,
  data: {},
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

    default:
      return state;
  }
};
export default user;
