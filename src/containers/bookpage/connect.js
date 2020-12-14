import { connect } from "react-redux";
import { addReview, getReviews, getOneBook } from "../../actions/bookActions";
import { toFavorites, toShopList } from "../../actions/listsActions";

const mapStateToProps = ({
  booklist: { book, reviews, rate },
  user: { data },
}) => {
  return {
    book,
    user: data,
    reviews,
    rate,
  };
};

const mapDispatchToProps = {
  addReview,
  getReviews,
  getOneBook,
  toFavorites,
  toShopList,
};

export default (container) => connect(mapStateToProps, mapDispatchToProps)(container);
