'use strict';

/* Controllers */

angular.module('GreenListApp.controllers', []).
	controller('MyCtrl1', [function() {

	}])
	.controller('MyCtrl2', [function() {

	}])
	.controller('AutocompleteCtrl', [function($scope) {
		$scope.names = ["Аристид", "Фенозон", "Анигар", "Протогорк"];
	}]);