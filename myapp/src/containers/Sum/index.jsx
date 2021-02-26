import React, { Component } from "react";
import { connect } from "react-redux";
import { addCountAction } from "../../react-redux-share-data/actions/sum";

class Sum extends Component {
  add = () => {
    this.props.addCountAction(1);
  };

  render() {
    const { personLength, count } = this.props;
    return (
      <div>
        <h1>Sum 组件</h1>
        <h2>人数：{personLength} </h2>

        {count}
        <button onClick={this.add}>加1</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    personLength: state.person.length,
    count: state.sum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCountAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Sum);
