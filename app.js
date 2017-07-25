var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

var index = require('./routes/index');
var create = require('./routes/create');
var users = require('./routes/users');

var app = express();

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//Require Passport for auth
var passport = require('passport');
var LocalStrategy = require('passport-local');

//Database setup
var db = mongoose.connect('mongodb://localhost/rescape');

//Initialize express-session
app.use(session({
  secret: 'rescape-secret-key',
  saveUninitialized: true,
  resave: true
}));

//Initialize Passport and sessions
// Passport init
app.use(passport.initialize());
app.use(passport.session());

//connect Flash
app.use(flash());

//Add req.user as a local variable
app.use(function (req, res, next){
  res.locals.user = req.user || null;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/create', create);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
