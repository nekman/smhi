define([
  'backbone',
  'lodash',
  '../utils/DateUtils'
],
function(Backbone, _, DateUtils) {
  'use strict';

  var SMHI_GEOPOINT_URL = 'http://opendata-download-metfcst.smhi.se/api/' +
                          'category/pmp1g/version/1/geopoint/lat/{{lat}}/lon/{{lon}}/data.json',
  
  WheaterModel = Backbone.Model.extend({
    
    wheaterType: {
      0: 'Ingen nederbörd',
      1: 'Snö',
      2: 'Snöblandat regn',
      3: 'Regn',
      4: 'Duggregn',
      5: 'Snö',
      6: 'Snö'
    },

    cloudType: {
      0: 'Klart',
      1: 'Klart',
      2: 'Halvklart',
      3: 'Halvklart',
      4: 'Halvklart till mulet',
      5: 'Halvklart till mulet',
      6: 'Mulet',
      7: 'Mulet',
      8: 'Mulet'
    },

    isMiddleOfDay: function() {
      return this.time === '13:00';
    },

    parse: function(res) {
      this.wind          = { value: res.ws, unit: 'm/s' };
      this.cloud         = { value: res.tcc, name: this.cloudType[res.tcc] };
      this.wheater       = { value: res.pcat, name: this.wheaterType[res.pcat] };
      this.temperature   = { value: res.t, unit: '&deg;' };
      this.humidity      = { value: res.r, unit: '%' };
      this.rainfall      = { value: res.pit, unit: 'mm/h' };
      this.prob_thunder  = { value: res.tstm, unit: '%' };
      this.windDirection = { value: res.wd, unit: '' };

      this.fullDate      = new Date(res.validTime);
      this.date          = DateUtils.toDateString(this.fullDate);
      this.time          = DateUtils.toTimeString(this.fullDate);
      
      return this;
    }
  }),
  
  WheaterCollection = Backbone.Collection.extend({
    model: WheaterModel,
    
    initialize: function(coords) {
      this.coords = coords;
    },

    groupModelsByDayAndTime: function() {
      var dateGroups = _.groupBy(this.models, function(model) {
        return model.date;
      });

      return _.map(dateGroups, function(models) {
        var model = _.find(models, function(model) {
          return model.isMiddleOfDay();
        });

        return model || models[parseInt(models.length / 2, 10)];
      });
    },

    url: function() {
      return SMHI_GEOPOINT_URL
            .replace(/{{lat}}/, this.coords.lat)
            .replace(/{{lon}}/, this.coords.lon);
    },

    parse: function(res) {
      return res.timeseries;
    },
  });

  return WheaterCollection;
});