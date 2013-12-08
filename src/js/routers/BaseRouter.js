define([
  './../utils/vendor/Backbone.Subroute',
  './../utils/DateUtils',
  './../views/WheaterView'
],
function(BackboneSubRoute, DateUtils, WheaterView) {
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

  return BackboneSubRoute.extend({

    initialize: function(collection) {
      this.collection = collection;
      this.first();
    },

    first: function() {
      var time = DateUtils.toHourString(),

      model = this.collection.find(function(model) {
        return DateUtils.toHourString(model.get('fullDate')) === time;
      });

      new WheaterView({ model: model || this.collection.first() });
    },
    
    last: function() {
      new WheaterView({ model: this.collection.last() });
    },
    
    prev: function(lat, lon, id) {
      nav.apply(this, [to.prev, id, this.last]);
    },

    next: function(lat, lon, id) {
      nav.apply(this, [to.next, id, this.first]);
    },

    show: function(lat, lon, id) {
      var model = this.collection.get(id);
      if (model) {
        new WheaterView({ model: model });
      }
    }
  });
});