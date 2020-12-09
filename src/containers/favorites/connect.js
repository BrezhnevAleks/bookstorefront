import { connect } from "react-redux";
import { toFavorites, toShopList } from "../../actions/userActions";

const mapStateToProps = ({ user: { data } }) => {
  return {
    favorites: data.favorites,
    user: data,
  };
};

const mapDispatchToProps = {
  toFavorites,
  toShopList,
};

export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
