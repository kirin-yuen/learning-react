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
const vDOM1 = React.createElement('div', {id:"div1"}, 'Hello React'); // 使用 React 创建虚拟 DOM
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

