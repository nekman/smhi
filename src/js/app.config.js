require({
  paths: {
    jquery: '//code.jquery.com/jquery-2.0.3.min',
    backbone: '//cdn.jsdelivr.net/backbonejs/1.1.0/backbone-min',
    lodash: '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.3.0/lodash.min'
  },
  
  shim: {
    backbone: {
      deps: ['jquery', 'lodash'],
      exports: 'Backbone'
    }
  }
}, ['app']);