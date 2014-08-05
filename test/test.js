var assert=require("assert");
var refuseuse=require('../refuseuse.js');

describe('refuseuse',function(){
  it("global",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/global.js","_use")});
  });
  it("globalOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/globalOwn.js","_use")});
  });
  it("interFunc",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/interFunc.js","_use")});
  });
  it("interFuncInterOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/interFuncInterOwn.js","_use")});
  });  
  it("interFuncGlobalOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/interFuncGlobalOwn.js","_use")});
  });
});



describe('refuseuse',function(){
  it("globalVarOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/globalVarOwn.js","_use")});
  });
  it("globalVarInterOwn",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/globalVarInterOwn.js","_use")});
  });
  it("interVarInterOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/interVarInterOwn.js","_use")});
  });
  it("interVarGlobalOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/interVarGlobalOwn.js","_use")});
  });
  it("intererVarInterOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/intererVarInterOwn.js","_use")});
  });
  it("interVarIntererOwn",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/interVarIntererOwn.js","_use")});
  });
});





describe('refuseuse',function(){

  it("interPara",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/interPara.js","_use")});
  });
  it("interParaIntererOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/interParaIntererOwn.js","_use")});
  });
});



//if (true) {};

describe('refuseuse',function(){
  it("if",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/if.js","_use")});
  });
  it("ifIf",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/ifIf.js","_use")});
  });
  it("ifFuncIfOwn ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/ifFuncIfOwn.js","_use")});
  });
  it("ifVarIfOwn ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/ifVarIfOwn.js","_use")});
  });
  it("ifFuncForOwn ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/ifFuncForOwn.js","_use")});
  });
  it("iferFuncForOwn ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/iferFuncForOwn.js","_use")});
  });
  it("globalFuncIfOwn  ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/globalFuncIfOwn.js","_use")});
  });
  it("interFuncIfOwn  ",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/interFuncIfOwn.js","_use")});
  });
});


//for (var i = Things.length - 1; i >= 0; i--) {
describe('refuseuse',function(){
  it("for",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/for.js","_use")});
  });
  it("forFor",function(){
    assert.throws(function(){refuseuse.refuseFunction("./fixtures/forFor.js","_use")});
  });
  it("forFuncForOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/forFuncForOwn.js","_use")});
  });
  it("forFuncIfOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/forFuncIfOwn.js","_use")});
  });
  it("forerFuncIfOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/forerFuncIfOwn.js","_use")});
  });
  it("forVarForOwn",function(){
    assert.doesNotThrow(function(){refuseuse.refuseFunction("./fixtures/forVarForOwn.js","_use")});
  });
});


