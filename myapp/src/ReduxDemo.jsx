import React, { Component } from "react";
import store from "./redux/store";

import {
  createIncrementAction,
  createDecrementAction,
  createAsyncDecrementAction,
} from "./redux/count_action";

export default class ReduxDemo extends Component {
  state = {
    selectCount: 1,
  };

  onSelectChange = (event) => {
    this.setState({
      selectCount: +event.target.value,
    });
  };

  increment = () => {
    const { selectCount } = this.state;
    store.dispatch(createIncrementAction(selectCount));
  };

  decrement = () => {
    const { selectCount } = this.state;
    store.dispatch(createDecrementAction(selectCount));
  };

  incrementIfOdd = () => {
    const { selectCount } = this.state;

    if (store.getState() % 2) {
      store.dispatch(createIncrementAction(selectCount));
    }
  };

  incrementIfAysnc = () => {
    const { selectCount } = this.state;

    // 异步 action
    store.dispatch(createAsyncDecrementAction(selectCount));
  };

  render() {
    return (
      <div>
        <h1>当前求和： {store.getState()} </h1>
        <select value={this.selectCount} onChange={this.onSelectChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>
        <button onClick={this.incrementIfAysnc}>异步+</button>
      </div>
    );
  }
}
