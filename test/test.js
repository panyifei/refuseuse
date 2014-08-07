var assert=require("assert");
var refuseuse=require('../refuseuse.js');

describe('refuseuse',function(){
  it("global",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/global.js",[{type:'Function',value:'_use'}])});
  });
  it("globalOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/globalOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("interFunc",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/interFunc.js",[{type:'Function',value:'_use'}])});
  });
  it("interFuncInterOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/interFuncInterOwn.js",[{type:'Function',value:'_use'}])});
  });  
  it("interFuncGlobalOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/interFuncGlobalOwn.js",[{type:'Function',value:'_use'}])});
  });
});



describe('refuseuse',function(){
  it("globalVarOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/globalVarOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("globalVarInterOwn",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/globalVarInterOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("interVarInterOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/interVarInterOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("interVarGlobalOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/interVarGlobalOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("intererVarInterOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/intererVarInterOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("interVarIntererOwn",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/interVarIntererOwn.js",[{type:'Function',value:'_use'}])});
  });
});





describe('refuseuse',function(){

  it("interPara",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/interPara.js",[{type:'Function',value:'_use'}])});
  });
  it("interParaIntererOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/interParaIntererOwn.js",[{type:'Function',value:'_use'}])});
  });
});



//if (true) {};
describe('refuseuse',function(){
  it("if",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/if.js",[{type:'Function',value:'_use'}])});
  });
  it("ifelse",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/ifelse.js",[{type:'Function',value:'_use'}])});
  });
  it("ifelseFinal",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/ifelseFinal.js",[{type:'Function',value:'_use'}])});
  });
  it("ifelseifFinal",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/ifelseifFinal.js",[{type:'Function',value:'_use'}])});
  });
  it("ifelseFuncIfelseOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/ifelseFuncIfelseOwn.js",[{type:'Function',value:'_use'}])});
  });//多层的ifelse
  it("ifIf",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/ifIf.js",[{type:'Function',value:'_use'}])});
  });
  it("ifFuncIfOwn ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/ifFuncIfOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("ifVarIfOwn ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/ifVarIfOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("ifFuncForOwn ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/ifFuncForOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("iferFuncForOwn ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/iferFuncForOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("globalFuncIfOwn  ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/globalFuncIfOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("interFuncIfOwn  ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/interFuncIfOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("if语句里面的if语句else里面调用",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/ifIfElse.js",[{type:'Function',value:'_use'}])});
  });
  it("if里面的if-else里的申明",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/ifTest1.js",[{type:'Function',value:'_use'}])});
  });
  it("else的if里面的申明",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/ifTest2.js",[{type:'Function',value:'_use'}])});
  });
});


//for (var i = Things.length - 1; i >= 0; i--) {
describe('refuseuse',function(){
  it("for",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/for.js",[{type:'Function',value:'_use'}])});
  });
  it("forFor",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/forFor.js",[{type:'Function',value:'_use'}])});
  });
  it("forFuncForOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/forFuncForOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("forFuncIfOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/forFuncIfOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("forerFuncIfOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/forerFuncIfOwn.js",[{type:'Function',value:'_use'}])});
  });
  it("forVarForOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/forVarForOwn.js",[{type:'Function',value:'_use'}])});
  });
});


//dowhile
describe('refuseuse',function(){
  it("dowhile",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/dowhile.js",[{type:'Function',value:'_use'}])});
  });
  it("dowhileDowhile",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/dowhileDowhile.js",[{type:'Function',value:'_use'}])});
  });
});

//while
describe('refuseuse',function(){
  it("while",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/while.js",[{type:'Function',value:'_use'}])});
  });
  it("whileWhile",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/whileWhile.js",[{type:'Function',value:'_use'}])});
  });
});

//forIn
describe('refuseuse',function(){
  it("forin",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/forin.js",[{type:'Function',value:'_use'}])});
  });
  it("forinForin",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/forinForin.js",[{type:'Function',value:'_use'}])});
  });
});



describe('refuseuse',function(){
  it("try",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/try.js",[{type:'Function',value:'_use'}])});
  });
 it("tryTry",function(){
    assert.throws(function(){refuseuse.refuseFunction("./test/fixtures/tryTry.js",[{type:'Function',value:'_use'}])});
  });
});

// describe('refuseuse',function(){
//   it("rrr",function(){
//     assert.doesNotThrow(function(){refuseuse.refuseFunction("./test/fixtures/rrr.js",[{type:'Function',value:'_use'}])});
//   });
// });
