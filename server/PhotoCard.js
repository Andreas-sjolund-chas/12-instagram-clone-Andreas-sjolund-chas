var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
// Beskriv hur en user ska se ut

var PhotoCardSchema = new mongoose.Schema({
    id: String,
    author: {
      name: String,
      avatar: String,
      authorId: Number
    },
    photoPath: String,
    likes: Number,
    comments: Array
});

mongoose.model('PhotoCard', PhotoCardSchema);

module.exports = mongoose.model('PhotoCard');