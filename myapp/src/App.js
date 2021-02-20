import RouterDemo from "./RouterDemo";
import ReduxDemo from "./ReduxDemo";

function App() {
  return (
    <div>
      {/* 路由样例 */}
      <RouterDemo />
      <hr/>
      {/* redux 集中式状态管理样例 */}
      <ReduxDemo />
    </div>
  );
}

export default App;
