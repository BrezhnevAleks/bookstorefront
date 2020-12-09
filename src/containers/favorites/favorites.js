import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import "./style.css";
import BookItem from "../../components/bookitem/bookitem";
import Header from "../header/header";
import connect from "./connect";

class FavoritesList extends React.Component {
  render() {
    const { favorites, user, toFavorites, toShopList } = this.props;

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
};
