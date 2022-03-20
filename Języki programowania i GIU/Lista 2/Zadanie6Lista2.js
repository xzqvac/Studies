function Arytmetyczny(dane){
  let keys = [];
  let values = [];
  this.a = null;
  this.r = null;


  for(let [key, value] of Object.entries(dane)) {
    keys.push(key);
    values.push(value);
  }

  if(keys[0][0] === "a" && keys[1][0] === "r"){
   this.r = Number(values[1]);
   this.a = values[0] - ((Number(keys[0].substring(1,keys[0].length))) - 1) * this.r;
 }
  else if(keys[0][0] === "r" && keys[1][0] === "a"){
    this.r = Number(values[0]);
    this.a = values[1] - ((Number(keys[1].substring(1,keys[1].length))) - 1) * this.r;
  }
  else if(keys[0][0] === "a" && keys[1][0] === "a"){
    this.r = (values[1] - values[0]) / ((-Number(keys[0].substring(1,keys[0].length))) + Number(keys[1].substring(1, keys[1].length)));
    this.a = (values[0] + values [1] - this.r * ((Number(keys[0].substring(1,keys[0].length))) + (Number(keys[1].substring(1,keys[1].length)))-2)) / 2;
  }
  else if(keys[0][0] === "s" && keys[1][0] === "r"){
    this.r = values[1];
    this.a = (2 * values[0] - this.r * (Number(keys[0].substring(4,keys[0].length))) * ((Number(keys[0].substring(4,keys[0].length))) - 1)) / (2 * (Number(keys[0].substring(4,keys[0].length))));
  }

  else if(keys[0][0] === "r" && keys[1][0] === "s"){
    this.r = values[0];
    this.a = (2 * values[1] - this.r * (Number(keys[1].substring(4,keys[1].length))) * ((Number(keys[1].substring(4,keys[1].length))) - 1)) / (2 * (Number(keys[1].substring(4,keys[1].length))));
  }

  else if(keys[0][0] === "s" && keys[1][0] === "a"){
    this.r = 2 * (values[0] - values[1] * (Number(keys[0].substring(4,keys[0].length)))) / (Number(keys[0].substring(4,keys[0].length)) * (Number(keys[0].substring(4,keys[0].length)) - 2 * Number(keys[1].substring(1,keys[1].length)) +1));
    this.a = values[1] - ( (Number(keys[1].substring(1,keys[1].length))) - 1) * this.r;
  }

  else if(keys[0][0] === "a" && keys[1][0] === "s"){
    this.r = 2 * (values[1] - values[0] * (Number(keys[1].substring(4,keys[1].length)))) / (Number(keys[1].substring(4,keys[1].length)) * (Number(keys[1].substring(4,keys[1].length)) - 2 * Number(keys[0].substring(1,keys[0].length)) +1));
    this.a = values[0] - ( (Number(keys[0].substring(1,keys[0].length))) - 1) * this.r;
  }

  else if(keys[0][0] === "s" && keys[1][0] === "s"){
    this.r = (2 * (values[1] * (Number(keys[0].substring(4,keys[0].length))) - values[0] * (Number(keys[1].substring(4,keys[1].length))))) / (((Number(keys[1].substring(4,keys[1].length))) * (Number(keys[0].substring(4,keys[0].length)))) * ((Number(keys[1].substring(4,keys[1].length))) - (Number(keys[0].substring(4,keys[0].length)))))
    this.a = (2 * values[0] - this.r * (Number(keys[0].substring(4,keys[0].length))) * ((Number(keys[0].substring(4,keys[0].length))) - 1)) / (2 * (Number(keys[0].substring(4,keys[0].length))));
    console.log(this.a);
  }


  this.showA = function (i){
    return this.a * (i - 1) * this.r;
  }

  this.showSuma = function (i){
    console.log(this.a, this.r);
   return ((2 * this.a + (i -1) * this.r)/2)*i;
  }

  this.showR = function (){
    return this.r;
  }
}

Arytmetyczny.prototype[Symbol.iterator]=function*(){
  for(let i=1;i<10; i++){
    yield this.a + (i-1) * this.r;
  }
}

let z1 = new Arytmetyczny({suma3:12,suma6:42})

for(let x of z1)
  console.log(x);


//console.log(z1.showA(1));
//console.log(z1.showSuma(1));
//onsole.log(z1.showR(1));
