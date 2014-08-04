(function () {

  var esprima=require("esprima");
  var escope=require("escope");
  var async=require("async");
  var fs=require("fs");

  var refuseuse={};


  

  
  var _check=function(code,specialString){

              var ast=esprima.parse(code,{range:true,loc:true});
              var scopes=escope.analyze(ast).scopes;

              for (var i = 0; i <scopes.length; i++) {
                  var status=_checkCode(scopes,i,specialString);
                if(status["type"]=="continue"){
                  i=status["i"];
                  continue;
                }else if(status["type"]=="break"){
                  break;
                };
              };//用来循环scope的


                console.log("success!");

  }


  var _checkCode=function(scopes,i,specialString){
                  var finish=false;
                  var continueCycle=false;
                  var scopeBlock=scopes[i]['block']//最外层的bolck

                  if (scopeBlock['params']) {
                    for(var y=0;y<scopeBlock['params'].length;y++){
                      if(scopeBlock['params'][y]['name']==specialString){
                        i+=scopes[i]['childScopes'].length;
                        continueCycle=true;
                        break;
                      }
                    }
                  };//先看这层是否有同名参数传递进来

                  if(continueCycle){
                    return {'type':'continue',
                            'i':i
                            }
                  }//代表本层可以使用

                  var scopeBlockBody=scopeBlock['body'];//block里面那层的body
                  if(i!=0){scopeBlockBody=scopeBlockBody['body'];}//global层只被body包了一次，其他的都是2次

                  for (var x = 0; x <scopeBlockBody.length; x++) {


                      if(scopeBlockBody[x]['type']&&scopeBlockBody[x]['type']=='FunctionDeclaration'){
                        if(scopeBlockBody[x]['id']['name']==specialString){
                            if(i==0){
                              finish=true;
                              break;
                            }else{
                              i+=scopes[i]['childScopes'].length;
                              continueCycle=true;
                              break;
                            }//如果i=0,表示在全局申明过了,则直接结束;如果!=0,则他与他的子层不用查了
                        }//如果名字一样，即在这层申明过了，则这层以及他的子层都算过关
                      }//如果是方法的申明


                      if(scopeBlockBody[x]['type']&&scopeBlockBody[x]['type']=='IfStatement'){
                        if(scopeBlockBody[x]['consequent']['body']){
                            var funcBody=scopeBlockBody[x]['consequent']['body'];
                            var result=_checkIfBodyDefine(funcBody,specialString,i);
                            if(result['type']=='finish'){
                              finish=true;
                              break;
                            }else if(result['type']=='continue'){
                              i+=scopes[i]['childScopes'].length;
                              continueCycle=true;
                              break;
                            }else if(result['type']=='continueOne'){
                            }
                        }
                      }//如果是在if块里声明的方法


                      if(scopeBlockBody[x]['type']&&scopeBlockBody[x]['type']=='VariableDeclaration'){
                        if(scopeBlockBody[x]['declarations'][0]['id']['name']==specialString){
                            i+=scopes[i]['childScopes'].length;
                            continueCycle=true;
                            break;
                        }//用var申明了该方法,则默认该层可以调用,写在了前面就管不了了.
                      }//加上对var左边申明的检测

                      if(scopeBlockBody[x]['type']&&scopeBlockBody[x]['type']=='ExpressionStatement'&&scopeBlockBody[x]['expression']['operator']=="="&&scopeBlockBody[x]['expression']['left']['name']){
                         if(scopeBlockBody[x]['expression']['left']['name']==specialString&&scopeBlockBody[x]['expression']['right']['type']=="FunctionExpression"){
                            if(i==0){
                              finish=true;
                              break;
                            }else{
                              throw new Error("you define a global function in the 局部函数 at line "+scopeBlockBody[x]['expression']['loc']['start']['line']);
                            };
                         }//用var申明了该方法,则默认该层可以调用,写在了前面就管不了了.
                      }//加上对直接申明的检测,即没有用var,就是说会变成全局

                  };//检查scope里面的方法申明

                  if(finish){
                    return {'type':'break',
                            'i':55
                            }
                  }//代表全局申明了
                  if(continueCycle){
                    return {'type':'continue',
                            'i':i
                            }
                  }//代表非全局申明
                  //运行到这里代表自己以及父辈都没有申明

                  for (var x = 0; x <scopeBlockBody.length; x++) {
                      if(scopeBlockBody[x]['type']&&scopeBlockBody[x]['type']=='ExpressionStatement'){
                        if(scopeBlockBody[x]['expression']['type']=='CallExpression'){
                            if(scopeBlockBody[x]['expression']['callee']['name']==specialString){
                                throw new Error("sorry,you can't use:   "+specialString+"  at line "+scopeBlockBody[x]['expression']['loc']['start']['line']);
                            }//调用了特定方法了,抛出Error
                        }
                      }//假设现在只是直接调用的语句

                      if(scopeBlockBody[x]['type']&&scopeBlockBody[x]['type']=='VariableDeclaration'){
                        if(scopeBlockBody[x]['declarations'][0]['init']['type']=='CallExpression'){
                            if(scopeBlockBody[x]['declarations'][0]['init']['callee']['name']==specialString){
                                throw new Error("sorry,you can't use:   "+specialString+"  at line "+scopeBlockBody[x]['declarations'][0]['init']['loc']['start']['line']);
                            }//调用了特定方法了,抛出Error
                        }
                      }//加上对var右边调用的检测

                      if(scopeBlockBody[x]['type']&&scopeBlockBody[x]['type']=='IfStatement'){
                        if(scopeBlockBody[x]['consequent']['body']){
                            var funcBody=scopeBlockBody[x]['consequent']['body'];
                            _checkBodyUse(funcBody,specialString,i);
                        }
                      }//检验if里面是否使用
                      if(scopeBlockBody[x]['type']&&scopeBlockBody[x]['type']=='ForStatement'){
                        if(scopeBlockBody[x]['body']){
                            var funcBody=scopeBlockBody[x]['body']['body'];
                            _checkBodyUse(funcBody,specialString,i);
                        }
                      }//检验for里面是否使用

                   };//检查scope里面的方法使用
                   return {'type':'continue',
                            'i':i
                          }
  }//_checkCode

var _checkBodyUse=function(funcBody,specialString,i){
              for(var j=0;j<funcBody.length;j++){
                      if(funcBody[j]['type']&&funcBody[j]['type']=='ExpressionStatement'){
                        if(funcBody[j]['expression']['type']=='CallExpression'){
                            if(funcBody[j]['expression']['callee']['name']==specialString){
                                throw new Error("sorry,you can't use:   "+specialString+"  at line "+funcBody[j]['expression']['loc']['start']['line']);
                            }//调用了特定方法了,抛出Error
                        }
                      }//假设现在只是直接调用的语句

                      if(funcBody[j]['type']&&funcBody[j]['type']=='VariableDeclaration'){
                        if(funcBody[j]['declarations'][0]['init']['type']=='CallExpression'){
                            if(funcBody[j]['declarations'][0]['init']['callee']['name']==specialString){
                                throw new Error("sorry,you can't use:   "+specialString+"  at line "+funcBody[j]['declarations'][0]['init']['loc']['start']['line']);
                            }//调用了特定方法了,抛出Error
                        }
                      }//加上对var右边调用的检测

                      if(funcBody[j]['type']&&(funcBody[j]['type']=='IfStatement'||funcBody[j]['type']=='ForStatement')){
                        if(funcBody[j]['type']=='IfStatement'){
                            if(funcBody[j]['consequent']['body']){
                                var funcBody=funcBody[j]['consequent']['body'];
                                _checkBodyUse(funcBody,specialString,i);
                            }
                        }else if(funcBody[j]['type']=='ForStatement'){
                            if(funcBody[j]['body']){
                            var funcBody=funcBody[j]['body']['body'];
                            _checkBodyUse(funcBody,specialString,i);
                            }
                        }
                      }//检验if里面是否使用          
    }                        
  }//判断if的body里面是否使用了


  var _checkIfBodyDefine=function(funcBody,specialString,i){
    for(var j=0;j<funcBody.length;j++){
                      if(funcBody[j]['type']&&funcBody[j]['type']=='FunctionDeclaration'){
                        if(funcBody[j]['id']['name']==specialString){
                            if(i==0){
                              return{
                                'type':'finish',
                                'i':i
                              }
                            }else{
                              return{
                                'type':'continue',
                                'i':i
                              }
                            }//如果i=0,表示在全局申明过了,则直接结束;如果!=0,则他与他的子层不用查了
                        }//如果名字一样，即在这层申明过了，则这层以及他的子层都算过关
                      }//如果是方法的申明


                      if(funcBody[j]['type']&&funcBody[j]['type']=='IfStatement'){
                        if(funcBody[j]['consequent']['body']){
                            var funcBody=funcBody[j]['consequent']['body'];
                            return _checkIfBodyDefine(funcBody,specialString,i);
                        }
                      }//如果是在if块里声明的方法


                      if(funcBody[j]['type']&&funcBody[j]['type']=='VariableDeclaration'){
                        if(funcBody[j]['declarations'][0]['id']['name']==specialString){
                            return{
                                'type':'continue',
                                'i':i
                            }
                        }//用var申明了该方法,则默认该层可以调用,写在了前面就管不了了.
                      }//加上对var左边申明的检测
    }
    return{
      'type':'continueOne',
      'i':i
    }
  }//检测if块是否有申明

  refuseuse.refuseFunction=function(path,task){
      try{
      var code=fs.readFileSync(path,"utf-8");
        _check(code,task);
      }catch(err){
        console.log(err);
        throw err;
        //return ;
      }

  };//传路径的话的异步方法



    // Node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = refuseuse;
    }
    // AMD / RequireJS
    else if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return refuseuse;
        });
    }
    // included directly via <script> tag
    else {
        root.refuseuse = refuseuse;
    }

}());