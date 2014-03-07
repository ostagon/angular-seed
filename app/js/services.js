'use strict';

/* Services */

angular.module('GreenListApp.services', ['ngResource']).
	
value('version', '0.12').
value('names', ["Аристид", "Фенозон", "Анигар", "Протогорк"]).

factory('Items', ['$resource', function($resource) {
	return $resource('http://epruizhw0117:1337/restapi/items/:itemId', { itemId: '@itemId'}, {
		list: { method: 'GET', isArray: true},
		create: { method: 'POST'}		
	});
}]);