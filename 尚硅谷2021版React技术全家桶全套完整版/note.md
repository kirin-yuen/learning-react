### React 简介

---

React 构建用户界面的  Javascript 库，是一个将**数据渲染为 HTML 视图的 Facebook 的开源库**



#### 原生 Javascript 操作 DOM

* 繁琐，效率低
* 浏览器重绘重排
* 没有组件化解决方案，代码复用率低



#### React 特点

* **组件化编码**
* **声明式编码**，提高开发效率及组件复用率
  * DOM 是命令式编码
  * React 是声明式编码
* 利用 React Native 开发原生应用
* 虚拟 DOM 和 diff 算法，减少与真实 DOM 交互，最小化页面重回重排



### React 入门

---

* **babel**
  * ES6 => ES5
  * jsx => js
  * import

* **React 核心库**
* **React dom 扩展库**，跟在核心库之后引入



#### JSX 解决了使用 React 创建虚拟 DOM 繁琐的写法

```js
// 不使用 JSX
const vDOM1 = React.createElement('div', {id:"div1"}, 'Hello React'); // 使用 React 创建虚拟 DOM

// 使用 JSX 语法,引入 babel.js <script type="text/babel">...</script>
const vDOM2 = <div id="div1">Hello React</div>; // 使用 JSX 创建虚拟 DOM
```

JSX 的写法就是 React.createElement 的语法糖





### JSX

---

* 全称 Javascript XML

* react 定义得一种类似 XML 的 JS 扩展语法

  * XML 早期用于**存储和传输数据**

    ```xml
    <student>
        <name>Tom</name>
        <age>19</age>
    </student>
    ```

  * JSON 比起 XML 更简单，**Js 有内置的 JSON 对象，提供了 parse 和 stringify 方法**

    ```json
    {"name": "Tom", "age": 19}
    ```

* 本质是 React.createElement 的语法糖

* 作用：简化创建虚拟 DOM

* JSX 的规则

  * 由于 html 的 class 属性名跟 js 的 class 关键字标识符冲突，因此 JSX 里面要改为 **className**
  * **{} 里写 js 表达式**
    * **表达式**：一个表达式会**产生一个值**
    * **语句**：控制流程
  * style 里使用 **{key: value}** 方式书写，key 需要转换成**驼峰式**，比如 font-size => fontSize
  * 单标签需要关闭
  * 只能有一个根元素
  * JSX 标签名如全小写，则会被判断与转为 html 同名标签
  * 如果是**自定义组件**，则应该是**首字母大写**

  ```jsx
  const cls = "box";
  const content = "box1";
  <div className={cls} style={{fontSize: '20px', color:'white'}}>
      {content}
      <br/>
  </div>
  ```

  

### 模块与组件、模块化与组件化理解

---

#### 模块

 * 理解：向外提供特定功能的 js 程序，一般就是一个 js 文件
	* 因逻辑代码越来越多与复杂，所以要拆成**模块**
	* 作用：可复用，简化编写提高运行效率



#### 组件

组件比模块高一个等级

* 理解：用来实现局部功能效果的代码和资源的集合（html/css/js/image 等等）
* 因为界面复杂，所以要拆成组件
* 作用：可复用，简化编写提高运行效率



#### 模块化

当应用的 js **都以模块来编写**，就是模块化应用



#### 组件化

当应用都是**以组件来编写**，就是组件化应用



### 组件与状态

---

#### 函数式组件

简单组件，**无状态**维护，使用函数式组件

* 函数首字母必须大写
* 必须 return 虚拟 DOM

```jsx
function Demo() {
    console.log(this); // 不是 window, 而是 undefined, 因 babel 转换后会变成严格模式，严格模式下函数的 this 指向 undefined
    return <h1>函数式组件</h1>;
}

// 函数式组件，调用改函数，将返回的虚拟 DOM 转为真实 DOM，然后渲染到页面
ReactDOM.render(<Demo />, document.querySelector("#root"));
```

![1](.\note-img\1.png)



#### 类式组件

复杂组件，**有状态**维护，使用类式组件

* 必须继承 React.component
* 必须实现 render 方法，并 return 虚拟 DOM

