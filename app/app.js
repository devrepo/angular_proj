'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
    'ngSanitize',
  'LoginController',
  'QuizController',
  'ResultController',
  'authenticationService',
  'QuizDataService'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    }).
    when('/register', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    }).
    when('/takequiz/:qno', {
        templateUrl: 'views/quiz.html',
        controller: 'QuizCtrl'
    }).
    when('/results', {
        templateUrl: 'views/results.html',
        controller: 'ResultCtrl'
    }).
    otherwise({redirectTo: '/login'});
}]);
