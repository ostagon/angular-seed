'use strict';

/* Controllers */

angular.module('GreenListApp.controllers', []).
	
controller('MyCtrl1', [function() {

}]).

controller('MyCtrl2', [function() {

}]).

controller('AutocompleteCtrl', [function() {
		//$scope.names = ["Аристид", "Фенозон", "Анигар", "Протогорк"];
}]).

controller('SimpleCtrl', function() {

}).

controller('GreenListCtrl', ['$scope', 'Items', function($scope, Items) {
	$scope.items = Items.list();
	
	$scope.deleteItem = function() {
		console.log("Delete item stub");
	};
	
}]);
	