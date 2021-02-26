import React, { Component } from "react";

export default class Count extends Component {
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

    // 操作状态的方法从 props 获取
    this.props.increment(selectCount);
  };

  decrement = () => {
    const { selectCount } = this.state;

    // 操作状态的方法从 props 获取
    this.props.decrement(selectCount);
  };

  incrementIfOdd = () => {
    const { selectCount } = this.state;
    if (this.props.count % 2) {
      // 操作状态的方法从 props 获取
      this.props.increment(selectCount);
    }
  };

  incrementIfAysnc = () => {
    const { selectCount } = this.state;

    // 异步 action
    // 操作状态的方法从 props 获取
    this.props.asyncIncrement(selectCount);
  };

  render() {
    return (
      <div>
        {/* 状态从 props 获取 */}
        <h1>当前求和： {this.props.count} </h1>
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
