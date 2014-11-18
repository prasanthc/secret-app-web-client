var secretApp = angular.module("secretApp", ['ngRoute', 'ui.bootstrap']);

secretApp.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
            templateUrl: 'post-secrets.html',
            controller: 'homeCtrl'
        })
        .when('/search', {
            templateUrl: 'search-page.html',
            controller: 'searchCtrl'
        })
}])
