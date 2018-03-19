var mongoose = require('mongoose');
// Beskriv hur en user ska se ut

var PhotoCardSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    author: {
      name: String,
      avatar: String,
      authorId: String
    },
    photoPath: String,
    likes: Array,
    comments: Array
});

mongoose.model('PhotoCard', PhotoCardSchema);

module.exports = mongoose.model('PhotoCard');