import RouterDemo from "./RouterDemo";
import LazyLoadRouter from "./LazyLoadRouter";
import ReduxDemo from "./ReduxDemo";
import ReactReduxDemo from "./ReactReduxDemo";

function App() {
  return (
    <div>
      {/* 路由样例 */}
      <h1>路由样例</h1>
      {/* <RouterDemo /> */}
      <hr />
      {/* 懒加载路由样例 */}
      <h1>懒加载路由样例</h1>
      <LazyLoadRouter />
      <hr />
      {/* redux 集中式状态管理样例 */}
      <h1>redux 集中式状态管理样例</h1>
      <ReduxDemo />
      <br />
      <br />
      {/* react-redux react 针对 redux 推出的版本 */}
      <h1>react-redux react 针对 redux 推出的版本</h1>
      <ReactReduxDemo />
    </div>
  );
}

export default App;
