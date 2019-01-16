var app         = require('connect')();
var serveStatic = require('serve-static');
var express     = require('express');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var cors        = require('cors');
var path        = require('path');

var app = express();

var port = 7007;
var route = require('./devpartner/Devpartner-PortalAdmin/app/routes/route');

//connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/newsList', { useNewUrlParser: true });

//on connection
mongoose.connection.on('connected', () => {
  console.log('connected to database mongodb');
});

mongoose.connection.on('error', function (err) {
    console.log('error in database connection: ', err);
});

mongoose.connection.on('disconnected', function () {
  console.log("database disconnected");
});

//starting server
app.listen(port, () => {
    console.log('Server started at port ' + port);
});

//testing server
app.get('/', (req, res) => {
  res.send('foobar');
});

app.use(bodyParser.json());

app.use('/api', route);

app.use(cors());

app.use(express.static('./public'));

// app.use(serveStatic('devpartner/Devpartner-PortalAdmin'))

// console.log(' ➜   Open: http://localhost:7007')
// app.listen(7007)
