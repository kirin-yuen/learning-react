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



#### React 应用基于 React 脚手架

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

    