define([
  'backbone',
  'jquery',
  'lodash',
  '../models/Place'
],
function(Backbone, $, _, Place) {
  'use strict';

  var View = Backbone.View.extend({
    el: '#place',
    template: $('#place_tmpl').html(),

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.model.fetch();
    },

    render: function() {
      var json = this.model.toJSON(),
          viewModel = json.geonames[0] || {},
          markup = _.template(this.template, viewModel);

      this.$el.html(markup);

      return this;
    }
  }),
  
  factory = {
    create: function(coords) {
      new View({ model: new Place(coords) });
    }
  };

  return factory;
});