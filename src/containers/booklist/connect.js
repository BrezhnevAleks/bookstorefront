import { connect } from "react-redux";
import { getGenres, getBooks } from "../../actions/bookActions";
import { toFavorites, toShopList } from "../../actions/userActions";

const mapStateToProps = ({
  user: { data },
  booklist: { books, genres, loading },
}) => {
  return {
    user: data,
    books,
    genres,
    loading,
  };
};

const mapDispatchToProps = {
  getGenres,
  getBooks,
  toFavorites,
  toShopList,
};

export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
