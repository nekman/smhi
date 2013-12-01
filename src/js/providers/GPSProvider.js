define([
  'jquery',
],
function ($) {
  'use strict';

  var GPS_TIMEOUT_SETTINGS = {
    timeout: 10000,
    maximumAge: 60000
  },

  hasGeoLocation = function() {
    var geolocation = window.navigator.geolocation;
    return geolocation && typeof geolocation.getCurrentPosition === 'function';
  },
  
  resolveGPS = function(dfd) {
    return function(location) {
      dfd.resolve(location.coords);
    };
  },
      
  rejectGPS = function(dfd) {
    return function(err) {
      dfd.reject(err);
    };
  };

  function GPSProvider() {
  }

  GPSProvider.prototype.fetch = function() {
    var dfd = $.Deferred();
    
    if (!hasGeoLocation()) {
      rejectGPS(dfd)({ message: 'No GPS' });
    }
    
    window.navigator.geolocation.getCurrentPosition(
      resolveGPS(dfd),
      rejectGPS(dfd),
      GPS_TIMEOUT_SETTINGS
    );
      
    return dfd.promise();
  };

  return GPSProvider;

});