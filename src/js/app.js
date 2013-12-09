define([
  'jquery',
  './routers/AppRouter'
], function($, appRouter) {
  
  var startCoords = {}, endCoords = {};

  $(document.body).on('touchstart', '#wheater', function(e) {
    startCoords = endCoords = e.originalEvent.targetTouches[0];
  }).on('touchmove', function(e) {
    endCoords = e.originalEvent.targetTouches[0];
    var isForward = (startCoords.pageX - endCoords.pageX) > 0;
    if (isForward) {
      $('a.right').trigger('click');
     } else {
       $('a.left').trigger('click');
     }
  });

  return $;
});