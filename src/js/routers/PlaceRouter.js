define([
  './BaseRouter'
],
function(BaseRouter) {
  'use strict';

  /*
   * Routes for everything under '/place'
   */
  return BaseRouter.extend({
    routes: {
      ':place/next/:id': 'next',
      ':place/prev/:id': 'prev'
    }
  });

});