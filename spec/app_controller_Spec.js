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

  // Works
  it('After note is deleted, notelist.length should be one',
    function() {
    httpBackend.expectGET('/api/notes')
      .respond(200, [{_id: 1, note: 'This is test 1', author: 'Kendall'},
        {_id: 2, note: 'This is test 2', author: 'Morgan'}]);
    httpBackend.flush();

    expect(scope.notelist.length).toEqual(2);

    scope.remove(1);

    httpBackend.expectDELETE('/api/notes/1')
      .respond(200, [{id: 2, note: 'This is test 2', author: 'Morgan'}]);
    httpBackend.flush();

    expect(scope.notelist.length).toEqual(1);
  });

  // Works
  it('After note is added, notelist.length should be one', function() {
    httpBackend.expectGET('/api/notes')
      .respond(200, []);
    httpBackend.flush();

    scope.addNote({note: 'This is test', author: 'Kendall'});

    httpBackend.expectPOST('/api/notes')
      .respond(200, [{note: 'This is test', author: 'Kendall'}]);
    httpBackend.flush();

    expect(scope.notelist.length).toEqual(1);
  });

  // Works
  it('Before note is added, notelist.length should be zero', function() {
    httpBackend.expectGET('/api/notes')
      .respond(200, []);
    httpBackend.flush();
    expect(scope.notelist.length).toEqual(0);
  });

  // This test works
  it('greet should return My Note Service', function() {
    httpBackend.expectGET('/api/notes')
      .respond(200);
    httpBackend.flush();
    expect(scope.greet).toEqual('My Note Service');
  });
});
