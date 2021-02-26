const createIncrementAction = (data) => ({ type: "increment", data });

const createDecrementAction = (data) => ({ type: "decrement", data });

// 异步 action 需要返回一个函数
const createAsyncIncrementAction = (data) => {
  return (dispatch) => {
    window.setTimeout(() => {
      dispatch(createIncrementAction(data));
    }, 500);
  };
};

export {
  createIncrementAction,
  createDecrementAction,
  createAsyncIncrementAction,
};
