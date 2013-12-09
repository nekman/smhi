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

    events: {
      'keyup': 'submit'
    },

    submit: function(e) {
      if (e.which === 13) {
        this.$el.blur();
        Backbone.history.loadUrl('/place/' + this.$el.val());
      }
    },

    initialize: function() {
      var $el = this.$el;
      
      $el.off('keyup').off('focus').off('mouseup')
      .on('focus', function() {
        $el.select();
      }).on('mouseup', function (e) {
        e.preventDefault();
      });

      this.listenTo(this.model, 'change', this.render);
      this.model.fetch();
    },

    render: function() {
      var json = this.model.toJSON(),
          viewModel = json.geonames[0] || {};

      this.$el.val(viewModel.name);

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