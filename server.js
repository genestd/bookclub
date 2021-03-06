// server.js
// where your node app starts
require('dotenv').config()
// init project
var express = require('express');
var app = express();

// include auth & session code
var session = require('express-session')
var passport = require('passport')
require('./server/auth/passport.js')(passport)
app.use(session({
  secret: "bookclub",
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 14}  /* Two week cookie */
}))
app.use(passport.initialize())
app.use(passport.session())

// connect to database
var mongoose = require('mongoose')
mongoose.connect('mongodb://' + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/' + process.env.MONGO_DB)

// middleware
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var routes = require('./server/routes')
routes(app, passport)
app.use(express.static('server/views'));

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
