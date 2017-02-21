angular.module('BeMEAN', [
  'ngAnimate', 'ngMessages', 'ngRoute', 'User'
])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true); //Para tirar o Hashbang
    $routeProvider
      .when('/', {
        templateUrl: 'views/index.html'
      })
      .otherwise({redirectTo: '/'})
  }])
