define(function(require) {
  'use strict';

  var fake_model_data = {
    'lat': 50.111111,
    'lon': 17.222222,
    'referenceTime': '2013-11-27T20:00:00Z',
    'timeseries': [{
      'validTime': '2013-11-27T21:00:00Z',
      'msl': 1006.8,
      't': 10.1,
      'vis': 47.0,
      'wd': 280,
      'ws': 8.3,
      'r': 81,
      'tstm': 0,
      'tcc': 8,
      'lcc': 2,
      'mcc': 0,
      'hcc': 8,
      'gust': 14.7,
      'pit': 0.0,
      'pis': 0.0,
      'pcat': 0
    },
    {
      'validTime': '2013-11-27T22:00:00Z',
      'msl': 1006.8,
      't': 9.1,
      'vis': 47.0,
      'wd': 280,
      'ws': 8.3,
      'r': 81,
      'tstm': 0,
      'tcc': 8,
      'lcc': 2,
      'mcc': 0,
      'hcc': 8,
      'gust': 14.7,
      'pit': 0.0,
      'pis': 0.0,
      'pcat': 0
    }]
  },

  WheaterCollection = require('../../src/js/models/WheaterCollection');

  return {
    create: function(coords) {
      var collection = new WheaterCollection(coords || { lat: '1.000000', lon: '0.000000' });

      // Mock jQuery ajax (that gets called when we call 'fetch').
      spyOn(jQuery, 'ajax').andCallFake(function(options) {
         options.success(fake_model_data);
      });

      collection.fetch();
      return collection;
    }
  };

});