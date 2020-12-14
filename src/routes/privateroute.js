import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (Object.prototype.hasOwnProperty.call(user, "id") ? (
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
