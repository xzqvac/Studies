// Funkcja sortujaca malejaco
function fa(a, b){
  if(a < b)
    return 1;
  if(a > b)
    return -1;
  else
    return 0;
}

// Funkcja sortujaca wzgledem cyfry jednosci
function fb(a, b){
  a %= 10;
  b %= 10;
  if(a < b)
    return -1;
  if(a > b)
    return 1;
  else
    return 0;
}

// Funkcja sortujaca wzgledem cyfry dziesiatek
function fc(a, b){
  a = a % 100;
  b = b % 100;
  if(a < b){
    return -1;
  }
  if(a > b){
    return 1;
  }
  else{
    return 0;
  }
}

// Funkcja sortujaca wzgledem sumy cyfr
function fd(a, b){
  a = a.toString();
  b = b.toString();
  let sumA = 0;
  let sumB = 0;
  for(let i = 0; i < a.length; i++){
    sumA += parseInt(a[i]);
  }
  for(let i = 0; i < b.length; i++){
    sumB += parseInt(b[i]);
  }
  if(sumA < sumB)
    return -1;
  if(sumA > sumB)
    return 1;
  else
    return 0;
}


/*
console.log([1,2,3,271,12313,123,21313,541,42].sort(fa))
console.log([0,-1,2,4,1,13,21,54,42].sort(fa))
console.log([-5,10,7,1,130,74, 0, 0].sort(fa))
*/

/*
console.log([1,2,3,271,12313,123,21313,541,42].sort(fb))
console.log([0,-1,2,4,1,13,21,54,42].sort(fb))
console.log([-5,10,7,1,130,74, 0, 0].sort(fb))
*/

/*
console.log([1,2,3,271,12313,123,21313,541,42].sort(fc))
console.log([0,-1,2,4,1,13,21,54,42].sort(fc))
console.log([-5,10,7,1,130,74, 0, 0].sort(fc))
*/

/*
console.log([1,2,3,271,12313,123,21313,541,42].sort(fd))
console.log([0,-1,2,4,1,13,21,54,42].sort(fd))
console.log([-5,10,7,1,130,74, 0, 0].sort(fd))
*/
