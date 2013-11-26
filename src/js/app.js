define(function(require) {
  'use strict';

  var Backbone          = require('backbone'),
      AppRouter         = require('./routers/AppRouter'),
      SMHIProvider      = require('./providers/SMHIProvider'),
      WheaterCollection = require('./models/WheaterCollection'),
      ErrorView         = require('./views/ErrorView'),
      locationProvider  = require('./providers/LocationProvider');

  var appRouter = new AppRouter,

  handleError = function(err) {
    new ErrorView({ model: err });
  },

  navigateByCoords = function(coords) {
    var smhiProvider = new SMHIProvider(coords),
        lat = smhiProvider.lat,
        lng = smhiProvider.lng;

    smhiProvider
      .fetch()
      .done(function(data) {
        appRouter.initialize(
          new WheaterCollection(data, { parse: true })
        );
        // trigger = false, beacuse we don't want to trigger a route event.
        // Just update the location.
        appRouter.navigate('loc/' + lat + '/' + lng, { trigger: false });
      })
      .fail(handleError);
  };

  // Index route
  appRouter.on('route:index', function() {
    locationProvider
      .fetch()
      .then(navigateByCoords)
      .fail(handleError);
  });

  // Location route
  appRouter.on('route:location', function(lat, lng) {
    navigateByCoords({ longitude: +lng, latitude: +lat });
  });

  Backbone.history.start({ pushState: true });
});