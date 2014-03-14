'use strict';

/* Directives */

angular.module('GreenListApp.directives', []).
	// for application version
	directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	}]).
	// for autocomplete with jQuery and service
	directive('autocomplete', ['names', function(names) {
		return {
			restrict: "EA",
			replace: true,
			scope: {
				hint: "@",
				ngModel: "="
			},
			templateUrl: "templates/autocompleteTemplate.html",
			link: function(scope, element, attrs) {
				
				$(element).autocomplete({
					source: names,
					select: function(event, ui) {
					
						scope.$apply( function() {
							if (scope.ngModel) {
								scope.ngModel = ui.item.value;
							}
						});						
					}
				});				
			}
		};
	}]).
	// for edit element right in a list place with click/edit/confirm
	directive('edit', function() {
		return {
			restrict: "EA",
			replace: true,
			scope: {
				item: "=",
				field: "@",
				save: "&"
			},
			templateUrl: "templates/editTemplate.html",
			link: function(scope, element, attrs) {
				scope.editMode = false;
				scope.newItem = {};
				
				scope.toggleMode = function() {
					if (!scope.editMode) {
						scope.newItem = angular.copy(scope.item);						
					}
					scope.editMode = !scope.editMode;
				};
				
				scope.saveItem = function() {
					if (scope.editMode && scope.newItem) {
						scope.save({ item: scope.newItem});
						scope.toggleMode();
					}
				};
			}
		};
	}).
	// for count input
	directive('countInput', ['limits', function(limits) {
		return {
			restrict: "A",
			scope: {
				ngModel: "=",
				allowEmpty: "@"
			},			
			link: function(scope, element, attrs) {
				
				scope.$watch('ngModel', function(newValue, oldValue) {
					if (scope.allowEmpty) {
						if (newValue) {
							if ( newValue > limits.count.max || newValue < limits.count.min) {
								scope.ngModel = oldValue;
							}
						} else {
							scope.ngModel = "";
						}
					} else {
						if (newValue) {
							if ( newValue > limits.count.max || newValue < limits.count.min) {
								scope.ngModel = oldValue;
							}
						} else {
							scope.ngModel = limits.count.min;
						}
					}
				});
			}
		};
	}]);
