function BST(key, left=null, right=null){
  this.key = key;
  this.left = left;
  this.right = right;
}
BST.prototype[Symbol.iterator] = function* () {
    if(this.left){
        yield* this.left;
    }
    yield this.key;
    if(this.right) {
      yield* this.right;
    }
}

let tree = new BST(8, new BST(3, new BST(1, new BST(0, null, null), null),new BST(6, null, new BST(7, null, null))),new BST(10, new BST(9, null, null), new BST(14, null, null)))

for(let x of tree){
  console.log(x);
}
