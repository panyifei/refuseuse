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
                if(status.type=="continue"){
                  i=status.i;
                  continue;
                }else if(status.type=="break"){
                  break;
                }
              }//用来循环scope的

                console.log("success!");

  };


  var _checkIfElse=function(scopeBlockBody,specialString,i){
                if(scopeBlockBody.consequent&&scopeBlockBody.consequent.body){
                    var funcBody=scopeBlockBody.consequent.body;
                    var result=_checkBodyDefine(funcBody,specialString,i);

                    if(result.type=='finish'||result.type=='continue'){
                      return result;
                    }else if(result.type=='continueOne'){
                    }
                }
                //if最外面一层的body处理
                if((scopeBlockBody.alternate!==null)&&scopeBlockBody.alternate&&scopeBlockBody.alternate.type){
                    var funcSecondBody;
                    if(scopeBlockBody.alternate.type=="IfStatement"){
                      funcSecondBody=scopeBlockBody.alternate;
                    }else{
                      funcSecondBody=scopeBlockBody.alternate.body;
                      var resultElse=_checkBodyDefine(funcSecondBody,specialString,i);
                      if(resultElse.type=='finish'||resultElse.type=='continue'){
                        return resultElse;
                      }else if(resultElse.type=='continueOne'){
                      }
                    }

                    var resultE=_checkIfElse(funcSecondBody,specialString,i);
                    if(resultE.type=='finish'||resultE.type=='continue'){
                      return resultE;
                    }else if(resultE.type=='continueOne'){
                    }
                }//如果有其他的else,判断,一般的话调用自己,最后一层特殊处理
                return{
                  'type':'continueOne',
                  'i':i
                };
  };//用来处理ifelse的申明检测,如果else有几层的话,也可以处理

  var _checkCode=function(scopes,i,specialString){
                  var finish=false;
                  var continueCycle=false;
                  var scopeBlock=scopes[i].block;//最外层的bolck

                  if (scopeBlock.params) {
                    for(var y=0;y<scopeBlock.params.length;y++){
                      if(scopeBlock.params[y].name==specialString){
                        i+=scopes[i].childScopes.length;
                        continueCycle=true;
                        break;
                      }
                    }
                  }//先看这层是否有同名参数传递进来

                  if(continueCycle){
                    return {'type':'continue',
                            'i':i
                            };
                  }//代表本层可以使用

                  var scopeBlockBody=scopeBlock.body;//block里面那层的body
                  if(i!==0){scopeBlockBody=scopeBlockBody.body;}//global层只被body包了一次，其他的都是2次

                  var x = 0;
                  for (x = 0; x <scopeBlockBody.length; x++) {

                      if(scopeBlockBody[x].type&&scopeBlockBody[x].type=='FunctionDeclaration'){
                        if(scopeBlockBody[x].id.name==specialString){
                            if(i===0){
                              finish=true;
                              break;
                            }else{
                              i+=scopes[i].childScopes.length;
                              continueCycle=true;
                              break;
                            }//如果i=0,表示在全局申明过了,则直接结束;如果!=0,则他与他的子层不用查了
                        }//如果名字一样，即在这层申明过了，则这层以及他的子层都算过关
                      }//如果是方法的申明

                      if(scopeBlockBody[x].type&&(scopeBlockBody[x].type=='IfStatement'||scopeBlockBody[x].type=='ForStatement'||scopeBlockBody[x].type=='DoWhileStatement'||scopeBlockBody[x].type=='WhileStatement'||scopeBlockBody[x].type=='ForInStatement'||scopeBlockBody[x].type=='TryStatement')){
                        var funcBody;
                        var result;
                        if(scopeBlockBody[x].type=='IfStatement'){
                                  funcBody=scopeBlockBody[x];
                                  result=_checkIfElse(funcBody,specialString,i);
                                  if(result.type=='finish'){
                                    finish=true;
                                    break;
                                  }else if(result.type=='continue'){
                                    i+=scopes[i].childScopes.length;
                                    continueCycle=true;
                                    break;
                                  }else if(result.type=='continueOne'){
                                  }
                                  //减查if是否声明,包含了内部else
                        }else if(scopeBlockBody[x].type=='ForStatement'||scopeBlockBody[x].type=='DoWhileStatement'||scopeBlockBody[x].type=='WhileStatement'||scopeBlockBody[x].type=='ForInStatement'||scopeBlockBody[x].type=='TryStatement'){
                            if(scopeBlockBody[x].body){
                                funcBody=scopeBlockBody[x].body.body;
                                result=_checkBodyDefine(funcBody,specialString,i);
                                  if(result.type=='finish'){
                                    finish=true;
                                    break;
                                  }else if(result.type=='continue'){
                                    i+=scopes[i].childScopes.length;
                                    continueCycle=true;
                                    break;
                                  }else if(result.type=='continueOne'){
                                  }
                            }else if(scopeBlockBody[x].block){
                               var funcSecondBody=scopeBlockBody[x].block.body; 
                               var resultSecond=_checkBodyDefine(funcSecondBody,specialString,i);
                                if(resultSecond.type=='finish'){
                                  finish=true;
                                  break;
                                }else if(resultSecond.type=='continue'){
                                  i+=scopes[i].childScopes.length;
                                  continueCycle=true;
                                  break;
                                }else if(resultSecond.type=='continueOne'){
                                }
                            }
                               
                        }
                      }//如果是在if块或者for块里声明的方法


                      if(scopeBlockBody[x].type&&scopeBlockBody[x].type=='VariableDeclaration'){
                        if(scopeBlockBody[x].declarations[0].id.name==specialString){
                            i+=scopes[i].childScopes.length;
                            continueCycle=true;
                            break;
                        }//用var申明了该方法,则默认该层可以调用,写在了前面就管不了了.
                      }//加上对var左边申明的检测

                  }//检查scope里面的方法申明

                  if(finish){
                    return {'type':'break',
                            'i':55
                            };
                  }//代表全局申明了
                  if(continueCycle){
                    return {'type':'continue',
                            'i':i
                            };
                  }//代表非全局申明
                  //运行到这里代表自己以及父辈都没有申明



                     function cycle(tempBody){
                         var tempUseBody=tempBody.alternate;
                         if (tempUseBody.consequent) {
                             var funcBody=tempUseBody.consequent.body;
                             _checkBodyUse(funcBody,specialString,i);
                             if(tempUseBody.alternate){
                             cycle(tempUseBody);
                             }
                         }
                         if (tempUseBody.body) {
                             var funcSecondBody=tempUseBody.body;
                             _checkBodyUse(funcSecondBody,specialString,i);
                         }

                    }//这里创建一个循环来一层一层往里检测


                  for (x = 0; x <scopeBlockBody.length; x++) {
                      if(scopeBlockBody[x].type&&scopeBlockBody[x].type=='ExpressionStatement'){
                        if(scopeBlockBody[x].expression.type=='CallExpression'){
                            if(scopeBlockBody[x].expression.callee.name==specialString){
                                throw new Error("sorry,you can't use:   "+specialString+"  at line "+scopeBlockBody[x].expression.loc.start.line);
                            }//调用了特定方法了,抛出Error
                        }
                      }//假设现在只是直接调用的语句

                      if(scopeBlockBody[x].type&&scopeBlockBody[x].type=='VariableDeclaration'){
                        if(scopeBlockBody[x].declarations[0]&&scopeBlockBody[x].declarations[0].init!==null&&scopeBlockBody[x].declarations[0].init.type=='CallExpression'){
                            if((scopeBlockBody[x].declarations[0].init.callee!==null)&&scopeBlockBody[x].declarations[0].init.callee.name==specialString){
                                throw new Error("sorry,you can't use:   "+specialString+"  at line "+scopeBlockBody[x].declarations[0].init.loc.start.line);
                            }//调用了特定方法了,抛出Error
                        }
                      }//加上对var右边调用的检测

                      if(scopeBlockBody[x].type&&(scopeBlockBody[x].type=='IfStatement'||scopeBlockBody[x].type=='ForStatement'||scopeBlockBody[x].type=='DoWhileStatement'||scopeBlockBody[x].type=='WhileStatement'||scopeBlockBody[x].type=='ForInStatement'||scopeBlockBody[x].type=='TryStatement')){
                          if(scopeBlockBody[x].type=='IfStatement'){
                                  if(scopeBlockBody[x].consequent.body){
                                      var funcTBody=scopeBlockBody[x].consequent.body;
                                      //console.log(funcBody);
                                      _checkBodyUse(funcTBody,specialString,i);
                                  }
                                  //console.log(scopeBlockBody[x]);
                                  if (scopeBlockBody[x].alternate) {
                                    var tempBody=scopeBlockBody[x];
                                    cycle(tempBody);
                                  }


                          }else if(scopeBlockBody[x].type=='ForStatement'||scopeBlockBody[x].type=='DoWhileStatement'||scopeBlockBody[x].type=='WhileStatement'||scopeBlockBody[x].type=='ForInStatement'||scopeBlockBody[x].type=='TryStatement'){
                             if(scopeBlockBody[x].body){
                              var funcInnerBody=scopeBlockBody[x].body.body;
                              _checkBodyUse(funcInnerBody,specialString,i);
                             }else if(scopeBlockBody[x].block){
                              var funcInBody=scopeBlockBody[x].block.body;
                              _checkBodyUse(funcInBody,specialString,i);
                             }
                          }
                      }//检验if和for里面是否使用


                   }//检查scope里面的方法使用
                   return {'type':'continue',
                            'i':i
                          };
  };//_checkCode

