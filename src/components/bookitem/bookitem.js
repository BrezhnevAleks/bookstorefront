import React from "react";
import "./style.css";
import PropTypes from "prop-types";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { faHeart as regHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faPlus, faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import defaultCover from "../../images/defaultCover.png";

class BookItem extends React.Component {
  render() {
    const {
      handleLikeClick,
      handleShoplistClick,
      item,
      item: { id, name, author, price, rating, picture },
    } = this.props;

    return (
      <div className="item">
        <div className="item-header">
          <FontAwesomeIcon
            className="toShop-button"
            onClick={() => handleShoplistClick(item.id)}
            icon={
              item.inShopList
                ? faShoppingBasket
                : faPlus
            }
          />
          <h3 className="item-name">{name}</h3>
          <FontAwesomeIcon
            className="like-button"
            onClick={() => handleLikeClick(item.id)}
            icon={
              item.favorite
                ? solidHeart
                : regHeart
            }
          />
        </div>

        <Link
          key={id}
          to={{
            pathname: `/books/${id}`,
            state: { fromDashboard: true },
          }}
          className="item-body"
        >
          <img
            src={picture === "picture" ? defaultCover : picture}
            className="item-image"
          />
          <Rating name="read-only" value={Number(rating)} readOnly />

          <span className="item-author">{author}</span>
          <span className="item-price">{price} &#8381;</span>
        </Link>
      </div>
    );
  }
}

export default BookItem;

BookItem.propTypes = {
  handleLikeClick: PropTypes.func.isRequired,
  handleShoplistClick: PropTypes.func.isRequired,
  // favoritesForBooklist: PropTypes.func.isRequired,
  // shoplistForBooklist: PropTypes.func.isRequired,
  // toFavorites: PropTypes.func.isRequired,
  // toShopList: PropTypes.func.isRequired,
  // user: PropTypes.objectOf(
  //   PropTypes.oneOfType(
  //     [PropTypes.number,
  //       PropTypes.string,
  //       PropTypes.arrayOf(PropTypes.object)],
  //   ),
  // ).isRequired,
  item: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.number,
        PropTypes.string,
      ],
    ),
  ).isRequired,
  // perPage: PropTypes.number.isRequired,
  // page: PropTypes.number.isRequired,
};
