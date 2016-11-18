angular
.module('app')
.component('favorites', {
  templateUrl: 'app/favorites/favorites.html',
  controller: function () {
    var ctrl = this;
    ctrl.properties = angular.fromJson(localStorage.getItem('propertiesStorage'));
  }
});
