import { combineReducers, createStore } from "redux";
import sum from "./reducers/sum";
import person from "./reducers/person";

const finalReducer = combineReducers({
  sum,
  person,
});

export default createStore(finalReducer);
