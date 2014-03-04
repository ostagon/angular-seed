'use strict';

// Declare app level module which depends on filters, and services
angular.module('GreenListApp', [
	'ngRoute',
	'GreenListApp.filters',
	'GreenListApp.services',
	'GreenListApp.directives',
	'GreenListApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/view1', {templateUrl: 'views/partial1.html', controller: 'MyCtrl1'});
	$routeProvider.when('/view2', {templateUrl: 'views/partial2.html', controller: 'MyCtrl2'});
	$routeProvider.when('/autocomplete', {templateUrl: 'views/autocompleteView.html', controller: 'AutocompleteCtrl'});
	$routeProvider.when('/simple', {templateUrl: 'views/simpleView.html', controller: 'SimpleCtrl'});
	$routeProvider.otherwise({redirectTo: '/view1'});
}]);
