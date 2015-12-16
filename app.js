// Include packages
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();

/*
 // CUSTOM Will need authentication module eventually
 var auth = require('http-auth');
 var basic = auth.basic({
 realm: "Project Management",
 file: __dirname + "/users.htpasswd"
 });
 */

// DEFAULT view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// DEFAULT app use statements
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route traffic
var routes = require('./routes/index');
var motm = require('./routes/motm');
app.use('/', routes);
app.use('/motm', motm);

// DEFAULT catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// DEFAULT error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