```jsx
class Demo extends React.Component {
    console.log(this); // 实例对象
    render() {
      return <h1>类式组件</h1>;
    }
}

// 类式组件，new 该类实例，调用 render 方法将返回的虚拟 DOM 转为真实 DOM，然后渲染到页面
ReactDOM.render(<Demo />, document.querySelector("#root"));
```



#### 状态 state

* 只有在类式组件上才有 state

* state 是三大关键属性之一，类型为对象，需要通过 setState 方法改变并触发 render 再次执行

  ```js
  this.setState({})
  ```

* 组件又被称为**状态机**，通过更新组件 state 来更新对应页面显示（重新渲染组件）

* this 指向

  * 直接调用

    ```jsx
    // 这样将类方法绑定事件属性，等于直接调用类方法，而不是实例调用类方法，里面的 this 指向会是 undefined
    <button onClick={this.protoSwitchState}>bind 改变指向</button>
    ```

  * 类方法局部开启了严格模式

  * bind() 重新绑定 this 并返回一个新的函数

  ```jsx
  class Demo extends React.Component {
      constructor() {
        super();
  
        this.state = {
          switch: false,
        };
  
        // 创建实例的时候，寻找类的原型里的方法并重新绑定 this 并返回一个新的函数
        this.bindSwitchState = this.protoSwitchState.bind(this);
      }
  
      // 类中定义的方法，绑在类的原型上，如果直接绑定元素事件上会出现 this 指向为 undefined(因类方法局部开启了严格模式，所以不是 window)
      protoSwitchState() {
        console.log(this);
        // 状态需要使用 setState 进行更改
        this.setState({
          switch: !this.state.switch,
        });
      }
  
      // 实例方法，赋值箭头函数中的 this 指向外层函数的 this
      arrowSwitchState = () => {
        console.log(this); // 实例对象
        // 状态需要使用 setState 进行更改
        this.setState({
          switch: !this.state.switch,
        });
      };
  
      render() {
        return (
          <div>
            状态切换：{this.state.switch ? "开" : "关"}
            <br />
            {/* 
              // 这样将类方法绑定事件属性，等于直接调用类方法，而不是实例调用类方法，里面的 this 指向会是 undefined
              <button onClick={this.protoSwitchState}>bind 改变指向</button>
            */}
            <button onClick={this.bindSwitchState}>bind 改变指向</button>
            <button onClick={this.arrowSwitchState}>箭头函数 改变指向</button>
          </div>
        );
      }
  }
  ```

  

#### 属性 props

* **类式组件属性**

  * 组件上类似 html 标签属性方式声明

  ```jsx
  <Person name="goku" age={20} />
  ```

  * 读取属性 `this.props`

  ```jsx
  render() {
    return (
      <ul>
        {/* this.props 接收组件定义的属性 */}
        <li> {this.props.name} </li>
        <li> {this.props.age} </li>
      </ul>
    );
  }
  ```

  * 对 props 值进行**类型限制**与**必要性限制**

  1. react 15.5 后已废弃，类型限制写在 react 里

     ```打jsx
     Person.propTypes = {
       name: React.PropTypes.string // React 15.5 弃用，并分离出 prop-types.js
     };f
     ```

  2. 引入单独处理类型限制的库 **prop-types.js**

     ```jsx
     Person.propTypes = {
       name: PropTypes.string.isRequired, // 类型是否必填
       age: PropTypes.number,
     };
     ```

  * 默认属性值

  ```jsx
  Person.defaultProps = {
    name: "无名",
    age: 30,
  };
  ```

  > 属性值和类型限制，可以通过 `static` 静态属性的方式写在类里面

  ```jsx
  // 使用静态属性，绑定 propTypes 和 defaultProps
  static propTypes = {
    name: PropTypes.string.isRequired, // 类型是否必填
    age: PropTypes.number,
  };
  static defaultProps = {
    name: "无名",
    age: 30,
  };
  ```

  

  * 通过延展符将对象所有属性传递给 props

  ```jsx
  const person2 = { name: "gohan", age: 15 };
  
  <Person {...person2} />
  // 等价于
  <Person name="gohan" age=“15” />
  ```

  * 组件类的构造函数

  ```jsx
  constructor(props){
    super(props); // 如果不传递 props 给 super，构造器中的 this.props 无法使用
  }
  ```

