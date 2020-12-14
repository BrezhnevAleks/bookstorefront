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

const defaultState = {
  loading: false,
  favorites: [],
  favoritesPageCount: 0,
  favoritesCount: 0,
  shoplist: [],
  shoplistPageCount: 0,
  shoplistCount: 0,
  error: null,
  completed: false,
};
const lists = (state = defaultState, action) => {
  switch (action.type) {
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
        favoritesCount: action.favoritesCount,
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
      };

    case SHOPLIST_FETCH_STARTED:
      return {
        ...state,
        loading: true,
      };
    case SHOPLIST_FETCH_FINISH:
      return {
        ...state,
        loading: false,
        error: action.error,
        shoplist: action.shoplist,
        shoplistPageCount: action.shoplistPageCount,
        shoplistCount: action.shoplistCount,
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
      };

    case FAVORITES_CHANGE_ICON:
      return {
        ...state,
        shoplist: state.shoplist.map((item) => (item.id === action.id
          ? { ...item, favorite: !item.favorite }
          : item)),
      };

    case SHOPLIST_CHANGE_ICON:
      return {
        ...state,
        favorites: state.favorites.map((item) => (item.id === action.id
          ? { ...item, inShopList: !item.inShopList }
          : item)),
      };

    default:
      return state;
  }
};
export default lists;
