import { axiosInstance } from "../axios";
import {
  FAVORITES_FETCH_STARTED,
  FAVORITES_FETCH_FINISH,
  ADD_FAVORITES_FINISH,
  ADD_FAVORITES_STARTED,
  SHOPLIST_FETCH_STARTED,
  SHOPLIST_FETCH_FINISH,
  ADD_SHOPLIST_FINISH,
  ADD_SHOPLIST_STARTED,
  FAVORITES_CHANGE_ICON,
  SHOPLIST_CHANGE_ICON,
} from "../constants";

export const getFavorites = (id, page = 0, perPage = 0) => {
  return async (dispatch) => {
    dispatch(favoritesFetchStarted());
    try {
      const response = await axiosInstance.get("booklists/getfavorites", {
        params: {
          id,
          page,
          perPage,
        },
      });
      const { data: { favorites, pageCount, favoritesCount } } = response;
      dispatch(favoritesFetchFinish(favorites, pageCount, favoritesCount, null));
    } catch (err) {
      dispatch(favoritesFetchFinish([], 0, 0, err.message));
    }
  };
};

export const favoritesFetchFinish = (favorites, favoritesPageCount, favoritesCount, error) => ({
  type: FAVORITES_FETCH_FINISH,
  favorites,
  favoritesPageCount,
  favoritesCount,
  error,
});

export const favoritesFetchStarted = () => ({
  type: FAVORITES_FETCH_STARTED,
});

export const toFavorites = (userId, bookId) => {
  return async (dispatch) => {
    dispatch(toFavoritesStarted());
    try {
      await axiosInstance.post("booklists/addtofavorites", {
        userId,
        bookId,
      });

      dispatch(toFavoritesFinish(null));
    } catch (err) {
      dispatch(toFavoritesFinish(err.message));
    }
  };
};

export const toFavoritesFinish = (error) => ({
  type: ADD_FAVORITES_FINISH,
  error,
});

export const toFavoritesStarted = () => ({
  type: ADD_FAVORITES_STARTED,
});

export const getShoplist = (id, page = 0, perPage = 0) => {
  return async (dispatch) => {
    dispatch(favoritesFetchStarted());
    try {
      const response = await axiosInstance.get("booklists/getshoplist", {
        params: {
          id,
          page,
          perPage,
        },
      });
      const { data: { shoplist, pageCount, shoplistCount } } = response;
      dispatch(shoplistFetchFinish(shoplist, pageCount, shoplistCount, null));
    } catch (err) {
      dispatch(shoplistFetchFinish([], 0, 0, err.message));
    }
  };
};

export const shoplistFetchFinish = (shoplist, shoplistPageCount, shoplistCount, error) => ({
  type: SHOPLIST_FETCH_FINISH,
  shoplist,
  shoplistPageCount,
  shoplistCount,
  error,
});

export const shoplistFetchStarted = () => ({
  type: SHOPLIST_FETCH_STARTED,
});

export const toShopList = (userId, bookId) => {
  return async (dispatch) => {
    dispatch(toShopListStarted());
    try {
      await axiosInstance.post("/booklists/addtoshoplist", {
        userId,
        bookId,
      });
      dispatch(toShopListFinish(null));
    } catch (err) {
      dispatch(toShopListFinish(err.message));
    }
  };
};

export const toShopListFinish = (error) => ({
  type: ADD_SHOPLIST_FINISH,
  error,
});

export const toShopListStarted = () => ({
  type: ADD_SHOPLIST_STARTED,
});

export const favoritesChangeIcon = (id) => ({
  type: FAVORITES_CHANGE_ICON,
  id,
});

export const shoplistChangeIcon = (id) => ({
  type: SHOPLIST_CHANGE_ICON,
  id,
});
