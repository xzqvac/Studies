// Funkcja zwracaja generator dzielnikow liczby n
function* dzielniki(n) {
  for(let i = 1; i <= n; i++){
    if(n % i === 0){
      yield i;
    }
  }
}

// Funkcja zwracaja generator liczb pierwszych nie wiekszych od n
function* pierwsze(n) {
  var pierwsza;
  var i, x;
  for(i = 2; i <= n; i++) {
    pierwsza = true;
    for(x = 2; x <= Math.floor(i / 2); x++) {
      if (i % x === 0) {
        pierwsza = false;
      }
    }
    if(pierwsza){
      yield i;
    }
  }
}

// Funkcja zwracaja generator czynnikow pierwych liczby n
function* rozklad(n){
  var pierwsza = 2;
  while(n > 1){
    while(n % pierwsza === 0){
      yield pierwsza;
      n = n / pierwsza;
    }
    pierwsza++;
  }
}

function wypisz(gen){
  for (let x of gen)
    console.log(x);
}

function wypisz2(gen){
  let x;
  while (!(x = gen.next()).done) {
    console.log(x.value);
  }
}

function sklej(gen, glue=','){
  var array = [];
  for(let x of gen){
    array.push(x);
  }
  console.log(array.join(glue));
}

function suma(gen){
  var suma = 0;
  for (let x of gen){
    suma += x;
  }
  console.log(suma);
}

function iloczyn(gen){
  var wynik = 1;
  for (let x of gen){
    wynik *= x;
  }
  console.log(wynik);
}

console.log(Array.from(pierwsze(10)))
wypisz(dzielniki(100));
wypisz2(dzielniki(100));
sklej(dzielniki(100));
iloczyn(dzielniki(100));
suma(dzielniki(100));

wypisz(rozklad(15));
wypisz2(rozklad(15));
sklej(rozklad(15));
iloczyn(rozklad(15));
suma(rozklad(15));
