// Funkcja bigger zwraca lambde(funkcje strzalkowa) sprawdzajaca czy argument x jest wiekszy od a
function bigger(a){
  return (x) => {return x > a}
}
// Metoda filter() tworzy nową tablice z elementami, ktore przechodza test okreslony w postaci funkcji. Metoda
// przyjmuje true - zachowanie elementu lub false - odrzucenie elementu
console.log([2, 31, 5, 3, 6].filter(bigger(3)));

// Metoda find() zwraca pierwszy element tablicy, ktory spelnia warunek podanej funkcji
console.log([2, 31, 5, 3, 6].find(bigger(30)));

// Metoda findIndex() zwraca indeks pierwszego element tablicy, ktory spelnia warunek podanej funkcji.
// W przeciwnym wypadku zwraca -1

console.log([2, 31, 5, 3, 6].findIndex(bigger(0)));

// Metoda every() sprawdza czy wszystkie elementy tablicy przechodza test realizowany przez funkcje
// Metoda ta sprawdza do pierwszej zwroconej wartosci false. W przeciwnym wypadku true

console.log([2, 31, 5, 3, 6].every((bigger(1))));

// Funckja smaller zwraca lambde sprawdzajaca czy argument x jest mniejszy od a
function smaller(a){
  return (x) => {return x < a}
}
console.log([2, 31, 5, 3, 6].filter(smaller(4)));

// Funckja between zwraca lambde sprawdzajaca czy argument znajduje sie w zakreseie <a, b>
function between(a, b){
  return (x) => {return (a <= x && x <= b)}
}

console.log([2, 31, 5, 3, 6].filter(between(0, 5)));
