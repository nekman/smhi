define(function() {
  'use strict';

  var DIGITS = 6,

  isConverted = function(coords) {
    return coords && coords.lat && coords.lon;
  },

  round = function(value) {
    return typeof value === 'number' && value.toFixed(DIGITS) || '';
  };

  return {
    toFixed: function(coords) {
      // Asume that the coords is converted,
      if (isConverted(coords)) {
        return coords;
      }

      return {
        lat: round(coords.latitude),
        lon: round(coords.longitude)
      };
    },

    create: function(lat, lon) {
      return this.toFixed({ latitude: +lat, longitude: +lon });
    }
  };
});