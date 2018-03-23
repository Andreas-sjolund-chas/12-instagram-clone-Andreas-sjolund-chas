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

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// app.use(jwt.init('secret'));

module.exports = app;