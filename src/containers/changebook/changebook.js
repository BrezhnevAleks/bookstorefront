import React from "react";
import { withRouter } from "react-router";
import { compose } from "redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "../header/header";
import connect from "./connect";
import Message from "../../components/message/message";

class ChangeBook extends React.Component {
  constructor(props) {
    super(props);
    const { name, author, price, description } = this.props;
    this.state = {
      bookcover: "",
      name,
      author,
      price,
      description,
    };
  }

  handleChange = (e) => {
    switch (e.target.name) {
      case "image":
        return this.setState({ bookcover: e.target.files[0] });
      case "name":
        return this.setState({ name: e.target.value });
      case "author":
        return this.setState({ author: e.target.value });
      case "price":
        return this.setState({ price: e.target.value });
      case "description":
        return this.setState({ description: e.target.value });
      default:
        return null;
    }
  };

  // handleChangeSelect = (e) => {
  //   this.setState({ genre: e.value });
  // };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { bookcover, name, author, price, description } = this.state;
    const {
      changeBook,
      match: {
        params: { id },
      },
    } = this.props;
    const formData = new FormData();

    formData.append("bookcover", bookcover);
    formData.append("name", name);
    formData.append("author", author);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("id", id);

    changeBook(formData);
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
      book: { name, author, price, description },
      getOneBook,
    } = this.props;

    getOneBook(id);

    this.setState({
      name,
      author,
      price,
      description,
    });
  }

  render() {
    const { name, author, price, description, bookcover } = this.state;
    const {
      match: {
        params: { id },
      },
      completed,
      error,
      userConfirmation,
      booksConfirmation,
    } = this.props;

    return (
      <div className={"change-book"}>
        <Header />
        {completed ? (
          <Link
            to={{
              pathname: `/books/${id}`,
              state: { fromDashboard: true },
            }}
          >
            <Message
              error={error}
              userConfirmation={userConfirmation}
              booksConfirmation={booksConfirmation}
            />
          </Link>
        ) : (
          <div>
            <h1>Изменить книгу</h1>

            <form
              className="new-book"
              encType="multipart/form-data"
              onSubmit={this.handleSubmit}
            >
              <label htmlFor="image" className="new-book-image">
                {bookcover ? bookcover.name : "Загрузить обложку для книги"}
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={this.handleChange}
              />
              <input
                value={name}
                type="text"
                name="name"
                className="new-book-input"
                placeholder="Название книги"
                onChange={this.handleChange}
              />
              <input
                value={author}
                type="text"
                name="author"
                className="new-book-input"
                placeholder="Имя автора"
                onChange={this.handleChange}
              />
              <input
                value={price}
                placeholder="Цена"
                type="number"
                min="0"
                name="price"
                className="new-book-input"
                onChange={this.handleChange}
              />
              <textarea
                value={description}
                name="description"
                rows="10"
                cols="50"
                className="new-book-description"
                onChange={this.handleChange}
                placeholder="Добавьте описание для книги"
              />
              <input
                className="new-book-submit"
                type="submit"
                value="Изменить книгу"
              />
            </form>
          </div>
        )}
      </div>
    );
  }
}
export default compose(withRouter, connect)(ChangeBook);

ChangeBook.propTypes = {
  userConfirmation: PropTypes.func.isRequired,
  booksConfirmation: PropTypes.func.isRequired,
  getOneBook: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  changeBook: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  error: PropTypes.node.isRequired,
  match: PropTypes.objectOf(PropTypes.string).isRequired,
  book: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.number,
        PropTypes.string,
      ],
    ),
  ).isRequired,
};
