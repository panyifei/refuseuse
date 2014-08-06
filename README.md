# refuseuse.js


根据你传入的参数拒绝使用一些特定的global function，但是如果你在自己的全局作用域里面声明过，是可以使用的。
即拒绝你调用可能从其他模块得到的某个function。是使用在[Node.js](http://nodejs.org)中的模块。


## Download

使用前请先安装：

    npm install refuseuse


## Documentation

### Collections

* [`refuseFunction`](#refuseFunction)



## Collections
<a name="refuseFunction" />
### refuseFunction(path,specialString)
禁止使用特殊字符的全局函数,参数是传一个路径。




