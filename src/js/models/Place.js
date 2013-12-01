define([
  'backbone',
  'jquery'
],
function(Backbone, $, CoordUtils) {
  'use strict';

  var GEO_NAMES_URL = 'http://ws.geonames.org/findNearbyPlaceNameJSON?lat={{lat}}&lng={{lon}}';

  return Backbone.Model.extend({
    initialize: function(coords) {
      this.lat = coords.lat;
      this.lon = coords.lon;
    },

    url: function() {
      return GEO_NAMES_URL
                .replace(/{{lat}}/, this.lat)
                .replace(/{{lon}}/, this.lon);
    }
  });
});