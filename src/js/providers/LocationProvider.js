define([
  'jquery',
  './GPSProvider',
  './GeoIpProvider'
], function($, gpsProvider, geoIpProvider) {
  'use strict';

  var fetchByGeoProvider = function(dfd) {
    return function() {
      geoIpProvider
        .fetch()
        .then(dfd.resolve)
        .fail(dfd.reject);
    };
  };

  return {
    fetch: function() {
      var dfd = $.Deferred();

      gpsProvider
        .fetch()
        .then(dfd.resolve)
        //Failed GPS lookup, get coordinates by GeoIp lookup.
        .fail(fetchByGeoProvider(dfd));

      return dfd.promise();
    }
  };
});