import React, { Component } from "react";

export default class News extends Component {
  render() {
    const { id, title } = this.props.match.params;
    return (
      <div>
        News - {id} - {title}{" "}
      </div>
    );
  }
}
