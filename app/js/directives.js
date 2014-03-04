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
			restrict: "E",
			replace: true,
			scope: {
				hint: "@",
				variants: "="
			},
			templateUrl: "templates/autocompleteTemplate.html",
			link: function(scope, element) {
			
				$(element).autocomplete({
					source: names//scope.variants
				});
			}
		};
	}]);
