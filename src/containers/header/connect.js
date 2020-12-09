import { connect } from "react-redux";
import { signOutUser } from "../../actions/userActions";
import { getBooks } from "../../actions/bookActions";

const mapStateToProps = ({ user: { data } }) => {
  return {
    user: data,
  };
};

const mapDispatchToProps = {
  signOutUser,
  getBooks,
};

export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
