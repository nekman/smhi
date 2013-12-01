define(function(require) {
  
  var DateUtils = require('../src/js/utils/DateUtils');

  describe('DateUtils', function() {

    it('gets the correct dayname', function() {
      var mockDate = function(number) {
        return {
          getDay: function() {
            return number;
          }
        };
      };

      expect(DateUtils.getName(mockDate(0))).toBe('Söndag');
      expect(DateUtils.getName(mockDate(1))).toBe('Måndag');
      expect(DateUtils.getName(mockDate(6))).toBe('Lördag');
    });

  });

});