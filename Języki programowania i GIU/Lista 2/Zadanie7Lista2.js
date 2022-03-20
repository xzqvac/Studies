class arytemtyczny{
  constructor (dane) {
    let keys = [];
    let values = [];
    this.a = null; // Wyraz a1
    this.r = null; // Różnica

    for (let [key, value] of Object.entries(dane)) {
      keys.push(key);
      values.push(value);
    }
    if (keys[0][0] === "a" && keys[1][0] === "r") {
      this.r = parseInt(values[1]);
      this.a = values[0] - ((parseInt(keys[0].substring(1, keys[0].length))) - 1) * this.r;
    } else if (keys[0][0] === "a" && keys[1][0] === "a") {
      this.r = (values[1] - values[0]) / ((-parseInt(keys[0].substring(1, keys[0].length))) + parseInt(keys[1].substring(1, keys[1].length)));
      this.a = (values[0] + values [1] - this.r * ((parseInt(keys[0].substring(1, keys[0].length))) + (parseInt(keys[1].substring(1, keys[1].length))) - 2)) / 2;
    } else if (keys[0][0] === "s" && keys[1][0] === "r") {
      this.r = values[1];
      this.a = (2 * values[0] - this.r * (parseInt(keys[0].substring(4, keys[0].length))) * ((parseInt(keys[0].substring(4, keys[0].length))) - 1)) / (2 * (parseInt(keys[0].substring(4, keys[0].length))));
    } else if (keys[0][0] === "r" && keys[1][0] === "s") {
      this.r = values[0];
      this.a = (2 * values[1] - this.r * (parseInt(keys[1].substring(4, keys[1].length))) * ((parseInt(keys[1].substring(4, keys[1].length))) - 1)) / (2 * (parseInt(keys[1].substring(4, keys[1].length))));
    } else if (keys[0][0] === "s" && keys[1][0] === "a") {
      this.r = 2 * (values[0] - values[1] * (parseInt(keys[0].substring(4, keys[0].length)))) / (parseInt(keys[0].substring(4, keys[0].length)) * (parseInt(keys[0].substring(4, keys[0].length)) - 2 * parseInt(keys[1].substring(1, keys[1].length)) + 1));
      this.a = values[1] - ((parseInt(keys[1].substring(1, keys[1].length))) - 1) * this.r;
    } else if (keys[0][0] === "a" && keys[1][0] === "s") {
      this.r = 2 * (values[1] - values[0] * (parseInt(keys[1].substring(4, keys[1].length)))) / (parseInt(keys[1].substring(4, keys[1].length)) * (parseInt(keys[1].substring(4, keys[1].length)) - 2 * parseInt(keys[0].substring(1, keys[0].length)) + 1));
      this.a = values[0] - ((parseInt(keys[0].substring(1, keys[0].length))) - 1) * this.r;
    } else if (keys[0][0] === "s" && keys[1][0] === "s") {
      this.r = (2 * (values[1] * (parseInt(keys[0].substring(4, keys[0].length))) - values[0] * (parseInt(keys[1].substring(4, keys[1].length))))) / (((parseInt(keys[1].substring(4, keys[1].length))) * (parseInt(keys[0].substring(4, keys[0].length)))) * ((parseInt(keys[1].substring(4, keys[1].length))) - (parseInt(keys[0].substring(4, keys[0].length)))))
      this.a = (2 * values[0] - this.r * (parseInt(keys[0].substring(4, keys[0].length))) * ((parseInt(keys[0].substring(4, keys[0].length))) - 1)) / (2 * (parseInt(keys[0].substring(4, keys[0].length))));
      console.log(this.a);
    }
  }

  showA(i,x) {
    if(x === undefined)
      return this.a + (i - 1) * this.r;
    else
      this.a = x - (i - 1) * this.r; // Poprawione
  }

  showSuma(i, x) {
    if(x === undefined)
      return (2 * this.a + (i - 1) * this.r) * (i / 2);
    else
      this.a = (2 * x - (i * this.r * (i -1)) ) / (2 * i); // Poprawione
  }

  showR(x) {
    if(x === undefined)
      return this.r;
    else
      this.r = x;
  }


  *[Symbol.iterator]() {
    for(let i=1;i<10;i++){
      yield this.a + (i-1) * this.r;
    }
  }
}

let z2 = new arytemtyczny({a7:9,r:2}); console.log(z2);
z2.showA(1,10); console.log(z2.showA(1))
console.log(z2);

console.log(z2.showSuma(3));
z2.showSuma(3, -3);
console.log(z2.a);

console.log(z2.showR());
z2.showR(11);
console.log(z2);


for (let i of z2)
  console.log(i);

