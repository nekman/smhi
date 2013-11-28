define(function(require) {
  
  var data = {
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
    }]
  },

  WheaterCollection = require('../src/js/models/WheaterCollection');

  describe('WheaterCollection', function() {
    var sut;

    beforeEach(function() {
      sut = new WheaterCollection(data, { parse: true });
    });

    it('have parsed the response', function() {
      var expectedSize = 1;

      expect(sut.lat).toBe(data.lat);
      expect(sut.lon).toBe(data.lon);
      expect(sut.size()).toBe(expectedSize);
    });

    it('should have correct values and units', function() {
      var model = sut.first();
      
      expect(model.get('temperature').value).toBe(10.1);
      expect(model.get('temperature').unit).toBe('&deg;');

      expect(model.get('wind').value).toBe(8.3);
      expect(model.get('wind').unit).toBe('m/s');
    });
  });

});