import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter, NavLink, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

export default class LazyLoadRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavLink to="/home">home</NavLink>
        <NavLink to="/about">about</NavLink>

        <Suspense fallback={<h2>Loading...</h2>}>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
        </Suspense>
      </BrowserRouter>
    );
  }
}
