import React from "react";
import PropTypes from "prop-types";
import "./style.css";

class Message extends React.Component {
  handleOnClickOk = () => {
    const { userConfirmation, booksConfirmation } = this.props;
    userConfirmation();
    booksConfirmation();
  };

  render() {
    const { error } = this.props;
    return (
      <div className="message-body">
        <p className="message-text">{error || "Сделано"}</p>
        <button className="message-button" onClick={this.handleOnClickOk}>
          Ok
        </button>
      </div>
    );
  }
}

export default Message;

Message.propTypes = {
  userConfirmation: PropTypes.func.isRequired,
  booksConfirmation: PropTypes.func.isRequired,
  error: PropTypes.node.isRequired,
};
