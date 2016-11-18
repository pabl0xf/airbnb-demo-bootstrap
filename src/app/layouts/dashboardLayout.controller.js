(function () {
  'use strict';
  angular
  .module('app')
  .controller('DashboardController', DashboardController);
  function DashboardController($state) {
    var vm = this;

    vm.name = sessionStorage.getItem('name');
    vm.avatar = sessionStorage.getItem('avatar');
    vm.signOut = function () {
      sessionStorage.removeItem('userIsLogged');
      $state.go('signIn');
    };
  }
})();
