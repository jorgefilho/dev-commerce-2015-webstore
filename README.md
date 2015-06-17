# dev-commerce-2015-webstore

> Simple webstore use case for [Gerencianet's](http://gerencianet.com.br) DEV Commmerce presentation.

## Installation

```bash
$ git clone https://github.com/gerencianet/dev-commerce-2015-webstore.git
$ cd dev-commerce-2015-webstore/
$ npm install
```

## Running

Set your credentials in `lib/payment.js`

```js
var options = {
  client_id: 'your_client_id',
  client_secret: 'your_client_secret',
  sandbox: true
}
```

```bash
$ npm start
```

Access `http://localhost:3000` in your browser.