* **函数式组件属性**

  函数式组件也可使用属性

  ```jsx
  function Person(props){
      return <div>{props.name}</div>
  }
  ```



#### ref

* **字符串形式 ref**(因为效率不高，所以还是建议**不再使用**)

  ```jsx
  { /* 字符串式 ref，不推荐使用 */ }
  <input placeholder="字符串式 ref，不推荐使用" ref="strRef" type="text" onChange={()=>{console.log('字符串式 ref，不推荐使用',this.refs.strRef.value);}} />
  ```
  
* **回调函数形式 ref**

  回调函数：

  	* 你定义的函数
  	* 你没调用，被被人调用

  * 字符串式 ref，不推荐使用
  
    ```jsx
  <input placeholder="字符串式 ref，不推荐使用" ref="strRef" type="text" onChange={()=>{console.log('字符串式 ref，不推荐使用',this.refs.strRef.value);}} />
    ```
  
  * 回调式 ref，**内联函数** 在更新时(setState 后再次 render 的时候运行两次
  
    ```jsx
    { /* 内联函数 */ }
    <input placeholder="回调式 ref，内联函数" ref={(node)=>{
        // 内联式函数会在更新时(setState 后再次 render 的时候运行两次，第一次 node === null，第二次有值)
        this.cbInlineNode = node;
        console.log('回调式 ref，内联函数', this.cbInlineNode);
    }} type="text" />
    ```
  
  * 回调式 ref，**绑定函数**
  
    ```jsx
    bindingFunc = (node) => {
      this.bindingFuncNode = node;
      console.log('回调式 ref，绑定函数',this.bindingFuncNode);
    }
    
    { /* 绑定函数 */ }
    <input placeholder="回调式 ref，绑定函数" ref={this.bindingFunc} type="text" onChange={() => {
        console.log(this.bindingFuncNode.value);
    }} />
    ```
  
* createRef

  ```jsx
  myRef = React.createRef();
  
  { /* React.createRef 返回一个容器，单独收集某一个元素，如果重复使用，则会后者居上 */ }
  <input placeholder="回调式 ref，绑定函数" ref={this.myRef} type="text" />
  ```

  

#### 事件

* React 事件格式为 onXxx
  * 为了兼容性
  * 为了高效
* 可在事件里获得事件源，避免过度使用 ref

```jsx
return (
    <div>
      {/* React 事件为原生 html 元素重写了事件，格式为 onXxx
            1. 为了兼容性
            2. 为了高效（通过事件委托，委托给组件最外层元素）
         可在事件里获得事件源，避免过度使用 ref
        */}
      <input
        type="text"
        onChange={(event) => {
          console.log(event.target);
        }}
      />
    </div>
);
```





#### 收集表单数据

* 受控组件：随着表单输入将输入同步到状态中，需要时去状态里面读取

  ```jsx
  {/*受控组件*/}
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(
          "受控组件",
          this.state.username,
          this.state.password
        );
      }}
    >
      <label>
        用户名
        <input
          onChange={(event) => {
            this.setState({
              username: event.target.value,
            });
          }}
          type="text"
        />
      </label>
      <label>
        密码
        <input
          onChange={(event) => {
            this.setState({
              password: event.target.value,
            });
          }}
          type="password"
        />
      </label>
      <button>提交</button>
    </form>
  ```

  

* 非受控组件：用的时候去取节点再拿到节点的值

  ```jsx
  {/*非受控组件*/}
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(
          "非受控组件",
          this.usernameNode.value,
          this.passwordNode.value
        );
      }}
    >
      <label>
        用户名
        <input
          ref={(node) => {
            // 回调式建议写成类函数，避免多次调用
            console.log(node);
            this.usernameNode = node;
          }}
          type="text"
        />
      </label>
      <label>
        密码
        <input
          ref={(node) => {
            // 回调式建议写成类函数，避免多次调用
            console.log(node);
            this.passwordNode = node;
          }}
          type="password"
        />
      </label>
      <button>提交</button>
  </form>
  ```

  

#### 高阶函数与柯里化函数

**高阶函数**：如果一个函数符合下面两个规范中的任意一个，就是高阶函数

* 若该函数**接收参数是一个函数**，该函数就可以称为高阶函数

  ```js
  const arr = [1, 2, 3, 4, 5]
  arr.map(item => item + 2)
  ```

* 若该函数调用的**返回值依然是一个函数**，该函数就可以称为高阶函数

  ```js
  function check(value) {
      return function () {
          return checkBefore(value)
      }
  }
  
  function checkBefore(value) {
      return value > 60 ? '及格' : '不及格'
  }
  
  console.log(check(60)());
  ```

* 常见的高阶函数：`Promise` `setTimeout` `arr.map(function(){})`

**柯里化函数**：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式

```js
function sum(a) {
    return function (b) {
        return function (c) {
            return a + b + c
        }
    }
}

console.log(sum(1)(2)(3));
```



#### 组件生命周期

* 组件从创建到死亡会经历一些**特定阶段**
* React 组件中包含一系列钩子函数(生命周期回调函数)，会在特定的时刻调用
* 我们定义组件时，可在特定的生命周期回调函数进行业务处理

```jsx
const root = document.querySelector("#root")
    
class Life extends React.Component{
  state = {
    opacity:1
  }

  // 生命周期回调函数 === 生命周期钩子函数 === 生命周期函数
  // 组件将要被卸载
  componentWillUnmount(){
    console.log('componentWillUnmount');
    clearInterval(this.timer);
  }

  // 组件挂载完毕，只执行 1 次
  componentDidMount(){
    console.log('componentDidMount');
    this.timer = setInterval(() => {
      let {opacity} = this.state
      opacity-=0.1
      if(opacity<=0) opacity=1;
      this.setState({
        opacity
      })
    }, 200);

  }

  death = ()=>{
    // 卸载组件
    ReactDOM.unmountComponentAtNode(root)
  }

  // render 调用时机：初始化渲染、状态更新之后执行 1 + n
  render(){
    console.log('render');
    return (
      <div>
        <h2 style={{
          opacity: this.state.opacity
        }}>
          React 学不会怎么办
        </h2>
        <button onClick={this.death}>不活了</button>
      </div>
    )
  }
}
ReactDOM.render(<Life/>, root);
```

##### 各个生命周期钩子函数

![1](.\note-img\2.png)

##### 单独一个组件的生命周期

* constructor 类构造器
* componentWillMount 组件将要挂载
* render 组件进行计算渲染
* componentDidMount 组件计算渲染后进行挂载
* 使用 **setState 更改状态**
  * 执行 shouldComponentUpdate 回调函数，**该函数决定视图是否更新**，不写则**默认返回 true**
    * 返回 true，走 componentWillUpdate => render => componentDidUpdate
    * 返回 false，停止，视图不更新，但当下次更新时，之前的状态会补上
* 使用 **this.forceUpdate 强制更新视图**
  * 跳过 shouldComponentUpdate 回调函数（无论是否返回 true）
  * 走 componentWillUpdate => render => componentDidUpdate



##### 父子组件生命周期

* 【父组件】 constructor 类构造器
* 【父组件】componentWillMount 组件将要挂载
* 【父组件】render 组件进行计算渲染
* 【子组件】 constructor 类构造器
* 【子组件】 componentWillMount 组件将要挂载
* 【子组件】render 组件进行计算渲染
* 【子组件】componentDidMount 组件计算渲染后进行挂载
* 【父组件】componentDidMount 组件计算渲染后进行挂载



##### 父组件使用 setState 

执行父组件 shouldComponentUpdate 回调函数，**该函数决定视图是否更新**，不写则**默认返回 true**

* 返回 true
  * 【父组件】componentWillUpdate 
  * 【父组件】render
  * 【子组件】componentWillReceiveProps
  * 【子组件】shouldComponentUpdate 
    * 如果**子组件 shouldComponentUpdate 返回 false，则子组件之后的生命周期都不会走**
  * 【子组件】componentWillUpdate 
  * 【子组件】render 
  * 【子组件】componentDidUpdate
  * 【父组件】componentDidUpdate
* 返回 false，停止，视图不更新，**子组件对应的生命周期也不会执行**



实际就三个阶段：

* 初始化阶段
* 更新阶段
* 卸载组件



##### React 17.x 新版本

* 针对 `componentWillUpdate ` `componentWillMount ` `componentWillMount ` 需要增加 `UNSAVE_` 前缀，原因是**预计未来设计的异步渲染会引起 bug**

  ![1](.\note-img\3.png)

![1](.\note-img\4.png)

![1](.\note-img\5.png)



#### React DOM diffing 算法

* 如果用数组的 index 索引作为 key 的唯一标识，以下场景都会出现问题
  * 逆序增加删除等破坏顺序操作的
  * 带输入类 DOM
* 建议使用唯一标识作为 key 值

![1](.\note-img\6.png)





### React 应用基于 React 脚手架

---

![1](.\note-img\7.png)



#### 脚手架文件系统

* reportWebVitals.js 用于记录页面性能
* App.js 入口组件

```jsx
<React.StrictMode><App/></React.StrictMode> 严格模式
```

* index.js 入口 js

* 自定义的组件

  * 后缀名可以通过 `.jsx` 进行区分

  * 文件名如果带有文件夹的情况下 Hello/index.jsx，import 时只用写到 `Hello`

    ```js
    import Hello from './component/Hello'
    ```

    
#### css 样式模块化

* 样式文件改名添加 `modules` ，如 `index.modules.css`

  ```css
  /* index.modules.css */
  .title{...}
  ```

  

* 组件文件

  ```jsx
  // Hello.js
  import Hello from './index.modules.css'
  ...
  return (<div className={Hello.title}></div>)
  ```

  

#### 提高 react 编码效率插件

`ES7 React/Redux/GraphQL/React-Native snippets`

* 输入`rcc` 点 tab 直接输入类式组件

* 输入`rfc` 点 tab 直接输入函数式组件



#### 功能界面的组件化编码流程（通用）

* **拆分组件**：拆分界面，抽取组件
* **实现静态组件**：使用组件实现静态页面效果
* **实现动态组件**：
  * 动态显示初始化数据
    * 数据类型
    * 数据名称
    * 保存在那个组件
      * 仅**某个组件使用**，放在**自身的 state** 里
      * **某些组件都要使用**：放在他们给**共同的父组件里(状态提升)**
  * 交互(从绑定事件监听开始)

* **父子组件之间通讯**：
  * 父传子：**props**
  * 子传父：要求父**传一个函数**給子，子在合适的时机调用该函数

* **状态在哪，操作状态的方法就在哪**





#### chrome 插件

* FeHelper，json 格式化排序等



#### react脚手架配置代理总结

##### 方法一

> 在 package.json 中追加如下配置

```json
"proxy":"http://localhost:5000"
```

说明：

1. 优点：配置简单，前端请求资源时可以**不加任何前缀**。
2. 缺点：不能配置多个代理。
3. 工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配3000端口前端资源）



##### 方法二

1. 第一步：创建代理配置文件

   > 在src下创建配置文件：**src/setupProxy.js** 路径文件名固定

2. 编写 setupProxy.js (webpack 使用的 cmd 模式)配置具体代理规则：

   ```js
   const proxy = require('http-proxy-middleware')
   
   module.exports = function(app) {
     app.use(
       proxy('/api1', {  //api1是需要转发的请求(所有带有/api1前缀的请求都会转发给target)
         target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
         changeOrigin: true, //控制服务器接收到的请求头中host字段的值，即修改请求源
         /*
         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
         */
         pathRewrite: {'^/api1': ''} //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
       }),
       proxy('/api2', { 
         target: 'http://localhost:5001',
         changeOrigin: true,
         pathRewrite: {'^/api2': ''}
       })
     )
   }
   ```

说明：

1. 优点：可以**配置多个代理**，可以灵活的控制请求是否走代理。
2. 缺点：配置繁琐，前端请求资源时必须加前缀。



![1](.\note-img\8.png)

* 客户端发送经过 ajax 引擎，ajax 引擎可以发送请求到服务器，但回来的响应因同源策略被拒绝

* 开启中间代理服务器的端口也是3000，代理转发请求给 5000 端口的服务器，**中间服务器没有 ajax 引擎因此不会被 ajax引擎拒绝**





#### 消息订阅——发布机制

跨任意层级组件通讯使用

* 工具库 PubSubJS

* 使用：

  ```js
  let token = Pubsub.subscribe('消息名', function(msg, data){}); // 订阅消息
  Pubsub.unsubscribe(token); // 取消订阅
  Pubsub.publish('消息名',data); // 发布消息
  ```



#### 扩展 Fetch 

* window.fetch 新版本浏览器自带，不需要像 axios/jquery 这些额外下载

* 跟 xhr 平级，开发者工具 network 面板 xhr and fetch 都能看到

* **关注分离**：分多个步骤处理

  ```js
  fetch(url).then(
      response=>{return response.json()}, // 第一步：服务器连接成功，返回一个 promise
      error=>{return new Promise(function(){})} // 服务器连接失败，返回一个空的 promise 处理
  ).then(
      data=>{console.log(data)}, // 第二步：获取数据
      error=>{console.log(error)} // 输出错误
  )
  // 也可使用 async await 方法些，错误用 try catch 捕获
  ```

  

### React 路由

---

#### SPA理解

* 单页面多组件应用，SPA
* 整个应用只有一个完整的页面
* 点击页面中的链接不会刷新页面，只会做页面**局部刷新**
* 数据都需要通过 ajax 请求获取，并在前端异步展现



#### 路由理解

* 什么是路由
  * 路由就是映射关系(key:value)
  * key => 路径
  * value => function(后端路由) 或 component(前端路由)
* 路由器(router)管理各个路由(route)



#### 路由原理

依靠 BOM 的 history 进行 path 匹配，然后返回映射的组件



#### react-router-dom

* react 插件库，专门用来实现 SPA

* 路由组件尽量写在 `pages` 文件夹下面

* **路由组件 this.props 会收到路由器传递的参数**（history location 等）

* 使用频率高的组件

  ```jsx
  import { NavLink, BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
  ```

  * NavLink: 导航链接，带选中状态，选中导航自动添加 active
  * Route: 路由 path 和 component 键值对表示映射关系
  * BrowserRouter: 路由器，放在最外层进行管理
  * 单一匹配： 包裹在 Switch 里的 route，相同 path 的只会匹配一个；如果不包裹则全部都会匹配

  ```jsx
  <switch>
    	{/* 注册路由  */}  
      <Route path="/home" component={Home}></Route>
      <Route path="/about" component={About}></Route> {/* 只会匹配前者 */}
      <Route path="/about" component={Test}></Route>
  </switch>
  ```

  * Redirect 是 Route 都匹配不上则进行转向（类似于 switch 的 default)

    ```jsx
    <Route path="/home" component={Home}></Route>
    <Route path="/about" component={About}></Route>
    <Redirect to="/home" />
    ```

    

