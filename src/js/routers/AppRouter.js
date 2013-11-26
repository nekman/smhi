define([
  'backbone',
  './../views/WheaterView'
], function(Backbone, WheaterView) {
  'use strict';

  var to = {
    next: function(index) {
      return index + 1;
    },
    
    prev: function(index) {
      return index - 1;
    }
  },
  
  nav = function(directionFn, id, fallbackFn) {
    var model = this.collection.get(id);

    if (!model) {
      fallbackFn.apply(this, []);
      return;
    }
    
    var index = this.collection.indexOf(model),
        next = this.collection.at(directionFn(index));
    
    if (!next) {
      fallbackFn.apply(this, []);
      return;
    }
    
    new WheaterView({ model: next });
  };
  
  return Backbone.Router.extend({
    
    routes: {
      '': 'index',
      'loc/:lat/:lng': 'location',
      'loc/:lat/:lng/next/:id': 'next',
      'loc/:lat/:lng/prev/:id': 'prev',
      '*actions': 'defaultAction' // matches http://example.com/#anything-here
    },

    initialize: function(collection) {
      this.collection = collection;
      if (this.collection) {
        this.first();
      }
    },

    first: function() {
      new WheaterView({ model: this.collection.first() });
    },
    
    last: function() {
      new WheaterView({ model: this.collection.last() });
    },
    
    prev: function(lat, lng, id) {
      nav.apply(this, [to.prev, id, this.last]);
    },
    
    next: function(lat, lng, id) {
      nav.apply(this, [to.next, id, this.first]);
    }
  });
});