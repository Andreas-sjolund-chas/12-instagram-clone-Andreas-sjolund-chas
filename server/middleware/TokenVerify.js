var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../User');

function tokenVerify(req, res, next) {
  
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({
      authenticated: false,
      message: "Unauthorized. No token provided"
    });
  }

  jwt.verify(token, config.secret, function(error, decodedToken) {
    if (error) {
      return res.status(500).send({
        authenticated: false,
        message: "An error occurred when trying to authenticate token"
      });
    }
    User.findById(decodedToken.id)
    .then(user => {
      req.user = user;
      req.userId = decodedToken.id;
      next();

    })


  });

}

module.exports = tokenVerify; 