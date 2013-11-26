define(['jquery'], function($) {
  'use strict';

  var url = 'http://freegeoip.net/json/';
  
  return {
    fetch: function() {
      return $.getJSON(url);
    }
  };
});