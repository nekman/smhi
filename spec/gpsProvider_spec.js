define(function(require) {

  var FAKE_COORDS = {
    coords: {
      longitude: 1.0,
      latitude: 2.0
    }
  },

  jQuery = require('jquery'),
  GPSProvider = require('../src/js/providers/GPSProvider'),
  sut = new GPSProvider;

  describe('GPSProvider', function() {
    var dfd = jQuery.Deferred();
    beforeEach(function() {
      spyOn(jQuery, 'Deferred').andCallFake(function() {
        return dfd;
      });

      spyOn(dfd, 'promise').andCallThrough();
      spyOn(dfd, 'resolve').andCallThrough();
      spyOn(dfd, 'reject').andCallThrough();
    });

    describe('GPS provider find position', function() {

      beforeEach(function() {
        navigator.geolocation = {
          getCurrentPosition: function(onSucces, onError) {
            onSucces(FAKE_COORDS);
          }
        };
      });

      it('finds current position', function() {
        sut.fetch();

        expect(dfd.promise).toHaveBeenCalled();
        expect(dfd.reject).not.toHaveBeenCalled();
        expect(dfd.resolve).toHaveBeenCalledWith(FAKE_COORDS.coords);
      });
    });

    describe('GPS provider cannot find position', function() {

      beforeEach(function() {
        navigator.geolocation = {
          getCurrentPosition: function(onSucces, onError) {
            onError();
          }
        };
      });

      it('fails to find current position', function() {
        sut.fetch();

        expect(dfd.promise).toHaveBeenCalled();
        expect(dfd.resolve).not.toHaveBeenCalled();
        expect(dfd.reject).toHaveBeenCalled();
      });
    });

  });
});