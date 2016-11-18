(function () {
  'use strict';
  angular
  .module('app')
  .component('favoritesController', {
    templateUrl: 'app/favorites/favorites.html',
    controller: favoritesController
  });
  function favoritesController() {
    var vm = this;
    vm.properties = angular.fromJson(localStorage.getItem('propertiesStorage'));
  }
})();
