define(function(require) {
  'use strict';

  var Backbone          = require('backbone'),
      LocationRouter    = require('./LocationRouter'),
      CoordUtils        = require('../utils/CoordUtils'),
      WheaterCollection = require('../models/WheaterCollection'),
      ErrorView         = require('../views/ErrorView'),
      PlaceView         = require('../views/PlaceView'),
      CarouselView      = require('../views/CarouselView'),
      LocationProvider  = require('../providers/LocationProvider'),
      PlaceProvider     = require('../providers/PlaceProvider'),
      map               = require('../map'),
  
  handleError = function(err) {
    new ErrorView({ model: err });
  },

  navigateByCoords = function(coords) {
    coords = CoordUtils.toFixed(coords);
    PlaceView.create(coords);

    var collection = new WheaterCollection(coords);

    collection.fetch().done(function() {
      var locationRouter = new LocationRouter('loc', collection);
      locationRouter.navigate(coords.lat + '/' + coords.lon);

      map.create(coords);

      new CarouselView(collection);
    })
    .fail(handleError);
  };

  var AppRouter = Backbone.Router.extend({
    
    routes: {
      '': 'index',
      'loc/:lat/:lon': 'location',
      'place/:place': 'place',
      '*actions': 'index' // matches http://example.com/#anything-here      
    },

    initialize: function() {
      Backbone.history.start({ pushState: true });
    },

    index: function() {
      new LocationProvider()
          .fetch()
          .done(navigateByCoords)
          .fail(handleError);
    },

    location: function(lat, lon) {
      navigateByCoords(CoordUtils.create(lat, lon));
    },

    place: function(place) {
      PlaceProvider.fetch(place).done(function(data) {
        var loc = data.results[0].geometry.location,
            coords = CoordUtils.create(loc.lat, loc.lng);

        navigateByCoords(coords);
      });
    }

  });

  return new AppRouter;
});