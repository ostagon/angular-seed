'use strict';

/* Directives */

angular.module('GreenListApp.directives', []).
	directive('appVersion', ['version', function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	}]).
	directive('autocomplete', function() {
		return {
			restrict: "E",
			replace: true,
			scope: {
				hint: "@",
				variants: "="
			},
			templateUrl: "partials/autocompleteTemplate.html",
			link: function(scope, element) {
			
				$(element).autocomplete({
					source: scope.variants
				});
			}
		};
	});
