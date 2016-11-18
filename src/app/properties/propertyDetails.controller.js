(function () {
  'use strict';
  angular
  .module('app')
  .component('propertyDetailsController', {
    templateUrl: 'app/properties/propertyDetails.html',
    controller: propertyDetailsController
  });
  function propertyDetailsController($scope, propertyService, uiGmapIsReady, $stateParams) {
    var vm = this;
    vm.addToFav = addToFav;
    vm.removeFav = removeFav;

    var id = $stateParams.id;
    var propertiesStorage = angular.fromJson(localStorage.getItem('propertiesStorage'));
    var indexFav = null;
    var geoData = angular.fromJson(propertyService.getLocationCache());

    vm.control = {};
    vm.map = {center: {latitude: geoData.lat, longitude: geoData.lng}, zoom: 12, bounds: {}};
    vm.options = {scrollwheel: false};
    vm.markers = [];

    activate();

    function activate() {
      propertyService.query(id).then(function (result) {
        vm.property = result;
        var marker = {
          id: 0,
          latitude: result.listing.lat,
          longitude: result.listing.lng
        };
        vm.markers.push(marker);
        vm.map.center.latitude = result.listing.lat;
        vm.map.center.longitude = result.listing.lng;

        uiGmapIsReady.promise().then(function () {
          vm.control.refresh();
        });
        if (propertiesStorage === null) {
          vm.isFavorite = false;
        } else {
          vm.isFavorite = _isFavorite(propertiesStorage);
        }
      }, function () {
      });
    }

    function addToFav() {
      if (propertiesStorage === null) {
        propertiesStorage = [vm.property];
      } else {
        propertiesStorage.push(vm.property);
      }

      localStorage.setItem('propertiesStorage', angular.toJson(propertiesStorage));
      vm.isFavorite = _isFavorite(propertiesStorage);
    }

    function removeFav() {
      if (indexFav !== null) {
        propertiesStorage.splice(indexFav, 1);
        localStorage.setItem('propertiesStorage', angular.toJson(propertiesStorage));
        vm.isFavorite = false;
      }
    }

    var _isFavorite = function (properties) {
      var result = false;
      for (var i = 0; i < properties.length; i++) {
        if (properties[i].listing.id === vm.property.listing.id) {
          result = true;
          indexFav = i - 1;
        }
      }

      return result;
    };
  }
})();
