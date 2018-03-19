var express = require('express');
var app = express();
var db = require('./db.js');
// var jwt = require('jwt-express');
var UserController = require('./UserController');
var PhotoCardController = require('./PhotoCardController');
var AuthController = require('./AuthController');
var path = require('path');

app.use('/users',  UserController);
app.use('/photo', PhotoCardController);
app.use('/auth', AuthController);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/avatars', express.static(path.join(__dirname, 'avatars')))


// app.use(jwt.init('secret'));

module.exports = app;