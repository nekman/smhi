define(function() {
  'use strict';
  //http://stackoverflow.com/a/3067896/141363
  var zeroPadding = function(str) {
    return str[1] ? str : '0' + str[0];
  };

  return {
    toDateString: function(date) {
      date = date || new Date();

      var yyyy = date.getFullYear().toString(),
          mm = (date.getMonth() + 1).toString(), // getMonth() is zero-based
          dd = date.getDate().toString();

      return zeroPadding(dd) +'/'+ zeroPadding(mm) + '-' + yyyy;
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