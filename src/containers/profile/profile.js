import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import "./style.css";
import connect from "./connect";
import Header from "../header/header";
import NewBook from "../../components/createbookpage/newbookpage.js";
import UpdatePage from "../../components/updateUser/updateUser";
import Message from "../../components/message/message";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { feature: "add" };
  }

  handleOnClickFeatureButton = (e) => {
    return this.setState({ feature: e.target.value });
  };

  handleOption = (value, complete) => {
    const {
      genres,
      createBook,
      user,
      updateUser,
      error,
      userConfirmation,
      booksConfirmation,
    } = this.props;
    if (complete) {
      return (
        <Message
          error={error}
          userConfirmation={userConfirmation}
          booksConfirmation={booksConfirmation}
        />
      );
    }
    if (value === "add") {
      return (
        <NewBook
          genres={genres}
          createBook={createBook}
        />
      );
    }
    if (value === "update") {
      return (
        <UpdatePage
          user={user}
          updateUser={updateUser}
        />
      );
    }
  };

  render() {
    const {
      user: { login, email, shoplist, favorites },
      completed,
    } = this.props;
    const { feature } = this.state;

    return (
      <div>
        <Header />
        <Grid
        className={"profile-container"}
          container
          item
          spacing={4}
          xs={12}
          direction="row"
          justify="space-between"
          alignItems="flex-start"
        >
          <Grid
            container
            item
            justify="flex-start"
            className="genres"
            direction="column"
            alignItems="flex-start"
            xs={3}
          >
            <h3 className="categories">Личный кабинет</h3>
            <p>Имя: {login}</p>
            <p>Email: {email}</p>
            <Link to="/shoplist">Корзина: [{shoplist.length}]</Link>
            <Link to="/favorites">Избранное: [{favorites.length}]</Link>
          </Grid>

          <Grid
            container
            item
            xs={9}
            cellHeight="auto"
            spacing={0}
            alignContent="center"
            direction="column"
          >
            <Grid
              container
              item
              xs={12}
              cellHeight="auto"
              spacing={0}
              justify="center"
            >
              <div className="profile-functions">
                <button
                  value="add"
                  className={
                    feature === "add"
                      ? "profile-functions-button-active"
                      : "profile-functions-button"
                  }
                  onClick={this.handleOnClickFeatureButton}
                >
                  Добавить книгу
                </button>
                <button
                  value="update"
                  className={
                    feature === "update"
                      ? "profile-functions-button-active"
                      : "profile-functions-button"
                  }
                  onClick={this.handleOnClickFeatureButton}
                >
                  Изменить данные
                </button>
              </div>
            </Grid>
            <Grid
              className="profile-body"
              container
              item
              xs={12}
              spacing={0}
              justify="center"
            >
              {this.handleOption(feature, completed)}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(Profile);

Profile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  booksConfirmation: PropTypes.func.isRequired,
  userConfirmation: PropTypes.func.isRequired,
  createBook: PropTypes.func.isRequired,
  user: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.number,
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.object)],
    ),
  ).isRequired,
  completed: PropTypes.bool.isRequired,
  genres: PropTypes.arrayOf(PropTypes.node).isRequired,
  error: PropTypes.node.isRequired,
};
