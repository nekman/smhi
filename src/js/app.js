define([
  'jquery',
  './routers/AppRouter'
], function($, appRouter) {
  'use strict';

  var startCoords = {},
      endCoords = {},

  handleTouchStart = function(e) {
    startCoords = endCoords = e.originalEvent.targetTouches[0];
  },

  handleTouchMove = function(e) {
    endCoords = e.originalEvent.targetTouches[0];
    var isForward = (startCoords.pageX - endCoords.pageX) > 0;

    if (isForward) {
      $('a.right').trigger('click');
    } else {
      $('a.left').trigger('click');
    }
  };

  $(document.body).on('touchstart', '#wheater', handleTouchStart)
                  .on('touchmove',  '#wheater', handleTouchMove);

  return $;
});