(function () {
  'use strict';
  angular
  .module('app')
  .component('propertyMapController', {
    templateUrl: 'app/properties/propertyMap.html',
    controller: propertyMapController
  });
  function propertyMapController(propertyService, uiGmapIsReady, $log) {
    var ctrl = this;
    var geoData = angular.fromJson(propertyService.getLocationCache());
    var getPropertiesList = function () {
      propertyService.getPropertiesByLocation(geoData.location).then(function (result) {
        ctrl.result = result;
        var markers = [];
        angular.forEach(ctrl.result.search_results, function (value, key) {
          markers.push(createMarker(key, ctrl.map.bounds, value));
        });
        ctrl.markers = markers;
      }, function (err) {
        $log(err);
      });
    };
    getPropertiesList();

    ctrl.readyForMap = true;
    ctrl.control = {};
    uiGmapIsReady.promise().then(function () {
      ctrl.control.refresh();
    });
    ctrl.map = {center: {latitude: geoData.lat, longitude: geoData.lng}, zoom: 12, bounds: {}};
    ctrl.options = {scrollwheel: false};

    var createMarker = function (i, bounds, place, idKey) {
      if (!idKey) {
        idKey = "id";
      }
      var latitude = place.listing.lat;
      var longitude = place.listing.lng;
      var ret = {
        latitude: latitude,
        longitude: longitude,
        title: place.pricing_quote.nightly_price + ' ' +
        place.pricing_quote.listing_currency,
        show: true
      };

      ret[idKey] = i;
      return ret;
    };

    ctrl.markers = [];
  }
})();
