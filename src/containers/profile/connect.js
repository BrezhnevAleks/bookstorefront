import { connect } from "react-redux";
import { booksConfirmation, createBook } from "../../actions/bookActions";
import { userConfirmation, updateUser } from "../../actions/userActions";

const mapStateToProps = ({
  user: { data, shoplist },
  booklist,
  user,
  booklist: { genres },
}) => {
  return {
    genres,
    shoplist,
    user: data,
    completed: user.completed || booklist.completed,
    error: user.error || booklist.error,
  };
};

const mapDispatchToProps = {
  booksConfirmation,
  createBook,
  userConfirmation,
  updateUser,
};

export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
