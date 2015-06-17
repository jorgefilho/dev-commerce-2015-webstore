var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var cart = require('./middlewares/cart');

module.exports = function (app) {
  app.set('views', path.join(__dirname + '/../app/', 'views'));
  app.set('view engine', 'jade');

  app.use(favicon(__dirname + '/../public/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());

  app.use(session({
    secret: '1234567890QWERTY',
    resave: false,
    saveUninitialized: true
  }));

  app.use(express.static(path.join(__dirname + '/../', 'public')));

  app.use(cart);
  routes(app);

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}