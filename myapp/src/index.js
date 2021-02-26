import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import App2 from "./App2";
import reportWebVitals from "./reportWebVitals";
import store from "./react-redux/store";
import store2 from "./react-redux-share-data/store";
import { Provider } from "react-redux";

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
        {/* <App2 /> */}
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// 在最高层级处监听 store 状态变更后重新渲染
// store.subscribe(render);
