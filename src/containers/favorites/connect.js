import { connect } from "react-redux";
import { toFavorites, toShopList, getFavorites, shoplistChangeIcon } from "../../actions/listsActions";

const mapStateToProps = ({
  user: { data },
  lists: { favorites, favoritesPageCount, favoritesCount },
}) => {
  return {
    favorites,
    favoritesPageCount,
    favoritesCount,
    user: data,
  };
};

const mapDispatchToProps = {
  toFavorites,
  toShopList,
  getFavorites,
  shoplistChangeIcon,
};

export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
