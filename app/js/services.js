'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('GreenListApp.services', ['ngResource']).
	
value('version', '0.11').
value('names', ["Аристид", "Фенозон", "Анигар", "Протогорк"]).

factory('Items', ['$resource', function($resource) {
	return $resource('http://epruizhw0117:1337/restapi/items/:id', {}, {
		list: { method: 'GET', isArray: true},
		create: { method: 'POST'}
	});
}]);