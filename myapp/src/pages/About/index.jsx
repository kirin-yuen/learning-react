import React, { Component } from "react";
import { NavLink, Route, Redirect } from "react-router-dom";
import News from "./News";
import Message from "./Message";

export default class About extends Component {
  render() {
    return (
      <div>
        <div>about</div>
        <NavLink to="/about/news/007/hello world">News</NavLink>
        <NavLink to="/about/message?id=007&title=hello react">Message</NavLink>
        {/* 注册路由 */}
        {/* params 参数 */}
        <Route path="/about/news/:id/:title" component={News} />
        {/* search 参数 */}
        <Route path="/about/message" component={Message} />
        <Redirect to="/about/message" />
      </div>
    );
  }
}
