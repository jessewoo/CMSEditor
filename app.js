// MAIN LOOP - Everything are functions we call
// DEFAULT initiate required packages
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/*
//CUSTOM Will need authentication module eventually
var auth = require('http-auth');
var basic = auth.basic({
    realm: "Project Management",
    file: __dirname + "/users.htpasswd"
});
*/

var routes = require('./routes/index');
var motm = require('./routes/motm');

//CUSTOM Necessary for database connections
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/pdb101v3');

var app = express();
//CUSTOM More for auth
//app.use(auth.connect(basic));

// Jade view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Default app use statements
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//CUSTOM make our db accessible
app.use(function(req,res,next) {
  req.db = db;
  next();
});

app.use('/', routes);
//Switched default users with motm for Molecule of the Month
app.use('/motm', motm);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
