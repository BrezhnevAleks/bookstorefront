import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
// import { Link } from "react-router-dom";
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
    this.state = { genre: "all", filter: "id", page: 1 };
  }

  handleOnChangeFilter = (e) => {
    const {
      // match: {
      //   params: { value },
      // },
      getBooks, history,
    } = this.props;
    this.setState({
      filter: e.value,
    });

    const { genre, page } = this.state;
    history.push(`/?genre=${genre}&filter=${e.value}&page=${page}`);
    getBooks(e.value, genre, page);
  };

  componentDidMount() {
    const {
      // match: {
      //   params: { value },
      // },
      getGenres,
      getBooks,
      history,
    } = this.props;
    const { filter, genre, page } = this.state;

    getGenres();
    getBooks(filter, genre, page);
    history.push(`/?genre=${genre}&filter=${filter}&page=${page}`);
    // eslint-disable-next-line react/prop-types
    // eslint-disable-next-line no-console
    // console.log(this.props.match);
  }

  handlePageChange = (event, value) => {
    this.setState({ page: value });

    const { filter, genre } = this.state;
    const { history, getBooks } = this.props;

    getBooks(filter, genre, value);
    history.push(`/?genre=${genre}&filter=${filter}&page=${value}`);
  };

  handleOnClickGenre = (e, value) => {
    this.setState({ genre: value });

    const { filter, page } = this.state;
    const { getBooks, history } = this.props;

    getBooks(filter, value, page);
    history.push(`/?genre=${value}&filter=${filter}$page=${page}`);
  };

  render() {
    const {
      genres,
      books,
      loading,
      user,
      toFavorites,
      toShopList,
    } = this.props;
    const { page } = this.state;
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
                onClick={(e) => this.handleOnClickGenre(e, "all")}
                value = {"all"}
              >
                Все
              </li>
              {genres.map((item) => (
                <li
                  key={item.id}
                  onClick={(e) => this.handleOnClickGenre(e, item.value)}
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
                  {`Книг доступно: ${books.length}`}
                </span>
                <Pagination count={10} page={page} onChange={this.handlePageChange}/>
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
                    toFavorites={toFavorites}
                    toShopList={toShopList}
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
  getGenres: PropTypes.func.isRequired,
  getBooks: PropTypes.func.isRequired,
  toFavorites: PropTypes.func.isRequired,
  toShopList: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  //  match: PropTypes.objectOf(PropTypes.string).isRequired,
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
};
