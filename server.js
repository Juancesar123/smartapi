var express = require('express');
var app = express();
var http = require('http').Server(app)
var bodyParser     = require('body-parser');
var multer         = require('multer');
var compression = require("compression");
var passport = require("passport");
var BearerStrategy = require("passport-http-bearer").Strategy;
var session = require("express-session");
var cookieParser = require("cookie-parser");
var io = require('socket.io')(http);
app.use(compression())
app.use(session({
  		secret: 'keyboard cat',
  		resave: false,
  		saveUninitialized: true,
  		cookie: { secure: false }
	}))
io.on('connection', function(socket){
  socket.on('counter',function(data){
	  io.emit('count',data);
  })
});

// configuration ===========================================
    
// config files
var router = express.Router();
var mongoose = require('mongoose');
var Promise = require('mpromise');
var md5 = require("md5");
var helmet = require('helmet')
app.use(helmet())
mongoose.Promise = global.Promise
var options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  replset: { rs_name: 'myReplicaSetName' }
}
mongoose.connect('mongodb://localhost/smartapi',options);
// set our port
require('./config/modules.js')(app,multer,md5); // configure our routes

// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json()); 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use('/bower_components',express.static(__dirname + '/bower_components'));
// app.use('/tim',express.static(__dirname + '/tim'));
// app.use('/users',express.static(__dirname + '/users'));
http.listen(9000)    
exports = module.exports = app;