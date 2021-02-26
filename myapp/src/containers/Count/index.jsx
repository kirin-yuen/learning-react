// UI 组件
import CountUI from "../../components/Count";
import { connect } from "react-redux";
import {
  createIncrementAction,
  createDecrementAction,
  createAsyncIncrementAction,
} from "../../react-redux/count_action";

// 将 state 映射成 props 给子组件
const mapStateToProps = (state) => {
  return {
    count: state,
  };
};

// 第一种：将操作状态的方法映射成 props 给子组件
const mapDispatchToProps = (dispatch) => {
  return {
    increment: (data) => {
      dispatch(createIncrementAction(data));
    },
    decrement: (data) => {
      dispatch(createDecrementAction(data));
    },
    asyncIncrement: (data) => {
      dispatch(createAsyncIncrementAction(data));
    },
  };
};

// 第二种是第一种的简写方式，直接返回对象，react-redux 会自动帮你 dispatch 这个 action
const mapDispatchToProps2 = () => ({
  increment: createIncrementAction,
  decrement: createDecrementAction,
  asyncIncrement: createAsyncIncrementAction,
});

// 容器组件连接 UI 组件
// 第一种：第二个参数是函数
// export default connect(mapStateToProps, mapDispatchToProps())(CountUI);
// 第二种：第二个参数是对象
export default connect(mapStateToProps, mapDispatchToProps2())(CountUI);
