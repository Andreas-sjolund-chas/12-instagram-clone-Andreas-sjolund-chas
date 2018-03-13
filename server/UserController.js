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

router.post('/register', function(req, res) {
    User.findOne({
        'name': req.body.name
    })
    .exec(function(error, user) {
        console.log(user)

        if(user) {
            res.statusMessage = "The username already exists!"
            res.status(500).end()
        } else {
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }, function(error, user) {
                // Inside the callback now, we have either a) successfully created the user b) something went wrong
                if (error) {
                    res.status(500).send({"error": "An error occured while trying to add information to the database." + error})
                } else {
                    var token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: 86400 // valid for 24 hours
                    });

                    const strippedUser = user.toObject()
                    delete strippedUser.password

                    res.status(200).send({ 
                        authenticated: true, 
                        token: token,
                        user: strippedUser 
                    });
                }
            });
        }
    });
});

router.post('/signin', function(req, res) {

    User.findOne({
        'email': req.body.email
    })
    .select('+password')
    .exec(function(error, user) {
        console.log(user);
        if(user) {
            bcrypt.compare(req.body.password, user.password, function(error, result, next) {
                console.log(user);
                if(result) {
                    console.log('Right password!');
                    
                    var token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: 86400 // valid for 24 hours
                    });

                    const strippedUser = user.toObject()
                    delete strippedUser.password


                    res.status(200).send({ 
                        authenticated: true, 
                        token: token,
                        user: strippedUser
                    });

                } else {
                    res.statusMessage = "Incorrect password, please try again!";
                    return res.status(500).end();
                }
            });
        } else {
            res.statusMessage = "Email was not found, please try again!";
            return res.status(500).end();
        }
    })
})

router.get('/', function(req, res) {
    User.find({}, function(error, users) {
        if (error) {
            res.status(500).send("An error occured while trying to get users from the database.")
        } else {
            res.status(200).json(users);
        }
    });
});

router.get('/:id', function(req, res) {
    User.findById(req.params.id, function(error, user) {
        if (error) {
            return res.status(500).send("An error occured while trying to get user by id from the database.")
        } else {
            return res.status(200).json(user);
        }
    });
});

router.delete('/:id', function(req, res) {
    User.findByIdAndRemove(req.params.id, function(error, users) {
        if (error) {
            return res.status(500).send("An error occured while trying to delete the user from the database.")
        } else {
            return res.status(200).send('user ' + user.name +  " was successfully deleted.");
        }
    });
});

router.put('/:id', function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(error, users) {
        if (error) {
            return res.status(500).send("An error occured while trying to update the user on the database.")
        } else {
            return res.status(200).send('user ' + user.name +  " was successfully updated.");
        }
    });
});

// router.post('/me', function(req, res) {
//     var decodedToken = jwt.decode(req.body.token);
//     User.findById(decodedToken.id, function(error, user) {
//         if (error) {
//             res.statusMessage = 'Something went wrong, no user was found.'
//             return res.status(404).end();
//         } else {
//             return res.status(200).send(user);
//         }
//     })
// })

router.get("/me", tokenVerify, function(req, res) {
    User.findById(req.userId, function(error, user) {
      if (error) {
        res.status(500).send("An error occured when trying to find the user");
      }

      if (!user) {
        res.status(404).send("User not found");
      }

      res.status(200).send({
        authenticated: true,
        user: user
      });
    });
});

module.exports = router;