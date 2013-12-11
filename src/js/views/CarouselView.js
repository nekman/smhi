define([
  'carousel',
  'backbone',
  'lodash',
  '../utils/IconUtils',
  'text!./templates/carouselTemplate.html'
],
function($, Backbone, _, IconUtils, tmpl) {
  'use strict';

  var CarouselView = Backbone.View.extend({
    el: '#scroll',

    events: {
      'click .owl-item': 'show',
    },

    initialize: function(collection) {
      this.collection = collection;
      this.$el.off('click').find('.owl-item').off('click');
      this.render();
    },

    show: function(e) {
      e.preventDefault();

      var cid = $(e.target).closest('.owl-item')
                           .find('.wheateritem')
                           .attr('cid');
      if (cid) {
        Backbone.history.loadUrl(location.pathname.substr(1) + '/show/' + cid);
      }
    },

    render: function() {
      var viewModels = _.map(this.collection.groupModelsByDayAndTime(), function(model) {
        model.icon = IconUtils.getWheaterIcon(
          model.get('wheater').value,
          model.get('cloud').value
        );
          
        return model;
      }),

      markup = _.template(tmpl, { items: viewModels });

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