define(function() {
  'use strict';
  //http://stackoverflow.com/a/3067896/141363
  var zeroPadding = function(str) {
    return str[1] ? str : '0' + str[0];
  },

  dayNames = {
    0: 'Söndag',
    1: 'Måndag',
    2: 'Tisdag',
    3: 'Onsdag',
    4: 'Torsdag',
    5: 'Fredag',
    6: 'Lördag'
  };

  return {
    getName: function(date) {
      return dayNames[date.getDay()];
    },

    toDateString: function(date) {
      date = date || new Date();

      var mm = (date.getMonth() + 1).toString(), // getMonth() is zero-based
          dd = date.getDate().toString();

      return this.getName(date) + ' ' + dd + '/' + zeroPadding(mm);
    },

    toTimeString: function(date) {
      date = date || new Date();

      var hh = date.getHours().toString(),
          mm = date.getMinutes().toString();

      return zeroPadding(hh) + ':' + zeroPadding(mm);
    },

    toHourString: function(date) {
      date = date || new Date();
      
      return zeroPadding(date.getHours().toString());
    }
  };

});