define([
  'jquery',
  './routers/AppRouter'
], function($, appRouter) {
  'use strict';

  var startCoords = {},
      endCoords = {},

  forward = function() {
    $('a.right').trigger('click');
  },

  backward = function() {
    $('a.left').trigger('click');
  },

  handleKeydown = function(e) {
    if (e.target.tagName === 'INPUT') {
      return;
    }

    if (e.which === 37) {
      backward();
    }

    if (e.which === 39) {
      forward();
    }
  },

  handleTouchStart = function(e) {
    startCoords = endCoords = e.originalEvent.targetTouches[0];
  },

  handleTouchMove = function(e) {
    endCoords = e.originalEvent.targetTouches[0];

    var diff = startCoords.pageX - endCoords.pageX,
        isForward = diff > 0,
        isBackward = diff < 0;

    if (isForward) {
      forward();
    }

    if (isBackward) {
      backward();
    }
  };

  $(document.body).on('touchstart', '#wheater', handleTouchStart)
                  .on('touchmove',  '#wheater', handleTouchMove)
                  .on('keydown', handleKeydown);

  return $;
});