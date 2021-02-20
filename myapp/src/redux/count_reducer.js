// 初始化数据
const initState = 0;

// reducer 本质就是函数
export default function (prevState = initState, action) {
  // 初始化 prevState 会传 undefined, action => {type: "@@redux/INITs.2.c.t.3.u"}
  console.log(prevState, action);
  const { type, data } = action;

  switch (type) {
    case "increment":
      return prevState + data;
    case "decrement":
      return prevState - data;
    // 初始化时候才会出现走 default
    default:
      return prevState;
  }
}
