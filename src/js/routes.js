import React, { Component } from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import "style/normalize.scss";
import { Home, Login } from "./components";
export default class RouteConfig extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />

          <Redirect to="/" />
        </Switch>
      </HashRouter>
    );
  }
}