* 路由精准匹配与模糊匹配

  * 默认模糊匹配

  * 精准匹配`exact`，不要随便开启，开启会导致无法继续匹配二级路由

    ```jsx
    <Route exact path="/home" component={Home}></Route>
    ```

* 路由组件参数

  * 通过 **params 形式**传递接收参数，地址栏**有参数**

  ```jsx
  <NavLink to="/about/news/007/hello world">News</NavLink> {/* 路由连接：携带参数 */}
  
  <Route path="/about/news/:id/:title" component={News} /> {/* 注册路由：声明接收参数 */}
  {/* News 组件里 props 能接收到 params */}
  console.log(this.props.match.params);
  ```

  * 通过 **params 形式**传递接收参数，地址栏**有参数**

  ```jsx
  <NavLink to="/about/message?id=007&title=hello react">Message</NavLink>
  <Route path="/about/message" component={Message} /> 
  {/* News 组件里 props 能接收到 params */}
  console.log(this.props.location.search); // search 是一个 urlencode 的值，可使用 querystring 库进行解析
  ```

  * 通过 **state 形式**传递接收参数，地址栏**无参数**

    **state 的数据会被 BrowserRouter 进行维护，因此刷新也不会丢失数据**

  ```jsx
  <NavLink to={{path:'/about/message', state={{id:"007"}}}}>Message</NavLink>
  <Route path="/about/message" component={Message} /> 
  {/* News 组件里 props 能接收到 params */}
  console.log(this.props.location.state);
  ```

