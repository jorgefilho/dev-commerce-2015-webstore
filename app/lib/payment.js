'use strict';

var Gerencianet = require('gn-api-sdk-node');

var options = {
  client_id: '',
  client_secret: '',
  sandbox: true
}

var gerencianet = new Gerencianet(options);

var customer = {
  name: 'Gorbadoc Oldbuck',
  email: 'oldbuck@gerencianet.com.br',
  document: '04267484171',
  birth: '1977-01-15',
  phone_number: '5044916523'
}

var createBillet = function (charge) {
  var paymentInput = {
    charge_id: charge.data.charge_id,
    payment: {
      banking_billet: {
        expire_at: '2016-12-12'
      }
    }
  }

  return gerencianet
    .createPayment(paymentInput);
}

var payWithCreditCard = function (paymentToken, charge) {
  var paymentInput = {
    charge_id: charge.data.charge_id,
    payment: {
      credit_card: {
        installments: 1,
        payment_token: paymentToken,
        billing_address: {
          street: 'Street 3',
          number: 10,
          neighborhood: 'Bauxita',
          zipcode: '35400000',
          city: 'Ouro Preto',
          state: 'MG'
        }
      }
    }
  }

  return gerencianet
    .createPayment(paymentInput);
}

module.exports = function () {
  return {
    billet: function (items) {},
    card: function (items, paymentToken) {}
  }
}();