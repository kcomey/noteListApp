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

  // Tests the update
  it('If note is updated, notelist.length should stay the same, not increase',
    function() {
    httpBackend.expectGET('/api/notes')
      .respond(200, [{_id: 1, note: 'This is test 1', author: 'Kendall'},
        {_id: 2, note: 'This is test 2', author: 'Morgan'}]);
    httpBackend.flush();

    expect(scope.notelist.length).toEqual(2);

    scope.edit(1);
    scope.note = {_id: 1, note: 'Change the text'};
    scope.update();

    httpBackend.expectGET('/api/notes/1')
      .respond(200, [{_id: 1, note: 'Change the text', author: 'Kendall'},
        {_id: 2, note: 'This is test 2', author: 'Morgan'}]);


    httpBackend.expectPUT('/api/notes/1')
      .respond(200, [{_id: 1, note: 'Change the text', author: 'Kendall'},
        {_id: 2, note: 'This is test 2', author: 'Morgan'}]);
    httpBackend.flush();

    expect(scope.notelist.length).toEqual(2);
  });

  // Tests delete
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

  // Tests add note
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

  // Test empty state
  it('Before note is added, notelist.length should be zero', function() {
    httpBackend.expectGET('/api/notes')
      .respond(200, []);
    httpBackend.flush();
    expect(scope.notelist.length).toEqual(0);
  });

  // Tests HTML
  it('greet should return My Note Service', function() {
    httpBackend.expectGET('/api/notes')
      .respond(200);
    httpBackend.flush();
    expect(scope.greet).toEqual('My Note Service');
  });
});