* 路由 replace 与 push

  * 可以将历史记录看做栈结构
  * 默认是 push，将路由记录压栈
  * `<Link />`上添加 **replace**  可以改为替换，则不会记录路由

* **编程式路由导航**

  借助 history api 进行路由操作

  ```jsx
  this.props.history.replace(path, state)
  this.props.history.push(path, state)
  this.props.history.go(n)
  this.props.history.goForward()
  this.props.history.goBack()
  ```

* **withRouter**

  一般组件包裹 **withRouter**，让一般组件带有路由组件持有的 API

  ```jsx
  import {withRouter} from 'react-router-dom'
  export default withRouter(一般组件)
  ```

* BrowserRouter 与 HashRouter 区别

  * 底层原理不一样：
    * BrowserRouter 使用的是  H5 的 history API，不兼容 IE9 及以下版本
    * HashRouter 使用的是 URL 哈希值
  * path 表现形式不一样
    * BrowserRouter 的路径没有 #
    * HashRouter  的路径有 #
  * 刷新后对路由 state 参数的影响
    * BrowserRouter 没有任何影响，因 state 保存在 history 对象中
    * HashRouter  刷新后会导致路由 state 参数丢失
  * HashRouter  可以解决一些路径错误的问题

#### 标签体

```jsx
<NavLink>Home</NavLink> // 第一种写法
<NavLink children="Home" /> // 第二种写法

this.props.children // 可以获取 Home
```





