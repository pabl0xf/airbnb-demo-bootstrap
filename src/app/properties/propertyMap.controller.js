(function () {
  'use strict';
  angular
  .module('app')
  .component('propertyMapController', {
    templateUrl: 'app/properties/propertyMap.html',
    controller: propertyMapController
  });
  function propertyMapController(propertyService, uiGmapIsReady, $log) {
    var vm = this;
    var geoData = angular.fromJson(propertyService.getLocationCache());
    vm.readyForMap = true;
    vm.control = {};
    vm.markers = [];
    vm.map = {center: {latitude: geoData.lat, longitude: geoData.lng}, zoom: 12, bounds: {}};
    vm.options = {scrollwheel: false};

    activate();

    function activate() {
      propertyService.getPropertiesByLocation(geoData.location).then(function (result) {
        vm.result = result;
        var markers = [];
        angular.forEach(vm.result.search_results, function (value, key) {
          markers.push(createMarker(key, vm.map.bounds, value));
        });
        vm.markers = markers;
      }, function (err) {
        $log(err);
      });
    }

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
  }
})();
