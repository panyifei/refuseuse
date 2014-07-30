(function(){
  var esprima=require("esprima");
  var fs=require("fs");

  var refuseuse={};
  //console.log(syntaxTree);
  
  refuseuse.findGlobalFunction=function(path,specialString){
    var code= fs.readFileSync(path,"utf-8");
    var syntaxTree=JSON.stringify(esprima.parse(code),null,4);
    syntaxTree=JSON.parse(syntaxTree);

    var globalBodyT=syntaxTree['body'];//全局body树
    //console.log(globalBodyT);
    globalBodyT.forEach(function (child, index) {
      if(child['type']=='FunctionDeclaration'){
        if(child['id']['name'].indexOf(specialString) == 0){
         // console.log(child);//输出方法相关信息
          throw new Error("can not use the keyWord:    "+specialString);
        }
      }
    });
    console.log("success");//运行到这里代表没有报错
  };

  if (typeof module !== 'undefined' && module.exports) {
        module.exports = refuseuse;
  }
 
 }());
  