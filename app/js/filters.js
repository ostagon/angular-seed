'use strict';

/* Filters */

angular.module('GreenListApp.filters', []).
	filter('interpolate', ['version', function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		}
	}]).

	filter('paginate', function() {
		return function(input, scope, selectedPage, pageSize) {
			var count = scope.countPageNum(input.length);
			
			var start = (selectedPage - 1) * pageSize;
			return input.slice(start, start + pageSize);
		}
	});