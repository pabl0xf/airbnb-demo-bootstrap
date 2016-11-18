(function () {
  'use strict';
  angular
  .module('app')
  .component('propertyController', {
    templateUrl: 'app/properties/property.html',
    controller: propertyController
  });

  propertyController.$inject = ['$scope', 'usSpinnerService', 'propertyService'];

  function propertyController($scope, usSpinnerService, propertyService) {
    var vm = this;
    var userGeoData = {
      lat: 34.0201812,
      lng: -118.6919258,
      location: 'Los Angeles, CA'
    };

    activate();

    function activate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          userGeoData.lat = position.coords.latitude;
          userGeoData.lng = position.coords.longitude;
          getLocationName();
        }, function () {
          getPropertiesList();
        });
      } else {
        getPropertiesList();
      }
    }

    var getLocationName = function () {
      propertyService.getLocationName(userGeoData.lat, userGeoData.lng).then(function (result) {
        userGeoData.location = result.results[0].formatted_address;
        getPropertiesList();
      }, function () {
        getPropertiesList();
      });
    };
    var getPropertiesList = function () {
      propertyService.setLocationCache(angular.toJson(userGeoData));
      propertyService.getPropertiesByLocation(userGeoData.location).then(function (result) {
        vm.result = result;
        usSpinnerService.stop('spinner-1');
      }, function () {
        usSpinnerService.stop('spinner-1');
      });
    };
  }
})();
