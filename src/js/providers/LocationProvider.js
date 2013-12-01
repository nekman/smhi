define([
  'jquery',
  './GPSProvider',
  './GeoIpProvider'
], function($, GPSProvider, GeoIpProvider) {
  'use strict';

  var fetchByGeoProvider = function(dfd) {
    return function() {
      GeoIpProvider
        .fetch()
        .then(dfd.resolve)
        .fail(dfd.reject);
    };
  },

  LocationProvider = function() {
    this.gpsProvider = new GPSProvider;
  };

  LocationProvider.prototype.fetch = function() {
    var dfd = $.Deferred();

    this.gpsProvider
        .fetch()
        .done(dfd.resolve)
        //Failed GPS lookup, get coordinates by GeoIp lookup.
        .fail(fetchByGeoProvider(dfd));

    return dfd.promise();
  };

  return LocationProvider;
});