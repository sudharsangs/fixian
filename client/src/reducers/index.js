import { combineReducers } from "redux";
import storeReducer from "./storeReducer";
import userReducer from "./userReducer";

export default combineReducers({
  user: userReducer,
  store: storeReducer
});
