import React, {useContext} from "react";
import { Route } from "react-router-dom";
import {GlobalState} from '../GlobalState'
import NotFound from '../components/ultils/NotFound'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const [isAdmin] = state.userAPI.isAdmin
  if(!isLogged && !isAdmin) {
    return <NotFound />
  }
  return (
    <Route
      {...rest}
      render={() => {
        return <Component />;
      }}
    />
  );
};

export default PrivateRoute;
