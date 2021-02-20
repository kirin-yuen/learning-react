// 创建 redux 中的 store 对象
import { createStore } from "redux";
import countReducer from "./count_reducer";

export default createStore(countReducer);
