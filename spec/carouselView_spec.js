define(function(require) {
  'use strict';

  var wheaterCollection = require('./testUtils/fakeWheaterCollection'),
      jQuery            = require('jquery'),
      CarouselView      = require('../src/js/views/CarouselView');


  describe('CarouselView', function() {
    var collection;

    beforeEach(function() {
      collection = wheaterCollection.create();

      spyOn(collection, 'groupModelsByDayAndTime');
      spyOn(jQuery.fn, 'owlCarousel');
    });

    it('renders the view', function() {
      new CarouselView(collection);

      expect(collection.groupModelsByDayAndTime).toHaveBeenCalled();
      expect(jQuery.fn.owlCarousel).toHaveBeenCalled();
    });

  });
});