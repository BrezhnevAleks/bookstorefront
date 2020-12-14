import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import BookItem from "../../components/bookitem/bookitem";
import BooksFilter from "../../components/booksfilter/booksfilter";
import Header from "../header/header.js";
import Loading from "../../components/loadplug/loading.js";
import connect from "./connect";
import "./style.css";

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { genre: 0, filter: "id", page: 1, perPage: 4 };
  }

  handleOnChangeFilter = (e) => {
    const {
      getBooks, history, user: { id },
    } = this.props;
    this.setState({
      filter: e.value,
    });

    const { genre, page, perPage } = this.state;
    history.push(`/?genre=${genre}&filter=${e.value}&page=${page}`);
    getBooks(e.value, genre, page, perPage, id);
  };

  componentDidMount() {
    const {
      getGenres,
      getBooks,
      history,
      user: { id },
    } = this.props;
    const { filter, genre, page, perPage } = this.state;

    getGenres();
    getBooks(filter, genre, page, perPage, id);
    history.push(`/?genre=${genre}&filter=${filter}&page=${page}`);
  }

  handlePageChange = (event, value) => {
    this.setState({ page: value });

    const { filter, genre, perPage } = this.state;
    const { history, getBooks, user: { id } } = this.props;

    getBooks(filter, genre, value, perPage, id);
    history.push(`/?genre=${genre}&filter=${filter}&page=${value}`);
  };

  handleOnClickGenre = (e, value) => {
    this.setState({ genre: value });

    const { filter, page, perPage } = this.state;
    const { getBooks, history, user: { id } } = this.props;

    getBooks(filter, value, page, perPage, id);
    history.push(`/?genre=${value}&filter=${filter}$page=${page}`);
  };

  handleLikeClick = (id) => {
    const {
      user, toFavorites,
      favoritesForBooklist,
    } = this.props;
    favoritesForBooklist(id);
    toFavorites(user.id, id);
  };

  handleShoplistClick = (id) => {
    const { user, toShopList, shoplistForBooklist } = this.props;
    shoplistForBooklist(id);
    toShopList(user.id, id);
  };

  render() {
    const {
      genres,
      books,
      bookCount,
      loading,
      user,
      pageCount,
    } = this.props;
    const { page, perPage } = this.state;
    return (
      <div>
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <Grid
            container
            item
            spacing={4}
            xs={12}
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            className={"booklist-container"}
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
              <h3 className="categories">Категории</h3>
              <li
                className="genre-filter"
                onClick={(e) => this.handleOnClickGenre(e, 0)}
                value = {"all"}
              >
                Все
              </li>
              {genres.map((item) => (
                <li
                  key={item.id}
                  onClick={(e) => this.handleOnClickGenre(e, item.id)}
                  value={item.value}
                  className="genre-filter"
                >
                  {item.label}
                </li>
              ))}
            </Grid>

            <Grid container item xs={9} cellHeight="auto" spacing={3}>
              <Grid item xs={12} className="booklist-header">
                <span className="booklist-count">
                  {`Книг доступно: ${bookCount}`}
                </span>
                <Pagination count={pageCount} size={"large"} page={page} onChange={this.handlePageChange}/>
                <BooksFilter
                  books={books}
                  handleOnChangeFilter={this.handleOnChangeFilter}
                />
              </Grid>

              {books.map((item) => (
                <Grid cellHeight="auto" key={item.id} item lg={3} sm={4}>
                  <BookItem
                    item={item}
                    key={item.id}
                    user={user}
                    handleLikeClick ={this.handleLikeClick}
                    handleShoplistClick ={this.handleShoplistClick}
                    page={page}
                    perPage={perPage}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default withRouter(connect(BookList));

BookList.propTypes = {
  favoritesForBooklist: PropTypes.func.isRequired,
  shoplistForBooklist: PropTypes.func.isRequired,
  getGenres: PropTypes.func.isRequired,
  getBooks: PropTypes.func.isRequired,
  toFavorites: PropTypes.func.isRequired,
  toShopList: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.number,
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.object)],
    ),
  ).isRequired,
  genres: PropTypes.arrayOf(PropTypes.node).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  pageCount: PropTypes.number.isRequired,
  bookCount: PropTypes.number.isRequired,
};
