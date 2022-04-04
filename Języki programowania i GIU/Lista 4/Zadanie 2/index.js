var http = require('http');
var fs = require('fs');
var socket = require('socket.io');
var html = fs.readFileSync("index.html");

var rozmowa=["Witaj"];

function objToString (obj){
    let str = '';
    for (const [p, val] of Object.entries(obj)) {
        str += `${p},${val},`;
    }
    return str;
}

//create a server object
var server=http.createServer(function (req, res) { // function to handle request
  res.write(html)
  res.end(); //end the response
}) 

var io = socket(server);
var clients = {};
var id = 0;

io.on('connection', function(socket) {
  socket.id = ++id; // Nadanie ID
  socket.on("nick", function (nick){
     socket.nick = nick;
     clients[id] = nick; // W obiekcie clients zapisywany jest nick klienta
     //io.emit("user list", JSON.stringify(clients)); // JSON - wyslanie do klientow listy klientow
     io.emit("user list", objToString(clients)); // HTML - wyslanie do klientow listy klientow
  });

  socket.on("disconnect", function (){ // Rozlaczenie z serwerem
    delete clients[socket.id]; // Usuniecie nicku klienta z obiektu clients
    //io.emit("user list", JSON.stringify(clients)) // JSON - Rozeslanie zaktualizowanej listy klientow
    io.emit("user list", objToString(clients)); // HTML - Rozeslanie zaktualizowanej listy klientow
  });

  // wysyłamy dotychczasowy przebieg rozmowy
  for(let msg of rozmowa)  
     socket.emit('chat message',msg); 

  // ustawiamy sposób reakcji na otrzymywane wiadomości
  socket.on('chat message', function(msg) {
      rozmowa.push(msg)
      io.emit('chat message', msg); // do wszystkich
  })
  
  socket.on('reset', function(msg) {
      rozmowa=[msg]
      io.emit('reset', msg); // do wszystkich
  })

});
server.listen(8081);
