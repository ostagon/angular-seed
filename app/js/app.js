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
	$routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
	$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
	$routeProvider.when('/autocomplete', {templateUrl: 'partials/autocompleteView.html', controller: 'AutocompleteCtrl'});
	$routeProvider.otherwise({redirectTo: '/view1'});
}]);
