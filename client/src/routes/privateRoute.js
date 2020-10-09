import React from "react";

import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("cool-jwt");
  return (
    <Route
      {...rest}
      render={() => {
        if (!token) {
          return <Redirect to={{ pathname: "/login" }} />;
        }
        return <Component />;
      }}
    />
  );
};

export default PrivateRoute;
