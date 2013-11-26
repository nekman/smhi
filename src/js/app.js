define(function(require) {
  'use strict';

  var Backbone = require('backbone'),
      AppRouter = require('./routers/AppRouter'),
      locationProvider = require('./providers/LocationProvider'),
      SMHIProvider = require('./providers/SMHIProvider'),
      WheaterCollection = require('./models/WheaterCollection'),
      ErrorView = require('./views/ErrorView');

  var appRouter = new AppRouter,

  navigateByCoords = function(coords) {
    console.log(coords);

    var smhiProvider = new SMHIProvider(coords);

    smhiProvider.fetch().done(function(data) {
      var collection = new WheaterCollection(data, { parse: true });
      
      appRouter.initialize(collection);
      
      appRouter.navigate('loc/' + smhiProvider.lat + '/' + smhiProvider.lng, { trigger: false });
      appRouter.first();
    });

  };

  appRouter.on('route:home', function(lat, lng) {
    navigateByCoords({ longitude: +lng, latitude: +lat });
  });

  appRouter.on('route:index', function() {
    locationProvider
      .fetch()
      .then(navigateByCoords)
      .fail(function(err) {
        new ErrorView({ model: err });
      });
  });

  appRouter.on('route:error', function() {
    new ErrorView({ model: { message: 'Okänt fel' } });
  });

  Backbone.history.start({ pushState: true });
});