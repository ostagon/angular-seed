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
  
});
