import { connect } from "react-redux";
import { booksConfirmation, getOneBook, changeBook } from "../../actions/bookActions";
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
  changeBook,
};

export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
