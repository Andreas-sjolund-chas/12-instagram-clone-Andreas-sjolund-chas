var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('./config');
const uuidv1 = require('uuid/v1');

// Tell express to parse body contents as JSON
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

var PhotoCard = require('./PhotoCard');

// FETCH ALL PHOTOS
router.get('/all', function(req, res) {
  PhotoCard.find({}, function(error, cards) {
    if (error) {
      res.statusMessage = 'Something went wrong, could not find any photos';
      res.status(500).end()
    } else {

      res.status(200).json(cards);
    }
  });
});

// CREATE NEW PHOTOCARD
router.post('/create', function(req, res) {
  debugger;
  PhotoCard.create({
    id: uuidv1(),
    author: {
      name: req.body.name,
      avatar: req.body.avatar,
      authorId: 1
    },
    photoPath: req.body.photo,
    likes: 0,
    comments: []
  });
});

// COMMENT ON PHOTOCARD
router.put('/comment', function(req, res) {
  PhotoCard.update(
    {id: req.body.photoId},
    {$push: {
      comments: [{
          id: uuidv1(),
          name: req.body.username,
          content: req.body.content,
          avatar: req.body.avatar
        }]
      }
    }, function(error, res) {
      if (error) {
        res.statusMessage = 'Could not add comment, please try again';
        res.status(500).end()
      } else {
        res.status(200).send()
      }
    })
})

module.exports = router;