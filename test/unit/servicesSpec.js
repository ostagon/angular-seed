'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('GreenListApp.services'));
  
  // test version
  describe('version', function() {
	it('should return version greater then 0.12', inject(function(version) {
		expect(version).toBeGreaterThan('0.12');
    }));
  });
  
  // test names
  describe('names', function() {
	
	beforeEach(function() {
		// custom matcher
		jasmine.addMatchers({
			toBeArrayOfNames: function() {
				return {
					compare: function(actual, expected) {
						var result = {
							pass: false							
						};
						
						if (actual instanceof Array && actual.length) {
							result.pass = true;
							for(var i=0;i<actual.length;i++) {
								if (!(typeof actual[i] === "string" || actual[i] instanceof String)) {
									result.pass = false;
									result.message = "Expected a string with " + i + " index, not a " + actual[i];
									break;
								}
								if (!(actual[i].length)) {
									result.pass = false;
									result.message = "Expected a string length > 0 with " + i + " index, not a " + actual[i];
									break;
								}
								if (!(actual[i][0] == actual[i][0].toUpperCase())) {
									result.pass = false;
									result.message = "Expected an uppercase on first place in a string with " + i + " index, not a " + actual[i];
									break;
								}
							}						
						} else {
							result.message = "Expected " + actual + " to be an not null Array";
						}
						
						return result;
					}
				};		
			}
		});
	});
  
	it('should return if array with names not null and all names are strings and begin with upper letter', inject(function(names) {
		expect(names).toBeArrayOfNames();
	}));
  });
  
  // test green list items service
  describe('items', function() {
	// test that service is up
	it('should return a confirm message, that the service on http://epruizhw0117:1337/restapi is up', inject(function(RestAPI, $httpBackend) {
		var confirmMessage = { status: "API is running" };
		$httpBackend.when('GET', 'http://epruizhw0117:1337/restapi').respond(confirmMessage);
		
		var message;
		var promise = RestAPI.get().$promise;
		
		promise.then(function(msg) {
			message = msg;			
		});
		
		expect(message).toBeUndefined();
		$httpBackend.flush();
		
		expect(message.status).toEqual(confirmMessage.status);
	}));
	
  });
  
});
