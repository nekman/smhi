define([
	'backbone',
  'lodash',
  'jquery'
], function(Backbone, _, $) {
  'use strict';

  return Backbone.View.extend({
    el: 'article:first',
    template: $('#error_tmpl').html(),

    initialize: function() {
      this.render();
    },

    render: function() {
      // View model must contain a "message" attribute.
      var viewModel = this.model && this.model.message ? this.model : { message: 'Unknown error' },
          markup = _.template(this.template, viewModel);

      this.$el.empty().html(markup);

      return this;
    }
  });

});