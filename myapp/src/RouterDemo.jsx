import React, { Component } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import { NavLink, BrowserRouter, Route, Redirect } from "react-router-dom";

export default class RouterDemo extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavLink activeClassName="my-active" to="/home/a/b">
          Home
        </NavLink>
        <NavLink activeClassName="my-active" to="/about">
          About
        </NavLink>

        <Route path="/home" component={Home}></Route>
        <Route path="/about" component={About}></Route>
        <Redirect to="/home" />
      </BrowserRouter>
    );
  }
}
