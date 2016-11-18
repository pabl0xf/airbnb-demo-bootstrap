(function () {
  'use strict';
  angular.module('app')
  .factory('propertyService', function ($resource) {
    var property = $resource(localStorage.getItem('APIUrl') + '/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty');
    var propertyDetails = $resource(localStorage.getItem('APIUrl') + '/v2/listings/:id?client_id=3092nxybyb0otqw18e8nh5nty&_format=v1_legacy_for_p3');
    var geoCodeResource = $resource('https://maps.googleapis.com/maps/api/geocode/json');

    return {
      getPropertiesByLocation: function (location) {
        return property.get({_limit: 30, location: location}).$promise;
      },
      query: function (id) {
        return propertyDetails.get({id: id}).$promise;
      },
      getLocationCache: function () {
        return sessionStorage.getItem('location');
      },
      setLocationCache: function (location) {
        sessionStorage.setItem('location', location);
      },
      getLocationName: function (lat, lng) {
        /*  eslint-disable camelcase */
        return geoCodeResource.get({latlng: lat + ' ' + lng, result_type: 'locality|country', key: 'AIzaSyB-rEjKbLHQLKxE89D3JPYsKpar2wrNUPE'}).$promise;
        /*  eslint-enable camelcase */
      }
    };
  });
})();
