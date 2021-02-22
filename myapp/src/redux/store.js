// 创建 redux 中的 store 对象
import { createStore, applyMiddleware } from "redux";
import countReducer from "./count_reducer";
import thunk from "redux-thunk";

export default createStore(countReducer, applyMiddleware(thunk));
