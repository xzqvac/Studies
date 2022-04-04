const http = require('http');
const fs = require('fs');

const html = fs.readFileSync("index.html");
const html1 = fs.readFileSync("Strona1.html");
const html2 = fs.readFileSync("Strona2.html");
const html3 = fs.readFileSync("Strona3.html");
const picture1 = fs.readFileSync("hamster.png");
const pdf1 = fs.readFileSync('Ciag.pdf');

http.createServer(function (req, res) { // function to handle request
  if (req.url === "/index.html"){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(html);
    res.end();
  }
  else if(req.url === "/Strona1.html"){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(html1);
    res.end();
  }
  else if(req.url === "/Strona2.html"){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(html2);
    res.end();
  }
  else if(req.url === "/Strona3.html"){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(html3);
    res.end();
  }
  else if(req.url === "/hamster.png"){
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.write(picture1, 'binary');
    res.end();
  }
  else if(req.url === "/Ciag.pdf"){
    res.writeHead(200, {'Content-Type': 'application/pdf'});
    res.write(pdf1);
    res.end();
  }
  else if(req.url === "/panda.png"){
    res.writeHead(200, {'Content-Type': 'image/png' });
    fs.readFile("panda.png", function(err, data){
      if (err) throw err;
      res.write(data);
      return res.end();
    });
  }
  else if(req.url === "/Lublin1880.pdf"){
    res.writeHead(200, {'Content-Type': 'application/pdf' });
    fs.readFile("Lublin1880.pdf", function(err, data){
      if (err) throw err;
      res.write(data);
      return res.end();
    });
  }
  else{
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write("404.That's an error")
  }
}).listen(8080);


