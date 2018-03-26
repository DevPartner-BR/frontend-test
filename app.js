var http = require('http');
var app = require('./config/express')
  require('./config/database')('mongodb://localhost/galeria')
var port = 7007;

http.createServer(app).listen(port, function () {
  console.log("Servidor iniciado!");
  console.log("Servidor ouvindo na porta: " + port);
});

/*
var app         = require('connect')()
var serveStatic = require('serve-static')

app.use(serveStatic('devpartner/Devpartner-PortalAdmin'))

console.log(' ➜   Open: http://localhost:7007')
app.listen(7007)
*/
