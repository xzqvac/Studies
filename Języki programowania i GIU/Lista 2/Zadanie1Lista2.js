function* Fibonacci(){
  var a = 0;
  var b = 1;
  while(true){
   yield BigInt(b);
   b += a;
   a = b - a;
  }
}
/*
const gen = Fibonacci();
for(var i = 0; i < 200; i++){
  console.log(i + " : " + gen.next().value);
}
*/
//setInterval(function() {console.log(gen.next().value)}, 500);
// Zadanie 2
function Fibo() {
  this.a = 0;
  this.b = 1;
}

Fibo.prototype.next = function (){
  let wynik = this.b;
  this.a = this.b - this.a;
  this.b = this.b + this.a;
  return {value: wynik}

}

let z2 = new Fibo();
for(let i = 0; i < 200; i++) {
  console.log(z2.next(i).value);
}
//setInterval(function() {console.log(z2.next().next().value)}, 500);

/*let z1 = Fibonacci();
setInterval(function() {console.log(z1.next().value)}, 500);*/


