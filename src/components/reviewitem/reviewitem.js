import React from "react";
import "./style.css";
import PropTypes from "prop-types";

class ReviewItem extends React.Component {
  render() {
    const {
      item: {
        text,
        user: { login },
      },
    } = this.props;

    return (
      <div className="review">
        <h4 className="user-name">{login}</h4>
        <p className="review-text">{text}</p>
      </div>
    );
  }
}

export default ReviewItem;

ReviewItem.propTypes = {
  item: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.number,
        PropTypes.string,
        PropTypes.object,
      ],
    ),
  ).isRequired,
};
