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
    const { history, getFavorites, user: { id } } = this.props;

    getFavorites(id, value, perPage);
    history.push(`/favorites?&page=${value}`);
  };

  handleLikeClick = async (id) => {
    const {
      user, toFavorites,
      getFavorites,
    } = this.props;
    const { perPage, page } = this.state;

    await toFavorites(user.id, id);
    getFavorites(user.id, page, perPage);
  };

  handleShoplistClick = async (id) => {
    const { user, toShopList, shoplistChangeIcon } = this.props;

    await toShopList(user.id, id);
    shoplistChangeIcon(id);
  };

 componentDidMount = () => {
   const { getFavorites, user: { id } } = this.props;
   const { page, perPage } = this.state;
   getFavorites(id, page, perPage);
 }

 render() {
   const {
     favorites, user,
     favoritesPageCount,
     favoritesCount,
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
                  {`Книг в избранном: ${favoritesCount}`}
                </span>
                <Pagination count={favoritesPageCount} size={"large"} page={page} onChange={this.handlePageChange}/>
              </Grid>
              {favorites.map((shopItem) => (
                <Grid item cellHeight="auto" xs={3} key={shopItem.id}>
                  <BookItem
                    item={shopItem}
                    key={shopItem.id}
                    user={user}
                    handleLikeClick ={this.handleLikeClick}
                    handleShoplistClick ={this.handleShoplistClick}
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
  shoplistChangeIcon: PropTypes.func.isRequired,
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
  favoritesCount: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
