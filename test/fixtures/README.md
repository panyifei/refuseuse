1.使用function申明
1.1global.js                   没有申明，global直接调用。（出错）
1.2golbalOwn.js                全局申明了，全局就可以使用了。
1.3interFunc.js                没有申明，内部函数使用（出错）
1.4interFuncGlobalOwn.js       全局申明，内部调用
1.5interFuncInterOwn.js	      内部申明，内部调用

2.使用了var申明
2.1globalVarOwn.js               全局使用了var申明，可以调用
2.2globalVarInterOwn.js		内部var申明,全局调用(出错)
2.3interVarInterOwn.js		内部用了var申明,内部可以调用
2.4interVarGlobalOwn.js		全局用了var申明,内部可以调用
2.5intererVarInterOwn.js	内部var申明了,更内部调用
2.6interVarIntererOwn.js	更内部var申明了,内部调用(出错)

3.作为函数的参数传入
3.1interPara.js			作为参数传入内部,内部调用
3.1interParaIntererOwn.js	作为参数传入内部,更内部调用

4.for语句中使用了,不检查申明了
4.1ifFuncIfOwn   	    if块申明了,if块调用
4.2if.js 		    没有申明,if块使用(出错)
4.3ifIf.js		    没有申明,if块if使用(出错)
4.3globalFuncIfOwn  	    if块申明,全局调用
4.4interFuncIfOwn	    if块申明,内部函数调用

5.for循环
5.1for.js                   没有申明,for块使用(出错)
5.2forFor.js                没有申明,for块里的for块使用(出错)


//兼容程度：
//function声明的函数直接可以调用；
//var声明的函数，如果在申明之前调用会出错，因为会往外层调用，会污染;在var申明之后调用就可以；
//然后直接a（）调用是可以检测的，或者var e=a（）也是可以检测的。
//然后如果在外部调用在内部函数中声明的全局函数是会报错的.检测到内部声明全局函数是会报错的.
//对与参数传递进来的同名函数是可以直接使用的.

//if,for语句有些特殊,我们需要将他们特殊对待~~~~~