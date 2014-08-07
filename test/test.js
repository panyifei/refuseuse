var assert=require("assert");
var refuseuse=require('../refuseuse.js');

describe('refuseuse',function(){
  it("global",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/global.js",[{type:'Function',value:'_use'}])});
  });
  it("globalOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/globalOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("interFunc",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/interFunc.js",[{type:'Function',value:'_use'}])});
  });
  it("interFuncInterOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/interFuncInterOwn.js",[{type:'Function',value:'_use'}])});
  });  
  it("interFuncGlobalOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/interFuncGlobalOwn.js",[{type:'Function',value:'_use'}])});
  });
});



describe('refuseuse',function(){
  it("globalVarOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/globalVarOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("globalVarInterOwn",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/globalVarInterOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("interVarInterOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/interVarInterOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("interVarGlobalOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/interVarGlobalOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("intererVarInterOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/intererVarInterOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("interVarIntererOwn",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/interVarIntererOwn.js",[{type:'Function',value:'_use'}])});
  });
});





describe('refuseuse',function(){

  it("interPara",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/interPara.js",[{type:'Function',value:'_use'}])});
  });
  it("interParaIntererOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/interParaIntererOwn.js",[{type:'Function',value:'_use'}])});
  });
});



//if (true) {};
describe('refuseuse',function(){
  it("if",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/if.js",[{type:'Function',value:'_use'}])});
  });
  it("ifelse",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/ifelse.js",[{type:'Function',value:'_use'}])});
  });
  it("ifelseFinal",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/ifelseFinal.js",[{type:'Function',value:'_use'}])});
  });
  it("ifelseifFinal",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/ifelseifFinal.js",[{type:'Function',value:'_use'}])});
  });
  it("ifelseFuncIfelseOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/ifelseFuncIfelseOwn.js",[{type:'Function',value:'_use'}])});
  });//多层的ifelse
  it("ifIf",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/ifIf.js",[{type:'Function',value:'_use'}])});
  });
  it("ifFuncIfOwn ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/ifFuncIfOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("ifVarIfOwn ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/ifVarIfOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("ifFuncForOwn ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/ifFuncForOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("iferFuncForOwn ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/iferFuncForOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("globalFuncIfOwn  ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/globalFuncIfOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("interFuncIfOwn  ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/interFuncIfOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("if语句里面的if语句else里面调用",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/ifIfElse.js",[{type:'Function',value:'_use'}])});
  });
  it("if里面的if-else里的申明",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/ifTest1.js",[{type:'Function',value:'_use'}])});
  });
  it("else的if里面的申明",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/ifTest2.js",[{type:'Function',value:'_use'}])});
  });
});


//for (var i = Things.length - 1; i >= 0; i--) {
describe('refuseuse',function(){
  it("for",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/for.js",[{type:'Function',value:'_use'}])});
  });
  it("forFor",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/forFor.js",[{type:'Function',value:'_use'}])});
  });
  it("forFuncForOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/forFuncForOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("forFuncIfOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/forFuncIfOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("forerFuncIfOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/forerFuncIfOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("forVarForOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/forVarForOwn.js",[{type:'Function',value:'_use'}])});
  });
});


//dowhile
describe('refuseuse',function(){
  it("dowhile",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/dowhile.js",[{type:'Function',value:'_use'}])});
  });
  it("dowhileDowhile",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/dowhileDowhile.js",[{type:'Function',value:'_use'}])});
  });
});

//while
describe('refuseuse',function(){
  it("while",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/while.js",[{type:'Function',value:'_use'}])});
  });
  it("whileWhile",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/whileWhile.js",[{type:'Function',value:'_use'}])});
  });
});

//forIn
describe('refuseuse',function(){
  it("forin",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/forin.js",[{type:'Function',value:'_use'}])});
  });
  it("forinForin",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/forinForin.js",[{type:'Function',value:'_use'}])});
  });
});



describe('refuseuse',function(){
  it("try",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/try.js",[{type:'Function',value:'_use'}])});
  });
 it("tryTry",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/tryTry.js",[{type:'Function',value:'_use'}])});
  });
});

// describe('refuseuse',function(){
//   it("rrr",function(){
//     assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/rrr.js",[{type:'Function',value:'_use'}])});
//   });
// });
