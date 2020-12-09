import { connect } from "react-redux";
import { booksConfirmation, getOneBook } from "../../actions/bookActions";
import { userConfirmation } from "../../actions/userActions";

const mapStateToProps = ({
  user,
  booklist,
  booklist: { book, genres, completed },
}) => {
  return {
    book,
    genres,
    completed,
    error: user.error || booklist.error,
  };
};

const mapDispatchToProps = {
  booksConfirmation,
  getOneBook,
  userConfirmation,
};

export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
