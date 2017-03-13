var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('./routes/passport');

var routes = require('./routes/index');
var users  = require('./routes/users');
var stores = require('./routes/stores');
var menus = require('./routes/menus');
var store_replies = require('./routes/store_replies');

var app = express();



// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
passport();

//app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    // var allowedOrigins = ['http://localhost:4200', 'http://localhost'];
    // var origin = req.headers.origin;
    // if(allowedOrigins.indexOf(origin) > -1){
    //     res.setHeader('Access-Control-Allow-Origin', origin);
    // }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');    
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// view engine setup
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', routes);
app.use('/api/users', users);
app.use('/api/stores', stores);
app.use('/api/menu', menus);
app.use('/api/reply', store_replies);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

module.exports = app;
