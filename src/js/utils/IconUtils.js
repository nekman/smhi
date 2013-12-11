define([
  'lodash'
],
function(_) {
  'use strict';

  var browser_vendor_prefixes = [
    '-webkit-',
    '-moz-',
    '-ms-',
    '-o-',
    '' /* "standard" */
  ],

  wheaterIcons = {
    1: 'wi-snow',
    2: 'wi-rain-mix',
    3: 'wi-rain',
    4: 'wi-sprinkle',
    5: 'wi-snow',
    6: 'wi-snow'
  },

  cloudIcons = {
    0: 'wi-day-sunny',
    1: 'wi-day-sunny',
    2: 'wi-day-sunny-overcast',
    3: 'wi-day-sunny-overcast',
    4: 'wi-day-cloudy',
    5: 'wi-day-cloudy',
    6: 'wi-cloudy',
    7: 'wi-cloudy',
    8: 'wi-cloudy'
  };

  return {
    /* Returns a string with CSS3 rotation for all browsers */
    getArrowRotation: function(windDirection) {
      return _.map(browser_vendor_prefixes, function(prefix) {
          return [prefix, 'transform: rotate(', windDirection, 'deg)'].join('');
      }).join(';');
    },

    getWheaterIcon: function(wheater, cloud) {
      var wheaterIcon = wheaterIcons[wheater];

      if (!wheaterIcon) {
        return cloudIcons[cloud];
      }

      return wheaterIcon;
    }
  };
});