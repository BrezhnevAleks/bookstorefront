import { connect } from "react-redux";
import { getGenres, getBooks, favoritesForBooklist } from "../../actions/bookActions";
import { toFavorites, toShopList, getFavorites } from "../../actions/userActions";

const mapStateToProps = ({
  user: { data },
  booklist: { books, genres, loading, pageCount, bookCount },
}) => {
  return {
    user: data,
    books,
    genres,
    loading,
    pageCount,
    bookCount,
  };
};

const mapDispatchToProps = {
  getGenres,
  getBooks,
  toFavorites,
  toShopList,
  getFavorites,
  favoritesForBooklist,
};

export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
