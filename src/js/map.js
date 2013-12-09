define(['google'], function(google) {
  'use strict';

  var MAP_TYPE_ID = 'Styled',

  styles = [{
    stylers: [
      { saturation: -200 },
      { lightness: 11 },
      { invert_lightness: false },
      { gamma: 0.97 }
    ]
  }],

  icon = {
    /* From: http://map-icons.com/ */
    path: 'M0-165c-27.618 0-50 21.966-50 49.054C-50-88.849 0 0 0 0s50-88.849 50-115.946C50-143.034 27.605-165 0-165z',
    fillColor: '#333',
    fillOpacity: 1,
    strokeColor: '#eee',
    strokeWeight: 2,
    scale: 1/4
  },

  options = {
    mapTypeControlOptions: {
      mapTypeIds: [MAP_TYPE_ID]
    },
    zoom: 16,
    disableDefaultUI: true,
    mapTypeId: MAP_TYPE_ID
  };

  return {
    create: function(coords) {
      var position = new google.maps.LatLng(coords.lat, coords.lon),
          map = new google.maps.Map(document.getElementById('map'), options);

      map.mapTypes.set(MAP_TYPE_ID,
        new google.maps.StyledMapType(styles, { name: MAP_TYPE_ID })
      );

      map.setCenter(position);
      var marker = new google.maps.Marker({
        position: position,
        map: map,
        /*icon: icon,*/
        animation: google.maps.Animation.DROP,
        draggable: true
      });

      google.maps.event.addDomListener(window, 'resize', function() {
          map.setCenter(position);
      });
    }
  };
});
