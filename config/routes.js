'use strict';

var pages = require('../app/controllers/pages');

module.exports = function (app) {
  app.route('/')
    .get(pages.index);

  app.route('/add/:id/:amount')
    .get(pages.addProduct);

  app.route('/update/:id/:amount')
    .get(pages.updateAmount);

  app.route('/produto/:id')
    .get(pages.detail);

  app.route('/carrinho')
    .get(pages.cart);

  app.route('/checkout')
    .get(pages.checkout);

  app.route('/billet')
    .post(pages.billet);

  app.route('/card')
    .post(pages.card);
};