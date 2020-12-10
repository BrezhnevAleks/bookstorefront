import { connect } from "react-redux";
import { getGenres, getBooks } from "../../actions/bookActions";
import { toFavorites, toShopList } from "../../actions/userActions";

const mapStateToProps = ({
  user: { data },
  booklist: { books, genres, loading, pageCount },
}) => {
  return {
    user: data,
    books,
    genres,
    loading,
    pageCount,
  };
};

const mapDispatchToProps = {
  getGenres,
  getBooks,
  toFavorites,
  toShopList,
};

export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
