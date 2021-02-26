import { ADD_SUM } from "../constant";

const initState = 10;

export default function (preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case ADD_SUM:
      return preState + data;
    default:
      return preState;
  }
}