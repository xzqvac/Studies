function* Fibonacci(){
  var a = 0;
  var b = 1;
  while(true){
    yield b;
    b += a;
    a = b - a;
  }
}

function* fragment(iter, skip, limit = 1){
  for(let x of iter){
    if(skip){
      --skip;
    }
    else if(!skip && limit){
      --limit;
      yield x;
    }
    else
      return;
  }
}
for(let x of fragment(Fibonacci(), 100, 3)) console.log(x);

