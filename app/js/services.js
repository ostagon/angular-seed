'use strict';

/* Services */

angular.module('GreenListApp.services', ['ngResource']).

// app version	
value('version', '0.15').

// names
value('names', ["Аристид", "Фенозон", "Анигар", "Протогорк"]).

// restapi
factory('RestAPI', ['$resource', function($resource) {
	return $resource('http://epruizhw0117:1337/restapi', {}, {});
}]).

// Items
factory('Items', ['$resource', function($resource) {
	return $resource('http://epruizhw0117:1337/restapi/items/:itemId', { itemId: '@itemId'}, {
		list: { method: 'GET', isArray: true},
		create: { method: 'POST'},
		update: { method: 'PUT'}
	});
}]);