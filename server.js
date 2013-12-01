var express = require('express');
var app = express();

app.configure(function() {
  // Static resources  
  app.use('/src', express.static(__dirname + '/src', { redirect: false }));
  app.use('src', express.static(__dirname + '/src', { redirect: false }));

  // Location route
  app.all('/loc/:lat/:lon', function(req, res) {
    res.redirect('#/loc/'+ req.params.lat +'/' + req.params.lon);
  });

  // Index routes
  app.all('/', function(req, res) {
    res.sendfile('src/index.html', { root: __dirname });
  });

  // Other, just redirect to index
  app.all('/*', function(req, res) {
    res.redirect('/');
  });
});

var port = process.env.PORT || 5001;
app.listen(port, function() {
 console.log('Listening on', port);
});