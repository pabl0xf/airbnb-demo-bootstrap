angular
.module('app')
.component('propertyDetails', {
  templateUrl: 'app/propertyDetails/propertyDetails.html',
  controller: function ($scope, propertyService, uiGmapIsReady, $stateParams) {
    var ctrl = this;
    var id = $stateParams.id;
    var propertiesStorage = JSON.parse(localStorage.getItem('propertiesStorage'));
    var indexFav = null;

    ctrl.control = {};
    var geoData = JSON.parse(propertyService.getLocationCache());
    ctrl.map = {center: {latitude: geoData.lat, longitude: geoData.lng }, zoom: 12, bounds: {}};
    ctrl.options = {scrollwheel: false};
    ctrl.markers = [];

    ctrl.addToFav = function(e) {

      if (propertiesStorage == null) {
        propertiesStorage = [ctrl.property];
      } else {
        propertiesStorage.push(ctrl.property);
      }

      localStorage.setItem('propertiesStorage', JSON.stringify(propertiesStorage));
      ctrl.isFavorite = _isFavorite(propertiesStorage);
    };

    ctrl.removeFav = function() {
      if (indexFav != null) {
        propertiesStorage.splice(indexFav, 1);
        localStorage.setItem('propertiesStorage', JSON.stringify(propertiesStorage));
        ctrl.isFavorite = false;
      }
    };

    var _isFavorite = function(properties) {
      var result = false;
      for (var i = 0; i < properties.length; i++) {
        if (properties[i].listing.id == ctrl.property.listing.id) {
          result = true;
          indexFav = i - 1;
        }
      }

      return result;
    };

    propertyService.query(id).then(function (result) {
      ctrl.property = result;
      var marker = {
        id: 0,
        latitude: result.listing.lat,
        longitude: result.listing.lng
      };
      ctrl.markers.push(marker);
      ctrl.map.center.latitude = result.listing.lat;
      ctrl.map.center.longitude = result.listing.lng;

      uiGmapIsReady.promise().then(function (maps) {
        ctrl.control.refresh();
      });
      if (propertiesStorage == null) {
        ctrl.isFavorite = false;
      } else {
        ctrl.isFavorite = _isFavorite(propertiesStorage);
      }
    }, function(err){
      console.log(err);
    });
  }
});
