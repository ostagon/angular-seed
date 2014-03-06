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
	$scope.currentItem = {};
	updateList();
	
	$scope.createItem = function() {
		if($scope.currentItem) {
			console.log($scope.currentItem);
			Items.create({ name: $scope.currentItem.name, count: $scope.currentItem.count}).$promise.then( 
					function (item) {
						updateList();
					},
					function (error) {
						console.log("Error with create");
					}
				);
		}
	};
	
	$scope.deleteItem = function() {
		console.log("Delete item stub");
	};
	
	function updateList() {
		$scope.items = Items.list();
		$scope.currentItem.name = "";
		$scope.currentItem.count = "";		
	};
	
}]);
	