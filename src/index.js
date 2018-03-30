import React from "react";
import { render } from "react-dom";
import { hashHistory } from "react-router";
import injectTapEventPlugin from "react-tap-event-plugin";
import { Provider } from "react-redux";
import RouteConfig from "./js/routes";
import {store} from './js/store'
injectTapEventPlugin();
require("es6-promise/auto");
require("whatwg-fetch");
if (typeof Object.assign !== "function") {
  Object.assign = require("object-assign");
}
render(
  <Provider store={store}>
    <RouteConfig />
  </Provider>,
  document.getElementById("app")
);
