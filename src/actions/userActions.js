import axios from "axios";
import { axiosInstance } from "../axios.js";
import { setAuthToken } from "../axios.js";
import * as type from "../constants";

export const addUser = (data) => ({
  type: type.ADD_USER,
  data,
});

export const userConfirmation = () => ({
  type: type.USER_CONFIRM_COMPLETION,
  completed: false,
});

export const signOutUser = () => ({
  type: type.SIGN_OUT_USER,
});

export const getUserByToken = () => {
  return async (dispatch) => {
    dispatch(getUserByStarted());
    try {
      const response = await axiosInstance.get(`crud/bytoken`);
      const {
        data: { user },
      } = response;
      dispatch(getUserBySuccess(user));
    } catch (err) {
      console.log(err.message);
      dispatch(getUserByFailure(err.message));
    }
  };
};

export const getUserBySuccess = (data) => ({
  type: type.GET_BY_TOKEN_SUCCESS,
  data,
});

export const getUserByStarted = () => ({
  type: type.GET_BY_TOKEN_STARTED,
});

export const getUserByFailure = (error) => ({
  type: type.GET_BY_TOKEN_FAILURE,
  error,
});

export const createUser = (login, email, password) => {
  return async (dispatch) => {
    dispatch(createStarted());
    try {
      const response = await axios.post(`http://localhost:4000/crud/create`, {
        login,
        email,
        password,
        completed: false,
      });
      const {
        data: { user, token },
      } = response;
      dispatch(createSuccess(user));

      localStorage.setItem("authToken", token);
      setAuthToken(token);
    } catch (err) {
      dispatch(createFailure(err.message));
    }
  };
};

export const createSuccess = (data) => ({
  type: type.USER_CREATE_SUCCESS,
  data,
});

export const createStarted = () => ({
  type: type.USER_CREATE_STARTED,
});

export const createFailure = (error) => ({
  type: type.USER_CREATE_FAILURE,
  error,
});

export const updateUser = (id, login, email, password) => {
  return async (dispatch) => {
    dispatch(updateStarted());
    try {
      const response = await axiosInstance.post(`crud/update`, {
        id,
        login,
        email,
        password,
      });
      const {
        data: { user },
      } = response;
      dispatch(updateSuccess(user));
      dispatch(addUser(user));
    } catch (err) {
      dispatch(updateFailure(err.message));
    }
  };
};

export const updateSuccess = (data) => ({
  type: type.USER_UPDATE_SUCCESS,
  data,
  completed: true,
});

export const updateStarted = () => ({
  type: type.USER_UPDATE_STARTED,
});

export const updateFailure = (error) => ({
  type: type.USER_UPDATE_FAILURE,
  error,
});

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(loginStarted());
    try {
      const response = await axios.post(`http://localhost:4000/crud/login`, {
        email,
        password,
      });
      const {
        data: { user, token },
      } = response;
      dispatch(loginSuccess(user));
      localStorage.setItem("authToken", token);
      setAuthToken(token);
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  };
};

export const loginSuccess = (data) => ({
  type: type.USER_LOGIN_SUCCESS,
  data,
});

export const loginStarted = () => ({
  type: type.USER_LOGIN_STARTED,
});

export const loginFailure = (error) => ({
  type: type.USER_LOGIN_FAILURE,
  error,
});

export const toFavorites = (userId, bookId) => {
  return async (dispatch) => {
    dispatch(toFavoritesStarted());
    try {
      const response = await axiosInstance.post(`users/addtofavorites`, {
        userId,
        bookId,
      });
      const {
        data: { favorites },
      } = response;

      dispatch(toFavoritesSuccess(favorites));
    } catch (err) {
      dispatch(toFavoritesFailure(err.message));
    }
  };
};

export const toFavoritesSuccess = (data) => ({
  type: type.ADD_FAVORITES_SUCCESS,
  data,
});

export const toFavoritesStarted = () => ({
  type: type.ADD_FAVORITES_STARTED,
});

export const toFavoritesFailure = (error) => ({
  type: type.ADD_FAVORITES_FAILURE,
  error,
});

export const toShopList = (userId, bookId) => {
  return async (dispatch) => {
    dispatch(toShopListStarted());
    try {
      const response = await axiosInstance.post(`/users/addtoshoplist`, {
        userId,
        bookId,
      });
      const {
        data: { shoplist },
      } = response;
      dispatch(toShopListSuccess(shoplist));
    } catch (err) {
      dispatch(toShopListFailure(err.message));
    }
  };
};

export const toShopListSuccess = (data) => ({
  type: type.ADD_SHOPLIST_SUCCESS,
  data,
});

export const toShopListStarted = () => ({
  type: type.ADD_SHOPLIST_STARTED,
});

export const toShopListFailure = (error) => ({
  type: type.ADD_SHOPLIST_FAILURE,
  error,
});
