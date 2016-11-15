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
    component: 'property'
  })

  .state('dashboard.favorites', {
    url: '/favorites',
    component: 'favorites'
  })

  .state('dashboard.propertyDetails', {
    url: '/property/:id',
    component: 'propertyDetails'
  })

  .state('dashboard.propertyMap', {
    url: '/property-map',
    component: 'propertyMap'
  })

  .state('login', {
    url: '/login',
    component: 'login'
  })

  $urlRouterProvider.otherwise(function($injector, $location) {
   if(sessionStorage.getItem('userIsLogged')) {
     $location.path('/dashboard/property');
   }
   else{
     $location.path('/login');
   }
 });
}
