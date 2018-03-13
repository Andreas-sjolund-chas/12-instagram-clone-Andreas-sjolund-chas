var jwt = require('jsonwebtoken');
var config = require('../config');

function tokenVerify(req, res, next) {
  
  var token = req.headers['x-access-token'];
    debugger;
  if (!token) {
    return res.status(401).send({
      authenticated: false,
      message: "Unauthorized. No token provided"
    });
  }

  jwt.verify(token, config.secret, function(error, decodedToken) {
    if (error) {
      res.status(500).send({
        authenticated: false,
        message: "An error occurred when trying to authenticate token"
      });
    }

    req.userId = decodedToken.id;
    next();

  });

}

module.exports = tokenVerify; 