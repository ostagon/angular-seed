'use strict';

/* Controllers */

angular.module('GreenListApp.controllers', []).

controller('AutocompleteCtrl', [function() {
		
}]).

controller('SimpleCtrl', function() {

}).

/* Контроллер для списка покупок */
controller('GreenListCtrl', ['$scope', 'Items', 'limits', function($scope, Items, limits) {
	$scope.currentItem = {};
	
	// *** Sorts ***
	
	$scope.defaultSortField = "name";
	$scope.sortOrders = {
		name: true,
		count: true		
	};
	$scope.sortField = $scope.defaultSortField;
	
	// первая загрузка
	updateList();
	
	// *** CRUD ***
		
	$scope.createItem = function() {
		if($scope.currentItem) {
			var valid = validateItem($scope.currentItem);
			
			if (valid) {
				console.log("Create new item");
				Items.create({ name: $scope.currentItem.name, count: $scope.currentItem.count}).$promise.then( 
						function (item) {
							updateList();
						},
						function (error) {
							console.log("Error with create");
							alert("Ошибка при создании элемента на сервере!");
						}
					);
			} else {
				alert("Проверьте правильность введённых данных!");
			}
			
			return valid;
		}
		return false;
	};
	
	$scope.updateItem = function(currentItem) {
		var valid = validateItem(currentItem);
	
		if (valid) {
			var id = currentItem._id;
			Items.update({ itemId: id, name: currentItem.name, count: currentItem.count}, function(item) {
				console.log("Update item with id = " + id);
				updateList();
			});
		} else {
			alert("Проверьте правильность изменённых данных!");
		}
		
		return valid;
	}
	
	$scope.deleteItem = function(id) {
		Items.remove({ itemId: id}, function(item) {
			console.log("Delete item with id = " + id);
			updateList();
		});
	};
	
	
	function updateList() {
		$scope.items = Items.list();
		$scope.currentItem.name = "";
		$scope.currentItem.count = undefined;		
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
	
	// *** Paginate ***
	
	// номер текущей, c 1
	$scope.pageNo = 1;
	// кол-во на странице
	$scope.pageSize = 10;
	// кол-во страниц всего
	$scope.pageNum = 1;
	// кол-во элементов для пейджинга
	$scope.pageElemsNum = 1;
		
	// подсчёт кол-ва страниц
	$scope.countPageNum = function(total) {
		$scope.pageElemsNum = total;
		var count = total > 0 ? Math.ceil(total / $scope.pageSize) : 1;
		if ($scope.pageNo > count) {
			$scope.pageNo = count;
		}
		$scope.pageNum = count;
		return count;
	};
	
	// увеличить/уменьшить текущую страницу на 1
	$scope.incPage = function(inc) {
		if (inc) {
			if ($scope.pageNo < $scope.pageNum)
				$scope.pageNo++;
		} else {
			if ($scope.pageNo > 1)
				$scope.pageNo--;
		}		
	};
	
	// *** Input validation ***
	
	function validateItem(item) {
		return validateName(item.name) && validateCount(item.count);
	};
	
	// validate name
	function validateName(name) {
		var length;
		try {
			length = limits.name.length;
			if (name) {
				var namel = name.toString().length;
				return namel <= length && namel > 0;
			}			
		} catch (e) {
			console.err("Problem to get validation limits");			
		}
		return false;
	};
	
	// validate count
	function validateCount(count) {
		var max, min;
		try {
			min = limits.count.min;
			max = limits.count.max;
			if (count) {
				return count >= min && count <= max;
			}			
		} catch (e) {
			console.err("Problem to get validation limits");			
		}
		return false;
	};
	
}]);
	