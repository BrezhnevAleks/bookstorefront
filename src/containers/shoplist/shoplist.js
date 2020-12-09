import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import BookItem from "../../components/bookitem/bookitem";
import Header from "../header/header";
import connect from "./connect";
import "./style.css";

class ShopList extends React.Component {
  render() {
    const { shoplist, user, toFavorites, toShopList } = this.props;

    return (
      <div>
        <Header />
        {shoplist.length ? (
          <div className="shoplist">
            <Grid container item xs={9} spacing={6} cellHeight="auto">
              <Grid item xs={12} className="booklist-header">
                <span className="booklist-count">
                  {`Книг в корзине: ${shoplist.length}`}
                </span>
              </Grid>
              {shoplist.map((shopItem) => (
                <Grid item cellHeight="auto" xs={3} key={shopItem.id}>
                  <BookItem
                    item={shopItem}
                    key={shopItem.id}
                    user={user}
                    toFavorites={toFavorites}
                    toShopList={toShopList}
                  />
                </Grid>
              ))}
            </Grid>
            <button className="shoplist-buy">Оформить заказ</button>
          </div>
        ) : (
          <div className="shoplist-plug">
            <p>Корзина пуста</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(ShopList);

ShopList.propTypes = {
  toFavorites: PropTypes.func.isRequired,
  toShopList: PropTypes.func.isRequired,
  shoplist: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.number,
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.object)],
    ),
  ).isRequired,
};
