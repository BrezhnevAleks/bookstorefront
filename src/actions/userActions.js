import axios from "axios";
import { axiosInstance, setAuthToken } from "../axios";
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

export const userConfirmation = () => ({
  type: USER_CONFIRM_COMPLETION,
  completed: false,
});

export const signOutUser = () => ({
  type: SIGN_OUT_USER,
});

export const getUserByToken = () => {
  return async (dispatch) => {
    dispatch(getUserByStarted());
    try {
      const response = await axiosInstance.get("auth/bytoken");
      const {
        data: { user },
      } = response;
      dispatch(getUserByFinish(user, null));
    } catch (err) {
      dispatch(getUserByFinish({}, err.message));
    }
  };
};

export const getUserByFinish = (data, error) => ({
  type: GET_BY_TOKEN_FINISH,
  data,
  error,
});

export const getUserByStarted = () => ({
  type: GET_BY_TOKEN_STARTED,
});

export const createUser = (login, email, password) => {
  return async (dispatch) => {
    dispatch(createStarted());
    try {
      const response = await axios.post("http://localhost:4000/auth/create", {
        login,
        email,
        password,
        completed: false,
      });
      const {
        data: { user, token },
      } = response;
      dispatch(createFinish(user, null));

      localStorage.setItem("authToken", token);
      setAuthToken(token);
    } catch (err) {
      dispatch(createFinish({}, err.message));
    }
  };
};

export const createFinish = (data, error) => ({
  type: USER_CREATE_FINISH,
  data,
  error,
});

export const createStarted = () => ({
  type: USER_CREATE_STARTED,
});

export const updateUser = (id, login, email, password) => {
  return async (dispatch) => {
    dispatch(updateStarted());
    try {
      const response = await axiosInstance.patch("user/update", {
        id,
        login,
        email,
        password,
      });
      const {
        data: { user },
      } = response;
      dispatch(updateFinish(user, null));
    } catch (err) {
      dispatch(updateFinish({}, err.message));
    }
  };
};

export const updateFinish = (data, error) => ({
  type: USER_UPDATE_FINISH,
  data,
  error,
  completed: true,
});

export const updateStarted = () => ({
  type: USER_UPDATE_STARTED,
});

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(loginStarted());
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      const {
        data: { user, token },
      } = response;
      dispatch(loginFinish(user, null));
      localStorage.setItem("authToken", token);
      setAuthToken(token);
    } catch (err) {
      dispatch(loginFinish({}, err.message));
    }
  };
};

export const loginFinish = (data, error) => ({
  type: USER_LOGIN_FINISH,
  data,
  error,
});

export const loginStarted = () => ({
  type: USER_LOGIN_STARTED,
});
