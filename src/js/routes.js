import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import "style/normalize.scss";
import 'style/_base.scss';
import { Login } from "./containers";
export default class RouteConfig extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact />
          <Route path="/login" exact component={Login} />

          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}
