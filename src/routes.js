angular
.module('app')
.config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');

  $stateProvider
  .state('dashboard', {
    url: '/dashboard',
    templateUrl: '/app/layouts/dashboardLayout.html',
    controller: 'DashboardController',
    controllerAs: 'vm'
  })

  .state('dashboard.property', {
    url: '/property',
    component: 'propertyController'
  })

  .state('dashboard.favorites', {
    url: '/favorites',
    component: 'favoritesController'
  })

  .state('dashboard.propertyDetails', {
    url: '/property/:id',
    component: 'propertyDetailsController'
  })

  .state('dashboard.propertyMap', {
    url: '/property-map',
    component: 'propertyMapController'
  })

  .state('signIn', {
    url: '/signIn',
    component: 'signInController'
  });

  $urlRouterProvider.otherwise(function ($injector, $location) {
    if (sessionStorage.getItem('userIsLogged')) {
      $location.path('/dashboard/property');
    } else {
      $location.path('/signIn');
    }
  });
}
