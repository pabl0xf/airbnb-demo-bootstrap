angular
.module('app')
.component('favorites', {
  templateUrl: 'app/favorites/favorites.html',
  controller: function (usSpinnerService) {
    var ctrl = this;
    ctrl.properties = JSON.parse(localStorage.getItem('propertiesStorage'));
  }
});
