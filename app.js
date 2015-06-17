var express = require('express');
var http = require('http');
var app = express();

require('./config/express')(app);
app.listen(3000);