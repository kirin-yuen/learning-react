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

  