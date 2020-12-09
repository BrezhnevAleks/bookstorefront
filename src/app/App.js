import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PropTypes from "prop-types";
import { createBrowserHistory } from "history";
import RegisterPage from "../components/registration/registerpage.js";
import LoginPage from "../components/login/loginpage.js";
import connect from "./connect";
import PrivateRoute from "../routes/privateroute";
import BookPage from "../containers/bookpage/bookpage.js";
import ChangeBook from "../containers/changebook/changebook.js";
import FavoritesList from "../containers/favorites/favorites.js";
import ShopList from "../containers/shoplist/shoplist.js";
import BookList from "../containers/booklist/booklist";
import Profile from "../containers/profile/profile.js";
import { setAuthToken } from "../axios.js";

const history = createBrowserHistory();
class App extends React.Component {
  login(data, routeProps) {
    const { pathname } = routeProps.location;
    const { loginUser, createUser, error } = this.props;
    const page =
      pathname === "/login" ? (
        <LoginPage loginUser={loginUser} error={error} />
      ) : (
        <RegisterPage createUser={createUser} error={error} />
      );
    // eslint-disable-next-line no-prototype-builtins
    return data.hasOwnProperty("id") ? <Redirect to="/" /> : page;
  }

  componentDidMount() {
    const { getUserByToken } = this.props;
    setAuthToken(localStorage.getItem("authToken"));
    getUserByToken();
  }

  render() {
    const { data } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/login"
            render={(routeProps) => this.login(data, routeProps)}
            exact
          />
          <Route
            path="/register"
            render={(routeProps) => this.login(data, routeProps)}
            exact
          />
          <PrivateRoute
            user={data}
            path="/books/:id"
            component={BookPage}
            exact
          />
          <PrivateRoute
            user={data}
            path="/?genre=&filter="
            component={BookList}
            exact
          />
          <PrivateRoute user={data} path="/" component={BookList} exact />

          <PrivateRoute
            user={data}
            path="/books/change/:id"
            component={ChangeBook}
            exact
          />
          <PrivateRoute
            user={data}
            path="/shoplist"
            component={ShopList}
            exact
          />
          <PrivateRoute user={data} path="/profile" component={Profile} exact />
          <PrivateRoute
            user={data}
            path="/favorites"
            component={FavoritesList}
            exact
          />
        </Switch>
      </Router>
    );
  }
}
export default connect(App);

App.propTypes = {
  loginUser: PropTypes.func.isRequired,
  error: PropTypes.node.isRequired,
  createUser: PropTypes.func.isRequired,
  getUserByToken: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
