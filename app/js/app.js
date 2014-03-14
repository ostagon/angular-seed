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
	$routeProvider.when('/autocomplete',	 {templateUrl: 'views/autocompleteView.html', controller: 'AutocompleteCtrl'});
	$routeProvider.when('/simple',			 {templateUrl: 'views/simpleView.html', 	  controller: 'SimpleCtrl'});
	$routeProvider.when('/greenlist',		 {templateUrl: 'views/greenListView.html', 	  controller: 'GreenListCtrl'});
	$routeProvider.otherwise({redirectTo: '/greenlist'});
}]);
