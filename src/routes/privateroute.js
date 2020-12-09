import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      // eslint-disable-next-line no-prototype-builtins
      render={(props) => (user.hasOwnProperty("id") ? (
          <Component {...props} />
      ) : (
          <Redirect to="/login" />
      ))
      }
    />
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  user: PropTypes.objectOf(
    PropTypes.oneOfType(
      [PropTypes.number,
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.object)],
    ),
  ).isRequired,
};
