'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .service('session', function () {
      // Service used for shared state between controllers
      var query = "";
      return {
          getQuery : function() {
              return query;
          },
          setQuery : function(newQuery) {
              query = newQuery;
          }
     };
  })
  .controller('DomainList', ['$scope', '$http', '$log', '$routeParams', 'session', '$location', '$timeout',function($scope, $http, $log, $routeParams, session, $location, $timeout) {

    function search(query) {
        $log.log(query)
        if (query) {
          $http.jsonp("https://domai.nr/api/json/search?client_id=socks&callback=JSON_CALLBACK&q=" + query).success(function(data){
            $scope.results = data.results;
          })
          $location.search("query", query)
        }
        else {
          $scope.results = null;
          $location.search("query", null)
        }
    }

    if ($routeParams.query) {
      search($routeParams.query)
      $scope.query = $routeParams.query
      session.setQuery($routeParams.query)
    }

    var wait;
    $scope.$watch('query', function(query){
        if (wait) {
            $timeout.cancel(wait);
        }
        wait = $timeout(function() {
            search($scope.query)
            session.setQuery($scope.query)
        }, 250);
    })

  }])
  .controller('DomainDetail', ['$scope', '$http', '$log', '$routeParams', 'session', function($scope, $http, $log, $routeParams, session){

    var lastQuery = session.getQuery();

    if (lastQuery) {
      $scope.lastQueryURL = "./#/search?query=" + lastQuery
    }
    else {
      $scope.lastQueryURL = "./#/search"
    }

    $http.jsonp("https://domai.nr/api/json/info?client_id=socks&callback=JSON_CALLBACK&q=" + $routeParams.domain)
    .success(function(data){
      $scope.result = data;
    })

  }]);
