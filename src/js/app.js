define(function(require) {
  'use strict';

  var Backbone          = require('backbone'),
      CoordUtils        = require('./utils/CoordUtils'),
      AppRouter         = require('./routers/AppRouter'),
      WheaterCollection = require('./models/WheaterCollection'),
      ErrorView         = require('./views/ErrorView'),
      PlaceView         = require('./views/PlaceView'),
      LocationProvider  = require('./providers/LocationProvider');

  var appRouter = new AppRouter,

  handleError = function(err) {
    new ErrorView({ model: err });
  },

  navigateByCoords = function(coords) {
    coords = CoordUtils.toFixed(coords);
    PlaceView.create(coords);

    var collection = new WheaterCollection(coords);

    collection.fetch().done(function() {
      appRouter.initialize(collection);
      // trigger = false, beacuse we don't want to trigger a route event.
      // Just update the location.
      appRouter.navigate('loc/' + coords.lat + '/' + coords.lon, { trigger: false });
    })
    .fail(handleError);
  };

  // Index route
  appRouter.on('route:index', function() {
    new LocationProvider()
      .fetch()
      .done(navigateByCoords)
      .fail(handleError);
  });

  // Location route
  appRouter.on('route:location', function(lat, lon) {
    navigateByCoords(CoordUtils.create(lat, lon));
  });

  Backbone.history.start({ pushState: true });
});