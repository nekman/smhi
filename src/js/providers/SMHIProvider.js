define([
  'jquery'
],
function ($) {
  'use strict';
  
  var SMHI_GEOPOINT_URL = 'http://opendata-download-metfcst.smhi.se/api/' +
                          'category/pmp1g/version/1/geopoint/lat/{{lat}}/lon/{{lon}}/data.json';
  
  function SMHIWheaterProvider(coords) {
    this.lat = coords.latitude.toFixed(6);
    this.lon = coords.longitude.toFixed(6);
  }
  
  SMHIWheaterProvider.prototype = {
    fetch: function() {
      var dfd = $.Deferred();
      
      $.getJSON(this.url())
        .done(function(data) {
          dfd.resolve(data);
      }).fail(dfd.reject);

      return dfd.promise();
    },

    url: function() {
      return SMHI_GEOPOINT_URL
                 .replace(/{{lat}}/, this.lat)
                 .replace(/{{lon}}/, this.lon);
    }
  };

  return SMHIWheaterProvider;

});