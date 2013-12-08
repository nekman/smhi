define('google', function() {
  return window.google;
});

require({
  paths: {
    carousel: '//cdn.jsdelivr.net/jquery.owlcarousel/1.31/owl.carousel.min',
    jquery: '//code.jquery.com/jquery-2.0.3.min',
    backbone: '//cdn.jsdelivr.net/backbonejs/1.1.0/backbone-min',
    lodash: '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.3.0/lodash.min',
    text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text.min'
  },
  
  shim: {
    carousel: {
      deps: ['jquery'],
      exports: 'jQuery'
    },
    backbone: {
      deps: ['jquery', 'lodash'],
      exports: 'Backbone'
    },
    google: {
      exports: 'google'
    }
  }

}, ['./routers/AppRouter', 'map']);