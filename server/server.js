var app = require('./index');
var port = 3001;

var server = app.listen(port, function() {
    console.log('Express is now listening to port: ' + port);
});

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  }