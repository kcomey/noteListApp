describe('AppController', function() {
  beforeEach(module('myApp'));

  var appCtrl;
  var httpBackend;
  var scope;

  beforeEach(
  	inject(function($injector, $controller, $rootScope) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    	scope = $rootScope.$new();
      httpBackend = $injector.get('$httpBackend');
    	appCtrl = $controller('AppCtrl', {
    	   $scope : scope
    	});
	}));

  it('After note is added, notelist.length should be one', function() {
    httpBackend.expectGET('/api/notes')
      .respond(200, [{id: 1}, {id: 2}]);
    httpBackend.flush();
    expect(scope.note.notelist).toBeUndefined();
  });

  // Works
  it('Before note is added, notelist.length should be zero', function() {
    httpBackend.expectGET('/api/notes')
      .respond(200, []);
    httpBackend.flush();
    scope.addNote({id: 2, note: 'This is test', author: 'Kendall'});
    expect(scope.note.notelist).toBeUndefined();
  });

  // This test works
  it('greet should return My Note Service', function() {
    httpBackend.expectGET('/api/notes')
      .respond(200, {});
    httpBackend.flush();
    expect(scope.greet).toEqual('My Note Service');
  });
});
