'use strict';

/* Directives */

angular.module('GreenListApp.directives', []).
	directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	}]).
	directive('autocomplete', ['names', function(names) {
		return {
			restrict: "EA",
			replace: true,
			scope: {
				hint: "@",
				variants: "=",
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
	}]);
