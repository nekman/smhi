define([
  'backbone',
  'lodash',
  'jquery',
  'text!./templates/errorTemplate.html'
], function(Backbone, _, $, tmpl) {
  'use strict';

  return Backbone.View.extend({
    el: '#wheater',
    
    initialize: function() {
      this.render();
    },

    render: function() {
      // View model must contain a "message" attribute.
      var viewModel = this.model && this.model.message ? this.model : { message: 'Fel' },
          markup = _.template(tmpl, viewModel);

      this.$el.empty().html(markup);

      return this;
    }
  });

});