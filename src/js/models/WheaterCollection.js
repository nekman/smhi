define([
  'backbone',
  '../utils/DateUtils'
],
function(Backbone, DateUtils) {
  'use strict';
  
  var WheaterModel = Backbone.Model.extend({
    
    categoryName: {
      0: 'Ingen nederbörd',
      1: 'Snö',
      2: 'Snöblandat regn',
      3: 'Regn',
      4: 'Duggregn',
      5: 'Snö',
      6: 'Snö'
    },

    parse: function(res) {
      this.fullDate = new Date(res.validTime);
      this.date = DateUtils.toDateString(this.fullDate);
      this.time = DateUtils.toTimeString(this.fullDate);
      this.temperature = { value: res.t, unit: '&deg;' };
      this.humidity = { value: res.r, unit: '%' };
      this.probably_thunderstorm = { value: res.tstm, unit: '%' };
      this.wind = { value: res.ws, unit: 'm/s' };
      this.category = { value: this.categoryName[res.pcat], unit: '' };
      this.rainfall = { value: res.pit, unit: 'mm/h' };
      
      return this;
    }
  });
  
  return Backbone.Collection.extend({
    model: WheaterModel,
    
    initialize: function(data) {
      this.lat = data.lat;
      this.lon = data.lon;
    },
    
    parse: function(res) {
      return res.timeseries;
    }
  });

});