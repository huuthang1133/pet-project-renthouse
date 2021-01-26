import React, {useContext} from "react";
import {GlobalState} from '../GlobalState'
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Home, LogIn, Account, Admin, Register, DetailRoomPage } from "../pages";
import { TopMenu, detailTransaction, detailSupport } from "../components";
import PublicRoute from "./publicRoute";
import PrivateRoute from "./privateRoute";

const Routes = () => {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  return (
    <Router>
      <TopMenu />
      <Switch>
        <PublicRoute path="/" exact component={Home} />
        <PrivateRoute path="/account" exact component={Account} />
        <PublicRoute path='/detailroom/:id' exact component={DetailRoomPage}/>
        <PrivateRoute path="/account/transaction/:id" exact component={detailTransaction} />
        <PrivateRoute path="/account/support/:id" exact component={detailSupport} />
        {isLogged ? <Redirect to='/' /> : 
        <>
          <PublicRoute path="/login" exact component={LogIn} /> 
          <PublicRoute path="/register" exact component={Register} />
        </>}
      </Switch>
    </Router>
  );
};

export default Routes;
