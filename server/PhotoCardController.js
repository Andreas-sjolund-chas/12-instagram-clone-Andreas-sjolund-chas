var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var config = require('./config');
const uuidv1 = require('uuid/v1');

const tokenVerify = require('./middleware/TokenVerify');

var multer = require('multer');
var storage = multer.diskStorage({ 
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) =>  {
    cb(null, uuidv1() + '_' + file.originalname)
  }
});
var upload = multer({ storage: storage })
// Tell express to parse body contents as JSON
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

var PhotoCard = require('./PhotoCard');
var User = require('./User');

// FETCH ALL PHOTOS
router.get('/all', function(req, res) {
  PhotoCard.find({})
  .sort({createdAt: -1})
  .exec(function(error, cards) {
    if (error) {
      res.statusMessage = 'Something went wrong, could not find any photos';
      res.status(500).end()
    } else {

      res.status(200).json(cards);
    }
  });
});

// FETCH ALL PHOTOS BY USER ID
router.get('/byUserId', tokenVerify, function(req, res) {
  PhotoCard.find({'author.authorId': req.userId}, function(error, cards) {
    if (error) {
      res.statusMessage = 'Something went wrong, could not find any photos';
      res.status(500).end()
    } else {
      res.status(200).json(cards);
    }
  });
});

// CREATE NEW PHOTOCARD
router.post('/create', tokenVerify, upload.single('photo'), function(req, res) {
  PhotoCard.create({
    author: {
      name: req.user.name,
      avatar: req.user.avatar,
      authorId: req.userId
    },
    photoPath: '/' + req.file.path,
    comments: []
  }, function(err, photoCard) {
    if (err) {
      res.errorMessage('Something went wrong please try again...');
      res.status(500).end();
    }

    res.status(200).json(photoCard)
  });

});

// COMMENT ON PHOTOCARD
router.put('/comment', tokenVerify, function(req, res) {
  console.log(req.body)
  const idToUse = uuidv1()
  PhotoCard.findByIdAndUpdate(req.body.photoId, {
    $push: {
      comments: [{
          id: idToUse,
          name: req.user.name,
          content: req.body.content,
          avatar: req.user.avatar,
          createdAt: new Date()
        }]
      }
    }, { new: true }, function(error, photoCard) {
      if (error) {
        res.statusMessage = 'Could not add comment, please try again';
        res.status(500).end()
      } else {
        res.status(200).json({
          message: 'Comment was added.',
          photoId: photoCard._id,
          comment: photoCard.comments.filter(c => c.id === idToUse)[0]
        })
      }
    })
})

// LIKE PHOTOCARD
router.put("/:photoId/like", tokenVerify, function(req, res) {
  PhotoCard.findById(req.params.photoId, function(error, photo) {
    var index = photo.likes.indexOf(req.userId);

    if (index !== -1) {
      PhotoCard.findByIdAndUpdate(
        req.params.photoId,
        { $pull: { likes: req.userId } },
        {new: true},
        function(error, photo) {

          User.findByIdAndUpdate(
            req.userId,
            { $pull: { likes: req.params.photoId } },
            {new: true},
            function(err, user) {
              res.status(200).send({msg: 'Removed like from the photo', userId: user._id, photoId: req.params.photoId});
            }
          )

          // res.status(200).send({ msg: "Removed your like from the photo", photo: photo });
        }
      );
    } else {
      PhotoCard.findByIdAndUpdate(
        req.params.photoId,
        { $push: { likes: [req.userId] } },
        { new: true },
        function(error, photo) {
          if (error) {
            return res.status(500).send("Couldn't add the like");
          } else {

            User.findByIdAndUpdate(
              req.userId,
              { $push: { likes: req.params.photoId } },
              {new: true},
              function(err, user) {
                res.status(200).send({msg: 'Successfully added a like to the photo', userId: user._id, photoId: req.params.photoId});
              }
            )


            // res.status(200).send({ msg: "Successfully added a like to the photo", photo: photo });
          }
        }
      );

    
    }
  });
}); 

module.exports = router;