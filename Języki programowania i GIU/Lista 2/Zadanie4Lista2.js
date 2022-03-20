Array.prototype.wspak = function*() {
  for(let i = this.length; i > 0; i--){
    yield this[i-1];
  }
}

for(let x of [2, 3, 4, 5].wspak()) console.log(x)
