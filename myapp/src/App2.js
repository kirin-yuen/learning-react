import React, { Component } from "react";
import Person from "./containers/Person";
import Sum from "./containers/Sum";

export default class App2 extends Component {
  render() {
    return (
      <div>
        <h1>数据共享版本</h1>
        <Person />
        <Sum />
      </div>
    );
  }
}
