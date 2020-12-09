import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSignOutAlt, faShoppingCart, faHome } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Grid } from "@material-ui/core";
import connect from "./connect";
import "./style.css";

class Header extends React.Component {
  handleSignOut = () => {
    const { signOutUser } = this.props;

    localStorage.clear();
    signOutUser();
  };

  render() {
    const { getBooks } = this.props;
    return (
      <header className="menu">
        <Grid
          container
          item
          spacing={4}
          xs={12}
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          className={"header-container"}
        >
          <Link to="/" onClick={getBooks}>
            <FontAwesomeIcon icon={faHome} className="home-page" />
          </Link>

          <div className="menu-icons">
            <Link to="/profile" className="menu-profile">
              <FontAwesomeIcon icon={faUserCircle} />
            </Link>

            <Link to="/favorites" className="menu-favorites">
              <FontAwesomeIcon icon={faHeart} />
            </Link>

            <Link to="/shoplist" className="menu-shoplist">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>

            <Link to="/login">
              <FontAwesomeIcon
                className="menu-sign-out"
                icon={faSignOutAlt}
                onClick={this.handleSignOut}
              />
            </Link>
          </div>
        </Grid>
      </header>
    );
  }
}
export default connect(Header);

Header.propTypes = {
  signOutUser: PropTypes.func.isRequired,
  getBooks: PropTypes.func.isRequired,
};
