import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import BookItem from "../../components/bookitem/bookitem";
import Header from "../header/header";
import connect from "./connect";
import "./style.css";

class ShopList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 1, perPage: 4 };
  }

  handlePageChange = (event, value) => {
    this.setState({ page: value });
    const { perPage } = this.state;
    const { history, getShoplist, user: { id } } = this.props;

    getShoplist(id, value, perPage);
    history.push(`/shoplist?&page=${value}`);
  };

  handleLikeClick = (id) => {
    const {
      user, toFavorites,
      favoritesChangeIcon,
    } = this.props;
    favoritesChangeIcon(id);
    toFavorites(user.id, id);
  };

  handleShoplistClick = async (id) => {
    const { user, toShopList, getShoplist } = this.props;
    const { perPage, page } = this.state;

    await toShopList(user.id, id);
    getShoplist(user.id, page, perPage);
  };

  componentDidMount = () => {
    const { getShoplist, user: { id } } = this.props;
    const { page, perPage } = this.state;
    getShoplist(id, page, perPage);
  }

  render() {
    const { shoplist, user, shoplistPageCount, shoplistCount } = this.props;
    const { page } = this.state;

    return (
      <div>
        <Header />
        {shoplist.length ? (
          <div className="shoplist">
            <Grid container item xs={9} spacing={6} cellHeight="auto">
              <Grid item xs={12} className="booklist-header">
                <span className="booklist-count">
                  {`Книг в корзине: ${shoplistCount}`}
                </span>
                <Pagination count={shoplistPageCount} size={"large"} page={page} onChange={this.handlePageChange}/>
              </Grid>
              {shoplist.map((item) => (
                <Grid item cellHeight="auto" xs={3} key={item.id}>
                  <BookItem
                    item={item}
                    key={item.id}
                    user={user}
                    handleLikeClick ={this.handleLikeClick}
                    handleShoplistClick ={this.handleShoplistClick}
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
  favoritesChangeIcon: PropTypes.func.isRequired,
  getShoplist: PropTypes.func.isRequired,
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
  shoplistPageCount: PropTypes.number.isRequired,
  shoplistCount: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
