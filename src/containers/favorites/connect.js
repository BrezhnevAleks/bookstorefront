import { connect } from "react-redux";
import { toFavorites, toShopList, getFavorites } from "../../actions/userActions";
import { favoritesForBooklist } from "../../actions/bookActions";

const mapStateToProps = ({ user: { data, favorites, favoritesPageCount } }) => {
  return {
    favorites,
    favoritesPageCount,
    user: data,
  };
};

const mapDispatchToProps = {
  toFavorites,
  toShopList,
  getFavorites,
  favoritesForBooklist,
};

export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
