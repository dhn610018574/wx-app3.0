import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loginRedcer from "./Login";

export default combineReducers(
  { loginRedcer },
  applyMiddleware(thunk)
);
