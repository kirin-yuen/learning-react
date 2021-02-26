import { nanoid } from "nanoid";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addPersonAction } from "../../react-redux-share-data/actions/person";

class Person extends Component {
  inputName = (event) => {
    this.name = event.target.value;
  };

  addPerson = () => {
    this.props.addPersonAction({
      id: nanoid(),
      name: this.name,
    });
  };

  render() {
    const { personList, count } = this.props;
    return (
      <div>
        <h1>Person 组件 </h1>
        <h2>和：{count} </h2>
        <input placeholder="姓名" type="text" onChange={this.inputName} />
        <button onClick={this.addPerson}>加人</button>

        <ul>
          {personList.map((item) => (
            <li>
              {item.id} --- {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    personList: state.person,
    count: state.sum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPersonAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Person);
