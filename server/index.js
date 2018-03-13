var express = require('express');
var app = express();
var db = require('./db.js');
// var jwt = require('jwt-express');

var UserController = require('./UserController');
app.use('/users', UserController);
var PhotoCardController = require('./PhotoCardController');
app.use('/photo', PhotoCardController);

// app.use(jwt.init('secret'));

module.exports = app;