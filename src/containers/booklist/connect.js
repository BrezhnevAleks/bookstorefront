import { connect } from "react-redux";
import { getGenres, getBooks, favoritesForBooklist, shoplistForBooklist } from "../../actions/bookActions";
import { toFavorites, toShopList } from "../../actions/listsActions";

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
  favoritesForBooklist,
  shoplistForBooklist,
};

export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
