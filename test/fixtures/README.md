适用的Test

1.使用function申明 
1.1global.js                没有申明，global直接调用。（出错） 
1.2golbalOwn.js             全局申明了，全局就可以使用了。 
1.3interFunc.js             没有申明，内部函数使用（出错） 
1.4interFuncGlobalOwn.js    全局申明，内部调用 
1.5interFuncInterOwn.js     内部申明，内部调用

2.使用了var申明 
2.1globalVarOwn.js          全局使用了var申明，可以调用 
2.2globalVarInterOwn.js     内部var申明,全局调用(出错) 
2.3interVarInterOwn.js      内部用了var申明,内部可以调用 
2.4interVarGlobalOwn.js     全局用了var申明,内部可以调用 
2.5intererVarInterOwn.js    内部var申明了,更内部调用 
2.6interVarIntererOwn.js    更内部var申明了,内部调用(出错)

3.作为函数的参数传入 
3.1interPara.js                 作为参数传入内部,内部调用 
3.1interParaIntererOwn.js       作为参数传入内部,更内部调用

4.if语句
4.1ifFuncIfOwn        if块申明了,if块调用 
4.2ifVarIfOwn        if块使用var申明了,if块调用 
4.3if.js              没有申明,if块使用(出错) 
4.4ifelse.js            没有申明,else语句调用(出错)
4.5ifelseFinal        就是没有申明，在最后的else语句使用了(出错)
4.6ifelseifFinal        就是没有申明，在最后的else if语句使用了(出错)
4.7ifIf.js            没有申明,if块if使用(出错) 
4.8ifFuncForOwn         for块申明，if块使用
4.9iferFuncForOwn      for块申明，for块内部的if块使用
4.10globalFuncIfOwn    if块申明,全局调用 
4.11interFuncIfOwn     if块申明,内部函数调用
4.12ifelseFuncIfelseOwn  else申明,if语句调用都可以,多层的
4.13ifIfElse.js         if语句里面的if语句else里面调用
4.14ifTest1             if里面的if-else里的申明
4.15ifTest2             else的if里面的申明

5.for循环 
5.1for.js             没有申明,for块使用(出错) 
5.2forFor.js          没有申明,for块里的for块使用(出错)
5.3forFuncForOwn      for块申明，for块调用
5.3forVarForOwn       for块使用var申明，for块调用
5.4forFuncIfOwn       if块申明，for块使用
5.5forerFuncIfOwn     if块申明，if块内部的for块调用

6.doWhile语句
6.1dowhile.js             没有申明,dowhile块使用(出错) 
6.2dowhileDowhile.js      没有申明,dowhile块里的dowhile块使用(出错)
6...其他的应该也没问题

7.while语句
7.1while.js           没有申明,while块使用(出错)
7.2whileWhile.js      没有申明,while块里的while块使用(出错)
7...其他的应该也没问题

8.forin语句
8.1forin.js           没有申明,forin块使用(出错)
8.2forinForin.js      没有申明,forin块里的forin块使用(出错)
8...其他的应该也没问题

9.try语句
9.1try.js             try语句中使用(出错)
9.2tryTry.js          try语句中的try语句使用(出错)


else的if里面申明还会报错
if里的if else里的申明还会报错