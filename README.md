# refuseuse.js


根据你传入的参数拒绝使用一些特定的global function，但是如果你在自己的全局作用域里面声明过，是可以使用的。
即拒绝你调用可能从其他模块得到的某个function。是使用在[Node.js](http://nodejs.org)中的模块。


## Download

使用前请先安装：

    npm install async
    npm install async
    npm install async
    npm install async


## Documentation

### Collections

* [`refuseFunction`](#refuseFunction)
* [`refuseFunctionSync`](#refuseFunctionSync)
* [`refuseFunctionString`](#refuseFunctionString)
* [`refuseFunctionStringSync`](#refuseFunctionStringSync)


## Collections
<a name="refuseFunction" />
### refuseFunction(path,specialString,callback)
异步方法,禁止使用特殊字符的全局函数,传路径进来

<a name="refuseFunctionSync" />
### refuseFunctionSync(path,specialString)
同步方法,禁止使用特殊字符的全局函数,传路径进来

<a name="refuseFunctionString" />
### refuseFunctionString(codeString,specialString,callback)
异步方法,禁止使用特殊字符的全局函数,传string进来

<a name="refuseFunctionStringSync" />
### refuseFunctionStringSync(codeString,specialString)
同步方法,禁止使用特殊字符的全局函数,传string进来

//思路:写一个函数，从上到下检查scope
里面如果声明了function，就过关，并且他的child scopes也过关，
没有申明，看有没有使用，没有使用，自己直接过关，使用了的话，直接报错
