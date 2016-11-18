(function () {
  'use strict';
  angular.module('app')
  .factory('propertyService', propertyService);
  function propertyService($resource) {
    var property = $resource(localStorage.getItem('APIUrl') + '/v2/search_results?client_id=3092nxybyb0otqw18e8nh5nty');
    var propertyDetails = $resource(localStorage.getItem('APIUrl') + '/v2/listings/:id?client_id=3092nxybyb0otqw18e8nh5nty&_format=v1_legacy_for_p3');
    var geoCodeResource = $resource('https://maps.googleapis.com/maps/api/geocode/json');
    var service = {
      getPropertiesByLocation: getPropertiesByLocation,
      query: query,
      getLocationCache: getLocationCache,
      setLocationCache: setLocationCache,
      getLocationName: getLocationName
    };
    return service;

    function getPropertiesByLocation(location) {
      return property.get({_limit: 30, location: location}).$promise;
    }
    function query(id) {
      return propertyDetails.get({id: id}).$promise;
    }
    function getLocationCache() {
      return sessionStorage.getItem('location');
    }
    function setLocationCache(location) {
      sessionStorage.setItem('location', location);
    }
    function getLocationName(lat, lng) {
      /*  eslint-disable camelcase */
      return geoCodeResource.get({latlng: lat + ' ' + lng, result_type: 'locality|country', key: 'AIzaSyB-rEjKbLHQLKxE89D3JPYsKpar2wrNUPE'}).$promise;
      /*  eslint-enable camelcase */
    }
  }
})();
