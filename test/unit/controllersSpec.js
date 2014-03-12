'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('GreenListApp.controllers'));

  /*
  it('should ....', inject(function() {
    //spec body
  }));
  */
/*
  it('should return 1 page for 10 total elements', inject(function() {
    expect(scope.pageSize).toBe(10);
  }));
*/
  
});

// Test Green List Main Controller
describe('GreenListCtrl', function(){
  var scope, $controllerConstructor;  
  
  beforeEach(module('GreenListApp.controllers'));
  
  beforeEach( inject( function($controller, $rootScope) {
	scope = $rootScope.$new();
	$controllerConstructor = $controller;
  }));
  
  it('should return 1 page for 10 total elements', function() {
  
	var ctrl = $controllerConstructor("GreenListCtrl", { $scope: scope, Items: { list: function() { return [];}}});
  
	// vars
	expect(scope.pageSize).toBe(10);	
	expect(scope.pageNum).toBe(1);
	
	expect(scope.countPageNum(10)).toBe(1);	
  });
  
});