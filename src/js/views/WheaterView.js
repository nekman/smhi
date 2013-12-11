define([
  'backbone',
  'lodash',
  'jquery',
  '../utils/IconUtils',
  'text!./templates/wheaterTemplate.html'
], function(Backbone, _, $, IconUtils, tmpl) {
  'use strict';
  
  var isLoadingGPSAndWheater = function($el) {
    return $el.hasClass('loading');
  };

  return Backbone.View.extend({
    el: '#wheater',

    events: {
      'click a.right': 'next',
      'click a.left': 'prev'
    },

    initialize: function() {
      this.$el.off('click').find('a').off('click');
      this.render();
    },

    prev: function(e) {
      e.preventDefault();
      Backbone.history.loadUrl(location.pathname.substr(1) + '/prev/' + this.model.get('cid'));
    },

    next: function(e) {
      e.preventDefault();
      Backbone.history.loadUrl(location.pathname.substr(1) + '/next/' + this.model.get('cid'));
    },

    render: function() {
      var viewmodel = _.extend({
        rotation: IconUtils.getArrowRotation(this.model.get('windDirection').value),
        icon: IconUtils.getWheaterIcon(this.model.get('wheater').value, this.model.get('cloud').value)
      }, this.model.toJSON()),

      markup = _.template(tmpl, viewmodel),
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