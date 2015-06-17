'use strict';

var flags = require('../lib/flags');
var products = require('../lib/products');
var cartService = require('../lib/cart')(products);
var paymentService = require('../lib/payment');

exports.index = function (req, res, next) {
  res.render('showcase/index', {
    title: 'DEV Commerce 2015 - Loja Exemplo',
    products: products,
    totalProducts: req.session.cart.length,
    indexClass: 'menu-active'
  });
};

exports.addProduct = function (req, res, next) {
  cartService.addProduct(req);
  res.redirect(302, '/carrinho');
};

exports.updateAmount = function (req, res, next) {
  cartService.updateAmount(req);
  res.redirect(302, '/carrinho');
};

exports.detail = function (req, res, next) {
  res.render('showcase/detail', {
    title: 'DEV Commerce 2015 - Loja Exemplo',
    product: cartService.getProduct(req),
    totalProducts: req.session.cart.length
  });
};

exports.cart = function (req, res, next) {
  if (cartService.isEmpty(req)) {
    res.redirect(302, '/');
  }

  res.render('cart/index', {
    title: 'DEV Commerce 2015 - Loja Exemplo | Carrinho',
    cart: cartService.getCart(req),
    total: cartService.getTotalValue(req),
    totalProducts: cartService.getTotalProducts(req),
    cartClass: 'menu-active'
  });
};

exports.checkout = function (req, res, next) {
  if (cartService.isEmpty(req)) {
    res.redirect(302, '/');
  }

  var totals = cartService.getTotals(req);

  res.render('checkout/index', {
    title: 'DEV Commerce 2015 - Loja Exemplo | Checkout',
    totalProducts: cartService.getTotalProducts(req),
    totalAmount: totals.amount,
    totalItensValue: totals.totalItensValue,
    additional: totals.additional,
    total: totals.total,
    flags: flags
  });
};

exports.billet = function (req, res, next) {
  paymentService
    .billet(cartService.getItems(req))
    .then(function (response) {
      cartService.clearSession(req);
      res.render('checkout/response', {
        title: 'DEV Commerce 2015',
        response: JSON.stringify(response, null, '  ')
      });
    });
};

exports.card = function (req, res, next) {
  paymentService
    .card(cartService.getItems(req), req.body.payment_token)
    .then(function (response) {
      cartService.clearSession(req);
      res.render('checkout/response', {
        title: 'DEV Commerce 2015',
        response: JSON.stringify(response, null, '  ')
      });
    });
};