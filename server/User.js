var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
// Beskriv hur en user ska se ut

var UserSchema = new mongoose.Schema({
    name: {type: String, maxlength: [100, 'I\'m sure your name isn\'t that long']},
    email: String,
    password: {type: String, minlength: [8, 'Passwords must contain at least 8 characters'], select: false },
    avatar: {type: String, default: '/avatars/user.png'},
    likes: Array
});

UserSchema.pre('save', function(next) {
   var user = this;
   var roundsOfSalt = 5;
   
   // Fail-safe here if password is not changed
    if (!user.isModified('password')) return next();

   bcrypt.hash(user.password, roundsOfSalt, function(error, hash) {
        if (error) return next(error);

        user.password = hash;
        next();
    });
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');