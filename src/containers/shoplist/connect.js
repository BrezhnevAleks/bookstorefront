import { connect } from "react-redux";
import { toFavorites, toShopList, getShoplist, favoritesChangeIcon } from "../../actions/listsActions";

const mapStateToProps = ({
  user: { data },
  lists: { shoplist, shoplistPageCount, shoplistCount },
}) => {
  return {
    shoplist,
    shoplistPageCount,
    shoplistCount,
    user: data,
  };
};

const mapDispatchToProps = {
  toFavorites,
  toShopList,
  getShoplist,
  favoritesChangeIcon,
};

export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
