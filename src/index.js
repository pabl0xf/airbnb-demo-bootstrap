angular
  .module('app', ['ui.router', 'ngResource', 'facebook', 'uiGmapgoogle-maps', 'angularSpinner'])
  .config(function(FacebookProvider) {
    // Set your appId through the setAppId method or
    // use the shortcut in the initialize method directly.
    FacebookProvider.init('227376797691336');
 })

.run(function($http) {
  $http.get('properties.json').success(function(data) {
     angular.element(window.document)[0].title = data.title;
     localStorage.setItem('APIUrl', data.APIUrl);
  });
});
