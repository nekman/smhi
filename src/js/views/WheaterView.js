define([
  'backbone',
  'lodash',
  'jquery'
], function(Backbone, _, $) {
  'use strict';

  var isLoadingGPSAndWheater = function($el) {
    return $el.hasClass('loading');
  };

  return Backbone.View.extend({
    el: '#wheater',
    template: $('#wheater_tmpl').html(),
    
    events: {
      'click li.next a': 'next',
      'click li.previous a': 'prev'
    },

    initialize: function() {
      this.$el.off('click').find('a').off('click');
      this.render();
    },

    prev: function(e) {
      e.preventDefault();
      Backbone.history.loadUrl(e.target.pathname + '/prev/' + this.model.get('cid'));
    },

    next: function(e) {
      e.preventDefault();
      Backbone.history.loadUrl(e.target.pathname + '/next/' + this.model.get('cid'));
    },

    render: function() {
      var markup = _.template(this.template, this.model.toJSON()),
          $el = this.$el;
      
      if (isLoadingGPSAndWheater($el)) {
        $el.removeClass('loading').fadeOut().promise().done(function() {
          $el.empty().html(markup).fadeIn();
        });

        return;
      }
        
      $el.empty().html(markup);

      return this;
    }
  });
});