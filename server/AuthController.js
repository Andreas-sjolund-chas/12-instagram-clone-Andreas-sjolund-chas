var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('./config');
var tokenVerify = require('./middleware/TokenVerify');

// Tell express to parse body contents as JSON
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

var User = require('./User');

router.get("/me", tokenVerify, function(req, res) {

  User.findById(req.userId, function(error, user) {
    if (error) {
      res.status(500).send("An error occured when trying to find the user");
    }

    if (!user) {
      res.status(404).send("User not found");
    }
    
    return res.status(200).send({
      authenticated: true,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        id: user.id
      }
    });
  });
});

module.exports = router;