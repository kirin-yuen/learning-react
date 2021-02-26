import React, { Component } from "react";
import Count from "./containers/Count";

export default class ReactReduxDemo extends Component {
  render() {
    // 容器组件注入 store
    // 外层添加 Provider 后 store 可以不需要再写在容器组件里
    // return <Count store={store} />;
    return <Count />;
  }
}
