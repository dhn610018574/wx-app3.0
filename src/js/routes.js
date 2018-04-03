import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import "style/normalize.scss";
import 'style/_base.scss';
import 'style/app.scss';
import { Login } from "./containers";
import { ForgetPassword ,FastRegister} from "./components";
export default class RouteConfig extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact />
          <Route path="/login"  component={Login} />
          <Route path="/forgetPassword"  component={ForgetPassword} />
          <Route path="/fastRegister"  component={FastRegister} />

          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}
