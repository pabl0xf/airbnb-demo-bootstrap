(function () {
  'use strict';
  angular
  .module('app')
  .component('signInController', {
    templateUrl: 'app/sessions/signIn.html',
    controller: signInController
  });
  function signInController(Facebook, $state) {
    var getProfileInfo = function () {
      Facebook.api('/me', function (response) {
        var avatar = 'http://graph.facebook.com/' + response.id + '/picture';
        var name = response.name;

        sessionStorage.setItem('avatar', avatar);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('userIsLogged', true);
        $state.go('dashboard.property');
      });
    };
    this.login = function () {
      Facebook.login(function (response) {
        sessionStorage.setItem('userCredentials', response.authResponse);
        getProfileInfo();
      });
      this.errorMsge = 'login fail!';
    };
  };
})();
