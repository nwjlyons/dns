'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.filters',
  'myApp.services',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'partials/domain_list.html',
    controller: 'DomainList',
    reloadOnSearch:false
    });
  $routeProvider.when('/domains/:domain', {
    templateUrl: 'partials/domain_detail.html',
    controller: 'DomainDetail'
    });
  $routeProvider.otherwise({
    redirectTo: '/search'
    });
}]);
