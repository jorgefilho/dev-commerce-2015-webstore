$gn.ready(function (checkout) {

  var submit = function (error, response) {
    var $jq = checkout.jq;

    var onclick = function (event) {
      event.preventDefault();
      $jq(this)
        .parent()
        .append($jq('<input/>')
          .attr('value', response.data.payment_token)
          .attr('type', 'hidden')
          .attr('name', 'payment_token'));

      $jq('#card-form').submit();
    }

    $jq('#card-button')
      .click(onclick);
  };

  var card = {
    brand: 'visa',
    number: '4012001038443335',
    cvv: '123',
    expiration_month: '05',
    expiration_year: '2018'
  }

  checkout
    .getPaymentToken(card, submit);
});