define([
  'carousel',
  'backbone',
  'lodash',
  'text!./templates/carouselTemplate.html'
],
function($, Backbone, _, tmpl) {
  'use strict';

  var CarouselView = Backbone.View.extend({
    el: 'footer',

    events: {
      'click .owl-item': 'next',
    },

    initialize: function(collection) {
      this.collection = collection;
      this.$el.off('click').find('.owl-item').off('click');
      this.render();
    },

    next: function(e) {
      e.preventDefault();

      var cid = $(e.target).parents('.owl-item:first')
                           .find('.wheateritem')
                           .attr('cid');
      if (cid) {
        Backbone.history.loadUrl(location.pathname.substr(1) + '/show/' + cid);
      }
    },

    render: function() {
      var map = {},
      
      items = _.filter(this.collection.models, function(model) {
        if (!map[model.date]) {
          map[model.date] = model;

          return model;
        }
      }),

      markup = _.template(tmpl, { items: items });

      this.$el
          .empty()
          .append(markup)
          .find('.owl-carousel')
          .owlCarousel({
            itemsCustom: [[0, 2], [400, 4], [700, 6], [1000, 8], [1200, 10], [1600, 16]]
          });
    }

  });

  return CarouselView;

});