### redux

---

#### redux 是什么

* 专门管理状态的 js 库，不是 react 专门使用，可用在 vue angular 中，但和 react 配合更多
* **作用：**集中管理 react 应用中**多个组件状态**

![1](.\note-img\9.png)

#### 什么情况下需要使用 redux

* 某个组件状态，需要让其他组件可以随时拿到(共享)
* 一个组件需要改变另一个组件状态(通信)
* 总体原则：能不用就不用，如果不用比较吃力才考虑使用



![1](.\note-img\10.png)

#### 第一个 redux

* **创建核心 store**

  ```jsx
  // redux/store.js
  // 创建 redux 中的 store 对象
  import { createStore } from "redux";
  import countReducer from "./count_reducer";
  
  export default createStore(countReducer);
  ```

* store 所需的 **reducer**

  ```jsx
  // redux/reducer.js
  // 初始化数据
  const initState = 0;
  
  // reducer 本质就是函数
  export default function (prevState = initState, action) {
    // 初始化 prevState 会传 undefined, action => {type: "@@redux/INITxxxxx"}
    console.log(prevState, action);
    const { type, data } = action;
  
    switch (type) {
      case "increment":
        return prevState + data;
      case "decrement":
        return prevState - data;
      // 初始化时候 type 没有匹配，才会出现走 default
      default:
        return prevState;
    }
  }
  ```

