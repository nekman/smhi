define([
  'jquery'
],
function($) {
  'use strict';

  var url = 'http://maps.googleapis.com/maps/api/geocode/json?address={{place}}&sensor=false';

  return {
    fetch: function(place) {
      return $.getJSON(url.replace(/{{place}}/, place));
    }
  };
  
});