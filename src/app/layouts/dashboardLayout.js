angular
  .module('app')
  .controller('DashboardController', function ($state) {
      this.name = sessionStorage.getItem('name');
      this.avatar = sessionStorage.getItem('avatar');
      this.signOut = function(){
        sessionStorage.removeItem('userIsLogged');
        $state.go('login');
      }
  });
