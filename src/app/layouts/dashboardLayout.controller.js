(function () {
  'use strict';
  angular
  .module('app')
  .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$state'];

  function DashboardController($state) {
    var vm = this;

    vm.signOut = signOut;
    vm.name = sessionStorage.getItem('name');
    vm.avatar = sessionStorage.getItem('avatar');

    function signOut() {
      sessionStorage.removeItem('userIsLogged');
      $state.go('signIn');
    }
  }
})();
