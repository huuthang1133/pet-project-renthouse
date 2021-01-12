import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Home, LogIn, Account, Admin, Register } from "../pages";
import { TopMenu } from "../components";
import PublicRoute from "./publicRoute";
import PrivateRoute from "./privateRoute";

const Routes = () => {
  return (
    <Router>
      <TopMenu />
      <Switch>
        <PublicRoute path="/" exact component={Home} />
        <PublicRoute path="/login" exact component={LogIn} />
        <PublicRoute path="/register" exact component={Register} />
        <PrivateRoute path="/account" exact component={Account} />
        <PrivateRoute path="/admin" exact component={Admin} />
      </Switch>
    </Router>
  );
};

export default Routes;