* 组件引入 store，在业务逻辑处**进行 dispatch action**

  ```jsx
  import store from "./redux/store";
  
  // 业务逻辑处理
  store.dispatch({
      type: "increment",
      data: yourData,
  });
  
  store.getState(); // 获取 store 中，保存的 state
  ```

* dispatch 后 store 中的 state 会更新，但视图并没有更新，**需要触发 render**
  * 在 dispatch 后加 this.setState({})
  * 在 componentDidMount 里 `store.subscribe(()=>{this.setState({})});`
  * 在入口文件 index.js 重新 render，`store.subscribe(()=>{ReactDom.render(...)});`**(推荐)**

* 创建 actionCreator

  ```jsx
  // redux/count_action.js
  const createIncrementAction = (data) => ({ type: "increment", data });
  
  const createDecrementAction = (data) => ({ type: "decrement", data });
  
  export { createIncrementAction, createDecrementAction };
  
  // 组件使用
  store.dispatch(createIncrementAction(data));
  ```

  

#### 同步/异步 action

* 一般对象`{type:'xxx', data: 'xxx'}`**同步 action** 

* 函数则为**异步 action**

  * store 需要使用中间件 `redux-thunk`

    ```jsx
    // redux/store.js
    import {applyMiddleware} from 'redux'
    import thunk from 'redux-thunk'
    
    export default createStore(countReducer,applyMiddleware(thunk));

    // redux/count_action.js
    // 异步 action 需要返回一个函数
    const createAsyncDecrementAction = (data) => {
      return (dispatch) => {
        window.setTimeout(() => {
          dispatch(createIncrementAction(data));
        }, 500);
      };
    };
    
    // 组件
    // 异步 action
    store.dispatch(createAsyncDecrementAction(selectCount));
    ```
    
  * 异步 action 不是必须要用的
  



