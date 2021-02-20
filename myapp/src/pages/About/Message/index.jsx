import React, { Component } from "react";

export default class Message extends Component {
  render() {
    const { search } = this.props.location;

    const arr = search.substring(1).split("&");
    const searchObj = arr.reduce((prev, current) => {
      const [key, value] = current.split("=");
      prev[key] = value;
      return prev;
    }, {});

    return (
      <div>
        Message - {searchObj.id} - {searchObj.title}{" "}
      </div>
    );
  }
}
