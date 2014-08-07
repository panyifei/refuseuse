# refuseuse.js


根据你传入的参数拒绝使用一些特定的global function，但是如果你在自己的全局作用域里面声明过，是可以使用的。
即拒绝你调用可能从其他模块得到的某个function。是使用在[Node.js](http://nodejs.org)中的模块。
提供了一个gulp task。


## Download

使用前请先安装：

    npm install refuseuse


## Documentation

### Collections

* [`refuseFunction`](#refuseFunction)
* [`refuseFunctionByNode`](#refuseFunctionByNode)



## Collections
<a name="refuseFunction" />
### refuseFunction(path,object||array)
禁止使用特殊字符的全局函数,第一个参数是传一个路径，第二个参数是禁止的对象，格式是[{type:'Function',value:'you need'}]。

<a name="refuseFunctionByNode" />
### refuseFunctionByNode(node,object||array)
禁止使用特殊字符的全局函数,第一个参数是传代码块，第二个参数是禁止的对象，格式是[{type:'Function',value:'you need'}]。




