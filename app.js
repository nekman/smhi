var express = require('express');
var app = express();

app.configure(function() {
  //Static resources
  app.use('/src', express.static(__dirname + '/src'));
  app.use('/js', express.static(__dirname + '/src/js'));

  // Location route
  app.all('/loc/:lat/:lng', function(req, res) {
    res.redirect('#/loc/'+ req.params.lat +'/' + req.params.lng);
  });

  // Index routes
  app.all('/*', function(req, res) {
    res.sendfile('src/index.html', { root: __dirname });
  });
});

var port = process.env.PORT || 5001;
app.listen(port, function() {
 console.log('Listening on', port);
});