var _checkBodyUse=function(funcBody,specialString,i){
                 function cycle(tempBody){
                     var tempUseBody=tempBody.alternate;
                     if (tempUseBody.consequent) {
                         var funcInBody=tempUseBody.consequent.body;
                         _checkBodyUse(funcInBody,specialString,i);
                         if(tempUseBody.alternate){
                         cycle(tempUseBody);
                         }
                     }
                     if (tempUseBody.body) {
                         var funcInnerBody=tempUseBody.body;
                         _checkBodyUse(funcInnerBody,specialString,i);
                     }
                }//这里创建一个循环来一层一层往里检测
              for(var j=0;j<funcBody.length;j++){
                      if(funcBody[j].type&&funcBody[j].type=='ExpressionStatement'){
                        if(funcBody[j].expression.type=='CallExpression'){
                            if(funcBody[j].expression.callee.name==specialString){
                                throw new Error("sorry,you can't use:   "+specialString+"  at line "+funcBody[j].expression.loc.start.line);
                            }//调用了特定方法了,抛出Error
                        }
                      }//假设现在只是直接调用的语句

                      if(funcBody[j].type&&funcBody[j].type=='VariableDeclaration'){
                        if(funcBody[j].declarations[0].init.type=='CallExpression'){
                            if(funcBody[j].declarations[0].init.callee.name==specialString){
                                throw new Error("sorry,you can't use:   "+specialString+"  at line "+funcBody[j].declarations[0].init.loc.start.line);
                            }//调用了特定方法了,抛出Error
                        }
                      }//加上对var右边调用的检测

                      if(funcBody[j].type&&(funcBody[j].type=='IfStatement'||funcBody[j].type=='ForStatement'||funcBody[j].type=='DoWhileStatement'||funcBody[j].type=='WhileStatement'||funcBody[j].type=='ForInStatement'||funcBody[j].type=='TryStatement')){

                        if(funcBody[j].type=='IfStatement'){
                            if(funcBody[j].consequent.body){
                                var funcIfBbody=funcBody[j].consequent.body;
                                _checkBodyUse(funcIfBbody,specialString,i);
                            }//检查if的consequent
                            if (funcBody[j].alternate) {
                              var tempBody=funcBody[j];
                              cycle(tempBody);
                            }//检查consequent的alternate

                        }else if(funcBody[j].type=='ForStatement'||funcBody[j].type=='DoWhileStatement'||funcBody[j].type=='WhileStatement'||funcBody[j].type=='ForInStatement'||funcBody[j].type=='TryStatement'){
                            if(funcBody[j].body){
                                var funcIfBody=funcBody[j].body.body;
                               _checkBodyUse(funcIfBody,specialString,i);
                            }else if(funcBody[j].block){
                               var funcIfBody2=funcBody[j].block.body;
                               _checkBodyUse(funcIfBody2,specialString,i);
                            }
                        }
                      }//检验if里面是否使用          
    }                        
  };//判断if或者for的body里面是否使用了


  var _checkBodyDefine=function(funcBody,specialString,i){
    for(var j=0;j<funcBody.length;j++){
                      if(funcBody[j].type&&funcBody[j].type=='FunctionDeclaration'){
                        if(funcBody[j].id.name==specialString){
                            if(i===0){
                              return{
                                'type':'finish',
                                'i':i
                              };
                            }else{
                              return{
                                'type':'continue',
                                'i':i
                              };
                            }//如果i=0,表示在全局申明过了,则直接结束;如果!=0,则他与他的子层不用查了
                        }//如果名字一样，即在这层申明过了，则这层以及他的子层都算过关
                      }//如果是方法的申明


                      if(funcBody[j].type&&(funcBody[j].type=='IfStatement'||funcBody[j].type=='ForStatement'||funcBody[j].type=='DoWhileStatement'||funcBody[j].type=='WhileStatement'||funcBody[j].type=='ForInStatement'||funcBody[j].type=='TryStatement')){
                        if(funcBody[j].type=='IfStatement'){
                            if(funcBody[j].consequent.body){
                              var interFuncBody=funcBody[j].consequent.body;
                              var result=_checkBodyDefine(interFuncBody,specialString,i);
                              if(result.type=='finish'||result.type=='continue'){
                                return result;
                              }else{
                                //继续执行
                              }
                            }

                             if(funcBody[j].alternate&&funcBody[j].alternate.consequent&&funcBody[j].alternate.consequent.body){
                              var interFuncSecondBody=funcBody[j].alternate.consequent.body;
                              var resultSecond= _checkBodyDefine(interFuncSecondBody,specialString,i);
                              if(resultSecond.type=='finish'||resultSecond.type=='continue'){
                                return resultSecond;
                              }else{
                                //继续执行
                              }
                            }//如果有其他的else
                            if(funcBody[j].alternate&&funcBody[j].alternate.body){
                              var interFuncThirdBody=funcBody[j].alternate.body;
                              var resultThird= _checkBodyDefine(interFuncThirdBody,specialString,i);
                              if(resultThird.type=='finish'||resultThird.type=='continue'){
                                return resultThird;
                              }else{
                                //继续执行
                              }
                            }//如果有其他的else
                        }else if(funcBody[j].type=='ForStatement'||funcBody[j].type=='DoWhileStatement'||funcBody[j].type=='WhileStatement'||funcBody[j].type=='ForInStatement'||funcBody[j].type=='TryStatement'){
                             if(funcBody[j].body&&funcBody[j].body.body){
                                  var interFuncForthBody=funcBody[j].body.body;
                                  var resultForth=_checkBodyDefine(interFuncForthBody,specialString,i);
                                  if(resultForth.type=='finish'||resultForth.type=='continue'){
                                    return resultForth;
                                  }else{
                                    //继续执行
                                  }
                             }else if(funcBody[j].block&&funcBody[j].block.body){
                                  var interFuncFifthBody=funcBody[j].block.body;
                                  var resultFifth=_checkBodyDefine(interFuncFifthBody,specialString,i);
                                  if(resultFifth.type=='finish'||resultFifth.type=='continue'){
                                    return resultFifth;
                                  }else{
                                    //继续执行
                                  }
                             }
                        }
                        
                      }//如果是在if块里声明的方法


                      if(funcBody[j].type&&funcBody[j].type=='VariableDeclaration'){
                        if(funcBody[j].declarations[0].id.name==specialString){
                            return{
                                'type':'continue',
                                'i':i
                            };
                        }//用var申明了该方法,则默认该层可以调用,写在了前面就管不了了.
                      }//加上对var左边申明的检测
    }
    return{
      'type':'continueOne',
      'i':i
    };
  };//检测if块是否有申明

  refuseuse.refuseFunction=function(path,task){
      try{
      var code=fs.readFileSync(path,"utf-8");
        if(task instanceof Array){
          for(var i=0;i<task.length;i++){
            if(task[i].type=="Function"){
              _check(code,task[i].value);
            }
          }
        }else{
          if(task.type=="Function"){
              _check(code,task.value);
            }
        }
      }catch(err){
        console.log(err);
        throw err;
        //return ;
      }
  };
  refuseuse.refuseFunctionByNode=function(code,task){
      try{
        if(task instanceof Array){
          for(var i=0;i<task.length;i++){
            if(task[i].type=="Function"){
              _check(code,task[i].value);
            }
          }
        }else{
          if(task.type=="Function"){
              _check(code,task.value);
            }
        }
      }catch(err){
        console.log(err);
        throw err;
      }
  };



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