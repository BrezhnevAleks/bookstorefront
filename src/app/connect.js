import { connect } from "react-redux";
import * as mainAppActions from "../actions/userActions";

const mapStateToProps = ({ user: { data, error } }) => {
  return {
    data,
    error,
  };
};

const mapDispatchToProps = {
  ...mainAppActions,
};

export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
