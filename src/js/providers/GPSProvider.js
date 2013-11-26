define([
  'jquery',
],
function ($) {
  'use strict';

  var GPS_TIMEOUT_SETTINGS = {
    timeout: 10000,
    maximumAge: 60000
  },
  
  geolocation = window.navigator.geolocation || {},
    
  hasGeoLocation = function() {
    return typeof geolocation.getCurrentPosition === 'function';
  },
  
  resolveGPS = function(dfd) {
    return function(location) {
      dfd.resolve(location.coords);
    };
  },
      
  rejectGPS = function(dfd) {
    return function(err) {
      dfd.reject(err);
      console.warn('err', err);
    };
  };

  function GPSProvider() {
  }

  GPSProvider.prototype = {
    fetch: function() {
      var dfd = $.Deferred();
      
      if (!hasGeoLocation()) {
        rejectGPS(dfd)({ message: 'No GPS' });
      }
      
      geolocation.getCurrentPosition(
        resolveGPS(dfd),
        rejectGPS(dfd),
        GPS_TIMEOUT_SETTINGS
      );
        
      return dfd.promise();
    }
  };

  return new GPSProvider;

});