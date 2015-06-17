'use strict';

module.exports = function (req, res, next) {
  if (!req.session.products)
    req.session.products = [];

  var cart = req.session.products;

  req.session.cart = cart.filter(function (value) {
    return value !== null;
  });

  next();
}