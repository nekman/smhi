define([
  'backbone',
  'lodash',
  'jquery'
], function(Backbone, _, $) {
  'use strict';

  var browser_vendor_prefixes = [
    '-webkit-',
    '-moz-',
    '-ms-',
    '-o-',
    '' /* "standard" */
  ],

  wheaterIcons = {
    1: 'wi-snow',
    2: 'wi-rain-mix',
    3: 'wi-rain',
    4: 'wi-sprinkle',
    5: 'wi-snow',
    6: 'wi-snow'
  },

  cloudIcons = {
    0: 'wi-day-sunny',
    1: 'wi-day-sunny',
    2: 'wi-day-sunny-overcast',
    3: 'wi-day-sunny-overcast',
    4: 'wi-day-cloudy',
    5: 'wi-day-cloudy',
    6: 'wi-cloudy',
    7: 'wi-cloudy',
    8: 'wi-cloudy'
  },

  /* Returns a string with CSS3 rotation for all browsers */
  getArrowRotation = function(windDirection) {
    return _.map(browser_vendor_prefixes, function(prefix) {
        return [prefix, 'transform: rotate(', windDirection, 'deg)'].join('');
    }).join(';');
  },

  getWheaterIcon = function(wheater, cloud) {
    var wheaterIcon = wheaterIcons[wheater];

    if (!wheaterIcon) {
      return cloudIcons[cloud];
    }

    return wheaterIcon;
  },
  
  isLoadingGPSAndWheater = function($el) {
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
      var viewmodel = _.extend({
        rotation: getArrowRotation(this.model.get('windDirection').value),
        icon: getWheaterIcon(this.model.get('wheater').value, this.model.get('cloud').value)
      }, this.model.toJSON());

      var markup = _.template(this.template, viewmodel),
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