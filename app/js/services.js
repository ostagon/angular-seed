'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('GreenListApp.services', []).
	value('version', '0.11').
	value('names', ["Аристид", "Фенозон", "Анигар", "Протогорк"]);
