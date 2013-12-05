define([
  'backbone',
  'lodash',
  'jquery',
  'text!./templates/errorTemplate.html'
], function(Backbone, _, $, tmpl) {
  'use strict';

  return Backbone.View.extend({
    el: 'article:first',
    
    initialize: function() {
      this.render();
    },

    render: function() {
      // View model must contain a "message" attribute.
      var viewModel = this.model && this.model.message ? this.model : { message: 'Unknown error' },
          markup = _.template(tmpl, viewModel);

      this.$el.empty().html(markup);

      return this;
    }
  });

});