function a(){
  function b(){
    _use(abc);
  }
}


function c(){
  function _use(){}
  _use('abc')
}
funtion _use(){
  
}

//如果自己申明了_use的话,使用是无害的