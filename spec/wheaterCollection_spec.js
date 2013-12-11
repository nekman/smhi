define(function(require) {
  'use strict';

  var jQuery = require('jquery'),
      weaterCollection = require('./testutils/fakeWheaterCollection');

  describe('WheaterCollection', function() {
    var sut;

    beforeEach(function() {
      sut = weaterCollection.create();
    });

    it('have parsed the response', function() {
      var expectedSize = 2;

      expect(sut.size()).toBe(expectedSize);
    });

    it('should have correct values and units', function() {
      var model = sut.first();
      
      expect(model.get('temperature').value).toBe(10.1);
      expect(model.get('temperature').unit).toBe('&deg;');

      expect(model.get('wind').value).toBe(8.3);
      expect(model.get('wind').unit).toBe('m/s');
    });

    it('should have coordinates', function() {
      expect(sut.coords).toBeDefined();
      expect(sut.coords.lat).toBe('1.000000');
      expect(sut.coords.lon).toBe('0.000000');
    });

    it('should create url with coordinates', function() {
      expect(sut.url()).toBe('http://opendata-download-metfcst.smhi.se/api/category/pmp1g/' +
                             'version/1/geopoint/lat/1.000000/lon/0.000000/data.json');
    });
  });

});