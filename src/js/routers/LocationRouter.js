define([
  './BaseRouter'
],
function(BaseRouter) {
  'use strict';

  /*
   * Routes for everything under '/loc'
   */
  return BaseRouter.extend({
    routes: {
      ':lat/:lon/next/:id': 'next',
      ':lat/:lon/show/:id': 'show',
      ':lat/:lon/prev/:id': 'prev'
    }
  });

});