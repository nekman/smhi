define('jquery', function() {
  var jq = {
    Deferred: function() {
      return {
        promise: function() {},
        resolve: function() {}
      };
    },
    getJSON: function(url) {
      var promise = {
        done: function() { return promise; },
        fail: function() { return promise; }
      };

      return promise;
    }
  };

  return jq;
});

define(function(require) {
  
  var SMHIProvider = require('../src/js/providers/SMHIProvider'),
      jQuery = require('jquery');

  describe('SMHIProvider', function() {

    var coords;
    beforeEach(function() {
      coords = { longitude: 0.0, latitude: 1.0 };

      spyOn(jQuery, 'getJSON').andCallThrough();

    });

    it('should create instance', function() {
      var sut = new SMHIProvider(coords);

      expect(sut.lat).toBe('1.000000');
      expect(sut.lng).toBe('0.000000');
    });

    it('should fetch from SMHI', function() {
      var sut = new SMHIProvider(coords);

      sut.fetch();

      expect(jQuery.getJSON).toHaveBeenCalledWith(jasmine.any(String));
    });
  });
});
