import { connect } from "react-redux";
import * as bookActions from "../../actions/bookActions";
import * as userActions from "../../actions/userActions";
const mapStateToProps = ({ user: { data } }) => {
  return {
    shoplist: data.shoplist,
    user: data,
  };
};

const mapDispatchToProps = {
  ...bookActions,
  ...userActions,
};

export default (container) =>
  connect(mapStateToProps, mapDispatchToProps)(container);
