'use strict';

module.exports = function (products) {
  return {
    addProduct: function (req) {
      var id = req.params.id - 1;
      var cart = req.session.products;
      cart[id] = products[id];

      if (!cart[id].amount)
        cart[id].amount = 0;

      cart[id].amount += parseInt(req.params.amount);
    },
    updateAmount: function (req) {
      var id = req.params.id - 1;
      var cart = req.session.products;
      cart[id] = products[id];
      cart[id].amount = parseInt(req.params.amount);

      if (cart[id].amount === 0) {
        delete cart[id];
      }
    },
    getCart: function (req) {
      return req.session.cart;
    },
    getProduct: function (req) {
      var id = req.params.id - 1;
      return products[id];
    },
    getTotalValue: function (req) {
      var cart = req.session.cart;

      var total = cart.reduce(function (previousValue, currentValue) {
        return previousValue +
          (parseFloat(currentValue.price) * currentValue.amount);
      }, 23.5);

      return total.toFixed(2);
    },
    getTotalProducts: function (req) {
      return req.session.cart.length;
    },
    getTotals: function (req) {
      var cart = req.session.cart;

      var totalAmount = 0;

      var totalItensValue = cart.reduce(function (previousValue, currentValue) {
        totalAmount += currentValue.amount;
        return previousValue +
          (parseFloat(currentValue.price) * currentValue.amount);
      }, 0);

      var additional = 23.5;
      var total = totalItensValue + additional;
      return {
        totalItensValue: totalItensValue,
        total: total,
        amount: totalAmount,
        additional: additional
      }
    },
    clearSession: function (req) {
      req.session.cart = [];
      req.session.products = [];
    },
    isEmpty: function (req) {
      return req.session.cart.length === 0;
    },
    getItems: function (req) {
      var cart = req.session.cart;
      return cart.map(function (item) {
        return {
          name: item.description,
          value: parseInt(item.price * 100),
          amount: item.amount
        }
      })
    }
  }
};