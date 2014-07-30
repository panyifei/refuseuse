(function(){
  var esprima=require("esprima");
  var escope=require("escope");
  var async=require("async");
  var fs=require("fs");

  var refuseuse={};

  var code;
  var hasWrong=false;
  
  var _readFile=function(path,callback){
    fs.readFile(path,"utf-8",function(err,data){
      if(err){ throw  err;}
         code=data;
         callback();
    });
  };
  
  var _check=function(specialString){
              var ast=esprima.parse(code,{range:true,loc:true});
              var scopes=escope.analyze(ast).scopes;
              for (var i = 0; i <scopes.length; i++) {
                  var finish=false;
                  var continueCycle=false;
                  var scopeBlock=scopes[i]['block']//最外层的bolck
                  var scopeBlockBody=scopeBlock['body'];//block里面那层的body
                  if(i!=0){scopeBlockBody=scopeBlockBody['body'];}//global层只被body包了一次，其他的都是2次

                  for (var x = 0; x <scopeBlockBody.length; x++) {

                      if(scopeBlockBody[x]['type']=='FunctionDeclaration'){
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

                  };//检查scope里面的方法申明

                  if(finish){
                    break;
                  }//代表全局申明了
                  if(continueCycle){
                    continue;
                  }//代表非全局申明
                  //运行到这里代表自己以及父辈都没有申明

                  for (var x = 0; x <scopeBlockBody.length; x++) {

                      if(scopeBlockBody[x]['type']=='ExpressionStatement'){
                        if(scopeBlockBody[x]['expression']['type']=='CallExpression'){
                            if(scopeBlockBody[x]['expression']['callee']['name']==specialString){
                                hasWrong=true;
                                console.log("sorry,you can't use:   "+specialString);
                                //throw new Error("sorry,you can't use:   "+specialString);
                            }//调用了特定方法了
                        }
                      }//假设现在只是直接调用的语句

                      if(scopeBlockBody[x]['type']=='VariableDeclaration'){
                        if(scopeBlockBody[x]['declarations'][0]['init']['type']=='CallExpression'){
                            if(scopeBlockBody[x]['declarations'][0]['init']['callee']['name']==specialString){
                                hasWrong=true;
                                console.log("sorry,you can't use:   "+specialString);
                                //throw new Error("sorry,you can't use:   "+specialString);
                            }//调用了特定方法了
                        }
                      }//加上对var右边调用的检测

                   };//检查scope里面的方法使用

              };//用来循环scope的
  }


  refuseuse.refuseFunction=function(path,specialString,callback){
      callback = callback || function () {};
      async.series([
         function(done){
               //读取文件
               _readFile(path,done);
         },
         function(done){
               //检查代码
               _check(specialString);
               done();
         }//控制代码执行
        ],function(err,results){
             if(err) throw err;
             if(!hasWrong) console.log('success');
      });
      callback();
  };//传路径的话的异步方法

  refuseuse.refuseFunctionSync=function(path,specialString){
        //同步读取以及检测
        code= fs.readFileSync(path,"utf-8");
        _check(specialString);
        if(!hasWrong) console.log('success');
  };//传路径的话的同步方法

  refuseuse.refuseFunctionString=function(string,specialString){
        code= string ;
        _check(specialString);
        if(!hasWrong) console.log('success');
  };//传string的话的同步方法

  refuseuse.refuseFunctionStringSync=function(string,specialString,callback){
        code= string ;
        _check(specialString);
        callback();
        if(!hasWrong) console.log('success');
  };//传string的话的同步方法


  if (typeof module !== 'undefined' && module.exports) {
        module.exports = refuseuse;
  }
 
}());