#### react-redux

react 针对 redux 推出的库

![1](.\note-img\11.png)

* 容器组件可放在 `containers` 目录下

  **mapDispatchToProps** 有两种写法

  * 函数
  * 对象(简写方式)

  ```jsx
  // container/Count.jsx
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
  
  ```

  

* UI 组件可放在 `components`目录下

  使用 react-redux 不需要再从 store 里面进行操作，而是由父组件**将 store 相关状态与方法映射到 props 里**

  ```jsx
  import React, { Component } from "react";
  
  export default class Count extends Component {
    state = {
      selectCount: 1,
    };
  
    onSelectChange = (event) => {
      this.setState({
        selectCount: +event.target.value,
      });
    };
  
    increment = () => {
      const { selectCount } = this.state;
      
      // 操作状态的方法从 props 获取
      this.props.increment(selectCount);
    };
  
    decrement = () => {
      const { selectCount } = this.state;
      
      // 操作状态的方法从 props 获取
      this.props.decrement(selectCount);
    };
  
    incrementIfOdd = () => {
      const { selectCount } = this.state;
      if (this.props.count % 2) {
          
          // 操作状态的方法从 props 获取
        this.props.increment(selectCount);
      }
    };
  
    incrementIfAysnc = () => {
      const { selectCount } = this.state;
      
      // 异步 action
      // 操作状态的方法从 props 获取
      this.props.asyncIncrement(selectCount);
    };
  
    render() {
      return (
        <div>
          {/* 状态从 props 获取 */}
          <h1>当前求和： {this.props.count} </h1>
          <select value={this.selectCount} onChange={this.onSelectChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button onClick={this.increment}>+</button>
          <button onClick={this.decrement}>-</button>
          <button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>
          <button onClick={this.incrementIfAysnc}>异步+</button>
        </div>
      );
    }
  }
  ```

  

  ![1](.\note-img\12.png)

* Provider 组件，可以给所有的容器组件注入 store

  ```jsx
  // 加入 Provider 后
  <Provider store={store}>
      <App />
  </Provider>
  
  // 无需每个组件都注入 store
  <Demo1 store={store} />
  <Demo2 store={store} />
  <Demo3 store={store} />
  
  // 只需直接写
  <Demo1 />
  <Demo2 />
  <Demo3 />
  ```

* 容器组件和 UI 组件可以合并为一个组件进行优化

* 各组件间**数据共享**需要使用 `combineReduces`将 `reducer` 合并

  ```jsx
  import { combineReducers, createStore } from "redux";
  import sum from "./reducers/sum";
  import person from "./reducers/person";
  
  const finalReducer = combineReducers({
    sum,
    person,
  });
  
  export default createStore(finalReducer);
  ```

  

### 补充扩展

---

#### setState 的两种写法

第二个参数均是可选的回调方法**(更新状态后执行)**

* 对象式 setState

  ```js
  this.setState({
      count: this.state.count + 1
  })
  ```

* 函数式 setState

  ```js
  this.setState((state, props)=>{
      return {
          count: state.count +1
      }
  })
  ```



#### 路由组件懒加载

```jsx
import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter, NavLink, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

export default class LazyLoadRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavLink to="/home">home</NavLink>
        <NavLink to="/about">about</NavLink>

        <Suspense fallback={<h2>Loading...</h2>}>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
        </Suspense>
      </BrowserRouter>
    );
  }
}
```

