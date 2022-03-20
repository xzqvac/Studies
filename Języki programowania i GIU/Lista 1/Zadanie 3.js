// Funkcja zwracaja sume wszystkich argumentów będących liczbami
function asuma(...args){
  var sum = 0;
  for(let x in args){
    if(typeof args[x] != "number")
      continue;
    sum += args[x];
  }
  return sum;
}

console.log(asuma(1,2,3,10,[],20,30,"marek",{a:4}));

// Funkcja zwracaja sume wszystkich argumentów będących liczbami uwzględniając
// liczby w elementach Array
function bsuma(...args){
  args = args.flat();
  var sum = 0;
  for(let x in args){
    if(typeof args[x] != "number")
      continue;
    sum += args[x];
  }
  return sum;
}
console.log(bsuma(1,2,3,[4,5,"aa"],10,"asda"));

// Funkcja zwracaja sume wszystkich argumentów będących liczbami uwzględniając
// liczby w dowolnie zagniezdzonych elementach Array
function csuma(...args){
  args = args.flat(Infinity);
  var sum = 0;
  for(let x in args){
    if(typeof args[x] != "number")
      continue;
    sum += args[x];
  }
  return sum;
}

console.log(csuma(1,2,3,[4,5,[5,5]],10));

