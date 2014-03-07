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

/* Контроллер для списка покупок */
controller('GreenListCtrl', ['$scope', 'Items', function($scope, Items) {
	$scope.currentItem = {};
	
	// sorts
	$scope.defaultSortField = "name";
	$scope.sortOrders = {
		name: true,
		count: true		
	};
	$scope.sortField = $scope.defaultSortField;
	
	// первая загрузка
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
	
	$scope.deleteItem = function(id) {
		Items.remove({ itemId: id}, function(item) {
			console.log("Delete item with id = " + id);
			updateList();
		});
	};
	
	function updateList() {
		$scope.items = Items.list();
		$scope.currentItem.name = "";
		$scope.currentItem.count = "";		
	};
	
	// сортировка по имени филда
	$scope.sortBy = function(field) {
		try {
			$scope.sortOrders[field] = !$scope.sortOrders[field];
			$scope.sortField = field;
		} catch(e) {
			console.err("Sort problems");
		}
	};
	
	// получить текущий порядок сортировки по имени поля сортировки
	$scope.sortOrder = function() {
		var field = $scope.sortField;
		try {
			return $scope.sortOrders[field] ? "+" + field : "-" + field;
		} catch(e) {
			$scope.sortField = $scope.defaultSortField;
			return $scope.sortField;
		}
	};
	
	
}]);
	