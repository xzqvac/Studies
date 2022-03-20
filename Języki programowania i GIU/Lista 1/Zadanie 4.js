// Klasa kwadrat
class Kwadrat {
  constructor(a) { this.a = a; }
  get bok() { return this.a; }
  set bok(a) { this.a = a; }
  get obwod() { return 4 * this.a; }
  set obwod(len) { this.a = len / 4; }
  get pole() { return this.a * this.a; }
  set pole(P) { this.a = Math.sqrt(P); }
  toString() {return `a=${this.bok}\nL=${this.obwod}\nP=${this.pole}\n`;}
}

// Klasa kolo
class Kolo {
  constructor(r) {this.r = r;}
  get promien() {return this.r;}
  set promien(r) {this.r = r;}

  get srednica() {return 2 * this.r}
  set srednica(R) {this.r = R / 2}

  get obwod() {return 2 * Math.PI * this.r}
  set obwod(l) {this.r = l / (2 * Math.PI)}

  get pole() {return Math.PI * this.r * this.r}
  set pole(P) {this.r = Math.sqrt(P / Math.PI)}

  toString() {return `r = ${this.promien}\nR = ${this.srednica}\nl = ${this.obwod}\nP = ${this.pole}\n`;}

}

// Funkcja demonstrująca dzialanie gets oraz sets
function setsAndGests(){
  var k = new Kolo(3)
  k.promien = 8;console.log(k+"");
  k.srednica = 10; console.log(k+"");
  k.obwod = 7; console.log(k+"");
  k.pole = 201.5; console.log(k+"");
}

setsAndGests()

let a = new Kolo(3)
let b = new Kolo(4)
let c = new Kolo(5)

let d = new Kwadrat(3)
let e = new Kwadrat(4)
let f = new Kwadrat(5)

// Tablica zawierajaca kola i kwadraty
let tablica = [a, b, c, d, e, f]
let pole = 0;
let obwod = 0;
for (let i = 0; i < tablica.length; i++){
  pole += parseFloat(`${tablica[i].pole}`);
  obwod += parseFloat(`${tablica[i].obwod}`)
}
console.log("Suma pol:", pole);
console.log("Suma obwodow:", obwod);
