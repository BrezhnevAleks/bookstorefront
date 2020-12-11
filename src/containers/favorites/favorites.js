import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import "./style.css";
import BookItem from "../../components/bookitem/bookitem";
import Header from "../header/header";
import connect from "./connect";

class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 1, perPage: 4 };
  }

  handlePageChange = (event, value) => {
    this.setState({ page: value });
    const { perPage } = this.state;
    const { getFavorites, user: { id } } = this.props;
    // const { history, getBooks } = this.props;

    getFavorites(id, value, perPage);
    // history.push(`/?genre=${genre}&filter=${filter}&page=${value}`);
  };

 componentDidMount = () => {
   const { getFavorites, user: { id } } = this.props;
   const { page, perPage } = this.state;
   getFavorites(id, page, perPage);
 }

 render() {
   const {
     favorites, user, toFavorites, toShopList,
     favoritesPageCount, favoritesForBooklist,
   } = this.props;
   const { page } = this.state;
   return (
      <div>
        <Header />

        {favorites.length ? (
          <div className="favorites">
            <Grid container item xs={9} spacing={6} cellHeight="auto">
              <Grid item xs={12} className="booklist-header">
                <span className="booklist-count">
                  {`Книг в избранном: ${favorites.length}`}
                </span>
                <Pagination count={favoritesPageCount} size={"large"} page={page} onChange={this.handlePageChange}/>
              </Grid>
              {favorites.map((shopItem) => (
                <Grid item cellHeight="auto" xs={3} key={shopItem.id}>
                  <BookItem
                    item={shopItem}
                    key={shopItem.id}
                    favorites={favorites}
                    user={user}
                    toFavorites={toFavorites}
                    toShopList={toShopList}
                    favoritesForBooklist ={favoritesForBooklist}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <div className="favorites-plug">
            <p>Список избранного пуст</p>
          </div>
        )}
      </div>
   );
 }
}

export default connect(FavoritesList);

FavoritesList.propTypes = {
  favoritesForBooklist: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
  toFavorites: PropTypes.func.isRequired,
  toShopList: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.number,
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.object)],
    ),
  ).isRequired,
  favoritesPageCount: PropTypes.number.isRequired,
};
