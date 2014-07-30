根据你传入的参数拒绝使用一些特定的global function，但是如果你在自己的全局作用域里面声明过，是可以使用的。
即拒绝你调用可能从其他模块得到的某个function。
运行需要
npm install esprima
npm install escope
npm install refuseuse



//思路:写一个函数，从上到下检查scope
里面如果声明了function，就过关，并且他的child scopes也过关，
没有申明，看有没有使用，没有使用，自己直接过关，使用了的话，直接报错
//还没有可以使用,还在编辑之中