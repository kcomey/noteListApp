var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http',
  function ($scope, $http) {
    console.log("Hello from controller");
    $scope.greet = "My Note Service";

  var refresh = function() {
    $http.get('/api/notes').success(function(response) {
      console.log('I got the data');
      $scope.notelist = response;
      $scope.note = "";
    });
  };

  refresh();

  $scope.addNote = function() {
    console.log($scope.note);
    $http.post('/api/notes', $scope.note).success(function(response) {
      console.log(response);
      refresh();
    });
  };

  $scope.remove = function(id) {
    console.log(id);
    $http.delete('/api/notes/' + id).success(function(response) {
      refresh();
    });
  };

  $scope.edit = function(id) {
    console.log(id);
    $http.get('/api/notes/' + id).success(function(response) {
      $scope.note = response;
    });
  };

  $scope.update = function() {
    console.log($scope.note._id);
    $http.put('/api/notes/' + $scope.note._id, $scope.note)
      .success(function(response) {
        refresh();
      });
  };

  $scope.deselect = function() {
    $scope.note = "";
  };

}]);
