angular
.module('app')
.component('propertyMap', {
  templateUrl: 'app/propertyMap/propertyMap.html',
  controller: function (propertyService, uiGmapIsReady) {
    var ctrl = this;
    var geoData = JSON.parse(propertyService.getLocationCache());
    var userCoords = {
      lat: 34.0201812,
      lng: -118.6919258
    };
    var getPropertiesList = function() {
      propertyService.getPropertiesByLocation(geoData.location).then(function (result) {
        ctrl.result = result;
        var markers = [];
        angular.forEach(  ctrl.result.search_results , function(value, key) {
          markers.push(createMarker(key, ctrl.map.bounds, value));
        });
        ctrl.markers = markers;
      }, function(err){
        console.log(err);
      });

    }
    getPropertiesList();

    ctrl.readyForMap = true;
    ctrl.control = {};
    uiGmapIsReady.promise().then(function (maps) {
      ctrl.control.refresh();
    });
    ctrl.map = {center: {latitude: geoData.lat, longitude: geoData.lng }, zoom: 12, bounds: {}};
    ctrl.options = {scrollwheel: false};

    var createMarker = function (i, bounds, place, idKey) {
      if (idKey == null) {
        idKey = "id";
      }
      var latitude = place.listing.lat;
      var longitude =  place.listing.lng;
      var ret = {
        latitude: latitude,
        longitude: longitude,
        title: place.pricing_quote.nightly_price +' '
        +place.pricing_quote.listing_currency,
        show: true
      };

      ret[idKey] = i;
      return ret;
    };

    ctrl.markers = [];
  }
});
